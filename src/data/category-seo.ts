
export interface FAQItem {
    question: string;
    answer: string;
}

export interface BuyingGuideSection {
    title: string;
    content: string; // Markdown supported
}

export interface TrustSignal {
    type: 'originality' | 'warranty' | 'expert_verified';
    text: string;
    icon?: string;
}

export interface CategorySeoData {
    brand: 'Anker' | 'Joyroom';
    brandColor: 'blue' | 'red';
    categoryName: string;
    metadata: {
        en: { title: string; description: string; keywords: string; openGraph?: any };
        ar: { title: string; description: string; keywords: string; openGraph?: any };
    };
    seoContent: {
        ar: {
            title: string;
            subtitle: string;
            description: string;
            buyingGuide?: BuyingGuideSection[];
            faq?: FAQItem[];
            trustSignals?: TrustSignal[];
            products: Array<{ name: string; price: number; badge?: string }>;
        };
        en: {
            title: string;
            subtitle: string;
            description: string;
            buyingGuide?: BuyingGuideSection[];
            faq?: FAQItem[];
            trustSignals?: TrustSignal[];
            products: Array<{ name: string; price: number; badge?: string }>;
        };
    };
}

export const categoryData: Record<string, Record<string, CategorySeoData>> = {
    anker: {
        'power-banks': {
            brand: 'Anker',
            brandColor: 'blue',
            categoryName: 'Power Banks',
            metadata: {
                en: {
                    title: 'Anker Power Bank Egypt | PowerCore 20000mAh, 10000mAh',
                    description: 'Shop original Anker Power Bank in Egypt. Anker PowerCore 20000mAh, 10000mAh, Prime & 737. Fast charging with official warranty. Best prices.',
                    keywords: 'anker power bank, anker power bank 20000mah, anker powercore, anker prime power bank, anker 737 power bank, power bank egypt',
                },
                ar: {
                    title: 'باور بانك انكر | Anker Power Bank Egypt - أفضل أسعار 2026',
                    description: 'تسوق باور بانك انكر الأصلي في مصر. باور بانك انكر 20000 و 10000 مللي أمبير بأفضل الأسعار. شحن سريع وضمان أصلي.',
                    keywords: 'باور بانك انكر, باور بانك انكر 20000, باور بانك انكر 10000, سعر باور بانك انكر, انكر باور بانك, باور بانك, افضل باور بانك',
                }
            },
            seoContent: {
                ar: {
                    title: 'باور بانك انكر الأصلي في مصر',
                    subtitle: 'Anker Power Bank - الأعلى جودة والأكثر مبيعاً',
                    description: `
      تعتبر **انكر (Anker)** الشركة الرائدة عالمياً في تقنيات الشحن (Charging Tech)، بحصة سوقية تتجاوز 40% في أمريكا وأوروبا. في مصر، تعتبر انكر الخيار الأول للمحترفين بفضل:
      1. **تقنية PowerIQ 4.0:** تتعرف على جهازك (سواء كان ايفون، سامسونج، أو لابتوب) وتعطيه أقصى سرعة يدعمها بأمان.
      2. **خلايا بطارية Grade-A:** نستخدم نفس خلايا البطاريات الموجودة في السيارات الكهربائية لضمان عمر افتراضي يتجاوز 500 دورة شحن (ضعف المتوسط).
      3. **الأمان المطلق:** نظام MultiProtect بـ 11 نقطة أمان يحمي من الماس الكهربائي، السخونة، والشحن الزائد.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'منتجات أصلية 100% (يمكن التحقق من السيريال)' },
                        { type: 'warranty', text: 'ضمان استبدال فوري لمدة 18 شهر' },
                        { type: 'expert_verified', text: 'تم اختباره بواسطة فريقنا الفني' }
                    ],
                    buyingGuide: [
                        {
                            title: 'كيف تختار سعة الباور بانك المناسبة؟',
                            content: `
- **10,000 مللي أمبير:** مثالي للاستخدام اليومي الخفيف. يشحن iPhone 17 Pro مرة ونصف تقريباً. (وزن خفيف، حجم صغير)
- **20,000 مللي أمبير:** الخيار الأفضل للسفر والاستخدام المكثف. يشحن iPhone 17 حوالي 3-4 مرات.
- **27,650 مللي أمبير (سلسلة Prime):** لشحن اللابتوب (MacBook Air/Pro) والايباد (M4/M5) والهواتف معاً بسرعات عالية جداً (250W).
`
                        },
                        {
                            title: 'الفرق بين الإصدارات (Series)',
                            content: `
- **سلسلة 3 (Essential):** جودة ممتازة وسعر اقتصادي.
- **سلسلة 5 (Nano/PowerCore):** سرعات أعلى وتصميمات أنحف، تدعم الشحن السريع للايفون 17.
- **سلسلة Prime (الجيل الجديد):** أحدث تكنولوجيا، شاشات رقمية، وسرعات تصل لـ 250 وات لشحن كل أجهزتك.
`
                        },
                        {
                            title: 'تحذير: كيف تكتشف انكر المقلد؟',
                            content: `
1. **كود التحقق (QR Security):** افحص كود QR الموجود على العلبة عبر موقع anker.com/verify. إذا أعطاك "Authentic"، فهو أصلي.
2. **الوزن وكثافة البطارية:** بطاريات انكر الأصلية تستخدم خلايا LG/Panasonic عالية الكثافة. المقلد غالباً يكون خفيفاً بشكل مريب.
3. **تقنية PowerIQ:** المقلد لا يدعم الشحن الذكي، ستلاحظ بطء شديد في الشحن أو سخونة غير طبيعية.
**نحن في CairoVolt موزع معتمد، ونقدم ضمان استبدال فوري 18 شهر ضد عيوب الصناعة.**
`
                        }
                    ],
                    faq: [
                        {
                            question: 'هل باور بانك انكر آمن على بطارية ايفون 17 الجديد؟',
                            answer: 'نعم، وبشكل مطلق. منتجات انكر 2026 تدعم تقنية ActiveShield™ 2.0 و 3.0 التي تراقب درجة حرارة البطارية أكثر من 3 مليون مرة يومياً. بالإضافة لذلك، هي تدعم بروتوكول الشحن المقتصد (Trickle Charging) وسحب الطاقة الذكي الذي يمنع الشحن الزائد، مما يحافظ على صحة البطارية (Health) عند 100% لفترة أطول.'
                        },
                        {
                            question: 'كم مرة يشحن باور بانك 10000 الموبايل؟',
                            answer: 'يعتمد على حجم بطارية هاتفك، ولكن في المتوسط يشحن الايفون العادي (مثل iPhone 16/17) حوالي مرتين، ويشحن هواتف البرو ماكس والألترا مرة ونصف.'
                        },
                        {
                            question: 'ما هو الفرق بين ضمان الوكيل والضمان الدولي؟',
                            answer: 'ضمان الوكيل (الذي نوفره) يضمن لك حق الاستبدال الفوري من داخل مصر في حالة وجود عيب صناعة، بينما الضمان الدولي يتطلب شحن المنتج للخارج.'
                        }
                    ],
                    products: [
                        { name: 'Anker PowerCore 20000mAh (iPhone 17 Ready)', price: 1200, badge: 'الأكثر طلباً' },
                        { name: 'Anker Nano 10000mAh', price: 750, badge: 'حجم صغير' },
                        { name: 'Anker Prime 27650mAh (250W)', price: 4500, badge: 'لأجهزة M5' },
                        { name: 'Anker 737 Power Bank', price: 3200, badge: 'Premium' },
                    ]
                },
                en: {
                    title: 'Anker Power Bank Original in Egypt',
                    subtitle: 'Best Quality & Best Selling',
                    description: `
      Discover the original **Anker Power Bank** collection in Egypt. We offer the best Anker PowerCore models at competitive prices with official warranty.
      
      **Why Choose Anker Power Bank?**
      Anker is the global leader in charging technology, offering solutions that combine speed and safety. With technologies like PowerIQ and GaNPrime, Anker ensures safe charging that preserves your phone's battery life.
    `,
                    trustSignals: [
                        { type: 'originality', text: '100% Original (Verify via Serial)' },
                        { type: 'warranty', text: '18-Month Immediate Replacement Warranty' },
                        { type: 'expert_verified', text: 'Tested by our Technical Team' }
                    ],
                    buyingGuide: [
                        {
                            title: 'How to Choose the Right Capacity?',
                            content: `
- **10,000mAh:** Perfect for daily light use. Charges iPhone 17 approx 1.5 times. (Lightweight, Compact)
- **20,000mAh:** Best choice for travel. Charges iPhone 17 (3-4 times).
- **27,650mAh (Prime Series):** For charging Laptops (MacBook M5), iPads, and Phones together at ultra-high speeds (250W).
`
                        },
                        {
                            title: 'Understanding the Series',
                            content: `
- **Series 3 (Essential / Core):** الجودة المعتادة بسعر اقتصادي. سعة حقيقية وتصميم عملي. (مثال: PowerCore 10000).
- **Series 5 (Nano / MagGo):** تركيز على التصميم النحيف وتقنية المغناطيس (MagSafe). مثالية لمستخدمي iPhone 17/16.
- **Series 7 (Super Fast):** سرعات شحن عالية للابتوب والتابلت. (مثال: Anker 737 بقوة 140 واط).
- **Series Prime (The Flagship):** قمة التكنولوجيا (GaNPrime). شاشات ذكية، تطبيق تحكم عبر البلوتوث، وسرعات تصل لـ 250 واط.
`
                        },
                        {
                            title: 'WARNING: How to Sport Fake Anker?',
                            content: `
1. **Verification Code:** Every original box has a QR code to verify on Anker's official website.
2. **Build Quality:** Originals feel premium and dense; fakes often feel light and cheap.
3. **Ports:** Original ports are precise; fake ones might be loose.
**At CairoVolt, we guarantee 100% original products with official warranty.**
`
                        }
                    ],
                    faq: [
                        {
                            question: 'Is Anker Power Bank safe for iPhone 17?',
                            answer: 'Yes, Anker has updated its ActiveShield™ technology to perfectly match iPhone 17 and Samsung S26 charging protocols ensuring 100% safety.'
                        },
                        {
                            question: 'How many times does a 10000mAh bank charge my phone?',
                            answer: 'On average, it charges a standard iPhone (16/17) about 2 times, and Pro Max/Ultra models about 1.5 times.'
                        },
                        {
                            question: 'Difference between Local Warranty and International?',
                            answer: 'Local Warranty (which we provide) guarantees immediate replacement within Egypt for manufacturing defects, whereas International requires shipping abroad.'
                        }
                    ],
                    products: [
                        { name: 'Anker PowerCore 20000mAh (iPhone 17)', price: 1200, badge: 'Best Seller' },
                        { name: 'Anker Nano 10000mAh', price: 750, badge: 'Compact' },
                        { name: 'Anker Prime 27650mAh (250W)', price: 4500, badge: 'For M5 Chips' },
                        { name: 'Anker 737 Power Bank', price: 3200, badge: 'Flagship' },
                    ]
                }
            }
        },
        'wall-chargers': {
            brand: 'Anker',
            brandColor: 'blue',
            categoryName: 'Wall Chargers',
            metadata: {
                en: {
                    title: 'Anker Charger Egypt | 20W iPhone, 25W Samsung',
                    description: 'Shop original Anker Charger in Egypt. Anker Nano 20W for iPhone, Anker 25W for Samsung. Fast charging with official warranty.',
                    keywords: 'anker charger, anker 20w charger, anker nano, anker charger iphone, anker 25w, charger egypt',
                },
                ar: {
                    title: 'شاحن انكر | Anker Charger Egypt - شاحن انكر 20 وات ايفون',
                    description: 'تسوق شاحن انكر الأصلي في مصر. شاحن انكر 20 وات, شاحن انكر ايفون, راس شاحن انكر, شاحن انكر 25 واط سامسونج. Anker Nano 20W.',
                    keywords: 'شاحن انكر, شاحن انكر ايفون, شاحن انكر 20 وات, راس شاحن انكر, شاحن انكر 25 واط, شاحن انكر تايب سي, شاحن ايفون اصلي, شاحن سريع',
                }
            },
            seoContent: {
                ar: {
                    title: 'شاحن انكر الأصلي',
                    subtitle: 'Anker Charger - الشحن السريع بجودة عالمية',
                    description: `
      اكتشف **شاحن انكر** الأصلي في مصر - العلامة الأولى في الشحن السريع!
      نوفر لك شواحن انكر الجديدة بتقنية Nano و GaN التي توفر شحناً أسرع بـ 3 أضعاف مع حجم أصغر وحرارة أقل.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'شاحن أصلي 100% بالضمان' },
                        { type: 'warranty', text: 'ضمان 18 شهر استبدال' },
                        { type: 'expert_verified', text: 'آمن على بطارية الايفون' }
                    ],
                    buyingGuide: [
                        {
                            title: 'دليل اختيار الشاحن المناسب لهاتفك (2026)',
                            content: `
- **للايفون (iPhone 15/16/17):** اختر شاحن بقوة **30 وات** أو **45 وات** (سلسلة Nano). شواحن 20 وات أصبحت قديمة ولا توفر أقصى سرعة للايفون 17.
- **للسامسونج (Samsung S25/S26):** اختر شاحن بقوة **45 وات** يدعم PPS 2.0. هذا ضروري لتفعيل الـ Super Fast Charging 2.0.
- **لأجهزة MacBook و iPad Pro M5:** اختر شاحن بقوة **65 وات** أو **100 وات** (Anker Prime) لشحن اللابتوب والموبايل معاً.
`
                        },
                        {
                            title: 'ما هي تقنية GaNPrime™؟',
                            content: `
الجيل الجديد من تقنية انكر يوفر:
1. **كفاءة طاقة 95%:** تقليل الهدر في الطاقة والحرارة بنسبة 20% مقارنة بشواحن GaN العادية.
2. **توزيع الطاقة الديناميكي (Power Allocation):** عند شحن لابتوب وموبايل معاً، يقوم الشاحن بإعادة توجيه الطاقة بذكاء للجهاز الذي يحتاجها أكثر كل 3 دقائق.
3. **ActiveShield™ 3.0:** مستشعر حرارة يراقب الشاحن 3 مليون مرة أو أكثر يومياً لضمان برودة التشغيل.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'هل الشحن السريع يضر ببطارية ايفون 17؟',
                            answer: 'بالعكس، ايفون 17 مصمم لاستقبال سرعات عالية لفترات قصيرة. شواحن انكر تنظم الحرارة بدقة لتمنع أي ضرر.'
                        },
                        {
                            question: 'ما الفرق بين شاحن 20 وات و 30 وات للايفون الجديد؟',
                            answer: 'ايفون 17 يدعم سرعات شحن تتجاوز 27 وات، لذا شاحن 30 وات يشحنه أسرع بـ 20 دقيقة كاملة مقارنة بشاحن 20 وات التقليدي.'
                        }
                    ],
                    products: [
                        { name: 'Anker Nano 30W (iPhone 17)', price: 550, badge: 'خيار 2026' },
                        { name: 'Anker 45W Ultra (Samsung S26)', price: 850, badge: 'شحن فائق' },
                        { name: 'Anker Prime 65W GaN', price: 1200, badge: 'للابتوب M5' },
                        { name: 'Anker 100W Desktop', price: 2500, badge: 'محطة شحن' },
                    ]
                },
                en: {
                    title: 'Anker Charger Original',
                    subtitle: 'Fast Charging with World-Class Quality',
                    description: `
      Discover the original **Anker Charger** in Egypt - the #1 brand in fast charging!
      We offer the latest Anker Nano and GaN chargers that provide 3x faster charging with smaller size and less heat.
    `,
                    trustSignals: [
                        { type: 'originality', text: '100% Original Charger' },
                        { type: 'warranty', text: '18-Month Warranty' },
                        { type: 'expert_verified', text: 'Safe for iPhone Battery' }
                    ],
                    buyingGuide: [
                        {
                            title: 'Charger Selection Guide (2026)',
                            content: `
- **For iPhone (15/16/17):** Choose a **30W** or **45W** charger (Nano Series). 20W is now considered slow for the new battery tech in iPhone 17.
- **For Samsung (S25/S26):** **45W** with PPS 2.0 is mandatory for Super Fast Charging 2.0.
- **For MacBook M5 & iPad Pro:** Choose **65W** or **100W** (Prime Series) to charge your workstation from one brick.
`
                        },
                        {
                            title: 'What is GaNPrime™?',
                            content: `
Anker's latest generation technology provides:
1. 20% higher efficiency than standard GaN.
2. ActiveShield™ 3.0 for intelligent heat monitoring.
3. Dynamic Power Distribution for multi-device charging.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'Does fast charging hurt iPhone 17 battery?',
                            answer: 'No. iPhone 17 is designed for high-speed top-ups. Anker chargers manage heat precisely to protect long-term battery health.'
                        },
                        {
                            question: 'Why choose 30W over 20W for new iPhones?',
                            answer: 'iPhone 17 supports charging speeds well over 27W. A 30W charger saves you ~20 minutes per full charge compared to the older 20W standard.'
                        }
                    ],
                    products: [
                        { name: 'Anker Nano 30W (iPhone 17)', price: 550, badge: '2026 Choice' },
                        { name: 'Anker 45W Ultra (Samsung S26)', price: 850, badge: 'Super Fast' },
                        { name: 'Anker Prime 65W GaN', price: 1200, badge: 'For M5' },
                        { name: 'Anker 100W Desktop', price: 2500, badge: 'Desk Station' },
                    ]
                }
            }
        },
        'audio': {
            brand: 'Anker',
            brandColor: 'blue',
            categoryName: 'Audio & Earbuds',
            metadata: {
                en: {
                    title: 'Anker Soundcore Earbuds Egypt | R50i, P20i, Liberty',
                    description: 'Shop Anker Soundcore earbuds in Egypt. Anker R50i, P20i, Liberty. Premium audio quality with official warranty. Best prices.',
                    keywords: 'anker soundcore, anker earbuds, anker r50i, soundcore r50i, anker p20i, anker liberty',
                },
                ar: {
                    title: 'سماعات انكر Soundcore | Anker Earbuds Egypt - R50i, P20i',
                    description: 'تسوق سماعات انكر Soundcore الأصلية في مصر. anker soundcore, سماعة انكر, anker r50i, soundcore r50i, anker p20i. سماعة انكر بلوتوث بأفضل سعر.',
                    keywords: 'anker soundcore, سماعة انكر, سماعات انكر, anker r50i, soundcore r50i, anker p20i, سماعة انكر بلوتوث',
                }
            },
            seoContent: {
                ar: {
                    title: 'سماعات انكر Soundcore',
                    subtitle: 'Anker Soundcore - جودة صوت استثنائية',
                    description: `
      اكتشف عالم **Anker Soundcore** في مصر، حيث تلتقي التكنولوجيا بالصوت النقي.
      سماعات انكر ليست مجرد سماعات، بل هي تجربة سمعية متكاملة مدعومة بالذكاء الاصطناعي (AI Audio) وتطبيق Soundcore الحائز على جوائز.
      
      **لماذا تختار Soundcore في 2026؟**
      - **تقنية HearID 2.0:** تقوم السماعة بتحليل سمعك وإنشاء بروفايل صوتي مخصص لك وحدك.
      - **عزل الضوضاء التكيفي (Adaptive ANC 3.0):** يكتشف الضوضاء المحيطة ويعدل العزل تلقائياً (في المواصلات، المكتب، الشارع).
      - **صوت LDAC عالي الدقة:** نقل بيانات أكثر بـ 3 أضعاف من البلوتوث العادي لتسمع كل تفصيلة.
      - **بطاريات تدوم طويلاً:** تصل إلى 50 ساعة مع العلبة في بعض الموديلات.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'وكيل معتمد (سيريال أصلي)' },
                        { type: 'warranty', text: 'ضمان 18 شهر استبدال' },
                        { type: 'expert_verified', text: 'جودة صوت Hi-Res' }
                    ],
                    buyingGuide: [
                        {
                            title: 'دليل اختيار سماعة انكر المناسبة',
                            content: `
- **الفئة الاقتصادية (R50i / P20i):** أفضل قيمة مقابل سعر. صوت قوي (BassUp)، بطارية ممتازة، وتصميم مريح. (بدون عزل ضوضاء)
- **الفئة المتوسطة (P40i / P3):** تدعم عزل الضوضاء (ANC)، علبة شحن لاسلكي، ووضع الألعاب (Game Mode).
- **فئة الفلاجشيب (Liberty 4 / 4 NC):** قمة الصوتيات. دعم LDAC، تتبع ضربات القلب (في Liberty 4)، وأفضل ميكروفونات للمكالمات في السوق.
`
                        },
                        {
                            title: 'تطبيق Soundcore App',
                            content: `
تأكد دائماً من تحميل تطبيق Soundcore. إذا لم تتعرف السماعة على التطبيق، فهذا يعني أنها **غير أصلية**.
التطبيق يتيح لك: تعديل الـ EQ، تفعيل وضع الألعاب، تحديث السوفتوير، والبحث عن السماعة المفقودة.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'ما هو الفرق بين R50i و P20i؟',
                            answer: 'الفرق الرئيسي في التصميم. R50i بتصميم "عصا" أطول قليلاً وجودة مايك أفضل قليلاً، بينما P20i أصغر وأخف. الصوت والبطارية متطابقان تقريباً.'
                        },
                        {
                            question: 'هل يوجد تأخير في الصوت (Delay) مع الألعاب؟',
                            answer: 'معظم سماعات انكر الحديثة تدعم "وضع الألعاب" (Game Mode) عبر التطبيق، الذي يقلل التأخير لأقل من 70ms لتجربة لعب سلسة.'
                        }
                    ],
                    products: [
                        { name: 'Anker Soundcore R50i', price: 600, badge: 'اقتصادي ناجح' },
                        { name: 'Anker Soundcore P20i', price: 500, badge: 'Best Value' },
                        { name: 'Anker Liberty 4', price: 2500, badge: 'Premium ANC' },
                    ]
                },
                en: {
                    title: 'Anker Soundcore Earbuds',
                    subtitle: 'Exceptional Audio Quality',
                    description: `
      Discover the world of **Anker Soundcore** in Egypt, where technology meets pure sound.
      Soundcore earphones are not just earbuds; they are a complete audio experience powered by **AI Audio** and the award-winning Soundcore App.
      
      **Why Choose Soundcore in 2026?**
      - **HearID 2.0:** Analyzes your hearing and creates a personalized sound profile just for you.
      - **Adaptive ANC 3.0:** Detects environmental noise and adjusts cancellation automatically (Transport, Office, Outdoors).
      - **LDAC Hi-Res Audio:** Transmits 3x more data than standard Bluetooth for studio-quality details.
      - **Long Listing Battery:** Up to 50 hours of playtime with the case on select models.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'Authorized Dealer (Original Serial)' },
                        { type: 'warranty', text: '18-Month Exchange Warranty' },
                        { type: 'expert_verified', text: 'Hi-Res Audio Certified' }
                    ],
                    buyingGuide: [
                        {
                            title: 'Which Anker Earbud Should You Buy?',
                            content: `
- **Budget Series (R50i / P20i):** Best value for money. Powerful sound (BassUp), excellent battery, comfortable fit. (No ANC).
- **Mid-Range Series (P40i / Life Note 3):** Supports Active Noise Cancellation (ANC), Wireless Charging Case, and Game Mode.
- **Flagship Series (Liberty 4 / 4 NC):** The pinnacle of audio. Supports LDAC, Heart Rate Tracking (Liberty 4), and best-in-class Microphones.
`
                        },
                        {
                            title: 'The Soundcore App Advantage',
                            content: `
Always ensure you download the Soundcore App. If the app doesn't recognize your earbuds, **they are likely fake**.
The App allows you to: Customize EQ, Enable Game Mode, Update Firmware, and Find My Earbuds.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'What is the difference between R50i and P20i?',
                            answer: 'The main difference is the design. R50i has a slightly longer "stem" design (better mic), while P20i is more compact. Sound and battery are nearly identical.'
                        },
                        {
                            question: 'Is there audio lag when gaming?',
                            answer: 'Most modern Anker earbuds support "Game Mode" via the app, which reduces latency to under 70ms for a smooth gaming experience.'
                        }
                    ],
                    products: [
                        { name: 'Anker Soundcore R50i', price: 600, badge: 'Budget King' },
                        { name: 'Anker Soundcore P20i', price: 500, badge: 'Best Value' },
                        { name: 'Anker Liberty 4', price: 2500, badge: 'Premium ANC' },
                    ]
                }
            }
        },
        'cables': {
            brand: 'Anker',
            brandColor: 'blue',
            categoryName: 'Cables',
            metadata: {
                en: {
                    title: 'Anker Cable Egypt | Lightning, USB-C, PowerLine',
                    description: 'Shop original Anker cables in Egypt. Anker PowerLine Lightning, USB-C cables. Lifetime warranty. Best prices.',
                    keywords: 'anker cable, anker lightning cable, anker type c cable, anker powerline, cable egypt',
                },
                ar: {
                    title: 'كابل انكر | Anker Cable Egypt - وصلة انكر للايفون',
                    description: 'تسوق كابل انكر الأصلي في مصر. وصلة انكر للايفون, كابل شاحن انكر, anker type c cable, وصلة شاحن انكر بأفضل سعر.',
                    keywords: 'وصلة انكر للايفون, وصلة شاحن انكر, كابل شاحن انكر, anker type c cable, كابل انكر ايفون, وصلة شاحن, وصلة ايفون',
                }
            },
            seoContent: {
                ar: {
                    title: 'كابلات انكر (الأكثر متانة في العالم)',
                    subtitle: 'Anker PowerLine - كابل العمر الطويل',
                    description: `
      هل تعبت من شراء كابلات الآيفون التي تتقطع من عند الرأس؟
      كابلات **Anker PowerLine** ليست مجرد كابلات، بل هي استثمار. مصنوعة من ألياف **Kevlar** (المستخدمة في الستر الواقية من الرصاص)، وتتحمل أكثر من 12,000 ثنية.
      
      **لماذا كابل انكر هو الرقم 1؟**
      - **سرعة شحن خرافية:** يدعم توصيل الطاقة (Power Delivery) لشحن الايفون 50% في 30 دقيقة.
      - **معتمد من أبل (MFi):** يحتوي على شريحة C94 الأصلية من أبل، مما يضمن توافق تام وعدم ظهور رسالة "ملحق غير مدعوم".
      - **ضمان حقيقي:** ضمان استبدال فوري لمدة 18 شهر من الوكيل.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'شريحة Apple C94 أصلية' },
                        { type: 'warranty', text: 'ضمان 18 شهر' },
                        { type: 'expert_verified', text: 'يتحمل 80 كجم شد' }
                    ],
                    buyingGuide: [
                        {
                            title: 'الفرق بين إصدارات PowerLine',
                            content: `
- **PowerLine II:** الإصدار الكلاسيكي القوي. يتحمل 12,000 ثنية. (الأكثر مبيعاً)
- **PowerLine III:** أنحف وأقوى. يتحمل 25,000 ثنية.
- **PowerLine+ III:** مغلف بالنايلون المضفر (Braided) وغير قابل للتشابك. يتحمل 35,000 ثنية.
`
                        },
                        {
                            title: 'هل يدعم الشحن السريع؟',
                            content: `
طبعاً. كابلات USB-C to Lightning و USB-C to USB-C تدعم بروتوكول PD لشحن الايفون والسامسونج واللابتوب بأقصى سرعة.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'لماذا سعر كابل انكر أغلى من الكابلات العادية؟',
                            answer: 'لأنك تشتري كابل يعيش 5 أضعاف عمر الكابل العادي، ومعتمد رسمياً من أبل (MFi) ليحمي دائرة شحن هاتفك من التلف.'
                        }
                    ],
                    products: [
                        { name: 'Anker PowerLine Select+ (Braided)', price: 650, badge: 'الأقوى' },
                        { name: 'Anker PowerLine II (USB-C to Lightning)', price: 550, badge: 'شحن سريع' },
                        { name: 'Anker 322 Cable (USB-C to USB-C)', price: 350, badge: 'اقتصادي' },
                    ]
                },
                en: {
                    title: 'Anker Cables (World\'s Strongest)',
                    subtitle: 'Anker PowerLine - The Last Cable You\'ll Buy',
                    description: `
      Tired of iPhone cables snapping at the connector?
      **Anker PowerLine** cables are built with **Kevlar fiber** (used in bulletproof vests), engineered to withstand over 12,000 bends.
      
      **Why is Anker #1?**
      - **Blazing Speeds:** Supports Power Delivery (PD) to charge iPhone to 50% in 30 mins.
      - **MFi Certified:** Contains Apple's original C94 chip, ensuring 100% compatibility and zero error messages.
      - **Real Warranty:** 18-month immediate replacement warranty.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'Original Apple C94 Chip' },
                        { type: 'warranty', text: '18-Month Warranty' },
                        { type: 'expert_verified', text: 'Withstands 80kg Pull' }
                    ],
                    buyingGuide: [
                        {
                            title: 'PowerLine Generations Explained',
                            content: `
- **PowerLine II:** The classic Durability King. 12,000 bend lifespan. (Best Seller)
- **PowerLine III:** Slimmer yet stronger. 25,000 bend lifespan.
- **PowerLine+ III:** Premium Braided Nylon, tangle-free. 35,000 bend lifespan.
`
                        },
                        {
                            title: 'Does it support Fast Charging?',
                            content: `
Absolutely. Our USB-C to Lightning and USB-C to USB-C cables fully support PD protocols for iPhone, Samsung, and MacBooks.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'Why is Anker more expensive than generic cables?',
                            answer: 'You are paying for a cable that lasts 5x longer and is officially MFi certified to protect your phone\'s charging IC from voltage spikes.'
                        }
                    ],
                    products: [
                        { name: 'Anker PowerLine Select+ (Braided)', price: 650, badge: 'Durable' },
                        { name: 'Anker PowerLine II (USB-C to Lightning)', price: 550, badge: 'Fast Charge' },
                        { name: 'Anker 322 Cable (USB-C to USB-C)', price: 350, badge: 'Value' },
                    ]
                }
            }
        },
        'car-chargers': {
            brand: 'Anker',
            brandColor: 'blue',
            categoryName: 'Car Chargers',
            metadata: {
                en: {
                    title: 'Anker Car Charger Egypt | Fast Charging 48W',
                    description: 'Shop original Anker Car Charger in Egypt. Fast charging 48W, dual ports. Official warranty.',
                    keywords: 'anker car charger, car charger egypt, fast car charger, anker powerdrive',
                },
                ar: {
                    title: 'شاحن سيارة انكر | Anker Car Charger Egypt - شحن سريع',
                    description: 'تسوق شاحن سيارة انكر الأصلي في مصر. شاحن سيارة انكر سريع، Anker Car Charger بأفضل سعر. شاحن سيارة سريع.',
                    keywords: 'شاحن سيارة انكر, شاحن سيارة سريع, anker car charger, شاحن سيارة',
                }
            },
            seoContent: {
                ar: {
                    title: 'شاحن سيارة انكر (شحن سريع وآمن)',
                    subtitle: 'Anker Car Charger - حول سيارتك لمحطة شحن',
                    description: `
      لا تضحي ببطارية هاتفك باستخدام شواحن سيارة رديئة تسبب سخونة زائدة.
      شواحن **Anker Car Chargers** مصممة لتعمل بكفاءة تحت أشعة الشمس المصرية الحارقة بفضل جسمها المعدني (Alloy Body) الذي يشتت الحرارة، وتقنية PowerIQ التي تضمن شحن آمن وسريع.
      
      **لماذا هو الشاحن المثالي لطرق مصر؟**
      - **ثبات في الولاعة:** تصميم محكم لا يهتز أو يفصل مع المطبات.
      - **شحن جهازين معاً:** اشحن هاتفك وهاتف الراكب بجانبك بنفس السرعة القصوى.
      - **حماية من السخونة:** نظام MultiProtect يفصل الشحن فوراً عند ارتفاع الحرارة بشكل خطر.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'جسم معدني لتشتيت الحرارة' },
                        { type: 'warranty', text: 'ضمان 18 شهر استبدال' },
                        { type: 'expert_verified', text: 'شحن سريع 48W' }
                    ],
                    buyingGuide: [
                        {
                            title: 'كيف تختار القوة المناسبة؟',
                            content: `
- **للاستخدام العادي (24W):** يشحن جهازين بسرعة عادية (12W لكل جهاز). مناسب لهواتف الاندرويد القديمة والايفون العادي.
- **للسرعة القصوى (48W+):** ضروري للايفون الحديث (14/15/16) وسامسونج. يدعم شحن PD سريع (50% في 30 دقيقة).
`
                        },
                        {
                            title: 'هل يؤثر على بطارية السيارة؟',
                            content: `
لا. شواحن انكر تستهلك طاقة لا تذكر (Micro-Amps) عندما تكون السيارة مطفأة، ولا تسبب أي تفريغ لبطارية السيارة.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'هل يمكنني شحن اللابتوب في السيارة؟',
                            answer: 'نعم، ولكن تحتاج لشاحن سيارة بقوة 65 واط أو أكثر (موديلات Anker Prime Car Charger) لضمان شحن اللابتوب أثناء الاستخدام.'
                        }
                    ],
                    products: [
                        { name: 'Anker PowerDrive Speed+ 2', price: 850, badge: 'PD سريع' },
                        { name: 'Anker 323 Car Charger (52W)', price: 950, badge: 'الأقوى' },
                        { name: 'Anker Mini Alloys', price: 450, badge: 'معدني' },
                    ]
                },
                en: {
                    title: 'Anker Car Charger (Fast & Safe)',
                    subtitle: 'Turn Your Car Into a Power Station',
                    description: `
      Don't risk your phone battery with cheap plastic car chargers that melt or overheat.
      **Anker Car Chargers** are built with a premium **Alloy Body** to dissipate heat efficiently, making them perfect for hot local summers.
      
      **Why matches Egyptian Roads?**
      - **Secure Fit:** Engineered snugs fit that won't disconnect on speed bumps.
      - **Dual Fast Charging:** Charge pilot and co-pilot devices at full speed simultaneously.
      - **Heat Protection:** MultiProtect system cuts power instantly if dangerous temperatures are detected.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'Alloy Heat Dissipation' },
                        { type: 'warranty', text: '18-Month Warranty' },
                        { type: 'expert_verified', text: '48W Fast Charging' }
                    ],
                    buyingGuide: [
                        {
                            title: 'Choosing the Right Wattage',
                            content: `
- **Standard Use (24W):** Charges two devices at standard speed. Good for older phones or maintaining battery while using GPS.
- **Max Speed (48W+):** Essential for iPhone 14/15/16 and Samsung S-Series. Supports PD Fast Charging (0-50% in 30 mins).
`
                        },
                        {
                            title: 'Will it drain my car battery?',
                            content: `
No. Anker chargers draw negligible power when the car is off, ensuring your car battery stays safe even if you leave the charger plugged in.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'Can I charge my MacBook in the car?',
                            answer: 'Yes, but you need a high-wattage model (65W+) like the Anker Prime Car Charger to charge a laptop effectively while running.'
                        }
                    ],
                    products: [
                        { name: 'Anker PowerDrive Speed+ 2', price: 850, badge: 'PD Fast' },
                        { name: 'Anker 323 Car Charger (52W)', price: 950, badge: 'Powerful' },
                        { name: 'Anker Mini Alloys', price: 450, badge: 'Metallic' },
                    ]
                }
            }
        },
        'speakers': {
            brand: 'Anker',
            brandColor: 'blue',
            categoryName: 'Bluetooth Speakers',
            metadata: {
                en: {
                    title: 'Anker Soundcore Speakers Egypt | Motion+, Flare 2, Boom',
                    description: 'Shop Anker Soundcore Bluetooth speakers in Egypt. Motion+, Flare 2, Boom 2. Hi-Res audio, 360° sound, waterproof IPX7. Best prices with official warranty.',
                    keywords: 'anker speaker, soundcore speaker, anker motion plus, soundcore flare 2, bluetooth speaker egypt, anker bluetooth speaker',
                },
                ar: {
                    title: 'مكبرات صوت انكر Soundcore | سماعات بلوتوث Motion+, Flare 2 مصر',
                    description: 'تسوق مكبرات صوت انكر Soundcore الأصلية في مصر. Motion+, Flare 2, Boom 2. صوت Hi-Res عالي الدقة، صوت 360 درجة، مقاومة للماء IPX7. أفضل سعر مع ضمان رسمي.',
                    keywords: 'سماعة انكر, مكبر صوت انكر, soundcore motion plus, soundcore flare 2, سماعة بلوتوث, مكبر صوت بلوتوث',
                }
            },
            seoContent: {
                ar: {
                    title: 'مكبرات صوت انكر Soundcore',
                    subtitle: 'Anker Soundcore Speakers - صوت Hi-Res عالي الدقة',
                    description: `
كتشف **مكبرات صوت انكر Soundcore** الأصلية في مصر - صوت استثنائي بتقنيات متقدمة.

**لماذا تختار Anker Soundcore Speakers؟**
- **صوت Hi-Res عالي الدقة** - شهادة الصوت عالي الدقة مع 30 واط
- **تقنية BassUp** - باس عميق وقوي يهز المكان
- **صوت 360 درجة** - تجربة صوتية محيطية من كل الاتجاهات
- **مقاومة للماء IPX7** - مثالية للحفلات والمسابح
- **بطارية طويلة** - حتى 24 ساعة من التشغيل المتواصل
- **ربط السماعات** - اربط 100+ سماعة معاً بتقنية PartyCast
- **ضمان انكر الرسمي** - جودة موثوقة وخدمة ما بعد البيع

**أشهر الموديلات:**
- **Soundcore Motion+** - الخيار الأفضل لعشاق الصوت عالي الدقة
- **Soundcore Flare 2** - سماعة الحفلات مع إضاءة LED متفاعلة
    `,
                    products: [
                        { name: 'Soundcore Motion+', price: 4500, badge: 'صوت Hi-Res' },
                        { name: 'Soundcore Flare 2', price: 2900, badge: 'إضاءة LED' },
                    ]
                },
                en: {
                    title: 'Anker Soundcore Speakers',
                    subtitle: 'Hi-Res Audio Quality',
                    description: `
Discover the original **Anker Soundcore Speakers** in Egypt - exceptional audio with advanced technology.

**Why Choose Anker Soundcore Speakers?**
- **Hi-Res Audio Certified** - High-resolution sound with 30W power
- **BassUp Technology** - Deep, powerful bass that fills the room
- **360° Sound** - Immersive audio experience from all directions
- **IPX7 Waterproof** - Perfect for pool parties and outdoor use
- **Long Battery Life** - Up to 24 hours of continuous playback
- **Speaker Pairing** - Connect 100+ speakers with PartyCast
- **Official Anker Warranty** - Reliable quality and after-sales service

**Popular Models:**
- **Soundcore Motion+** - Best choice for Hi-Res audio enthusiasts
- **Soundcore Flare 2** - Party speaker with reactive LED lights
    `,
                    products: [
                        { name: 'Soundcore Motion+', price: 4500, badge: 'Hi-Res Audio' },
                        { name: 'Soundcore Flare 2', price: 2900, badge: 'LED Lights' },
                    ]
                }
            }
        }
    },
    joyroom: {
        'audio': {
            brand: 'Joyroom',
            brandColor: 'red',
            categoryName: 'Audio & Earbuds',
            metadata: {
                en: {
                    title: 'Joyroom T03s Earbuds Egypt | Best Selling Earbuds',
                    description: 'Shop Joyroom T03s earbuds in Egypt. JR-T03s Pro, Joyroom earbuds. Best selling earbuds at affordable prices. Official warranty.',
                    keywords: 'joyroom t03s, joyroom earbuds, jr-t03s pro, joyroom jr-t03s, earbuds egypt',
                },
                ar: {
                    title: 'سماعات جوي روم T03s | Joyroom Earbuds Egypt - أفضل سعر',
                    description: 'تسوق سماعات جوي روم T03s الأصلية في مصر. joyroom t03s, سماعات جيروم, اير بودز جوي روم بأفضل الأسعار. JR-T03s Pro الموديل البرو.',
                    keywords: 'joyroom t03s, سماعات جوي روم, سماعة جيروم, سماعات جيروم, joyroom jr-t03s, jr t03s pro, اير بودز جوي روم, سماعة جيروم t03s',
                }
            },
            seoContent: {
                ar: {
                    title: 'سماعات جوي روم T03s - المنتج النجم',
                    subtitle: 'Joyroom Earbuds - الأعلى مبيعاً في مصر',
                    description: `
      اكتشف **سماعات جوي روم T03s** الأصلية - أسطورة السماعات في مصر (The Legend).
      ببساطة، هي البديل الاستراتيجي لسماعات Apple AirPods. نفس التصميم، نفس الميزات الذكية (Pop-up)، ونفس جودة الصوت بنسبة 95%، ولكن بربع الثمن.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'ضمان الكود الذهبي (الأصلي)' },
                        { type: 'warranty', text: 'ضمان سنة كاملة' },
                        { type: 'expert_verified', text: 'أعلى مبيعات في السوق' }
                    ],
                    buyingGuide: [
                        {
                            title: 'مقارنة الموديلات: T03s vs T03s Pro',
                            content: `
- **JR-T03s (العادية):** النسخة الكلاسيكية. تصميم يشبه الايربودز 2. صوت ممتاز، بطارية قوية، بدون عزل ضوضاء. الخيار الاقتصادي الأفضل.
- **JR-T03s Pro (البرو):** تصميم يشبه الايربودز برو. تدعم عزل الضوضاء (ANC) بشكل حقيقي. صوت أنقى وباس أقوى. تأتي مع "سيليكون" للأذن لعزل أفضل.
`
                        },
                        {
                            title: 'كيف تتأكد أن السماعة أصلية؟ (الكود الذهبي)',
                            content: `
انتشرت نسخ مقلدة كثيرة جداً من جوي روم. للتأكد من أنك تشتري النسخة الأصلية:
1. ابحث عن **الستيكر الذهبي** على العلبة.
2. تأكد من وجود كود QR يوجهك لموقع Joyroom الرسمي.
3. اشترِ من موزع معتمد مثل CairoVolt لضمان حقوقك.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'هل تعمل سماعة جوي روم على الايفون بنفس طريقة الأصلية؟',
                            answer: 'نعم بالضبط. بمجرد فتح العلبة بجوار الايفون، تظهر نافذة الاتصال (Pop-up Animation) تلقائياً وتعرض نسبة شحن السماعة والعلبة، تماماً مثل سماعات أبل.'
                        },
                        {
                            question: 'هل تدعم الشحن اللاسلكي؟',
                            answer: 'نعم، موديلات T03s و T03s Pro تدعم الشحن اللاسلكي (Wireless Charging) بكفاءة تامة.'
                        },
                        {
                            question: 'كيف أميز بين النسخة الأصلية والمقلدة؟',
                            answer: 'السر في "الكود الذهبي". كل علبة أصلية عليها ستيكر ذهبي لامع يحتوي على كود سري (تحت طبقة كشط) يمكنك إدخاله في موقع Joyroom للتأكد. إذا لم يوجد الستيكر، فهي مقلدة.'
                        }
                    ],
                    products: [
                        { name: 'Joyroom T03s', price: 350, badge: '⭐ المنتج النجم' },
                        { name: 'JR-T03s Pro', price: 450, badge: 'الموديل البرو' },
                        { name: 'Joyroom T03s Plus', price: 400, badge: 'بطارية أطول' },
                    ]
                },
                en: {
                    title: 'Joyroom T03s Earbuds - Hero Product',
                    subtitle: 'Best Selling Earbuds in Egypt',
                    description: `
      Discover the original **Joyroom T03s** - The Legend of Earbuds in Egypt.
      Simply put, it is the strategic alternative to Apple AirPods. Same design, same smart features (Pop-up), and 95% of the sound quality, but at a quarter of the price.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'Golden Code Warranty (Original)' },
                        { type: 'warranty', text: '1 Year Warranty' },
                        { type: 'expert_verified', text: 'Market Best Seller' }
                    ],
                    buyingGuide: [
                        {
                            title: 'Comparison: T03s vs T03s Pro',
                            content: `
- **JR-T03s (Standard):** Classic Design (AirPods 2 style). Great sound, strong battery, no ANC. Best budget choice.
- **JR-T03s Pro (Pro):** Pro Design (AirPods Pro style). Supports Active Noise Cancellation (ANC). Richer sound and bass. Comes with silicone tips.
`
                        },
                        {
                            title: 'How to verify Original Joyroom? (Golden Code)',
                            content: `
Many fakes exist. To ensure you buy the original:
1. Look for the **Golden Sticker** on the box (it's crucial).
2. Scratch off the coating to reveal the security code.
3. Verify it on Joyroom's official website.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'Do they work exactly like Apple AirPods?',
                            answer: 'Yes. As soon as you open the lid near an iPhone, the Pop-up Animation appears instantly, showing battery percentages for the buds and case.'
                        },
                        {
                            question: 'Do they support Wireless Charging?',
                            answer: 'Yes, both T03s and T03s Pro models fully support standard Qi wireless charging.'
                        },
                        {
                            question: 'Is it worth buying the Pro over the Standard?',
                            answer: 'If you need Noise Cancellation (ANC) for commute or work, definitely get the Pro. If you prioritise battery life and open-ear fit, the Standard T03s is better.'
                        }
                    ],
                    products: [
                        { name: 'Joyroom T03s', price: 350, badge: '⭐ Hero Product' },
                        { name: 'JR-T03s Pro', price: 450, badge: 'Pro Model' },
                        { name: 'Joyroom T03s Plus', price: 400, badge: 'Extended Battery' },
                    ]
                }
            }
        },
        'power-banks': {
            brand: 'Joyroom',
            brandColor: 'red',
            categoryName: 'Power Banks',
            metadata: {
                en: {
                    title: 'Joyroom Power Bank Egypt | 20000mAh, 10000mAh',
                    description: 'Shop original Joyroom Power Bank in Egypt. Joyroom 20000mAh, 10000mAh power banks. Affordable quality with warranty. Best prices.',
                    keywords: 'joyroom power bank, joyroom power bank 10000, joyroom power bank 20000, power bank egypt',
                },
                ar: {
                    title: 'باور بانك جوي روم | Joyroom Power Bank Egypt - أسعار 2026',
                    description: 'تسوق باور بانك جوي روم الأصلي في مصر. باور بانك جوي روم 20000 و 10000 مللي أمبير بأفضل الأسعار. باور بانك جيروم.',
                    keywords: 'باور بانك جوي روم 10000, باور بانك جوي روم 20000, باور بانك جيروم, سعر باور بانك joyroom, joyroom power bank',
                }
            },
            seoContent: {
                ar: {
                    title: 'باور بانك جوي روم (The Budget BEAST)',
                    subtitle: 'Joyroom Power Bank - تكنولوجيا الحماية الفائقة',
                    description: `
      نحن نعلم أنك تريد جودة "انكر" ولكن بسعر "جوي روم". باور بانك جوي روم هو المعادلة الصعبة.
      يتميز بخلايا بطارية ليثيوم-بوليمر من الدرجة الأولى (Grade A+)، نفس المستخدمة في الهواتف الرائدة، لضمان عمر أطول ووزن أخف.
      
      **لماذا يثق 3 مليون مصري في باور بانك جوي روم؟**
      - **شحن صاروخي 22.5W:** يشحن ايفون 15/16 حتى 60% في 30 دقيقة.
      - **حماية 9 نقاط:** حماية من الماس الكهربائي، السخونة الزائدة، والتفريغ المفاجئ.
      - **شاشة رقمية (في بعض الموديلات):** لتعرف النسبة بالضبط وليس مجرد لمبات.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'منتج أصلي 100% (باركود)' },
                        { type: 'warranty', text: 'ضمان استبدال فوري' },
                        { type: 'expert_verified', text: 'خلايا بطارية Grade A+' }
                    ],
                    buyingGuide: [
                        {
                            title: 'دليل السعات: 10,000 ولا 20,000؟',
                            content: `
- **موديل 10,000mAh (Slim):** مثالي للجيب. يشحن الايفون مرتين تقريباً. وزنه خفيف جداً.
- **موديل 20,000mAh (Pro):** وحش الطاقة. يشحن الايفون 4-5 مرات. مثالي للسفر أو لو معاك أجهزة كتير.
`
                        },
                        {
                            title: 'تحذير هام: المضروب كتير!',
                            content: `
للأسف، باور بانك جوي روم له تقليد كتير في السوق ببطاريات رديئة (رمل!).
**كيف تعرف الأصلي؟**
1. العلبة الأصلية عليها "خربوش" الكود الذهبي.
2. ملمس الباور بانك الأصلي "مطفى" (Matte) وليس لامع رخيص.
3. الوزن: الأصلي 10,000 وزنه حوالي 230 جرام. المقلد خفيف جداً.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'هل يؤثر الشحن السريع 22.5W على بطارية الايفون؟',
                            answer: 'لا، لأن جوي روم تستخدم شريحة Smart IC التي تتعرف على الجهاز وتعطيه الفولت المناسب تماماً (مثل الشاحن الأصلي) وتفصل الشحن عند الامتلاء.'
                        },
                        {
                            question: 'هل مسموح به في الطائرة؟',
                            answer: 'نعم، جميع موديلات جوي روم (حتى 20,000) مسموح بها في حقيبة اليد (Handbag) في الطائرات لأنها أقل من 100Wh.'
                        }
                    ],
                    products: [
                        { name: 'Joyroom 10000mAh Slim 22.5W', price: 850, badge: 'الأكثر مبيعاً' },
                        { name: 'Joyroom 20000mAh Pro 22.5W', price: 1200, badge: 'وحش الطاقة' },
                        { name: 'Joyroom MagSafe 10000mAh', price: 1500, badge: 'لاسلكي' },
                    ]
                },
                en: {
                    title: 'Joyroom Power Bank - The Budget King',
                    subtitle: 'Premium Safety, Affordable Price',
                    description: `
      We know you want "Anker" quality at a "Joyroom" price. Joyroom Power Banks are the answer.
      Featuring **Grade A+ Li-Polymer cells** (standard in flagship phones), they offer safer charging, lighter weight, and longer lifespan than generic competitors.
      
      **Why Trust Joyroom Power Banks?**
      - **22.5W Rocket Charging:** Charges iPhone 15/16 to 60% in just 30 mins.
      - **9-Point Justice Protection:** Shields against short-circuit, overheating, and over-voltage.
      - **Digital Display:** Know your exact battery percentage (on select models).
    `,
                    trustSignals: [
                        { type: 'originality', text: '100% Original (QR Code)' },
                        { type: 'warranty', text: 'Direct Replacement Warranty' },
                        { type: 'expert_verified', text: 'Grade A+ Battery Cells' }
                    ],
                    buyingGuide: [
                        {
                            title: 'Capacity Guide: 10,000 vs 20,000?',
                            content: `
- **10,000mAh (Slim):** Pocket-friendly. Charges iPhone ~2 times. Ultra-lightweight.
- **20,000mAh (Pro):** The Beast. Charges iPhone 4-5 times. Perfect for travel or multiple devices.
`
                        },
                        {
                            title: 'Safety Warning: Avoid Fakes!',
                            content: `
Fake Joyroom banks are common (often filled with sand!).
**How to Spot Originals?**
1. Check for the **Golden Scratch Code** on the box.
2. Texture: Original is premium Matte, fakes are often cheap glossy plastic.
3. Weight: Original 10k is ~230g. Fakes feel suspiciously light.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'Does the 22.5W fast charging hurt my iPhone battery health?',
                            answer: 'No. Joyroom uses a **Smart IC chip** that communicates with your phone to regulate voltage, preventing heat buildup and overcharging.'
                        },
                        {
                            question: 'Is it TSA/Airline Safe?',
                            answer: 'Yes, all Joyroom models (up to 20,000mAh) are fully approved for carry-on luggage on all airlines (under 100Wh).'
                        }
                    ],
                    products: [
                        { name: 'Joyroom 10000mAh Slim 22.5W', price: 850, badge: 'Best Seller' },
                        { name: 'Joyroom 20000mAh Pro 22.5W', price: 1200, badge: 'Power Beast' },
                        { name: 'Joyroom MagSafe 10000mAh', price: 1500, badge: 'Wireless' },
                    ]
                }
            }
        },
        'wall-chargers': {
            brand: 'Joyroom',
            brandColor: 'red',
            categoryName: 'Wall Chargers',
            metadata: {
                en: {
                    title: 'Joyroom Charger Egypt | Fast Charging 20W',
                    description: 'Shop original Joyroom Charger in Egypt. Fast charging 20W, affordable prices. Official warranty.',
                    keywords: 'joyroom charger, joyroom 20w, charger egypt, fast charger',
                },
                ar: {
                    title: 'شاحن جوي روم | Joyroom Charger Egypt - شاحن جيروم سريع',
                    description: 'تسوق شاحن جوي روم الأصلي في مصر. شاحن joyroom, شاحن جيروم سريع, joyroom charger بأفضل الأسعار.',
                    keywords: 'شاحن joyroom, شاحن جوي روم, شاحن جيروم, joyroom charger, شاحن سريع',
                }
            },
            seoContent: {
                ar: {
                    title: 'شواحن جوي روم (The Safe Choice)',
                    subtitle: 'Joyroom Chargers - تكنولوجيا تبريد ذكية',
                    description: `
      شاحن جوي روم هو "الجندي المجهول". يقدم لك نفس أداء الشواحن الباهظة (20W-65W) ولكن بسعر في المتناول.
      يتميز بشريحة **Smart IC** التي توقف الشحن تلقائياً عند امتلاء البطارية، مما يحافظ على صحة بطارية (Battery Health) ايفونك الثمين.
      
      **لماذا يفضل المحترفون شواحن جيروم؟**
      - **تقنية GaN (في موديلات Pro):** حجم أصغر 50% وقوة مضاعفة.
      - **خامات مضادة للحريق:** مصنوع من مادة PC V0 التي تمنع الاشتعال حتى في درجات الحرارة العالية.
      - **متعدد المنافذ:** اشحن اللابتوب والموبايل في نفس الوقت.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'ضمان الوكيل الرسمي' },
                        { type: 'warranty', text: 'آمن على صحة البطارية' },
                        { type: 'expert_verified', text: 'مواد مقاومة للحريق' }
                    ],
                    buyingGuide: [
                        {
                            title: 'اشتري 20W ولا 35W؟',
                            content: `
- **للايفون العادي (11-16):** شاحن 20W أو 25W كافٍ جداً (يشحن 50% في نصف ساعة).
- **للايفون برو ماكس / ايباد:** ننصح بشاحن 30W أو 35W للاستفادة من أقصى سرعة شحن ممكنة (PD 3.0).
`
                        }
                    ],
                    faq: [
                        {
                            question: 'هل يسخن الشاحن أثناء الشحن السريع؟',
                            answer: 'من الطبيعي أن يصبح دافئاً، ولكن شواحن جوي روم مزودة بحساس حرارة يفصل الشحن فوراً إذا تجاوزت الحرارة الحد المسموح.'
                        },
                        {
                            question: 'هل يدعم Super Fast Charging لسامسونج؟',
                            answer: 'نعم، الموديلات التي تدعم تقنية PPS (تأكد من المواصفات) تدعم الشحن الخارق لسامسونج.'
                        }
                    ],
                    products: [
                        { name: 'Joyroom 20W PD Charger', price: 299, badge: 'اقتصادي' },
                        { name: 'Joyroom 35W GaN Dual', price: 550, badge: 'الأسرع' },
                        { name: 'Joyroom 65W Laptop Charger', price: 950, badge: 'للابتوب' },
                    ]
                },
                en: {
                    title: 'Joyroom Chargers - Safe & Smart',
                    subtitle: 'Original Performance at Half Price',
                    description: `
      Joyroom Chargers are the "Hidden Gem" of accessories. Get flagship-level charging speeds (20W-65W) without the flagship price tag.
      Equipped with **Smart IC Chips**, they auto-stop charging when full, protecting your precious iPhone Battery Health.
      
      **Why Professionals Choose Joyroom?**
      - **GaN Technology (Pro Models):** 50% smaller size, 3x faster cooling.
      - **Fire-Retardant:** Made from PC V0 materials that resist combustion.
      - **Multi-Port Power:** Charge your MacBook and iPhone simultaneously.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'Official Agent Warranty' },
                        { type: 'warranty', text: 'Battery Health Safe' },
                        { type: 'expert_verified', text: 'Fire-Proof Material' }
                    ],
                    buyingGuide: [
                        {
                            title: 'Should I buy 20W or 35W?',
                            content: `
- **For Standard iPhone (11-16):** A 20W or 25W charger is perfect (0-50% in 30 mins).
- **For Pro Max / IPad:** We recommend 30W or 35W to unlock maximum charging potential (PD 3.0).
`
                        }
                    ],
                    faq: [
                        {
                            question: 'Does it get hot?',
                            answer: 'Slight warmth is normal during fast charging. However, Joyroom\'s thermal sensors cut off power instantly if limits are exceeded.'
                        },
                        {
                            question: 'Does it support Samsung Super Fast Charging?',
                            answer: 'Yes, models with PPS support (check specs) fully activate Samsung\'s Super Fast Charging mode.'
                        }
                    ],
                    products: [
                        { name: 'Joyroom 20W PD Charger', price: 299, badge: 'Value' },
                        { name: 'Joyroom 35W GaN Dual', price: 550, badge: 'Fastest' },
                        { name: 'Joyroom 65W Laptop Charger', price: 950, badge: 'Laptop-Ready' },
                    ]
                }
            }
        },
        'cables': {
            brand: 'Joyroom',
            brandColor: 'red',
            categoryName: 'Cables',
            metadata: {
                en: {
                    title: 'Joyroom Cable Egypt | Lightning, USB-C',
                    description: 'Shop original Joyroom cables in Egypt. Lightning, USB-C cables at affordable prices.',
                    keywords: 'joyroom cable, joyroom lightning cable, joyroom type c cable, cable egypt',
                },
                ar: {
                    title: 'كابل جوي روم | Joyroom Cable Egypt - وصلة جيروم',
                    description: 'تسوق كابل جوي روم الأصلي في مصر. وصلة جيروم للآيفون وتايب سي بأفضل سعر.',
                    keywords: 'كابل جوي روم, وصلة جيروم, وصلة شاحن, كابل شحن',
                }
            },
            seoContent: {
                ar: {
                    title: 'كابلات جوي روم (تكنولوجيا الفصل التلقائي)',
                    subtitle: 'Joyroom Cables - الكابل الوحيد اللي بيخاف على بطاريتك',
                    description: `
      توقف عن شراء وكابلات "شعبية" تتقطع بعد أسبوع. كابلات جوي روم مصممة لتعيش معك وتحمي هاتفك.
      
      **الميزة الحصرية: الفصل التلقائي (Auto-Disconnect):**
      كابلاتنا الذكية (موديلات S-M411) مزودة بشريحة تفصل الكهرباء تماماً عن الهاتف بمجرد وصول الشحن لـ 100%. هذا يعني أنك تقدر تنام وتسيب موبايلك في الشاحن وأنت مطمئن على صحة البطارية (Battery Health).
      
      **المتانة:**
      تصميم **مضفر (Braided)** يتحمل أكثر من 10,000 ثنية، ورؤوس مدعمة بالمعدن لمنع الكسر من المنطقة الحساسة.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'يفصل الشحن تلقائياً' },
                        { type: 'warranty', text: 'ضمان سنة كاملة' },
                        { type: 'expert_verified', text: 'نقل بيانات سريع' }
                    ],
                    buyingGuide: [
                        {
                            title: 'كيف تختار الكابل المناسب؟',
                            content: `
- **S-M411 (للايفون القديم):** كابل قماشي، يدعم الفصل التلقائي، ولمبة LED بتنور لما يشحن وتطفي لما يفصل.
- **Type-C 60W:** مثالي لشحن سامسونج S23/S24 وشحن الايفون 15/16.
- **Type-C 100W:** ضروري جداً لو بتشحن لابتوب (MacBook) أو ايباد برو، عشان تستفيد من السرعة القصوى.
`
                        },
                        {
                            title: 'هل يدعم نقل البيانات؟',
                            content: `
نعم، جميع كابلاتنا تدعم نقل البيانات بسرعة 480Mbps، يعني تقدر تنقل صور وفيديوهات من الايفون للكمبيوتر بسهولة.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'كيف أعرف أن خاصية الفصل التلقائي تعمل؟',
                            answer: 'في الموديلات التي تدعمها، يوجد مؤشر LED. عندما يكتمل الشحن، سينطفئ المؤشر وتتوقف عملية الشحن تماماً.'
                        },
                        {
                            question: 'هل الكابل معتمد من أبل (MFi)؟',
                            answer: 'كابلات جوي روم متوافقة 100% مع أجهزة أبل ولا تظهر رسالة الخطأ (Accessory not supported) بفضل شريحة Smart IC.'
                        }
                    ],
                    products: [
                        { name: 'Joyroom Light Speed (Auto-Stop)', price: 150, badge: 'يحمي البطارية' },
                        { name: 'Joyroom 100W Type-C', price: 250, badge: 'للابتوب' },
                        { name: 'Joyroom 3-in-1 Braided', price: 200, badge: 'عملي' },
                    ]
                },
                en: {
                    title: 'Joyroom Cables (Auto-Disconnect Tech)',
                    subtitle: 'The Only Cable That Protects Your Battery',
                    description: `
      Stop buying cheap cables that destroy your battery health. Joyroom cables are engineered for safety and longevity.
      
      **Exclusive Feature: Auto-Disconnect:**
      Our smart cables (S-M411 Series) contain a chip that completely cuts off power once your phone hits 100%. You can finally sleep while charging without worrying about overcharging or battery degradation.
      
      **Durability:**
      Heavy-duty **Braided Nylon** tested for 10,000+ bends, with reinforced metal heads to prevent fraying.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'Auto-Stop Charging' },
                        { type: 'warranty', text: '1 Year Warranty' },
                        { type: 'expert_verified', text: '480Mbps Data Sync' }
                    ],
                    buyingGuide: [
                        {
                            title: 'Choosing the Right Cable',
                            content: `
- **S-M411 (Listing):** Fabric braided, Auto-Disconnect tech, LED indicator (breathing light). Best for iPhone 14 and below.
- **Type-C 60W:** Perfect for Samsung S24 Ultra and iPhone 15/16 Series.
- **Type-C 100W:** Essential for charging MacBooks, iPads, and high-end laptops at full speed.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'How do I know Auto-Disconnect is working?',
                            answer: 'The LED indicator on the connector will turn off specifically when the battery is full and power is cut.'
                        },
                        {
                            question: 'Does it support Data Transfer?',
                            answer: 'Yes, all cables support 480Mbps data transfer, perfect for backing up iPhones to your PC/Mac.'
                        }
                    ],
                    products: [
                        { name: 'Joyroom Light Speed (Auto-Stop)', price: 150, badge: 'Battery Saver' },
                        { name: 'Joyroom 100W Type-C', price: 250, badge: 'Laptop Ready' },
                        { name: 'Joyroom 3-in-1 Braided', price: 200, badge: 'Multi-Use' },
                    ]
                }
            }
        },
        'car-accessories': {
            brand: 'Joyroom',
            brandColor: 'red',
            categoryName: 'Car Accessories',
            metadata: {
                en: {
                    title: 'Joyroom Car Accessories Egypt | Car Charger, Holder',
                    description: 'Shop Joyroom car accessories in Egypt. Car charger, phone holder. Affordable prices.',
                    keywords: 'joyroom car charger, joyroom car holder, car accessories egypt',
                },
                ar: {
                    title: 'اكسسوارات سيارة جوي روم | Joyroom Car Accessories Egypt',
                    description: 'تسوق اكسسوارات سيارة جوي روم في مصر. شاحن سيارة joyroom, joyroom car holder حامل موبايل للسيارة.',
                    keywords: 'شاحن سيارة joyroom, joyroom car holder, اكسسوارات سيارة, حامل موبايل سيارة',
                }
            },
            seoContent: {
                ar: {
                    title: 'اكسسوارات سيارة جوي روم',
                    subtitle: 'Joyroom Car Accessories - كل ما تحتاجه للسيارة',
                    description: `
      اكتشف **اكسسوارات سيارة جوي روم** في مصر!
      
      **المنتجات المتوفرة:**
      - **شاحن سيارة Joyroom** - شحن سريع
      - **حامل موبايل للسيارة** - Car Holder
    `,
                    products: [
                        { name: 'Joyroom Car Charger', price: 150, badge: 'شحن سريع' },
                        { name: 'Joyroom Car Holder', price: 120, badge: 'مغناطيسي' },
                        { name: 'Joyroom Dashboard Mount', price: 100, badge: 'مثبت' },
                    ]
                },
                en: {
                    title: 'Joyroom Car Accessories',
                    subtitle: 'Everything You Need for Your Car',
                    description: `
      Discover **Joyroom Car Accessories** in Egypt!
      
      **Available Products:**
      - **Joyroom Car Charger** - Fast charging
      - **Car Phone Holder** - Magnetic mount
    `,
                    products: [
                        { name: 'Joyroom Car Charger', price: 150, badge: 'Fast Charge' },
                        { name: 'Joyroom Car Holder', price: 120, badge: 'Magnetic' },
                        { name: 'Joyroom Dashboard Mount', price: 100, badge: 'Dashboard' },
                    ]
                }
            }
        },
        'car-holders': {
            brand: 'Joyroom',
            brandColor: 'red',
            categoryName: 'Car Holders',
            metadata: {
                en: {
                    title: 'Joyroom Car Phone Holders Egypt | Magnetic Mounts, Air Vent',
                    description: 'Shop Joyroom car phone holders in Egypt. Magnetic mounts, air vent holders, dashboard mounts. Strong grip, 360° rotation. Best prices with warranty.',
                    keywords: 'joyroom car holder, car phone mount, magnetic car holder, air vent mount, حامل جوال سيارة, car mount egypt',
                },
                ar: {
                    title: 'حوامل جوال للسيارة جوي روم | حامل مغناطيسي، حامل تكييف مصر',
                    description: 'تسوق حوامل جوال للسيارة جوي روم في مصر. حوامل مغناطيسية، حوامل فتحة التكييف، حوامل الدتابورد. قبضة قوية، دوران 360 درجة. أفضل سعر مع ضمان.',
                    keywords: 'حامل جوال سيارة, حامل موبايل للسيارة, حامل جوي روم, حامل مغناطيسي, joyroom car holder, car phone mount',
                }
            },
            seoContent: {
                ar: {
                    title: 'حوامل جوال للسيارة جوي روم (مغناطيس N52)',
                    subtitle: 'Joyroom Car Holders - ثبات لا يهتز مع المطبات',
                    description: `
اكتشف **حوامل جوي روم للسيارة** في مصر، الحل الأمثل لتثبيت هاتفك بأمان تام وتجنب مخالفات المرور.
نحن نستخدم مغناطيس **Neodymium N52** (الأقوى عالمياً) لضمان ثبات الهاتف حتى مع أصعب المطبات والطرق غير الممهدة.

**لماذا يختار السائقون حوامل Joyroom؟**
- **قوة تثبيت خرافية:** يتحمل وزن حتى 5 هواتف ايفون 15 برو ماكس.
- **لا يترك أثر:** اللاصق 3M الأصلي يثبت بقوة ولا يترك أي بقايا صمغ على تابلوه سيارتك عند إزالته.
- **دوران 360 درجة:** تحكم كامل في زاوية الرؤية (بالطول أو بالعرض) لسهولة متابعة الـ GPS.
`,
                    trustSignals: [
                        { type: 'originality', text: 'مغناطيس N52 أصلي' },
                        { type: 'warranty', text: 'ضمان استبدال فوري' },
                        { type: 'expert_verified', text: 'ثبات "طرق مصر"' }
                    ],
                    buyingGuide: [
                        {
                            title: 'ايهما تفضل: فتحة التكييف أم التابلوه؟',
                            content: `
- **حامل التكييف (Vent Mount):** الميزة: لا يحجب الرؤية ويحافظ على برودة الهاتف في الصيف. العيب: قد لا يناسب بعض أشكال فتحات التكييف الدائرية الغريبة.
- **حامل التابلوه (Dashboard):** الميزة: حرية وضعه في أي مكان وقرب الهاتف من يدك. نستخدم لاصق Nano Gel قابل للغسل وإعادة الاستخدام.
`
                        },
                        {
                            title: 'هل المغناطيس يضر الهاتف؟',
                            content: `
قطعاً لا. مغناطيسات N52 المستخدمة معزولة ومصممة بحيث تؤثر فقط على القطعة المعدنية ولا تتداخل مع شبكة الهاتف أو الـ GPS أو البطارية.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'هل يثبت على التابلوه المنحني؟',
                            answer: 'نعم، حامل التابلوه من جوي روم يأتي بقاعدة مرنة (Flex Base) تتشكل حسب انحناءات التابلوه لضمان ثبات كامل.'
                        },
                        {
                            question: 'هل هو متوافق مع جراب MagSafe؟',
                            answer: 'نعم، موديلاتنا الحديثة (السلسلة المغناطيسية) تلصق مباشرة على جرابات MagSafe للايفون 12/13/14/15/16 بدون الحاجة لأي قطعة معدنية إضافية.'
                        }
                    ],
                    products: [
                        { name: 'Joyroom JR-ZS290 (Magnetic)', price: 350, badge: 'الأكثر مبيعاً' },
                        { name: 'Joyroom Auto-Clamping (Solar)', price: 650, badge: 'يعمل بالطاقة الشمسية' },
                        { name: 'Joyroom Dashboard 360', price: 300, badge: 'للتابلوه' },
                    ]
                },
                en: {
                    title: 'Joyroom Car Phone Holders (N52 Magnet)',
                    subtitle: 'Unshakable Grip for Rough Roads',
                    description: `
Discover **Joyroom Car Phone Holders** in Egypt, the secure way to mount your phone and drive hands-free.
We use industrial-grade **Neodymium N52 Magnets**, ensuring your phone stays locked in place even on the bumpiest Egyptian roads.

**Why Drivers Choose Joyroom Mounts?**
- **Extreme Hold:** Tested to hold 5x the weight of an iPhone 15 Pro Max.
- **Damage-Free 3M Adhesive:** Strong grip on your dashboard that peels off clean without leaving sticky residue.
- **360° Freedom:** Rotate your phone to portrait or landscape instantly for the perfect GPS view.
`,
                    trustSignals: [
                        { type: 'originality', text: 'Genuine N52 Magnets' },
                        { type: 'warranty', text: 'Instant Replacement Warranty' },
                        { type: 'expert_verified', text: 'Rough Road Tested' }
                    ],
                    buyingGuide: [
                        {
                            title: 'Vent vs. Dashboard: Which to choose?',
                            content: `
- **Air Vent Mount:** Pro: Keeps phone cool with AC and doesn't block windshield view. Con: Might block airflow slightly.
- **Dashboard Mount:** Pro: Flexible positioning closer to your hand. Uses washable/reusable Nano Gel suction cups.
`
                        },
                        {
                            title: 'Does the magnet harm my phone?',
                            content: `
Absolutely not. The N52 magnetic field is closed and shielded, specifically designed to interact with the metal plate without affecting signal, GPS, or battery component.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'Will it stick to a curved dashboard?',
                            answer: 'Yes, our Dashboard mounts feature a flexible base pad that molds to the curves of your car interior for maximum vacuum seal.'
                        },
                        {
                            question: 'Does it work with MagSafe cases?',
                            answer: 'Yes! Our magnetic series works native with MagSafe iPhones (12+) and cases without needing to stick the metal plate.'
                        }
                    ],
                    products: [
                        { name: 'Joyroom JR-ZS290 (Magnetic)', price: 350, badge: 'Best Seller' },
                        { name: 'Joyroom Auto-Clamping (Solar)', price: 650, badge: 'Solar Powered' },
                        { name: 'Joyroom Dashboard 360', price: 300, badge: 'Dashboard' },
                    ]
                }
            }
        },
        'smart-watches': {
            brand: 'Joyroom',
            brandColor: 'red',
            categoryName: 'Smart Watches',
            metadata: {
                en: {
                    title: 'Joyroom Smart Watch Egypt | Fitness Tracker',
                    description: 'Shop Joyroom Smart Watch in Egypt. Fitness tracker, health monitoring. Affordable prices.',
                    keywords: 'joyroom smart watch, joyroom watch, fitness tracker, smart watch egypt',
                },
                ar: {
                    title: 'ساعات جوي روم الذكية | Joyroom Smart Watch Egypt',
                    description: 'تسوقاعات جوي روم الذكية في مصر. ساعة ذكية Joyroom بمميزات رائعة وسعر اقتصادي.',
                    keywords: 'ساعة جوي روم, ساعة ذكية, joyroom smart watch, fitness tracker',
                }
            },
            seoContent: {
                ar: {
                    title: 'ساعات جوي روم الذكية (ساعات الاتصال)',
                    subtitle: 'Joyroom Smart Watch - ذكاء وأناقة في معصمك',
                    description: `
      اكتشف **ساعات جوي روم الذكية** في مصر، البديل الاقتصادي الأقوى لساعات ابل وسامسونج.
      
      **لماذا ساعات Joyroom هي الأكثر طلباً؟**
      - **إجراء المكالمات (Bluetooth Calling):** جميع موديلاتنا الحديثة (مثل FT3 Pro و JR-FT5) مزودة بمايك وسبيكر لإجراء المكالمات بوضوح تام من الساعة مباشرة.
      - **دعم اللغة العربية:** قراءة الإشعارات والرسائل والأسماء باللغة العربية السليمة (بدون حروف مقطعة).
      - **بطارية تدوم أيام:** انسى الشحن اليومي. بطارياتنا تدوم من 5 لـ 10 أيام استخدام متواصل.
      - **مقاومة الماء IP68:** آمنة للوضوء، غسل اليدين، والتعرق أثناء الرياضة.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'نسخة جلوبال (Global Version)' },
                        { type: 'warranty', text: 'ضمان سنة ضد عيوب الصناعة' },
                        { type: 'expert_verified', text: 'تدعم العربية 100%' }
                    ],
                    buyingGuide: [
                        {
                            title: 'مقارنة الموديلات: FT3 vs FT5',
                            content: `
- **JR-FT3 Pro (التصميم الدائري):** لمحبي الكلاسيكية. شاشة AMOLED واضحة تحت الشمس، وتصميم معدني قوي.
- **JR-FT5 (التصميم المربع):** شاشة كبيرة جداً (1.83 بوصة) وتصميم يشبه ساعة ابل. مثالية لقراءة الرسائل والتحكم في الموسيقى.
`
                        },
                        {
                            title: 'هل قياسات الصحة دقيقة؟',
                            content: `
ساعات جوي روم توفر قياسات تقريبية ممتازة للرياضة (خطوات، حرق سعرات، نبض) وتساعدك في متابعة نشاطك اليومي، لكنها ليست بديلاً عن الأجهزة الطبية المتخصصة لمرضى القلب والضغط.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'هل يمكنني تغيير خلفية الساعة بصورتي؟؟',
                            answer: 'نعم، عبر تطبيق الساعة (MoFit أو غيره حسب الموديل) يمكنك اختيار صورة من الجاليري ووضعها كخلفية (Watch Face).'
                        },
                        {
                            question: 'هل الساعة متوافقة مع الايفون؟',
                            answer: 'نعم، تعمل بكفاءة تامة مع الايفون (iOS) والاندرويد. تطبيق الساعة متاح على App Store و Play Store.'
                        }
                    ],
                    products: [
                        { name: 'Joyroom FT3 Pro (Calling)', price: 1850, badge: 'الأكثر مبيعاً' },
                        { name: 'Joyroom FT5 Smart Watch', price: 1950, badge: 'شاشة كبيرة' },
                        { name: 'Joyroom FC2 Classic', price: 1600, badge: 'كلاسيك' },
                    ]
                },
                en: {
                    title: 'Joyroom Smart Watches (Calling Series)',
                    subtitle: 'Style, Intelligence, and Battery Life',
                    description: `
      Discover **Joyroom Smart Watches** in Egypt, the ultimate budget-friendly alternative to premium smartwatches.
      
      **Why Joyroom Watches stand out:**
      - **Bluetooth Calling:** Make and answer calls directly from your wrist with built-in HD mic and speaker (Available on FT3 Pro, FT5).
      - **Full Arabic Support:** Read notifications, messages, and contacts in perfect Arabic.
      - **Long Battery Life:** Say goodbye to daily charging. Enjoy 5-10 days of battery life on a single charge.
      - **IP68 Water Resistance:** Splash-proof design safe for hand washing and workouts.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'Global Version' },
                        { type: 'warranty', text: '1 Year Warranty' },
                        { type: 'expert_verified', text: 'Full Arabic Support' }
                    ],
                    buyingGuide: [
                        {
                            title: 'Model Comparison: FT3 vs FT5',
                            content: `
- **JR-FT3 Pro (Round):** Classic aesthetic with tough metal bezel. better for rugged use.
- **JR-FT5 (Square):** Huge 1.83" display, Apple Watch style. Better for reading texts and controlling media.
`
                        },
                        {
                            title: 'Are health metrics accurate?',
                            content: `
Joyroom watches provide excellent estimation for fitness tracking (Steps, Calories, Heart Rate) perfect for daily motivation. Note: They are not medical-grade devices for patients.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'Can I set my photo as a wallpaper?',
                            answer: 'Yes! Through the companion app, you can upload any photo from your gallery to set as a custom Watch Face.'
                        },
                        {
                            question: 'Is it compatible with iPhone?',
                            answer: 'Absolutely. It syncs perfectly with both iPhones (iOS) and Android phones via the official app.'
                        }
                    ],
                    products: [
                        { name: 'Joyroom FT3 Pro (Calling)', price: 1850, badge: 'Best Seller' },
                        { name: 'Joyroom FT5 Smart Watch', price: 1950, badge: 'Big Screen' },
                        { name: 'Joyroom FC2 Classic', price: 1600, badge: 'Classic' },
                    ]
                }
            }
        },
    }
};
