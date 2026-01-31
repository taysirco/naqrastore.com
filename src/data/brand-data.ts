
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
    seoArticle?: {
        en: { title: string; sections: Array<{ heading: string; content: string }> };
        ar: { title: string; sections: Array<{ heading: string; content: string }> };
    };
    faq?: {
        en: Array<{ question: string; answer: string }>;
        ar: Array<{ question: string; answer: string }>;
    };
}

export const brandData: Record<string, BrandData> = {
    anker: {
        id: 'anker',
        hero: {
            bgGradient: 'from-blue-600 via-blue-700 to-blue-900',
            badge: { en: "World's #1 Charging Authority", ar: 'القوة المطلقة - رقم 1 عالمياً' },
            title: 'Anker Egypt',
            description: {
                en: 'Experience the future of charging with Anker GaNPrime™ and PowerIQ 4.0. The only brand fully optimized for iPhone 17 & Samsung S26 AI features. Official Warranty.',
                ar: 'اختبر مستقبل الشحن مع تقنيات Anker GaNPrime™ و PowerIQ 4.0. العلامة التجارية الوحيدة المجهزة بالكامل لذكاء هواتف 2026. ضمان الوكيل الرسمي.'
            },
            features: [
                { en: 'Official Agent Warranty (18 Months)', ar: 'ضمان الوكيل (18 شهر استبدال)' },
                { en: 'ActiveShield™ 2.0 Safety', ar: 'حماية نشطة ActiveShield™ 2.0' },
                { en: 'GaNPrime™ Technology', ar: 'تكنولوجيا GaNPrime™ المتطورة' }
            ]
        },
        categories: [
            { title: { en: 'Anker Power Banks', ar: 'باور بانك انكر' }, description: { en: 'PowerCore 10000 & 20000mAh', ar: 'شحن ذكي و سعات ضخمة' }, href: '/anker/power-banks', icon: '⚡', volume: { en: '2,900+ searches/mo', ar: '2,900+ بحث/شهر' } },
            { title: { en: 'Anker Chargers', ar: 'شواحن انكر (Wall)' }, description: { en: 'Nano 20W, 30W & 45W', ar: 'شواحن Nano وسرعات 45W' }, href: '/anker/wall-chargers', icon: '🔌', volume: { en: '2,900+ searches/mo', ar: '2,900+ بحث/شهر' } },
            { title: { en: 'Soundcore Earbuds', ar: 'سماعات Soundcore' }, description: { en: 'Liberty 4, P40i, R50i', ar: 'عزل ضوضاء وصوت Hi-Res' }, href: '/anker/audio', icon: '🎧', volume: { en: '3,600+ searches/mo', ar: '3,600+ بحث/شهر' } },
            { title: { en: 'Soundcore Speakers', ar: 'مكبرات صوت (Speakers)' }, description: { en: 'Motion+, Flare 2, Boom 2', ar: 'صوت 360 درجة وحفلات' }, href: '/anker/speakers', icon: '🔊', volume: { en: 'Trending', ar: 'تريندينج' }, badge: { en: '🔥 Best Audio', ar: '🔥 صوت نقي' } },
            { title: { en: 'Anker Cables', ar: 'كابلات انكر (Strong)' }, description: { en: 'PowerLine III Flow & USB-C', ar: 'كابلات ضد القطع (Lifetime)' }, href: '/anker/cables', icon: '🔗', volume: { en: '320+ searches/mo', ar: '320+ بحث/شهر' } },
            { title: { en: 'Anker Car Chargers', ar: 'شواحن سيارة' }, description: { en: 'PowerDrive Alloy', ar: 'شحن سريع في الطريق' }, href: '/anker/car-chargers', icon: '🚗', volume: { en: '260+ searches/mo', ar: '260+ بحث/شهر' } },
        ],
        whySection: {
            title: { en: 'Why Anker is the G.O.A.T?', ar: 'لماذا Anker هي الأفضل عالمياً؟' },
            items: [
                { icon: '🌍', title: { en: '#1 Global Leader', ar: 'الأولى عالمياً بلا منازع' }, description: { en: 'Dominated the charging market since 2011', ar: 'تسيطر على سوق الشحن منذ 2011' } },
                { icon: '🧠', title: { en: 'AI PowerIQ 4.0', ar: 'ذكاء اصطناعي PowerIQ 4.0' }, description: { en: 'Adapts power to your device\'s needs', ar: 'يتكيف مع احتياج هاتفك لحظياً' } },
                { icon: '🛡️', title: { en: 'ActiveShield™ 2.0', ar: 'درع الحماية النشط 2.0' }, description: { en: 'Checks temperature 3m times/day', ar: 'يراقب الحرارة 3 مليون مرة يومياً' } },
                { icon: '🤝', title: { en: 'Local Warranty', ar: 'ضمان محلي حقيقي' }, description: { en: '18 Months Instant Exchange', ar: 'استبدال فوري لمدة 18 شهر' } },
            ]
        },
        metadata: {
            en: {
                title: 'Anker Egypt Official | #1 Charging Brand | Power Banks & Soundcore',
                description: 'The Official Anker Egypt Destination. Shop Anker GaNPrime Chargers, Prime Power Banks, and Soundcore Liberty 4. 100% Original with 18-Month Warranty.',
                keywords: 'anker egypt, anker power bank, anker ganprime, soundcore liberty 4, anker iphone 17 charger, anker samsung s26 charger, best power bank 2026',
            },
            ar: {
                title: 'Anker Egypt | انكر مصر - الوكيل الرسمي (باور بانك & Soundcore)',
                description: 'موقع انكر مصر الرسمي. تسوق منتجات Anker الأصلية: باور بانك Prime، شواحن Nano، وسماعات Soundcore. ضمان الوكيل 18 شهر استبدال فوري.',
                keywords: 'انكر مصر, توكيل انكر, صيانة انكر, باور بانك انكر 2026, سماعات ساوند كور, شاحن ايفون 17, شاحن سامسونج سريع',
            }
        },
        seoArticle: {
            ar: {
                title: 'أنكر مصر: عندما تجتمع القوة مع الذكاء الاصطناعي',
                sections: [
                    {
                        heading: 'لماذا تعتبر Anker الخيار الأول في مصر؟',
                        content: 'منذ دخولها السوق المصري، غيرت Anker مفهوم "الشحن" من مجرد ملحق إضافي إلى تقنية أساسية تعتمد عليها حياتك اليومية. بفضل تقنيات مثل **PowerIQ 4.0** التي تتعرف على نوع هاتفك (سواء كان iPhone 17 أو Samsung S26) وتعطيه الفولت المناسب بالضبط، أصبحت انكر "صديقة البطارية" الأولى.'
                    },
                    {
                        heading: 'ضمان الوكيل: استثمار آمن 100%',
                        content: 'شراء منتج Anker الأصلي يعني حصولك على ضمان استبدال فوري لمدة 18 شهراً. لا مزيد من القلق بشأن المنتجات المقلدة التي تضر بجهازك. نحن نضمن لك راحة البال، وجودة التصنيع، وتقنية **ActiveShield 2.0** التي تراقب حرارة الشاحن 3 مليون مرة يومياً.'
                    }
                ]
            },
            en: {
                title: 'Anker Egypt: Powering the AI Generation',
                sections: [
                    {
                        heading: 'Why Anker Leads the Egyptian Market?',
                        content: 'Anker isn’t just about cables and bricks; it’s about intelligent energy. With the launch of **GaNPrime™**, Anker chargers are now 50% smaller yet 3x faster, capable of charging laptops, phones, and earbuds simultaneously. It is the definitive choice for the modern tech enthusiast in Cairo and Alexandria.'
                    },
                    {
                        heading: 'Safety First: The ActiveShield™ Promise',
                        content: 'Your expensive devices need premium protection. Anker’s proprietary **ActiveShield™ 2.0** technology monitors temperature 3,000,000 times per day to prevent overheating. Combined with our 18-month official warranty, investing in Anker is investing in the longevity of your electronics.'
                    }
                ]
            }
        },
        faq: {
            ar: [
                { question: 'كيف يمكنني التأكد أن منتج انكر أصلي؟', answer: 'تأكد دائماً من وجود "العلامة المائية الثلاثية" الخاصة بالوكيل على العلبة، وقم بمسح QR Code الموجود على العبوة للتحقق عبر الموقع الرسمي.' },
                { question: 'ما هو عنوان مركز صيانة انكر في مصر؟', answer: 'يمكنك استبدال أي منتج به عيب صناعة فوراً من خلال شبكة موزعينا المعتمدين أو التواصل معنا مباشرة عبر صفحة "اتصل بنا".' },
                { question: 'هل شواحن انكر آمنة للايفون؟', answer: 'نعم، انكر شريك معتمد لشركة أبل (MFi Certified) وتستخدم نفس "تشيبات" الشحن الأصلية لضمان سلامة البطارية 100%.' }
            ],
            en: [
                { question: 'How to verify my Anker product is original?', answer: 'Always check for the official distributor hologram security sticker on the box. You can also verify the serial number on the Anker official website.' },
                { question: 'Where is the Anker Service Center in Egypt?', answer: 'We offer an "Instant Exchange" warranty policy through our authorized dealer network. No need for long repairs; if it’s a manufacturing defect, it gets replaced.' },
                { question: 'Are Anker chargers MFi Certified?', answer: 'Yes, Anker lightning cables and chargers are fully MFi Certified by Apple, ensuring zero error messages and perfect battery health safety.' }
            ]
        }
    },
    joyroom: {
        id: 'joyroom',
        hero: {
            bgGradient: 'from-red-600 via-red-700 to-red-900',
            badge: { en: 'Joyroom: The Budget King 2026', ar: 'جوي روم: ملك التوفير 2026' },
            title: 'Joyroom Egypt',
            description: {
                en: 'Smart Tech at Student Prices. Home of the Legendary T03s and Safe-Charging Power Banks. 100% Original with Golden Code Verification.',
                ar: 'تكنولوجيا ذكية بأسعار طلابية. بيت أسطورة الـ T03s والباور بانك الآمن. منتجات أصلية 100% مع ضمان الكود الذهبي.'
            },
            features: [
                { en: 'Golden Code Verified', ar: 'موثقة بالكود الذهبي' },
                { en: 'Direct Replacement Warranty', ar: 'ضمان استبدال فوري' },
                { en: 'Best Value for Money', ar: 'أفضل قيمة مقابل سعر' }
            ],
            heroProduct: {
                label: { en: '⭐ The Legend:', ar: '⭐ الأسطورة:' },
                link: { href: '/joyroom/audio', text: { en: 'Joyroom T03s - The AirPods Alternative', ar: 'Joyroom T03s - البديل الاستراتيجي للايربودز' } }
            }
        },
        categories: [
            { title: { en: 'T03s Earbuds', ar: 'سماعات T03s' }, description: { en: 'The Market Legend', ar: 'أسطورة السوق المصري' }, href: '/joyroom/audio', icon: '🎧', volume: { en: '15,000+ sold', ar: '15,000+ مباعة' }, badge: { en: '⭐ Legend', ar: '⭐ أسطورة' } },
            { title: { en: 'Joyroom Power Banks', ar: 'باور بانك جوي روم' }, description: { en: 'Grade A+ Cells (Safe)', ar: 'خلايا Grade A+ (آمنة)' }, href: '/joyroom/power-banks', icon: '⚡', volume: { en: 'High Demand', ar: 'طلب عالي' } },
            { title: { en: 'Joyroom Chargers', ar: 'شواحن جوي روم' }, description: { en: 'Smart IC Protection', ar: 'حماية Smart IC' }, href: '/joyroom/wall-chargers', icon: '🔌', volume: { en: 'Essential', ar: 'أساسي' } },
            { title: { en: 'Joyroom Cables', ar: 'كابلات جوي روم' }, description: { en: 'Auto-Disconnect Tech', ar: 'تقنية الفصل التلقائي' }, href: '/joyroom/cables', icon: '🔗', volume: { en: 'Durable', ar: 'معمر' } },
            { title: { en: 'Joyroom Smart Watches', ar: 'ساعات جوي روم' }, description: { en: 'FT3 Pro & Fit-Life', ar: 'FT3 Pro و Fit-Life' }, href: '/joyroom/smart-watches', icon: '⌚', volume: { en: 'Trending', ar: 'تريندينج' }, badge: { en: '🔥 Hot', ar: '🔥 رائج' } },
            { title: { en: 'Car Holders', ar: 'حوامل سيارة' }, description: { en: 'Strong Magnets', ar: 'مغناطيس قوي جداً' }, href: '/joyroom/car-holders', icon: '🧭', volume: { en: 'New', ar: 'جديد' } },
        ],
        whySection: {
            title: { en: 'Why Choose Joyroom?', ar: 'لماذا تختار Joyroom؟' },
            items: [
                { icon: '💰', title: { en: 'Budget King', ar: 'ملك التوفير' }, description: { en: 'Flagship features at 1/4 price', ar: 'مواصفات الفلاجشيب بربع الثمن' } },
                { icon: '✨', title: { en: 'Premium Design', ar: 'تصميم بريميوم' }, description: { en: 'Looks and feels expensive', ar: 'شكل وملمس غالي' } },
                { icon: '🛡️', title: { en: 'Golden Code', ar: 'الكود الذهبي' }, description: { en: 'Anti-Fake verification system', ar: 'نظام حماية من التقليد' } },
                { icon: '🎧', title: { en: 'The T03s Legacy', ar: 'إرث T03s' }, description: { en: 'Most trusted earbuds in Egypt', ar: 'السماعة الأكثر ثقة في مصر' } },
            ]
        },
        metadata: {
            en: {
                title: 'Joyroom Egypt | The Budget King | T03s & Power Banks',
                description: 'The Official Joyroom Egypt Collection. Home of the Legendary T03s Earbuds and Safe Power Banks. 100% Original with Golden Code verification.',
                keywords: 'joyroom egypt, joyroom t03s original, buy joyroom t03s, joyroom power bank grade a, best budget earbuds 2026, cheap iphone charger',
            },
            ar: {
                title: 'Joyroom Egypt | جوي روم مصر - ملك التوفير (T03s الأصلية)',
                description: 'متجر جوي روم مصر المعتمد. احصل على سماعات T03s الأسطورية، وباور بانك آمن ببطاريات Grade A+. تأكد من أصالة المنتج بالكود الذهبي.',
                keywords: 'جوي روم الاصلي, سماعة t03s, سعر t03s في مصر, كيفية معرفة جوي روم الاصلي, باور بانك رخيص وامن, اكسسوارات موبايل 2026',
            }
        },
        seoArticle: {
            ar: {
                title: 'جوي روم مصر: معادلة الجودة والسعر المستحيلة',
                sections: [
                    {
                        heading: 'لماذا يلقبونها بـ "آبل الغلابة"؟',
                        content: 'استطاعت جوي روم (Joyroom) أن تكتسح السوق المصري بمنتج واحد أسطوري: **T03s**. هذه السماعة قدمت تجربة الايربودز (فتح العلبة، العزل، نقاء الصوت) ولكن بربع الثمن. هي ليست مجرد سماعة رخيصة، هي "استثمار ذكي" لكل طالب أو موظف يريد التكنولوجيا بدون دفع مبالغ طائلة.'
                    },
                    {
                        heading: 'خدعوك فقالوا: رخيص يعني سيء!',
                        content: 'في عالم الشواحن، السعر الرخيص قد يخيفك. لكن جوي روم كسرت هذه القاعدة باستخدام تقنيات الحماية الذكية (Smart IC) وبطاريات **Lithium-Polymer Grade A+** في الباور بانك. منتجاتنا آمنة تماماً على الهواتف الغالية (ايفون و سامسونج) وحاصلة على شهادات الجودة العالمية.'
                    }
                ]
            },
            en: {
                title: 'Joyroom Egypt: The Smartest Budget Choice',
                sections: [
                    {
                        heading: 'The Legend of T03s',
                        content: 'Joyroom dominated the Egyptian market with a simple promise: High-end features for a budget price. The **T03s** Series offers the full "AirPods Experience" (Pop-up pairing, ANC, spatial audio) at a fraction of the cost, making it the #1 choice for students and smart shoppers.'
                    },
                    {
                        heading: 'Safety Without the Price Tag',
                        content: 'Don\'t let the price fool you. Joyroom power banks utilize **Grade A+ Li-Polymer cells** that prevent overheating and swelling. Our chargers feature auto-disconnect technology to protect your battery health. It is "Budget" done right.'
                    }
                ]
            }
        },
        faq: {
            ar: [
                { question: 'ما هو الكود الذهبي؟', answer: 'هو ستيكر موجود على ظهر كل علبة جوي روم أصلية. قم بكشط الطبقة الفضية سيظهر لك كود QR، امسحه وسيوجهك للموقع الرسمي للتأكد أن المنتج أصلي وليس مقلداً.' },
                { question: 'هل سماعات جوي روم تعمل على الاندرويد؟', answer: 'نعم، تعمل بكفاءة تامة (صوت ومايك) على جميع هواتف الاندرويد والايفون واللابتوب.' },
                { question: 'ما هي مدة ضمان جوي روم؟', answer: 'نقدم ضمان استبدال لمدة 12 شهراً ضد عيوب الصناعة على جميع المنتجات الموثقة.' }
            ],
            en: [
                { question: 'What is the Golden Code?', answer: 'It is a security sticker on the back of every original Joyroom box. Scratch it to reveal a QR code, scan it, and it will confirm authenticity on our official website.' },
                { question: 'Do T03s earbuds work on Android?', answer: 'Yes, they are fully compatible (Audio & Mic) with Android, iOS, and Window/Mac laptops.' },
                { question: 'What is the warranty period?', answer: 'We offer a 12-month direct replacement warranty against manufacturing defects for verified original products.' }
            ]
        }
    }
};
