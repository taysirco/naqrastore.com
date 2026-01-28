// ============================================
// Geo SEO Utilities for Egyptian Market
// ============================================

/**
 * Egyptian cities for geo-targeted content
 */
export const EGYPTIAN_CITIES = {
    primary: ['القاهرة', 'الجيزة', 'الإسكندرية'],
    primaryEn: ['Cairo', 'Giza', 'Alexandria'],
    secondary: ['المنصورة', 'طنطا', 'الزقازيق', 'أسيوط', 'المنيا'],
};

/**
 * Generate geo-optimized Alt Text for images
 * @param productName - Product name in current language
 * @param locale - Current locale ('ar' or 'en')
 * @param brand - Brand name
 * @returns Geo-optimized alt text
 */
export function generateGeoAltText(
    productName: string,
    locale: 'ar' | 'en',
    brand?: string
): string {
    if (locale === 'ar') {
        const brandText = brand ? `${brand} ` : '';
        return `${brandText}${productName} اصلي في مصر - توصيل سريع القاهرة والجيزة`;
    }
    const brandText = brand ? `${brand} ` : '';
    return `${brandText}${productName} Original Egypt - Fast Cairo Delivery`;
}

/**
 * Generate Arabic geo Alt Text with warranty mention
 * @param productName - Product name
 * @param brand - Brand name
 * @returns Arabic alt text with warranty
 */
export function generateGeoAltTextAr(
    productName: string,
    brand?: string
): string {
    const brandText = brand ? `${brand} ` : '';
    return `${brandText}${productName} اصلي في مصر - ضمان سنتين - توصيل لجميع المحافظات`;
}

/**
 * Generate SEO-friendly filename with geo suffix
 * @param baseName - Original filename or product name
 * @param brand - Brand name
 * @returns Sanitized geo filename
 */
export function generateGeoFilename(
    baseName: string,
    brand?: string
): string {
    const sanitized = baseName
        .toLowerCase()
        .replace(/[\u0600-\u06FF]/g, '') // Remove Arabic
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

    const brandPrefix = brand ? brand.toLowerCase() + '-' : '';
    const name = sanitized || 'product';
    const timestamp = Date.now();

    return `${brandPrefix}${name}-egypt-${timestamp}.webp`;
}

/**
 * Schema.org geo properties for Egypt
 */
export const EGYPT_SCHEMA_GEO = {
    areaServed: {
        '@type': 'Country',
        name: 'Egypt',
        alternateName: 'مصر',
    },
    availableAtOrFrom: {
        '@type': 'Place',
        name: 'CairoVolt Egypt',
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'EG',
            addressRegion: 'Cairo Governorate',
            addressLocality: 'Cairo',
        },
    },
    eligibleRegion: [
        { '@type': 'Country', name: 'Egypt' },
        { '@type': 'AdministrativeArea', name: 'Cairo' },
        { '@type': 'AdministrativeArea', name: 'Giza' },
        { '@type': 'AdministrativeArea', name: 'Alexandria' },
    ],
};

/**
 * Geo meta tags for HTML head
 */
export const EGYPT_GEO_META = {
    'geo.region': 'EG',
    'geo.placename': 'Cairo, Egypt',
    'geo.position': '30.0444;31.2357',
    'ICBM': '30.0444, 31.2357',
};

/**
 * Image Sitemap geo caption generator
 * @param productName - Product name
 * @param locale - Locale
 * @returns Caption with geo
 */
export function generateImageSitemapCaption(
    productName: string,
    locale: 'ar' | 'en'
): string {
    if (locale === 'ar') {
        return `${productName} اصلي - توصيل سريع لجميع محافظات مصر`;
    }
    return `${productName} Original - Fast Delivery All Egypt`;
}
