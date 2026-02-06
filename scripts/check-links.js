#!/usr/bin/env node
/**
 * Link Checker Script
 * Automatically checks all pages and links for 404 errors
 * 
 * Usage: node scripts/check-links.js
 */

const http = require('http');

const BASE_URL = 'http://localhost:3000';

// All pages to check based on the sitemap and routing structure
const PAGES_TO_CHECK = [
    // Homepage
    '/',
    '/en',

    // Brand Pages
    '/Anker',
    '/en/Anker',
    '/Joyroom',
    '/en/Joyroom',

    // Anker Category Pages
    '/Anker/power-banks',
    '/en/Anker/power-banks',
    '/Anker/wall-chargers',
    '/en/Anker/wall-chargers',
    '/Anker/cables',
    '/en/Anker/cables',
    '/Anker/car-chargers',
    '/en/Anker/car-chargers',
    '/Anker/audio',
    '/en/Anker/audio',
    '/Anker/speakers',
    '/en/Anker/speakers',

    // Joyroom Category Pages
    '/Joyroom/power-banks',
    '/en/Joyroom/power-banks',
    '/Joyroom/audio',
    '/en/Joyroom/audio',
    '/Joyroom/cables',
    '/en/Joyroom/cables',
    '/Joyroom/wall-chargers',
    '/en/Joyroom/wall-chargers',
    // Joyroom/car-chargers - category doesn't exist (Joyroom has car-holders instead)
    '/Joyroom/car-holders',
    '/en/Joyroom/car-holders',
    '/Joyroom/smart-watches',
    '/en/Joyroom/smart-watches',

    // Static Pages
    '/contact',
    '/en/contact',
    '/faq',
    '/en/faq',
    '/privacy',
    '/en/privacy',
    '/terms',
    '/en/terms',
    '/shipping',
    '/en/shipping',
    '/warranty',
    '/en/warranty',
    '/about',
    '/en/about',

    // Sitemap and Robots
    '/sitemap.xml',
    '/robots.txt',
    '/image-sitemap.xml',

    // API endpoints (should return 200 or JSON)
    '/api/products',
    '/api/categories',

    // Sample Product Pages (Anker)
    '/Anker/power-banks/anker-powercore-10000',
    '/en/Anker/power-banks/anker-powercore-10000',
    '/Anker/power-banks/anker-powercore-20000',
    '/en/Anker/power-banks/anker-powercore-20000',
    '/Anker/audio/anker-soundcore-life-p2i',
    '/en/Anker/audio/anker-soundcore-life-p2i',

    // Sample Product Pages (Joyroom)
    '/Joyroom/power-banks/joyroom-power-bank-10000',
    '/en/Joyroom/power-banks/joyroom-power-bank-10000',
    '/Joyroom/audio/joyroom-t03s-pro-earbuds',
    '/en/Joyroom/audio/joyroom-t03s-pro-earbuds',

    // Location Pages (sample)
    '/locations/cairo',
    '/en/locations/cairo',
    '/locations/giza',
    '/en/locations/giza',
    '/locations/alexandria',
    '/en/locations/alexandria',

    // Test lowercase redirects (should redirect to proper casing)
    '/anker',
    '/joyroom',
    '/en/anker',
    '/en/joyroom',
];

// Results tracking
const results = {
    passed: [],
    failed: [],
    redirected: [],
};

// Check a single URL
function checkUrl(path) {
    return new Promise((resolve) => {
        const url = `${BASE_URL}${path}`;

        const req = http.get(url, (res) => {
            const statusCode = res.statusCode;

            if (statusCode === 200) {
                results.passed.push({ path, status: statusCode });
            } else if (statusCode >= 300 && statusCode < 400) {
                const location = res.headers.location || 'Unknown';
                results.redirected.push({ path, status: statusCode, location });
            } else if (statusCode === 404) {
                results.failed.push({ path, status: statusCode, error: 'Not Found' });
            } else {
                results.failed.push({ path, status: statusCode, error: `HTTP Error ${statusCode}` });
            }

            resolve();
        });

        req.on('error', (err) => {
            results.failed.push({ path, status: 0, error: err.message });
            resolve();
        });

        req.setTimeout(10000, () => {
            results.failed.push({ path, status: 0, error: 'Timeout' });
            req.destroy();
            resolve();
        });
    });
}

// Main function
async function main() {
    console.log('🔍 Link Checker - Checking all URLs for 404 errors\n');
    console.log(`📍 Base URL: ${BASE_URL}`);
    console.log(`📄 Total URLs to check: ${PAGES_TO_CHECK.length}\n`);
    console.log('='.repeat(60));
    console.log('');

    // Check all URLs
    let checked = 0;
    for (const path of PAGES_TO_CHECK) {
        await checkUrl(path);
        checked++;
        process.stdout.write(`\rProgress: ${checked}/${PAGES_TO_CHECK.length}`);
    }

    console.log('\n\n' + '='.repeat(60));

    // Print Results
    console.log('\n📊 RESULTS SUMMARY\n');

    // Passed
    console.log(`✅ PASSED (${results.passed.length}/${PAGES_TO_CHECK.length}):`);
    if (results.passed.length > 0) {
        results.passed.forEach(r => {
            console.log(`   ✓ ${r.path}`);
        });
    }

    // Redirected (expected for lowercase URLs)
    if (results.redirected.length > 0) {
        console.log(`\n🔄 REDIRECTED (${results.redirected.length}):`);
        results.redirected.forEach(r => {
            console.log(`   → ${r.path} (${r.status}) → ${r.location}`);
        });
    }

    // Failed
    if (results.failed.length > 0) {
        console.log(`\n❌ FAILED (${results.failed.length}):`);
        results.failed.forEach(r => {
            console.log(`   ✗ ${r.path} - ${r.error}`);
        });
    }

    console.log('\n' + '='.repeat(60));

    // Final Summary
    const total = PAGES_TO_CHECK.length;
    const passRate = ((results.passed.length + results.redirected.length) / total * 100).toFixed(1);

    console.log('\n📈 FINAL REPORT:');
    console.log(`   Total URLs checked: ${total}`);
    console.log(`   ✅ Passed: ${results.passed.length}`);
    console.log(`   🔄 Redirected: ${results.redirected.length} (expected for lowercase URLs)`);
    console.log(`   ❌ Failed: ${results.failed.length}`);
    console.log(`   📊 Success Rate: ${passRate}%`);

    if (results.failed.length === 0) {
        console.log('\n🎉 ALL LINKS ARE WORKING! NO 404 ERRORS FOUND!\n');
        process.exit(0);
    } else {
        console.log('\n⚠️  SOME LINKS HAVE ISSUES - CHECK THE FAILED LIST ABOVE\n');
        process.exit(1);
    }
}

// Run
main().catch(console.error);
