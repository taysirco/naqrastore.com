import Link from 'next/link';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    if (locale === 'en') {
        return {
            title: 'Joyroom Egypt | T03s Earbuds, Power Banks, Chargers',
            description: 'Official Joyroom Egypt store. Shop Joyroom T03s earbuds, power banks 20000mAh, chargers. Affordable quality with warranty. Best prices in Egypt.',
            keywords: 'joyroom, joyroom t03s, joyroom earbuds, joyroom power bank, joyroom charger',
            openGraph: {
                title: 'Joyroom Egypt | Official Store',
                description: 'Joyroom accessories in Egypt. T03s earbuds, power banks, chargers.',
                locale: 'en_US',
            },
        };
    }

    // Arabic (default)
    return {
        title: 'Joyroom Egypt | جوي روم مصر - سماعات T03s، باور بانك، شواحن',
        description: 'Joyroom Egypt متجر جوي روم في مصر. سماعات joyroom t03s، باور بانك جوي روم، شاحن جيروم بأفضل الأسعار. منتجات أصلية مع ضمان.',
        keywords: 'جوي روم, joyroom t03s, سماعات جوي روم, باور بانك جوي روم, باور بانك جيروم, شاحن جيروم, سماعة جيروم',
        openGraph: {
            title: 'Joyroom Egypt | جوي روم مصر',
            description: 'متجر جوي روم في مصر. سماعات T03s، باور بانك، شواحن أصلية.',
            locale: 'ar_EG',
        },
    };
}

export default async function JoyroomHubPage({ params }: Props) {
    const { locale } = await params;
    const isRTL = locale === 'ar';

    const categories = isRTL
        ? [
            { title: 'سماعات T03s', description: 'المنتج النجم - الأكثر مبيعاً', href: '/joyroom/audio', icon: '🎧', volume: '1,900+ بحث/شهر', badge: '⭐ Hero Product' },
            { title: 'باور بانك جوي روم', description: '10000 & 20000mAh', href: '/joyroom/power-banks', icon: '⚡', volume: '1,300+ بحث/شهر' },
            { title: 'شاحن جوي روم', description: 'شحن سريع 20W', href: '/joyroom/wall-chargers', icon: '🔌', volume: '110+ بحث/شهر' },
            { title: 'كابلات جوي روم', description: 'Lightning & Type-C', href: '/joyroom/cables', icon: '🔗', volume: 'جديد' },
            { title: 'ساعات جوي روم الذكية', description: 'FT3 وأكثر', href: '/joyroom/smart-watches', icon: '⌚', volume: 'جديد', badge: '🔥 جديد' },
            { title: 'حوامل سيارة', description: 'حوامل مغناطيسية', href: '/joyroom/car-holders', icon: '🧭', volume: 'جديد' },
        ]
        : [
            { title: 'T03s Earbuds', description: 'Hero Product - Best Seller', href: '/en/joyroom/audio', icon: '🎧', volume: '1,900+ searches/mo', badge: '⭐ Hero Product' },
            { title: 'Joyroom Power Banks', description: '10000 & 20000mAh', href: '/en/joyroom/power-banks', icon: '⚡', volume: '1,300+ searches/mo' },
            { title: 'Joyroom Chargers', description: 'Fast Charging 20W', href: '/en/joyroom/wall-chargers', icon: '🔌', volume: '110+ searches/mo' },
            { title: 'Joyroom Cables', description: 'Lightning & Type-C', href: '/en/joyroom/cables', icon: '🔗', volume: 'New' },
            { title: 'Joyroom Smart Watches', description: 'FT3 and more', href: '/en/joyroom/smart-watches', icon: '⌚', volume: 'New', badge: '🔥 New' },
            { title: 'Car Holders', description: 'Magnetic Mounts', href: '/en/joyroom/car-holders', icon: '🧭', volume: 'New' },
        ];


    return (
        <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Hero */}
            <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white py-12 md:py-20">
                <div className="container mx-auto px-4 text-center">
                    <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6">
                        🔥 {isRTL ? '5,400+ بحث شهري' : '5,400+ monthly searches'}
                    </span>
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6">
                        Joyroom Egypt
                    </h1>
                    <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
                        {isRTL
                            ? 'جودة عالية بأسعار مناسبة. سماعات T03s الأكثر مبيعاً، باور بانك، شواحن وكابلات أصلية.'
                            : 'Premium quality at affordable prices. T03s earbuds best seller, power banks, chargers and original cables.'}
                    </p>

                    {/* Hero Product Highlight */}
                    <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-8">
                        <span className="text-yellow-300 font-bold">{isRTL ? '⭐ المنتج النجم:' : '⭐ Hero Product:'}</span>
                        <Link href={isRTL ? '/joyroom/audio' : '/en/joyroom/audio'} className={`${isRTL ? 'mr-2' : 'ml-2'} text-white font-bold hover:underline`}>
                            {isRTL ? 'Joyroom T03s - السماعة الأكثر مبيعاً في مصر' : 'Joyroom T03s - Best Selling Earbuds in Egypt'}
                        </Link>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        <span className="px-4 py-2 bg-white/20 rounded-full text-sm">✓ {isRTL ? 'أسعار اقتصادية' : 'Affordable Prices'}</span>
                        <span className="px-4 py-2 bg-white/20 rounded-full text-sm">✓ {isRTL ? 'جودة ممتازة' : 'Excellent Quality'}</span>
                        <span className="px-4 py-2 bg-white/20 rounded-full text-sm">✓ {isRTL ? 'ضمان' : 'Warranty'}</span>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold mb-12 text-center">
                    {isRTL ? 'منتجات Joyroom' : 'Joyroom Products'}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                    {categories.map((cat, idx) => (
                        <Link
                            key={idx}
                            href={cat.href}
                            className="group relative p-4 md:p-8 rounded-xl md:rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:border-red-200 dark:hover:border-red-800 hover:-translate-y-1 transition-all"
                        >
                            {cat.badge && (
                                <span className={`absolute -top-2 md:-top-3 ${isRTL ? 'right-2 md:right-4' : 'left-2 md:left-4'} px-2 md:px-3 py-0.5 md:py-1 bg-yellow-400 text-black text-[10px] md:text-xs font-bold rounded-full`}>
                                    {cat.badge}
                                </span>
                            )}
                            <div className="text-3xl md:text-5xl mb-2 md:mb-4">{cat.icon}</div>
                            <h3 className="text-sm md:text-2xl font-bold mb-1 md:mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                                {cat.title}
                            </h3>
                            <p className="text-gray-500 text-xs md:text-base mb-2 md:mb-4 hidden md:block">{cat.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                                    {cat.volume}
                                </span>
                                <span className={`text-red-600 font-bold transition-transform ${isRTL ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`}>
                                    {isRTL ? '←' : '→'}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Why Joyroom */}
            <section className="bg-gray-50 dark:bg-gray-900/50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center">
                        {isRTL ? 'لماذا Joyroom؟' : 'Why Joyroom?'}
                    </h2>
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl mb-4">💰</div>
                            <h4 className="font-bold mb-2">{isRTL ? 'سعر مناسب' : 'Affordable'}</h4>
                            <p className="text-sm text-gray-500">{isRTL ? 'أفضل قيمة مقابل السعر' : 'Best value for money'}</p>
                        </div>
                        <div>
                            <div className="text-4xl mb-4">✨</div>
                            <h4 className="font-bold mb-2">{isRTL ? 'تصميم أنيق' : 'Sleek Design'}</h4>
                            <p className="text-sm text-gray-500">{isRTL ? 'منتجات عصرية وأنيقة' : 'Modern and elegant products'}</p>
                        </div>
                        <div>
                            <div className="text-4xl mb-4">🎯</div>
                            <h4 className="font-bold mb-2">{isRTL ? 'جودة ممتازة' : 'Excellent Quality'}</h4>
                            <p className="text-sm text-gray-500">{isRTL ? 'معايير عالمية' : 'Global standards'}</p>
                        </div>
                        <div>
                            <div className="text-4xl mb-4">🏅</div>
                            <h4 className="font-bold mb-2">{isRTL ? 'T03s النجم' : 'T03s Star'}</h4>
                            <p className="text-sm text-gray-500">{isRTL ? 'الأكثر مبيعاً في مصر' : 'Best seller in Egypt'}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
