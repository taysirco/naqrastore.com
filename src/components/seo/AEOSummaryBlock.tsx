'use client';

import { useTranslations } from 'next-intl';

// ============================================
// AEO SUMMARY BLOCK - Answer Engine Optimization
// ============================================
// This component provides "Answer-First" content blocks
// that are optimized for AI Answer Engines (ChatGPT, Perplexity, Gemini)
// Content is 40-60 words, directly answering user queries

interface AEOSummaryBlockProps {
    productName: string;
    brand: string;
    category: string;
    price: number;
    locale: string;
    variant?: 'product' | 'category' | 'brand';
    shortDescription?: string;
}

/**
 * AEO Summary Block Component
 * Provides immediate, concise answers for AI crawlers and voice search
 * Position: Immediately after Hero section for maximum visibility
 */
export function AEOSummaryBlock({
    productName,
    brand,
    category,
    price,
    locale,
    variant = 'product',
    shortDescription
}: AEOSummaryBlockProps) {
    const t = useTranslations('aeo');
    const isArabic = locale === 'ar';

    // Generate AEO summary based on variant
    const getSummary = () => {
        const formattedPrice = new Intl.NumberFormat(isArabic ? 'ar-EG' : 'en-EG', {
            style: 'currency',
            currency: 'EGP',
            maximumFractionDigits: 0
        }).format(price);

        if (variant === 'product') {
            if (isArabic) {
                return `${productName} الأصلي من ${brand} متوفر الآن في مصر بسعر ${formattedPrice}. يتميز بضمان الوكيل الرسمي مع توصيل سريع لجميع المحافظات. ${shortDescription || 'منتج أصلي 100% مع استبدال فوري.'}`;
            }
            return `The original ${productName} from ${brand} is now available in Egypt for ${formattedPrice}. Features official warranty with fast delivery nationwide. ${shortDescription || '100% authentic with instant replacement guarantee.'}`;
        }

        if (variant === 'category') {
            if (isArabic) {
                return `تسوق مجموعة ${category} من ${brand} الأصلية في مصر. أسعار تبدأ من ${formattedPrice} مع ضمان رسمي وتوصيل سريع. منتجات أصلية 100% معتمدة من الوكيل.`;
            }
            return `Shop authentic ${brand} ${category} collection in Egypt. Prices starting from ${formattedPrice} with official warranty and fast delivery. 100% original dealer-certified products.`;
        }

        if (variant === 'brand') {
            if (isArabic) {
                return `${brand} مصر - الموزع الرسمي المعتمد. تشكيلة كاملة من ${category} الأصلية مع ضمان 18 شهر واستبدال فوري. توصيل لجميع محافظات مصر.`;
            }
            return `${brand} Egypt - Authorized Official Dealer. Complete collection of original ${category} with 18-month warranty and instant replacement. Nationwide delivery across Egypt.`;
        }

        return '';
    };

    return (
        <section
            className="speakable-content aeo-summary-block bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 md:p-6 my-4 md:my-6 border border-gray-200 dark:border-gray-700"
            aria-label={isArabic ? 'ملخص سريع' : 'Quick Summary'}
        >
            {/* AEO Icon Indicator */}
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <div className="flex-1">
                    {/* Quick Answer Label */}
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1 block">
                        {isArabic ? '✨ إجابة سريعة' : '✨ Quick Answer'}
                    </span>

                    {/* Main Summary Content - 40-60 words */}
                    <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                        {getSummary()}
                    </p>
                </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {isArabic ? 'أصلي 100%' : '100% Original'}
                </span>
                <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {isArabic ? 'ضمان رسمي' : 'Official Warranty'}
                </span>
                <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {isArabic ? 'توصيل سريع' : 'Fast Delivery'}
                </span>
            </div>
        </section>
    );
}

// ============================================
// CATEGORY AEO BLOCK - For Category Pages
// ============================================

interface CategoryAEOBlockProps {
    categoryName: string;
    categoryNameAr: string;
    brand: string;
    productCount: number;
    priceRange: { min: number; max: number };
    locale: string;
}

export function CategoryAEOBlock({
    categoryName,
    categoryNameAr,
    brand,
    productCount,
    priceRange,
    locale
}: CategoryAEOBlockProps) {
    const isArabic = locale === 'ar';

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat(isArabic ? 'ar-EG' : 'en-EG', {
            style: 'currency',
            currency: 'EGP',
            maximumFractionDigits: 0
        }).format(price);
    };

    const getSummary = () => {
        const name = isArabic ? categoryNameAr : categoryName;

        if (isArabic) {
            return `اكتشف ${productCount}+ منتج من ${name} ${brand} الأصلية في مصر. الأسعار من ${formatPrice(priceRange.min)} إلى ${formatPrice(priceRange.max)}. جميع المنتجات بضمان الوكيل الرسمي مع توصيل سريع لجميع المحافظات.`;
        }
        return `Discover ${productCount}+ original ${brand} ${name} products in Egypt. Prices from ${formatPrice(priceRange.min)} to ${formatPrice(priceRange.max)}. All products with official dealer warranty and fast nationwide delivery.`;
    };

    return (
        <section
            className="speakable-content category-aeo-block bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-5 md:p-6 my-4 md:my-6 border border-blue-100 dark:border-blue-800"
            aria-label={isArabic ? 'نظرة عامة على القسم' : 'Category Overview'}
        >
            <div className="flex items-start gap-4">
                {/* Category Icon */}
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                </div>

                <div className="flex-1">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-2 block">
                        {isArabic ? '📋 ملخص القسم' : '📋 Category Overview'}
                    </span>

                    <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                        {getSummary()}
                    </p>

                    {/* Quick Stats */}
                    <div className="mt-4 grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {productCount}+
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                {isArabic ? 'منتج' : 'Products'}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">
                                18
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                {isArabic ? 'شهر ضمان' : 'Month Warranty'}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400">
                                27
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                {isArabic ? 'محافظة' : 'Governorates'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================
// BRAND AEO BLOCK - For Brand Hub Pages
// ============================================

interface BrandAEOBlockProps {
    brandName: string;
    brandDescription: string;
    categoryCount: number;
    totalProducts: number;
    locale: string;
}

export function BrandAEOBlock({
    brandName,
    brandDescription,
    categoryCount,
    totalProducts,
    locale
}: BrandAEOBlockProps) {
    const isArabic = locale === 'ar';

    const getSummary = () => {
        if (isArabic) {
            return `${brandName} مصر - الموزع الرسمي المعتمد. ${brandDescription} تشكيلة من ${totalProducts}+ منتج في ${categoryCount} أقسام مختلفة. ضمان الوكيل 18 شهر مع استبدال فوري وتوصيل لجميع محافظات مصر.`;
        }
        return `${brandName} Egypt - Authorized Official Dealer. ${brandDescription} Collection of ${totalProducts}+ products across ${categoryCount} categories. 18-month dealer warranty with instant replacement and nationwide Egypt delivery.`;
    };

    return (
        <section
            className="speakable-content brand-aeo-block bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl p-5 md:p-6 my-4 md:my-6"
            aria-label={isArabic ? 'نظرة عامة على العلامة التجارية' : 'Brand Overview'}
        >
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🏆</span>
                </div>

                <div className="flex-1">
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-2 block">
                        {isArabic ? '🎯 الوكيل الرسمي' : '🎯 Official Dealer'}
                    </span>

                    <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                        {getSummary()}
                    </p>
                </div>
            </div>
        </section>
    );
}

export default AEOSummaryBlock;
