'use client';

import Script from 'next/script';

interface ProductSchemaProps {
    product: {
        slug: string;
        sku: string;
        brand: string;
        price: number;
        originalPrice?: number;
        stock: number;
        videoUrl?: string;
        images: Array<{ url: string; alt: string }>;
        translations: {
            en: { name: string; description: string };
            ar: { name: string; description: string };
        };
    };
    locale: string;
    baseUrl?: string;
}

export function ProductSchema({ product, locale, baseUrl = 'https://cairovolt.com' }: ProductSchemaProps) {
    const t = product.translations[locale as 'en' | 'ar'] || product.translations.en;
    const isArabic = locale === 'ar';

    // Generate Video Schema if videoUrl exists
    const videoSchema = product.videoUrl ? {
        "@type": "VideoObject",
        "name": t.name,
        "description": t.description,
        "thumbnailUrl": product.images[0]?.url ? `${baseUrl}${product.images[0].url}` : "",
        "uploadDate": new Date().toISOString(), // In real app, should use product creation date
        "contentUrl": product.videoUrl
    } : null;

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: t.name,
        description: t.description,
        sku: product.sku,
        brand: {
            '@type': 'Brand',
            name: product.brand,
        },
        image: product.images.map(img => `${baseUrl}${img.url}`),
        // Add subjectOf property for VideoObject
        ...(videoSchema && { "subjectOf": videoSchema }),
        // Geo SEO: Area Served
        areaServed: {
            '@type': 'Country',
            name: 'Egypt',
            alternateName: 'مصر',
        },
        // Geo SEO: Available At
        availableAtOrFrom: {
            '@type': 'Place',
            name: isArabic ? 'كايرو فولت - مصر' : 'CairoVolt Egypt',
            address: {
                '@type': 'PostalAddress',
                addressCountry: 'EG',
                addressRegion: isArabic ? 'القاهرة' : 'Cairo Governorate',
                addressLocality: isArabic ? 'القاهرة' : 'Cairo',
            },
        },
        offers: {
            '@type': 'Offer',
            url: `${baseUrl}/${locale}/${product.brand.toLowerCase()}/${product.slug}`,
            priceCurrency: 'EGP',
            price: product.price,
            priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            availability: product.stock > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            itemCondition: 'https://schema.org/NewCondition',
            // Geo SEO: Eligible Region - All Egyptian Governorates
            eligibleRegion: [
                {
                    '@type': 'Country',
                    name: 'Egypt',
                    sameAs: 'https://en.wikipedia.org/wiki/Egypt'
                },
                // Major Urban Governorates
                { '@type': 'AdministrativeArea', name: 'Cairo Governorate' },
                { '@type': 'AdministrativeArea', name: 'Giza Governorate' },
                { '@type': 'AdministrativeArea', name: 'Alexandria Governorate' },
                { '@type': 'AdministrativeArea', name: 'Qalyubia Governorate' },
                // Delta Governorates
                { '@type': 'AdministrativeArea', name: 'Dakahlia Governorate' },
                { '@type': 'AdministrativeArea', name: 'Sharqia Governorate' },
                { '@type': 'AdministrativeArea', name: 'Gharbia Governorate' },
                { '@type': 'AdministrativeArea', name: 'Monufia Governorate' },
                { '@type': 'AdministrativeArea', name: 'Beheira Governorate' },
                { '@type': 'AdministrativeArea', name: 'Kafr El Sheikh Governorate' },
                { '@type': 'AdministrativeArea', name: 'Damietta Governorate' },
                // Canal Governorates
                { '@type': 'AdministrativeArea', name: 'Port Said Governorate' },
                { '@type': 'AdministrativeArea', name: 'Ismailia Governorate' },
                { '@type': 'AdministrativeArea', name: 'Suez Governorate' },
                // Upper Egypt Governorates
                { '@type': 'AdministrativeArea', name: 'Fayoum Governorate' },
                { '@type': 'AdministrativeArea', name: 'Beni Suef Governorate' },
                { '@type': 'AdministrativeArea', name: 'Minya Governorate' },
                { '@type': 'AdministrativeArea', name: 'Asyut Governorate' },
                { '@type': 'AdministrativeArea', name: 'Sohag Governorate' },
                { '@type': 'AdministrativeArea', name: 'Qena Governorate' },
                { '@type': 'AdministrativeArea', name: 'Luxor Governorate' },
                { '@type': 'AdministrativeArea', name: 'Aswan Governorate' },
                // Coastal & Desert Governorates
                { '@type': 'AdministrativeArea', name: 'Red Sea Governorate' },
                { '@type': 'AdministrativeArea', name: 'North Sinai Governorate' },
                { '@type': 'AdministrativeArea', name: 'South Sinai Governorate' },
                { '@type': 'AdministrativeArea', name: 'Matrouh Governorate' },
                { '@type': 'AdministrativeArea', name: 'New Valley Governorate' },
            ],
            seller: {
                '@type': 'Organization',
                name: isArabic ? 'كايرو فولت' : 'Cairo Volt',
            },
            // Shipping Details - Shows "Free Shipping" badge in Google
            shippingDetails: {
                '@type': 'OfferShippingDetails',
                shippingRate: {
                    '@type': 'MonetaryAmount',
                    value: product.price >= 500 ? 0 : 40,
                    currency: 'EGP',
                },
                shippingDestination: {
                    '@type': 'DefinedRegion',
                    addressCountry: 'EG',
                },
                deliveryTime: {
                    '@type': 'ShippingDeliveryTime',
                    handlingTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 0,
                        maxValue: 1,
                        unitCode: 'd',
                    },
                    transitTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 1,
                        maxValue: 5,
                        unitCode: 'd',
                    },
                },
            },
            // Return Policy - Shows "14-day returns" badge in Google
            hasMerchantReturnPolicy: {
                '@type': 'MerchantReturnPolicy',
                applicableCountry: 'EG',
                returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                merchantReturnDays: 14,
                returnMethod: 'https://schema.org/ReturnByMail',
                returnFees: 'https://schema.org/FreeReturn',
            },
        },
        // Aggregate Rating (placeholder - can be dynamic later)
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '127',
            bestRating: '5',
            worstRating: '1',
        },
    };

    // Add price drop info if there's a discount
    if (product.originalPrice && product.originalPrice > product.price) {
        (schema.offers as Record<string, unknown>).priceSpecification = {
            '@type': 'PriceSpecification',
            price: product.price,
            priceCurrency: 'EGP',
            valueAddedTaxIncluded: true,
        };
    }

    return (
        <Script
            id="product-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Organization Schema for the whole site
export function OrganizationSchema({ locale }: { locale: string }) {
    const isArabic = locale === 'ar';

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: isArabic ? 'كايرو فولت' : 'Cairo Volt',
        alternateName: isArabic ? 'Cairo Volt' : 'كايرو فولت',
        url: 'https://cairovolt.com',
        logo: 'https://cairovolt.com/logo.png',
        description: isArabic
            ? 'الموزع المعتمد لمنتجات أنكر وجوي روم في مصر'
            : 'Authorized dealer for Anker and Joyroom products in Egypt',
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'EG',
            addressLocality: isArabic ? 'القاهرة' : 'Cairo',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            availableLanguage: ['ar', 'en'],
        },
        sameAs: [
            'https://facebook.com/cairovolt',
            'https://instagram.com/cairovolt',
        ],
    };

    return (
        <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// FAQ Schema for FAQ page
export function FAQSchema({ faqs, locale }: { faqs: Array<{ question: string; answer: string }>; locale: string }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    return (
        <Script
            id="faq-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Breadcrumb Schema
export function BreadcrumbSchema({ items, locale }: {
    items: Array<{ name: string; url: string }>;
    locale: string;
}) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <Script
            id="breadcrumb-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
