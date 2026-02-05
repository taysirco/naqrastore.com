/**
 * Enhanced Review Seeding V2 - تقييمات أكثر تنوعاً وطبيعية
 * يضيف تقييمات متنوعة جداً لتبدو طبيعية 100% لجوجل
 */

import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

// ============================================
// EXPANDED NAMES DATABASE - أسماء أكثر تنوعاً
// ============================================
const MALE_NAMES = [
    'أحمد', 'محمد', 'محمود', 'علي', 'حسن', 'إبراهيم', 'خالد', 'عمرو',
    'يوسف', 'عبدالله', 'كريم', 'تامر', 'مصطفى', 'عمر', 'ياسر', 'سامي',
    'هاني', 'وليد', 'أشرف', 'طارق', 'رامي', 'شريف', 'أيمن', 'حازم',
    'باسم', 'هشام', 'أسامة', 'عادل', 'ماجد', 'فادي', 'سعيد', 'رضا',
    'عصام', 'جمال', 'نبيل', 'زياد', 'فارس', 'مروان', 'عماد', 'حاتم',
    'سيف', 'عز', 'آدم', 'يزن', 'حمزة', 'بلال', 'معاذ', 'أنس'
];

const FEMALE_NAMES = [
    'سارة', 'نورا', 'مريم', 'فاطمة', 'آية', 'ياسمين', 'هالة', 'دينا',
    'نهى', 'رانيا', 'منى', 'هبة', 'سلمى', 'لمياء', 'شيماء', 'إيمان',
    'أسماء', 'نرمين', 'داليا', 'ريهام', 'مي', 'ندى', 'روان', 'جيهان',
    'مروة', 'إسراء', 'علا', 'غادة', 'سمر', 'أمل', 'هدى', 'نادية',
    'رنا', 'لينا', 'تسنيم', 'جنى', 'ليلى', 'زينب', 'نور', 'ملك'
];

const LAST_INITIALS = ['أ.', 'ب.', 'ج.', 'ح.', 'خ.', 'س.', 'ش.', 'ص.', 'ع.', 'ف.', 'ك.', 'م.', 'ن.', 'هـ.', 'ي.'];

const GOVERNORATES = [
    'القاهرة', 'الجيزة', 'الإسكندرية', 'الشرقية', 'الدقهلية', 'الغربية',
    'المنوفية', 'القليوبية', 'البحيرة', 'كفر الشيخ', 'الفيوم', 'بني سويف',
    'أسيوط', 'سوهاج', 'قنا', 'الأقصر', 'أسوان', 'المنيا', 'بورسعيد', 'السويس',
    'الإسماعيلية', 'دمياط', 'مطروح', 'البحر الأحمر', '6 أكتوبر', 'الشروق'
];

// ============================================
// ULTRA REALISTIC REVIEW TEMPLATES
// ============================================

// Power Banks - تقييمات باور بانك متنوعة جداً
const POWER_BANK_REVIEWS_V2 = {
    titles: [
        'شحن سريع ممتاز', 'أفضل باور بانك استخدمته', 'قيمة ممتازة مقابل السعر',
        'منتج موثوق وجودة عالية', 'يستحق كل جنيه', 'حجم مناسب وشحن قوي',
        'مثالي للسفر', 'الأداء فاق التوقعات', 'شحن قوي وسريع',
        'ممتاز للاستخدام اليومي', 'جودة Anker المعروفة', 'راضي تماماً',
        'best power bank', 'شراء موفق', 'أنصح بيه بشدة'
    ],
    reviews: [
        'بشحن الموبايل بتاعي من 0% لـ 100% في أقل من ساعة ونص، والحجم مناسب جداً للجيب. استخدمته في السفر واشتغل معايا بشكل ممتاز.',
        'جودة التصنيع ممتازة ومش بيسخن خالص. الشحن السريع شغال تمام والبطارية بتفضل طويل. من أحسن المنتجات اللي اشتريتها.',
        'أخدته للسفر واشتغل معايا طول الرحلة. شحنت منه 3 موبايلات وتابلت ولسه فيه شحن. حاجة مذهلة!',
        'الباور بانك ده غير حياتي! مبقتش أقلق من الشحن خالص. جودة Anker معروفة ومفيش كلام.',
        'سعره يستاهل.. جودة عالية وشحن سريع. استخدمته أكتر من 6 شهور ولسه زي أول يوم.',
        'شحن PD شغال تمام مع الآيفون بتاعي. بيعدي معايا اليوم كله براحة من غير ما أفكر في الشحن.',
        'استخدمته في الشغل يومياً ومش محتاج أشحنه غير مرة في الأسبوع. توفير وقت وراحة بال.',
        'أنا من محبي التخييم والباور بانك ده بيشتغل معايا في كل رحلة. يتحمل الظروف الصعبة.',
        'اشتريته للسفر وفعلاً منتج ممتاز. الضمان من الوكيل خلّاني مطمن على فلوسي.',
        'المنتج خفيف ومضغوط وبيشحن بسرعة. أنصح بيه جداً لأي حد بيدور على باور بانك محترم.',
        'جربت كذا ماركة قبل كده وده أحسنهم من بعيد. الفرق واضح في الجودة والأداء.',
        'بقالي سنة بستخدمه وزي ما هو. ده اللي بيفرق Anker عن غيرها.',
        'التوصيل كان سريع والمنتج أصلي 100%. شكراً كايرو فولت!',
        'اشتريته لأخويا هدية وعجبه جداً. دلوقتي عايز يشتري واحد تاني.',
        'الشحن السريع ده حاجة تانية خالص. بيملي الموبايل في وقت قياسي!',
        'شكل المنتج أنيق والخامة ممتازة. بيدي إحساس إنك شاري حاجة premium.',
        'مناسب جداً للطلبة زي. بيفضل معايا طول اليوم في الجامعة.',
        'استخدمته في رحلة أسبوع كامل ومخيبنيش. شحنت منه كل أجهزتي.'
    ],
    pros: [
        ['شحن سريع PD', 'حجم مناسب', 'جودة بناء ممتازة'],
        ['بطارية طويلة', 'خفيف الوزن', 'توافق مع كل الأجهزة'],
        ['شحن متعدد', 'مش بيسخن', 'سعر مناسب'],
        ['ضمان الوكيل', 'شكل أنيق', 'شاشة لعرض النسبة'],
        ['شحن سريع للآيفون', 'جودة Anker', 'منافذ متعددة'],
        ['سهل الحمل', 'بيفضل طويل', 'شحن آمن'],
        ['تصميم compact', 'أداء ثابت', 'قيمة عالية'],
        ['شحن ذكي', 'حماية من الحرارة']
    ],
    cons: [
        ['السعر أعلى من البدائل الصيني'],
        ['الكابل مش مرفق'],
        ['ممكن يكون ثقيل شوية للبعض'],
        [],
        ['الحجم كبير شوية'],
        [],
        ['مفيش شحن لاسلكي'],
        []
    ]
};

// Chargers - شواحن
const CHARGER_REVIEWS_V2 = {
    titles: [
        'شاحن سريع فعلاً', 'أفضل شاحن استخدمته', 'شحن قوي ومستقر',
        'جودة ممتازة', 'يستحق الفلوس', 'شحن سريع للآيفون',
        'compact وقوي', 'الشاحن المثالي', 'شحن خرافي',
        'أداء ممتاز', 'سعره يستاهل', 'شاحن محترم جداً'
    ],
    reviews: [
        'الشاحن ده غير طريقة شحن الموبايل بتاعي. شحن سريع جداً ومش بيسخن خالص.',
        'أنا عندي iPhone 15 والشاحن ده بيشحنه من 0 لـ 50% في نص ساعة بس! مذهل.',
        'جربت شواحن كتير بس ده أفضلهم. الجودة عالية والسعر معقول جداً.',
        'استبدلت الشاحن الأصلي بتاع الموبايل بده وفرق الشحن واضح من أول استخدام.',
        'صغير وخفيف ومناسب للسفر. الشحن السريع شغال تمام ومش بياخد مساحة.',
        'الشاحن ده آمن للبطارية وبيوفر حماية. أنصح بيه لكل أصحابي ومعارفي.',
        'اشتريته للمكتب والبيت سوا. منتج ممتاز من Anker زي العادة.',
        'شحن GaN موفر للكهرباء وبيشحن بسرعة. راضي جداً عن الشراء.',
        'بستخدمه لشحن الآيباد والموبايل. القوة كافية للاتنين.',
        'الحجم صغير جداً مقارنة بقوته. تكنولوجيا GaN فعلاً ممتازة.',
        'من يوم ما اشتريته وأنا مرتاح. مفيش قلق من الشحن.',
        'سريع وآمن وبيوقف لما الموبايل يتملي. ذكي!',
        'بديل ممتاز للشاحن الأصلي وأسرع كمان.'
    ],
    pros: [
        ['شحن سريع', 'حجم صغير', 'مش بيسخن'],
        ['توافق عالي', 'حماية للبطارية', 'تصميم أنيق'],
        ['شحن GaN', 'خفيف الوزن', 'جودة Anker'],
        ['سعر مناسب', 'كفاءة عالية', 'متين'],
        ['شحن ذكي', 'compact', 'آمن للاستخدام'],
        ['توفير كهرباء', 'سريع جداً']
    ],
    cons: [
        ['الكابل منفصل'],
        [],
        ['السعر أعلى من العادي شوية'],
        [],
        ['مفيش منافذ متعددة'],
        []
    ]
};

// Cables - كابلات
const CABLE_REVIEWS_V2 = {
    titles: [
        'كابل ممتاز', 'جودة عالية جداً', 'يستحق الفلوس',
        'أفضل كابل اشتريته', 'متين ومرن', 'شحن سريع',
        'كابل محترم', 'جودة Anker', 'بيستحمل'
    ],
    reviews: [
        'الكابل ده متين جداً ومش زي الكابلات الصيني اللي بتبوز بعد شهر.',
        'اشتريته من 8 شهور ولسه زي الجديد. الشحن السريع شغال تمام.',
        'الطول مناسب جداً والجودة ممتازة. أنصح بيه لأي حد.',
        'جربت كابلات كتير رخيصة وكلها باظت. ده أول كابل يستحمل معايا.',
        'شحن سريع ونقل بيانات بسرعة. منتج ممتاز يستحق ثمنه.',
        'الضفيرة النايلون بتاعته قوية وشكلها حلو. مش بتفك.',
        'متوافق مع كل أجهزتي ومرن ومش بيتكسر عند الطرف.',
        'اشتريت 3 منه للبيت والشغل والعربية. راضي جداً.',
        'أخيراً لقيت كابل مش بيبوز! المستوى ده يفرق.',
        'الموصلات معدنية ومتينة. مش بلاستيك رخيص.',
        'بينقل الفايلات بسرعة جداً. ممتاز للشغل.'
    ],
    pros: [
        ['متين', 'شحن سريع', 'ضمان'],
        ['مرن', 'طول مناسب', 'نقل بيانات سريع'],
        ['جودة عالية', 'تصميم أنيق', 'توافق عالي'],
        ['نايلون مجدول', 'موصلات معدنية'],
        ['مش بيتكسر', 'يستحمل السحب']
    ],
    cons: [
        ['السعر أعلى من العادي'],
        [],
        ['الطول ممكن يكون قصير للبعض'],
        []
    ]
};

// Earbuds/Audio - سماعات
const AUDIO_REVIEWS_V2 = {
    titles: [
        'صوت ممتاز', 'عزل رائع', 'بطارية طويلة',
        'أفضل سماعات اشتريتها', 'جودة عالية بسعر معقول',
        'صوت نقي', 'مريحة جداً', 'أداء مذهل',
        'قيمة ممتازة', 'سماعات محترمة'
    ],
    reviews: [
        'الصوت نقي جداً والباس قوي. العزل بيمنع أي صوت من بره. تجربة ممتازة.',
        'بستخدمها في الجيم والشغل ومريحة جداً للأذن حتى لساعات طويلة.',
        'البطارية بتعدي معايا اليوم كله براحة. جودة Soundcore واضحة.',
        'جربت AirPods ورجعت لديه. الصوت أفضل والسعر نص. صفقة ممتازة!',
        'العزل ممتاز ومايكروفون المكالمات واضح. الناس بتسمعني كويس.',
        'التصميم أنيق والجراب بيشحنها بسرعة. كل حاجة شيك.',
        'أنصح بيها لأي حد بيدور على سماعات كويسة بسعر معقول.',
        'الاتصال بالبلوتوث مستقر جداً. مفيش انقطاع.',
        'مقاومة المياه شغالة. استخدمتها في المطر وفي الجيم.',
        'سهلة الاستخدام والتحكم باللمس responsive.',
        'صوت الألعاب والأفلام ممتاز. الباس قوي.',
        'أحسن من سماعات بضعف سعرها. Anker عارفين شغلهم.'
    ],
    pros: [
        ['صوت نقي', 'عزل ممتاز', 'بطارية طويلة'],
        ['مريحة للأذن', 'مقاومة للمياه', 'اتصال مستقر'],
        ['سعر مناسب', 'جودة بناء', 'مايكروفون واضح'],
        ['باس قوي', 'تحكم سهل', 'شحن سريع'],
        ['تصميم أنيق', 'جراب compact']
    ],
    cons: [
        ['الجراب كبير شوية'],
        [],
        ['مفيش ANC نشط'],
        ['مش مناسبة للأذن الصغيرة']
    ]
};

// Smartwatch - ساعات ذكية
const SMARTWATCH_REVIEWS = {
    titles: [
        'ساعة ممتازة', 'شاشة رائعة', 'بطارية قوية',
        'سعر ممتاز', 'تصميم أنيق', 'features كتير',
        'راضي جداً', 'أفضل من توقعاتي'
    ],
    reviews: [
        'الشاشة واضحة جداً حتى في الشمس. البطارية بتقعد أسبوع!',
        'بتتابع النوم والرياضة بدقة. سعرها ممتاز مقارنة بـ Apple Watch.',
        'التصميم شيك وخفيفة على الإيد. مريحة للنوم.',
        'الإشعارات بتوصل في ثانية. مش محتاج أطلع الموبايل.',
        'features كتير بالسعر ده. tracking الخطوات دقيق.',
        'مقاومة المياه شغالة. بغسل إيدي وهي في إيدي.',
        'هدية ممتازة لأي حد. شكلها premium.',
        'سهلة الربط بالموبايل والتطبيق سهل.'
    ],
    pros: [
        ['شاشة واضحة', 'بطارية طويلة', 'تصميم أنيق'],
        ['tracking دقيق', 'مقاومة مياه', 'سعر ممتاز'],
        ['إشعارات سريعة', 'خفيفة', 'features متعددة']
    ],
    cons: [
        ['التطبيق ممكن يتحسن'],
        [],
        ['مفيش GPS مدمج']
    ]
};

// Car accessories - اكسسوارات سيارة
const CAR_REVIEWS = {
    titles: [
        'شحن قوي', 'ثابت جداً', 'منتج ممتاز',
        'يستحق', 'جودة عالية', 'مريح جداً'
    ],
    reviews: [
        'الشاحن ده قوي جداً. بيشحن الموبايل وأنا بستخدم الـ GPS.',
        'الحامل ثابت ومش بيهز حتى في الطرق الوعرة. ممتاز!',
        'سهل التركيب والاستخدام. الموبايل ثابت في مكانه.',
        'بستخدمه كل يوم في المشاوير. راحة كبيرة.',
        'الجودة واضحة من أول لمسة. مش هيبوز بسهولة.',
        'يستحمل الحرارة العالية في الصيف. ممتاز للسيارة.',
        'التثبيت قوي والدوران 360 درجة مفيد جداً.',
        'أخيراً لقيت حامل محترم. جربت كتير وده أفضلهم.'
    ],
    pros: [
        ['ثابت', 'سهل التركيب', 'جودة عالية'],
        ['شحن سريع', 'متين', 'تصميم عملي'],
        ['دوران 360', 'يستحمل الحرارة']
    ],
    cons: [
        ['ممكن يسيب أثر على الزجاج'],
        [],
        ['حجمه كبير شوية']
    ]
};

// Generic reviews for other products
const GENERIC_REVIEWS_V2 = {
    titles: [
        'منتج ممتاز', 'راضي جداً', 'يستحق الشراء',
        'جودة عالية', 'أنصح بيه', 'سعره يستاهل',
        'ممتاز', 'تجربة مميزة', 'شراء موفق'
    ],
    reviews: [
        'المنتج ده فاق توقعاتي. جودة عالية وسعر مناسب.',
        'اشتريته من كايرو فولت والتوصيل كان سريع. المنتج ممتاز.',
        'استخدمته من شهور ومفيش أي مشاكل. أنصح بيه.',
        'جودة التصنيع واضحة والضمان مريحني. فلوس في محلها.',
        'سعره يستاهل وبيشتغل تمام زي ما كنت متوقع.',
        'التغليف كان ممتاز والمنتج أصلي 100%. شكراً!',
        'خدمة العملاء ممتازة والمنتج أفضل من اللي توقعته.',
        'من أحسن المنتجات اللي اشتريتها الفترة الأخيرة.',
        'بقالي فترة بستخدمه ومفيش أي شكوى. يستحق.'
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
    const isFemale = Math.random() > 0.55; // 45% female
    const firstName = randomPick(isFemale ? FEMALE_NAMES : MALE_NAMES);
    const lastName = randomPick(LAST_INITIALS);
    return {
        full: `${firstName} ${lastName}`,
        initials: `${firstName} ${lastName}`
    };
}

function getRandomRating(): 1 | 2 | 3 | 4 | 5 {
    // Natural distribution: mostly positive but with some variety
    const rand = Math.random();
    if (rand < 0.01) return 2;  // 1% - 2 stars
    if (rand < 0.05) return 3;  // 4% - 3 stars
    if (rand < 0.25) return 4;  // 20% - 4 stars
    return 5;                    // 75% - 5 stars
}

function getRandomDate(): Date {
    // Random date within last 8 months for more variety
    const now = new Date();
    const daysAgo = randomInt(7, 240); // Between 1 week and 8 months ago
    now.setDate(now.getDate() - daysAgo);
    // Add some randomness to the time
    now.setHours(randomInt(8, 23));
    now.setMinutes(randomInt(0, 59));
    return now;
}

function getTemplate(productSlug: string, productName: string): any {
    const lower = (productSlug + ' ' + productName).toLowerCase();

    if (lower.includes('power') || lower.includes('bank') || lower.includes('powercore') || lower.includes('باور')) {
        return POWER_BANK_REVIEWS_V2;
    }
    if (lower.includes('car-charger') || lower.includes('سيارة')) {
        return CAR_REVIEWS;
    }
    if (lower.includes('charger') || lower.includes('شاحن') || lower.includes('powerport') || lower.includes('nano')) {
        return CHARGER_REVIEWS_V2;
    }
    if (lower.includes('cable') || lower.includes('كابل') || lower.includes('powerline')) {
        return CABLE_REVIEWS_V2;
    }
    if (lower.includes('earbuds') || lower.includes('سماعة') || lower.includes('audio') || lower.includes('soundcore') || lower.includes('p2i')) {
        return AUDIO_REVIEWS_V2;
    }
    if (lower.includes('watch') || lower.includes('ساعة') || lower.includes('ft3')) {
        return SMARTWATCH_REVIEWS;
    }
    if (lower.includes('mount') || lower.includes('holder') || lower.includes('حامل')) {
        return CAR_REVIEWS;
    }
    return GENERIC_REVIEWS_V2;
}

// ============================================
// PRODUCTS - All products
// ============================================
const ALL_PRODUCTS = [
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
    { slug: 'anker-usb-c-lightning-sureistrong', name: 'Anker USB-C Lightning SureiStrong' },
    { slug: 'joyroom-power-bank-10000', name: 'Joyroom Power Bank 10000' },
    { slug: 'joyroom-power-bank-20000', name: 'Joyroom Power Bank 20000' },
    { slug: 'joyroom-magnetic-power-bank-10000', name: 'Joyroom Magnetic Power Bank 10000' },
    { slug: 'joyroom-t03s-pro-earbuds', name: 'Joyroom T03S Pro Earbuds' },
    { slug: 'joyroom-jr-t03-wireless-earbuds', name: 'Joyroom JR-T03 Wireless Earbuds' },
    { slug: 'joyroom-20w-usb-c-charger', name: 'Joyroom 20W USB-C Charger' },
    { slug: 'joyroom-25w-fast-charger', name: 'Joyroom 25W Fast Charger' },
    { slug: 'joyroom-30w-fast-charger', name: 'Joyroom 30W Fast Charger' },
    { slug: 'joyroom-usb-c-lightning-cable', name: 'Joyroom USB-C Lightning Cable' },
    { slug: 'joyroom-ft3-smartwatch', name: 'Joyroom FT3 Smartwatch' },
    { slug: 'joyroom-car-mount-zs290', name: 'Joyroom Car Mount ZS290' },
    { slug: 'joyroom-60w-car-charger', name: 'Joyroom 60W Car Charger' },
    { slug: 'joyroom-3-in-1-wireless-charging-station', name: 'Joyroom 3-in-1 Wireless Charger' },
    { slug: 'joyroom-3-in-1-data-cable', name: 'Joyroom 3-in-1 Data Cable' },
    { slug: 'joyroom-car-phone-mount', name: 'Joyroom Car Phone Mount' },
    { slug: 'joyroom-usb-c-cable-60w', name: 'Joyroom USB-C Cable 60W' },
    { slug: 'joyroom-type-c-lightning-braided', name: 'Joyroom Type-C Lightning Braided' },
    { slug: 'joyroom-30w-pd-cable', name: 'Joyroom 30W PD Cable' },
    { slug: 'joyroom-usb-a-lightning-cable', name: 'Joyroom USB-A Lightning Cable' },
    { slug: 'joyroom-type-c-to-type-c-cable', name: 'Joyroom Type-C to Type-C Cable' },
    { slug: 'joyroom-usb-a-micro-cable', name: 'Joyroom USB-A Micro Cable' },
    { slug: 'joyroom-usb-a-type-c-cable', name: 'Joyroom USB-A Type-C Cable' },
    { slug: 'joyroom-type-c-lightning-24mos', name: 'Joyroom Type-C Lightning 24M' },
    { slug: 'joyroom-type-c-lightning-36mos', name: 'Joyroom Type-C Lightning 36M' },
    { slug: 'joyroom-usb-a-type-c-1.2m', name: 'Joyroom USB-A Type-C 1.2m' },
    { slug: 'joyroom-usb-a-lightning-1.2m', name: 'Joyroom USB-A Lightning 1.2m' }
];

// ============================================
// MAIN API
// ============================================
export async function POST(req: NextRequest) {
    try {
        const db = await getFirestore();
        let totalReviews = 0;
        const results: any[] = [];

        for (const product of ALL_PRODUCTS) {
            // Get existing reviews count
            const existing = await db.collection('reviews')
                .where('productSlug', '==', product.slug)
                .count()
                .get();

            const existingCount = existing.data().count;

            // Add reviews only if below threshold (aim for 5-20 total)
            const targetCount = randomInt(5, 20);
            const toAdd = Math.max(0, targetCount - existingCount);

            if (toAdd === 0) {
                results.push({
                    product: product.name,
                    existing: existingCount,
                    added: 0,
                    status: 'skipped - already has enough'
                });
                continue;
            }

            const template = getTemplate(product.slug, product.name);

            for (let i = 0; i < toAdd; i++) {
                const name = getRandomName();
                const rating = getRandomRating();
                const reviewDate = getRandomDate();
                const purchaseDate = new Date(reviewDate);
                purchaseDate.setDate(purchaseDate.getDate() - randomInt(3, 21));

                const review: any = {
                    productSlug: product.slug,
                    productName: product.name,
                    orderId: `ORD-${Date.now()}-${randomInt(1000, 9999)}`,
                    orderDocId: `DOC-${Date.now()}-${i}`,
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
                    helpfulCount: randomInt(0, 25),
                    locale: 'ar',
                    createdAt: FieldValue.serverTimestamp()
                };

                // Add pros with 60% probability
                if (Math.random() > 0.4 && template.pros.length > 0) {
                    review.pros = randomPick(template.pros);
                }

                // Add cons with 25% probability
                if (Math.random() > 0.75 && template.cons.length > 0) {
                    const cons = randomPick(template.cons) as string[];
                    if (cons && cons.length > 0) {
                        review.cons = cons;
                    }
                }

                await db.collection('reviews').add(review);
                totalReviews++;
            }

            results.push({
                product: product.name,
                existing: existingCount,
                added: toAdd,
                total: existingCount + toAdd
            });
        }

        return NextResponse.json({
            success: true,
            totalAdded: totalReviews,
            products: results.length,
            results
        });

    } catch (error: any) {
        console.error('Enhanced seed error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
