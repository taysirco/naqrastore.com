import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { adminDb } from '@/lib/firebase-admin';
import { getProductBySlug, StaticProduct, getSmartRelatedProducts } from '@/lib/static-products';
import ProductPageClient from './ProductPageClient';

type Props = {
    params: Promise<{ locale: string; brand: string; category: string; slug: string }>;
};

interface Product {
    id: string;
    slug: string;
    sku?: string;
    brand: string;
    categorySlug: string;
    price: number;
    originalPrice?: number;
    stock?: number;
    featured?: boolean;
    images?: Array<{ url: string; alt?: string; isPrimary?: boolean }>;
    translations?: {
        en?: { name?: string; description?: string; shortDescription?: string; features?: string[]; metaTitle?: string; metaDesc?: string; faqs?: Array<{ question: string; answer: string }> };
        ar?: { name?: string; description?: string; shortDescription?: string; features?: string[]; metaTitle?: string; metaDesc?: string; faqs?: Array<{ question: string; answer: string }> };
    };
    seo?: { keywords?: string; focusKeyword?: string; canonical?: string };
}

async function getProduct(slug: string): Promise<Product | null> {
    // First try static data
    const staticProduct = getProductBySlug(slug);
    if (staticProduct) {
        return {
            id: `static_${staticProduct.slug}`,
            ...staticProduct
        } as Product;
    }

    // Then try Firebase
    if (!adminDb) return null;

    try {
        const snapshot = await adminDb.collection('products')
            .where('slug', '==', slug)
            .limit(1)
            .get();

        if (snapshot.empty) return null;

        return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Product;
    } catch {
        return null;
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug, brand, category } = await params;
    const product = await getProduct(slug);

    if (!product) {
        return {
            title: locale === 'ar' ? 'المنتج غير موجود' : 'Product Not Found'
        };
    }

    const isArabic = locale === 'ar';
    const t = product.translations?.[isArabic ? 'ar' : 'en'] || product.translations?.en || {};

    return {
        title: t.metaTitle || t.name,
        description: t.metaDesc || t.shortDescription || t.description?.substring(0, 160),
        keywords: product.seo?.keywords || '',
        openGraph: {
            title: t.metaTitle || t.name,
            description: t.metaDesc || t.shortDescription,
            siteName: isArabic ? 'كايرو فولت - مصر' : 'CairoVolt Egypt',
            images: product.images?.[0]?.url ? [{
                url: product.images[0].url,
                alt: isArabic
                    ? `${t.name} اصلي في مصر - توصيل سريع القاهرة والجيزة`
                    : `${t.name} Original Egypt - Fast Cairo Delivery`,
                width: 1200,
                height: 630,
            }] : [],
            locale: isArabic ? 'ar_EG' : 'en_US',
            type: 'website',
            countryName: 'Egypt',
        },
        alternates: {
            canonical: `https://cairovolt.com/${locale}/${brand}/${category}/${slug}`,
            languages: {
                'ar': `https://cairovolt.com/ar/${brand}/${category}/${slug}`,
                'en': `https://cairovolt.com/en/${brand}/${category}/${slug}`,
            }
        },
        // Geo Meta Tags
        other: {
            'geo.region': 'EG',
            'geo.placename': isArabic ? 'القاهرة، مصر' : 'Cairo, Egypt',
            'geo.position': '30.0444;31.2357',
            'ICBM': '30.0444, 31.2357',
        },
    };
}

import { ProductSchema, BreadcrumbSchema, FAQSchema } from '@/components/schemas/ProductSchema';
import { SpeakableSchema } from '@/components/schemas/AEOSchemas';

// Removed local ProductSchema and BreadcrumbSchema functions to use global robust component

export default async function ProductPage({ params }: Props) {
    const { locale, brand, category, slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        notFound();
    }

    // Get static product for smart related products
    const staticProduct = getProductBySlug(slug);

    // Use smart algorithm to get related products (always returns products)
    const relatedProducts = staticProduct
        ? getSmartRelatedProducts(staticProduct, 8).map(p => ({ id: `static_${p.slug}`, ...p } as Product))
        : [];

    const productName = product.translations?.[locale as 'ar' | 'en']?.name || product.translations?.en?.name || '';
    const productDescription = product.translations?.[locale as 'ar' | 'en']?.description || product.translations?.en?.description || '';
    const isArabic = locale === 'ar';

    return (
        <>
            <ProductSchema
                product={{
                    ...product,
                    sku: product.sku || product.id,
                    stock: product.stock || 0,
                    translations: {
                        en: {
                            name: product.translations?.en?.name || '',
                            description: product.translations?.en?.description || ''
                        },
                        ar: {
                            name: product.translations?.ar?.name || '',
                            description: product.translations?.ar?.description || ''
                        }
                    },
                    images: product.images?.map(img => ({ url: img.url, alt: img.alt || '' })) || []
                }}
                locale={locale}
            />

            {/* BreadcrumbSchema for navigation */}
            <BreadcrumbSchema
                items={[
                    { name: isArabic ? 'الرئيسية' : 'Home', url: `https://cairovolt.com/${locale}` },
                    { name: brand.charAt(0).toUpperCase() + brand.slice(1), url: `https://cairovolt.com/${locale}/${brand}` },
                    { name: category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), url: `https://cairovolt.com/${locale}/${brand}/${category}` },
                    { name: productName, url: `https://cairovolt.com/${locale}/${brand}/${category}/${slug}` },
                ]}
                locale={locale}
            />

            {/* SpeakableSchema for voice search */}
            <SpeakableSchema
                pageUrl={`https://cairovolt.com/${locale}/${brand}/${category}/${slug}`}
                speakableSelectors={['h1', '.product-description', '.product-features']}
                headline={productName}
                description={productDescription.substring(0, 200)}
                locale={locale}
            />

            {/* Product-Specific FAQSchema */}
            {(() => {
                const productFaqs = product.translations?.[isArabic ? 'ar' : 'en']?.faqs;
                return productFaqs && productFaqs.length > 0 ? (
                    <FAQSchema
                        faqs={productFaqs}
                        locale={locale}
                    />
                ) : null;
            })()}

            {/* Breadcrumb Schema provided via Breadcrumb component or separate global if needed */}
            <ProductPageClient
                product={product}
                relatedProducts={relatedProducts}
                locale={locale}
                brand={brand}
                category={category}
            />
        </>
    );
}

