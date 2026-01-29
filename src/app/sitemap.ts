
import { MetadataRoute } from 'next';
import { brandData } from '@/data/brand-data';
import { categoryData } from '@/data/category-seo';

const baseUrl = 'https://cairovolt.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const routes: MetadataRoute.Sitemap = [
        // Home
        { url: baseUrl, priority: 1.0, changeFrequency: 'weekly', lastModified: new Date() },
        { url: `${baseUrl}/en`, priority: 1.0, changeFrequency: 'weekly', lastModified: new Date() },

        // Checkout
        { url: `${baseUrl}/checkout`, priority: 0.7, changeFrequency: 'monthly', lastModified: new Date() },
        { url: `${baseUrl}/en/checkout`, priority: 0.7, changeFrequency: 'monthly', lastModified: new Date() },

        // Static Pages
        { url: `${baseUrl}/about`, priority: 0.5, changeFrequency: 'monthly', lastModified: new Date() },
        { url: `${baseUrl}/en/about`, priority: 0.5, changeFrequency: 'monthly', lastModified: new Date() },
        { url: `${baseUrl}/contact`, priority: 0.6, changeFrequency: 'monthly', lastModified: new Date() },
        { url: `${baseUrl}/en/contact`, priority: 0.6, changeFrequency: 'monthly', lastModified: new Date() },
    ];

    // Dynamic Brand Pages
    Object.keys(brandData).forEach(brandId => {
        routes.push({
            url: `${baseUrl}/${brandId}`,
            priority: 0.9,
            changeFrequency: 'weekly',
            lastModified: new Date(),
        });
        routes.push({
            url: `${baseUrl}/en/${brandId}`,
            priority: 0.9,
            changeFrequency: 'weekly',
            lastModified: new Date(),
        });
    });

    // Dynamic Category Pages
    Object.keys(categoryData).forEach(brandId => {
        const brandCategories = categoryData[brandId];
        Object.keys(brandCategories).forEach(catSlug => {
            routes.push({
                url: `${baseUrl}/${brandId}/${catSlug}`,
                priority: 0.8,
                changeFrequency: 'weekly',
                lastModified: new Date(),
            });
            routes.push({
                url: `${baseUrl}/en/${brandId}/${catSlug}`,
                priority: 0.8,
                changeFrequency: 'weekly',
                lastModified: new Date(),
            });
        });
    });

    return routes;
}
