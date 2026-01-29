
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
            products: Array<{ name: string; price: number; badge?: string }>;
        };
        en: {
            title: string;
            subtitle: string;
            description: string;
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
                    title: 'باور بانك انكر | Anker Power Bank Egypt - أفضل أسعار 2024',
                    description: 'تسوق باور بانك انكر الأصلي في مصر. باور بانك انكر 20000 و 10000 مللي أمبير بأفضل الأسعار. شحن سريع وضمان أصلي.',
                    keywords: 'باور بانك انكر, باور بانك انكر 20000, باور بانك انكر 10000, سعر باور بانك انكر, انكر باور بانك, باور بانك, افضل باور بانك',
                }
            },
            seoContent: {
                ar: {
                    title: 'باور بانك انكر الأصلي في مصر',
                    subtitle: 'Anker Power Bank - الأعلى جودة والأكثر مبيعاً',
                    description: `
      اكتشف تشكيلة **باور بانك انكر** الأصلية في مصر. نوفر لك أفضل موديلات Anker Power Bank بأسعار تنافسية وضمان رسمي.
      
      **لماذا تختار باور بانك انكر؟**
      - تقنية PowerIQ للشحن الذكي والسريع
      - سعات متعددة: 10000mAh و 20000mAh
      - جودة عالمية وضمان أصلي
      - الأكثر مبيعاً في مصر والعالم
    `,
                    products: [
                        { name: 'Anker PowerCore 20000mAh', price: 1200, badge: 'الأكثر طلباً' },
                        { name: 'Anker PowerCore 10000mAh', price: 750, badge: 'خفيف الوزن' },
                        { name: 'Anker Prime Power Bank', price: 2500, badge: 'الفئة العليا' },
                        { name: 'Anker 737 Power Bank', price: 3200, badge: 'Premium' },
                    ]
                },
                en: {
                    title: 'Anker Power Bank Original in Egypt',
                    subtitle: 'Best Quality & Best Selling',
                    description: `
      Discover the original **Anker Power Bank** collection in Egypt. We offer the best Anker PowerCore models at competitive prices with official warranty.
      
      **Why Choose Anker Power Bank?**
      - PowerIQ technology for smart, fast charging
      - Multiple capacities: 10000mAh & 20000mAh
      - World-class quality with official warranty
      - Best-selling power bank in Egypt
    `,
                    products: [
                        { name: 'Anker PowerCore 20000mAh', price: 1200, badge: 'Best Seller' },
                        { name: 'Anker PowerCore 10000mAh', price: 750, badge: 'Lightweight' },
                        { name: 'Anker Prime Power Bank', price: 2500, badge: 'Premium' },
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
      
      **الأكثر مبيعاً:**
      - **شاحن انكر 20 وات** - الأمثل لـ iPhone 15/14/13
      - **شاحن انكر 25 واط** - للسامسونج Galaxy
      - **راس شاحن انكر** تايب سي للشحن السريع
    `,
                    products: [
                        { name: 'Anker Nano 20W', price: 350, badge: 'الأكثر مبيعاً iPhone' },
                        { name: 'Anker 25W Samsung', price: 400, badge: 'Galaxy Series' },
                        { name: 'Anker 65W GaN', price: 850, badge: 'Multi-Device' },
                        { name: 'Anker 45W Type-C', price: 550, badge: 'شحن سريع جداً' },
                    ]
                },
                en: {
                    title: 'Anker Charger Original',
                    subtitle: 'Fast Charging with World-Class Quality',
                    description: `
      Discover the original **Anker Charger** in Egypt - the #1 brand in fast charging!
      
      **Best Sellers:**
      - **Anker 20W Charger** - Perfect for iPhone 15/14/13
      - **Anker 25W Charger** - For Samsung Galaxy
      - **Anker Type-C** fast charging head
    `,
                    products: [
                        { name: 'Anker Nano 20W', price: 350, badge: 'Best for iPhone' },
                        { name: 'Anker 25W Samsung', price: 400, badge: 'Galaxy Series' },
                        { name: 'Anker 65W GaN', price: 850, badge: 'Multi-Device' },
                        { name: 'Anker 45W Type-C', price: 550, badge: 'Ultra Fast' },
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
      اكتشف **سماعات انكر Soundcore** الأصلية في مصر - العلامة التجارية الأولى عالمياً في الصوتيات.
      
      **لماذا Anker Soundcore؟**
      - تقنية BassUp للصوت العميق
      - إلغاء الضوضاء النشط (ANC)
      - بطارية طويلة الأمد
      - مقاومة للماء IPX5
      - ضمان انكر الرسمي
    `,
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
      Discover the original **Anker Soundcore** earbuds in Egypt - the world's #1 audio brand.
      
      **Why Anker Soundcore?**
      - BassUp technology for deep sound
      - Active Noise Cancellation (ANC)
      - Long-lasting battery
      - IPX5 water resistance
      - Official Anker warranty
    `,
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
                    title: 'كابل انكر الأصلي',
                    subtitle: 'Anker Cable - المتانة التي لا تُقارن',
                    description: `
      اكتشف **كابل انكر** الأصلي في مصر - الأقوى والأكثر متانة!
      
      **لماذا كابل انكر؟**
      - يتحمل أكثر من 12,000 ثني
      - شحن سريع يصل إلى 100 واط
      - ألياف الكيفلار للمتانة القصوى
      - ضمان مدى الحياة
    `,
                    products: [
                        { name: 'Anker PowerLine Lightning', price: 200, badge: 'iPhone' },
                        { name: 'Anker USB-C to USB-C', price: 180, badge: 'Type-C' },
                        { name: 'Anker USB-C to Lightning', price: 250, badge: 'Fast Charge iPhone' },
                        { name: 'Anker PowerLine 3m', price: 220, badge: 'طويل' },
                    ]
                },
                en: {
                    title: 'Anker Cable Original',
                    subtitle: 'Unmatched Durability',
                    description: `
      Discover the original **Anker Cable** in Egypt - the strongest and most durable!
      
      **Why Anker Cable?**
      - Withstands 12,000+ bends
      - Fast charging up to 100W
      - Kevlar fiber for ultimate durability
      - Lifetime warranty
    `,
                    products: [
                        { name: 'Anker PowerLine Lightning', price: 200, badge: 'iPhone' },
                        { name: 'Anker USB-C to USB-C', price: 180, badge: 'Type-C' },
                        { name: 'Anker USB-C to Lightning', price: 250, badge: 'Fast Charge iPhone' },
                        { name: 'Anker PowerLine 3m', price: 220, badge: 'Extra Long' },
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
                    title: 'شاحن سيارة انكر',
                    subtitle: 'Anker Car Charger - شحن سريع على الطريق',
                    description: `
      اكتشف **شاحن سيارة انكر** الأصلي في مصر - الشحن السريع أثناء القيادة!
      
      **مميزات شاحن سيارة انكر:**
      - شحن سريع يصل إلى 48 واط
      - منفذين للشحن المتزامن
      - تقنية PowerIQ للشحن الذكي
    `,
                    products: [
                        { name: 'Anker Car Charger 48W', price: 450, badge: 'الأكثر مبيعاً' },
                        { name: 'Anker Car Charger Mini', price: 300, badge: 'صغير' },
                        { name: 'Anker PowerDrive 2', price: 350, badge: 'منفذين' },
                    ]
                },
                en: {
                    title: 'Anker Car Charger',
                    subtitle: 'Fast Charging on the Road',
                    description: `
      Discover the original **Anker Car Charger** in Egypt - fast charging while driving!
      
      **Anker Car Charger Features:**
      - Fast charging up to 48W
      - Dual ports for simultaneous charging
      - PowerIQ smart charging technology
    `,
                    products: [
                        { name: 'Anker Car Charger 48W', price: 450, badge: 'Best Seller' },
                        { name: 'Anker Car Charger Mini', price: 300, badge: 'Compact' },
                        { name: 'Anker PowerDrive 2', price: 350, badge: 'Dual Port' },
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
      اكتشف **سماعات جوي روم T03s** الأصلية - المنتج النجم والأكثر مبيعاً في مصر!
      
      **لماذا T03s هي الأفضل؟**
      - صوت نقي وباس قوي
      - بلوتوث 5.0 للاتصال المستقر
      - بطارية تدوم حتى 24 ساعة
      - تصميم مريح وخفيف الوزن
      - مقاومة للماء والعرق
      
      متوفر أيضاً: **JR-T03s Pro** الموديل البرو!
    `,
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
      Discover the original **Joyroom T03s** earbuds - the hero product and best seller in Egypt!
      
      **Why T03s is the Best?**
      - Crystal clear sound with powerful bass
      - Bluetooth 5.0 for stable connection
      - Battery lasts up to 24 hours
      - Comfortable and lightweight design
      - Water and sweat resistant
      
      Also available: **JR-T03s Pro** with extra features!
    `,
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
                    title: 'باور بانك جوي روم | Joyroom Power Bank Egypt - أسعار 2024',
                    description: 'تسوق باور بانك جوي روم الأصلي في مصر. باور بانك جوي روم 20000 و 10000 مللي أمبير بأفضل الأسعار. باور بانك جيروم.',
                    keywords: 'باور بانك جوي روم 10000, باور بانك جوي روم 20000, باور بانك جيروم, سعر باور بانك joyroom, joyroom power bank',
                }
            },
            seoContent: {
                ar: {
                    title: 'باور بانك جوي روم الأصلي',
                    subtitle: 'Joyroom Power Bank - جودة عالية بسعر مناسب',
                    description: `
      اكتشف تشكيلة **باور بانك جوي روم** الأصلية في مصر. أفضل بديل اقتصادي بجودة ممتازة.
      
      **مميزات باور بانك جيروم:**
      - شحن سريع يصل إلى 22.5 واط
      - تصميم أنيق وخفيف الوزن
      - سعات متعددة: 10000mAh و 20000mAh
      - سعر مناسب مع جودة عالية
    `,
                    products: [
                        { name: 'Joyroom Power Bank 20000mAh', price: 650, badge: 'الأكثر مبيعاً' },
                        { name: 'Joyroom Power Bank 10000mAh', price: 400, badge: 'خفيف' },
                        { name: 'Joyroom Fast Charge 20000', price: 750, badge: 'شحن سريع' },
                    ]
                },
                en: {
                    title: 'Joyroom Power Bank Original',
                    subtitle: 'High Quality at Affordable Prices',
                    description: `
      Discover the original **Joyroom Power Bank** collection in Egypt. The best budget-friendly option with excellent quality.
      
      **Joyroom Power Bank Features:**
      - Fast charging up to 22.5W
      - Sleek and lightweight design
      - Multiple capacities: 10000mAh & 20000mAh
      - Great value for money
    `,
                    products: [
                        { name: 'Joyroom Power Bank 20000mAh', price: 650, badge: 'Best Seller' },
                        { name: 'Joyroom Power Bank 10000mAh', price: 400, badge: 'Compact' },
                        { name: 'Joyroom Fast Charge 20000', price: 750, badge: 'Fast Charge' },
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
                    title: 'شاحن جوي روم الأصلي',
                    subtitle: 'Joyroom Charger - شحن سريع بسعر مناسب',
                    description: `
      اكتشف **شاحن جوي روم** الأصلي في مصر - الخيار الاقتصادي الممتاز!
      
      **مميزات شاحن جيروم:**
      - شحن سريع يصل إلى 20 واط
      - متوافق مع iPhone و Samsung
      - حماية ذكية من الحرارة الزائدة
    `,
                    products: [
                        { name: 'Joyroom 20W Charger', price: 180, badge: 'اقتصادي' },
                        { name: 'Joyroom 33W Fast', price: 250, badge: 'شحن سريع' },
                        { name: 'Joyroom Dual Port', price: 220, badge: 'منفذين' },
                    ]
                },
                en: {
                    title: 'Joyroom Charger Original',
                    subtitle: 'Fast Charging at Affordable Prices',
                    description: `
      Discover the original **Joyroom Charger** in Egypt - the excellent budget option!
      
      **Joyroom Charger Features:**
      - Fast charging up to 20W
      - Compatible with iPhone & Samsung
      - Smart overheat protection
    `,
                    products: [
                        { name: 'Joyroom 20W Charger', price: 180, badge: 'Budget' },
                        { name: 'Joyroom 33W Fast', price: 250, badge: 'Fast Charge' },
                        { name: 'Joyroom Dual Port', price: 220, badge: 'Dual Port' },
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
                    title: 'كابل جوي روم الأصلي',
                    subtitle: 'Joyroom Cable - جودة بسعر مناسب',
                    description: `
      اكتشف **كابل جوي روم** الأصلي في مصر - الخيار الاقتصادي الممتاز!
      
      **مميزات كابل جيروم:**
      - شحن سريع يصل إلى 60 واط
      - تصميم مضفر مقاوم للتلف
      - سعر اقتصادي
    `,
                    products: [
                        { name: 'Joyroom Lightning Cable', price: 80, badge: 'iPhone' },
                        { name: 'Joyroom Type-C Cable', price: 70, badge: 'USB-C' },
                        { name: 'Joyroom 3-in-1 Cable', price: 100, badge: 'Multi' },
                    ]
                },
                en: {
                    title: 'Joyroom Cable Original',
                    subtitle: 'Quality at Affordable Price',
                    description: `
      Discover the original **Joyroom Cable** in Egypt - the excellent budget option!
      
      **Joyroom Cable Features:**
      - Fast charging up to 60W
      - Braided design for durability
      - Budget-friendly
    `,
                    products: [
                        { name: 'Joyroom Lightning Cable', price: 80, badge: 'iPhone' },
                        { name: 'Joyroom Type-C Cable', price: 70, badge: 'USB-C' },
                        { name: 'Joyroom 3-in-1 Cable', price: 100, badge: 'Multi' },
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
                    title: 'حوامل جوال للسيارة جوي روم',
                    subtitle: 'Joyroom Car Holders - تثبيت آمن أثناء القيادة',
                    description: `
اكتشف **حوامل جوال جوي روم للسيارة** في مصر - الحل الأمثل لتثبيت هاتفك بأمان أثناء القيادة.

**لماذا تختار Joyroom Car Holders؟**
- **مغناطيس N52 فائق القوة** - يثبت أثقل الهواتف بأمان
- **دوران 360 درجة** - اضبط الزاوية المثالية للرؤية
- **تركيب سهل** - بيد واحدة وبدون أدوات
- **توافق عالمي** - يناسب جميع الهواتف وأجهزة MagSafe
- **تصميم أنيق** - لا يعيق تدفق الهواء من التكييف
- **جودة متينة** - مصنوع من مواد عالية الجودة

**أنواع الحوامل:**
- **حامل فتحة التكييف** - الأكثر شعبية وسهولة في التركيب
- **حامل الدتابورد** - ثبات عالي للطرق الوعرة
- **حامل مغناطيسي MagSafe** - للايفون 12 وما فوق

**نصائح الاستخدام:**
- استخدم القطعة المعدنية المرفقة للهواتف غير MagSafe
- تأكد من نظافة السطح قبل التثبيت
    `,
                    products: [
                        { name: 'JR-ZS290 Magnetic Mount', price: 350, badge: 'الأكثر مبيعاً' },
                    ]
                },
                en: {
                    title: 'Joyroom Car Phone Holders',
                    subtitle: 'Secure Mounting While Driving',
                    description: `
Discover **Joyroom Car Phone Holders** in Egypt - the perfect solution for safely mounting your phone while driving.

**Why Choose Joyroom Car Holders?**
- **N52 Super Strong Magnets** - Securely holds even the heaviest phones
- **360° Rotation** - Adjust to the perfect viewing angle
- **Easy Installation** - One-hand operation, no tools needed
- **Universal Compatibility** - Fits all phones and MagSafe devices
- **Sleek Design** - Doesn't block air vent airflow
- **Durable Quality** - Made from premium materials

**Types of Holders:**
- **Air Vent Mount** - Most popular and easy to install
- **Dashboard Mount** - High stability for rough roads
- **MagSafe Magnetic Mount** - For iPhone 12 and above

**Usage Tips:**
- Use the included metal plate for non-MagSafe phones
- Ensure the surface is clean before mounting
    `,
                    products: [
                        { name: 'JR-ZS290 Magnetic Mount', price: 350, badge: 'Best Seller' },
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
                    title: 'ساعات جوي روم الذكية',
                    subtitle: 'Joyroom Smart Watch - الأناقة تلتقي بالذكاء',
                    description: `
      اكتشف **ساعات جوي روم الذكية** في مصر!
      
      **المميزات:**
      - تتبع اللياقة البدنية والرياضة
      - مراقبة صحة القلب والنوم
      - إجراء واستقبال المكالمات
      - تصميم أنيق وخفيف
    `,
                    products: [
                        { name: 'Joyroom Smart Watch', price: 800, badge: 'جديد' },
                        { name: 'Joyroom Fitness Band', price: 400, badge: 'اقتصادي' },
                    ]
                },
                en: {
                    title: 'Joyroom Smart Watches',
                    subtitle: 'Style Meets Intelligence',
                    description: `
      Discover **Joyroom Smart Watches** in Egypt!
      
      **Features:**
      - Fitness and sports tracking
      - Heart and sleep monitoring
      - Make and receive calls
      - Sleek and lightweight design
    `,
                    products: [
                        { name: 'Joyroom Smart Watch', price: 800, badge: 'New' },
                        { name: 'Joyroom Fitness Band', price: 400, badge: 'Budget' },
                    ]
                }
            }
        },
    }
};
