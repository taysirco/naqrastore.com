// ============================================
// Admin Utility Functions
// Helper functions for the admin dashboard
// ============================================

import type { SEOAnalysis, ProductFormData, Product, ProductImage } from '@/types/admin';

// ============================================
// SLUG GENERATION
// ============================================

/**
 * Generate URL-friendly slug from text
 * Handles both English and Arabic text
 */
export function generateSlug(text: string, options?: {
    transliterate?: boolean;
    maxLength?: number;
}): string {
    const { transliterate = true, maxLength = 100 } = options || {};

    let slug = text.toLowerCase().trim();

    // Arabic to English transliteration map (common characters)
    if (transliterate) {
        const arabicMap: Record<string, string> = {
            'ا': 'a', 'أ': 'a', 'إ': 'a', 'آ': 'a',
            'ب': 'b', 'ت': 't', 'ث': 'th',
            'ج': 'g', 'ح': 'h', 'خ': 'kh',
            'د': 'd', 'ذ': 'z', 'ر': 'r', 'ز': 'z',
            'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'd',
            'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh',
            'ف': 'f', 'ق': 'q', 'ك': 'k', 'ل': 'l',
            'م': 'm', 'ن': 'n', 'ه': 'h', 'و': 'w',
            'ي': 'y', 'ى': 'a', 'ة': 'a', 'ئ': 'e',
            'ء': '', 'ؤ': 'o',
        };

        slug = slug.split('').map(char => arabicMap[char] || char).join('');
    }

    // Replace spaces and special chars with hyphens
    slug = slug
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');

    // Truncate if needed
    if (slug.length > maxLength) {
        slug = slug.substring(0, maxLength).replace(/-+$/, '');
    }

    return slug;
}

/**
 * Generate unique slug by appending number if exists
 */
export function generateUniqueSlug(baseSlug: string, existingSlugs: string[]): string {
    let slug = baseSlug;
    let counter = 1;

    while (existingSlugs.includes(slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return slug;
}

// ============================================
// SEO UTILITIES
// ============================================

/**
 * Calculate SEO score for a product
 */
export function calculateSEOScore(product: Partial<Product>): SEOAnalysis {
    const suggestions: string[] = [];
    let score = 0;
    const maxScore = 100;

    // Title analysis (20 points)
    const titleEn = product.translations?.en?.metaTitle || product.translations?.en?.name || '';
    const titleAr = product.translations?.ar?.metaTitle || product.translations?.ar?.name || '';
    const titleLength = Math.max(titleEn.length, titleAr.length);

    let titleStatus: 'good' | 'warning' | 'error' = 'error';
    if (titleLength >= 30 && titleLength <= 60) {
        score += 20;
        titleStatus = 'good';
    } else if (titleLength >= 20 && titleLength <= 70) {
        score += 10;
        titleStatus = 'warning';
        suggestions.push('تحسين طول العنوان ليكون بين 30-60 حرف');
    } else {
        suggestions.push('العنوان قصير جداً أو طويل جداً');
    }

    // Description analysis (20 points)
    const descEn = product.translations?.en?.metaDesc || '';
    const descAr = product.translations?.ar?.metaDesc || '';
    const descLength = Math.max(descEn.length, descAr.length);

    let descStatus: 'good' | 'warning' | 'error' = 'error';
    if (descLength >= 120 && descLength <= 160) {
        score += 20;
        descStatus = 'good';
    } else if (descLength >= 80 && descLength <= 200) {
        score += 10;
        descStatus = 'warning';
        suggestions.push('تحسين طول الوصف ليكون بين 120-160 حرف');
    } else {
        suggestions.push('أضف وصف meta احترافي');
    }

    // Keywords analysis (15 points)
    const keywords = product.seo?.keywords || '';
    let keywordStatus: 'good' | 'warning' | 'error' = 'error';
    const keywordCount = keywords.split(',').filter(k => k.trim()).length;

    if (keywordCount >= 3 && keywordCount <= 10) {
        score += 15;
        keywordStatus = 'good';
    } else if (keywordCount >= 1) {
        score += 7;
        keywordStatus = 'warning';
        suggestions.push('أضف 3-10 كلمات مفتاحية');
    } else {
        suggestions.push('أضف كلمات مفتاحية للمنتج');
    }

    // Images analysis (15 points)
    const hasImages = (product.images?.length || 0) > 0;
    const imagesWithAlt = product.images?.filter(img => img.alt && img.alt.length > 0).length || 0;

    if (hasImages && imagesWithAlt === product.images?.length) {
        score += 15;
    } else if (hasImages) {
        score += 7;
        suggestions.push('أضف نص بديل (alt) لجميع الصور');
    } else {
        suggestions.push('أضف صور للمنتج');
    }

    // Schema markup (10 points)
    const hasSchema = product.seo?.schemaType ? true : false;
    if (hasSchema) {
        score += 10;
    } else {
        suggestions.push('فعّل Schema Markup للمنتج');
    }

    // Arabic content (10 points)
    if (product.translations?.ar?.name && product.translations?.ar?.description) {
        score += 10;
    } else {
        suggestions.push('أكمل المحتوى العربي للمنتج');
    }

    // Product description length (10 points)
    const productDesc = product.translations?.ar?.description || product.translations?.en?.description || '';
    if (productDesc.length >= 200) {
        score += 10;
    } else if (productDesc.length >= 100) {
        score += 5;
        suggestions.push('أضف وصف أطول للمنتج (200+ حرف)');
    } else {
        suggestions.push('أضف وصف تفصيلي للمنتج');
    }

    return {
        score: Math.round((score / maxScore) * 100),
        titleLength: { value: titleLength, status: titleStatus },
        descLength: { value: descLength, status: descStatus },
        keywordDensity: { value: keywordCount, status: keywordStatus },
        hasSchema,
        hasImages,
        imagesWithAlt,
        suggestions,
    };
}

/**
 * Generate Egyptian market keywords
 */
export function generateEgyptianKeywords(
    productName: string,
    category: string,
    brand: string
): string[] {
    const baseKeywords = [
        productName,
        `${productName} مصر`,
        `${productName} اصلي`,
        `سعر ${productName}`,
        `شراء ${productName}`,
        `${brand} مصر`,
        `${brand} اصلي`,
        `${category} ${brand}`,
        `افضل ${category}`,
        `${category} في مصر`,
        `اكسسوارات موبايل`,
    ];

    return [...new Set(baseKeywords)].filter(Boolean);
}

/**
 * Generate Product Schema.org JSON-LD
 */
export function generateProductSchema(product: Product, siteUrl: string): Record<string, unknown> {
    const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];

    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.translations.ar.name,
        description: product.translations.ar.description,
        image: primaryImage?.url ? [primaryImage.url] : [],
        sku: product.sku,
        brand: {
            '@type': 'Brand',
            name: product.brand,
        },
        offers: {
            '@type': 'Offer',
            url: `${siteUrl}/product/${product.slug}`,
            priceCurrency: 'EGP',
            price: product.price,
            priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            availability: product.stock > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            seller: {
                '@type': 'Organization',
                name: 'Mobile Accessories Egypt',
            },
        },
    };
}

// ============================================
// FORM UTILITIES
// ============================================

/**
 * Transform form data to product object
 */
export function formDataToProduct(formData: ProductFormData, existingProduct?: Partial<Product>): Partial<Product> {
    return {
        ...existingProduct,
        slug: formData.slug,
        sku: formData.sku || null,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        brand: formData.brand,
        categorySlug: formData.categorySlug,
        subcategorySlug: formData.subcategorySlug,
        featured: formData.featured || false,
        status: formData.status || 'draft',
        stock: formData.stock || 0,
        translations: {
            en: {
                name: formData.enName,
                description: formData.enDesc,
                shortDescription: formData.enShortDesc,
                metaTitle: formData.enMetaTitle || formData.enName,
                metaDesc: formData.enMetaDesc || '',
                features: formData.enFeatures?.split('\n').filter(Boolean),
            },
            ar: {
                name: formData.arName,
                description: formData.arDesc,
                shortDescription: formData.arShortDesc,
                metaTitle: formData.arMetaTitle || formData.arName,
                metaDesc: formData.arMetaDesc || '',
                features: formData.arFeatures?.split('\n').filter(Boolean),
            },
        },
        seo: {
            keywords: formData.keywords || '',
            focusKeyword: formData.focusKeyword,
            canonical: formData.canonical,
        },
        images: formData.images || [],
    };
}

/**
 * Transform product object to form data
 */
export function productToFormData(product: Product): ProductFormData {
    return {
        slug: product.slug,
        sku: product.sku || undefined,
        price: product.price,
        originalPrice: product.originalPrice,
        brand: product.brand,
        categorySlug: product.categorySlug,
        subcategorySlug: product.subcategorySlug,
        featured: product.featured,
        status: product.status,
        stock: product.stock,
        enName: product.translations.en.name,
        enDesc: product.translations.en.description,
        enShortDesc: product.translations.en.shortDescription,
        enMetaTitle: product.translations.en.metaTitle,
        enMetaDesc: product.translations.en.metaDesc,
        enFeatures: product.translations.en.features?.join('\n'),
        arName: product.translations.ar.name,
        arDesc: product.translations.ar.description,
        arShortDesc: product.translations.ar.shortDescription,
        arMetaTitle: product.translations.ar.metaTitle,
        arMetaDesc: product.translations.ar.metaDesc,
        arFeatures: product.translations.ar.features?.join('\n'),
        keywords: product.seo.keywords,
        focusKeyword: product.seo.focusKeyword,
        canonical: product.seo.canonical || undefined,
        images: product.images,
    };
}

// ============================================
// IMAGE UTILITIES
// ============================================

/**
 * Generate image ID
 */
export function generateImageId(): string {
    return `img_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Reorder images array
 */
export function reorderImages(images: ProductImage[], fromIndex: number, toIndex: number): ProductImage[] {
    const result = [...images];
    const [removed] = result.splice(fromIndex, 1);
    result.splice(toIndex, 0, removed);

    // Update order property
    return result.map((img, index) => ({
        ...img,
        order: index,
        isPrimary: index === 0,
    }));
}

// ============================================
// VALIDATION UTILITIES
// ============================================

/**
 * Validate product form data
 */
export function validateProductForm(data: ProductFormData): { valid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    if (!data.slug || data.slug.length < 3) {
        errors.slug = 'Slug must be at least 3 characters';
    }

    if (!data.enName || data.enName.length < 2) {
        errors.enName = 'English name is required';
    }

    if (!data.arName || data.arName.length < 2) {
        errors.arName = 'Arabic name is required';
    }

    if (!data.price || data.price <= 0) {
        errors.price = 'Valid price is required';
    }

    if (!data.brand) {
        errors.brand = 'Brand is required';
    }

    if (!data.categorySlug) {
        errors.categorySlug = 'Category is required';
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
}

// ============================================
// FORMATTING UTILITIES
// ============================================

/**
 * Format price in EGP
 */
export function formatPrice(price: number): string {
    return new Intl.NumberFormat('ar-EG', {
        style: 'currency',
        currency: 'EGP',
        minimumFractionDigits: 0,
    }).format(price);
}

/**
 * Format date
 */
export function formatDate(date: Date | { seconds: number; nanoseconds: number }): string {
    const d = date instanceof Date ? date : new Date(date.seconds * 1000);
    return new Intl.DateTimeFormat('ar-EG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(d);
}

/**
 * Format relative time
 */
export function formatRelativeTime(date: Date | { seconds: number; nanoseconds: number }): string {
    const d = date instanceof Date ? date : new Date(date.seconds * 1000);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'الآن';
    if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
    if (diffHours < 24) return `منذ ${diffHours} ساعة`;
    if (diffDays < 7) return `منذ ${diffDays} يوم`;

    return formatDate(date);
}

// ============================================
// SORT & FILTER UTILITIES
// ============================================

/**
 * Sort products by field
 */
export function sortProducts<T extends Record<string, unknown>>(
    items: T[],
    field: keyof T,
    direction: 'asc' | 'desc' = 'asc'
): T[] {
    return [...items].sort((a, b) => {
        const aVal = a[field];
        const bVal = b[field];

        if (typeof aVal === 'string' && typeof bVal === 'string') {
            return direction === 'asc'
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);
        }

        if (typeof aVal === 'number' && typeof bVal === 'number') {
            return direction === 'asc' ? aVal - bVal : bVal - aVal;
        }

        return 0;
    });
}

/**
 * Filter products by search query
 */
export function filterBySearch<T extends { translations?: { en?: { name: string }; ar?: { name: string } } }>(
    items: T[],
    query: string
): T[] {
    if (!query) return items;

    const lowerQuery = query.toLowerCase();

    return items.filter(item => {
        const enName = item.translations?.en?.name?.toLowerCase() || '';
        const arName = item.translations?.ar?.name || '';

        return enName.includes(lowerQuery) || arName.includes(query);
    });
}
