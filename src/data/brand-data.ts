
export interface BrandData {
    id: string;
    hero: {
        bgGradient: string;
        badge: { en: string; ar: string };
        title: string;
        description: { en: string; ar: string };
        features: Array<{ en: string; ar: string }>;
        heroProduct?: {
            label: { en: string; ar: string };
            link: { href: string; text: { en: string; ar: string } };
        };
    };
    categories: Array<{
        title: { en: string; ar: string };
        description: { en: string; ar: string };
        href: string; // e.g. /anker/power-banks
        icon: string;
        volume: { en: string; ar: string };
        badge?: { en: string; ar: string };
    }>;
    whySection: {
        title: { en: string; ar: string };
        items: Array<{
            icon: string;
            title: { en: string; ar: string };
            description: { en: string; ar: string };
        }>;
    };
    metadata: {
        en: { title: string; description: string; keywords: string; openGraph?: any };
        ar: { title: string; description: string; keywords: string; openGraph?: any };
    };
}

export const brandData: Record<string, BrandData> = {
    anker: {
        id: 'anker',
        hero: {
            bgGradient: 'from-blue-600 via-blue-700 to-blue-900',
            badge: { en: "World's #1 Charging Brand", ar: 'العلامة التجارية #1 عالمياً' },
            title: 'Anker Egypt',
            description: {
                en: 'Authorized Anker dealer in Egypt. Power banks, chargers, earbuds and cables. 100% original with official warranty.',
                ar: 'الوكيل المعتمد لمنتجات انكر في مصر. باور بانك، شواحن، سماعات وكابلات أصلية 100% مع ضمان رسمي.'
            },
            features: [
                { en: 'Original Products', ar: 'منتجات أصلية' },
                { en: 'Official Warranty', ar: 'ضمان رسمي' },
                { en: 'Nationwide Shipping', ar: 'شحن لجميع المحافظات' }
            ]
        },
        categories: [
            { title: { en: 'Anker Power Banks', ar: 'باور بانك انكر' }, description: { en: 'PowerCore 10000 & 20000mAh', ar: 'PowerCore 10000 & 20000mAh' }, href: '/anker/power-banks', icon: '⚡', volume: { en: '2,900+ searches/mo', ar: '2,900+ بحث/شهر' } },
            { title: { en: 'Anker Chargers', ar: 'شاحن انكر' }, description: { en: 'Nano 20W & 25W', ar: 'Nano 20W & 25W' }, href: '/anker/wall-chargers', icon: '🔌', volume: { en: '2,900+ searches/mo', ar: '2,900+ بحث/شهر' } },
            { title: { en: 'Soundcore Earbuds', ar: 'سماعات Soundcore' }, description: { en: 'R50i, P20i, Liberty', ar: 'R50i, P20i, Liberty' }, href: '/anker/audio', icon: '🎧', volume: { en: '3,600+ searches/mo', ar: '3,600+ بحث/شهر' } },
            { title: { en: 'Soundcore Speakers', ar: 'مكبرات صوت Soundcore' }, description: { en: 'Motion+, Flare 2', ar: 'Motion+, Flare 2' }, href: '/anker/speakers', icon: '🔊', volume: { en: 'New', ar: 'جديد' }, badge: { en: '🔥 New', ar: '🔥 جديد' } },
            { title: { en: 'Anker Cables', ar: 'كابلات انكر' }, description: { en: 'PowerLine Lightning & USB-C', ar: 'PowerLine Lightning & USB-C' }, href: '/anker/cables', icon: '🔗', volume: { en: '320+ searches/mo', ar: '320+ بحث/شهر' } },
            { title: { en: 'Anker Car Chargers', ar: 'شاحن سيارة انكر' }, description: { en: 'PowerDrive 48W', ar: 'PowerDrive 48W' }, href: '/anker/car-chargers', icon: '🚗', volume: { en: '260+ searches/mo', ar: '260+ بحث/شهر' } },
        ],
        whySection: {
            title: { en: 'Why Anker?', ar: 'لماذا Anker؟' },
            items: [
                { icon: '🌍', title: { en: '#1 Worldwide', ar: 'الأولى عالمياً' }, description: { en: 'In charging accessories sales', ar: 'في مبيعات إكسسوارات الشحن' } },
                { icon: '⚡', title: { en: 'PowerIQ', ar: 'PowerIQ' }, description: { en: 'Smart charging technology', ar: 'تقنية الشحن الذكي' } },
                { icon: '🛡️', title: { en: 'Multi-Protection', ar: 'حماية متعددة' }, description: { en: '10 protection layers', ar: '10 طبقات حماية' } },
                { icon: '♻️', title: { en: 'Lifetime Warranty', ar: 'ضمان مدى الحياة' }, description: { en: 'On cables', ar: 'على الكابلات' } },
            ]
        },
        metadata: {
            en: {
                title: 'Anker Egypt | Power Banks, Chargers, Soundcore Earbuds',
                description: 'Official Anker Egypt store. Shop Anker power banks 20000mAh, Anker chargers 20W/25W, Soundcore earbuds R50i. 100% authentic with official warranty.',
                keywords: 'anker egypt, anker power bank, anker charger, anker soundcore, anker 20w charger, anker cables',
            },
            ar: {
                title: 'Anker Egypt | انكر مصر - باور بانك، شواحن، سماعات أصلية',
                description: 'Anker Egypt الوكيل المعتمد. تسوق باور بانك انكر، شاحن انكر، سماعات انكر Soundcore بأفضل الأسعار في مصر. منتجات أصلية 100% مع ضمان رسمي.',
                keywords: 'انكر مصر, باور بانك انكر, شاحن انكر, سماعات انكر, شاحن انكر 20 وات, كابل انكر',
            }
        }
    },
    joyroom: {
        id: 'joyroom',
        hero: {
            bgGradient: 'from-red-600 via-red-700 to-red-900',
            badge: { en: '5,400+ monthly searches', ar: '5,400+ بحث شهري' },
            title: 'Joyroom Egypt',
            description: {
                en: 'Premium quality at affordable prices. T03s earbuds best seller, power banks, chargers and original cables.',
                ar: 'جودة عالية بأسعار مناسبة. سماعات T03s الأكثر مبيعاً، باور بانك، شواحن وكابلات أصلية.'
            },
            features: [
                { en: 'Affordable Prices', ar: 'أسعار اقتصادية' },
                { en: 'Excellent Quality', ar: 'جودة ممتازة' },
                { en: 'Warranty', ar: 'ضمان' }
            ],
            heroProduct: {
                label: { en: '⭐ Hero Product:', ar: '⭐ المنتج النجم:' },
                link: { href: '/joyroom/audio', text: { en: 'Joyroom T03s - Best Selling Earbuds in Egypt', ar: 'Joyroom T03s - السماعة الأكثر مبيعاً في مصر' } }
            }
        },
        categories: [
            { title: { en: 'T03s Earbuds', ar: 'سماعات T03s' }, description: { en: 'Hero Product - Best Seller', ar: 'المنتج النجم - الأكثر مبيعاً' }, href: '/joyroom/audio', icon: '🎧', volume: { en: '1,900+ searches/mo', ar: '1,900+ بحث/شهر' }, badge: { en: '⭐ Hero Product', ar: '⭐ Hero Product' } },
            { title: { en: 'Joyroom Power Banks', ar: 'باور بانك جوي روم' }, description: { en: '10000 & 20000mAh', ar: '10000 & 20000mAh' }, href: '/joyroom/power-banks', icon: '⚡', volume: { en: '1,300+ searches/mo', ar: '1,300+ بحث/شهر' } },
            { title: { en: 'Joyroom Chargers', ar: 'شاحن جوي روم' }, description: { en: 'Fast Charging 20W', ar: 'شحن سريع 20W' }, href: '/joyroom/wall-chargers', icon: '🔌', volume: { en: '110+ searches/mo', ar: '110+ بحث/شهر' } },
            { title: { en: 'Joyroom Cables', ar: 'كابلات جوي روم' }, description: { en: 'Lightning & Type-C', ar: 'Lightning & Type-C' }, href: '/joyroom/cables', icon: '🔗', volume: { en: 'New', ar: 'جديد' } },
            { title: { en: 'Joyroom Smart Watches', ar: 'ساعات جوي روم الذكية' }, description: { en: 'FT3 and more', ar: 'FT3 وأكثر' }, href: '/joyroom/smart-watches', icon: '⌚', volume: { en: 'New', ar: 'جديد' }, badge: { en: '🔥 New', ar: '🔥 جديد' } },
            { title: { en: 'Car Holders', ar: 'حوامل سيارة' }, description: { en: 'Magnetic Mounts', ar: 'حوامل مغناطيسية' }, href: '/joyroom/car-holders', icon: '🧭', volume: { en: 'New', ar: 'جديد' } },
        ],
        whySection: {
            title: { en: 'Why Joyroom?', ar: 'لماذا Joyroom؟' },
            items: [
                { icon: '💰', title: { en: 'Affordable', ar: 'سعر مناسب' }, description: { en: 'Best value for money', ar: 'أفضل قيمة مقابل السعر' } },
                { icon: '✨', title: { en: 'Sleek Design', ar: 'تصميم أنيق' }, description: { en: 'Modern and elegant products', ar: 'منتجات عصرية وأنيقة' } },
                { icon: '🎯', title: { en: 'Excellent Quality', ar: 'جودة ممتازة' }, description: { en: 'Global standards', ar: 'معايير عالمية' } },
                { icon: '🏅', title: { en: 'T03s Star', ar: 'T03s النجم' }, description: { en: 'Best seller in Egypt', ar: 'الأكثر مبيعاً في مصر' } },
            ]
        },
        metadata: {
            en: {
                title: 'Joyroom Egypt | T03s Earbuds, Power Banks, Chargers',
                description: 'Official Joyroom Egypt store. Shop Joyroom T03s earbuds, power banks 20000mAh, chargers. Affordable quality with warranty. Best prices in Egypt.',
                keywords: 'joyroom, joyroom t03s, joyroom earbuds, joyroom power bank, joyroom charger',
            },
            ar: {
                title: 'Joyroom Egypt | جوي روم مصر - سماعات T03s، باور بانك، شواحن',
                description: 'Joyroom Egypt متجر جوي روم في مصر. سماعات joyroom t03s، باور بانك جوي روم، شاحن جيروم بأفضل الأسعار. منتجات أصلية مع ضمان.',
                keywords: 'جوي روم, joyroom t03s, سماعات جوي روم, باور بانك جوي روم, باور بانك جيروم, شاحن جيروم, سماعة جيروم',
            }
        }
    }
};
