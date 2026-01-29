import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { brandData } from '@/data/brand-data';

type Props = {
    params: Promise<{ locale: string; brand: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, brand } = await params;
    const data = brandData[brand.toLowerCase()];

    if (!data) return {};

    const meta = locale === 'ar' ? data.metadata.ar : data.metadata.en;

    return {
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords,
        openGraph: meta.openGraph ? { ...meta.openGraph, locale: locale === 'ar' ? 'ar_EG' : 'en_US' } : undefined,
    };
}

export default async function BrandHubPage({ params }: Props) {
    const { locale, brand } = await params;
    const isRTL = locale === 'ar';
    const data = brandData[brand.toLowerCase()];

    if (!data) {
        notFound();
    }

    // Helper to get localized href
    const getLocalizedHref = (path: string) => {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return isRTL ? cleanPath : `/${locale}${cleanPath}`;
    };

    return (
        <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Hero */}
            <section className={`bg-gradient-to-br ${data.hero.bgGradient} text-white py-12 md:py-20`}>
                <div className="container mx-auto px-4 text-center">
                    <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6">
                        {isRTL ? data.hero.badge.ar : data.hero.badge.en}
                    </span>
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6">
                        {data.hero.title}
                    </h1>
                    <p className={`text-xl mb-8 max-w-2xl mx-auto ${brand === 'joyroom' ? 'text-red-100' : 'text-blue-100'}`}>
                        {isRTL ? data.hero.description.ar : data.hero.description.en}
                    </p>

                    {/* Hero Product Highlight (Optional) */}
                    {data.hero.heroProduct && (
                        <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-8">
                            <span className="text-yellow-300 font-bold">
                                {isRTL ? data.hero.heroProduct.label.ar : data.hero.heroProduct.label.en}
                            </span>
                            <Link
                                href={getLocalizedHref(data.hero.heroProduct.link.href)}
                                className={`${isRTL ? 'mr-2' : 'ml-2'} text-white font-bold hover:underline`}
                            >
                                {isRTL ? data.hero.heroProduct.link.text.ar : data.hero.heroProduct.link.text.en}
                            </Link>
                        </div>
                    )}

                    <div className="flex flex-wrap justify-center gap-4">
                        {data.hero.features.map((feature, idx) => (
                            <span key={idx} className="px-4 py-2 bg-white/20 rounded-full text-sm">
                                ✓ {isRTL ? feature.ar : feature.en}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold mb-12 text-center">
                    {isRTL ? `منتجات ${data.hero.title.split(' ')[0]}` : `${data.hero.title.split(' ')[0]} Products`}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                    {data.categories.map((cat, idx) => (
                        <Link
                            key={idx}
                            href={getLocalizedHref(cat.href)}
                            className={`group relative p-4 md:p-8 rounded-xl md:rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:-translate-y-1 transition-all ${brand === 'joyroom' ? 'hover:border-red-200 dark:hover:border-red-800' : 'hover:border-blue-200 dark:hover:border-blue-800'
                                }`}
                        >
                            {cat.badge && (
                                <span className={`absolute -top-2 md:-top-3 ${isRTL ? 'right-2 md:right-4' : 'left-2 md:left-4'} px-2 md:px-3 py-0.5 md:py-1 bg-yellow-400 text-black text-[10px] md:text-xs font-bold rounded-full`}>
                                    {isRTL ? cat.badge.ar : cat.badge.en}
                                </span>
                            )}
                            <div className="text-3xl md:text-5xl mb-2 md:mb-4">{cat.icon}</div>
                            <h3 className={`text-sm md:text-2xl font-bold mb-1 md:mb-2 transition-colors line-clamp-2 ${brand === 'joyroom' ? 'group-hover:text-red-600' : 'group-hover:text-blue-600'
                                }`}>
                                {isRTL ? cat.title.ar : cat.title.en}
                            </h3>
                            <p className="text-gray-500 text-xs md:text-base mb-2 md:mb-4 hidden md:block">
                                {isRTL ? cat.description.ar : cat.description.en}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                                    {isRTL ? cat.volume.ar : cat.volume.en}
                                </span>
                                <span className={`font-bold transition-transform ${isRTL ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'} ${brand === 'joyroom' ? 'text-red-600' : 'text-blue-600'
                                    }`}>
                                    {isRTL ? '←' : '→'}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Why Section */}
            <section className="bg-gray-50 dark:bg-gray-900/50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center">
                        {isRTL ? data.whySection.title.ar : data.whySection.title.en}
                    </h2>
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        {data.whySection.items.map((item, idx) => (
                            <div key={idx}>
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h4 className="font-bold mb-2">{isRTL ? item.title.ar : item.title.en}</h4>
                                <p className="text-sm text-gray-500">{isRTL ? item.description.ar : item.description.en}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
