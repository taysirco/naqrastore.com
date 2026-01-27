import Link from 'next/link';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    if (locale === 'en') {
        return {
            title: 'Anker Egypt | Power Banks, Chargers, Soundcore Earbuds',
            description: 'Official Anker Egypt store. Shop Anker power banks 20000mAh, Anker chargers 20W/25W, Soundcore earbuds R50i. 100% authentic with official warranty.',
            keywords: 'anker egypt, anker power bank, anker charger, anker soundcore, anker 20w charger, anker cables',
            openGraph: {
                title: 'Anker Egypt | Official Store',
                description: 'Authorized Anker dealer in Egypt. Power banks, chargers, audio.',
                locale: 'en_US',
            },
        };
    }

    // Arabic (default)
    return {
        title: 'Anker Egypt | انكر مصر - باور بانك، شواحن، سماعات أصلية',
        description: 'Anker Egypt الوكيل المعتمد. تسوق باور بانك انكر، شاحن انكر، سماعات انكر Soundcore بأفضل الأسعار في مصر. منتجات أصلية 100% مع ضمان رسمي.',
        keywords: 'انكر مصر, باور بانك انكر, شاحن انكر, سماعات انكر, شاحن انكر 20 وات, كابل انكر',
        openGraph: {
            title: 'Anker Egypt | انكر مصر',
            description: 'الوكيل المعتمد لمنتجات Anker في مصر. باور بانك، شواحن، سماعات أصلية.',
            locale: 'ar_EG',
        },
    };
}

export default async function AnkerHubPage({ params }: Props) {
    const { locale } = await params;
    const isRTL = locale === 'ar';

    const categories = isRTL
        ? [
            { title: 'باور بانك انكر', description: 'PowerCore 10000 & 20000mAh', href: '/anker/power-banks', icon: '⚡', volume: '2,900+ بحث/شهر' },
            { title: 'شاحن انكر', description: 'Nano 20W & 25W', href: '/anker/wall-chargers', icon: '🔌', volume: '2,900+ بحث/شهر' },
            { title: 'سماعات Soundcore', description: 'R50i, P20i, Liberty', href: '/anker/audio', icon: '🎧', volume: '3,600+ بحث/شهر' },
            { title: 'مكبرات صوت Soundcore', description: 'Motion+, Flare 2', href: '/anker/speakers', icon: '🔊', volume: 'جديد', badge: '🔥 جديد' },
            { title: 'كابلات انكر', description: 'PowerLine Lightning & USB-C', href: '/anker/cables', icon: '🔗', volume: '320+ بحث/شهر' },
            { title: 'شاحن سيارة انكر', description: 'PowerDrive 48W', href: '/anker/car-chargers', icon: '🚗', volume: '260+ بحث/شهر' },
        ]
        : [
            { title: 'Anker Power Banks', description: 'PowerCore 10000 & 20000mAh', href: '/en/anker/power-banks', icon: '⚡', volume: '2,900+ searches/mo' },
            { title: 'Anker Chargers', description: 'Nano 20W & 25W', href: '/en/anker/wall-chargers', icon: '🔌', volume: '2,900+ searches/mo' },
            { title: 'Soundcore Earbuds', description: 'R50i, P20i, Liberty', href: '/en/anker/audio', icon: '🎧', volume: '3,600+ searches/mo' },
            { title: 'Soundcore Speakers', description: 'Motion+, Flare 2', href: '/en/anker/speakers', icon: '🔊', volume: 'New', badge: '🔥 New' },
            { title: 'Anker Cables', description: 'PowerLine Lightning & USB-C', href: '/en/anker/cables', icon: '🔗', volume: '320+ searches/mo' },
            { title: 'Anker Car Chargers', description: 'PowerDrive 48W', href: '/en/anker/car-chargers', icon: '🚗', volume: '260+ searches/mo' },
        ];

    return (
        <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Hero */}
            <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                        🏆 {isRTL ? 'العلامة التجارية #1 عالمياً في الشحن' : "World's #1 Charging Brand"}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        Anker Egypt
                    </h1>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        {isRTL
                            ? 'الوكيل المعتمد لمنتجات انكر في مصر. باور بانك، شواحن، سماعات وكابلات أصلية 100% مع ضمان رسمي.'
                            : 'Authorized Anker dealer in Egypt. Power banks, chargers, earbuds and cables. 100% original with official warranty.'}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <span className="px-4 py-2 bg-white/20 rounded-full text-sm">✓ {isRTL ? 'منتجات أصلية' : 'Original Products'}</span>
                        <span className="px-4 py-2 bg-white/20 rounded-full text-sm">✓ {isRTL ? 'ضمان رسمي' : 'Official Warranty'}</span>
                        <span className="px-4 py-2 bg-white/20 rounded-full text-sm">✓ {isRTL ? 'شحن لجميع المحافظات' : 'Nationwide Shipping'}</span>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold mb-12 text-center">
                    {isRTL ? 'منتجات Anker' : 'Anker Products'}
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat, idx) => (
                        <Link
                            key={idx}
                            href={cat.href}
                            className="group p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:border-blue-200 dark:hover:border-blue-800 hover:-translate-y-1 transition-all"
                        >
                            <div className="text-5xl mb-4">{cat.icon}</div>
                            <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                                {cat.title}
                            </h3>
                            <p className="text-gray-500 mb-4">{cat.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                                    {cat.volume}
                                </span>
                                <span className={`text-blue-600 font-bold transition-transform ${isRTL ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`}>
                                    {isRTL ? '←' : '→'}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Why Anker */}
            <section className="bg-gray-50 dark:bg-gray-900/50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center">
                        {isRTL ? 'لماذا Anker؟' : 'Why Anker?'}
                    </h2>
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl mb-4">🌍</div>
                            <h4 className="font-bold mb-2">{isRTL ? 'الأولى عالمياً' : '#1 Worldwide'}</h4>
                            <p className="text-sm text-gray-500">{isRTL ? 'في مبيعات إكسسوارات الشحن' : 'In charging accessories sales'}</p>
                        </div>
                        <div>
                            <div className="text-4xl mb-4">⚡</div>
                            <h4 className="font-bold mb-2">PowerIQ</h4>
                            <p className="text-sm text-gray-500">{isRTL ? 'تقنية الشحن الذكي' : 'Smart charging technology'}</p>
                        </div>
                        <div>
                            <div className="text-4xl mb-4">🛡️</div>
                            <h4 className="font-bold mb-2">{isRTL ? 'حماية متعددة' : 'Multi-Protection'}</h4>
                            <p className="text-sm text-gray-500">{isRTL ? '10 طبقات حماية' : '10 protection layers'}</p>
                        </div>
                        <div>
                            <div className="text-4xl mb-4">♻️</div>
                            <h4 className="font-bold mb-2">{isRTL ? 'ضمان مدى الحياة' : 'Lifetime Warranty'}</h4>
                            <p className="text-sm text-gray-500">{isRTL ? 'على الكابلات' : 'On cables'}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
