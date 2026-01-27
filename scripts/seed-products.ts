// Auto-generated from product-catalog.json
// Products ready for seeding to Firebase

export const categories = [
    {
        slug: "power-banks",
        icon: "🔋",
        order: 1,
        status: "active",
        productCount: 0,
        translations: {
            en: { name: "Power Banks", description: "Portable chargers and power banks for all your devices" },
            ar: { name: "باور بانك", description: "شواحن متنقلة وبطاريات احتياطية لجميع أجهزتك" }
        },
        seo: { keywords: "باور بانك, شاحن متنقل, بطارية متنقلة, power bank" }
    },
    {
        slug: "wall-chargers",
        icon: "🔌",
        order: 2,
        status: "active",
        productCount: 0,
        translations: {
            en: { name: "Wall Chargers", description: "Fast wall chargers for iPhone, Samsung and all smartphones" },
            ar: { name: "شواحن حائط", description: "شواحن حائط سريعة للايفون و سامسونج وجميع الهواتف" }
        },
        seo: { keywords: "شاحن, شاحن حائط, شاحن سريع, wall charger" }
    },
    {
        slug: "cables",
        icon: "🔗",
        order: 3,
        status: "active",
        productCount: 0,
        translations: {
            en: { name: "Charging Cables", description: "High quality USB-C, Lightning and Micro USB cables" },
            ar: { name: "كابلات شحن", description: "كابلات شحن عالية الجودة USB-C و Lightning و Micro USB" }
        },
        seo: { keywords: "كابل, سلك شحن, وصلة ايفون, cable" }
    },
    {
        slug: "car-chargers",
        icon: "🚗",
        order: 4,
        status: "active",
        productCount: 0,
        translations: {
            en: { name: "Car Chargers", description: "Fast car chargers for your phone while driving" },
            ar: { name: "شواحن سيارة", description: "شواحن سيارة سريعة لشحن هاتفك أثناء القيادة" }
        },
        seo: { keywords: "شاحن سيارة, car charger" }
    },
    {
        slug: "audio",
        icon: "🎧",
        order: 5,
        status: "active",
        productCount: 0,
        translations: {
            en: { name: "Audio & Earbuds", description: "Wireless earbuds and Bluetooth headphones" },
            ar: { name: "سماعات وايربودز", description: "سماعات لاسلكية وايربودز بلوتوث" }
        },
        seo: { keywords: "سماعات, ايربودز, earbuds" }
    },
    {
        slug: "smart-watches",
        icon: "⌚",
        order: 6,
        status: "active",
        productCount: 0,
        translations: {
            en: { name: "Smart Watches", description: "Smart watches and fitness trackers" },
            ar: { name: "ساعات ذكية", description: "ساعات ذكية وأجهزة تتبع اللياقة البدنية" }
        },
        seo: { keywords: "ساعة ذكية, smart watch" }
    },
    {
        slug: "car-holders",
        icon: "🧭",
        order: 7,
        status: "active",
        productCount: 0,
        translations: {
            en: { name: "Car Holders", description: "Secure car mounts and holders for safe driving" },
            ar: { name: "حوامل سيارة", description: "حوامل سيارة لتثبيت الهاتف بأمان أثناء القيادة" }
        },
        seo: { keywords: "حامل جوال للسيارة, car mount, car holder" }
    },
    {
        slug: "speakers",
        icon: "🔊",
        order: 8,
        status: "active",
        productCount: 0,
        translations: {
            en: { name: "Bluetooth Speakers", description: "Portable wireless speakers with premium sound" },
            ar: { name: "مكبرات صوت بلوتوث", description: "مكبرات صوت لاسلكية محمولة بصوت نقي وقوي" }
        },
        seo: { keywords: "speaker, bluetooth speaker, soundcore, مكبر صوت, سماعة بلوتوث" }
    }
];

export const products = [
    // ========== ANKER SPEAKERS ==========
    {
        slug: "anker-soundcore-motion-plus",
        sku: "ANK-SP-MOTION",
        brand: "Anker",
        categorySlug: "speakers",
        price: 4500,
        originalPrice: 5500,
        stock: 20,
        featured: true,
        status: "active",
        images: [
            { id: "img_motion_1", url: "/products/anker/anker-soundcore-motion-plus/1.webp", alt: "Anker Soundcore Motion+ Bluetooth Speaker", order: 0, isPrimary: true },
            { id: "img_motion_2", url: "/products/anker/anker-soundcore-motion-plus/2.webp", alt: "مكبر صوت انكر موشن بلس", order: 1, isPrimary: false }
        ],
        translations: {
            en: {
                name: "Anker Soundcore Motion+ Bluetooth Speaker",
                shortDescription: "Hi-Res 30W audio with extended bass and treble",
                description: "The Anker Soundcore Motion+ is a premium portable speaker with Hi-Res Audio certification. It delivers stunning 30W sound with intense bass and ultra-clear treble. Fully waterproof (IPX7) and app-customizable EQ.",
                features: ["Hi-Res Audio Certification", "30W powerful sound", "BassUp technology", "12-hour playtime", "IPX7 waterproof"],
                metaTitle: "Anker Soundcore Motion+ Speaker | Hi-Res Audio Egypt",
                metaDesc: "Buy Anker Soundcore Motion+ in Egypt. 30W Hi-Res audio, waterproof, 12H battery. Best portable speaker."
            },
            ar: {
                name: "مكبر صوت انكر Soundcore Motion+ بلوتوث",
                shortDescription: "صوت عالي الدقة 30 واط مع باس قوي",
                description: "مكبر صوت Soundcore Motion+ هو سماعة محمولة فاخرة بشهادة الصوت عالي الدقة (Hi-Res). يوفر صوتاً مذهلاً بقوة 30 واط مع باس عميق وتريبل فائق الوضوح. مقاوم للماء بالكامل (IPX7) مع تحكم EQ عبر التطبيق.",
                features: ["شهادة الصوت عالي الدقة Hi-Res", "صوت قوي 30 واط", "تقنية BassUp", "وقت تشغيل 12 ساعة", "مقاومة للماء IPX7"],
                metaTitle: "مكبر صوت انكر Soundcore Motion+ | صوت عالي الدقة مصر",
                metaDesc: "اشتري مكبر صوت Soundcore Motion+ في مصر. صوت 30 واط Hi-Res، مقاوم للماء، بطارية 12 ساعة."
            }
        },
        seo: { keywords: "soundcore motion+, anker speaker, bluetooth speaker, مكبر صوت انكر, ساوند كور", focusKeyword: "soundcore motion+" }
    },
    {
        slug: "anker-soundcore-flare-2",
        sku: "ANK-SP-FLARE2",
        brand: "Anker",
        categorySlug: "speakers",
        price: 2900,
        originalPrice: 3500,
        stock: 25,
        featured: false,
        status: "active",
        images: [
            { id: "img_flare2_1", url: "/products/anker/anker-soundcore-flare-2/1.webp", alt: "Anker Soundcore Flare 2 Bluetooth Speaker", order: 0, isPrimary: true }
        ],
        translations: {
            en: {
                name: "Anker Soundcore Flare 2 Bluetooth Speaker",
                shortDescription: "360° immersive sound with beat-driven light show",
                description: "The Soundcore Flare 2 delivers 360° immersive sound and a beat-driven light show. With IPX7 water protection, it's perfect for pool parties. Link over 100 speakers with PartyCast.",
                features: ["360° sound & light show", "20W (10W x 2) output", "PartyCast technology (link 100+)", "IPX7 waterproof", "Customizable EQ via app"],
                metaTitle: "Anker Soundcore Flare 2 | 360 Sound & Lights Egypt",
                metaDesc: "Buy Anker Soundcore Flare 2 in Egypt. 360 sound, LED lights, waterproof. Best party speaker."
            },
            ar: {
                name: "مكبر صوت انكر Soundcore Flare 2 بلوتوث",
                shortDescription: "صوت محيطي 360 درجة مع عرض ضوئي متفاعل",
                description: "يوفر Soundcore Flare 2 صوتاً محيطياً 360 درجة وعرضاً ضوئياً يتفاعل مع الإيقاع. مع حماية IPX7 من الماء، فهو مثالي للحفلات. يمكن ربط أكثر من 100 سماعة بتقنية PartyCast.",
                features: ["صوت وإضاءة 360 درجة", "قوة 20 واط", "تقنية PartyCast لربط السماعات", "مقاومة للماء IPX7", "تخصيص الصوت عبر التطبيق"],
                metaTitle: "مكبر صوت انكر Soundcore Flare 2 | صوت وإضاءة مصر",
                metaDesc: "اشتري مكبر صوت Soundcore Flare 2 في مصر. صوت 360، إضاءة LED، مقاوم للماء. أفضل سماعة للحفلات."
            }
        },
        seo: { keywords: "soundcore flare 2, party speaker, anker flare, سماعة مضيئة", focusKeyword: "soundcore flare 2" }
    },

    // ========== ANKER POWER BANKS ==========
    {
        slug: "anker-737-powerbank",
        sku: "ANK-PB-737",
        brand: "Anker",
        categorySlug: "power-banks",
        price: 3200,
        originalPrice: 3999,
        stock: 15,
        featured: true,
        status: "active",
        images: [
            { id: "img_737_1", url: "/products/anker/anker-737-powerbank/1.webp", alt: "Anker 737 Power Bank (PowerCore 24K)", order: 0, isPrimary: true },
            { id: "img_737_2", url: "/products/anker/anker-737-powerbank/2.webp", alt: "باور بانك انكر 737 شاشة رقمية", order: 1, isPrimary: false }
        ],
        translations: {
            en: {
                name: "Anker 737 Power Bank (PowerCore 24K)",
                shortDescription: "Ultra-powerful 140W two-way fast charging with smart digital display",
                description: "The Anker 737 Power Bank (PowerCore 24K) features ultra-powerful 140W two-way charging, capable of charging a MacBook Pro 16\" to 50% in just 40 minutes. The smart digital display shows output and input power and estimated time for recharge.",
                features: ["24,000mAh massive capacity", "140W ultra-powerful two-way charging", "Smart digital display", "Charges 3 devices simultaneously", "ActiveShield 2.0 safety monitoring"],
                metaTitle: "Anker 737 Power Bank 24K 140W | Best Price Egypt",
                metaDesc: "Buy Anker 737 Power Bank (PowerCore 24K) in Egypt. 140W fast charging, 24000mAh, smart display. Ultimate power for laptops and phones.",
                faqs: [
                    {
                        question: "Does it charge MacBook Pro 16-inch?",
                        answer: "Yes, the 140W output via USB-C allows it to charge a MacBook Pro 16\" to 50% in just 40 minutes."
                    },
                    {
                        question: "Is it safe to take on a plane?",
                        answer: "Yes, at 86.4Wh, it is under the 100Wh TSA limit, so you can safely carry it in your hand luggage."
                    },
                    {
                        question: "How long does it take to recharge?",
                        answer: "With a 140W charger, it recharges from 0 to 100% in less than 1 hour."
                    }
                ]
            },
            ar: {
                name: "باور بانك انكر 737 (PowerCore 24K) بقوة 140 واط",
                shortDescription: "شحن فائق السرعة 140 واط في الاتجاهين مع شاشة رقمية ذكية",
                description: "يتميز باور بانك انكر 737 (PowerCore 24K) بشحن فائق القوة 140 واط في الاتجاهين، قادر على شحن MacBook Pro 16\" حتى 50% في 40 دقيقة فقط. تعرض الشاشة الرقمية الذكية طاقة الإخراج والإدخال والوقت المتبقي لإعادة الشحن.",
                features: ["سعة ضخمة 24,000 مللي أمبير", "شحن فائق القوة 140 واط في الاتجاهين", "شاشة عرض رقمية ذكية", "شحن 3 أجهزة في وقت واحد", "مراقبة أمان ActiveShield 2.0"],
                metaTitle: "باور بانك انكر 737 بقوة 140 واط | أقوى باور بانك في مصر",
                metaDesc: "اشتري باور بانك انكر 737 (PowerCore 24K) في مصر. شحن 140 واط، سعة 24000، شاشة ذكية. الطاقة القصوى للابتوب والهواتف.",
                faqs: [
                    {
                        question: "هل يشحن لابتوب ماك بوك برو 16 بوصة؟",
                        answer: "نعم، بفضل قوة 140 واط عبر منفذ USB-C، يمكنه شحن MacBook Pro 16\" حتى 50% في 40 دقيقة فقط."
                    },
                    {
                        question: "هل مسموح به في الطائرة؟",
                        answer: "نعم، سعته 86.4 واط/ساعة وهي أقل من الحد الأقصى المسموح به (100 واط/ساعة)، لذا يمكنك حمله في حقيبة اليد بأمان."
                    },
                    {
                        question: "كم يستغرق إعادة شحنه بالكامل؟",
                        answer: "باستخدام شاحن بقوة 140 واط، يعيد شحن نفسه من 0 إلى 100% في أقل من ساعة واحدة."
                    }
                ]
            }
        },
        seo: { keywords: "anker 737, anker 140w, باور بانك انكر 737, انكر 24000", focusKeyword: "anker 737" }
    },
    {
        slug: "anker-622-maggo",
        sku: "ANK-PB-622",
        brand: "Anker",
        categorySlug: "power-banks",
        price: 1250,
        originalPrice: 1500,
        stock: 40,
        featured: true,
        status: "active",
        images: [
            { id: "img_622_1", url: "/products/anker/anker-622-maggo/1.webp", alt: "Anker 622 Magnetic Battery MagGo", order: 0, isPrimary: true },
            { id: "img_622_2", url: "/products/anker/anker-622-maggo/2.webp", alt: "انكر ماج جو 622", order: 1, isPrimary: false }
        ],
        translations: {
            en: {
                name: "Anker 622 Magnetic Battery (MagGo)",
                shortDescription: "Foldable magnetic wireless portable charger for iPhone 15/14/13/12",
                description: "Snap. Charge. Chill. The Anker 622 Magnetic Battery (MagGo) features a built-in foldable kickstand that keeps your iPhone 13/12 upright for comfortable viewing while charging. Strong magnetic attachment ensures perfect alignment.",
                features: ["Magnetic wireless charging for iPhone", "Built-in foldable kickstand", "Slim and compact design", "USB-C two-way charging port", "Strong magnetic hold"],
                metaTitle: "Anker 622 MagGo Magnetic Battery | MagSafe Power Bank Egypt",
                metaDesc: "Buy Anker 622 Magnetic Battery (MagGo) in Egypt. MagSafe compatible for iPhone 15/14/13. Foldable stand, slim design."
            },
            ar: {
                name: "بطارية انكر 622 مغناطيسية (MagGo)",
                shortDescription: "شاحن لاسلكي مغناطيسي قابل للطي للايفون 15/14/13/12",
                description: "ثبت. اشحن. استرخ. تتميز بطارية انكر 622 المغناطيسية (MagGo) بحامل مدمج قابل للطي يبقي ايفونك في وضع رأسي للمشاهدة المريحة أثناء الشحن. يضمن الالتصاق المغناطيسي القوي محاذاة مثالية.",
                features: ["شحن لاسلكي مغناطيسي للايفون", "حامل مدمج قابل للطي", "تصميم نحيف ومدمج", "منفذ USB-C للشحن في الاتجاهين", "قوة مغناطيسية عالية"],
                metaTitle: "بطارية انكر 622 MagGo ماج سيف | باور بانك مغناطيسي مصر",
                metaDesc: "اشتري بطارية انكر 622 المغناطيسية (MagGo) في مصر. متوافق مع ماج سيف للايفون. حامل قابل للطي وتصميم نحيف."
            }
        },
        seo: { keywords: "anker maggo, anker 622, magsafe power bank, باور بانك ماج سيف", focusKeyword: "anker maggo" }
    },
    {
        slug: "anker-521-powerhouse",
        sku: "ANK-PH-521",
        brand: "Anker",
        categorySlug: "power-banks",
        price: 5500,
        originalPrice: 6500,
        stock: 5,
        featured: false,
        status: "active",
        images: [
            { id: "img_521_1", url: "/products/anker/anker-521-powerhouse/1.webp", alt: "Anker 521 Portable Power Station", order: 0, isPrimary: true }
        ],
        translations: {
            en: {
                name: "Anker 521 Portable Power Station (PowerHouse 256Wh)",
                shortDescription: "Long-lasting portable power station with 200W AC outlet",
                description: "The Anker 521 Portable Power Station is built to last over 10 years with InfiniPower™ technology. Features LiFePO4 batteries, ultra-durable electronic components, and a 200W AC outlet to power small appliances and devices during trips or outages.",
                features: ["256Wh capacity / 200W AC output", "LiFePO4 batteries (3000+ cycles)", "USB-C PD port, 2 USB-A ports, car socket", "Built-in LED warm light", "5-year full-device warranty"],
                metaTitle: "Anker 521 Portable Power Station 256Wh | PowerHouse Egypt",
                metaDesc: "Buy Anker 521 PowerHouse in Egypt. 256Wh portable power station, LiFePO4 battery, 200W AC outlet. Perfect for camping and backup."
            },
            ar: {
                name: "محطة طاقة محمولة انكر 521 (PowerHouse 256Wh)",
                shortDescription: "محطة طاقة محمولة طويلة العمر مع منفذ تيار متردد 200 واط",
                description: "تم بناء محطة الطاقة المحمولة انكر 521 لتدوم أكثر من 10 سنوات بتقنية InfiniPower™. تتميز ببطاريات LiFePO4 ومكونات إلكترونية فائقة المتانة، ومنفذ تيار متردد 200 واط لتشغيل الأجهزة الصغيرة أثناء الرحلات أو انقطاع التيار.",
                features: ["سعة 256 واط/ساعة / خرج 200 واط", "بطاريات LiFePO4 (أكثر من 3000 دورة شحن)", "منفذ USB-C PD، منفذين USB-A، مقبس سيارة", "إضاءة LED مدمجة", "ضمان شامل 5 سنوات"],
                metaTitle: "محطة طاقة انكر 521 PowerHouse | مولد كهرباء محمول مصر",
                metaDesc: "اشتري محطة طاقة انكر 521 PowerHouse في مصر. سعة 256 واط/ساعة، بطارية ليثيوم حديد، منفذ 220 فولت. مثالية للتخييم والطوارئ."
            }
        },
        seo: { keywords: "anker powerhouse, anker 521, portable power station, مولد كهرباء انكر", focusKeyword: "anker 521" }
    },
    {
        slug: "anker-powercore-10000",
        sku: "ANK-PB-10K",
        brand: "Anker",
        categorySlug: "power-banks",
        price: 699,
        originalPrice: 899,
        stock: 50,
        featured: true,
        status: "active",
        images: [
            { id: "img_1", url: "/products/anker/anker-powercore-10000/anker-powercore-10000-black-1.webp", alt: "Anker PowerCore 10000mAh باور بانك انكر", order: 0, isPrimary: true },
            { id: "img_2", url: "/products/anker/anker-powercore-10000/anker-powercore-10000-black-2.webp", alt: "باور بانك انكر 10000 امبير", order: 1, isPrimary: false }
        ],
        translations: {
            en: {
                name: "Anker PowerCore 10000mAh Portable Charger",
                shortDescription: "Ultra-compact 10000mAh power bank with high-speed charging",
                description: "The Anker PowerCore 10000 is one of the world's smallest and lightest 10000mAh portable chargers. The high-speed charging ensures your devices power up quickly, while the compact design fits easily in your pocket or bag.",
                features: ["Ultra-compact design - fits in your palm", "10000mAh capacity - charges iPhone 2.5 times", "High-speed charging with PowerIQ technology", "MultiProtect safety system", "18-month warranty"],
                metaTitle: "Anker PowerCore 10000mAh Power Bank | Best Price in Egypt",
                metaDesc: "Buy Anker PowerCore 10000mAh portable charger in Egypt. Ultra-compact design, fast charging, 18-month warranty. Free delivery available."
            },
            ar: {
                name: "Anker PowerCore باور بانك انكر 10000 مللي امبير",
                shortDescription: "باور بانك انكر صغير الحجم بسعة 10000 مللي امبير مع شحن سريع",
                description: "باور بانك انكر PowerCore 10000 هو أحد أصغر وأخف شواحن الطاقة المحمولة بسعة 10000 مللي أمبير في العالم. يضمن الشحن عالي السرعة شحن أجهزتك بسرعة، بينما يتيح التصميم المدمج حمله بسهولة في جيبك أو حقيبتك.",
                features: ["تصميم صغير جداً - يناسب كف اليد", "سعة 10000 مللي أمبير - يشحن الايفون 2.5 مرة", "شحن سريع بتقنية PowerIQ", "نظام حماية MultiProtect", "ضمان 18 شهر"],
                metaTitle: "باور بانك انكر 10000 مللي امبير | أفضل سعر في مصر",
                metaDesc: "اشتري باور بانك انكر 10000 مللي أمبير في مصر. تصميم صغير، شحن سريع، ضمان 18 شهر. شحن مجاني متاح."
            }
        },
        seo: { keywords: "باور بانك انكر, باور بانك انكر 10000, انكر باور بانك, anker power bank", focusKeyword: "باور بانك انكر 10000" }
    },
    {
        slug: "anker-powercore-20000",
        sku: "ANK-PB-20K",
        brand: "Anker",
        categorySlug: "power-banks",
        price: 1199,
        originalPrice: 1499,
        stock: 35,
        featured: true,
        status: "active",
        images: [
            { id: "img_3", url: "/products/anker/anker-powercore-20000/anker-powercore-20000-1.webp", alt: "Anker PowerCore 20000mAh باور بانك انكر 20000", order: 0, isPrimary: true }
        ],
        translations: {
            en: {
                name: "Anker PowerCore 20000mAh Portable Charger",
                shortDescription: "High-capacity 20000mAh power bank with dual USB ports",
                description: "The Anker PowerCore 20000 delivers massive charging capacity in a portable design. With dual USB ports, you can charge two devices simultaneously at high speed.",
                features: ["20000mAh ultra-high capacity", "Dual USB ports for simultaneous charging", "PowerIQ and VoltageBoost technology", "Charges iPhone 5 times", "24-month warranty"],
                metaTitle: "Anker PowerCore 20000mAh Power Bank | Free Delivery Egypt",
                metaDesc: "Buy Anker PowerCore 20000mAh portable charger. Dual USB ports, ultra-high capacity, 24-month warranty. Best price in Egypt."
            },
            ar: {
                name: "Anker PowerCore باور بانك انكر 20000 مللي امبير",
                shortDescription: "باور بانك انكر بسعة كبيرة 20000 مللي امبير مع منفذين USB",
                description: "باور بانك انكر 20000 يوفر سعة شحن ضخمة في تصميم محمول. مع منفذين USB، يمكنك شحن جهازين في نفس الوقت بسرعة عالية.",
                features: ["سعة 20000 مللي أمبير فائقة", "منفذين USB للشحن المتزامن", "تقنية PowerIQ و VoltageBoost", "يشحن الايفون 5 مرات", "ضمان 24 شهر"],
                metaTitle: "باور بانك انكر 20000 مللي امبير | توصيل مجاني مصر",
                metaDesc: "اشتري باور بانك انكر 20000 مللي أمبير. منفذين USB، سعة فائقة، ضمان 24 شهر. أفضل سعر في مصر."
            }
        },
        seo: { keywords: "باور بانك انكر 20000, سعر باور بانك انكر 20000, anker power bank 20000", focusKeyword: "باور بانك انكر 20000" }
    },
    {
        slug: "anker-powercore-26800",
        sku: "ANK-PB-26K",
        brand: "Anker",
        categorySlug: "power-banks",
        price: 1699,
        originalPrice: 1999,
        stock: 20,
        featured: false,
        status: "active",
        images: [
            { id: "img_4", url: "/products/anker/anker-powercore-26800/anker-powercore-26800-1.webp", alt: "Anker PowerCore 26800mAh باور بانك انكر 26800", order: 0, isPrimary: true }
        ],
        translations: {
            en: {
                name: "Anker PowerCore 26800mAh Power Bank",
                shortDescription: "Massive 26800mAh capacity with 3 USB ports",
                description: "The PowerCore 26800 delivers industry-leading capacity to keep your devices charged for days. Three USB ports let you charge three devices at once.",
                features: ["26800mAh massive capacity", "3 USB ports for multi-device charging", "Recharge in 6 hours with dual input", "PowerIQ 2.0 technology", "24-month warranty"],
                metaTitle: "Anker PowerCore 26800mAh - Largest Capacity Power Bank Egypt",
                metaDesc: "Buy Anker PowerCore 26800mAh in Egypt. Massive capacity, 3 USB ports, fast charging. Best for travel."
            },
            ar: {
                name: "Anker PowerCore باور بانك انكر 26800 مللي امبير",
                shortDescription: "سعة ضخمة 26800 مللي امبير مع 3 منافذ USB",
                description: "باور بانك انكر 26800 يوفر سعة رائدة في الصناعة للحفاظ على شحن أجهزتك لأيام. ثلاث منافذ USB تتيح لك شحن ثلاث أجهزة في وقت واحد.",
                features: ["سعة ضخمة 26800 مللي أمبير", "3 منافذ USB للشحن المتعدد", "إعادة الشحن في 6 ساعات بمدخلين", "تقنية PowerIQ 2.0", "ضمان 24 شهر"],
                metaTitle: "باور بانك انكر 26800 مللي امبير | أكبر سعة في مصر",
                metaDesc: "اشتري باور بانك انكر 26800 مللي أمبير في مصر. سعة ضخمة، 3 منافذ USB، شحن سريع."
            }
        },
        seo: { keywords: "باور بانك انكر 26800, انكر 26800", focusKeyword: "باور بانك انكر 26800" }
    },

    // ========== ANKER WALL CHARGERS ==========
    {
        slug: "anker-powerport-20w",
        sku: "ANK-WC-20W",
        brand: "Anker",
        categorySlug: "wall-chargers",
        price: 349,
        originalPrice: 449,
        stock: 100,
        featured: true,
        status: "active",
        images: [
            { id: "img_5", url: "/products/anker/anker-powerport-20w/anker-powerport-20w-1.webp", alt: "شاحن انكر 20 واط للايفون", order: 0, isPrimary: true }
        ],
        translations: {
            en: {
                name: "Anker PowerPort III 20W USB-C Charger",
                shortDescription: "Ultra-compact 20W fast charger for iPhone 15/14/13",
                description: "The Anker PowerPort III 20W delivers fast, efficient charging for iPhone 15, 14, 13, and other USB-C devices. Compact design perfect for travel.",
                features: ["20W fast charging output", "USB-C Power Delivery", "Ultra-compact foldable plug", "MultiProtect safety system", "Works with iPhone 15/14/13/12"],
                metaTitle: "Anker 20W USB-C Fast Charger for iPhone | Egypt",
                metaDesc: "Buy Anker 20W USB-C fast charger for iPhone in Egypt. Ultra-compact, fast charging, best price with warranty."
            },
            ar: {
                name: "شاحن انكر 20 واط USB-C للايفون",
                shortDescription: "شاحن انكر صغير وسريع 20 واط للايفون 15/14/13",
                description: "شاحن انكر 20 واط يوفر شحن سريع وفعال للايفون 15 و 14 و 13 وأجهزة USB-C الأخرى. تصميم صغير مثالي للسفر.",
                features: ["شحن سريع 20 واط", "USB-C Power Delivery", "تصميم صغير مع قابس قابل للطي", "نظام حماية MultiProtect", "يعمل مع ايفون 15/14/13/12"],
                metaTitle: "شاحن انكر 20 واط للايفون | أفضل سعر في مصر",
                metaDesc: "اشتري شاحن انكر 20 واط USB-C للايفون في مصر. تصميم صغير، شحن سريع، ضمان وأفضل سعر."
            }
        },
        seo: { keywords: "شاحن انكر, شاحن انكر 20 واط, شاحن انكر ايفون, anker charger 20w", focusKeyword: "شاحن انكر 20 واط" }
    },
    {
        slug: "anker-powerport-25w",
        sku: "ANK-WC-25W",
        brand: "Anker",
        categorySlug: "wall-chargers",
        price: 449,
        originalPrice: 549,
        stock: 80,
        featured: true,
        status: "active",
        images: [
            { id: "img_6", url: "/products/anker/anker-powerport-25w/anker-powerport-25w-1.webp", alt: "شاحن انكر 25 واط للايفون وسامسونج", order: 0, isPrimary: true }
        ],
        translations: {
            en: {
                name: "Anker PowerPort 25W USB-C Super Fast Charger",
                shortDescription: "25W super fast charger for iPhone and Samsung",
                description: "The Anker 25W charger provides super fast charging for Samsung Galaxy phones and fast charging for iPhone. Compatible with PPS for optimal charging speed.",
                features: ["25W super fast charging", "PPS compatible for Samsung", "USB-C Power Delivery 3.0", "Compact portable design", "18-month warranty"],
                metaTitle: "Anker 25W Super Fast Charger | Samsung & iPhone Egypt",
                metaDesc: "Buy Anker 25W super fast charger for Samsung and iPhone in Egypt. PPS compatible, compact design, best price."
            },
            ar: {
                name: "شاحن انكر 25 واط USB-C فائق السرعة",
                shortDescription: "شاحن انكر 25 واط فائق السرعة للايفون وسامسونج",
                description: "شاحن انكر 25 واط يوفر شحن فائق السرعة لهواتف سامسونج جالاكسي وشحن سريع للايفون. متوافق مع PPS للحصول على أفضل سرعة شحن.",
                features: ["شحن فائق السرعة 25 واط", "متوافق مع PPS لسامسونج", "USB-C Power Delivery 3.0", "تصميم صغير ومحمول", "ضمان 18 شهر"],
                metaTitle: "شاحن انكر 25 واط فائق السرعة | سامسونج وايفون مصر",
                metaDesc: "اشتري شاحن انكر 25 واط فائق السرعة لسامسونج والايفون في مصر. متوافق مع PPS، أفضل سعر."
            }
        },
        seo: { keywords: "شاحن انكر 25 واط, شاحن انكر سامسونج, anker 25w charger", focusKeyword: "شاحن انكر 25 واط" }
    },
    {
        slug: "anker-nano-45w",
        sku: "ANK-WC-45W",
        brand: "Anker",
        categorySlug: "wall-chargers",
        price: 749,
        originalPrice: 899,
        stock: 40,
        featured: false,
        status: "active",
        images: [
            { id: "img_7", url: "/products/anker/anker-nano-45w/anker-powerport-45w-1.webp", alt: "شاحن انكر 45 واط فائق السرعة", order: 0, isPrimary: true }
        ],
        translations: {
            en: {
                name: "Anker Nano 45W USB-C Wall Charger",
                shortDescription: "45W high-power charger for laptop and phones",
                description: "The Anker Nano 45W is compact yet powerful enough to charge laptops, tablets, and phones. GaN technology enables smaller size with higher power.",
                features: ["45W high-power output", "GaN technology for compact size", "Charges laptops and phones", "USB-C Power Delivery 3.0", "24-month warranty"],
                metaTitle: "Anker 45W GaN Charger for Laptop & Phone | Egypt",
                metaDesc: "Buy Anker 45W GaN USB-C charger in Egypt. Compact, powerful, charges laptops and phones. Best price with warranty."
            },
            ar: {
                name: "شاحن انكر نانو 45 واط USB-C",
                shortDescription: "شاحن انكر 45 واط قوي للابتوب والهواتف",
                description: "شاحن انكر نانو 45 واط صغير لكنه قوي بما يكفي لشحن اللابتوب والتابلت والهواتف. تقنية GaN تتيح حجماً أصغر مع طاقة أعلى.",
                features: ["خرج 45 واط قوي", "تقنية GaN لحجم صغير", "يشحن اللابتوب والهواتف", "USB-C Power Delivery 3.0", "ضمان 24 شهر"],
                metaTitle: "شاحن انكر 45 واط GaN للابتوب والهواتف | مصر",
                metaDesc: "اشتري شاحن انكر 45 واط GaN USB-C في مصر. صغير وقوي، يشحن اللابتوب والهواتف. أفضل سعر مع ضمان."
            }
        },
        seo: { keywords: "شاحن انكر 45 واط, شاحن انكر للابتوب, anker 45w charger", focusKeyword: "شاحن انكر 45 واط" }
    },

    // ========== ANKER CABLES ==========
    {
        slug: "anker-powerline-usb-c-lightning",
        sku: "ANK-CB-CL",
        brand: "Anker",
        categorySlug: "cables",
        price: 249,
        originalPrice: 349,
        stock: 150,
        featured: true,
        status: "active",
        images: [
            { id: "img_8", url: "/products/anker/anker-powerline-usb-c-lightning/anker-powerline-usb-c-lightning-1.webp", alt: "كابل انكر USB-C to Lightning للايفون", order: 0, isPrimary: true }
        ],
        translations: {
            en: {
                name: "Anker PowerLine III USB-C to Lightning Cable",
                shortDescription: "MFi certified fast charging cable for iPhone",
                description: "The Anker PowerLine III USB-C to Lightning cable is MFi certified and supports fast charging for iPhone when used with a USB-C charger. Built to last with exceptional durability.",
                features: ["MFi certified for iPhone", "Supports fast charging", "35,000+ bend lifespan", "1m / 2m length options", "18-month warranty"],
                metaTitle: "Anker USB-C to Lightning Cable for iPhone | MFi Certified Egypt",
                metaDesc: "Buy Anker PowerLine USB-C to Lightning cable in Egypt. MFi certified, fast charging, durable. Best price for iPhone cable."
            },
            ar: {
                name: "كابل انكر USB-C to Lightning للايفون",
                shortDescription: "كابل انكر معتمد MFi للشحن السريع للايفون",
                description: "كابل انكر PowerLine III USB-C to Lightning معتمد من MFi ويدعم الشحن السريع للايفون عند استخدامه مع شاحن USB-C. مصمم ليدوم مع متانة استثنائية.",
                features: ["معتمد MFi للايفون", "يدعم الشحن السريع", "يتحمل أكثر من 35,000 ثني", "متوفر بطول 1 متر / 2 متر", "ضمان 18 شهر"],
                metaTitle: "كابل انكر USB-C to Lightning للايفون | معتمد MFi مصر",
                metaDesc: "اشتري كابل انكر PowerLine USB-C to Lightning في مصر. معتمد MFi، شحن سريع، متين. أفضل سعر لكابل ايفون."
            }
        },
        seo: { keywords: "كابل انكر ايفون, وصلة انكر للايفون, كابل انكر تايب سي, anker lightning cable", focusKeyword: "كابل انكر ايفون" }
    },
    {
        slug: "anker-powerline-usb-c-usb-c",
        sku: "ANK-CB-CC",
        brand: "Anker",
        categorySlug: "cables",
        price: 199,
        originalPrice: 279,
        stock: 120,
        featured: false,
        status: "active",
        images: [
            { id: "img_9", url: "/products/anker/anker-powerline-usb-c-usb-c/anker-powerline-usb-c-usb-c-1.webp", alt: "كابل انكر USB-C to USB-C", order: 0, isPrimary: true }
        ],
        translations: {
            en: {
                name: "Anker PowerLine III USB-C to USB-C Cable",
                shortDescription: "60W fast charging USB-C cable for phones and tablets",
                description: "The Anker PowerLine III USB-C to USB-C cable supports 60W fast charging and is perfect for all USB-C devices including phones, tablets, and laptops.",
                features: ["60W fast charging support", "USB 2.0 data transfer", "35,000+ bend lifespan", "1m / 2m length options", "18-month warranty"],
                metaTitle: "Anker USB-C to USB-C Cable 60W | Fast Charging Egypt",
                metaDesc: "Buy Anker USB-C to USB-C cable in Egypt. 60W fast charging, durable, best price for Samsung and USB-C phones."
            },
            ar: {
                name: "كابل انكر USB-C to USB-C بقوة 60 واط",
                shortDescription: "كابل انكر USB-C للشحن السريع 60 واط للهواتف والتابلت",
                description: "كابل انكر PowerLine III USB-C to USB-C يدعم الشحن السريع بقوة 60 واط ومثالي لجميع أجهزة USB-C بما في ذلك الهواتف والتابلت واللابتوب.",
                features: ["يدعم الشحن السريع 60 واط", "نقل بيانات USB 2.0", "يتحمل أكثر من 35,000 ثني", "متوفر بطول 1 متر / 2 متر", "ضمان 18 شهر"],
                metaTitle: "كابل انكر USB-C to USB-C بقوة 60 واط | شحن سريع مصر",
                metaDesc: "اشتري كابل انكر USB-C to USB-C في مصر. شحن سريع 60 واط، متين، أفضل سعر لسامسونج وهواتف USB-C."
            }
        },
        seo: { keywords: "كابل انكر تايب سي, وصلة انكر تايب سي, كابل USB-C انكر", focusKeyword: "كابل انكر تايب سي" }
    },

    // ========== ANKER CAR CHARGER ==========
    {
        slug: "anker-car-charger-dual-usb",
        sku: "ANK-CC-DUAL",
        brand: "Anker",
        categorySlug: "car-chargers",
        price: 349,
        originalPrice: 449,
        stock: 60,
        featured: true,
        status: "active",
        images: [
            { id: "img_10", url: "/products/anker/anker-car-charger-dual-usb/anker-car-charger-dual-1.webp", alt: "شاحن سيارة انكر بمنفذين USB", order: 0, isPrimary: true }
        ],
        translations: {
            en: {
                name: "Anker PowerDrive 2 Dual USB Car Charger",
                shortDescription: "24W dual USB car charger with PowerIQ",
                description: "The Anker PowerDrive 2 provides two USB ports with a combined 24W output. PowerIQ technology ensures fast charging for all your devices on the road.",
                features: ["24W combined output", "Dual USB ports", "PowerIQ fast charging", "Compact LED indicator", "18-month warranty"],
                metaTitle: "Anker Dual USB Car Charger 24W | Fast Charging Egypt",
                metaDesc: "Buy Anker PowerDrive dual USB car charger in Egypt. 24W fast charging, two ports, compact design. Best price."
            },
            ar: {
                name: "شاحن سيارة انكر PowerDrive 2 بمنفذين USB",
                shortDescription: "شاحن سيارة انكر 24 واط بمنفذين USB مع PowerIQ",
                description: "شاحن سيارة انكر PowerDrive 2 يوفر منفذين USB بقوة 24 واط مجتمعة. تقنية PowerIQ تضمن شحن سريع لجميع أجهزتك أثناء القيادة.",
                features: ["خرج 24 واط مجتمعة", "منفذين USB", "شحن سريع PowerIQ", "تصميم صغير مع مؤشر LED", "ضمان 18 شهر"],
                metaTitle: "شاحن سيارة انكر بمنفذين USB 24 واط | شحن سريع مصر",
                metaDesc: "اشتري شاحن سيارة انكر PowerDrive بمنفذين USB في مصر. شحن سريع 24 واط، منفذين، تصميم صغير. أفضل سعر."
            }
        },
        seo: { keywords: "شاحن سيارة انكر, شاحن انكر سيارة, anker car charger", focusKeyword: "شاحن سيارة انكر" }
    },

    // ========== JOYROOM POWER BANKS ==========
    {
        slug: "joyroom-power-bank-10000",
        sku: "JR-PB-10K",
        brand: "Joyroom",
        categorySlug: "power-banks",
        price: 399,
        originalPrice: 549,
        stock: 80,
        featured: true,
        status: "active",
        images: [
            { id: "img_11", url: "/products/joyroom/joyroom-power-bank-10000/joyroom-powerbank-10000-1.webp", alt: "باور بانك جوي روم 10000 مللي امبير", order: 0, isPrimary: true }
        ],
        translations: {
            en: {
                name: "Joyroom 10000mAh Slim Power Bank",
                shortDescription: "Ultra-slim 10000mAh power bank with dual output",
                description: "The Joyroom 10000mAh power bank features an ultra-slim design with dual output ports. Perfect for everyday charging with quick charge support.",
                features: ["10000mAh capacity", "Ultra-slim design", "Dual USB output", "Quick Charge 3.0 support", "LED display"],
                metaTitle: "Joyroom 10000mAh Power Bank | Best Price Egypt",
                metaDesc: "Buy Joyroom 10000mAh slim power bank in Egypt. Dual USB output, quick charge, LED display. Best price with warranty."
            },
            ar: {
                name: "باور بانك جوي روم 10000 مللي امبير نحيف",
                shortDescription: "باور بانك جوي روم نحيف 10000 مللي امبير بمخرجين",
                description: "باور بانك جوي روم 10000 يتميز بتصميم نحيف للغاية مع مخرجين. مثالي للشحن اليومي مع دعم الشحن السريع.",
                features: ["سعة 10000 مللي أمبير", "تصميم نحيف للغاية", "مخرجين USB", "دعم Quick Charge 3.0", "شاشة LED"],
                metaTitle: "باور بانك جوي روم 10000 مللي امبير | أفضل سعر مصر",
                metaDesc: "اشتري باور بانك جوي روم 10000 مللي أمبير نحيف في مصر. مخرجين USB، شحن سريع، شاشة LED. أفضل سعر مع ضمان."
            }
        },
        seo: { keywords: "باور بانك جوي روم, باور بانك جوي روم 10000, joyroom power bank", focusKeyword: "باور بانك جوي روم 10000" }
    },
    {
        slug: "joyroom-power-bank-20000",
        sku: "JR-PB-20K",
        brand: "Joyroom",
        categorySlug: "power-banks",
        price: 649,
        originalPrice: 799,
        stock: 50,
        featured: true,
        status: "active",
        images: [
            { id: "img_12", url: "/products/joyroom/joyroom-power-bank-20000/joyroom-powerbank-20000-1.webp", alt: "باور بانك جوي روم 20000 مللي امبير", order: 0, isPrimary: true }
        ],
        translations: {
            en: {
                name: "Joyroom 20000mAh Power Bank with PD",
                shortDescription: "High capacity 20000mAh power bank with 22.5W fast charging",
                description: "The Joyroom 20000mAh power bank supports 22.5W fast charging with PD and QC 3.0. Features dual input and triple output for versatile charging.",
                features: ["20000mAh high capacity", "22.5W fast charging", "PD and QC 3.0 support", "Triple output ports", "Digital LED display"],
                metaTitle: "Joyroom 20000mAh Power Bank 22.5W | Fast Charging Egypt",
                metaDesc: "Buy Joyroom 20000mAh power bank with 22.5W fast charging in Egypt. PD support, triple output, LED display. Best price."
            },
            ar: {
                name: "باور بانك جوي روم 20000 مللي امبير مع PD",
                shortDescription: "باور بانك جوي روم 20000 سعة كبيرة مع شحن سريع 22.5 واط",
                description: "باور بانك جوي روم 20000 يدعم الشحن السريع 22.5 واط مع PD و QC 3.0. يتميز بمدخلين وثلاث مخارج للشحن المتعدد.",
                features: ["سعة 20000 مللي أمبير كبيرة", "شحن سريع 22.5 واط", "دعم PD و QC 3.0", "ثلاث مخارج للشحن", "شاشة LED رقمية"],
                metaTitle: "باور بانك جوي روم 20000 مللي امبير 22.5 واط | شحن سريع مصر",
                metaDesc: "اشتري باور بانك جوي روم 20000 مللي أمبير مع شحن سريع 22.5 واط في مصر. دعم PD، ثلاث مخارج، شاشة LED. أفضل سعر."
            }
        },
        seo: { keywords: "باور بانك جوي روم 20000, joyroom power bank 20000", focusKeyword: "باور بانك جوي روم 20000" }
    },

    // ========== JOYROOM AUDIO ==========
    {
        slug: "joyroom-t03s-pro-earbuds",
        sku: "JR-T03S-PRO",
        brand: "Joyroom",
        categorySlug: "audio",
        price: 599,
        originalPrice: 799,
        stock: 100,
        featured: true,
        status: "active",
        images: [
            { id: "img_13", url: "/products/joyroom/joyroom-t03s-pro-earbuds/joyroom-t03s-pro-1.webp", alt: "سماعة جوي روم T03S Pro ايربودز", order: 0, isPrimary: true },
            { id: "img_14", url: "/products/joyroom/joyroom-t03s-pro-earbuds/joyroom-t03s-pro-2.webp", alt: "ايربودز جوي روم برو", order: 1, isPrimary: false }
        ],
        translations: {
            en: {
                name: "Joyroom T03S Pro True Wireless Earbuds",
                shortDescription: "Premium TWS earbuds with ANC and 30H playtime",
                description: "The Joyroom T03S Pro features Active Noise Cancellation, touch controls, and up to 30 hours total playtime with the charging case. Premium sound quality with Bluetooth 5.3.",
                features: ["Active Noise Cancellation (ANC)", "30 hours total playtime", "Touch controls", "Bluetooth 5.3", "IPX5 water resistance"],
                metaTitle: "Joyroom T03S Pro ANC Earbuds | Best TWS Egypt",
                metaDesc: "Buy Joyroom T03S Pro wireless earbuds in Egypt. ANC, 30H battery, Bluetooth 5.3, touch controls. Best price for premium earbuds."
            },
            ar: {
                name: "سماعة جوي روم T03S Pro ايربودز لاسلكية",
                shortDescription: "ايربودز جوي روم برو مع إلغاء الضوضاء و30 ساعة استخدام",
                description: "سماعة جوي روم T03S Pro تتميز بإلغاء الضوضاء النشط، تحكم باللمس، وحتى 30 ساعة استخدام مع علبة الشحن. جودة صوت ممتازة مع Bluetooth 5.3.",
                features: ["إلغاء الضوضاء النشط (ANC)", "30 ساعة استخدام إجمالي", "تحكم باللمس", "Bluetooth 5.3", "مقاومة للماء IPX5"],
                metaTitle: "سماعة جوي روم T03S Pro ايربودز | أفضل سماعات مصر",
                metaDesc: "اشتري سماعة جوي روم T03S Pro لاسلكية في مصر. إلغاء ضوضاء، 30 ساعة بطارية، Bluetooth 5.3، تحكم باللمس. أفضل سعر."
            }
        },
        seo: { keywords: "سماعات جوي روم, ايربودز جوي روم, سماعة joyroom t03s pro, joyroom earbuds", focusKeyword: "سماعات جوي روم" }
    },
    {
        slug: "joyroom-jr-t03-wireless-earbuds",
        sku: "JR-T03",
        brand: "Joyroom",
        categorySlug: "audio",
        price: 349,
        originalPrice: 499,
        stock: 120,
        featured: false,
        status: "active",
        images: [
            { id: "img_15", url: "/products/joyroom/joyroom-jr-t03-wireless-earbuds/joyroom-jr-t03-1.webp", alt: "سماعة جوي روم JR-T03 ايربودز", order: 0, isPrimary: true }
        ],
        translations: {
            en: {
                name: "Joyroom JR-T03 True Wireless Earbuds",
                shortDescription: "Budget-friendly TWS earbuds with great sound",
                description: "The Joyroom JR-T03 offers excellent value with quality sound, touch controls, and reliable Bluetooth connectivity. Perfect for everyday use.",
                features: ["20 hours total playtime", "Touch controls", "Bluetooth 5.0", "Stereo sound", "Compact charging case"],
                metaTitle: "Joyroom JR-T03 Wireless Earbuds | Affordable Egypt",
                metaDesc: "Buy Joyroom JR-T03 wireless earbuds in Egypt. Great sound, 20H battery, touch controls. Best budget earbuds."
            },
            ar: {
                name: "سماعة جوي روم JR-T03 ايربودز لاسلكية",
                shortDescription: "ايربودز جوي روم اقتصادية بصوت ممتاز",
                description: "سماعة جوي روم JR-T03 تقدم قيمة ممتازة مع صوت عالي الجودة، تحكم باللمس، واتصال Bluetooth موثوق. مثالية للاستخدام اليومي.",
                features: ["20 ساعة استخدام إجمالي", "تحكم باللمس", "Bluetooth 5.0", "صوت ستيريو", "علبة شحن صغيرة"],
                metaTitle: "سماعة جوي روم JR-T03 ايربودز | اقتصادية مصر",
                metaDesc: "اشتري سماعة جوي روم JR-T03 لاسلكية في مصر. صوت ممتاز، 20 ساعة بطارية، تحكم باللمس. أفضل سماعات اقتصادية."
            }
        },
        seo: { keywords: "سماعة joyroom, ايربودز joyroom", focusKeyword: "سماعة joyroom" }
    },

    // ========== JOYROOM CHARGER ==========
    {
        slug: "joyroom-20w-usb-c-charger",
        sku: "JR-WC-20W",
        brand: "Joyroom",
        categorySlug: "wall-chargers",
        price: 199,
        originalPrice: 279,
        stock: 100,
        featured: false,
        status: "active",
        images: [
            { id: "img_16", url: "/products/joyroom/joyroom-20w-usb-c-charger/joyroom-charger-20w-1.webp", alt: "شاحن جوي روم 20 واط للايفون", order: 0, isPrimary: true }
        ],
        translations: {
            en: {
                name: "Joyroom 20W USB-C Fast Charger",
                shortDescription: "Compact 20W fast charger for iPhone and Android",
                description: "The Joyroom 20W USB-C charger provides fast charging for iPhone 15/14/13 and USB-C Android phones. Compact design with multiple safety protections.",
                features: ["20W PD fast charging", "USB-C output", "Compact design", "Multiple safety protections", "Works with iPhone and Android"],
                metaTitle: "Joyroom 20W USB-C Fast Charger | Best Price Egypt",
                metaDesc: "Buy Joyroom 20W USB-C fast charger in Egypt. PD charging, compact, works with iPhone and Android. Best price."
            },
            ar: {
                name: "شاحن جوي روم 20 واط USB-C سريع",
                shortDescription: "شاحن جوي روم صغير 20 واط للايفون والاندرويد",
                description: "شاحن جوي روم 20 واط USB-C يوفر شحن سريع للايفون 15/14/13 وهواتف الاندرويد USB-C. تصميم صغير مع حماية متعددة.",
                features: ["شحن سريع 20 واط PD", "مخرج USB-C", "تصميم صغير", "حماية متعددة", "يعمل مع الايفون والاندرويد"],
                metaTitle: "شاحن جوي روم 20 واط USB-C سريع | أفضل سعر مصر",
                metaDesc: "اشتري شاحن جوي روم 20 واط USB-C سريع في مصر. شحن PD، تصميم صغير، يعمل مع الايفون والاندرويد. أفضل سعر."
            }
        },
        seo: { keywords: "شاحن joyroom, شاحن جوي روم, joyroom charger", focusKeyword: "شاحن جوي روم" }
    },

    // ========== JOYROOM CABLE ==========
    {
        slug: "joyroom-usb-c-lightning-cable",
        sku: "JR-CB-CL",
        brand: "Joyroom",
        categorySlug: "cables",
        price: 149,
        originalPrice: 199,
        stock: 200,
        featured: false,
        status: "active",
        images: [
            { id: "img_17", url: "/products/joyroom/joyroom-usb-c-lightning-cable/joyroom-cable-lightning-1.webp", alt: "كابل جوي روم للايفون USB-C to Lightning", order: 0, isPrimary: true }
        ],
        translations: {
            en: {
                name: "Joyroom USB-C to Lightning Fast Charging Cable",
                shortDescription: "20W fast charging cable for iPhone",
                description: "The Joyroom USB-C to Lightning cable supports 20W fast charging for iPhone. Durable nylon braided construction with reinforced connectors.",
                features: ["20W fast charging support", "Nylon braided construction", "1m / 2m length options", "MFi compatible", "12-month warranty"],
                metaTitle: "Joyroom USB-C to Lightning Cable | Fast Charging Egypt",
                metaDesc: "Buy Joyroom USB-C to Lightning cable in Egypt. 20W fast charging, nylon braided, durable. Best price for iPhone cable."
            },
            ar: {
                name: "كابل جوي روم USB-C to Lightning شحن سريع",
                shortDescription: "كابل جوي روم للايفون شحن سريع 20 واط",
                description: "كابل جوي روم USB-C to Lightning يدعم الشحن السريع 20 واط للايفون. تصنيع نايلون متين مع موصلات معززة.",
                features: ["يدعم الشحن السريع 20 واط", "تصنيع نايلون مضفر", "متوفر بطول 1 متر / 2 متر", "متوافق MFi", "ضمان 12 شهر"],
                metaTitle: "كابل جوي روم USB-C to Lightning شحن سريع | مصر",
                metaDesc: "اشتري كابل جوي روم USB-C to Lightning في مصر. شحن سريع 20 واط، نايلون مضفر، متين. أفضل سعر لكابل ايفون."
            }
        },
        seo: { keywords: "كابل جوي روم, cable joyroom", focusKeyword: "كابل جوي روم" }
    },

    // ========== ANKER AUDIO ==========
    {
        slug: "anker-soundcore-life-p2i",
        sku: "ANK-EP-P2I",
        brand: "Anker",
        categorySlug: "audio",
        price: 1450,
        originalPrice: 1800,
        stock: 30,
        featured: false,
        status: "active",
        images: [
            { id: "img_p2i_1", url: "/products/anker/anker-soundcore-life-p2i/1.webp", alt: "Anker Soundcore Life P2i Wireless Earbuds", order: 0, isPrimary: true },
            { id: "img_p2i_2", url: "/products/anker/anker-soundcore-life-p2i/2.webp", alt: "سماعات انكر ساوند كور لايف P2i", order: 1, isPrimary: false }
        ],
        translations: {
            en: {
                name: "Anker Soundcore Life P2i True Wireless Earbuds",
                shortDescription: "AI-enhanced calls and 28H playtime with dual EQ modes",
                description: "The Soundcore Life P2i true wireless earbuds offer AI-enhanced calls for clarity, 28 hours of total playtime with the case, and Dual EQ modes (Bass/Podcast) for customized listening.",
                features: ["28 hours total playtime", "AI-enhanced calls with 2 mics", "Dual EQ modes (Bass/Podcast)", "Fast charging (10 min = 1 hour)", "Bluetooth 5.2"],
                metaTitle: "Anker Soundcore Life P2i Wireless Earbuds | Best Price Egypt",
                metaDesc: "Buy Anker Soundcore Life P2i wireless earbuds in Egypt. AI calls, 28H battery, dual EQ. Great value true wireless earbuds."
            },
            ar: {
                name: "سماعات انكر Soundcore Life P2i لاسلكية",
                shortDescription: "مكالمات محسنة بالذكاء الاصطناعي و28 ساعة تشغيل مع وضع EQ مزدوج",
                description: "توفر سماعات Soundcore Life P2i اللاسلكية مكالمات واضحة بتقنية الذكاء الاصطناعي، و28 ساعة من وقت التشغيل الإجمالي مع العلبة، ووضعي EQ مزدوج (Bass/Podcast) للاستماع المخصص.",
                features: ["28 ساعة وقت تشغيل إجمالي", "مكالمات محسنة بالذكاء الاصطناعي (ميكروفونين)", "وضعي EQ مزدوج (Bass/Podcast)", "شحن سريع (10 دقائق = ساعة)", "بلوتوث 5.2"],
                metaTitle: "سماعات انكر Soundcore Life P2i لاسلكية | أفضل سعر في مصر",
                metaDesc: "اشتري سماعات انكر Soundcore Life P2i في مصر. مكالمات واضحة، بطارية 28 ساعة، صوت مخصص. أفضل سماعات اقتصادية."
            }
        },
        seo: { keywords: "anker soundcore life p2i, soundcore earbuds, سماعات انكر, ساوند كور", focusKeyword: "anker soundcore life p2i" }
    },

    // ========== JOYROOM SMART WATCH ==========
    {
        slug: "joyroom-ft3-smartwatch",
        sku: "JR-FT3",
        brand: "Joyroom",
        categorySlug: "smart-watches",
        price: 1850,
        originalPrice: 2500,
        stock: 25,
        featured: true,
        status: "active",
        images: [
            { id: "img_ft3_1", url: "/products/joyroom/joyroom-ft3-smartwatch/1.webp", alt: "Joyroom JR-FT3 Smart Watch", order: 0, isPrimary: true },
            { id: "img_ft3_2", url: "/products/joyroom/joyroom-ft3-smartwatch/2.webp", alt: "ساعة جوي روم JR-FT3 الذكية", order: 1, isPrimary: false }
        ],
        translations: {
            en: {
                name: "Joyroom JR-FT3 Fit-Life Smart Watch",
                shortDescription: "IP68 waterproof smart watch with 20 sports modes",
                description: "The Joyroom JR-FT3 Smart Watch features a vibrant display, 20 sports modes for fitness tracking, heart rate monitoring, and IP68 water resistance. Stay connected with notifications on your wrist.",
                features: ["20 sports modes tracking", "IP68 waterproof rating", "Heart rate & blood oxygen monitoring", "Calls and App notifications", "Long battery life"],
                metaTitle: "Joyroom JR-FT3 Smart Watch | Fitness Tracker Egypt",
                metaDesc: "Buy Joyroom JR-FT3 Smart Watch in Egypt. IP68 waterproof, 20 sports modes, heart rate monitor. Best budget smartwatch."
            },
            ar: {
                name: "ساعة جوي روم JR-FT3 الذكية (Fit-Life)",
                shortDescription: "ساعة ذكية مقاومة للماء IP68 مع 20 وضع رياضي",
                description: "تتميز ساعة جوي روم JR-FT3 الذكية بشاشة نابضة بالحياة، و20 وضع رياضي لتتبع اللياقة البدنية، ومراقبة معدل ضربات القلب، ومقاومة الماء IP68. ابق على اتصال مع الإشعارات على معصمك.",
                features: ["تتبع 20 وضع رياضي", "مقاومة للماء بمعيار IP68", "مراقبة نبضات القلب والأكسجين", "إشعارات المكالمات والتطبيقات", "عمر بطارية طويل"],
                metaTitle: "ساعة جوي روم JR-FT3 الذكية | تتبع اللياقة مصر",
                metaDesc: "اشتري ساعة جوي روم JR-FT3 الذكية في مصر. مقاومة للماء، 20 وضع رياضي، مراقبة صحية. أفضل ساعة اقتصادية."
            }
        },
        seo: { keywords: "joyroom smart watch, joyroom ft3, ساعة جوي روم, ساعة ذكية", focusKeyword: "joyroom ft3" }
    },

    // ========== JOYROOM CAR HOLDER ==========
    {
        slug: "joyroom-car-mount-zs290",
        sku: "JR-ZS290",
        brand: "Joyroom",
        categorySlug: "car-holders",
        price: 350,
        originalPrice: 500,
        stock: 60,
        featured: false,
        status: "active",
        images: [
            { id: "img_zs290_1", url: "/products/joyroom/joyroom-car-mount-zs290/1.webp", alt: "Joyroom Magnetic Car Phone Mount", order: 0, isPrimary: true }
        ],
        translations: {
            en: {
                name: "Joyroom Magnetic Car Phone Mount (JR-ZS290)",
                shortDescription: "Powerful magnetic car holder for air vents",
                description: "The Joyroom JR-ZS290 is a sturdy magnetic car mount designed for air vents. It features built-in strong magnets to hold your phone securely even on bumpy roads, with 360-degree rotation.",
                features: ["Strong magnetic absorption", "360-degree rotation", "Secure air vent clip", "One-hand operation", "Universal compatibility"],
                metaTitle: "Joyroom Magnetic Car Holder JR-ZS290 | Egypt",
                metaDesc: "Buy Joyroom Magnetic Car Mount in Egypt. Strong magnet, air vent clip, 360 rotation. Secure holder for all phones."
            },
            ar: {
                name: "حامل جوال مغناطيسي للسيارة من جوي روم (JR-ZS290)",
                shortDescription: "حامل مغناطيسي قوي لفتحة التكييف",
                description: "حامل جوي روم JR-ZS290 هو حامل سيارة مغناطيسي قوي مصمم لفتحات التكييف. يتميز بمغناطيسات قوية مدمجة لتثبيت هاتفك بأمان حتى على الطرق الوعرة، مع دوران 360 درجة.",
                features: ["قوة جذب مغناطيسية عالية", "دوران 360 درجة", "مشبك تثبيت قوي لفتحة التكييف", "تشغيل بيد واحدة", "توافق عالمي مع الهواتف"],
                metaTitle: "حامل جوال مغناطيسي للسيارة جوي روم | مصر",
                metaDesc: "اشتري حامل جوال مغناطيسي للسيارة من جوي روم في مصر. مغناطيس قوي، تثبيت في التكييف، دوران 360. أفضل حامل للجوال."
            }
        },
        seo: { keywords: "joyroom car mount, magnetic car holder, حامل جوال سيارة, حامل مغناطيسي", focusKeyword: "joyroom car mount" }
    }
];
