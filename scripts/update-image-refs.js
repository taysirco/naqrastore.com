const fs = require('fs');
const path = require('path');

const baseDir = 'public/products';
const seedFile = 'scripts/seed-products.ts';

// Read current seed file
let content = fs.readFileSync(seedFile, 'utf-8');

// Get all actual image files
function getImageFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            files.push(...getImageFiles(fullPath));
        } else if (/\.webp$/i.test(item)) {
            const relativePath = fullPath.replace('public', '');
            const parts = relativePath.split(path.sep);
            const brand = parts[2];
            const productSlug = parts[3];
            const filename = parts[4];

            files.push({
                brand,
                productSlug,
                filename,
                url: relativePath.replace(/\\/g, '/'),
                fullPath
            });
        }
    }
    return files;
}

const allImages = getImageFiles(baseDir);

// Group by product slug
const imagesByProduct = {};
for (const img of allImages) {
    if (!imagesByProduct[img.productSlug]) {
        imagesByProduct[img.productSlug] = [];
    }
    imagesByProduct[img.productSlug].push(img);
}

// Sort images by filename
for (const slug in imagesByProduct) {
    imagesByProduct[slug].sort((a, b) => a.filename.localeCompare(b.filename));
}

let updatedCount = 0;
let totalImages = 0;

// Update each product's images array
for (const [productSlug, images] of Object.entries(imagesByProduct)) {
    // Find the product in the content
    const productRegex = new RegExp(
        `(slug:\\s*"${productSlug}"[\\s\\S]*?images:\\s*\\[)([\\s\\S]*?)(\\],)`,
        'g'
    );

    // Use ALL images for the product
    const allProductImages = images;
    totalImages += allProductImages.length;

    // Generate new images array with ALL images
    const newImagesContent = allProductImages.map((img, idx) => {
        // Alternate between English and Arabic alt text for variety
        const productName = img.productSlug.replace(/-/g, ' ');
        let alt;

        if (idx === 0) {
            // Primary image - English
            alt = `${productName} Original Egypt - Fast Cairo Delivery`;
        } else if (idx % 2 === 1) {
            // Odd indices - Arabic
            alt = `${productName} اصلي في مصر - توصيل سريع القاهرة والجيزة`;
        } else {
            // Even indices - English variants
            const variants = [
                `${productName} - Best Price in Egypt`,
                `${productName} - Official Distributor Cairo`,
                `${productName} - 2 Year Warranty Egypt`,
                `${productName} - Original Product Cairo Delivery`
            ];
            alt = variants[(idx / 2 - 1) % variants.length];
        }

        return `{ id: "img_${idx + 1}", url: "${img.url}", alt: "${alt}", order: ${idx}, isPrimary: ${idx === 0} }`;
    }).join(',\n            ');

    const newContent = content.replace(productRegex, `$1\n            ${newImagesContent}\n        $3`);

    if (newContent !== content) {
        content = newContent;
        updatedCount++;
        console.log(`✓ ${productSlug}: ${allProductImages.length} images added`);
    }
}

// Write updated content
fs.writeFileSync(seedFile, content);

console.log(`\n═══════════════════════════════════════`);
console.log(`✅ Updated ${updatedCount} products`);
console.log(`📷 Total images added: ${totalImages}`);
console.log(`═══════════════════════════════════════`);
