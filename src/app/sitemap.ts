
import { MetadataRoute } from 'next';
import { brandData } from '@/data/brand-data';
import { categoryData } from '@/data/category-seo';
import { staticProducts } from '@/lib/static-products';
import { governorates } from '@/data/governorates';

const baseUrl = 'https://cairovolt.com';

// Helper to capitalize brand (anker → Anker, joyroom → Joyroom)
const capitalizeBrand = (brand: string) => brand.charAt(0).toUpperCase() + brand.slice(1);

export default function sitemap(): MetadataRoute.Sitemap {
    const routes: MetadataRoute.Sitemap = [
        // Home
        { url: baseUrl, priority: 1.0, changeFrequency: 'weekly', lastModified: new Date() },
        { url: `${baseUrl}/en`, priority: 1.0, changeFrequency: 'weekly', lastModified: new Date() },

        // Checkout - REMOVED (noindexed transactional page)

        // Static Pages - About & Contact
        { url: `${baseUrl}/about`, priority: 0.5, changeFrequency: 'monthly', lastModified: new Date() },
        { url: `${baseUrl}/en/about`, priority: 0.5, changeFrequency: 'monthly', lastModified: new Date() },
        { url: `${baseUrl}/contact`, priority: 0.6, changeFrequency: 'monthly', lastModified: new Date() },
        { url: `${baseUrl}/en/contact`, priority: 0.6, changeFrequency: 'monthly', lastModified: new Date() },

        // FAQ Pages - High priority for AEO/Voice Search
        { url: `${baseUrl}/faq`, priority: 0.7, changeFrequency: 'weekly', lastModified: new Date() },
        { url: `${baseUrl}/en/faq`, priority: 0.7, changeFrequency: 'weekly', lastModified: new Date() },

        // Policy Pages - Important for E-E-A-T
        { url: `${baseUrl}/shipping`, priority: 0.5, changeFrequency: 'monthly', lastModified: new Date() },
        { url: `${baseUrl}/en/shipping`, priority: 0.5, changeFrequency: 'monthly', lastModified: new Date() },
        { url: `${baseUrl}/warranty`, priority: 0.5, changeFrequency: 'monthly', lastModified: new Date() },
        { url: `${baseUrl}/en/warranty`, priority: 0.5, changeFrequency: 'monthly', lastModified: new Date() },
        { url: `${baseUrl}/privacy`, priority: 0.3, changeFrequency: 'yearly', lastModified: new Date() },
        { url: `${baseUrl}/en/privacy`, priority: 0.3, changeFrequency: 'yearly', lastModified: new Date() },
        { url: `${baseUrl}/terms`, priority: 0.3, changeFrequency: 'yearly', lastModified: new Date() },
        { url: `${baseUrl}/en/terms`, priority: 0.3, changeFrequency: 'yearly', lastModified: new Date() },
    ];

    // Dynamic Brand Pages - Use proper casing (Anker, Joyroom)
    Object.keys(brandData).forEach(brandId => {
        const properBrand = capitalizeBrand(brandId);
        routes.push({
            url: `${baseUrl}/${properBrand}`,
            priority: 0.9,
            changeFrequency: 'weekly',
            lastModified: new Date(),
        });
        routes.push({
            url: `${baseUrl}/en/${properBrand}`,
            priority: 0.9,
            changeFrequency: 'weekly',
            lastModified: new Date(),
        });
    });

    // Dynamic Category Pages - Use proper casing
    Object.keys(categoryData).forEach(brandId => {
        const properBrand = capitalizeBrand(brandId);
        const brandCategories = categoryData[brandId];
        Object.keys(brandCategories).forEach(catSlug => {
            routes.push({
                url: `${baseUrl}/${properBrand}/${catSlug}`,
                priority: 0.8,
                changeFrequency: 'weekly',
                lastModified: new Date(),
            });
            routes.push({
                url: `${baseUrl}/en/${properBrand}/${catSlug}`,
                priority: 0.8,
                changeFrequency: 'weekly',
                lastModified: new Date(),
            });
        });
    });

    // Dynamic Product Pages - Use proper casing
    staticProducts.forEach(product => {
        const properBrand = capitalizeBrand(product.brand.toLowerCase());
        routes.push({
            url: `${baseUrl}/${properBrand}/${product.categorySlug}/${product.slug}`,
            priority: 0.9,
            changeFrequency: 'daily',
            lastModified: new Date(),
        });
        routes.push({
            url: `${baseUrl}/en/${properBrand}/${product.categorySlug}/${product.slug}`,
            priority: 0.9,
            changeFrequency: 'daily',
            lastModified: new Date(),
        });
    });

    // Governorate Location Pages - REMOVED from sitemap (noindexed - duplicate content)
    // These pages don't generate traffic and cause content duplication

    return routes;
}

