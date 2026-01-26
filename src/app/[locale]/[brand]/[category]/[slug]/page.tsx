import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { adminDb } from '@/lib/firebase-admin';
import { getProductBySlug, StaticProduct } from '@/lib/static-products';
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
        en?: { name?: string; description?: string; shortDescription?: string; features?: string[]; metaTitle?: string; metaDesc?: string };
        ar?: { name?: string; description?: string; shortDescription?: string; features?: string[]; metaTitle?: string; metaDesc?: string };
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
            images: product.images?.[0]?.url ? [{ url: product.images[0].url }] : [],
            locale: isArabic ? 'ar_EG' : 'en_US',
            type: 'website',
        },
        alternates: {
            languages: {
                'ar': `/ar/${brand}/${category}/${slug}`,
                'en': `/en/${brand}/${category}/${slug}`,
            }
        }
    };
}

function ProductSchema({ product, locale }: { product: Product; locale: string }) {
    const isArabic = locale === 'ar';
    const t = product.translations?.[isArabic ? 'ar' : 'en'] || product.translations?.en || {};
    const imageUrl = product.images?.[0]?.url || '';

    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": t.name,
        "description": t.description || t.shortDescription,
        "image": imageUrl,
        "brand": {
            "@type": "Brand",
            "name": product.brand
        },
        "sku": product.sku,
        "offers": {
            "@type": "Offer",
            "price": product.price,
            "priceCurrency": "EGP",
            "availability": (product.stock || 0) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "seller": {
                "@type": "Organization",
                "name": "Mobile Accessories Egypt"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "150"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

function BreadcrumbSchema({ product, locale, category }: { product: Product; locale: string; category: string }) {
    const isArabic = locale === 'ar';
    const t = product.translations?.[isArabic ? 'ar' : 'en'] || product.translations?.en || {};
    const brandLower = product.brand.toLowerCase();

    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": isArabic ? "الرئيسية" : "Home",
                "item": `/${locale}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": product.brand,
                "item": `/${locale}/${brandLower}`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": category.replace('-', ' '),
                "item": `/${locale}/${brandLower}/${category}`
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": t.name
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export default async function ProductPage({ params }: Props) {
    const { locale, brand, category, slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        notFound();
    }

    return (
        <>
            <ProductSchema product={product} locale={locale} />
            <BreadcrumbSchema product={product} locale={locale} category={category} />
            <ProductPageClient
                product={product}
                locale={locale}
                brand={brand}
                category={category}
            />
        </>
    );
}
