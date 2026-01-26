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
        ourStore: 'موبايل ستور (نحن)',
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
        ourStore: 'MobileStore (Us)',
        egp: 'EGP',
        months: 'months',
        days: 'days',
        free: 'Free',
    };

    const productName = isArabic ? product.translations.ar.name : product.translations.en.name;
    const warrantyMonths = product.brand === 'Anker' ? 18 : 12;

    return (
        <div className="my-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                {labels.title}
            </h3>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b-2 border-blue-200 dark:border-gray-700">
                            <th className="py-3 px-4 text-start font-semibold">{labels.store}</th>
                            <th className="py-3 px-4 text-start font-semibold">{labels.price}</th>
                            <th className="py-3 px-4 text-start font-semibold">{labels.warranty}</th>
                            <th className="py-3 px-4 text-start font-semibold">{labels.delivery}</th>
                            <th className="py-3 px-4 text-start font-semibold">{labels.original}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Our Store - Highlighted */}
                        <tr className="bg-green-100 dark:bg-green-900/30 font-medium">
                            <td className="py-3 px-4 flex items-center gap-2">
                                <span className="text-lg">⭐</span>
                                {labels.ourStore}
                            </td>
                            <td className="py-3 px-4 text-green-700 dark:text-green-400 font-bold">
                                {product.price} {labels.egp}
                            </td>
                            <td className="py-3 px-4">
                                <span className="bg-green-200 dark:bg-green-800 px-2 py-1 rounded text-xs font-semibold">
                                    {warrantyMonths} {labels.months} ✓
                                </span>
                            </td>
                            <td className="py-3 px-4">
                                1-3 {labels.days}
                                {product.price >= 500 && (
                                    <span className="ms-1 text-green-600 text-xs">({labels.free})</span>
                                )}
                            </td>
                            <td className="py-3 px-4 text-green-600 dark:text-green-400 font-bold">
                                {labels.yes}
                            </td>
                        </tr>

                        {/* Competitors */}
                        {comps.map((comp, index) => (
                            <tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <td className="py-3 px-4">{comp.name}</td>
                                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                                    {typeof comp.price === 'number' ? `${comp.price} ${labels.egp}` : comp.price}
                                </td>
                                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{comp.warranty}</td>
                                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{comp.delivery}</td>
                                <td className="py-3 px-4">
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
        expertName: 'فريق موبايل ستور',
        expertTitle: 'خبراء الإكسسوارات والإلكترونيات',
    } : {
        title: 'Expert Opinion',
        expertName: 'MobileStore Team',
        expertTitle: 'Electronics & Accessories Experts',
    };

    return (
        <div className="my-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
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
