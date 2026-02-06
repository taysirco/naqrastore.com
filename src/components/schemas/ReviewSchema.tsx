// Server Component - Schemas must be SSR for Google to crawl them
// DO NOT add 'use client' here!

// ============================================
// REVIEW SCHEMA WITH PROS/CONS
// ============================================
// Enhanced review schema that includes structured pros/cons
// for better AI extraction and rich snippets

interface ReviewItem {
    author: string;
    authorType?: 'Person' | 'Organization';
    rating: number;
    reviewBody: string;
    pros?: string[];
    cons?: string[];
    datePublished: string;
    location?: string;
}

interface ReviewSchemaProps {
    productName: string;
    productUrl: string;
    reviews: ReviewItem[];
    locale: string;
}

/**
 * ReviewSchema Component
 * Provides structured review data with Pros/Cons for AI Answer Engines
 * Uses positiveNotes and negativeNotes ItemList structure
 */
export function ReviewSchema({
    productName,
    productUrl,
    reviews,
    locale
}: ReviewSchemaProps) {
    const isArabic = locale === 'ar';

    // Calculate aggregate rating
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : '4.5';

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: productName,
        url: productUrl,
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: avgRating,
            reviewCount: reviews.length.toString(),
            bestRating: '5',
            worstRating: '1',
        },
        review: reviews.map(review => ({
            '@type': 'Review',
            author: {
                '@type': review.authorType || 'Person',
                name: review.author,
            },
            datePublished: review.datePublished,
            reviewRating: {
                '@type': 'Rating',
                ratingValue: review.rating.toString(),
                bestRating: '5',
                worstRating: '1',
            },
            reviewBody: review.reviewBody,
            // Pros/Cons structure for AI extraction
            ...(review.pros && review.pros.length > 0 && {
                positiveNotes: {
                    '@type': 'ItemList',
                    itemListElement: review.pros.map((pro, idx) => ({
                        '@type': 'ListItem',
                        position: idx + 1,
                        name: pro,
                    })),
                },
            }),
            ...(review.cons && review.cons.length > 0 && {
                negativeNotes: {
                    '@type': 'ItemList',
                    itemListElement: review.cons.map((con, idx) => ({
                        '@type': 'ListItem',
                        position: idx + 1,
                        name: con,
                    })),
                },
            }),
            // Location for local SEO
            ...(review.location && {
                contentLocation: {
                    '@type': 'Place',
                    name: review.location,
                    address: {
                        '@type': 'PostalAddress',
                        addressCountry: 'EG',
                    },
                },
            }),
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ============================================
// ENHANCED VIDEO SCHEMA
// ============================================

interface VideoSchemaProps {
    name: string;
    description: string;
    thumbnailUrl: string;
    contentUrl: string;
    embedUrl?: string;
    uploadDate: string;
    duration?: string; // ISO 8601 format (e.g., "PT2M30S" for 2 min 30 sec)
    locale: string;
}

/**
 * VideoObjectSchema Component
 * Complete video schema for product videos
 */
export function VideoObjectSchema({
    name,
    description,
    thumbnailUrl,
    contentUrl,
    embedUrl,
    uploadDate,
    duration,
    locale
}: VideoSchemaProps) {
    const isArabic = locale === 'ar';

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: name,
        description: description,
        thumbnailUrl: thumbnailUrl,
        contentUrl: contentUrl,
        ...(embedUrl && { embedUrl }),
        uploadDate: uploadDate,
        ...(duration && { duration }),
        inLanguage: isArabic ? 'ar-EG' : 'en-US',
        publisher: {
            '@type': 'Organization',
            name: isArabic ? 'كايرو فولت' : 'Cairo Volt',
            logo: {
                '@type': 'ImageObject',
                url: 'https://cairovolt.com/logo.png',
            },
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Stable price validity date - 3 months ahead, computed once at module level
const PRICE_VALID_UNTIL = (() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 3);
    return d.toISOString().split('T')[0];
})();

// ============================================
// GS1 WEB VOCABULARY SCHEMA
// ============================================

interface GS1ProductSchemaProps {
    name: string;
    description: string;
    gtin13?: string;
    mpn?: string;
    brand: string;
    sku: string;
    price: number;
    currency?: string;
    url: string;
    image: string;
    locale: string;
}

/**
 * GS1ProductSchema Component
 * Implements GS1 Web Vocabulary for global product identification
 * Enables AI engines to match products with global databases
 */
export function GS1ProductSchema({
    name,
    description,
    gtin13,
    mpn,
    brand,
    sku,
    price,
    currency = 'EGP',
    url,
    image,
    locale
}: GS1ProductSchemaProps) {
    const isArabic = locale === 'ar';

    const schema = {
        '@context': [
            'https://schema.org',
            {
                'gs1': 'https://gs1.org/voc/',
            }
        ],
        '@type': 'Product',
        name: name,
        description: description,
        url: url,
        image: image,
        brand: {
            '@type': 'Brand',
            name: brand,
        },
        // GS1 Vocabulary fields
        ...(gtin13 && { gtin13: gtin13 }),
        ...(gtin13 && { 'gs1:gtin': gtin13 }),
        ...(mpn && { mpn: mpn }),
        sku: sku,
        // Identifier property for AI matching
        identifier: {
            '@type': 'PropertyValue',
            propertyID: gtin13 ? 'GTIN' : 'SKU',
            value: gtin13 || sku,
        },
        offers: {
            '@type': 'Offer',
            url: url,
            price: price,
            priceCurrency: currency,
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
            priceValidUntil: PRICE_VALID_UNTIL,
            seller: {
                '@type': 'Organization',
                name: isArabic ? 'كايرو فولت' : 'Cairo Volt',
            },
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export default ReviewSchema;
