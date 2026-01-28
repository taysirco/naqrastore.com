const fs = require('fs');
const path = require('path');

const baseDir = 'public/products';

// Get all product folders
const brands = fs.readdirSync(baseDir).filter(f =>
    fs.statSync(path.join(baseDir, f)).isDirectory()
);

let renamedCount = 0;
const updates = [];

for (const brand of brands) {
    const brandDir = path.join(baseDir, brand);
    const products = fs.readdirSync(brandDir).filter(f =>
        fs.statSync(path.join(brandDir, f)).isDirectory()
    );

    for (const product of products) {
        const productDir = path.join(brandDir, product);
        const images = fs.readdirSync(productDir).filter(f =>
            /\.(webp|jpg|jpeg|png)$/i.test(f)
        );

        images.forEach((img, index) => {
            const ext = path.extname(img).toLowerCase();
            // Keep original extension
            const newName = `${brand}-${product}-egypt-cairo-${index + 1}${ext}`;

            const oldPath = path.join(productDir, img);
            const newPath = path.join(productDir, newName);

            // Skip if already renamed
            if (img === newName) return;

            // Track the rename
            updates.push({
                product,
                old: img,
                new: newName,
                oldPath,
                newPath
            });

            // Rename file
            fs.renameSync(oldPath, newPath);
            renamedCount++;
        });
    }
}

console.log(`Renamed ${renamedCount} image files!`);
console.log('Examples:');
updates.slice(0, 10).forEach(u => console.log(`  ${u.old} -> ${u.new}`));
