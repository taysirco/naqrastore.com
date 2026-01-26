#!/usr/bin/env node
/**
 * Product Image Downloader
 * Downloads product images from sources and saves them to public/products folder
 * 
 * Usage: node scripts/download-images.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Product catalog path
const catalogPath = path.join(__dirname, '..', 'data', 'product-catalog.json');
const outputDir = path.join(__dirname, '..', 'public', 'products');

// Read catalog
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));

// Download function
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;

        // Create directory if not exists
        const dir = path.dirname(filepath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Skip if file exists
        if (fs.existsSync(filepath)) {
            console.log(`⏭️  Skipping (exists): ${path.basename(filepath)}`);
            resolve();
            return;
        }

        const file = fs.createWriteStream(filepath);

        protocol.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        }, (response) => {
            // Handle redirects
            if (response.statusCode === 301 || response.statusCode === 302) {
                downloadImage(response.headers.location, filepath)
                    .then(resolve)
                    .catch(reject);
                return;
            }

            if (response.statusCode !== 200) {
                reject(new Error(`HTTP ${response.statusCode} for ${url}`));
                return;
            }

            response.pipe(file);

            file.on('finish', () => {
                file.close();
                console.log(`✅ Downloaded: ${path.basename(filepath)}`);
                resolve();
            });

            file.on('error', (err) => {
                fs.unlink(filepath, () => { }); // Delete incomplete file
                reject(err);
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { }); // Delete incomplete file
            reject(err);
        });
    });
}

// Process all products
async function downloadAllImages() {
    console.log('🚀 Starting image download...\n');

    const brands = Object.keys(catalog.products);
    let totalDownloaded = 0;
    let totalErrors = 0;

    for (const brand of brands) {
        console.log(`\n📦 Processing ${brand.toUpperCase()} products...`);

        const categories = Object.keys(catalog.products[brand]);

        for (const category of categories) {
            const products = catalog.products[brand][category];

            for (const product of products) {
                if (!product.images || product.images.length === 0) continue;

                const productDir = path.join(outputDir, brand, product.slug);

                for (let i = 0; i < product.images.length; i++) {
                    const image = product.images[i];

                    if (!image.source) {
                        console.log(`⚠️  No source for: ${image.filename}`);
                        continue;
                    }

                    const filepath = path.join(productDir, image.filename);

                    try {
                        await downloadImage(image.source, filepath);
                        totalDownloaded++;
                    } catch (error) {
                        console.error(`❌ Error downloading ${image.filename}: ${error.message}`);
                        totalErrors++;
                    }

                    // Small delay to avoid rate limiting
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            }
        }
    }

    console.log(`\n✨ Done!`);
    console.log(`   Downloaded: ${totalDownloaded} images`);
    console.log(`   Errors: ${totalErrors}`);
}

// Run
downloadAllImages().catch(console.error);
