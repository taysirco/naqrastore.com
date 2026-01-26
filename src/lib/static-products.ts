// Static products data for display when Firebase is not configured
// This can be used as fallback or for development

import { products, categories } from '../../scripts/seed-products';

export interface StaticProduct {
    slug: string;
    sku: string;
    brand: string;
    categorySlug: string;
    price: number;
    originalPrice: number;
    stock: number;
    featured: boolean;
    status: string;
    images: Array<{
        id: string;
        url: string;
        alt: string;
        order: number;
        isPrimary: boolean;
    }>;
    translations: {
        en: {
            name: string;
            shortDescription: string;
            description: string;
            features: string[];
            metaTitle: string;
            metaDesc: string;
        };
        ar: {
            name: string;
            shortDescription: string;
            description: string;
            features: string[];
            metaTitle: string;
            metaDesc: string;
        };
    };
    seo: {
        keywords: string;
        focusKeyword: string;
    };
}

export interface StaticCategory {
    slug: string;
    icon: string;
    order: number;
    status: string;
    productCount: number;
    translations: {
        en: { name: string; description: string };
        ar: { name: string; description: string };
    };
    seo: { keywords: string };
}

// Export typed products and categories
export const staticProducts = products as StaticProduct[];
export const staticCategories = categories as StaticCategory[];

// Helper functions
export function getProductBySlug(slug: string): StaticProduct | undefined {
    return staticProducts.find(p => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): StaticProduct[] {
    return staticProducts.filter(p => p.categorySlug === categorySlug);
}

export function getProductsByBrand(brand: string): StaticProduct[] {
    return staticProducts.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
}

export function getFeaturedProducts(): StaticProduct[] {
    return staticProducts.filter(p => p.featured);
}

export function getCategoryBySlug(slug: string): StaticCategory | undefined {
    return staticCategories.find(c => c.slug === slug);
}

export function getProductsByBrandAndCategory(brand: string, categorySlug: string): StaticProduct[] {
    return staticProducts.filter(
        p => p.brand.toLowerCase() === brand.toLowerCase() && p.categorySlug === categorySlug
    );
}

// Get all products for a brand grouped by category
export function getProductsGroupedByCategory(brand: string): Record<string, StaticProduct[]> {
    const brandProducts = getProductsByBrand(brand);
    const grouped: Record<string, StaticProduct[]> = {};

    for (const product of brandProducts) {
        if (!grouped[product.categorySlug]) {
            grouped[product.categorySlug] = [];
        }
        grouped[product.categorySlug].push(product);
    }

    return grouped;
}
