#!/usr/bin/env node
/**
 * Seed Products from Catalog
 * Imports products from product-catalog.json to Firebase
 * 
 * Usage: node scripts/seed-products.js
 */

const fs = require('fs');
const path = require('path');

// Import Firebase Admin (you need to set up Firebase Admin SDK)
// const admin = require('firebase-admin');
// admin.initializeApp();
// const db = admin.firestore();

// Product catalog path
const catalogPath = path.join(__dirname, '..', 'data', 'product-catalog.json');

// Read catalog
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));

// Generate product data for Firestore
function generateProductData(product, brand) {
    // Format images for storage
    const images = (product.images || []).map((img, index) => ({
        id: `img_${Date.now()}_${index}`,
        url: `/products/${brand.toLowerCase()}/${product.slug}/${img.filename}`,
        alt: img.alt,
        order: index,
        isPrimary: index === 0
    }));

    return {
        slug: product.slug,
        sku: product.sku,
        brand: product.brand,
        categorySlug: product.categorySlug,
        price: product.price,
        originalPrice: product.originalPrice,
        stock: product.stock,
        featured: product.featured || false,
        status: product.status || 'active',
        images: images,
        translations: product.translations,
        seo: product.seo,
        faq: product.faq || [],
        createdAt: new Date(),
        updatedAt: new Date()
    };
}

// Generate category data for Firestore
function generateCategoryData(category) {
    return {
        slug: category.slug,
        icon: category.icon,
        order: category.order,
        status: 'active',
        productCount: 0,
        translations: {
            en: {
                name: category.enName,
                description: category.enDesc
            },
            ar: {
                name: category.arName,
                description: category.arDesc
            }
        },
        seo: {
            keywords: category.keywords
        },
        createdAt: new Date(),
        updatedAt: new Date()
    };
}

// Main function to generate seed data
async function generateSeedData() {
    console.log('🚀 Generating seed data from catalog...\n');

    // Process categories
    console.log('📂 Categories:');
    const categories = catalog.categories.map(cat => {
        const data = generateCategoryData(cat);
        console.log(`   - ${cat.icon} ${cat.arName} (${cat.enName})`);
        return data;
    });

    // Process products
    console.log('\n📦 Products:');
    const products = [];

    for (const brand of Object.keys(catalog.products)) {
        console.log(`\n   ${brand.toUpperCase()}:`);

        for (const category of Object.keys(catalog.products[brand])) {
            const categoryProducts = catalog.products[brand][category];

            for (const product of categoryProducts) {
                const data = generateProductData(product, brand);
                products.push(data);
                console.log(`      - ${product.translations?.ar?.name || product.slug}`);
            }
        }
    }

    // Output summary
    console.log('\n✨ Summary:');
    console.log(`   Categories: ${categories.length}`);
    console.log(`   Products: ${products.length}`);

    // Save as seed data JSON
    const seedData = {
        categories,
        products,
        generatedAt: new Date().toISOString()
    };

    const seedPath = path.join(__dirname, '..', 'data', 'seed-data.json');
    fs.writeFileSync(seedPath, JSON.stringify(seedData, null, 2), 'utf-8');
    console.log(`\n📁 Seed data saved to: data/seed-data.json`);

    return seedData;
}

// Uncomment to seed to Firestore directly:
/*
async function seedToFirestore(seedData) {
    const batch = db.batch();
    
    // Add categories
    for (const category of seedData.categories) {
        const ref = db.collection('categories').doc();
        batch.set(ref, category);
    }
    
    // Add products
    for (const product of seedData.products) {
        const ref = db.collection('products').doc();
        batch.set(ref, product);
    }
    
    await batch.commit();
    console.log('✅ Seeded to Firestore!');
}
*/

// Run
generateSeedData().catch(console.error);
