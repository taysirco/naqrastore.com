const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const baseDir = 'public/products';
const MAX_WIDTH = 1200; // Optimal for product images
const QUALITY = 82; // Good balance between quality and size

let totalOriginalSize = 0;
let totalOptimizedSize = 0;
let processedCount = 0;

async function getImageFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            files.push(...await getImageFiles(fullPath));
        } else if (/\.(webp|jpg|jpeg|png)$/i.test(item)) {
            files.push(fullPath);
        }
    }
    return files;
}

async function optimizeImage(filePath) {
    try {
        const originalStats = fs.statSync(filePath);
        const originalSize = originalStats.size;
        totalOriginalSize += originalSize;

        const ext = path.extname(filePath).toLowerCase();
        const dir = path.dirname(filePath);
        const baseName = path.basename(filePath, ext);
        const newPath = path.join(dir, `${baseName}.webp`);

        // Read and optimize image
        const image = sharp(filePath);
        const metadata = await image.metadata();

        // Resize if too large, maintain aspect ratio
        let pipeline = image;
        if (metadata.width > MAX_WIDTH) {
            pipeline = pipeline.resize(MAX_WIDTH, null, {
                withoutEnlargement: true,
                fit: 'inside'
            });
        }

        // Convert to WebP with high quality
        await pipeline
            .webp({
                quality: QUALITY,
                effort: 6, // Higher compression effort
                smartSubsample: true
            })
            .toFile(newPath + '.tmp');

        // Replace original with optimized version
        fs.unlinkSync(filePath);
        fs.renameSync(newPath + '.tmp', newPath);

        const newStats = fs.statSync(newPath);
        totalOptimizedSize += newStats.size;
        processedCount++;

        const savings = ((originalSize - newStats.size) / originalSize * 100).toFixed(1);
        console.log(`✓ ${path.basename(filePath)} → ${path.basename(newPath)} (-${savings}%)`);

    } catch (error) {
        console.error(`✗ Error processing ${filePath}:`, error.message);
    }
}

async function main() {
    console.log('🔍 Scanning for images...\n');

    const images = await getImageFiles(baseDir);
    console.log(`Found ${images.length} images to optimize\n`);

    for (const img of images) {
        await optimizeImage(img);
    }

    const totalSavings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
    const originalMB = (totalOriginalSize / 1024 / 1024).toFixed(2);
    const optimizedMB = (totalOptimizedSize / 1024 / 1024).toFixed(2);

    console.log('\n═══════════════════════════════════════');
    console.log(`✅ Optimized ${processedCount} images`);
    console.log(`📦 Original: ${originalMB} MB`);
    console.log(`📦 Optimized: ${optimizedMB} MB`);
    console.log(`💾 Saved: ${totalSavings}%`);
    console.log('═══════════════════════════════════════');
}

main().catch(console.error);
