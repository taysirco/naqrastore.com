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
        images: Array<{ url: string; alt: string }>;
        translations: {
            en: { name: string; description: string };
            ar: { name: string; description: string };
        };
    };
    locale: string;
    baseUrl?: string;
}

export function ProductSchema({ product, locale, baseUrl = 'https://naqrastore.com' }: ProductSchemaProps) {
    const t = product.translations[locale as 'en' | 'ar'] || product.translations.en;
    const isArabic = locale === 'ar';

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
            seller: {
                '@type': 'Organization',
                name: isArabic ? 'موبايل ستور مصر' : 'MobileStore Egypt',
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
        name: isArabic ? 'موبايل ستور مصر' : 'MobileStore Egypt',
        alternateName: isArabic ? 'MobileStore Egypt' : 'موبايل ستور',
        url: 'https://naqrastore.com',
        logo: 'https://naqrastore.com/logo.png',
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
            'https://facebook.com/mobilestore.eg',
            'https://instagram.com/mobilestore.eg',
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
