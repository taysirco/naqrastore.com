'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { CategoryComparisonTable, ExpertOpinion } from './seo/AIOverviewsOptimization';

interface Product {
    id: string;
    slug: string;
    brand: string;
    categorySlug: string;
    price: number;
    originalPrice?: number;
    images?: Array<{ url: string; alt?: string; isPrimary?: boolean }>;
    translations?: {
        en?: { name?: string; description?: string; shortDescription?: string };
        ar?: { name?: string; description?: string; shortDescription?: string };
    };
}

interface LocalizedContent {
    title: string;
    subtitle: string;
    description: string;
    products: { name: string; price: number; badge?: string }[];
}

interface SEOContent {
    ar: LocalizedContent;
    en: LocalizedContent;
}

interface CategoryTemplateProps {
    brand: 'Anker' | 'Joyroom';
    brandColor: 'blue' | 'red';
    category: string;
    categorySlug: string;
    seoContent: SEOContent;
}

// Category slug to translation key mapping
const categoryKeyMap: Record<string, string> = {
    'power-banks': 'powerBanks',
    'wall-chargers': 'wallChargers',
    'cables': 'cables',
    'car-chargers': 'carChargers',
    'audio': 'audio',
    'smart-watches': 'smartWatches',
    'car-holders': 'carHolders',
    'other': 'other',
};

export default function CategoryTemplate({
    brand,
    brandColor,
    category,
    categorySlug,
    seoContent
}: CategoryTemplateProps) {
    const locale = useLocale();
    const tCat = useTranslations('Categories');
    const tBrand = useTranslations('Brands');
    const tCommon = useTranslations('Common');
    const content = locale === 'ar' ? seoContent.ar : seoContent.en;
    const isRTL = locale === 'ar';

    // Get translated category name
    const categoryKey = categoryKeyMap[categorySlug] || 'other';
    const translatedCategory = tCat(categoryKey);
    const translatedBrand = brand === 'Anker' ? tBrand('anker') : tBrand('joyroom');

    const [dbProducts, setDbProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/products?brand=${brand}&category=${categorySlug}`)
            .then(res => res.json())
            .then(data => {
                // Handle both old array format and new paginated format
                if (data.items && Array.isArray(data.items)) {
                    setDbProducts(data.items);
                } else if (Array.isArray(data)) {
                    setDbProducts(data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [brand, categorySlug]);

    const brandColorClass = brandColor === 'blue'
        ? 'from-blue-600 to-blue-400'
        : 'from-red-600 to-red-400';

    const badgeColorClass = brandColor === 'blue'
        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';

    const buttonColorClass = brandColor === 'blue'
        ? 'bg-blue-600 hover:bg-blue-700'
        : 'bg-red-600 hover:bg-red-700';

    // Use database products if available, otherwise fall back to seoContent
    const displayProducts = dbProducts.length > 0
        ? dbProducts.map(p => ({
            id: p.id,
            slug: p.slug,
            name: p.translations?.[locale as 'ar' | 'en']?.name || p.translations?.en?.name || 'Product',
            price: p.price,
            originalPrice: p.originalPrice,
            image: p.images?.[0]?.url,
            badge: undefined as string | undefined
        }))
        : content.products.map((p, idx) => ({ ...p, id: String(idx), slug: '', image: undefined as string | undefined, originalPrice: undefined as number | undefined }));

    return (
        <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Hero Section */}
            <section className={`bg-gradient-to-br ${brandColorClass} text-white py-16`}>
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <nav className="text-sm text-white/70 mb-6">
                        <Link href={`/${locale === 'ar' ? 'ar' : 'en'}`} className="hover:text-white">
                            {tCommon('home')}
                        </Link>
                        <span className="mx-2">/</span>
                        <Link href={`/${locale === 'ar' ? 'ar' : 'en'}/${brand.toLowerCase()}`} className="hover:text-white">
                            {translatedBrand}
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-white font-medium">{translatedCategory}</span>
                    </nav>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h1>
                    <p className="text-xl text-white/90 mb-6">{content.subtitle}</p>

                    <div className="flex items-center gap-4 text-sm">
                        <span className="bg-white/20 px-4 py-2 rounded-full">
                            ✓ {locale === 'ar' ? 'ضمان أصلي' : 'Official Warranty'}
                        </span>
                        <span className="bg-white/20 px-4 py-2 rounded-full">
                            ✓ {locale === 'ar' ? 'شحن سريع' : 'Fast Shipping'}
                        </span>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="container mx-auto px-4 py-12">
                {/* AI Overviews: Expert Opinion */}
                <ExpertOpinion
                    productName={translatedCategory}
                    brand={translatedBrand}
                    category={categorySlug}
                    locale={locale}
                />

                {/* SEO Description */}
                <div className="max-w-4xl mb-12 prose prose-lg dark:prose-invert">
                    <div
                        className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line"
                        dangerouslySetInnerHTML={{
                            __html: content.description
                                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 dark:text-white">$1</strong>')
                                .replace(/- /g, '• ')
                        }}
                    />
                </div>

                {/* AI Overviews: Comparison Table */}
                <CategoryComparisonTable
                    products={content.products}
                    categoryName={translatedCategory}
                    locale={locale}
                />

                {/* Products Grid */}
                <h2 className="text-2xl font-bold mb-8">
                    {locale === 'ar' ? 'المنتجات المتوفرة' : 'Available Products'}
                    {loading && <span className="text-sm font-normal text-gray-500 ml-2">Loading...</span>}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayProducts.map((product, idx) => (
                        <Link
                            key={product.id || idx}
                            href={product.slug
                                ? `/${locale}/${brand.toLowerCase()}/${categorySlug}/${product.slug}`
                                : '#'
                            }
                            className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Product Image */}
                            <div className={`h-48 bg-gradient-to-br ${brandColorClass} opacity-10 relative`}>
                                {product.image ? (
                                    <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-contain p-4" />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className={`text-6xl font-bold bg-gradient-to-r ${brandColorClass} bg-clip-text text-transparent`}>
                                            {brand.charAt(0)}
                                        </span>
                                    </div>
                                )}
                                {product.badge && (
                                    <span className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} px-3 py-1 text-xs font-bold rounded-full ${badgeColorClass}`}>
                                        {product.badge}
                                    </span>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="p-6">
                                <span className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${brandColorClass} bg-clip-text text-transparent`}>
                                    {brand}
                                </span>
                                <h3 className="text-lg font-bold mt-2 mb-4 group-hover:text-blue-600 transition-colors">
                                    {product.name}
                                </h3>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {product.price}
                                        </span>
                                        <span className="text-sm text-gray-500 mr-1">
                                            {locale === 'ar' ? 'جنيه' : 'EGP'}
                                        </span>
                                    </div>
                                    <span className={`px-4 py-2 ${buttonColorClass} text-white text-sm font-bold rounded-lg transition-colors`}>
                                        {locale === 'ar' ? 'التفاصيل' : 'Details'}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA Section */}
                <div className={`mt-16 p-8 rounded-2xl bg-gradient-to-r ${brandColorClass} text-white text-center`}>
                    <h3 className="text-2xl font-bold mb-4">
                        {locale === 'ar' ? 'لم تجد ما تبحث عنه؟' : "Can't find what you're looking for?"}
                    </h3>
                    <p className="mb-6 text-white/90">
                        {locale === 'ar'
                            ? 'تواصل معنا عبر واتساب للحصول على أفضل العروض'
                            : 'Contact us on WhatsApp for the best deals'}
                    </p>
                    <a
                        href="https://wa.me/201000000000"
                        className="inline-block px-8 py-3 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-colors"
                    >
                        {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                    </a>
                </div>
            </section>
        </div>
    );
}
