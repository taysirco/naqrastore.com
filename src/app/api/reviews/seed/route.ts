/**
 * Seed Reviews API - توليد تقييمات واقعية للمنتجات
 * يولد 3-17 تقييم لكل منتج بأسماء مصرية وتجارب حقيقية
 */

import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

// ============================================
// EGYPTIAN NAMES DATABASE
// ============================================
const MALE_NAMES = [
    'أحمد', 'محمد', 'محمود', 'علي', 'حسن', 'إبراهيم', 'خالد', 'عمرو',
    'يوسف', 'عبدالله', 'كريم', 'تامر', 'مصطفى', 'عمر', 'ياسر', 'سامي',
    'هاني', 'وليد', 'أشرف', 'طارق', 'رامي', 'شريف', 'أيمن', 'حازم',
    'باسم', 'هشام', 'أسامة', 'عادل', 'ماجد', 'فادي', 'سعيد', 'رضا'
];

const FEMALE_NAMES = [
    'سارة', 'نورا', 'مريم', 'فاطمة', 'آية', 'ياسمين', 'هالة', 'دينا',
    'نهى', 'رانيا', 'منى', 'هبة', 'سلمى', 'لمياء', 'شيماء', 'إيمان',
    'أسماء', 'نرمين', 'داليا', 'ريهام', 'مي', 'ندى', 'روان', 'جيهان'
];

const LAST_NAMES = [
    'م.', 'ع.', 'ح.', 'س.', 'ك.', 'ف.', 'أ.', 'ب.', 'ج.', 'ش.', 'ر.', 'ن.'
];

const GOVERNORATES = [
    'القاهرة', 'الجيزة', 'الإسكندرية', 'الشرقية', 'الدقهلية', 'الغربية',
    'المنوفية', 'القليوبية', 'البحيرة', 'كفر الشيخ', 'الفيوم', 'بني سويف',
    'أسيوط', 'سوهاج', 'قنا', 'الأقصر', 'أسوان', 'المنيا', 'بورسعيد', 'السويس'
];

// ============================================
// PRODUCT-SPECIFIC REVIEW TEMPLATES
// ============================================
interface ReviewTemplate {
    titles: string[];
    reviews: string[];
    pros: string[][];
    cons: string[][];
}

const POWER_BANK_REVIEWS: ReviewTemplate = {
    titles: [
        'شحن سريع ممتاز',
        'أفضل باور بانك استخدمته',
        'قيمة ممتازة مقابل السعر',
        'منتج موثوق وجودة عالية',
        'يستحق كل جنيه',
        'حجم مناسب وشحن قوي',
        'مثالي للسفر',
        'الأداء فاق التوقعات'
    ],
    reviews: [
        'بشحن الموبايل بتاعي من 0% لـ 100% في أقل من ساعة ونص، والحجم مناسب جداً للجيب. استخدمته في السفر واشتغل معايا بشكل ممتاز.',
        'جودة التصنيع ممتازة ومش بيسخن خالص. الشحن السريع شغال تمام والبطارية بتفضل طويل.',
        'أخدته للسفر واشتغل معايا طول الرحلة. شحنت منه 3 موبايلات وتابلت ولسه فيه شحن.',
        'الباور بانك ده غير حياتي! مبقتش أقلق من الشحن خالص. جودة Anker معروفة.',
        'سعره يستاهل.. جودة عالية وشحن سريع. استخدمته أكتر من 6 شهور ولسه زي أول يوم.',
        'شحن PD شغال تمام مع الآيفون. بيعدي معايا اليوم كله براحة.',
        'استخدمته في الشغل يومياً ومش محتاج أشحنه غير مرة في الأسبوع.',
        'أنا من محبي التخييم والباور بانك ده بيشتغل معايا في كل رحلاتي.',
        'اشتريته للسفر وفعلاً منتج ممتاز. الضمان من الوكيل خلّاني مطمن.',
        'المنتج خفيف ومضغوط وبيشحن بسرعة. أنصح بيه جداً.'
    ],
    pros: [
        ['شحن سريع PD', 'حجم مناسب', 'جودة بناء ممتازة'],
        ['بطارية طويلة', 'خفيف الوزن', 'توافق مع كل الأجهزة'],
        ['شحن متعدد', 'مش بيسخن', 'سعر مناسب'],
        ['ضمان الوكيل', 'شكل أنيق', 'شاشة لعرض النسبة'],
        ['شحن سريع للآيفون', 'جودة Anker', 'منافذ متعددة'],
        ['سهل الحمل', 'بيفضل طويل', 'شحن آمن']
    ],
    cons: [
        ['السعر أعلى من البدائل الصيني'],
        ['الكابل مش مرفق'],
        ['ممكن يكون ثقيل شوية للبعض'],
        [],
        ['الحجم كبير شوية'],
        []
    ]
};

const CHARGER_REVIEWS: ReviewTemplate = {
    titles: [
        'شاحن سريع فعلاً',
        'أفضل شاحن استخدمته',
        'شحن قوي ومستقر',
        'جودة ممتازة',
        'يستحق الفلوس',
        'شحن سريع للآيفون'
    ],
    reviews: [
        'الشاحن ده غير طريقة شحن الموبايل بتاعي. شحن سريع جداً ومش بيسخن.',
        'أنا عندي iPhone 15 والشاحن ده بيشحنه من 0 لـ 50% في نص ساعة بس!',
        'جربت شواحن كتير بس ده أفضلهم. الجودة عالية والسعر معقول.',
        'استبدلت الشاحن الأصلي بتاع الموبايل بده وفرق الشحن واضح جداً.',
        'صغير وخفيف ومناسب للسفر. الشحن السريع شغال تمام.',
        'الشاحن ده آمن للبطارية وبيوفر حماية. أنصح بيه لكل أصحابي.',
        'اشتريته للمكتب والبيت سوا. منتج ممتاز من Anker.',
        'شحن GaN موفر للكهرباء وبيشحن بسرعة. راضي جداً.'
    ],
    pros: [
        ['شحن سريع', 'حجم صغير', 'مش بيسخن'],
        ['توافق عالي', 'حماية للبطارية', 'تصميم أنيق'],
        ['شحن GaN', 'خفيف الوزن', 'جودة Anker'],
        ['سعر مناسب', 'كفاءة عالية', 'متين']
    ],
    cons: [
        ['الكابل منفصل'],
        [],
        ['السعر أعلى من العادي'],
        []
    ]
};

const CABLE_REVIEWS: ReviewTemplate = {
    titles: [
        'كابل ممتاز',
        'جودة عالية جداً',
        'يستحق الفلوس',
        'أفضل كابل اشتريته',
        'متين ومرن'
    ],
    reviews: [
        'الكابل ده متين جداً ومش زي الكابلات الصيني لي بتبوز بعد شهر.',
        'اشتريته من 8 شهور ولسه زي الجديد. الشحن السريع شغال تمام.',
        'الطول مناسب جداً والجودة ممتازة. أنصح بيه.',
        'جربت كابلات كتير رخيصة وكلها باظت. ده أول كابل يستحمل معايا.',
        'شحن سريع ونقل بيانات بسرعة. منتج ممتاز.',
        'الضفيرة النايلون بتاعته قوية وشكلها حلو.',
        'متوافق مع كل أجهزتي ومرن ومش بيتكسر.'
    ],
    pros: [
        ['متين', 'شحن سريع', 'ضمان'],
        ['مرن', 'طول مناسب', 'نقل بيانات سريع'],
        ['جودة عالية', 'تصميم أنيق', 'توافق عالي']
    ],
    cons: [
        ['السعر أعلى من العادي'],
        [],
        ['الطول ممكن يكون قصير للبعض']
    ]
};

const EARBUDS_REVIEWS: ReviewTemplate = {
    titles: [
        'صوت ممتاز',
        'عزل رائع',
        'بطارية طويلة',
        'أفضل سماعات اشتريتها',
        'جودة عالية بسعر معقول'
    ],
    reviews: [
        'الصوت نقي جداً والباس قوي. العزل بيمنع أي صوت من بره.',
        'بستخدمها في الجيم والشغل ومريحة جداً للأذن.',
        'البطارية بتعدي معايا اليوم كله براحة. جودة Anker واضحة.',
        'جربت AirPods ورجعت لده. الصوت أفضل والسعر نص.',
        'العزل ممتاز ومايكروفون المكالمات واضح.',
        'التصميم أنيق والجراب بيشحنها بسرعة.',
        'أنصح بيها لأي حد بيدور على سماعات كويسة بسعر معقول.'
    ],
    pros: [
        ['صوت نقي', 'عزل ممتاز', 'بطارية طويلة'],
        ['مريحة للأذن', 'مقاومة للمياه', 'اتصال مستقر'],
        ['سعر مناسب', 'جودة بناء', 'مايكروفون واضح']
    ],
    cons: [
        ['الجراب كبير شوية'],
        [],
        ['مفيش ANC نشط']
    ]
};

const GENERIC_REVIEWS: ReviewTemplate = {
    titles: [
        'منتج ممتاز',
        'راضي جداً',
        'يستحق الشراء',
        'جودة عالية',
        'أنصح بيه'
    ],
    reviews: [
        'المنتج ده فاق توقعاتي. جودة عالية وسعر مناسب.',
        'اشتريته من كايرو فولت والتوصيل كان سريع. المنتج ممتاز.',
        'استخدمته من شهور ومفيش أي مشاكل. أنصح بيه.',
        'جودة التصنيع واضحة والضمان مريحني.',
        'سعره يستاهل وبيشتغل تمام زي ما كنت متوقع.',
        'التغليف كان ممتاز والمنتج أصلي 100%.',
        'خدمة العملاء ممتازة والمنتج أفضل من اللي توقعته.'
    ],
    pros: [
        ['جودة عالية', 'سعر مناسب', 'ضمان'],
        ['توصيل سريع', 'تغليف ممتاز', 'منتج أصلي'],
        ['سهل الاستخدام', 'متين', 'قيمة ممتازة']
    ],
    cons: [
        [],
        ['التغليف ممكن يتحسن'],
        []
    ]
};

// ============================================
// HELPER FUNCTIONS
// ============================================
function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomName(): { full: string; initials: string } {
    const isFemale = Math.random() > 0.6;
    const firstName = randomPick(isFemale ? FEMALE_NAMES : MALE_NAMES);
    const lastName = randomPick(LAST_NAMES);
    return {
        full: `${firstName} ${lastName}`,
        initials: `${firstName} ${lastName}`
    };
}

function getRandomRating(): 1 | 2 | 3 | 4 | 5 {
    // Weighted towards positive (realistic distribution)
    const rand = Math.random();
    if (rand < 0.02) return 2;
    if (rand < 0.07) return 3;
    if (rand < 0.30) return 4;
    return 5;
}

function getRandomDate(): Date {
    // Random date within last 6 months
    const now = new Date();
    const monthsAgo = randomInt(1, 6);
    const daysAgo = randomInt(1, 30);
    now.setMonth(now.getMonth() - monthsAgo);
    now.setDate(now.getDate() - daysAgo);
    return now;
}

function getTemplate(productName: string): ReviewTemplate {
    const lower = productName.toLowerCase();
    if (lower.includes('power') || lower.includes('bank') || lower.includes('باور')) {
        return POWER_BANK_REVIEWS;
    }
    if (lower.includes('charger') || lower.includes('شاحن')) {
        return CHARGER_REVIEWS;
    }
    if (lower.includes('cable') || lower.includes('كابل')) {
        return CABLE_REVIEWS;
    }
    if (lower.includes('earbuds') || lower.includes('سماعة') || lower.includes('audio') || lower.includes('soundcore')) {
        return EARBUDS_REVIEWS;
    }
    return GENERIC_REVIEWS;
}

// ============================================
// PRODUCTS LIST
// ============================================
const PRODUCTS = [
    { slug: 'anker-737-powerbank', name: 'Anker 737 PowerCore 140W' },
    { slug: 'anker-622-maggo', name: 'Anker 622 MagGo' },
    { slug: 'anker-521-powerhouse', name: 'Anker 521 PowerHouse' },
    { slug: 'anker-powercore-10000', name: 'Anker PowerCore 10000' },
    { slug: 'anker-powercore-20000', name: 'Anker PowerCore 20000' },
    { slug: 'anker-powercore-26800', name: 'Anker PowerCore 26800' },
    { slug: 'anker-powerport-20w', name: 'Anker PowerPort 20W' },
    { slug: 'anker-powerport-25w', name: 'Anker PowerPort 25W' },
    { slug: 'anker-nano-45w', name: 'Anker Nano 45W' },
    { slug: 'anker-powerline-usb-c-lightning', name: 'Anker PowerLine USB-C Lightning' },
    { slug: 'anker-powerline-usb-c-usb-c', name: 'Anker PowerLine USB-C to USB-C' },
    { slug: 'anker-car-charger-dual-usb', name: 'Anker Car Charger Dual USB' },
    { slug: 'anker-soundcore-motion-plus', name: 'Anker Soundcore Motion+' },
    { slug: 'anker-soundcore-flare-2', name: 'Anker Soundcore Flare 2' },
    { slug: 'anker-soundcore-life-p2i', name: 'Anker Soundcore Life P2i' },
    { slug: 'joyroom-power-bank-10000', name: 'Joyroom Power Bank 10000' },
    { slug: 'joyroom-power-bank-20000', name: 'Joyroom Power Bank 20000' },
    { slug: 'joyroom-t03s-pro-earbuds', name: 'Joyroom T03S Pro Earbuds' },
    { slug: 'joyroom-jr-t03-wireless-earbuds', name: 'Joyroom JR-T03 Wireless Earbuds' },
    { slug: 'joyroom-20w-usb-c-charger', name: 'Joyroom 20W USB-C Charger' },
    { slug: 'joyroom-usb-c-lightning-cable', name: 'Joyroom USB-C Lightning Cable' },
    { slug: 'joyroom-ft3-smartwatch', name: 'Joyroom FT3 Smartwatch' },
    { slug: 'joyroom-car-mount-zs290', name: 'Joyroom Car Mount ZS290' },
    { slug: 'joyroom-25w-fast-charger', name: 'Joyroom 25W Fast Charger' },
    { slug: 'joyroom-30w-fast-charger', name: 'Joyroom 30W Fast Charger' },
    { slug: 'joyroom-magnetic-power-bank-10000', name: 'Joyroom Magnetic Power Bank' },
    { slug: 'joyroom-60w-car-charger', name: 'Joyroom 60W Car Charger' },
    { slug: 'joyroom-3-in-1-wireless-charging-station', name: 'Joyroom 3-in-1 Wireless Charger' },
    { slug: 'joyroom-3-in-1-data-cable', name: 'Joyroom 3-in-1 Data Cable' },
    { slug: 'joyroom-car-phone-mount', name: 'Joyroom Car Phone Mount' }
];

// ============================================
// MAIN API
// ============================================
export async function POST(req: NextRequest) {
    try {
        const db = await getFirestore();
        let totalReviews = 0;
        const results: any[] = [];

        for (const product of PRODUCTS) {
            const reviewCount = randomInt(3, 17);
            const template = getTemplate(product.name);

            for (let i = 0; i < reviewCount; i++) {
                const name = getRandomName();
                const rating = getRandomRating();
                const reviewDate = getRandomDate();
                const purchaseDate = new Date(reviewDate);
                purchaseDate.setDate(purchaseDate.getDate() - randomInt(3, 14));

                const review = {
                    productSlug: product.slug,
                    productName: product.name,
                    orderId: `SEED-${Date.now()}-${i}`,
                    orderDocId: `SEED-${Date.now()}-${i}`,
                    customerName: name.full,
                    customerInitials: name.initials,
                    rating,
                    title: randomPick(template.titles),
                    reviewText: randomPick(template.reviews),
                    purchaseDate,
                    reviewDate,
                    isVerified: true,
                    status: 'approved',
                    governorate: randomPick(GOVERNORATES),
                    helpfulCount: randomInt(0, 15),
                    locale: 'ar',
                    createdAt: FieldValue.serverTimestamp()
                };

                // Add pros/cons randomly
                if (Math.random() > 0.3 && template.pros.length > 0) {
                    (review as any).pros = randomPick(template.pros);
                }
                if (Math.random() > 0.7 && template.cons.length > 0) {
                    const cons = randomPick(template.cons);
                    if (cons.length > 0) {
                        (review as any).cons = cons;
                    }
                }

                await db.collection('reviews').add(review);
                totalReviews++;
            }

            results.push({
                product: product.name,
                reviews: reviewCount
            });
        }

        return NextResponse.json({
            success: true,
            totalReviews,
            products: results.length,
            results
        });

    } catch (error: any) {
        console.error('Seed reviews error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
