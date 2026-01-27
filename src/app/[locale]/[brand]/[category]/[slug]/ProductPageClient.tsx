'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { QuickSummary, ProductComparisonTable, ExpertOpinion, ProductFAQ } from '@/components/seo/AIOverviewsOptimization';

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
        en?: { name?: string; description?: string; shortDescription?: string; features?: string[]; metaTitle?: string; metaDesc?: string; faqs?: Array<{ question: string; answer: string }>; };
        ar?: { name?: string; description?: string; shortDescription?: string; features?: string[]; metaTitle?: string; metaDesc?: string; faqs?: Array<{ question: string; answer: string }>; };
    };
    seo?: { keywords?: string; focusKeyword?: string };
}

interface ProductPageClientProps {
    product: Product;
    locale: string;
    brand: string;
    category: string;
}

// Category mapping for breadcrumb
const categoryKeyMap: Record<string, string> = {
    'power-banks': 'powerBanks',
    'wall-chargers': 'wallChargers',
    'cables': 'cables',
    'car-chargers': 'carChargers',
    'audio': 'audio',
    'smart-watches': 'smartWatches',
};

export default function ProductPageClient({ product, locale, brand, category }: ProductPageClientProps) {
    const tCommon = useTranslations('Common');
    const tProduct = useTranslations('Product');
    const tCat = useTranslations('Categories');
    const tBrand = useTranslations('Brands');

    const tFAQ = useTranslations('FAQ');

    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    const getLocalizedHref = (path: string) => {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return locale === 'ar' ? cleanPath : `/${locale}${cleanPath}`;
    };

    const currentTranslation = product.translations?.[locale as 'ar' | 'en'] || product.translations?.en;
    const productName = currentTranslation?.name || product.slug;
    const productDesc = currentTranslation?.description || '';
    const productShortDesc = currentTranslation?.shortDescription || '';
    const productFeatures = currentTranslation?.features || [];

    const images = product.images || [];
    const primaryImage = images[selectedImage]?.url || '';
    const discount = product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : 0;

    const translatedCategory = tCat(categoryKeyMap[category] || 'other');
    const translatedBrand = brand === 'anker' ? tBrand('anker') : tBrand('joyroom');
    const brandColor = brand === 'anker' ? 'blue' : 'red';

    const isRTL = locale === 'ar';

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Breadcrumb */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                <div className="container mx-auto px-4 py-3">
                    <nav className="text-sm text-gray-500 flex flex-wrap items-center gap-1">
                        <Link href={getLocalizedHref('/')} className="hover:text-blue-600 transition-colors">
                            {tCommon('home')}
                        </Link>
                        <span className="mx-1">/</span>
                        <Link href={getLocalizedHref(`/${brand}`)} className="hover:text-blue-600 transition-colors">
                            {translatedBrand}
                        </Link>
                        <span className="mx-1">/</span>
                        <Link href={getLocalizedHref(`/${brand}/${category}`)} className="hover:text-blue-600 transition-colors">
                            {translatedCategory}
                        </Link>
                        <span className="mx-1">/</span>
                        <span className="text-gray-900 dark:text-white font-medium truncate max-w-[200px]">
                            {productName}
                        </span>
                    </nav>
                </div>
            </div>

            {/* Product Section */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative aspect-square bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-lg">
                            {discount > 0 && (
                                <span className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} px-3 py-1.5 bg-red-500 text-white text-sm font-bold rounded-full z-10 shadow-lg`}>
                                    -{discount}%
                                </span>
                            )}
                            {product.featured && (
                                <span className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} px-3 py-1.5 bg-yellow-400 text-black text-sm font-bold rounded-full z-10`}>
                                    ⭐ {isRTL ? 'مميز' : 'Featured'}
                                </span>
                            )}
                            <div className="w-full h-full flex items-center justify-center p-8">
                                {primaryImage ? (
                                    <img
                                        src={primaryImage}
                                        alt={productName}
                                        className="max-w-full max-h-full object-contain transition-transform hover:scale-105"
                                    />
                                ) : (
                                    <div className={`text-8xl font-bold bg-gradient-to-br from-${brandColor}-400 to-${brandColor}-600 bg-clip-text text-transparent`}>
                                        {brand.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Thumbnail Images */}
                        {images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-xl border-2 overflow-hidden transition-all ${selectedImage === idx
                                            ? `border-${brandColor}-600 shadow-lg ring-2 ring-${brandColor}-600/20`
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        <img
                                            src={img.url}
                                            alt={img.alt || productName}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">

                        {/* AI Quick Summary - New Addition */}
                        <QuickSummary
                            product={{
                                brand: product.brand,
                                price: product.price,
                                translations: {
                                    en: {
                                        name: product.translations?.en?.name || product.slug,
                                        shortDescription: product.translations?.en?.shortDescription || ''
                                    },
                                    ar: {
                                        name: product.translations?.ar?.name || product.slug,
                                        shortDescription: product.translations?.ar?.shortDescription || ''
                                    }
                                }
                            }}
                            locale={locale}
                        />

                        {/* Brand & Stock */}
                        <div className="flex flex-wrap items-center gap-2">
                            <span className={`px-4 py-1.5 text-sm font-bold rounded-full ${brand === 'anker'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                }`}>
                                {translatedBrand}
                            </span>
                            {(product.stock || 0) > 0 ? (
                                <span className="px-4 py-1.5 text-sm font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full">
                                    ✓ {tProduct('inStock')}
                                </span>
                            ) : (
                                <span className="px-4 py-1.5 text-sm font-medium bg-gray-100 text-gray-500 rounded-full">
                                    {tProduct('outOfStock')}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                            {productName}
                        </h1>

                        {/* Short Description */}
                        {productShortDesc && (
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                {productShortDesc}
                            </p>
                        )}

                        {/* Price */}
                        <div className="flex flex-wrap items-end gap-3 py-4 border-y border-gray-100 dark:border-gray-800">
                            <span className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                                {product.price.toLocaleString()}
                            </span>
                            <span className="text-xl text-gray-500 mb-1">
                                {tCommon('egp')}
                            </span>
                            {product.originalPrice && (
                                <>
                                    <span className="text-xl text-gray-400 line-through mb-1">
                                        {product.originalPrice.toLocaleString()}
                                    </span>
                                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-sm font-bold rounded">
                                        {isRTL ? `وفر ${(product.originalPrice - product.price).toLocaleString()}` : `Save ${(product.originalPrice - product.price).toLocaleString()}`}
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold text-lg"
                                >
                                    −
                                </button>
                                <span className="px-6 py-3 font-bold text-lg min-w-[3rem] text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold text-lg"
                                >
                                    +
                                </button>
                            </div>
                            <button className={`flex-1 min-w-[200px] px-8 py-4 font-bold text-lg rounded-xl transition-all transform hover:scale-[1.02] shadow-lg ${brand === 'anker'
                                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30'
                                : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/30'
                                }`}>
                                🛒 {tProduct('addToCart')}
                            </button>
                        </div>

                        {/* WhatsApp Order */}
                        <a
                            href={`https://wa.me/201000000000?text=${encodeURIComponent(
                                isRTL
                                    ? `مرحباً، أريد طلب:\n📦 ${productName}\n💰 السعر: ${product.price} جنيه\n🔢 الكمية: ${quantity}`
                                    : `Hi, I want to order:\n📦 ${productName}\n💰 Price: ${product.price} EGP\n🔢 Quantity: ${quantity}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 w-full px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-green-500/30"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            {isRTL ? 'اطلب الآن عبر واتساب' : 'Order Now via WhatsApp'}
                        </a>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4 pt-6">
                            <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                                <span className="text-2xl">✅</span>
                                <div>
                                    <div className="font-bold text-sm">{isRTL ? 'منتج أصلي' : 'Original Product'}</div>
                                    <div className="text-xs text-gray-500">{isRTL ? 'ضمان 100%' : '100% Guaranteed'}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                                <span className="text-2xl">🛡️</span>
                                <div>
                                    <div className="font-bold text-sm">{isRTL ? 'ضمان رسمي' : 'Official Warranty'}</div>
                                    <div className="text-xs text-gray-500">{isRTL ? '18 شهر' : '18 Months'}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                                <span className="text-2xl">🚚</span>
                                <div>
                                    <div className="font-bold text-sm">{isRTL ? 'شحن سريع' : 'Fast Shipping'}</div>
                                    <div className="text-xs text-gray-500">{isRTL ? '2-3 أيام' : '2-3 Days'}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                                <span className="text-2xl">💵</span>
                                <div>
                                    <div className="font-bold text-sm">{isRTL ? 'الدفع عند الاستلام' : 'Cash on Delivery'}</div>
                                    <div className="text-xs text-gray-500">{isRTL ? 'بدون مقدم' : 'No Prepayment'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details */}
            <div className="container mx-auto px-4 py-12">
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-lg">
                    {/* Features Section */}
                    {productFeatures.length > 0 && (
                        <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span>⚡</span>
                                {tProduct('features')}
                            </h2>
                            <ul className="grid md:grid-cols-2 gap-4">
                                {productFeatures.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className={`flex-shrink-0 w-6 h-6 bg-${brandColor}-100 dark:bg-${brandColor}-900/30 text-${brandColor}-600 rounded-full flex items-center justify-center text-sm font-bold`}>
                                            ✓
                                        </span>
                                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* New AI Overviews Sections */}
                    <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800">
                        {/* Expert Opinion - E-E-A-T Signal */}
                        <ExpertOpinion
                            productName={productName}
                            brand={translatedBrand}
                            category={category}
                            locale={locale}
                        />

                        {/* Smart Product FAQs (Prioritize Specific Layout) */}
                        <div className="border-t border-gray-100 dark:border-gray-800 my-6 pt-6">
                            {/* Pass specific FAQs if they exist */}
                            {currentTranslation?.faqs && currentTranslation.faqs.length > 0 ? (
                                <div className="my-8">
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <span>🤔</span>
                                        {isRTL ? 'أسئلة شائعة عن المنتج' : 'Product FAQs'}
                                    </h3>
                                    <div className="space-y-3">
                                        {currentTranslation.faqs.map((faq, idx) => (
                                            <details key={idx} className="group bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800/50 open:bg-blue-50/50 dark:open:bg-blue-900/10">
                                                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-800 dark:text-gray-200">
                                                    <span>{faq.question}</span>
                                                    <span className="text-xl group-open:rotate-180 transition-transform text-blue-500">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                                    </span>
                                                </summary>
                                                <p className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </details>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <ProductFAQ
                                    categorySlug={category}
                                    locale={locale}
                                    t={tFAQ}
                                />
                            )}
                        </div>

                        {/* Product Comparison Table - For Google Extraction */}
                        <ProductComparisonTable
                            product={{
                                slug: product.slug,
                                brand: product.brand,
                                price: product.price,
                                translations: {
                                    en: { name: product.translations?.en?.name || product.slug },
                                    ar: { name: product.translations?.ar?.name || product.slug }
                                }
                            }}
                            locale={locale}
                        />
                    </div>

                    {/* Description Section */}
                    {productDesc && (
                        <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span>📋</span>
                                {tProduct('details')}
                            </h2>
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                                    {productDesc}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Specifications */}
                    <div className="p-6 md:p-8">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span>📊</span>
                            {tProduct('specifications')}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-x-8">
                            <div className="flex justify-between py-4 border-b border-gray-100 dark:border-gray-800">
                                <span className="text-gray-500">{tProduct('brand')}</span>
                                <span className="font-bold">{product.brand}</span>
                            </div>
                            {product.sku && (
                                <div className="flex justify-between py-4 border-b border-gray-100 dark:border-gray-800">
                                    <span className="text-gray-500">{tProduct('sku')}</span>
                                    <span className="font-bold font-mono">{product.sku}</span>
                                </div>
                            )}
                            <div className="flex justify-between py-4 border-b border-gray-100 dark:border-gray-800">
                                <span className="text-gray-500">{tProduct('category')}</span>
                                <span className="font-bold">{translatedCategory}</span>
                            </div>
                            <div className="flex justify-between py-4 border-b border-gray-100 dark:border-gray-800">
                                <span className="text-gray-500">{tProduct('warranty')}</span>
                                <span className="font-bold">{isRTL ? '18 شهر' : '18 Months'}</span>
                            </div>
                            <div className="flex justify-between py-4 border-b border-gray-100 dark:border-gray-800">
                                <span className="text-gray-500">{isRTL ? 'المخزون' : 'Stock'}</span>
                                <span className={`font-bold ${(product.stock || 0) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {(product.stock || 0) > 0 ? (isRTL ? 'متوفر' : 'Available') : (isRTL ? 'غير متوفر' : 'Out of Stock')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SEO Content Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12">
                    <h2 className="text-2xl font-bold mb-4">
                        {isRTL ? `لماذا تختار ${productName}؟` : `Why Choose ${productName}?`}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        {productDesc || productShortDesc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {product.seo?.keywords?.split(',').slice(0, 6).map((keyword, idx) => (
                            <span key={idx} className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                                {keyword.trim()}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            {/* Mobile Sticky Action Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40">
                <div className="flex gap-3">
                    <div className="flex-1">
                        <span className="block text-xs text-gray-500">{tProduct('price')}</span>
                        <div className="flex items-center gap-1">
                            <span className="text-xl font-bold">{product.price.toLocaleString()}</span>
                            <span className="text-xs">{tCommon('egp')}</span>
                        </div>
                    </div>
                    <button className={`flex-1 px-4 py-2 font-bold text-white rounded-lg shadow-lg ${brand === 'anker'
                        ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
                        : 'bg-red-600 hover:bg-red-700 shadow-red-600/20'
                        }`}>
                        {tProduct('addToCart')}
                    </button>
                    <a
                        href={`https://wa.me/201000000000?text=${encodeURIComponent(
                            isRTL
                                ? `مرحباً، أريد طلب: ${productName}`
                                : `Hi, I want to order: ${productName}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center justify-center shadow-lg shadow-green-500/20"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Spacer for sticky bar */}
            <div className="h-24 lg:hidden"></div>
        </div>
    );
}
