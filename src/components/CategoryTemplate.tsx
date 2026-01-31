'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { CategorySeoData, FAQItem, BuyingGuideSection, TrustSignal } from '@/data/category-seo';
import { BreadcrumbSchema } from './schemas/ProductSchema';
import { HowToSchema, ItemListSchema } from './schemas/AEOSchemas';
import RelatedLinks from './seo/RelatedLinks';
import { CategoryAEOBlock } from './seo/AEOSummaryBlock';

const CategoryComparisonTable = dynamic(() => import('./seo/AIOverviewsOptimization').then(mod => mod.CategoryComparisonTable), {
    loading: () => <div className="animate-pulse h-64 bg-gray-100 dark:bg-gray-800 rounded-xl mb-12"></div>
});
const ExpertOpinion = dynamic(() => import('./seo/AIOverviewsOptimization').then(mod => mod.ExpertOpinion), {
    loading: () => <div className="animate-pulse h-48 bg-gray-100 dark:bg-gray-800 rounded-xl mb-12"></div>
});

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

interface CategoryTemplateProps {
    brand: 'Anker' | 'Joyroom';
    brandColor: 'blue' | 'red';
    category: string;
    categorySlug: string;
    seoContent: CategorySeoData['seoContent'];
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

function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

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

    const bgLightClass = brandColor === 'blue'
        ? 'bg-blue-50 dark:bg-blue-900/10'
        : 'bg-red-50 dark:bg-red-900/10';

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

    const breadcrumbs = [
        { name: tCommon('home'), url: `https://cairovolt.com/${locale === 'ar' ? 'ar' : 'en'}` },
        { name: translatedBrand, url: `https://cairovolt.com/${locale === 'ar' ? 'ar' : 'en'}/${brand.toLowerCase()}` },
        { name: translatedCategory, url: `https://cairovolt.com/${locale === 'ar' ? 'ar' : 'en'}/${brand.toLowerCase()}/${categorySlug}` }
    ];

    return (
        <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
            {content.faq && <FAQSchema faqs={content.faq} />}
            <BreadcrumbSchema items={breadcrumbs} locale={locale} />

            {/* HowTo Schema for Buying Guide - AEO Optimization */}
            {content.buyingGuide && (
                <HowToSchema
                    title={locale === 'ar'
                        ? `كيفية اختيار ${translatedCategory} ${translatedBrand}`
                        : `How to Choose ${translatedBrand} ${translatedCategory}`}
                    description={content.subtitle}
                    steps={content.buyingGuide.map((section: BuyingGuideSection) => ({
                        name: section.title,
                        text: section.content,
                    }))}
                    locale={locale}
                />
            )}

            {/* ItemList Schema for Product Listings */}
            {displayProducts.length > 0 && (
                <ItemListSchema
                    listName={content.title}
                    items={displayProducts.map((p, idx) => ({
                        name: p.name,
                        url: p.slug
                            ? `https://cairovolt.com/${locale}/${brand.toLowerCase()}/${categorySlug}/${p.slug}`
                            : `https://cairovolt.com/${locale}/${brand.toLowerCase()}/${categorySlug}`,
                        image: p.image || '/placeholder.png',
                        price: p.price,
                        position: idx + 1,
                    }))}
                    locale={locale}
                />
            )}

            {/* Hero Section */}
            <section className={`bg-gradient-to-br ${brandColorClass} text-white py-8 md:py-16`}>
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <nav className="text-xs sm:text-sm text-white/70 mb-4 md:mb-6 px-1">
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

                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">{content.title}</h1>
                    <p className="text-base md:text-xl text-white/90 mb-4 md:mb-6">{content.subtitle}</p>

                    {/* Trust Signals (Hero) */}
                    {content.trustSignals && (
                        <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-6">
                            {content.trustSignals.map((signal, idx) => (
                                <div key={idx} className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                                    <span className="text-yellow-300">
                                        {signal.type === 'originality' && '🛡️'}
                                        {signal.type === 'warranty' && '✨'}
                                        {signal.type === 'expert_verified' && '👨\u200d💻'}
                                    </span>
                                    <span className="text-xs md:text-sm font-medium text-white">{signal.text}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Category AEO Block - Answer-First Content for AI/Voice Search */}
            <div className="container mx-auto px-4 py-4">
                <CategoryAEOBlock
                    categoryName={translatedCategory}
                    categoryNameAr={tCat(categoryKey)}
                    brand={translatedBrand}
                    productCount={displayProducts.length}
                    priceRange={{
                        min: Math.min(...displayProducts.map(p => p.price)),
                        max: Math.max(...displayProducts.map(p => p.price))
                    }}
                    locale={locale}
                />
            </div>

            {/* Content Section */}
            <section className="container mx-auto px-4 py-12">
                {/* AI Overviews: Expert Opinion */}
                <ExpertOpinion
                    productName={translatedCategory}
                    brand={translatedBrand}
                    category={categorySlug}
                    locale={locale}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content Column */}
                    <div className="lg:col-span-8">
                        {/* SEO Description */}
                        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                            <div
                                className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line"
                                dangerouslySetInnerHTML={{
                                    __html: content.description
                                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 dark:text-white">$1</strong>')
                                        .replace(/- /g, '• ')
                                }}
                            />
                        </div>

                        {/* Buying Guide (New) */}
                        {content.buyingGuide && (
                            <div className="mb-12">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <span className="text-2xl">📚</span>
                                    {locale === 'ar' ? 'دليل الشراء الذكي' : 'Smart Buying Guide'}
                                </h2>
                                <div className="space-y-6">
                                    {content.buyingGuide.map((section, idx) => (
                                        <div key={idx} className={`${bgLightClass} rounded-2xl p-6 border border-gray-100 dark:border-gray-800`}>
                                            <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
                                                {section.title}
                                            </h3>
                                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: section.content
                                                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                            .replace(/- /g, '<br/>• ')
                                                            .replace(/\n\d+\./g, '<br/>$&')
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* AI Overviews: Comparison Table */}
                        <CategoryComparisonTable
                            products={content.products}
                            categoryName={translatedCategory}
                            locale={locale}
                        />

                        {/* FAQ Section (New) */}
                        {content.faq && (
                            <div className="mt-12 mb-12">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <span className="text-2xl">🤔</span>
                                    {locale === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
                                </h2>
                                <div className="space-y-4">
                                    {content.faq.map((item, idx) => (
                                        <details key={idx} className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                                            <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                                <span className="font-medium text-gray-900 dark:text-white pr-4">{item.question}</span>
                                                <span className="transform group-open:rotate-180 transition-transform text-gray-400">▼</span>
                                            </summary>
                                            <div className="px-4 pb-4 pt-2 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800">
                                                {item.answer}
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Products Column */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24">
                            <h2 className="text-xl font-bold mb-6">
                                {locale === 'ar' ? 'أفضل المنتجات' : 'Top Products'}
                                {loading && <span className="text-sm font-normal text-gray-500 ml-2">...</span>}
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                                {displayProducts.map((product, idx) => (
                                    <Link
                                        key={product.id || idx}
                                        href={product.slug
                                            ? `/${locale}/${brand.toLowerCase()}/${categorySlug}/${product.slug}`
                                            : '#'
                                        }
                                        className="flex gap-4 group bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-3 hover:shadow-lg hover:border-gray-200 transition-all duration-300"
                                    >
                                        {/* Product Image */}
                                        <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-lg relative overflow-hidden flex-shrink-0">
                                            {product.image ? (
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    sizes="80px"
                                                    className="object-contain p-1 group-hover:scale-105 transition-transform"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className={`text-xl font-bold bg-gradient-to-r ${brandColorClass} bg-clip-text text-transparent`}>
                                                        {brand.charAt(0)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                {product.badge && (
                                                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 ${badgeColorClass}`}>
                                                        {product.badge}
                                                    </span>
                                                )}
                                                <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                                                    {product.name}
                                                </h3>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="text-sm font-bold text-gray-900 dark:text-white">
                                                    {product.price} <span className="text-[10px] text-gray-500 font-normal">{locale === 'ar' ? 'ج.م' : 'EGP'}</span>
                                                </div>
                                                <span className={`w-6 h-6 rounded-full flex items-center justify-center ${brandColorClass} text-white shadow-sm`}>
                                                    →
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Trust Box (Desktop) */}
                            <div className={`mt-8 p-6 rounded-2xl ${bgLightClass} border border-gray-100 dark:border-gray-800 hidden lg:block`}>
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <span>🛡️</span> {locale === 'ar' ? 'ضمان كايرو فولت' : 'CairoVolt Promise'}
                                </h3>
                                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                    <li className="flex items-center gap-2">✓ {locale === 'ar' ? 'منتجات أصلية 100%' : '100% Original'}</li>
                                    <li className="flex items-center gap-2">✓ {locale === 'ar' ? 'ضمان الوكيل الرسمي' : 'Official Warranty'}</li>
                                    <li className="flex items-center gap-2">✓ {locale === 'ar' ? 'استرجاع خلال 14 يوم' : '14 Days Return'}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Categories - Internal Linking */}
                <RelatedLinks
                    currentUrl={`/${brand.toLowerCase()}/${categorySlug}`}
                    locale={locale}
                    variant="card"
                    maxLinks={4}
                />

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
