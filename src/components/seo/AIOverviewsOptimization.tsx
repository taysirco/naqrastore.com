'use client';

import { useTranslations } from 'next-intl';

interface ComparisonTableProps {
    product: {
        slug: string;
        brand: string;
        price: number;
        translations: {
            en: { name: string };
            ar: { name: string };
        };
    };
    competitors?: Array<{
        name: string;
        price: number | string;
        warranty: string;
        delivery: string;
        original: boolean;
    }>;
    locale: string;
}

// Default competitors for Anker products
const defaultAnkerCompetitors = {
    en: [
        { name: 'Amazon Egypt', price: 'Higher', warranty: '12 months (international)', delivery: '5-7 days', original: true },
        { name: 'Noon', price: 'Similar', warranty: 'Varies', delivery: '2-5 days', original: true },
        { name: 'Local Shops', price: 'Higher', warranty: 'None', delivery: 'Immediate', original: false },
    ],
    ar: [
        { name: 'أمازون مصر', price: 'أعلى', warranty: '12 شهر (دولي)', delivery: '5-7 أيام', original: true },
        { name: 'نون', price: 'مماثل', warranty: 'متغير', delivery: '2-5 أيام', original: true },
        { name: 'المحلات المحلية', price: 'أعلى', warranty: 'لا يوجد', delivery: 'فوري', original: false },
    ],
};

export function ProductComparisonTable({ product, competitors, locale }: ComparisonTableProps) {
    const isArabic = locale === 'ar';

    const defaultComps = isArabic ? defaultAnkerCompetitors.ar : defaultAnkerCompetitors.en;
    const comps = competitors || defaultComps;

    const labels = isArabic ? {
        title: 'مقارنة الأسعار',
        store: 'المتجر',
        price: 'السعر',
        warranty: 'الضمان',
        delivery: 'التوصيل',
        original: 'منتج أصلي؟',
        yes: 'نعم ✓',
        no: 'غير مؤكد',
        ourStore: 'كايرو فولت (نحن)',
        egp: 'جنيه',
        months: 'شهر',
        days: 'أيام',
        free: 'مجاني',
    } : {
        title: 'Price Comparison',
        store: 'Store',
        price: 'Price',
        warranty: 'Warranty',
        delivery: 'Delivery',
        original: 'Original?',
        yes: 'Yes ✓',
        no: 'Uncertain',
        ourStore: 'Cairo Volt (Us)',
        egp: 'EGP',
        months: 'months',
        days: 'days',
        free: 'Free',
    };

    const productName = isArabic ? product.translations.ar.name : product.translations.en.name;
    const warrantyMonths = product.brand === 'Anker' ? 18 : 12;

    return (
        <div className="my-6 md:my-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 md:p-6 shadow-lg">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 flex items-center gap-2">
                <span className="text-xl md:text-2xl">📊</span>
                {labels.title}
            </h3>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b-2 border-blue-200 dark:border-gray-700">
                            <th className="py-2 px-2 md:py-3 md:px-4 text-start font-semibold">{labels.store}</th>
                            <th className="py-2 px-2 md:py-3 md:px-4 text-start font-semibold">{labels.price}</th>
                            <th className="py-2 px-2 md:py-3 md:px-4 text-start font-semibold">{labels.warranty}</th>
                            <th className="py-2 px-2 md:py-3 md:px-4 text-start font-semibold">{labels.delivery}</th>
                            <th className="py-2 px-2 md:py-3 md:px-4 text-start font-semibold">{labels.original}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Our Store - Highlighted */}
                        <tr className="bg-green-100 dark:bg-green-900/30 font-medium">
                            <td className="py-2 px-2 md:py-3 md:px-4 flex items-center gap-1 md:gap-2">
                                <span className="text-base md:text-lg">⭐</span>
                                <span className="text-xs md:text-sm">{labels.ourStore}</span>
                            </td>
                            <td className="py-2 px-2 md:py-3 md:px-4 text-green-700 dark:text-green-400 font-bold">
                                {product.price} <span className="text-xs">{labels.egp}</span>
                            </td>
                            <td className="py-2 px-2 md:py-3 md:px-4">
                                <span className="bg-green-200 dark:bg-green-800 px-1.5 py-0.5 md:px-2 md:py-1 rounded text-[10px] md:text-xs font-semibold whitespace-nowrap">
                                    {warrantyMonths} {labels.months} ✓
                                </span>
                            </td>
                            <td className="py-2 px-2 md:py-3 md:px-4 text-xs md:text-sm">
                                1-3 {labels.days}
                                {product.price >= 500 && (
                                    <span className="ms-1 text-green-600 text-[10px] md:text-xs block md:inline">({labels.free})</span>
                                )}
                            </td>
                            <td className="py-2 px-2 md:py-3 md:px-4 text-green-600 dark:text-green-400 font-bold text-xs md:text-sm">
                                {labels.yes}
                            </td>
                        </tr>

                        {/* Competitors */}
                        {comps.map((comp, index) => (
                            <tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <td className="py-2 px-2 md:py-3 md:px-4 text-xs md:text-sm">{comp.name}</td>
                                <td className="py-2 px-2 md:py-3 md:px-4 text-gray-600 dark:text-gray-400 text-xs md:text-sm">
                                    {typeof comp.price === 'number' ? `${comp.price} ${labels.egp}` : comp.price}
                                </td>
                                <td className="py-2 px-2 md:py-3 md:px-4 text-gray-600 dark:text-gray-400 text-xs md:text-sm">{comp.warranty}</td>
                                <td className="py-2 px-2 md:py-3 md:px-4 text-gray-600 dark:text-gray-400 text-xs md:text-sm">{comp.delivery}</td>
                                <td className="py-2 px-2 md:py-3 md:px-4 text-xs md:text-sm">
                                    {comp.original ? (
                                        <span className="text-green-600">{labels.yes}</span>
                                    ) : (
                                        <span className="text-orange-500">{labels.no}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Trust Signal */}
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                {isArabic
                    ? '* نحن الموزع المعتمد لأنكر وجوي روم في مصر - ضمان رسمي 100%'
                    : '* We are the authorized dealer for Anker & Joyroom in Egypt - 100% Official Warranty'
                }
            </p>
        </div>
    );
}

// Category Comparison Table
interface CategoryComparisonProps {
    products: Array<{
        name: string;
        price: number;
        badge?: string;
    }>;
    categoryName: string;
    locale: string;
}

export function CategoryComparisonTable({ products, categoryName, locale }: CategoryComparisonProps) {
    const isArabic = locale === 'ar';
    const labels = isArabic ? {
        title: `مقارنة أفضل ${categoryName}`,
        model: 'الموديل',
        price: 'السعر',
        feature: 'الميزة الرئيسية',
        rating: 'التقييم',
        egp: 'جنيه',
        stars: '⭐⭐⭐⭐⭐'
    } : {
        title: `Best ${categoryName} Comparison`,
        model: 'Model',
        price: 'Price',
        feature: 'Key Feature',
        rating: 'Rating',
        egp: 'EGP',
        stars: '⭐⭐⭐⭐⭐'
    };

    return (
        <div className="my-8 md:my-12 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 px-4 py-3 md:px-6 md:py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg md:text-xl font-bold flex items-center gap-2">
                    <span>🏆</span>
                    {labels.title}
                </h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800/50">
                            <th className="py-3 px-3 md:py-4 md:px-6 text-start font-bold text-gray-700 dark:text-gray-300 text-xs md:text-sm">{labels.model}</th>
                            <th className="py-3 px-3 md:py-4 md:px-6 text-start font-bold text-gray-700 dark:text-gray-300 text-xs md:text-sm">{labels.price}</th>
                            <th className="py-3 px-3 md:py-4 md:px-6 text-start font-bold text-gray-700 dark:text-gray-300 text-xs md:text-sm">{labels.feature}</th>
                            <th className="py-3 px-3 md:py-4 md:px-6 text-start font-bold text-gray-700 dark:text-gray-300 text-xs md:text-sm">{labels.rating}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                <td className="py-3 px-3 md:py-4 md:px-6 font-semibold text-gray-900 dark:text-white text-xs md:text-sm">
                                    {product.name}
                                    {index === 0 && (
                                        <span className="mx-1 px-1.5 py-0.5 md:mx-2 md:px-2 md:bg-yellow-100 text-yellow-800 text-[10px] md:text-xs rounded-full block md:inline w-fit mt-1 md:mt-0">
                                            {isArabic ? 'الأفضل' : 'Top Pick'}
                                        </span>
                                    )}
                                </td>
                                <td className="py-3 px-3 md:py-4 md:px-6 text-blue-600 dark:text-blue-400 font-bold text-xs md:text-sm">
                                    {product.price} <span className="text-[10px] md:text-xs">{labels.egp}</span>
                                </td>
                                <td className="py-3 px-3 md:py-4 md:px-6">
                                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-medium whitespace-nowrap">
                                        {product.badge || (isArabic ? 'قيمة ممتازة' : 'Best Value')}
                                    </span>
                                </td>
                                <td className="py-3 px-3 md:py-4 md:px-6 text-amber-400 text-xs">
                                    <span className="hidden md:inline">{labels.stars}</span>
                                    <span className="md:hidden">⭐</span>
                                    <span className="text-gray-400 ms-1">(4.{9 - index})</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Expert Opinion Component (E-E-A-T Signal)
interface ExpertOpinionProps {
    productName: string;
    brand: string;
    category: string;
    locale: string;
}

export function ExpertOpinion({ productName, brand, category, locale }: ExpertOpinionProps) {
    const isArabic = locale === 'ar';

    // Generate contextual recommendation based on product type
    const getRecommendation = () => {
        if (isArabic) {
            if (category.includes('power-bank')) {
                return `ننصح بـ ${productName} للمستخدمين الذين يحتاجون شحن موثوق أثناء التنقل. منتجات ${brand} تتميز بتقنيات حماية متقدمة تحافظ على بطارية هاتفك.`;
            }
            if (category.includes('charger')) {
                return `هذا الشاحن مثالي لمن يريد شحن سريع وآمن. تقنية ${brand} تضمن عدم ارتفاع حرارة الجهاز أثناء الشحن.`;
            }
            if (category.includes('audio') || category.includes('earbuds')) {
                return `للباحثين عن جودة صوت ممتازة بسعر معقول، ${productName} خيار متميز مع عزل للضوضاء وبطارية طويلة.`;
            }
            return `منتج ${brand} هذا يوفر أداء ممتاز وضمان رسمي. ننصح به للمستخدمين الباحثين عن الجودة والموثوقية.`;
        } else {
            if (category.includes('power-bank')) {
                return `We recommend the ${productName} for users who need reliable charging on the go. ${brand} products feature advanced protection technologies that preserve your phone's battery health.`;
            }
            if (category.includes('charger')) {
                return `This charger is ideal for those who want fast and safe charging. ${brand} technology ensures your device won't overheat during charging.`;
            }
            if (category.includes('audio') || category.includes('earbuds')) {
                return `For those seeking excellent sound quality at a reasonable price, ${productName} is an outstanding choice with noise isolation and long battery life.`;
            }
            return `This ${brand} product delivers excellent performance with official warranty. We recommend it for users seeking quality and reliability.`;
        }
    };

    const labels = isArabic ? {
        title: 'رأي الخبراء',
        expertName: 'فريق كايرو فولت',
        expertTitle: 'خبراء الإكسسوارات والإلكترونيات',
    } : {
        title: 'Expert Opinion',
        expertName: 'Cairo Volt Team',
        expertTitle: 'Electronics & Accessories Experts',
    };

    return (
        <div className="my-4 md:my-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-4 md:p-6 border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xl">
                        💡
                    </div>
                </div>
                <div className="flex-grow">
                    <h4 className="font-bold text-lg text-amber-800 dark:text-amber-300 mb-1">
                        {labels.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {labels.expertName} • {labels.expertTitle}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {getRecommendation()}
                    </p>
                </div>
            </div>
        </div>
    );
}

// Quick Summary for AI Overviews
interface QuickSummaryProps {
    product: {
        brand: string;
        price: number;
        translations: {
            en: { name: string; shortDescription: string };
            ar: { name: string; shortDescription: string };
        };
    };
    locale: string;
}

export function QuickSummary({ product, locale }: QuickSummaryProps) {
    const isArabic = locale === 'ar';
    const t = isArabic ? product.translations.ar : product.translations.en;
    const warrantyMonths = product.brand === 'Anker' ? 18 : 12;

    return (
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 mb-6 border-s-4 border-blue-500">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>{t.name}</strong> - {t.shortDescription}.
                {isArabic
                    ? ` السعر: ${product.price} جنيه مصري | ضمان ${warrantyMonths} شهر | شحن مجاني للطلبات فوق 500 جنيه.`
                    : ` Price: ${product.price} EGP | ${warrantyMonths}-month warranty | Free shipping for orders over 500 EGP.`
                }
            </p>
        </div>
    );
}
// Product FAQ Component
interface FAQItem {
    q: string;
    a: string;
}

interface ProductFAQProps {
    categorySlug: string;
    locale: string;
    t: any; // Using any to avoid complex type drilling from next-intl
}

export function ProductFAQ({ categorySlug, locale, t }: ProductFAQProps) {
    const isArabic = locale === 'ar';
    const categoryKey =
        categorySlug.includes('power-bank') ? 'powerBanks' :
            categorySlug.includes('audio') || categorySlug.includes('earbuds') ? 'audio' :
                categorySlug.includes('charger') ? 'wallChargers' :
                    categorySlug.includes('cable') ? 'cables' : null;

    if (!categoryKey) return null;

    // We can't easily iterate over translated arrays in next-intl inside a client component
    // So we manually construct the array based on inspection of the JSON structure
    // This is a pragmatic workaround for client-side translation arrays
    const faqs: FAQItem[] = [];

    // Attempt to get 3 FAQs
    try {
        const q1 = t(`smartCategoryFAQs.${categoryKey}.0.q`);
        const a1 = t(`smartCategoryFAQs.${categoryKey}.0.a`);
        if (q1 && a1 && q1 !== `smartCategoryFAQs.${categoryKey}.0.q`) faqs.push({ q: q1, a: a1 });

        const q2 = t(`smartCategoryFAQs.${categoryKey}.1.q`);
        const a2 = t(`smartCategoryFAQs.${categoryKey}.1.a`);
        if (q2 && a2 && q2 !== `smartCategoryFAQs.${categoryKey}.1.q`) faqs.push({ q: q2, a: a2 });

        const q3 = t(`smartCategoryFAQs.${categoryKey}.2.q`);
        const a3 = t(`smartCategoryFAQs.${categoryKey}.2.a`);
        if (q3 && a3 && q3 !== `smartCategoryFAQs.${categoryKey}.2.q`) faqs.push({ q: q3, a: a3 });
    } catch (e) {
        // Translations might not load immediately
    }

    if (faqs.length === 0) return null;

    return (
        <div className="my-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤔</span>
                {isArabic ? 'أسئلة شائعة عن المنتج' : 'Product FAQs'}
            </h3>
            <div className="space-y-3">
                {faqs.map((faq, idx) => (
                    <details key={idx} className="group bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800/50 open:bg-blue-50/50 dark:open:bg-blue-900/10">
                        <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-800 dark:text-gray-200">
                            <span>{faq.q}</span>
                            <span className="text-xl group-open:rotate-180 transition-transform text-blue-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </span>
                        </summary>
                        <p className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            {faq.a}
                        </p>
                    </details>
                ))}
            </div>
        </div>
    );
}
