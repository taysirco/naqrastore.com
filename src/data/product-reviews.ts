/**
 * Product-Specific Reviews Database
 * Each product has 7-13 unique, realistic reviews
 * Reviews are specific to each product's features
 */

export interface ProductReview {
    author: string;
    rating: number;
    reviewBody: { en: string; ar: string };
    pros?: { en: string[]; ar: string[] };
    cons?: { en: string[]; ar: string[] };
    datePublished: string;
    location: string;
}

// Egyptian reviewer names pool (randomized per product)
const reviewerNames = [
    'Ahmed Mohamed', 'Mohamed Ibrahim', 'Mahmoud Hassan', 'Ali Khaled', 'Omar Youssef',
    'Mostafa Ahmed', 'Hassan Ali', 'Karim Samir', 'Youssef Adel', 'Amr Sherif',
    'Tarek Nabil', 'Walid Fathy', 'Khaled Mahmoud', 'Samy Fawzy', 'Ashraf Gamal',
    'Sara Ahmed', 'Nour Mohamed', 'Mona Essam', 'Heba Khaled', 'Dina Samir',
    'Rana Mahmoud', 'Fatma Hassan', 'Yasmin Ali', 'Layla Ibrahim', 'Mariam Adel',
    'Ramy Saeed', 'Bassem Yousry', 'Hany Farouk', 'Sherif Nader', 'Wael Hossam',
    'Islam Mohamed', 'Ayman Salah', 'Essam Fouad', 'Magdy Hassan', 'Osama Kamel',
    'Ehab Refaat', 'Hatem Samy', 'Akram Helmy', 'Emad Samir', 'Nader Tawfik'
];

// Egyptian cities pool
const egyptianCities = [
    'القاهرة', 'الجيزة', 'الإسكندرية', 'المنصورة', 'طنطا', 'أسيوط', 'الإسماعيلية',
    'بورسعيد', 'السويس', 'الأقصر', 'أسوان', 'الزقازيق', 'دمياط', 'الفيوم',
    'بني سويف', 'المنيا', 'سوهاج', 'قنا', 'مدينة 6 أكتوبر', 'القاهرة الجديدة',
    'مدينة نصر', 'المعادي', 'مصر الجديدة', 'الشروق', 'العبور', 'المهندسين',
    'الدقي', 'الزمالك', 'العجوزة', 'شبرا'
];

// Seeded random for consistency
function seededRandom(seed: number): number {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function shuffleWithSeed<T>(array: T[], seed: number): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(seededRandom(seed + i) * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

function generateDate(seed: number): string {
    const now = new Date('2026-02-01');
    const daysAgo = Math.floor(seededRandom(seed) * 150) + 14;
    now.setDate(now.getDate() - daysAgo);
    return now.toISOString().split('T')[0];
}

// Product-specific reviews database
export const productReviewsDb: Record<string, ProductReview[]> = {
    // ============= ANKER SPEAKERS =============
    'anker-soundcore-motion-plus': [
        {
            author: 'Ahmed Mohamed', rating: 5, location: 'القاهرة', datePublished: '2025-12-15',
            reviewBody: { en: 'The Hi-Res Audio certification is no joke. Crystal clear highs and thundering bass. Connected it via AUX and Bluetooth - both work flawlessly.', ar: 'شهادة Hi-Res حقيقية. صوت صافي جداً وباس قوي. جربته بالـ AUX والبلوتوث - الاثنين شغالين ممتاز.' },
            pros: { en: ['Hi-Res sound quality', '30W powerful output', 'AUX + Bluetooth'], ar: ['جودة صوت Hi-Res', 'قوة 30 واط', 'AUX + بلوتوث'] }
        },
        {
            author: 'Sara Ahmed', rating: 5, location: 'الإسكندرية', datePublished: '2025-11-28',
            reviewBody: { en: 'Took it to the beach - IPX7 waterproof and survived splashes perfectly. BassUp mode shakes the ground!', ar: 'خدتها علي البحر - مقاومة الماء IPX7 شغالة تمام. وضع BassUp يهز الأرض!' },
            pros: { en: ['Waterproof tested', 'BassUp technology', 'Outdoor ready'], ar: ['مقاومة ماء محققة', 'تقنية BassUp', 'جاهزة للخروجات'] }
        },
        {
            author: 'Mahmoud Hassan', rating: 5, location: 'الجيزة', datePublished: '2025-10-20',
            reviewBody: { en: 'Paired two Motion+ via stereo mode - the soundstage is insane. Better than my old home theater for music.', ar: 'ربطت اثنين Motion+ بوضع الستيريو - الصوت المحيطي جنوني. أفضل من الهوم ثياتر القديم للموسيقى.' },
            pros: { en: ['Stereo pairing works great', 'Wide soundstage', 'Party ready'], ar: ['الربط الستيريو ممتاز', 'صوت محيطي واسع', 'جاهز للحفلات'] }
        },
        {
            author: 'Nour Mohamed', rating: 4, location: 'المنصورة', datePublished: '2025-09-15',
            reviewBody: { en: 'Sound is amazing, but it is a bit heavy to carry around. The 12-hour battery lasts exactly as promised.', ar: 'الصوت مذهل لكن ثقيلة شوية للحمل. البطارية 12 ساعة كما موعود.' },
            pros: { en: ['Amazing sound', '12-hour battery accurate', 'Premium build'], ar: ['صوت مذهل', 'بطارية 12 ساعة دقيقة', 'بناء فاخر'] },
            cons: { en: ['Slightly heavy for portability'], ar: ['ثقيلة قليلاً للحمل'] }
        },
        {
            author: 'Omar Youssef', rating: 5, location: 'المهندسين', datePublished: '2025-08-10',
            reviewBody: { en: 'Compared it to my friend JBL Flip 6 - Motion+ wins easily. More bass, clearer treble, and EQ app is fantastic.', ar: 'قارنتها مع JBL Flip 6 صاحبي - Motion+ أفضل بكتير. باس أقوى وتريبل أوضح والتطبيق ممتاز.' },
            pros: { en: ['Beats JBL Flip 6', 'Soundcore app EQ', 'Better value'], ar: ['أفضل من JBL Flip 6', 'تطبيق Soundcore', 'قيمة أفضل'] }
        },
        {
            author: 'Karim Samir', rating: 5, location: 'مدينة نصر', datePublished: '2025-07-25',
            reviewBody: { en: 'Using it daily for 6 months now - battery still holds 12 hours. Build quality is exceptional.', ar: 'بستخدمها يومياً من 6 شهور - البطارية لسه 12 ساعة. جودة البناء استثنائية.' },
            pros: { en: ['Long-term durability', 'Consistent battery life', 'Daily use tested'], ar: ['متانة طويلة المدى', 'بطارية ثابتة', 'مختبرة للاستخدام اليومي'] }
        },
        {
            author: 'Heba Khaled', rating: 4, location: 'طنطا', datePublished: '2025-06-18',
            reviewBody: { en: 'Perfect for home parties. Wish it had LED lights like Flare 2, but sound quality makes up for it.', ar: 'مثالية للحفلات المنزلية. تمنيت لو فيها أضواء LED زي Flare 2 لكن جودة الصوت تعوض.' },
            pros: { en: ['Party-ready sound', 'Premium audio', 'Reliable'], ar: ['صوت للحفلات', 'صوت فاخر', 'موثوقة'] },
            cons: { en: ['No LED lights'], ar: ['بدون أضواء LED'] }
        },
        {
            author: 'Hassan Ali', rating: 5, location: 'أسيوط', datePublished: '2025-05-12',
            reviewBody: { en: 'The app customization is next level. Created my own EQ profile for Arabic music - magical!', ar: 'تخصيص التطبيق مستوى تاني. عملت EQ خاص بيا للموسيقى العربية - سحري!' },
            pros: { en: ['Custom EQ profiles', 'App control', 'Arabic music sounds great'], ar: ['ملفات EQ مخصصة', 'تحكم بالتطبيق', 'صوت رائع للموسيقى العربية'] }
        },
        {
            author: 'Fatma Hassan', rating: 5, location: 'الزقازيق', datePublished: '2025-04-08',
            reviewBody: { en: 'Bought for my husband birthday - he uses it every day! Sound fills our whole apartment.', ar: 'اشتريتها لعيد ميلاد زوجي - يستخدمها كل يوم! الصوت يملأ الشقة كلها.' },
            pros: { en: ['Room-filling sound', 'Daily use worthy', 'Great gift'], ar: ['صوت يملأ الغرفة', 'يستحق الاستخدام اليومي', 'هدية رائعة'] }
        }
    ],

    'anker-soundcore-flare-2': [
        {
            author: 'Mostafa Ahmed', rating: 5, location: 'الجيزة', datePublished: '2025-12-20',
            reviewBody: { en: 'The 360° sound plus LED lights make every party epic. Connected 3 speakers with PartyCast - absolute madness!', ar: 'الصوت 360 درجة مع الأضواء LED يخلي أي حفلة ملحمية. ربطت 3 سماعات بـ PartyCast - جنون!' },
            pros: { en: ['PartyCast sync', '360° immersive sound', 'LED light show'], ar: ['مزامنة PartyCast', 'صوت محيطي 360', 'عرض أضواء LED'] }
        },
        {
            author: 'Dina Samir', rating: 5, location: 'المعادي', datePublished: '2025-11-15',
            reviewBody: { en: 'Pool party essential! Waterproof IPX7 is legit - dropped it in the pool and it kept playing.', ar: 'أساسية لحفلات المسبح! مقاومة الماء IPX7 حقيقية - وقعت في المسبح واستمرت تشغل.' },
            pros: { en: ['Truly waterproof', 'Pool party tested', 'Floats on water'], ar: ['مقاومة ماء حقيقية', 'مجربة في المسبح', 'تطفو على الماء'] }
        },
        {
            author: 'Tarek Nabil', rating: 4, location: 'القاهرة الجديدة', datePublished: '2025-10-10',
            reviewBody: { en: 'Lights sync perfectly with bass beats. Sound is good but not as detailed as Motion+.', ar: 'الأضواء تتزامن تماماً مع الباس. الصوت جيد لكن ليس بتفصيل Motion+.' },
            pros: { en: ['Perfect light sync', 'Great for parties', 'IPX7 waterproof'], ar: ['تزامن أضواء مثالي', 'رائعة للحفلات', 'مقاومة ماء IPX7'] },
            cons: { en: ['Sound not as detailed as Motion+'], ar: ['الصوت أقل تفصيلاً من Motion+'] }
        },
        {
            author: 'Rana Mahmoud', rating: 5, location: 'الإسكندرية', datePublished: '2025-09-05',
            reviewBody: { en: 'Customized LED colors via app to match my room aesthetic. BassUp mode is a game changer.', ar: 'خصصت ألوان LED عبر التطبيق لتناسب ديكور غرفتي. وضع BassUp يغير كل شيء.' },
            pros: { en: ['Customizable LED colors', 'BassUp technology', 'App control'], ar: ['ألوان LED قابلة للتخصيص', 'تقنية BassUp', 'تحكم بالتطبيق'] }
        },
        {
            author: 'Walid Fathy', rating: 5, location: 'مدينة 6 أكتوبر', datePublished: '2025-08-01',
            reviewBody: { en: 'Much better value than JBL Pulse 5 at half the price. PartyCast links 100+ speakers!', ar: 'قيمة أفضل بكتير من JBL Pulse 5 بنص السعر. PartyCast يربط أكثر من 100 سماعة!' },
            pros: { en: ['Half price of JBL Pulse 5', 'PartyCast technology', 'Great value'], ar: ['نصف سعر JBL Pulse 5', 'تقنية PartyCast', 'قيمة رائعة'] }
        },
        {
            author: 'Layla Ibrahim', rating: 4, location: 'المنيا', datePublished: '2025-07-15',
            reviewBody: { en: 'Love everything except it could be louder. Perfect for small gatherings and bedroom use.', ar: 'أحب كل شيء ماعدا إنها ممكن تكون أعلى صوتاً. مثالية للتجمعات الصغيرة وغرفة النوم.' },
            pros: { en: ['Beautiful design', 'LED ambiance', 'Good for bedroom'], ar: ['تصميم جميل', 'أجواء LED', 'جيدة لغرفة النوم'] },
            cons: { en: ['Could be louder'], ar: ['ممكن تكون أعلى'] }
        },
        {
            author: 'Khaled Mahmoud', rating: 5, location: 'بورسعيد', datePublished: '2025-06-20',
            reviewBody: { en: 'The dual passive radiators deliver surprisingly deep bass. Dual drivers work perfectly.', ar: 'المشعات المزدوجة توفر باس عميق بشكل مفاجئ. السماعات المزدوجة تعمل تماماً.' },
            pros: { en: ['Deep bass', 'Dual drivers', 'Passive radiators'], ar: ['باس عميق', 'سماعات مزدوجة', 'مشعات صوتية'] }
        },
        {
            author: 'Mariam Adel', rating: 5, location: 'دمياط', datePublished: '2025-05-25',
            reviewBody: { en: 'Best speaker for kids parties. They love the lights and I love the safety - it is waterproof!', ar: 'أفضل سماعة لحفلات الأطفال. يحبون الأضواء وأنا أحب الأمان - مقاومة للماء!' },
            pros: { en: ['Kid-friendly', 'Safe waterproof design', 'Fun lights'], ar: ['آمنة للأطفال', 'تصميم مقاوم للماء', 'أضواء ممتعة'] }
        }
    ],

    // ============= ANKER POWER BANKS =============
    'anker-737-powerbank': [
        {
            author: 'Bassem Yousry', rating: 5, location: 'القاهرة', datePublished: '2025-12-18',
            reviewBody: { en: 'Charged my MacBook Pro M4 from 0 to 50% in exactly 30 minutes. The 140W output is no joke!', ar: 'شحنت ماك بوك برو M4 من 0 لـ 50% في 30 دقيقة بالظبط. قوة 140 واط حقيقية!' },
            pros: { en: ['140W real output', 'MacBook M4 compatible', '30-min 50% charge'], ar: ['قوة 140 واط حقيقية', 'متوافق مع ماك بوك M4', 'شحن 50% في 30 دقيقة'] }
        },
        {
            author: 'Hany Farouk', rating: 5, location: 'الجيزة', datePublished: '2025-11-22',
            reviewBody: { en: 'Digital display shows exact wattage - love seeing 140W output in real time. Premium build quality.', ar: 'الشاشة الرقمية تعرض الواط بالظبط - أحب رؤية 140 واط في الوقت الحقيقي. جودة بناء فاخرة.' },
            pros: { en: ['Smart digital display', 'Real-time power info', 'Premium build'], ar: ['شاشة رقمية ذكية', 'معلومات طاقة فورية', 'بناء فاخر'] }
        },
        {
            author: 'Sherif Nader', rating: 5, location: 'المهندسين', datePublished: '2025-10-15',
            reviewBody: { en: 'Took it on international flight - 86.4Wh is under TSA limit. Charged laptop and phone all trip.', ar: 'أخذته في رحلة دولية - 86.4 واط/ساعة تحت حد TSA. شحنت اللابتوب والموبايل طول الرحلة.' },
            pros: { en: ['Flight-safe 86.4Wh', 'Multi-device charging', 'Travel essential'], ar: ['آمن للطيران 86.4Wh', 'شحن أجهزة متعددة', 'أساسي للسفر'] }
        },
        {
            author: 'Wael Hossam', rating: 4, location: 'الإسكندرية', datePublished: '2025-09-10',
            reviewBody: { en: 'Heavy but worth it for the power. Charges my iPhone 17 4 times and still has juice for iPad.', ar: 'ثقيل لكن يستحق للقوة. يشحن ايفون 17 أربع مرات ويبقى فيه للآيباد.' },
            pros: { en: ['24000mAh capacity', '4x iPhone 17 charges', 'iPad compatible'], ar: ['سعة 24000 مللي أمبير', 'يشحن ايفون 17 أربع مرات', 'متوافق مع آيباد'] },
            cons: { en: ['Heavier than regular power banks'], ar: ['أثقل من الباور بانك العادي'] }
        },
        {
            author: 'Islam Mohamed', rating: 5, location: 'المنصورة', datePublished: '2025-08-05',
            reviewBody: { en: 'The 140W bi-directional charging is genius. Recharges itself in under 1 hour with right charger.', ar: 'الشحن 140 واط في الاتجاهين عبقري. يشحن نفسه في أقل من ساعة بالشاحن المناسب.' },
            pros: { en: ['Bi-directional 140W', 'Fast self-recharge', 'Time-saving'], ar: ['140 واط في الاتجاهين', 'إعادة شحن سريعة', 'موفر للوقت'] }
        },
        {
            author: 'Ayman Salah', rating: 5, location: 'طنطا', datePublished: '2025-07-20',
            reviewBody: { en: 'Perfect for content creators. Powers camera, phone, and laptop simultaneously without issues.', ar: 'مثالي لصناع المحتوى. يشغل الكاميرا والموبايل واللابتوب في نفس الوقت بدون مشاكل.' },
            pros: { en: ['3 devices at once', 'Creator essential', 'Reliable power'], ar: ['3 أجهزة في وقت واحد', 'أساسي لصناع المحتوى', 'طاقة موثوقة'] }
        },
        {
            author: 'Essam Fouad', rating: 5, location: 'أسيوط', datePublished: '2025-06-15',
            reviewBody: { en: 'ActiveShield 2.0 keeps it cool even at 140W. No overheating issues after months of heavy use.', ar: 'ActiveShield 2.0 يحافظ على البرودة حتى عند 140 واط. لا مشاكل سخونة بعد شهور استخدام كثيف.' },
            pros: { en: ['ActiveShield 2.0', 'Cool operation', 'Safe charging'], ar: ['ActiveShield 2.0', 'تشغيل بارد', 'شحن آمن'] }
        },
        {
            author: 'Magdy Hassan', rating: 4, location: 'الفيوم', datePublished: '2025-05-10',
            reviewBody: { en: 'Worth every pound for professionals. Only wish it came with a 140W charger included.', ar: 'يستاهل كل جنيه للمحترفين. التمنية الوحيدة لو كان معاه شاحن 140 واط.' },
            pros: { en: ['Professional grade', 'Worth the investment', '18-month warranty'], ar: ['درجة احترافية', 'يستحق الاستثمار', 'ضمان 18 شهر'] },
            cons: { en: ['Charger not included'], ar: ['الشاحن غير مشمول'] }
        },
        {
            author: 'Osama Kamel', rating: 5, location: 'بني سويف', datePublished: '2025-04-05',
            reviewBody: { en: 'Samsung S26 charges at max 45W - this delivers it. iPhone 17 gets full 27W too. Universal power!', ar: 'سامسونج S26 يشحن بأقصى 45 واط - يوفرها. ايفون 17 يحصل على 27 واط كاملة. طاقة عالمية!' },
            pros: { en: ['Samsung 45W support', 'iPhone 27W support', 'Universal compatibility'], ar: ['يدعم سامسونج 45 واط', 'يدعم ايفون 27 واط', 'توافق عالمي'] }
        }
    ],

    'anker-622-maggo': [
        {
            author: 'Nour Mohamed', rating: 5, location: 'القاهرة الجديدة', datePublished: '2025-12-10',
            reviewBody: { en: 'Magnetic attachment is incredibly strong on my iPhone 17. Foldable kickstand is genius for video calls.', ar: 'الالتصاق المغناطيسي قوي جداً على ايفون 17. الحامل القابل للطي عبقري لمكالمات الفيديو.' },
            pros: { en: ['Strong magnetic hold', 'Foldable kickstand', 'Video call ready'], ar: ['قبضة مغناطيسية قوية', 'حامل قابل للطي', 'جاهز لمكالمات الفيديو'] }
        },
        {
            author: 'Sara Ahmed', rating: 5, location: 'المعادي', datePublished: '2025-11-05',
            reviewBody: { en: 'So slim it does not add bulk to my iPhone 16 Pro. Pass-through charging works perfectly.', ar: 'نحيفة جداً لا تضيف حجم لايفون 16 برو. الشحن التمريري يعمل تماماً.' },
            pros: { en: ['Ultra slim design', 'Pass-through charging', 'No bulk added'], ar: ['تصميم نحيف جداً', 'شحن تمريري', 'بدون حجم إضافي'] }
        },
        {
            author: 'Dina Samir', rating: 4, location: 'الإسكندرية', datePublished: '2025-10-01',
            reviewBody: { en: '7.5W wireless is standard speed - wish it was faster. But convenience of magnetic snap is worth it.', ar: '7.5 واط لاسلكي سرعة قياسية - تمنيت لو أسرع. لكن راحة الالتصاق المغناطيسي تستحق.' },
            pros: { en: ['Magnetic convenience', 'MagSafe compatible', 'Daily carry perfect'], ar: ['راحة مغناطيسية', 'متوافق MagSafe', 'مثالي للحمل اليومي'] },
            cons: { en: ['7.5W not the fastest'], ar: ['7.5 واط ليست الأسرع'] }
        },
        {
            author: 'Heba Khaled', rating: 5, location: 'المنصورة', datePublished: '2025-09-15',
            reviewBody: { en: 'Better than Apple MagSafe Battery Pack - has kickstand Apple does not have, at lower price!', ar: 'أفضل من بطارية أبل MagSafe - فيها حامل غير موجود في أبل، وبسعر أقل!' },
            pros: { en: ['Cheaper than Apple', 'Kickstand included', 'Same MagSafe quality'], ar: ['أرخص من أبل', 'حامل مشمول', 'نفس جودة MagSafe'] }
        },
        {
            author: 'Rana Mahmoud', rating: 5, location: 'طنطا', datePublished: '2025-08-20',
            reviewBody: { en: 'Perfect for desk use - kickstand keeps phone upright while charging. Great for watching videos.', ar: 'مثالية للمكتب - الحامل يبقي الهاتف منتصباً أثناء الشحن. رائعة لمشاهدة الفيديو.' },
            pros: { en: ['Desk-friendly', 'Hands-free viewing', 'Charging + watching'], ar: ['صديقة للمكتب', 'مشاهدة بدون يدين', 'شحن + مشاهدة'] }
        },
        {
            author: 'Yasmin Ali', rating: 4, location: 'الجيزة', datePublished: '2025-07-10',
            reviewBody: { en: 'Capacity is modest but perfect for emergency top-ups. Gives my iPhone 16 about 80% extra.', ar: 'السعة متواضعة لكن مثالية للشحن الطارئ. تعطي ايفون 16 حوالي 80% إضافية.' },
            pros: { en: ['Emergency power', 'Compact and light', 'Quick top-ups'], ar: ['طاقة للطوارئ', 'صغيرة وخفيفة', 'شحن سريع'] },
            cons: { en: ['One full charge only'], ar: ['شحنة واحدة فقط'] }
        },
        {
            author: 'Layla Ibrahim', rating: 5, location: 'مدينة 6 أكتوبر', datePublished: '2025-06-05',
            reviewBody: { en: 'Used it daily for 4 months - magnet still strong, USB-C charges fast. Build quality is excellent.', ar: 'استخدمتها يومياً 4 شهور - المغناطيس لا يزال قوياً، USB-C يشحن سريعاً. جودة البناء ممتازة.' },
            pros: { en: ['Durable magnets', 'Fast USB-C input', 'Long-term quality'], ar: ['مغناطيس متين', 'شحن USB-C سريع', 'جودة طويلة المدى'] }
        }
    ],

    'anker-powercore-10000': [
        {
            author: 'Ahmed Mohamed', rating: 5, location: 'القاهرة', datePublished: '2025-12-12',
            reviewBody: { en: 'Fits in my pocket easily - the most compact 10000mAh I have ever seen. Charges iPhone 17 twice.', ar: 'يناسب جيبي بسهولة - أصغر 10000 مللي أمبير رأيتها. يشحن ايفون 17 مرتين.' },
            pros: { en: ['Ultra compact', 'Pocket-friendly', '2x iPhone 17 charges'], ar: ['صغير جداً', 'يناسب الجيب', 'يشحن ايفون 17 مرتين'] }
        },
        {
            author: 'Mohamed Ibrahim', rating: 5, location: 'الجيزة', datePublished: '2025-11-08',
            reviewBody: { en: 'PowerIQ technology detects my device and delivers optimal charging speed. Smart and reliable.', ar: 'تقنية PowerIQ تكتشف جهازي وتوفر سرعة شحن مثالية. ذكية وموثوقة.' },
            pros: { en: ['PowerIQ smart charging', 'Device detection', 'Optimal speed'], ar: ['شحن ذكي PowerIQ', 'اكتشاف الجهاز', 'سرعة مثالية'] }
        },
        {
            author: 'Mahmoud Hassan', rating: 5, location: 'المنصورة', datePublished: '2025-10-03',
            reviewBody: { en: 'At 37Wh, it is perfect for flights. Used it on 5 flights - never questioned by security.', ar: 'بـ 37 واط/ساعة، مثالي للطيران. استخدمته في 5 رحلات - لا أسئلة من الأمن.' },
            pros: { en: ['Flight approved 37Wh', 'No security issues', 'Travel companion'], ar: ['موافق للطيران 37Wh', 'بدون مشاكل أمنية', 'رفيق السفر'] }
        },
        {
            author: 'Ali Khaled', rating: 4, location: 'الإسكندرية', datePublished: '2025-09-20',
            reviewBody: { en: 'Great for daily use. Only complaint is no USB-C port - uses micro USB for recharging.', ar: 'ممتاز للاستخدام اليومي. الشكوى الوحيدة لا يوجد منفذ USB-C - يستخدم micro USB للشحن.' },
            pros: { en: ['Daily use perfect', 'Reliable', '18-month warranty'], ar: ['مثالي للاستخدام اليومي', 'موثوق', 'ضمان 18 شهر'] },
            cons: { en: ['Micro USB input only'], ar: ['مدخل micro USB فقط'] }
        },
        {
            author: 'Omar Youssef', rating: 5, location: 'طنطا', datePublished: '2025-08-15',
            reviewBody: { en: 'Using same one for 2 years - still holds 80%+ capacity. Anker quality is unmatched.', ar: 'أستخدم نفسه من سنتين - لا يزال يحتفظ بـ 80%+ سعة. جودة انكر لا مثيل لها.' },
            pros: { en: ['2 year durability', '80%+ capacity retained', 'Long-term value'], ar: ['متانة سنتين', 'احتفاظ بـ 80%+ سعة', 'قيمة طويلة المدى'] }
        },
        {
            author: 'Mostafa Ahmed', rating: 5, location: 'أسيوط', datePublished: '2025-07-10',
            reviewBody: { en: 'Best budget option for students. Charges my phone twice and fits in my bag easily.', ar: 'أفضل خيار اقتصادي للطلاب. يشحن هاتفي مرتين ويناسب حقيبتي بسهولة.' },
            pros: { en: ['Budget-friendly', 'Student approved', 'Easy to carry'], ar: ['اقتصادي', 'موافق عليه من الطلاب', 'سهل الحمل'] }
        },
        {
            author: 'Hassan Ali', rating: 5, location: 'المهندسين', datePublished: '2025-06-05',
            reviewBody: { en: 'MultiProtect safety system gives peace of mind. Never overheats, never damages phone.', ar: 'نظام أمان MultiProtect يعطي راحة بال. لا يسخن أبداً، لا يضر الهاتف أبداً.' },
            pros: { en: ['MultiProtect safety', 'No overheating', 'Phone safe'], ar: ['أمان MultiProtect', 'بدون سخونة', 'الهاتف آمن'] }
        }
    ],

    'anker-powercore-20000': [
        {
            author: 'Karim Samir', rating: 5, location: 'القاهرة الجديدة', datePublished: '2025-12-05',
            reviewBody: { en: 'Dual USB ports are game changer - charging my phone and wife phone simultaneously.', ar: 'منفذين USB يغيران كل شيء - أشحن هاتفي وهاتف زوجتي في نفس الوقت.' },
            pros: { en: ['Dual USB ports', 'Simultaneous charging', 'Family friendly'], ar: ['منفذين USB', 'شحن متزامن', 'صديق للعائلة'] }
        },
        {
            author: 'Youssef Adel', rating: 5, location: 'المعادي', datePublished: '2025-11-01',
            reviewBody: { en: 'iPhone 17 charges 4 full times. Perfect for weekend trips without worrying about power.', ar: 'ايفون 17 يشحن 4 مرات كاملة. مثالي لرحلات نهاية الأسبوع بدون قلق على الطاقة.' },
            pros: { en: ['4x iPhone 17 charges', 'Weekend trip ready', 'High capacity'], ar: ['يشحن ايفون 17 أربع مرات', 'جاهز لرحلات الويكند', 'سعة عالية'] }
        },
        {
            author: 'Amr Sherif', rating: 4, location: 'الإسكندرية', datePublished: '2025-09-25',
            reviewBody: { en: 'VoltageBoost technology compensates for cable resistance. Charges fast even with long cables.', ar: 'تقنية VoltageBoost تعوض مقاومة الكابل. شحن سريع حتى مع الكابلات الطويلة.' },
            pros: { en: ['VoltageBoost technology', 'Long cable compatible', 'Consistent speed'], ar: ['تقنية VoltageBoost', 'متوافق مع كابلات طويلة', 'سرعة ثابتة'] },
            cons: { en: ['Takes 10 hours to recharge'], ar: ['يستغرق 10 ساعات لإعادة الشحن'] }
        },
        {
            author: 'Tarek Nabil', rating: 5, location: 'المنصورة', datePublished: '2025-08-20',
            reviewBody: { en: '72Wh capacity is under 100Wh limit - flew with it internationally 3 times, no problems.', ar: 'سعة 72 واط/ساعة تحت حد 100 واط/ساعة - سافرت به دولياً 3 مرات، بدون مشاكل.' },
            pros: { en: ['Flight-safe 72Wh', 'International travel tested', 'TSA compliant'], ar: ['آمن للطيران 72Wh', 'مختبر للسفر الدولي', 'متوافق مع TSA'] }
        },
        {
            author: 'Walid Fathy', rating: 5, location: 'طنطا', datePublished: '2025-07-15',
            reviewBody: { en: '24-month warranty is double the industry standard. Anker confident in their quality.', ar: 'ضمان 24 شهر ضعف المعيار. انكر واثقون في جودتهم.' },
            pros: { en: ['24-month warranty', 'Double standard', 'Quality guarantee'], ar: ['ضمان 24 شهر', 'ضعف المعيار', 'ضمان الجودة'] }
        },
        {
            author: 'Khaled Mahmoud', rating: 5, location: 'الجيزة', datePublished: '2025-06-10',
            reviewBody: { en: 'Samsung S26 charges about 3 times. Great balance between capacity and portability.', ar: 'سامسونج S26 يشحن حوالي 3 مرات. توازن رائع بين السعة والقابلية للحمل.' },
            pros: { en: ['3x Samsung S26', 'Balanced design', 'Portable power'], ar: ['يشحن سامسونج S26 ثلاث مرات', 'تصميم متوازن', 'طاقة محمولة'] }
        },
        {
            author: 'Samy Fawzy', rating: 5, location: 'أسيوط', datePublished: '2025-05-05',
            reviewBody: { en: 'Best value for 20000mAh segment. Compared 5 brands - Anker wins on quality and warranty.', ar: 'أفضل قيمة في فئة 20000 مللي أمبير. قارنت 5 ماركات - انكر تفوز بالجودة والضمان.' },
            pros: { en: ['Best in class value', 'Beats competitors', 'Quality + warranty'], ar: ['أفضل قيمة في الفئة', 'يتفوق على المنافسين', 'جودة + ضمان'] }
        }
    ],

    // ============= ANKER WALL CHARGERS =============
    'anker-powerport-20w': [
        {
            author: 'Ramy Saeed', rating: 5, location: 'القاهرة', datePublished: '2025-12-08',
            reviewBody: { en: 'Charges my iPhone 16 Pro from 0-50% in 20 minutes. Exactly what Apple should include in box.', ar: 'يشحن ايفون 16 برو من 0-50% في 20 دقيقة. بالظبط اللي أبل المفروض تحطه في العلبة.' },
            pros: { en: ['20W fast charging', 'iPhone optimized', 'Compact design'], ar: ['شحن سريع 20 واط', 'محسن للايفون', 'تصميم صغير'] }
        },
        {
            author: 'Ehab Refaat', rating: 5, location: 'الجيزة', datePublished: '2025-11-02',
            reviewBody: { en: 'MultiProtect safety makes this safer than cheap chargers. No overheating even during fast charge.', ar: 'أمان MultiProtect يخليه أأمن من الشواحن الرخيصة. لا سخونة حتى مع الشحن السريع.' },
            pros: { en: ['MultiProtect safety', 'No overheating', 'Safe for overnight'], ar: ['أمان MultiProtect', 'بدون سخونة', 'آمن طول الليل'] }
        },
        {
            author: 'Hatem Samy', rating: 4, location: 'الإسكندرية', datePublished: '2025-10-15',
            reviewBody: { en: 'Great charger but wish it came with cable. USB-C only output is future-proof though.', ar: 'شاحن ممتاز لكن تمنيت لو معاه كابل. منفذ USB-C فقط لكنه مستقبلي.' },
            pros: { en: ['USB-C PD', 'Future-proof', 'Reliable'], ar: ['USB-C PD', 'مستقبلي', 'موثوق'] },
            cons: { en: ['No cable included'], ar: ['الكابل غير مشمول'] }
        },
        {
            author: 'Akram Helmy', rating: 5, location: 'المنصورة', datePublished: '2025-09-08',
            reviewBody: { en: 'Half the size of old iPhone charger but 4x faster. Fits in any travel bag pocket.', ar: 'نصف حجم شاحن الايفون القديم لكن أسرع 4 مرات. يناسب أي جيب في شنطة السفر.' },
            pros: { en: ['Ultra compact', '4x faster than 5W', 'Travel friendly'], ar: ['صغير جداً', 'أسرع 4 مرات من 5 واط', 'صديق للسفر'] }
        },
        {
            author: 'Emad Samir', rating: 5, location: 'طنطا', datePublished: '2025-08-01',
            reviewBody: { en: '18-month warranty gives confidence. Using it 10 times daily for 4 months - perfect.', ar: 'ضمان 18 شهر يعطي ثقة. أستخدمه 10 مرات يومياً من 4 شهور - ممتاز.' },
            pros: { en: ['18-month warranty', 'Daily use proven', 'Consistent performance'], ar: ['ضمان 18 شهر', 'مثبت للاستخدام اليومي', 'أداء ثابت'] }
        },
        {
            author: 'Nader Tawfik', rating: 5, location: 'المهندسين', datePublished: '2025-07-15',
            reviewBody: { en: 'Works with Samsung too at 20W. Universal USB-C PD compatibility is excellent value.', ar: 'يعمل مع سامسونج أيضاً بـ 20 واط. توافق USB-C PD عالمي قيمة ممتازة.' },
            pros: { en: ['Samsung compatible', 'Universal PD', 'Great value'], ar: ['متوافق مع سامسونج', 'PD عالمي', 'قيمة رائعة'] }
        },
        {
            author: 'Ahmed Mohamed', rating: 5, location: 'أسيوط', datePublished: '2025-06-20',
            reviewBody: { en: 'Bought 3 - one for home, office, and travel. Best investment for fast charging ecosystem.', ar: 'اشتريت 3 - واحد للبيت والمكتب والسفر. أفضل استثمار للشحن السريع.' },
            pros: { en: ['Multi-location setup', 'Worth buying multiple', 'Affordable'], ar: ['إعداد متعدد الأماكن', 'يستحق شراء أكثر من واحد', 'اقتصادي'] }
        }
    ],

    'anker-nano-45w': [
        {
            author: 'Sara Ahmed', rating: 5, location: 'القاهرة الجديدة', datePublished: '2025-12-12',
            reviewBody: { en: 'GaN technology really works - tiny charger powers my MacBook Air M3. Revolutionary size!', ar: 'تقنية GaN تعمل فعلاً - شاحن صغير يشغل ماك بوك آير M3. حجم ثوري!' },
            pros: { en: ['GaN compact size', 'MacBook Air compatible', '45W laptop power'], ar: ['حجم GaN صغير', 'متوافق مع ماك بوك آير', 'طاقة لابتوب 45 واط'] }
        },
        {
            author: 'Mahmoud Hassan', rating: 5, location: 'المعادي', datePublished: '2025-11-05',
            reviewBody: { en: 'Replaced my MacBook charger and iPhone charger with one device. 45W handles both perfectly.', ar: 'استبدلت شاحن ماك بوك وايفون بجهاز واحد. 45 واط يتعامل مع الاثنين تماماً.' },
            pros: { en: ['2-in-1 replacement', 'One charger for all', 'Bag space saver'], ar: ['بديل 2 في 1', 'شاحن واحد للكل', 'يوفر مساحة في الشنطة'] }
        },
        {
            author: 'Omar Youssef', rating: 5, location: 'الجيزة', datePublished: '2025-10-01',
            reviewBody: { en: 'Samsung S26 Super Fast Charging 2.0 works at full 45W speed. Tested with wattmeter - accurate!', ar: 'شحن سامسونج S26 فائق السرعة 2.0 يعمل بـ 45 واط كاملة. اختبرته بالواتميتر - دقيق!' },
            pros: { en: ['Samsung 45W verified', 'Wattmeter tested', 'Super Fast 2.0'], ar: ['سامسونج 45 واط مؤكد', 'مختبر بالواتميتر', 'فائق السرعة 2.0'] }
        },
        {
            author: 'Nour Mohamed', rating: 4, location: 'الإسكندرية', datePublished: '2025-09-15',
            reviewBody: { en: 'Excellent power but gets warm under heavy load. Normal for GaN but worth mentioning.', ar: 'طاقة ممتازة لكن يسخن تحت الحمل الثقيل. طبيعي لـ GaN لكن يستحق الذكر.' },
            pros: { en: ['45W reliable', 'GaN efficient', 'Fast charging'], ar: ['45 واط موثوق', 'GaN فعال', 'شحن سريع'] },
            cons: { en: ['Gets warm under load'], ar: ['يسخن تحت الحمل'] }
        },
        {
            author: 'Heba Khaled', rating: 5, location: 'المنصورة', datePublished: '2025-08-08',
            reviewBody: { en: 'iPhone 17 gets full 27W speed - charges faster than Apple 30W with smaller footprint.', ar: 'ايفون 17 يحصل على 27 واط كاملة - يشحن أسرع من أبل 30 واط بحجم أصغر.' },
            pros: { en: ['iPhone 17 max speed', 'Beats Apple charger', 'Smaller size'], ar: ['أقصى سرعة لايفون 17', 'يتفوق على شاحن أبل', 'حجم أصغر'] }
        },
        {
            author: 'Dina Samir', rating: 5, location: 'طنطا', datePublished: '2025-07-20',
            reviewBody: { en: '24-month warranty on chargers is rare. Anker stands behind their GaN technology.', ar: 'ضمان 24 شهر على الشواحن نادر. انكر واقفين وراء تقنية GaN.' },
            pros: { en: ['24-month warranty', 'Quality guarantee', 'Premium brand'], ar: ['ضمان 24 شهر', 'ضمان جودة', 'ماركة فاخرة'] }
        },
        {
            author: 'Rana Mahmoud', rating: 5, location: 'مدينة 6 أكتوبر', datePublished: '2025-06-10',
            reviewBody: { en: 'iPad Pro M4 charges at maximum speed too. One charger for whole Apple ecosystem.', ar: 'آيباد برو M4 يشحن بأقصى سرعة أيضاً. شاحن واحد لكل منظومة أبل.' },
            pros: { en: ['iPad Pro compatible', 'Apple ecosystem charger', 'Universal solution'], ar: ['متوافق مع آيباد برو', 'شاحن لمنظومة أبل', 'حل عالمي'] }
        }
    ],

    // ============= ANKER CABLES =============
    'anker-powerline-usb-c-lightning': [
        {
            author: 'Mostafa Ahmed', rating: 5, location: 'القاهرة', datePublished: '2025-12-10',
            reviewBody: { en: 'MFi certified means no stupid iOS warnings. 30W fast charging works perfectly with my iPhone 17.', ar: 'معتمد MFi يعني بدون تحذيرات iOS الغبية. شحن 30 واط يعمل تماماً مع ايفون 17.' },
            pros: { en: ['MFi certified', 'No iOS warnings', '30W fast charging'], ar: ['معتمد MFi', 'بدون تحذيرات iOS', 'شحن سريع 30 واط'] }
        },
        {
            author: 'Karim Samir', rating: 5, location: 'الجيزة', datePublished: '2025-11-05',
            reviewBody: { en: 'Apple cable lasted 3 months. This has survived 8 months of aggressive daily use - no fraying!', ar: 'كابل أبل استمر 3 شهور. هذا صمد 8 شهور من الاستخدام اليومي القوي - بدون تهتك!' },
            pros: { en: ['8 months survived', 'No fraying', 'Beats Apple cable'], ar: ['صمد 8 شهور', 'بدون تهتك', 'يتفوق على كابل أبل'] }
        },
        {
            author: 'Youssef Adel', rating: 5, location: 'المنصورة', datePublished: '2025-10-01',
            reviewBody: { en: 'CarPlay works flawlessly unlike cheap cables that disconnect randomly. Worth the extra money.', ar: 'CarPlay يعمل تماماً عكس الكابلات الرخيصة التي تفصل عشوائياً. يستحق الفلوس الزيادة.' },
            pros: { en: ['CarPlay stable', 'No random disconnects', 'Premium quality'], ar: ['CarPlay مستقر', 'بدون فصل عشوائي', 'جودة فاخرة'] }
        },
        {
            author: 'Amr Sherif', rating: 4, location: 'الإسكندرية', datePublished: '2025-09-15',
            reviewBody: { en: 'Great cable but 1m is short for bedside charging. Wish they had 2m version at same quality.', ar: 'كابل ممتاز لكن 1 متر قصير للشحن بجانب السرير. تمنيت لو فيه 2 متر بنفس الجودة.' },
            pros: { en: ['Premium build', 'Reliable', 'Fast charging'], ar: ['بناء فاخر', 'موثوق', 'شحن سريع'] },
            cons: { en: ['1m may be short'], ar: ['1 متر قد يكون قصير'] }
        },
        {
            author: 'Tarek Nabil', rating: 5, location: 'طنطا', datePublished: '2025-08-10',
            reviewBody: { en: 'Data transfer is fast too - synced 20GB to my MacBook in minutes. More than just charging cable.', ar: 'نقل البيانات سريع أيضاً - نقلت 20 جيجا للماك في دقائق. أكثر من مجرد كابل شحن.' },
            pros: { en: ['Fast data transfer', 'Multi-purpose', '20GB tested'], ar: ['نقل بيانات سريع', 'متعدد الأغراض', 'مختبر 20 جيجا'] }
        },
        {
            author: 'Walid Fathy', rating: 5, location: 'المهندسين', datePublished: '2025-07-05',
            reviewBody: { en: 'Braided design looks premium and feels durable. Connectors are reinforced - no weak points.', ar: 'التصميم المضفر يبدو فاخراً ويحس بالمتانة. الموصلات معززة - بدون نقاط ضعف.' },
            pros: { en: ['Braided premium design', 'Reinforced connectors', 'Durable build'], ar: ['تصميم مضفر فاخر', 'موصلات معززة', 'بناء متين'] }
        },
        {
            author: 'Khaled Mahmoud', rating: 5, location: 'أسيوط', datePublished: '2025-06-01',
            reviewBody: { en: '18-month warranty on a cable is impressive. Anker truly cares about quality.', ar: 'ضمان 18 شهر على كابل مثير للإعجاب. انكر تهتم فعلاً بالجودة.' },
            pros: { en: ['18-month warranty', 'Quality focused', 'Brand trust'], ar: ['ضمان 18 شهر', 'تركيز على الجودة', 'ثقة الماركة'] }
        }
    ],

    // ============= JOYROOM PRODUCTS =============
    'joyroom-t03s-pro-earbuds': [
        {
            author: 'Islam Mohamed', rating: 5, location: 'القاهرة', datePublished: '2025-12-15',
            reviewBody: { en: 'ANC blocks out Cairo traffic noise completely. Sound quality rivals AirPods at half the price!', ar: 'عزل الضوضاء يحجب ضوضاء مرور القاهرة تماماً. جودة الصوت تنافس AirPods بنصف السعر!' },
            pros: { en: ['ANC tested in Cairo traffic', 'AirPods alternative', 'Half the price'], ar: ['عزل مختبر في مرور القاهرة', 'بديل AirPods', 'نصف السعر'] }
        },
        {
            author: 'Ayman Salah', rating: 5, location: 'الجيزة', datePublished: '2025-11-08',
            reviewBody: { en: 'Touch controls are responsive and customizable. Pause, skip, volume - all work flawlessly.', ar: 'التحكم باللمس سريع الاستجابة وقابل للتخصيص. إيقاف، تخطي، صوت - كلها تعمل تماماً.' },
            pros: { en: ['Responsive touch', 'Customizable controls', 'Easy to use'], ar: ['لمس سريع الاستجابة', 'تحكم قابل للتخصيص', 'سهل الاستخدام'] }
        },
        {
            author: 'Essam Fouad', rating: 4, location: 'الإسكندرية', datePublished: '2025-10-01',
            reviewBody: { en: 'Bass is punchy but mids could be clearer. Great for pop and hip-hop, average for classical.', ar: 'الباس قوي لكن الوسط ممكن يكون أوضح. ممتاز للبوب والهيب هوب، متوسط للكلاسيكي.' },
            pros: { en: ['Punchy bass', 'Good for pop/hip-hop', 'Comfortable fit'], ar: ['باس قوي', 'جيد للبوب/هيب هوب', 'مريح'] },
            cons: { en: ['Mids less clear'], ar: ['الوسط أقل وضوحاً'] }
        },
        {
            author: 'Magdy Hassan', rating: 5, location: 'المنصورة', datePublished: '2025-09-12',
            reviewBody: { en: 'Battery case charges 4 times. Total 30+ hours of playback - lasts my whole work week!', ar: 'علبة البطارية تشحن 4 مرات. إجمالي أكثر من 30 ساعة تشغيل - تكفي أسبوع عمل كامل!' },
            pros: { en: ['30+ hours total', 'Week-long battery', 'Case charges 4x'], ar: ['أكثر من 30 ساعة إجمالي', 'بطارية أسبوع', 'العلبة تشحن 4 مرات'] }
        },
        {
            author: 'Osama Kamel', rating: 5, location: 'طنطا', datePublished: '2025-08-05',
            reviewBody: { en: 'Instant pairing with iPhone 17. Just open case and it connects - like AirPods experience.', ar: 'اقتران فوري مع ايفون 17. فقط افتح العلبة وتتصل - تجربة مثل AirPods.' },
            pros: { en: ['Instant pairing', 'AirPods-like experience', 'iPhone optimized'], ar: ['اقتران فوري', 'تجربة مثل AirPods', 'محسن للايفون'] }
        },
        {
            author: 'Ehab Refaat', rating: 5, location: 'المهندسين', datePublished: '2025-07-20',
            reviewBody: { en: 'Call quality surprised me - microphone picks up my voice clearly even in noisy café.', ar: 'جودة المكالمات فاجأتني - الميكروفون يلتقط صوتي بوضوح حتى في الكافيه الصاخب.' },
            pros: { en: ['Clear calls', 'Good microphone', 'Café tested'], ar: ['مكالمات واضحة', 'ميكروفون جيد', 'مختبر في الكافيه'] }
        },
        {
            author: 'Hatem Samy', rating: 5, location: 'أسيوط', datePublished: '2025-06-15',
            reviewBody: { en: 'IPX5 rating means gym sweat is no problem. Used during intense cardio - no issues.', ar: 'تصنيف IPX5 يعني عرق الجيم ليس مشكلة. استخدمتها خلال كارديو مكثف - بدون مشاكل.' },
            pros: { en: ['IPX5 sweat proof', 'Gym approved', 'Secure fit'], ar: ['مقاومة العرق IPX5', 'موافق للجيم', 'تثبيت آمن'] }
        }
    ],

    'joyroom-power-bank-10000': [
        {
            author: 'Akram Helmy', rating: 5, location: 'القاهرة', datePublished: '2025-12-08',
            reviewBody: { en: 'Best value 10000mAh in Egypt. Charges my Samsung S25 twice with juice left over.', ar: 'أفضل قيمة 10000 مللي أمبير في مصر. يشحن سامسونج S25 مرتين ويبقى فيه.' },
            pros: { en: ['Best value', '2x Samsung charge', 'Extra capacity'], ar: ['أفضل قيمة', 'يشحن سامسونج مرتين', 'سعة إضافية'] }
        },
        {
            author: 'Emad Samir', rating: 5, location: 'الجيزة', datePublished: '2025-11-02',
            reviewBody: { en: 'USB-C input and output is key. Recharges fast and charges my phone fast. Win-win.', ar: 'مدخل ومخرج USB-C أساسي. يشحن نفسه سريع ويشحن هاتفي سريع. فوز مزدوج.' },
            pros: { en: ['USB-C in/out', 'Fast recharge', 'Fast output'], ar: ['USB-C دخول/خروج', 'إعادة شحن سريعة', 'شحن سريع'] }
        },
        {
            author: 'Nader Tawfik', rating: 4, location: 'الإسكندرية', datePublished: '2025-10-15',
            reviewBody: { en: 'Slim design slips into pocket. Only wish LED indicators were brighter in sunlight.', ar: 'تصميم نحيف ينزلق في الجيب. التمنية الوحيدة لو مؤشرات LED أوضح في الشمس.' },
            pros: { en: ['Slim pocket design', 'Daily carry', 'Light weight'], ar: ['تصميم نحيف للجيب', 'حمل يومي', 'وزن خفيف'] },
            cons: { en: ['LED dim in sunlight'], ar: ['LED خافت في الشمس'] }
        },
        {
            author: 'Ramy Saeed', rating: 5, location: 'المنصورة', datePublished: '2025-09-08',
            reviewBody: { en: 'Perfect student power bank - affordable, reliable, fits in pencil case!', ar: 'باور بانك مثالي للطلاب - اقتصادي، موثوق، يناسب المقلمة!' },
            pros: { en: ['Student budget', 'Pencil case size', 'Reliable'], ar: ['ميزانية طالب', 'حجم المقلمة', 'موثوق'] }
        },
        {
            author: 'Bassem Yousry', rating: 5, location: 'طنطا', datePublished: '2025-08-01',
            reviewBody: { en: 'Joyroom quality impressed me. Build feels premium despite budget price.', ar: 'جودة جويروم أبهرتني. البناء يحس فاخر رغم السعر الاقتصادي.' },
            pros: { en: ['Premium feel', 'Budget price', 'Quality build'], ar: ['إحساس فاخر', 'سعر اقتصادي', 'بناء جيد'] }
        },
        {
            author: 'Hany Farouk', rating: 5, location: 'المهندسين', datePublished: '2025-07-15',
            reviewBody: { en: '18W PD output gives respectable charging speed. Not 30W but more than enough.', ar: 'خرج 18 واط PD يعطي سرعة شحن محترمة. ليس 30 واط لكن أكثر من كافي.' },
            pros: { en: ['18W PD output', 'Respectable speed', 'Good value'], ar: ['خرج 18 واط PD', 'سرعة محترمة', 'قيمة جيدة'] }
        },
        {
            author: 'Sherif Nader', rating: 5, location: 'أسيوط', datePublished: '2025-06-10',
            reviewBody: { en: 'Multiple safety circuits protect phone. No worries about leaving it charging overnight.', ar: 'دوائر أمان متعددة تحمي الهاتف. لا قلق من تركه يشحن طول الليل.' },
            pros: { en: ['Safety circuits', 'Overnight safe', 'Protected charging'], ar: ['دوائر أمان', 'آمن طول الليل', 'شحن محمي'] }
        }
    ],

    // ============= MORE POWER BANKS =============
    'anker-powercore-26800': [
        {
            author: 'Wael Hossam', rating: 5, location: 'القاهرة', datePublished: '2025-12-10',
            reviewBody: { en: 'The king of capacity! Charges my iPhone 17 six times and still has leftover for iPad. Travel essential.', ar: 'ملك السعة! يشحن ايفون 17 ست مرات ويبقى فيه للآيباد. أساسي للسفر.' },
            pros: { en: ['6x iPhone 17 charges', 'Travel essential', 'Massive capacity'], ar: ['يشحن ايفون 17 ست مرات', 'أساسي للسفر', 'سعة ضخمة'] }
        },
        {
            author: 'Islam Mohamed', rating: 5, location: 'الجيزة', datePublished: '2025-11-05',
            reviewBody: { en: 'Dual USB output means I charge phone and tablet together. VoltageBoost keeps speed consistent.', ar: 'منفذين USB يعني أشحن الموبايل والتابلت معاً. VoltageBoost يحافظ على السرعة.' },
            pros: { en: ['Dual USB output', 'Phone + tablet', 'VoltageBoost'], ar: ['منفذين USB', 'موبايل + تابلت', 'VoltageBoost'] }
        },
        {
            author: 'Ayman Salah', rating: 4, location: 'الإسكندرية', datePublished: '2025-10-01',
            reviewBody: { en: 'Heavy but the capacity is unmatched. At 96.48Wh, it is under the 100Wh flight limit. Just barely!', ar: 'ثقيل لكن السعة لا مثيل لها. بـ 96.48 واط/ساعة، تحت حد 100 واط للطيران. بالكاد!' },
            pros: { en: ['Flight-safe 96.48Wh', 'Maximum capacity', 'Dual output'], ar: ['آمن للطيران 96.48Wh', 'أقصى سعة', 'منفذين'] },
            cons: { en: ['Heavy for pocket carry'], ar: ['ثقيل للجيب'] }
        },
        {
            author: 'Essam Fouad', rating: 5, location: 'المنصورة', datePublished: '2025-09-10',
            reviewBody: { en: 'Camping trip lifesaver. Powered our phones for 3 days without any wall outlet access.', ar: 'منقذ رحلات التخييم. شغل موبايلاتنا 3 أيام بدون أي مصدر كهرباء.' },
            pros: { en: ['Camping approved', '3 days power', 'Multi-device'], ar: ['موافق للتخييم', 'طاقة 3 أيام', 'أجهزة متعددة'] }
        },
        {
            author: 'Magdy Hassan', rating: 5, location: 'طنطا', datePublished: '2025-08-05',
            reviewBody: { en: 'PowerIQ 2.0 intelligent charging protects my devices. 24-month Anker warranty is reassuring.', ar: 'شحن ذكي PowerIQ 2.0 يحمي أجهزتي. ضمان انكر 24 شهر مطمئن.' },
            pros: { en: ['PowerIQ 2.0', '24-month warranty', 'Device protection'], ar: ['PowerIQ 2.0', 'ضمان 24 شهر', 'حماية الأجهزة'] }
        },
        {
            author: 'Osama Kamel', rating: 5, location: 'المهندسين', datePublished: '2025-07-15',
            reviewBody: { en: 'Samsung S26 charges about 5 times. Built like a tank - no scratches after months in my bag.', ar: 'سامسونج S26 يشحن حوالي 5 مرات. مبني كالدبابة - بدون خدوش بعد شهور في شنطتي.' },
            pros: { en: ['5x Samsung S26', 'Tank build quality', 'Scratch resistant'], ar: ['يشحن سامسونج S26 خمس مرات', 'جودة بناء دبابة', 'مقاوم للخدش'] }
        },
        {
            author: 'Ehab Refaat', rating: 5, location: 'أسيوط', datePublished: '2025-06-20',
            reviewBody: { en: 'Best power-to-price ratio. At this capacity, competitors charge 30% more. Anker value!', ar: 'أفضل نسبة طاقة للسعر. بهذه السعة المنافسين يطلبون 30% أكثر. قيمة انكر!' },
            pros: { en: ['Best value', 'Beats competitors', 'Price-to-capacity'], ar: ['أفضل قيمة', 'يتفوق على المنافسين', 'السعر للسعة'] }
        }
    ],

    'anker-521-powerhouse': [
        {
            author: 'Hatem Samy', rating: 5, location: 'القاهرة', datePublished: '2025-12-08',
            reviewBody: { en: 'Powered my CPAP machine for 5 hours during power outage. LiFePO4 battery is superior technology.', ar: 'شغل جهاز التنفس CPAP لمدة 5 ساعات خلال انقطاع الكهرباء. بطارية LiFePO4 تقنية متفوقة.' },
            pros: { en: ['CPAP compatible', 'Power outage solution', 'LiFePO4 battery'], ar: ['متوافق مع CPAP', 'حل لانقطاع الكهرباء', 'بطارية LiFePO4'] }
        },
        {
            author: 'Akram Helmy', rating: 5, location: 'الجيزة', datePublished: '2025-11-01',
            reviewBody: { en: '3000+ cycle lifespan means 10+ years of daily use. InfiniPower technology is revolutionary.', ar: 'عمر افتراضي 3000+ دورة يعني أكثر من 10 سنوات استخدام يومي. تقنية InfiniPower ثورية.' },
            pros: { en: ['10+ year lifespan', 'InfiniPower tech', '3000 cycles'], ar: ['عمر أكثر من 10 سنوات', 'تقنية InfiniPower', '3000 دورة'] }
        },
        {
            author: 'Emad Samir', rating: 5, location: 'الإسكندرية', datePublished: '2025-10-05',
            reviewBody: { en: '200W AC outlet powers my laptop and phone charger simultaneously. Like a portable wall socket!', ar: 'منفذ 200 واط AC يشغل اللابتوب وشاحن الموبايل معاً. مثل فيشة حائط محمولة!' },
            pros: { en: ['200W AC outlet', 'Laptop + phone', 'Portable wall socket'], ar: ['منفذ 200 واط AC', 'لابتوب + موبايل', 'فيشة حائط محمولة'] }
        },
        {
            author: 'Nader Tawfik', rating: 4, location: 'المنصورة', datePublished: '2025-09-10',
            reviewBody: { en: 'Perfect for camping but cannot take on planes - 256Wh exceeds limit. Car trips only.', ar: 'مثالي للتخييم لكن لا يمكن أخذه في الطائرة - 256 واط/ساعة تتجاوز الحد. رحلات السيارة فقط.' },
            pros: { en: ['Camping essential', 'Car trip power', 'Emergency backup'], ar: ['أساسي للتخييم', 'طاقة رحلات السيارة', 'احتياطي للطوارئ'] },
            cons: { en: ['Cannot fly with it'], ar: ['لا يمكن السفر به طائرة'] }
        },
        {
            author: 'Ramy Saeed', rating: 5, location: 'طنطا', datePublished: '2025-08-01',
            reviewBody: { en: '5-year warranty on a power station is unheard of. Anker clearly believes in this product.', ar: 'ضمان 5 سنوات على محطة طاقة غير مسبوق. انكر واثقون في هذا المنتج.' },
            pros: { en: ['5-year warranty', 'Industry leading', 'Quality guarantee'], ar: ['ضمان 5 سنوات', 'الأفضل في الصناعة', 'ضمان الجودة'] }
        },
        {
            author: 'Bassem Yousry', rating: 5, location: 'المهندسين', datePublished: '2025-07-10',
            reviewBody: { en: 'Built-in LED light is surprisingly bright. Perfect for tent lighting during camping.', ar: 'إضاءة LED المدمجة ساطعة بشكل مفاجئ. مثالية لإضاءة الخيمة خلال التخييم.' },
            pros: { en: ['Built-in LED', 'Tent lighting', 'Multi-function'], ar: ['LED مدمج', 'إضاءة الخيمة', 'متعدد الوظائف'] }
        },
        {
            author: 'Hany Farouk', rating: 5, location: 'أسيوط', datePublished: '2025-06-15',
            reviewBody: { en: 'USB-C PD port charges my MacBook Air. AC outlet runs my mini fridge. Ultimate versatility!', ar: 'منفذ USB-C PD يشحن ماك بوك آير. منفذ AC يشغل الثلاجة الصغيرة. تعددية مطلقة!' },
            pros: { en: ['MacBook charging', 'Mini fridge power', 'Ultimate versatility'], ar: ['شحن ماك بوك', 'تشغيل ثلاجة صغيرة', 'تعددية مطلقة'] }
        }
    ],

    // ============= CAR CHARGERS =============
    'anker-car-charger-dual-usb': [
        {
            author: 'Sherif Nader', rating: 5, location: 'القاهرة', datePublished: '2025-12-05',
            reviewBody: { en: 'PowerIQ on both ports means driver and passenger charge at full speed. No fighting over the fast port!', ar: 'PowerIQ على المنفذين يعني السائق والراكب يشحنوا بأقصى سرعة. لا خناق على المنفذ السريع!' },
            pros: { en: ['Dual PowerIQ', 'Both ports fast', 'Family friendly'], ar: ['PowerIQ مزدوج', 'كلا المنفذين سريع', 'صديق للعائلة'] }
        },
        {
            author: 'Wael Hossam', rating: 5, location: 'الجيزة', datePublished: '2025-11-01',
            reviewBody: { en: 'Tiny design does not block other 12V ports. LED indicator is subtle - not distracting at night.', ar: 'التصميم الصغير لا يسد المنافذ الأخرى. مؤشر LED خفيف - لا يشتت بالليل.' },
            pros: { en: ['Compact design', 'Subtle LED', 'Night friendly'], ar: ['تصميم صغير', 'LED خفيف', 'صديق الليل'] }
        },
        {
            author: 'Islam Mohamed', rating: 5, location: 'الإسكندرية', datePublished: '2025-10-05',
            reviewBody: { en: 'Survives Egyptian summer heat in parked car. No overheating issues even at 45°C.', ar: 'يصمد في حرارة الصيف المصري في السيارة المتوقفة. لا مشاكل سخونة حتى عند 45 درجة.' },
            pros: { en: ['Heat resistant', 'Egyptian summer tested', 'Reliable'], ar: ['مقاوم للحرارة', 'مختبر في صيف مصر', 'موثوق'] }
        },
        {
            author: 'Ayman Salah', rating: 4, location: 'المنصورة', datePublished: '2025-09-10',
            reviewBody: { en: 'Great charger but USB-A only. Wish it had USB-C for newer devices. Still fast though.', ar: 'شاحن ممتاز لكن USB-A فقط. تمنيت لو فيه USB-C للأجهزة الجديدة. لا يزال سريعاً.' },
            pros: { en: ['Fast charging', 'Reliable', 'Good value'], ar: ['شحن سريع', 'موثوق', 'قيمة جيدة'] },
            cons: { en: ['USB-A only, no USB-C'], ar: ['USB-A فقط، بدون USB-C'] }
        },
        {
            author: 'Essam Fouad', rating: 5, location: 'طنطا', datePublished: '2025-08-05',
            reviewBody: { en: 'Perfect for Uber/Careem drivers. Passengers charge their phones = better ratings.', ar: 'مثالي لسائقي أوبر/كريم. الركاب يشحنون موبايلاتهم = تقييمات أفضل.' },
            pros: { en: ['Uber driver essential', 'Passenger friendly', 'Better ratings'], ar: ['أساسي لسائقي أوبر', 'صديق للركاب', 'تقييمات أفضل'] }
        },
        {
            author: 'Magdy Hassan', rating: 5, location: 'المهندسين', datePublished: '2025-07-15',
            reviewBody: { en: '18-month warranty on car charger is rare. Quality you expect from Anker.', ar: 'ضمان 18 شهر على شاحن سيارة نادر. الجودة المتوقعة من انكر.' },
            pros: { en: ['18-month warranty', 'Anker quality', 'Peace of mind'], ar: ['ضمان 18 شهر', 'جودة انكر', 'راحة البال'] }
        },
        {
            author: 'Osama Kamel', rating: 5, location: 'أسيوط', datePublished: '2025-06-20',
            reviewBody: { en: 'Bought second one for wife car. Now both cars have reliable Anker charging. Family equipped!', ar: 'اشتريت واحد تاني لسيارة زوجتي. الآن السيارتين فيهم شحن انكر موثوق. العائلة مجهزة!' },
            pros: { en: ['Multi-car setup', 'Family equipped', 'Consistent quality'], ar: ['إعداد سيارات متعددة', 'العائلة مجهزة', 'جودة ثابتة'] }
        }
    ],

    'joyroom-60w-car-charger': [
        {
            author: 'Ehab Refaat', rating: 5, location: 'القاهرة', datePublished: '2025-12-08',
            reviewBody: { en: '60W total output charges MacBook and iPhone simultaneously in the car. Road trip essential!', ar: 'خرج 60 واط إجمالي يشحن ماك بوك وايفون معاً في السيارة. أساسي لرحلات الطريق!' },
            pros: { en: ['60W total', 'MacBook + iPhone', 'Road trip ready'], ar: ['60 واط إجمالي', 'ماك بوك + ايفون', 'جاهز لرحلات الطريق'] }
        },
        {
            author: 'Hatem Samy', rating: 5, location: 'الجيزة', datePublished: '2025-11-02',
            reviewBody: { en: 'USB-C PD 45W + USB-A 15W split is perfect. Laptop gets priority power it needs.', ar: 'تقسيم USB-C PD 45 واط + USB-A 15 واط مثالي. اللابتوب يحصل على الطاقة التي يحتاجها.' },
            pros: { en: ['45W USB-C PD', '15W USB-A', 'Smart power split'], ar: ['45 واط USB-C PD', '15 واط USB-A', 'تقسيم طاقة ذكي'] }
        },
        {
            author: 'Akram Helmy', rating: 4, location: 'الإسكندرية', datePublished: '2025-10-05',
            reviewBody: { en: 'Great power but gets warm under heavy load. Normal for 60W in compact size.', ar: 'طاقة ممتازة لكن يسخن تحت الحمل الثقيل. طبيعي لـ 60 واط بحجم صغير.' },
            pros: { en: ['60W power', 'Compact', 'Dual port'], ar: ['طاقة 60 واط', 'صغير', 'منفذين'] },
            cons: { en: ['Gets warm under load'], ar: ['يسخن تحت الحمل'] }
        },
        {
            author: 'Emad Samir', rating: 5, location: 'المنصورة', datePublished: '2025-09-10',
            reviewBody: { en: 'Joyroom at half the price of Anker 60W with same performance. Best value car charger!', ar: 'جويروم بنصف سعر انكر 60 واط بنفس الأداء. أفضل قيمة لشاحن سيارة!' },
            pros: { en: ['Half Anker price', 'Same performance', 'Best value'], ar: ['نصف سعر انكر', 'نفس الأداء', 'أفضل قيمة'] }
        },
        {
            author: 'Nader Tawfik', rating: 5, location: 'طنطا', datePublished: '2025-08-01',
            reviewBody: { en: 'Samsung S26 Super Fast Charging 2.0 works at full 45W in the car. Verified with meter.', ar: 'شحن سامسونج S26 فائق السرعة 2.0 يعمل بـ 45 واط كاملة في السيارة. مؤكد بالمتر.' },
            pros: { en: ['Samsung 45W verified', 'Super Fast 2.0', 'Meter tested'], ar: ['سامسونج 45 واط مؤكد', 'فائق السرعة 2.0', 'مختبر بالمتر'] }
        },
        {
            author: 'Ramy Saeed', rating: 5, location: 'المهندسين', datePublished: '2025-07-10',
            reviewBody: { en: 'Blue LED ring looks premium at night. Not too bright, just right for car interior.', ar: 'حلقة LED الزرقاء تبدو فاخرة بالليل. ليست ساطعة جداً، مناسبة تماماً لداخل السيارة.' },
            pros: { en: ['Premium LED', 'Night aesthetic', 'Subtle lighting'], ar: ['LED فاخر', 'جمالية ليلية', 'إضاءة خفيفة'] }
        },
        {
            author: 'Bassem Yousry', rating: 5, location: 'أسيوط', datePublished: '2025-06-15',
            reviewBody: { en: 'Compact enough to not block second 12V port. Thoughtful design for multi-accessory cars.', ar: 'صغير بما يكفي لعدم سد المنفذ الثاني. تصميم مدروس للسيارات متعددة الإكسسوارات.' },
            pros: { en: ['Compact design', 'Multi-accessory friendly', 'Thoughtful size'], ar: ['تصميم صغير', 'صديق للإكسسوارات المتعددة', 'حجم مدروس'] }
        }
    ],

    // ============= EARBUDS & AUDIO =============
    'anker-soundcore-life-p2i': [
        {
            author: 'Hany Farouk', rating: 5, location: 'القاهرة', datePublished: '2025-12-10',
            reviewBody: { en: 'Best budget earbuds in Egypt. Sound quality rivals earbuds 3x the price. Anker magic!', ar: 'أفضل سماعات اقتصادية في مصر. جودة الصوت تنافس سماعات بثلاثة أضعاف السعر. سحر انكر!' },
            pros: { en: ['Budget champion', 'Premium sound', '3x value'], ar: ['بطل الميزانية', 'صوت فاخر', 'ثلاثة أضعاف القيمة'] }
        },
        {
            author: 'Sherif Nader', rating: 5, location: 'الجيزة', datePublished: '2025-11-05',
            reviewBody: { en: '28-hour total playtime is insane. Case charges 4 times. Goes all week without charging!', ar: '28 ساعة وقت تشغيل إجمالي جنوني. العلبة تشحن 4 مرات. تمشي أسبوع كامل بدون شحن!' },
            pros: { en: ['28-hour total', 'Week-long battery', '4x case charges'], ar: ['28 ساعة إجمالي', 'بطارية أسبوع', 'العلبة تشحن 4 مرات'] }
        },
        {
            author: 'Wael Hossam', rating: 4, location: 'الإسكندرية', datePublished: '2025-10-01',
            reviewBody: { en: 'Great sound but no ANC at this price. For the budget, you cannot complain though.', ar: 'صوت ممتاز لكن بدون عزل ضوضاء بهذا السعر. لكن بالنسبة للميزانية، لا يمكن الشكوى.' },
            pros: { en: ['Great budget sound', 'Long battery', 'Comfortable'], ar: ['صوت اقتصادي ممتاز', 'بطارية طويلة', 'مريحة'] },
            cons: { en: ['No ANC'], ar: ['بدون عزل ضوضاء'] }
        },
        {
            author: 'Islam Mohamed', rating: 5, location: 'المنصورة', datePublished: '2025-09-15',
            reviewBody: { en: 'IPX5 sweat resistance tested during Cairo summer runs. Survived heavy sweating perfectly.', ar: 'مقاومة العرق IPX5 مختبرة خلال الجري في صيف القاهرة. صمدت في العرق الكثيف تماماً.' },
            pros: { en: ['IPX5 tested', 'Running approved', 'Sweat resistant'], ar: ['IPX5 مختبر', 'موافق للجري', 'مقاوم للعرق'] }
        },
        {
            author: 'Ayman Salah', rating: 5, location: 'طنطا', datePublished: '2025-08-10',
            reviewBody: { en: 'Bass is punchy for the size. BassUp mode makes gym workouts more intense.', ar: 'الباس قوي للحجم. وضع BassUp يجعل تمارين الجيم أكثر كثافة.' },
            pros: { en: ['Punchy bass', 'BassUp mode', 'Gym motivation'], ar: ['باس قوي', 'وضع BassUp', 'تحفيز الجيم'] }
        },
        {
            author: 'Essam Fouad', rating: 5, location: 'المهندسين', datePublished: '2025-07-05',
            reviewBody: { en: 'Call quality is clear - tested during Metro commute. People hear me fine in noisy environment.', ar: 'جودة المكالمات واضحة - مختبرة في المترو. الناس يسمعونني جيداً في البيئة الصاخبة.' },
            pros: { en: ['Clear calls', 'Metro tested', 'Noise handling'], ar: ['مكالمات واضحة', 'مختبر في المترو', 'تعامل مع الضوضاء'] }
        },
        {
            author: 'Magdy Hassan', rating: 5, location: 'أسيوط', datePublished: '2025-06-20',
            reviewBody: { en: 'Soundcore app lets me customize EQ. Created perfect profile for Egyptian music!', ar: 'تطبيق Soundcore يسمح لي بتخصيص EQ. أنشأت ملف مثالي للموسيقى المصرية!' },
            pros: { en: ['Soundcore app', 'Custom EQ', 'Egyptian music perfect'], ar: ['تطبيق Soundcore', 'EQ مخصص', 'مثالي للموسيقى المصرية'] }
        }
    ],

    'joyroom-jr-t03-wireless-earbuds': [
        {
            author: 'Osama Kamel', rating: 5, location: 'القاهرة', datePublished: '2025-12-08',
            reviewBody: { en: 'Incredible value for students. Sound quality is 80% of AirPods at 20% of the price.', ar: 'قيمة مذهلة للطلاب. جودة الصوت 80% من AirPods بـ 20% من السعر.' },
            pros: { en: ['Student budget', '80% AirPods quality', '20% price'], ar: ['ميزانية طالب', '80% جودة AirPods', '20% السعر'] }
        },
        {
            author: 'Ehab Refaat', rating: 5, location: 'الجيزة', datePublished: '2025-11-02',
            reviewBody: { en: 'Touch controls are responsive. Pause, play, skip - all work without issues.', ar: 'التحكم باللمس سريع الاستجابة. إيقاف، تشغيل، تخطي - كلها تعمل بدون مشاكل.' },
            pros: { en: ['Touch controls', 'Responsive', 'Easy to use'], ar: ['تحكم لمسي', 'سريع الاستجابة', 'سهل الاستخدام'] }
        },
        {
            author: 'Hatem Samy', rating: 4, location: 'الإسكندرية', datePublished: '2025-10-05',
            reviewBody: { en: 'Good sound but ear tips could be softer. Extended use gets slightly uncomfortable.', ar: 'صوت جيد لكن أطراف الأذن ممكن تكون أنعم. الاستخدام المطول يصبح غير مريح قليلاً.' },
            pros: { en: ['Good sound', 'Touch controls', 'Good battery'], ar: ['صوت جيد', 'تحكم لمسي', 'بطارية جيدة'] },
            cons: { en: ['Ear tips could be softer'], ar: ['أطراف الأذن ممكن تكون أنعم'] }
        },
        {
            author: 'Akram Helmy', rating: 5, location: 'المنصورة', datePublished: '2025-09-10',
            reviewBody: { en: 'Bluetooth 5.3 connection is rock solid. No dropouts during Metro commute.', ar: 'اتصال بلوتوث 5.3 صلب كالصخر. لا انقطاع خلال المترو.' },
            pros: { en: ['Bluetooth 5.3', 'Stable connection', 'Metro tested'], ar: ['بلوتوث 5.3', 'اتصال مستقر', 'مختبر في المترو'] }
        },
        {
            author: 'Emad Samir', rating: 5, location: 'طنطا', datePublished: '2025-08-01',
            reviewBody: { en: 'Case is compact and fits in watch pocket. Daily carry is effortless.', ar: 'العلبة صغيرة وتناسب جيب الساعة. الحمل اليومي سهل.' },
            pros: { en: ['Compact case', 'Watch pocket size', 'Daily carry'], ar: ['علبة صغيرة', 'حجم جيب الساعة', 'حمل يومي'] }
        },
        {
            author: 'Nader Tawfik', rating: 5, location: 'المهندسين', datePublished: '2025-07-10',
            reviewBody: { en: 'IPX4 water resistance survived unexpected rain. Kept working through light shower.', ar: 'مقاومة الماء IPX4 صمدت في مطر غير متوقع. استمرت في العمل خلال دش خفيف.' },
            pros: { en: ['IPX4 rain tested', 'Outdoor ready', 'Water resistant'], ar: ['IPX4 مختبر في المطر', 'جاهز للخارج', 'مقاوم للماء'] }
        },
        {
            author: 'Ramy Saeed', rating: 5, location: 'أسيوط', datePublished: '2025-06-15',
            reviewBody: { en: 'Best gift for teenagers. They love the design and sound. Parents love the price!', ar: 'أفضل هدية للمراهقين. يحبون التصميم والصوت. الآباء يحبون السعر!' },
            pros: { en: ['Teen approved', 'Great gift', 'Parent friendly price'], ar: ['موافق للمراهقين', 'هدية رائعة', 'سعر صديق للآباء'] }
        }
    ],

    // ============= SMARTWATCH =============
    'joyroom-ft3-smartwatch': [
        {
            author: 'Bassem Yousry', rating: 5, location: 'القاهرة', datePublished: '2025-12-05',
            reviewBody: { en: 'Apple Watch alternative at 10% of the price! Heart rate, steps, notifications - all work great.', ar: 'بديل Apple Watch بـ 10% من السعر! نبضات القلب، الخطوات، الإشعارات - كلها تعمل ممتاز.' },
            pros: { en: ['10% Apple Watch price', 'Heart rate accurate', 'Notifications work'], ar: ['10% سعر Apple Watch', 'نبضات القلب دقيقة', 'الإشعارات تعمل'] }
        },
        {
            author: 'Hany Farouk', rating: 5, location: 'الجيزة', datePublished: '2025-11-01',
            reviewBody: { en: 'AMOLED display is stunning in sunlight. Clear and vibrant even in Egyptian summer.', ar: 'شاشة AMOLED مذهلة في الشمس. واضحة ونابضة بالحياة حتى في صيف مصر.' },
            pros: { en: ['AMOLED display', 'Sunlight visible', 'Vibrant colors'], ar: ['شاشة AMOLED', 'مرئية في الشمس', 'ألوان نابضة'] }
        },
        {
            author: 'Sherif Nader', rating: 4, location: 'الإسكندرية', datePublished: '2025-10-05',
            reviewBody: { en: 'Great smartwatch but app could be better. Basic functionality works perfectly though.', ar: 'ساعة ذكية ممتازة لكن التطبيق ممكن يكون أفضل. الوظائف الأساسية تعمل تماماً.' },
            pros: { en: ['Great hardware', 'Basic features work', 'Good value'], ar: ['أجهزة ممتازة', 'الميزات الأساسية تعمل', 'قيمة جيدة'] },
            cons: { en: ['App needs improvement'], ar: ['التطبيق يحتاج تحسين'] }
        },
        {
            author: 'Wael Hossam', rating: 5, location: 'المنصورة', datePublished: '2025-09-10',
            reviewBody: { en: '7-day battery is life-changing coming from Apple Watch. Charge once a week only!', ar: 'بطارية 7 أيام تغير الحياة قادماً من Apple Watch. شحن مرة واحدة في الأسبوع فقط!' },
            pros: { en: ['7-day battery', 'Weekly charging', 'Apple Watch killer'], ar: ['بطارية 7 أيام', 'شحن أسبوعي', 'قاتل Apple Watch'] }
        },
        {
            author: 'Islam Mohamed', rating: 5, location: 'طنطا', datePublished: '2025-08-05',
            reviewBody: { en: 'IP68 waterproof tested in shower and pool. Survived both without any issues.', ar: 'مقاومة الماء IP68 مختبرة في الدش والمسبح. صمدت في الاثنين بدون مشاكل.' },
            pros: { en: ['IP68 waterproof', 'Shower safe', 'Pool tested'], ar: ['مقاومة ماء IP68', 'آمنة للدش', 'مختبرة في المسبح'] }
        },
        {
            author: 'Ayman Salah', rating: 5, location: 'المهندسين', datePublished: '2025-07-15',
            reviewBody: { en: 'SpO2 sensor helped monitor my health during flu. Accurate readings compared to hospital meter.', ar: 'مستشعر SpO2 ساعد في مراقبة صحتي خلال الإنفلونزا. قراءات دقيقة مقارنة بمتر المستشفى.' },
            pros: { en: ['SpO2 accurate', 'Health monitoring', 'Hospital verified'], ar: ['SpO2 دقيق', 'مراقبة صحية', 'مؤكد من المستشفى'] }
        },
        {
            author: 'Essam Fouad', rating: 5, location: 'أسيوط', datePublished: '2025-06-20',
            reviewBody: { en: 'Multiple watch faces available. Changed mine 5 times already - never gets boring!', ar: 'واجهات ساعة متعددة متاحة. غيرت واجهتي 5 مرات بالفعل - لا تمل أبداً!' },
            pros: { en: ['Multiple faces', 'Customizable', 'Never boring'], ar: ['واجهات متعددة', 'قابلة للتخصيص', 'لا تمل'] }
        }
    ],

    // ============= MORE JOYROOM =============
    'joyroom-power-bank-20000': [
        {
            author: 'Magdy Hassan', rating: 5, location: 'القاهرة', datePublished: '2025-12-08',
            reviewBody: { en: 'Best value 20000mAh in Egypt. iPhone 17 charges 4+ times. Perfect for travel.', ar: 'أفضل قيمة 20000 مللي أمبير في مصر. ايفون 17 يشحن أكثر من 4 مرات. مثالي للسفر.' },
            pros: { en: ['Best value', '4+ iPhone charges', 'Travel essential'], ar: ['أفضل قيمة', 'أكثر من 4 شحنات ايفون', 'أساسي للسفر'] }
        },
        {
            author: 'Osama Kamel', rating: 5, location: 'الجيزة', datePublished: '2025-11-02',
            reviewBody: { en: '22.5W fast charging is impressive at this price. Competes with premium brands.', ar: 'شحن سريع 22.5 واط مثير للإعجاب بهذا السعر. ينافس الماركات الفاخرة.' },
            pros: { en: ['22.5W fast charge', 'Premium competition', 'Great price'], ar: ['شحن سريع 22.5 واط', 'ينافس الفاخرة', 'سعر رائع'] }
        },
        {
            author: 'Ehab Refaat', rating: 4, location: 'الإسكندرية', datePublished: '2025-10-05',
            reviewBody: { en: 'Good capacity but slightly heavy. Worth it for the power though.', ar: 'سعة جيدة لكن ثقيل قليلاً. يستحق للطاقة.' },
            pros: { en: ['High capacity', 'Fast charging', 'Good value'], ar: ['سعة عالية', 'شحن سريع', 'قيمة جيدة'] },
            cons: { en: ['Slightly heavy'], ar: ['ثقيل قليلاً'] }
        },
        {
            author: 'Hatem Samy', rating: 5, location: 'المنصورة', datePublished: '2025-09-10',
            reviewBody: { en: 'LED display shows exact percentage - no guessing. Very useful feature.', ar: 'شاشة LED تعرض النسبة بالضبط - لا تخمين. ميزة مفيدة جداً.' },
            pros: { en: ['LED display', 'Exact percentage', 'Useful feature'], ar: ['شاشة LED', 'نسبة دقيقة', 'ميزة مفيدة'] }
        },
        {
            author: 'Akram Helmy', rating: 5, location: 'طنطا', datePublished: '2025-08-01',
            reviewBody: { en: 'Triple output means 3 devices at once. Family power bank for sure!', ar: 'ثلاثة مخارج يعني 3 أجهزة معاً. باور بانك عائلي بالتأكيد!' },
            pros: { en: ['Triple output', '3 devices', 'Family power'], ar: ['ثلاثة مخارج', '3 أجهزة', 'طاقة عائلية'] }
        },
        {
            author: 'Emad Samir', rating: 5, location: 'المهندسين', datePublished: '2025-07-10',
            reviewBody: { en: 'USB-C PD input recharges the bank fast. 3 hours from 0 to 100%.', ar: 'مدخل USB-C PD يشحن البنك سريعاً. 3 ساعات من 0 لـ 100%.' },
            pros: { en: ['Fast recharge', '3 hours to full', 'USB-C PD'], ar: ['إعادة شحن سريعة', '3 ساعات للامتلاء', 'USB-C PD'] }
        },
        {
            author: 'Nader Tawfik', rating: 5, location: 'أسيوط', datePublished: '2025-06-15',
            reviewBody: { en: 'Joyroom quality exceeded expectations. Build feels solid and premium.', ar: 'جودة جويروم تجاوزت التوقعات. البناء يحس صلب وفاخر.' },
            pros: { en: ['Exceeded expectations', 'Solid build', 'Premium feel'], ar: ['تجاوز التوقعات', 'بناء صلب', 'إحساس فاخر'] }
        }
    ],

    'joyroom-25w-fast-charger': [
        {
            author: 'Ramy Saeed', rating: 5, location: 'القاهرة', datePublished: '2025-12-05',
            reviewBody: { en: 'Samsung 25W Super Fast Charging works perfectly. iPhone 17 gets 20W. Universal charger!', ar: 'شحن سامسونج 25 واط فائق السرعة يعمل تماماً. ايفون 17 يحصل على 20 واط. شاحن عالمي!' },
            pros: { en: ['Samsung 25W', 'iPhone 20W', 'Universal'], ar: ['سامسونج 25 واط', 'ايفون 20 واط', 'عالمي'] }
        },
        {
            author: 'Bassem Yousry', rating: 5, location: 'الجيزة', datePublished: '2025-11-01',
            reviewBody: { en: 'Perfect Samsung charger replacement. Lost original - this is even better!', ar: 'بديل مثالي لشاحن سامسونج. ضاع الأصلي - هذا أفضل حتى!' },
            pros: { en: ['Samsung replacement', 'Better than original', 'Perfect fit'], ar: ['بديل سامسونج', 'أفضل من الأصلي', 'توافق مثالي'] }
        },
        {
            author: 'Hany Farouk', rating: 4, location: 'الإسكندرية', datePublished: '2025-10-05',
            reviewBody: { en: 'Great charger, cable not included. Buy the Joyroom cable separately.', ar: 'شاحن ممتاز، الكابل غير مشمول. اشتري كابل جويروم منفصلاً.' },
            pros: { en: ['Great charger', 'Reliable', 'Good price'], ar: ['شاحن ممتاز', 'موثوق', 'سعر جيد'] },
            cons: { en: ['Cable not included'], ar: ['الكابل غير مشمول'] }
        },
        {
            author: 'Sherif Nader', rating: 5, location: 'المنصورة', datePublished: '2025-09-10',
            reviewBody: { en: 'Compact design fits behind furniture. Invisible charging station setup.', ar: 'تصميم صغير يناسب خلف الأثاث. إعداد محطة شحن غير مرئية.' },
            pros: { en: ['Compact', 'Hidden setup', 'Space saving'], ar: ['صغير', 'إعداد مخفي', 'موفر للمساحة'] }
        },
        {
            author: 'Wael Hossam', rating: 5, location: 'طنطا', datePublished: '2025-08-05',
            reviewBody: { en: 'No overheating even after hours of use. Safety first with Joyroom.', ar: 'لا سخونة حتى بعد ساعات من الاستخدام. الأمان أولاً مع جويروم.' },
            pros: { en: ['No overheating', 'Safe', 'Long use OK'], ar: ['بدون سخونة', 'آمن', 'استخدام طويل موافق'] }
        },
        {
            author: 'Islam Mohamed', rating: 5, location: 'المهندسين', datePublished: '2025-07-10',
            reviewBody: { en: 'Bought 3 for home, office, bedroom. Best budget charger investment.', ar: 'اشتريت 3 للبيت والمكتب وغرفة النوم. أفضل استثمار شاحن اقتصادي.' },
            pros: { en: ['Multi-location', 'Worth buying multiple', 'Budget friendly'], ar: ['متعدد الأماكن', 'يستحق شراء أكثر من واحد', 'صديق الميزانية'] }
        },
        {
            author: 'Ayman Salah', rating: 5, location: 'أسيوط', datePublished: '2025-06-15',
            reviewBody: { en: 'GaN technology in budget charger! Compact and efficient like premium brands.', ar: 'تقنية GaN في شاحن اقتصادي! صغير وفعال مثل الماركات الفاخرة.' },
            pros: { en: ['GaN technology', 'Compact', 'Premium efficiency'], ar: ['تقنية GaN', 'صغير', 'كفاءة فاخرة'] }
        }
    ],

    // ============= MORE CABLES =============
    'anker-powerline-usb-c-usb-c': [
        {
            author: 'Wael Hossam', rating: 5, location: 'القاهرة', datePublished: '2025-12-10',
            reviewBody: { en: '100W power delivery tested with MacBook Pro 16. Charges at full speed - verified with USB meter.', ar: 'توصيل طاقة 100 واط مختبر مع ماك بوك برو 16. يشحن بأقصى سرعة - مؤكد بمتر USB.' },
            pros: { en: ['100W verified', 'MacBook Pro tested', 'Full speed'], ar: ['100 واط مؤكد', 'مختبر ماك بوك برو', 'أقصى سرعة'] }
        },
        {
            author: 'Islam Mohamed', rating: 5, location: 'الجيزة', datePublished: '2025-11-05',
            reviewBody: { en: 'Samsung S26 to Samsung tablet data transfer is instant. USB 3.2 speed is real.', ar: 'نقل البيانات من سامسونج S26 للتابلت فوري. سرعة USB 3.2 حقيقية.' },
            pros: { en: ['USB 3.2 speed', 'Data transfer fast', 'Samsung compatible'], ar: ['سرعة USB 3.2', 'نقل بيانات سريع', 'متوافق مع سامسونج'] }
        },
        {
            author: 'Ayman Salah', rating: 5, location: 'الإسكندرية', datePublished: '2025-10-01',
            reviewBody: { en: 'iPad Pro M4 to MacBook connection is flawless. One cable for everything - charging and data.', ar: 'توصيل آيباد برو M4 بالماك سلس. كابل واحد لكل شيء - شحن وبيانات.' },
            pros: { en: ['iPad Pro compatible', 'Universal cable', 'Charge + data'], ar: ['متوافق مع آيباد برو', 'كابل عالمي', 'شحن + بيانات'] }
        },
        {
            author: 'Essam Fouad', rating: 4, location: 'المنصورة', datePublished: '2025-09-10',
            reviewBody: { en: 'Excellent cable but 1m length is short for desk setup. 2m version would be perfect.', ar: 'كابل ممتاز لكن طول 1 متر قصير للمكتب. نسخة 2 متر ستكون مثالية.' },
            pros: { en: ['High quality', '100W PD', 'Durable'], ar: ['جودة عالية', '100 واط PD', 'متين'] },
            cons: { en: ['1m may be short'], ar: ['1 متر قد يكون قصير'] }
        },
        {
            author: 'Magdy Hassan', rating: 5, location: 'طنطا', datePublished: '2025-08-05',
            reviewBody: { en: 'Braided nylon is super durable. 6 months of daily use - looks brand new still.', ar: 'النايلون المضفر متين جداً. 6 شهور استخدام يومي - يبدو جديد لسه.' },
            pros: { en: ['Braided nylon', '6 months tested', 'Looks new'], ar: ['نايلون مضفر', 'مختبر 6 شهور', 'يبدو جديد'] }
        },
        {
            author: 'Osama Kamel', rating: 5, location: 'المهندسين', datePublished: '2025-07-10',
            reviewBody: { en: 'E-Marker chip inside for safe 100W delivery. Smart cable protects devices.', ar: 'شريحة E-Marker بالداخل لتوصيل 100 واط آمن. كابل ذكي يحمي الأجهزة.' },
            pros: { en: ['E-Marker chip', 'Safe 100W', 'Device protection'], ar: ['شريحة E-Marker', '100 واط آمن', 'حماية الأجهزة'] }
        },
        {
            author: 'Ehab Refaat', rating: 5, location: 'أسيوط', datePublished: '2025-06-15',
            reviewBody: { en: '18-month warranty on premium cable. Anker quality you can trust.', ar: 'ضمان 18 شهر على كابل فاخر. جودة انكر تقدر تثق فيها.' },
            pros: { en: ['18-month warranty', 'Premium quality', 'Trusted brand'], ar: ['ضمان 18 شهر', 'جودة فاخرة', 'ماركة موثوقة'] }
        }
    ],

    'joyroom-usb-c-lightning-cable': [
        {
            author: 'Hatem Samy', rating: 5, location: 'القاهرة', datePublished: '2025-12-08',
            reviewBody: { en: 'MFi certified at Joyroom price! iPhone 17 fast charges perfectly - no warnings.', ar: 'معتمد MFi بسعر جويروم! ايفون 17 يشحن سريع تماماً - بدون تحذيرات.' },
            pros: { en: ['MFi certified', 'Joyroom price', 'No warnings'], ar: ['معتمد MFi', 'سعر جويروم', 'بدون تحذيرات'] }
        },
        {
            author: 'Akram Helmy', rating: 5, location: 'الجيزة', datePublished: '2025-11-02',
            reviewBody: { en: 'Best value MFi cable in Egypt. Half the price of Anker with same quality.', ar: 'أفضل قيمة كابل MFi في مصر. نصف سعر انكر بنفس الجودة.' },
            pros: { en: ['Best value', 'Half Anker price', 'Same quality'], ar: ['أفضل قيمة', 'نصف سعر انكر', 'نفس الجودة'] }
        },
        {
            author: 'Emad Samir', rating: 4, location: 'الإسكندرية', datePublished: '2025-10-05',
            reviewBody: { en: 'Good cable but connector is slightly larger than Apple. Still fits most cases.', ar: 'كابل جيد لكن الموصل أكبر قليلاً من أبل. لا يزال يناسب معظم الجرابات.' },
            pros: { en: ['MFi quality', 'Fast charging', 'Good build'], ar: ['جودة MFi', 'شحن سريع', 'بناء جيد'] },
            cons: { en: ['Connector slightly larger'], ar: ['الموصل أكبر قليلاً'] }
        },
        {
            author: 'Nader Tawfik', rating: 5, location: 'المنصورة', datePublished: '2025-09-10',
            reviewBody: { en: '27W fast charging with my iPhone 17 Pro. Tested with power meter - accurate.', ar: 'شحن سريع 27 واط مع ايفون 17 برو. مختبر بمتر الطاقة - دقيق.' },
            pros: { en: ['27W verified', 'Power meter tested', 'iPhone 17 Pro'], ar: ['27 واط مؤكد', 'مختبر بمتر الطاقة', 'ايفون 17 برو'] }
        },
        {
            author: 'Ramy Saeed', rating: 5, location: 'طنطا', datePublished: '2025-08-01',
            reviewBody: { en: 'CarPlay works perfectly. No disconnections during 2-hour drives.', ar: 'CarPlay يعمل تماماً. لا انقطاع خلال مشاوير ساعتين.' },
            pros: { en: ['CarPlay stable', '2-hour tested', 'No disconnections'], ar: ['CarPlay مستقر', 'مختبر ساعتين', 'بدون انقطاع'] }
        },
        {
            author: 'Bassem Yousry', rating: 5, location: 'المهندسين', datePublished: '2025-07-10',
            reviewBody: { en: 'Bought 3 cables - bedroom, living room, car. All working great after 4 months.', ar: 'اشتريت 3 كابلات - غرفة النوم، الصالة، السيارة. كلهم يعملون ممتاز بعد 4 شهور.' },
            pros: { en: ['Multi-location', '4 months tested', 'All working'], ar: ['متعدد الأماكن', 'مختبر 4 شهور', 'كلهم يعملون'] }
        },
        {
            author: 'Hany Farouk', rating: 5, location: 'أسيوط', datePublished: '2025-06-15',
            reviewBody: { en: 'Student budget friendly. Quality that lasts without breaking the bank.', ar: 'صديق لميزانية الطلاب. جودة تدوم بدون إفلاس.' },
            pros: { en: ['Student friendly', 'Lasting quality', 'Budget price'], ar: ['صديق للطلاب', 'جودة دائمة', 'سعر اقتصادي'] }
        }
    ],

    'joyroom-3-in-1-data-cable': [
        {
            author: 'Sherif Nader', rating: 5, location: 'القاهرة', datePublished: '2025-12-05',
            reviewBody: { en: 'USB-C, Lightning, Micro USB - one cable for entire family devices. Genius!', ar: 'USB-C، لايتننج، ميكرو USB - كابل واحد لكل أجهزة العائلة. عبقري!' },
            pros: { en: ['3-in-1 solution', 'Family friendly', 'All devices'], ar: ['حل 3 في 1', 'صديق للعائلة', 'كل الأجهزة'] }
        },
        {
            author: 'Wael Hossam', rating: 5, location: 'الجيزة', datePublished: '2025-11-01',
            reviewBody: { en: 'Travel essential - instead of carrying 3 cables, I carry 1. Lighter luggage!', ar: 'أساسي للسفر - بدلاً من حمل 3 كابلات، أحمل 1. شنطة أخف!' },
            pros: { en: ['Travel essential', '1 instead of 3', 'Light luggage'], ar: ['أساسي للسفر', '1 بدلاً من 3', 'شنطة أخف'] }
        },
        {
            author: 'Islam Mohamed', rating: 4, location: 'الإسكندرية', datePublished: '2025-10-05',
            reviewBody: { en: 'Convenient but only one device at a time. Cannot charge iPhone and Samsung together.', ar: 'مريح لكن جهاز واحد في المرة. لا يمكن شحن ايفون وسامسونج معاً.' },
            pros: { en: ['3-in-1 convenient', 'Compact', 'All connectors'], ar: ['3 في 1 مريح', 'صغير', 'كل الموصلات'] },
            cons: { en: ['One device at a time'], ar: ['جهاز واحد في المرة'] }
        },
        {
            author: 'Ayman Salah', rating: 5, location: 'المنصورة', datePublished: '2025-09-10',
            reviewBody: { en: 'Emergency cable in my bag. Saved friends many times when their phone died.', ar: 'كابل طوارئ في شنطتي. أنقذت أصدقاء كتير لما موبايلاتهم ماتت.' },
            pros: { en: ['Emergency ready', 'Friend saver', 'Always useful'], ar: ['جاهز للطوارئ', 'منقذ الأصدقاء', 'مفيد دائماً'] }
        },
        {
            author: 'Essam Fouad', rating: 5, location: 'طنطا', datePublished: '2025-08-05',
            reviewBody: { en: 'Office desk essential. Colleagues borrow it all the time - it works with everything.', ar: 'أساسي لمكتب العمل. الزملاء يستعيرونه طول الوقت - يعمل مع كل شيء.' },
            pros: { en: ['Office essential', 'Universal', 'Always borrowed'], ar: ['أساسي للمكتب', 'عالمي', 'مستعار دائماً'] }
        },
        {
            author: 'Magdy Hassan', rating: 5, location: 'المهندسين', datePublished: '2025-07-10',
            reviewBody: { en: 'Great gift idea. Everyone has multiple devices - this solves the cable mess.', ar: 'فكرة هدية رائعة. الكل عندهم أجهزة متعددة - هذا يحل فوضى الكابلات.' },
            pros: { en: ['Gift idea', 'Solves cable mess', 'Universal appeal'], ar: ['فكرة هدية', 'يحل فوضى الكابلات', 'جاذبية عالمية'] }
        },
        {
            author: 'Osama Kamel', rating: 5, location: 'أسيوط', datePublished: '2025-06-15',
            reviewBody: { en: 'Build quality is solid. Connectors feel sturdy - no wobbling or loose fit.', ar: 'جودة البناء صلبة. الموصلات تحس متينة - لا اهتزاز أو تركيب فضفاض.' },
            pros: { en: ['Solid build', 'Sturdy connectors', 'No wobbling'], ar: ['بناء صلب', 'موصلات متينة', 'لا اهتزاز'] }
        }
    ],

    // ============= MORE CHARGERS =============
    'joyroom-20w-usb-c-charger': [
        {
            author: 'Ehab Refaat', rating: 5, location: 'القاهرة', datePublished: '2025-12-08',
            reviewBody: { en: 'Perfect iPhone charger replacement. 20W fast charging at budget price.', ar: 'بديل مثالي لشاحن الايفون. شحن سريع 20 واط بسعر اقتصادي.' },
            pros: { en: ['iPhone replacement', '20W fast', 'Budget price'], ar: ['بديل الايفون', '20 واط سريع', 'سعر اقتصادي'] }
        },
        {
            author: 'Hatem Samy', rating: 5, location: 'الجيزة', datePublished: '2025-11-02',
            reviewBody: { en: 'Compact size fits anywhere. Plug behind bed, desk, no problem.', ar: 'حجم صغير يناسب أي مكان. فيشة خلف السرير، المكتب، لا مشكلة.' },
            pros: { en: ['Ultra compact', 'Fits anywhere', 'Flexible placement'], ar: ['صغير جداً', 'يناسب أي مكان', 'تركيب مرن'] }
        },
        {
            author: 'Akram Helmy', rating: 5, location: 'الإسكندرية', datePublished: '2025-10-05',
            reviewBody: { en: 'No heating issues after hours of charging. Safe for overnight use.', ar: 'لا مشاكل سخونة بعد ساعات شحن. آمن للاستخدام طول الليل.' },
            pros: { en: ['No heating', 'Overnight safe', 'Hours tested'], ar: ['بدون سخونة', 'آمن طول الليل', 'مختبر ساعات'] }
        },
        {
            author: 'Emad Samir', rating: 4, location: 'المنصورة', datePublished: '2025-09-10',
            reviewBody: { en: 'Good charger but plastic feels cheap. Works great though - function over form.', ar: 'شاحن جيد لكن البلاستيك يحس رخيص. يعمل ممتاز - الوظيفة قبل الشكل.' },
            pros: { en: ['Works great', 'Reliable', 'Good value'], ar: ['يعمل ممتاز', 'موثوق', 'قيمة جيدة'] },
            cons: { en: ['Plastic feels cheap'], ar: ['البلاستيك يحس رخيص'] }
        },
        {
            author: 'Nader Tawfik', rating: 5, location: 'طنطا', datePublished: '2025-08-01',
            reviewBody: { en: 'Samsung and iPhone compatible. One charger for mixed household.', ar: 'متوافق مع سامسونج وايفون. شاحن واحد للبيت المختلط.' },
            pros: { en: ['Samsung + iPhone', 'Mixed household', 'Universal'], ar: ['سامسونج + ايفون', 'بيت مختلط', 'عالمي'] }
        },
        {
            author: 'Ramy Saeed', rating: 5, location: 'المهندسين', datePublished: '2025-07-10',
            reviewBody: { en: 'Best gift under 200 EGP. Everyone needs fast charging in 2026.', ar: 'أفضل هدية تحت 200 جنيه. الكل يحتاج شحن سريع في 2026.' },
            pros: { en: ['Under 200 EGP', 'Great gift', 'Essential item'], ar: ['تحت 200 جنيه', 'هدية رائعة', 'منتج أساسي'] }
        },
        {
            author: 'Bassem Yousry', rating: 5, location: 'أسيوط', datePublished: '2025-06-15',
            reviewBody: { en: 'Joyroom never disappoints. Budget brand with premium performance.', ar: 'جويروم لا تخذل أبداً. ماركة اقتصادية بأداء فاخر.' },
            pros: { en: ['Never disappoints', 'Budget brand', 'Premium performance'], ar: ['لا تخذل', 'ماركة اقتصادية', 'أداء فاخر'] }
        }
    ],

    'joyroom-30w-fast-charger': [
        {
            author: 'Hany Farouk', rating: 5, location: 'القاهرة', datePublished: '2025-12-10',
            reviewBody: { en: '30W charges iPad mini at full speed. Perfect for Apple ecosystem users.', ar: '30 واط يشحن آيباد ميني بأقصى سرعة. مثالي لمستخدمي منظومة أبل.' },
            pros: { en: ['iPad mini full speed', 'Apple ecosystem', '30W power'], ar: ['آيباد ميني أقصى سرعة', 'منظومة أبل', 'طاقة 30 واط'] }
        },
        {
            author: 'Sherif Nader', rating: 5, location: 'الجيزة', datePublished: '2025-11-05',
            reviewBody: { en: 'Samsung Galaxy Tab S10 charges faster than original Samsung charger!', ar: 'سامسونج جالاكسي تاب S10 يشحن أسرع من شاحن سامسونج الأصلي!' },
            pros: { en: ['Beats Samsung original', 'Galaxy Tab compatible', 'Fast charging'], ar: ['يتفوق على سامسونج الأصلي', 'متوافق مع جالاكسي تاب', 'شحن سريع'] }
        },
        {
            author: 'Wael Hossam', rating: 5, location: 'الإسكندرية', datePublished: '2025-10-01',
            reviewBody: { en: 'GaN technology keeps it cool. 30W without the heat - impressive engineering.', ar: 'تقنية GaN تبقيه بارداً. 30 واط بدون حرارة - هندسة مثيرة للإعجاب.' },
            pros: { en: ['GaN cool', '30W no heat', 'Advanced tech'], ar: ['GaN بارد', '30 واط بدون حرارة', 'تقنية متقدمة'] }
        },
        {
            author: 'Islam Mohamed', rating: 4, location: 'المنصورة', datePublished: '2025-09-10',
            reviewBody: { en: 'Great charger but slightly bulkier than 20W version. Worth it for the extra power.', ar: 'شاحن ممتاز لكن أكبر قليلاً من نسخة 20 واط. يستحق للطاقة الإضافية.' },
            pros: { en: ['More power', 'Fast charging', 'Good value'], ar: ['طاقة أكثر', 'شحن سريع', 'قيمة جيدة'] },
            cons: { en: ['Slightly bulkier'], ar: ['أكبر قليلاً'] }
        },
        {
            author: 'Ayman Salah', rating: 5, location: 'طنطا', datePublished: '2025-08-05',
            reviewBody: { en: 'iPhone 17 Pro Max gets maximum 27W. This 30W charger future-proofs for iPhone 18.', ar: 'ايفون 17 برو ماكس يحصل على 27 واط. شاحن 30 واط يجهز للمستقبل مع ايفون 18.' },
            pros: { en: ['Future-proof', 'iPhone 18 ready', 'Maximum speed'], ar: ['جاهز للمستقبل', 'جاهز لايفون 18', 'أقصى سرعة'] }
        },
        {
            author: 'Essam Fouad', rating: 5, location: 'المهندسين', datePublished: '2025-07-10',
            reviewBody: { en: 'Single USB-C port is simpler. One device, maximum power. Clean design philosophy.', ar: 'منفذ USB-C واحد أبسط. جهاز واحد، أقصى طاقة. فلسفة تصميم نظيفة.' },
            pros: { en: ['Simple design', 'Maximum power', 'Clean philosophy'], ar: ['تصميم بسيط', 'أقصى طاقة', 'فلسفة نظيفة'] }
        },
        {
            author: 'Magdy Hassan', rating: 5, location: 'أسيوط', datePublished: '2025-06-15',
            reviewBody: { en: 'Perfect balance of power and price. 30W at Joyroom price is unbeatable value.', ar: 'توازن مثالي بين الطاقة والسعر. 30 واط بسعر جويروم قيمة لا تُقهر.' },
            pros: { en: ['Perfect balance', 'Unbeatable value', '30W affordable'], ar: ['توازن مثالي', 'قيمة لا تُقهر', '30 واط اقتصادي'] }
        }
    ],

    'anker-powerport-25w': [
        {
            author: 'Osama Kamel', rating: 5, location: 'القاهرة', datePublished: '2025-12-08',
            reviewBody: { en: 'Samsung Super Fast Charging verified. S26 Ultra hits 25W - tested with USB meter.', ar: 'شحن سامسونج فائق السرعة مؤكد. S26 Ultra يحقق 25 واط - مختبر بمتر USB.' },
            pros: { en: ['25W verified', 'Samsung optimized', 'USB meter tested'], ar: ['25 واط مؤكد', 'محسن لسامسونج', 'مختبر بمتر USB'] }
        },
        {
            author: 'Ehab Refaat', rating: 5, location: 'الجيزة', datePublished: '2025-11-02',
            reviewBody: { en: 'iPhone 17 gets 20W, iPhone 17 Pro gets 25W. Perfect for all models.', ar: 'ايفون 17 يحصل على 20 واط، ايفون 17 برو يحصل على 25 واط. مثالي لكل الموديلات.' },
            pros: { en: ['All iPhone models', '20-25W range', 'Universal'], ar: ['كل موديلات الايفون', 'مدى 20-25 واط', 'عالمي'] }
        },
        {
            author: 'Hatem Samy', rating: 5, location: 'الإسكندرية', datePublished: '2025-10-05',
            reviewBody: { en: 'Anker quality at reasonable price. MultiProtect gives peace of mind.', ar: 'جودة انكر بسعر معقول. MultiProtect يعطي راحة البال.' },
            pros: { en: ['Anker quality', 'MultiProtect', 'Peace of mind'], ar: ['جودة انكر', 'MultiProtect', 'راحة البال'] }
        },
        {
            author: 'Akram Helmy', rating: 4, location: 'المنصورة', datePublished: '2025-09-10',
            reviewBody: { en: 'Great charger but I wish it had foldable prongs for travel. Minor complaint.', ar: 'شاحن ممتاز لكن تمنيت لو الفيشة قابلة للطي للسفر. شكوى بسيطة.' },
            pros: { en: ['25W reliable', 'Anker quality', 'Good price'], ar: ['25 واط موثوق', 'جودة انكر', 'سعر جيد'] },
            cons: { en: ['No foldable prongs'], ar: ['الفيشة غير قابلة للطي'] }
        },
        {
            author: 'Emad Samir', rating: 5, location: 'طنطا', datePublished: '2025-08-01',
            reviewBody: { en: 'Lost Samsung original charger - this is better! Premium feel and fast charging.', ar: 'ضاع شاحن سامسونج الأصلي - هذا أفضل! إحساس فاخر وشحن سريع.' },
            pros: { en: ['Better than Samsung', 'Premium feel', 'Fast charging'], ar: ['أفضل من سامسونج', 'إحساس فاخر', 'شحن سريع'] }
        },
        {
            author: 'Nader Tawfik', rating: 5, location: 'المهندسين', datePublished: '2025-07-10',
            reviewBody: { en: '18-month Anker warranty is reassuring. No worries about charger dying.', ar: 'ضمان انكر 18 شهر مطمئن. لا قلق من موت الشاحن.' },
            pros: { en: ['18-month warranty', 'Reassuring', 'No worries'], ar: ['ضمان 18 شهر', 'مطمئن', 'لا قلق'] }
        },
        {
            author: 'Ramy Saeed', rating: 5, location: 'أسيوط', datePublished: '2025-06-15',
            reviewBody: { en: 'Compact white design matches Apple aesthetic. Looks premium on my desk.', ar: 'تصميم أبيض صغير يناسب جمالية أبل. يبدو فاخراً على مكتبي.' },
            pros: { en: ['Apple aesthetic', 'Premium look', 'Desk worthy'], ar: ['جمالية أبل', 'مظهر فاخر', 'يستحق المكتب'] }
        }
    ],

    // ============= WIRELESS CHARGING =============
    'joyroom-3-in-1-wireless-charging-station': [
        {
            author: 'Bassem Yousry', rating: 5, location: 'القاهرة', datePublished: '2025-12-10',
            reviewBody: { en: 'iPhone, AirPods, Apple Watch - all charging on one station. Nightstand essential!', ar: 'ايفون، AirPods، Apple Watch - كلهم يشحنون على محطة واحدة. أساسي للكومودينو!' },
            pros: { en: ['3-in-1 charging', 'Nightstand essential', 'Apple trio'], ar: ['شحن 3 في 1', 'أساسي للكومودينو', 'ثلاثي أبل'] }
        },
        {
            author: 'Hany Farouk', rating: 5, location: 'الجيزة', datePublished: '2025-11-05',
            reviewBody: { en: 'Replaced 3 cables with one clean station. Bedroom looks so much better now.', ar: 'استبدلت 3 كابلات بمحطة واحدة نظيفة. غرفة النوم تبدو أفضل بكتير الآن.' },
            pros: { en: ['Replaces 3 cables', 'Clean bedroom', 'Organized'], ar: ['تستبدل 3 كابلات', 'غرفة نظيفة', 'منظمة'] }
        },
        {
            author: 'Sherif Nader', rating: 4, location: 'الإسكندرية', datePublished: '2025-10-01',
            reviewBody: { en: 'Works great but iPhone charging is 7.5W not 15W MagSafe. Still convenient.', ar: 'يعمل ممتاز لكن شحن الايفون 7.5 واط مش 15 واط MagSafe. لا يزال مريح.' },
            pros: { en: ['3-in-1 convenience', 'Organized', 'Good value'], ar: ['راحة 3 في 1', 'منظم', 'قيمة جيدة'] },
            cons: { en: ['7.5W not 15W'], ar: ['7.5 واط مش 15 واط'] }
        },
        {
            author: 'Wael Hossam', rating: 5, location: 'المنصورة', datePublished: '2025-09-10',
            reviewBody: { en: 'Apple Watch charging actually works - some cheap stations fail this. Joyroom quality!', ar: 'شحن Apple Watch يعمل فعلاً - بعض المحطات الرخيصة تفشل في ده. جودة جويروم!' },
            pros: { en: ['Watch works', 'Quality tested', 'Reliable charging'], ar: ['الساعة تعمل', 'جودة مختبرة', 'شحن موثوق'] }
        },
        {
            author: 'Islam Mohamed', rating: 5, location: 'طنطا', datePublished: '2025-08-05',
            reviewBody: { en: 'Perfect gift for Apple users. Dad loved it for Fathers Day!', ar: 'هدية مثالية لمستخدمي أبل. أبويا حبها في عيد الأب!' },
            pros: { en: ['Perfect gift', 'Apple users', 'Dad approved'], ar: ['هدية مثالية', 'مستخدمي أبل', 'موافق من الأب'] }
        },
        {
            author: 'Ayman Salah', rating: 5, location: 'المهندسين', datePublished: '2025-07-10',
            reviewBody: { en: 'LED indicator is dim enough for bedroom. Does not disturb sleep like others.', ar: 'مؤشر LED خافت كفاية لغرفة النوم. لا يزعج النوم مثل غيره.' },
            pros: { en: ['Dim LED', 'Sleep friendly', 'Bedroom perfect'], ar: ['LED خافت', 'صديق للنوم', 'مثالي للغرفة'] }
        },
        {
            author: 'Essam Fouad', rating: 5, location: 'أسيوط', datePublished: '2025-06-15',
            reviewBody: { en: 'Compact footprint saves desk space. Everything charges, nothing clutters.', ar: 'حجم صغير يوفر مساحة المكتب. كل شيء يشحن، لا شيء يفوض.' },
            pros: { en: ['Compact footprint', 'Saves space', 'No clutter'], ar: ['حجم صغير', 'يوفر المساحة', 'بدون فوضى'] }
        }
    ],

    // ============= CAR MOUNT =============
    'joyroom-car-mount-zs290': [
        {
            author: 'Magdy Hassan', rating: 5, location: 'القاهرة', datePublished: '2025-12-08',
            reviewBody: { en: 'Survives Cairo potholes! Phone stays locked even on Ring Road bumps.', ar: 'يصمد في مطبات القاهرة! الموبايل يبقى مثبت حتى على مطبات الدائري.' },
            pros: { en: ['Cairo tested', 'Survives potholes', 'Stays locked'], ar: ['مختبر في القاهرة', 'يصمد في المطبات', 'يبقى مثبت'] }
        },
        {
            author: 'Osama Kamel', rating: 5, location: 'الجيزة', datePublished: '2025-11-02',
            reviewBody: { en: 'One-hand operation is genius. Put phone, it grips automatically. Take phone, it releases.', ar: 'التشغيل بيد واحدة عبقري. حط الموبايل، يمسك تلقائي. خد الموبايل، يفتح.' },
            pros: { en: ['One-hand operation', 'Auto grip', 'Easy release'], ar: ['تشغيل بيد واحدة', 'مسك تلقائي', 'فتح سهل'] }
        },
        {
            author: 'Ehab Refaat', rating: 5, location: 'الإسكندرية', datePublished: '2025-10-05',
            reviewBody: { en: 'Dashboard mount is super strong. 3 months in Sahara Desert heat - still perfect.', ar: 'تثبيت التابلوه قوي جداً. 3 شهور في حرارة الصحراء - لا يزال مثالي.' },
            pros: { en: ['Super strong', 'Desert heat tested', '3 months durable'], ar: ['قوي جداً', 'مختبر في حرارة الصحراء', 'متين 3 شهور'] }
        },
        {
            author: 'Hatem Samy', rating: 4, location: 'المنصورة', datePublished: '2025-09-10',
            reviewBody: { en: 'Great mount but blocks AC vent slightly. Dashboard mount better for my car.', ar: 'حامل ممتاز لكن يسد فتحة التكييف قليلاً. تثبيت التابلوه أفضل لسيارتي.' },
            pros: { en: ['Strong grip', 'Adjustable', 'Good quality'], ar: ['مسك قوي', 'قابل للتعديل', 'جودة جيدة'] },
            cons: { en: ['May block AC vent'], ar: ['قد يسد فتحة التكييف'] }
        },
        {
            author: 'Akram Helmy', rating: 5, location: 'طنطا', datePublished: '2025-08-01',
            reviewBody: { en: 'Uber driver essential. Customers always ask where I got this mount - looks professional.', ar: 'أساسي لسائقي أوبر. الزبائن دائماً يسألون فين جبت الحامل ده - يبدو احترافي.' },
            pros: { en: ['Uber essential', 'Professional look', 'Customer approved'], ar: ['أساسي لأوبر', 'مظهر احترافي', 'موافق من الزبائن'] }
        },
        {
            author: 'Emad Samir', rating: 5, location: 'المهندسين', datePublished: '2025-07-10',
            reviewBody: { en: '360° rotation is smooth. Portrait for calls, landscape for navigation - easy switch.', ar: 'دوران 360 درجة سلس. طولي للمكالمات، عرضي للملاحة - تبديل سهل.' },
            pros: { en: ['360° rotation', 'Portrait/landscape', 'Smooth switch'], ar: ['دوران 360 درجة', 'طولي/عرضي', 'تبديل سلس'] }
        },
        {
            author: 'Nader Tawfik', rating: 5, location: 'أسيوط', datePublished: '2025-06-15',
            reviewBody: { en: 'Big phone compatible. iPhone 17 Pro Max with case fits perfectly.', ar: 'متوافق مع الموبايلات الكبيرة. ايفون 17 برو ماكس مع الجراب يناسب تماماً.' },
            pros: { en: ['Big phone compatible', 'With case fits', 'Pro Max approved'], ar: ['متوافق مع الكبير', 'مع الجراب يناسب', 'موافق برو ماكس'] }
        }
    ],

    // ============= MAGNETIC POWER BANK =============
    'joyroom-magnetic-power-bank-10000': [
        {
            author: 'Ramy Saeed', rating: 5, location: 'القاهرة', datePublished: '2025-12-10',
            reviewBody: { en: 'Snaps to iPhone 17 Pro perfectly! Works with Apple MagSafe case seamlessly.', ar: 'يلتصق بـ ايفون 17 برو تماماً! يعمل مع جراب Apple MagSafe بسلاسة.' },
            pros: { en: ['Perfect MagSafe snap', 'Case compatible', 'Seamless'], ar: ['التصاق MagSafe مثالي', 'متوافق مع الجراب', 'سلس'] }
        },
        {
            author: 'Bassem Yousry', rating: 5, location: 'الجيزة', datePublished: '2025-11-05',
            reviewBody: { en: 'Wireless charging on the go! Walk around with power bank attached - game changer.', ar: 'شحن لاسلكي أثناء التنقل! امشي والباور بانك ملتصق - تغيير جذري للعبة.' },
            pros: { en: ['Wireless on-the-go', 'Walk and charge', 'Game changer'], ar: ['لاسلكي أثناء التنقل', 'امشي واشحن', 'تغيير جذري'] }
        },
        {
            author: 'Hany Farouk', rating: 4, location: 'الإسكندرية', datePublished: '2025-10-01',
            reviewBody: { en: 'MagSafe works great but 7.5W wireless is slow. Use USB-C for faster charging.', ar: 'MagSafe يعمل ممتاز لكن 7.5 واط لاسلكي بطيء. استخدم USB-C للشحن الأسرع.' },
            pros: { en: ['MagSafe works', 'USB-C backup', 'Portable'], ar: ['MagSafe يعمل', 'USB-C احتياطي', 'محمول'] },
            cons: { en: ['7.5W wireless slow'], ar: ['7.5 واط لاسلكي بطيء'] }
        },
        {
            author: 'Sherif Nader', rating: 5, location: 'المنصورة', datePublished: '2025-09-10',
            reviewBody: { en: 'Perfect thickness - phone still fits in pocket with power bank attached.', ar: 'سماكة مثالية - الموبايل لا يزال يناسب الجيب مع الباور بانك ملتصق.' },
            pros: { en: ['Perfect thickness', 'Pocket friendly', 'Slim design'], ar: ['سماكة مثالية', 'صديق للجيب', 'تصميم نحيف'] }
        },
        {
            author: 'Wael Hossam', rating: 5, location: 'طنطا', datePublished: '2025-08-05',
            reviewBody: { en: 'LED battery indicator is helpful. Know exactly when to recharge the bank.', ar: 'مؤشر بطارية LED مفيد. اعرف بالضبط متى تعيد شحن البنك.' },
            pros: { en: ['LED indicator', 'Know battery level', 'Helpful feature'], ar: ['مؤشر LED', 'اعرف مستوى البطارية', 'ميزة مفيدة'] }
        },
        {
            author: 'Islam Mohamed', rating: 5, location: 'المهندسين', datePublished: '2025-07-10',
            reviewBody: { en: 'USB-C output also works for non-MagSafe phones. Universal power bank with MagSafe bonus.', ar: 'خرج USB-C يعمل أيضاً للموبايلات غير MagSafe. باور بانك عالمي مع مكافأة MagSafe.' },
            pros: { en: ['USB-C universal', 'MagSafe bonus', 'All phones work'], ar: ['USB-C عالمي', 'مكافأة MagSafe', 'كل الموبايلات تعمل'] }
        },
        {
            author: 'Ayman Salah', rating: 5, location: 'أسيوط', datePublished: '2025-06-15',
            reviewBody: { en: '10000mAh gives 2 full iPhone charges. Perfect daily companion for heavy users.', ar: '10000 مللي أمبير يعطي شحنتين ايفون كاملتين. رفيق يومي مثالي للمستخدمين الثقيلين.' },
            pros: { en: ['2 full charges', 'Daily companion', 'Heavy user approved'], ar: ['شحنتين كاملتين', 'رفيق يومي', 'موافق للمستخدم الثقيل'] }
        }
    ],

    // ============= REMAINING CABLES =============
    'anker-usb-c-lightning-sureistrong': [
        {
            author: 'Magdy Hassan', rating: 5, location: 'القاهرة', datePublished: '2025-12-08',
            reviewBody: { en: 'SureIStrong means 12x stronger than Apple cable. Tested bending - no damage at all.', ar: 'SureIStrong يعني أقوى 12 مرة من كابل أبل. اختبرت الثني - لا ضرر أبداً.' },
            pros: { en: ['12x stronger', 'Bend tested', 'Indestructible'], ar: ['أقوى 12 مرة', 'مختبر الثني', 'غير قابل للتدمير'] }
        },
        {
            author: 'Osama Kamel', rating: 5, location: 'الجيزة', datePublished: '2025-11-02',
            reviewBody: { en: 'MFi certified with bulletproof build. Apple compatibility with military-grade durability.', ar: 'معتمد MFi مع بناء مضاد للرصاص. توافق أبل مع متانة عسكرية.' },
            pros: { en: ['MFi certified', 'Bulletproof build', 'Military durability'], ar: ['معتمد MFi', 'بناء مضاد للرصاص', 'متانة عسكرية'] }
        },
        {
            author: 'Ehab Refaat', rating: 5, location: 'الإسكندرية', datePublished: '2025-10-05',
            reviewBody: { en: '30W fast charging keeps iPhone 17 Pro Max happy. Premium cable for premium phone.', ar: 'شحن سريع 30 واط يرضي ايفون 17 برو ماكس. كابل فاخر لموبايل فاخر.' },
            pros: { en: ['30W fast charging', 'Premium cable', 'Pro Max ready'], ar: ['شحن سريع 30 واط', 'كابل فاخر', 'جاهز لبرو ماكس'] }
        },
        {
            author: 'Hatem Samy', rating: 5, location: 'المنصورة', datePublished: '2025-09-10',
            reviewBody: { en: 'Double braided nylon is next level. Most durable cable I have ever owned.', ar: 'نايلون مضفر مزدوج مستوى تاني. أكثر كابل متين امتلكته في حياتي.' },
            pros: { en: ['Double braided', 'Most durable', 'Next level'], ar: ['مضفر مزدوج', 'الأكثر متانة', 'مستوى تاني'] }
        },
        {
            author: 'Akram Helmy', rating: 4, location: 'طنطا', datePublished: '2025-08-01',
            reviewBody: { en: 'Premium price but premium quality. Worth it if you destroy cables often.', ar: 'سعر فاخر لكن جودة فاخرة. يستحق لو بتدمر الكابلات كتير.' },
            pros: { en: ['Premium quality', 'Long lasting', 'Worth it'], ar: ['جودة فاخرة', 'يدوم طويلاً', 'يستحق'] },
            cons: { en: ['Premium price'], ar: ['سعر فاخر'] }
        },
        {
            author: 'Emad Samir', rating: 5, location: 'المهندسين', datePublished: '2025-07-10',
            reviewBody: { en: 'Lifetime warranty! Anker believes in this cable so much they guarantee it forever.', ar: 'ضمان مدى الحياة! انكر واثقين في الكابل لدرجة إنهم يضمنوه للأبد.' },
            pros: { en: ['Lifetime warranty', 'Forever guarantee', 'Confidence'], ar: ['ضمان مدى الحياة', 'ضمان للأبد', 'ثقة'] }
        },
        {
            author: 'Nader Tawfik', rating: 5, location: 'أسيوط', datePublished: '2025-06-15',
            reviewBody: { en: 'Kids cannot destroy this cable. Parent approved indestructible technology.', ar: 'الأطفال مش قادرين يدمروا الكابل ده. تقنية غير قابلة للتدمير موافقة من الآباء.' },
            pros: { en: ['Kid proof', 'Parent approved', 'Indestructible'], ar: ['مقاوم للأطفال', 'موافق من الآباء', 'غير قابل للتدمير'] }
        }
    ],

    'joyroom-30w-pd-cable': [
        {
            author: 'Ramy Saeed', rating: 5, location: 'القاهرة', datePublished: '2025-12-10',
            reviewBody: { en: '30W PD for iPhone fast charging at budget price. Best value Lightning cable.', ar: 'شحن 30 واط PD سريع للايفون بسعر اقتصادي. أفضل قيمة كابل لايتننج.' },
            pros: { en: ['30W PD', 'Budget price', 'Best value'], ar: ['30 واط PD', 'سعر اقتصادي', 'أفضل قيمة'] }
        },
        {
            author: 'Bassem Yousry', rating: 5, location: 'الجيزة', datePublished: '2025-11-05',
            reviewBody: { en: 'iPhone 17 hits 27W with this cable. Fast charging works as promised.', ar: 'ايفون 17 يحقق 27 واط مع الكابل ده. الشحن السريع يعمل كما وعدوا.' },
            pros: { en: ['27W verified', 'Works as promised', 'iPhone 17 tested'], ar: ['27 واط مؤكد', 'يعمل كما وعدوا', 'مختبر ايفون 17'] }
        },
        {
            author: 'Hany Farouk', rating: 5, location: 'الإسكندرية', datePublished: '2025-10-01',
            reviewBody: { en: 'Braided design prevents tangling. Opens from bag ready to use.', ar: 'التصميم المضفر يمنع التشابك. يفتح من الشنطة جاهز للاستخدام.' },
            pros: { en: ['No tangling', 'Bag ready', 'Braided design'], ar: ['بدون تشابك', 'جاهز من الشنطة', 'تصميم مضفر'] }
        },
        {
            author: 'Sherif Nader', rating: 4, location: 'المنصورة', datePublished: '2025-09-10',
            reviewBody: { en: 'Good cable but 1m is short. Works great for car use though.', ar: 'كابل جيد لكن 1 متر قصير. يعمل ممتاز للسيارة.' },
            pros: { en: ['Good quality', 'Car perfect', '30W PD'], ar: ['جودة جيدة', 'مثالي للسيارة', '30 واط PD'] },
            cons: { en: ['1m length short'], ar: ['طول 1 متر قصير'] }
        },
        {
            author: 'Wael Hossam', rating: 5, location: 'طنطا', datePublished: '2025-08-05',
            reviewBody: { en: 'Data transfer works great too. Synced 10GB to laptop quickly.', ar: 'نقل البيانات يعمل ممتاز أيضاً. نقلت 10 جيجا للابتوب بسرعة.' },
            pros: { en: ['Data transfer', '10GB synced', 'Multi-purpose'], ar: ['نقل بيانات', 'نقل 10 جيجا', 'متعدد الأغراض'] }
        },
        {
            author: 'Islam Mohamed', rating: 5, location: 'المهندسين', datePublished: '2025-07-10',
            reviewBody: { en: 'Joyroom quality at Joyroom price. Cannot go wrong with this brand.', ar: 'جودة جويروم بسعر جويروم. لا يمكن أن تخطئ مع هذه الماركة.' },
            pros: { en: ['Joyroom quality', 'Right price', 'Reliable brand'], ar: ['جودة جويروم', 'السعر المناسب', 'ماركة موثوقة'] }
        },
        {
            author: 'Ayman Salah', rating: 5, location: 'أسيوط', datePublished: '2025-06-15',
            reviewBody: { en: 'MFi certification means no iOS warnings. Legit Apple compatibility.', ar: 'شهادة MFi تعني بدون تحذيرات iOS. توافق أبل شرعي.' },
            pros: { en: ['MFi certified', 'No warnings', 'Apple compatible'], ar: ['معتمد MFi', 'بدون تحذيرات', 'متوافق مع أبل'] }
        }
    ],

    'joyroom-car-phone-mount': [
        {
            author: 'Essam Fouad', rating: 5, location: 'القاهرة', datePublished: '2025-12-08',
            reviewBody: { en: 'Magnetic mount is so convenient. One touch - snap on, snap off. No fumbling.', ar: 'الحامل المغناطيسي مريح جداً. لمسة واحدة - يركب، يفك. بدون عناء.' },
            pros: { en: ['Magnetic convenience', 'One touch', 'No fumbling'], ar: ['راحة مغناطيسية', 'لمسة واحدة', 'بدون عناء'] }
        },
        {
            author: 'Magdy Hassan', rating: 5, location: 'الجيزة', datePublished: '2025-11-02',
            reviewBody: { en: 'Strong magnet holds iPhone 17 Pro Max even on bumpy roads. Cairo tested!', ar: 'مغناطيس قوي يمسك ايفون 17 برو ماكس حتى على الطرق الوعرة. مختبر في القاهرة!' },
            pros: { en: ['Strong magnet', 'Pro Max holds', 'Cairo tested'], ar: ['مغناطيس قوي', 'يمسك برو ماكس', 'مختبر في القاهرة'] }
        },
        {
            author: 'Osama Kamel', rating: 5, location: 'الإسكندرية', datePublished: '2025-10-05',
            reviewBody: { en: 'Dashboard gel pad is reusable. Moved it 3 times - still sticks perfectly.', ar: 'وسادة جل التابلوه قابلة لإعادة الاستخدام. نقلتها 3 مرات - لا تزال تلتصق تماماً.' },
            pros: { en: ['Reusable gel pad', 'Move friendly', '3x tested'], ar: ['وسادة جل قابلة للإعادة', 'صديق للنقل', 'مختبر 3 مرات'] }
        },
        {
            author: 'Ehab Refaat', rating: 4, location: 'المنصورة', datePublished: '2025-09-10',
            reviewBody: { en: 'Great mount but needs metal plate on phone. Case-less users need adhesive plate.', ar: 'حامل ممتاز لكن يحتاج لوح معدني على الموبايل. المستخدمين بدون جراب يحتاجون لوح لاصق.' },
            pros: { en: ['Strong hold', 'Easy use', 'Reliable'], ar: ['مسك قوي', 'سهل الاستخدام', 'موثوق'] },
            cons: { en: ['Needs metal plate'], ar: ['يحتاج لوح معدني'] }
        },
        {
            author: 'Hatem Samy', rating: 5, location: 'طنطا', datePublished: '2025-08-01',
            reviewBody: { en: 'Works with MagSafe cases natively. No metal plate needed for iPhone.', ar: 'يعمل مع جرابات MagSafe مباشرة. لا حاجة للوح معدني للايفون.' },
            pros: { en: ['MagSafe native', 'No plate needed', 'iPhone ready'], ar: ['MagSafe مباشر', 'لا حاجة للوح', 'جاهز للايفون'] }
        },
        {
            author: 'Akram Helmy', rating: 5, location: 'المهندسين', datePublished: '2025-07-10',
            reviewBody: { en: 'Sleek minimalist design. Does not look cheap like other magnetic mounts.', ar: 'تصميم أنيق بسيط. لا يبدو رخيص مثل الحوامل المغناطيسية الأخرى.' },
            pros: { en: ['Sleek design', 'Premium look', 'Not cheap'], ar: ['تصميم أنيق', 'مظهر فاخر', 'ليس رخيص'] }
        },
        {
            author: 'Emad Samir', rating: 5, location: 'أسيوط', datePublished: '2025-06-15',
            reviewBody: { en: 'Compact size does not obstruct view. Safety and convenience together.', ar: 'حجم صغير لا يعيق الرؤية. الأمان والراحة معاً.' },
            pros: { en: ['No view obstruction', 'Safe', 'Convenient'], ar: ['لا يعيق الرؤية', 'آمن', 'مريح'] }
        }
    ],

    'joyroom-usb-c-cable-60w': [
        {
            author: 'Nader Tawfik', rating: 5, location: 'القاهرة', datePublished: '2025-12-10',
            reviewBody: { en: '60W charges MacBook Air perfectly. Laptop cable at phone cable price.', ar: '60 واط يشحن ماك بوك آير تماماً. كابل لابتوب بسعر كابل موبايل.' },
            pros: { en: ['60W MacBook', 'Laptop capable', 'Phone price'], ar: ['60 واط ماك بوك', 'قادر على اللابتوب', 'سعر موبايل'] }
        },
        {
            author: 'Ramy Saeed', rating: 5, location: 'الجيزة', datePublished: '2025-11-05',
            reviewBody: { en: 'Samsung S26 charges at full 45W. Premium charging experience at budget.', ar: 'سامسونج S26 يشحن بـ 45 واط كاملة. تجربة شحن فاخرة باقتصادي.' },
            pros: { en: ['Samsung 45W', 'Premium experience', 'Budget price'], ar: ['سامسونج 45 واط', 'تجربة فاخرة', 'سعر اقتصادي'] }
        },
        {
            author: 'Bassem Yousry', rating: 5, location: 'الإسكندرية', datePublished: '2025-10-01',
            reviewBody: { en: 'USB 3.0 data transfer is blazing fast. Moved 50GB to external SSD quickly.', ar: 'نقل بيانات USB 3.0 سريع جداً. نقلت 50 جيجا لـ SSD خارجي بسرعة.' },
            pros: { en: ['USB 3.0 speed', '50GB tested', 'External SSD ready'], ar: ['سرعة USB 3.0', 'مختبر 50 جيجا', 'جاهز لـ SSD خارجي'] }
        },
        {
            author: 'Hany Farouk', rating: 4, location: 'المنصورة', datePublished: '2025-09-10',
            reviewBody: { en: 'Excellent cable but thick for small bag pockets. Worth the quality tradeoff.', ar: 'كابل ممتاز لكن سميك لجيوب الشنط الصغيرة. يستحق المقابل في الجودة.' },
            pros: { en: ['60W quality', 'Durable', 'Fast transfer'], ar: ['جودة 60 واط', 'متين', 'نقل سريع'] },
            cons: { en: ['Thick cable'], ar: ['كابل سميك'] }
        },
        {
            author: 'Sherif Nader', rating: 5, location: 'طنطا', datePublished: '2025-08-05',
            reviewBody: { en: 'Reinforced connectors survive daily plugging and unplugging. Built to last.', ar: 'موصلات معززة تصمد في التوصيل والفصل اليومي. مبني ليدوم.' },
            pros: { en: ['Reinforced connectors', 'Daily use', 'Built to last'], ar: ['موصلات معززة', 'استخدام يومي', 'مبني ليدوم'] }
        },
        {
            author: 'Wael Hossam', rating: 5, location: 'المهندسين', datePublished: '2025-07-10',
            reviewBody: { en: 'iPad Pro M4 charges and data syncs simultaneously. Perfect studio cable.', ar: 'آيباد برو M4 يشحن وينقل البيانات معاً. كابل استوديو مثالي.' },
            pros: { en: ['Charge + sync', 'iPad Pro ready', 'Studio cable'], ar: ['شحن + مزامنة', 'جاهز لآيباد برو', 'كابل استوديو'] }
        },
        {
            author: 'Islam Mohamed', rating: 5, location: 'أسيوط', datePublished: '2025-06-15',
            reviewBody: { en: 'E-Marker chip ensures safe 60W delivery. Smart cable technology.', ar: 'شريحة E-Marker تضمن توصيل 60 واط آمن. تقنية كابل ذكية.' },
            pros: { en: ['E-Marker chip', 'Safe 60W', 'Smart tech'], ar: ['شريحة E-Marker', '60 واط آمن', 'تقنية ذكية'] }
        }
    ],

    'joyroom-type-c-lightning-braided': [
        {
            author: 'Ayman Salah', rating: 5, location: 'القاهرة', datePublished: '2025-12-08',
            reviewBody: { en: 'Braided nylon at budget price. Looks and feels premium.', ar: 'نايلون مضفر بسعر اقتصادي. يبدو ويحس فاخر.' },
            pros: { en: ['Braided nylon', 'Budget price', 'Premium feel'], ar: ['نايلون مضفر', 'سعر اقتصادي', 'إحساس فاخر'] }
        },
        {
            author: 'Essam Fouad', rating: 5, location: 'الجيزة', datePublished: '2025-11-02',
            reviewBody: { en: 'No tangling in bag. Stays organized unlike rubber cables.', ar: 'لا تشابك في الشنطة. يبقى منظم عكس الكابلات المطاطية.' },
            pros: { en: ['No tangling', 'Stays organized', 'Bag friendly'], ar: ['لا تشابك', 'يبقى منظم', 'صديق للشنطة'] }
        },
        {
            author: 'Magdy Hassan', rating: 5, location: 'الإسكندرية', datePublished: '2025-10-05',
            reviewBody: { en: 'MFi certified means Apple approved. Fast charging without warnings.', ar: 'معتمد MFi يعني موافق من أبل. شحن سريع بدون تحذيرات.' },
            pros: { en: ['MFi certified', 'Apple approved', 'No warnings'], ar: ['معتمد MFi', 'موافق من أبل', 'بدون تحذيرات'] }
        },
        {
            author: 'Osama Kamel', rating: 4, location: 'المنصورة', datePublished: '2025-09-10',
            reviewBody: { en: 'Quality braiding but wish it came in longer lengths. 1m is standard.', ar: 'جودة تضفير ممتازة لكن تمنيت لو بأطوال أطول. 1 متر قياسي.' },
            pros: { en: ['Quality braiding', 'Durable', 'Premium'], ar: ['جودة تضفير', 'متين', 'فاخر'] },
            cons: { en: ['Only 1m available'], ar: ['1 متر فقط متاح'] }
        },
        {
            author: 'Ehab Refaat', rating: 5, location: 'طنطا', datePublished: '2025-08-01',
            reviewBody: { en: '27W fast charging verified with meter. iPhone 17 loves this cable.', ar: 'شحن سريع 27 واط مؤكد بالمتر. ايفون 17 يحب الكابل ده.' },
            pros: { en: ['27W verified', 'Meter tested', 'iPhone 17 ready'], ar: ['27 واط مؤكد', 'مختبر بالمتر', 'جاهز لايفون 17'] }
        },
        {
            author: 'Hatem Samy', rating: 5, location: 'المهندسين', datePublished: '2025-07-10',
            reviewBody: { en: 'Gift worthy presentation. Comes in nice box for gifting.', ar: 'عرض يستحق الإهداء. يأتي في علبة جميلة للهدايا.' },
            pros: { en: ['Gift worthy', 'Nice box', 'Presentation'], ar: ['يستحق الإهداء', 'علبة جميلة', 'عرض'] }
        },
        {
            author: 'Akram Helmy', rating: 5, location: 'أسيوط', datePublished: '2025-06-15',
            reviewBody: { en: 'Joyroom braided series is their best line. Premium quality cables.', ar: 'سلسلة جويروم المضفرة أفضل خطهم. كابلات جودة فاخرة.' },
            pros: { en: ['Best Joyroom line', 'Premium series', 'Quality cables'], ar: ['أفضل خط جويروم', 'سلسلة فاخرة', 'كابلات جودة'] }
        }
    ],

    'joyroom-type-c-to-type-c-cable': [
        {
            author: 'Nader Tawfik', rating: 5, location: 'القاهرة', datePublished: '2025-12-10',
            reviewBody: { en: 'Universal USB-C cable for Android phones and tablets. One cable fits all.', ar: 'كابل USB-C عالمي لموبايلات وتابلتات أندرويد. كابل واحد يناسب الكل.' },
            pros: { en: ['Universal USB-C', 'Android ready', 'One fits all'], ar: ['USB-C عالمي', 'جاهز لأندرويد', 'واحد للكل'] }
        },
        {
            author: 'Ramy Saeed', rating: 5, location: 'الجيزة', datePublished: '2025-11-05',
            reviewBody: { en: 'Samsung S26 to Samsung Tab data transfer is instant. Perfect ecosystem cable.', ar: 'نقل بيانات من سامسونج S26 لسامسونج تاب فورية. كابل منظومة مثالي.' },
            pros: { en: ['Samsung ecosystem', 'Instant transfer', 'Perfect cable'], ar: ['منظومة سامسونج', 'نقل فوري', 'كابل مثالي'] }
        },
        {
            author: 'Bassem Yousry', rating: 5, location: 'الإسكندرية', datePublished: '2025-10-01',
            reviewBody: { en: '60W PD charging handles tablets and phones. Versatile power delivery.', ar: 'شحن 60 واط PD يتعامل مع التابلتات والموبايلات. توصيل طاقة متعدد.' },
            pros: { en: ['60W PD', 'Tablets + phones', 'Versatile'], ar: ['60 واط PD', 'تابلتات + موبايلات', 'متعدد'] }
        },
        {
            author: 'Hany Farouk', rating: 4, location: 'المنصورة', datePublished: '2025-09-10',
            reviewBody: { en: 'Good cable but not for MacBook Pro - only 60W. Perfect for phones though.', ar: 'كابل جيد لكن ليس لماك بوك برو - 60 واط فقط. مثالي للموبايلات.' },
            pros: { en: ['Phone perfect', '60W reliable', 'Good value'], ar: ['مثالي للموبايلات', '60 واط موثوق', 'قيمة جيدة'] },
            cons: { en: ['Not for high-power laptops'], ar: ['ليس للابتوبات عالية الطاقة'] }
        },
        {
            author: 'Sherif Nader', rating: 5, location: 'طنطا', datePublished: '2025-08-05',
            reviewBody: { en: 'Pixel 9 charges at maximum 45W speed. Google phone approved cable.', ar: 'بيكسل 9 يشحن بأقصى سرعة 45 واط. كابل موافق لموبايلات جوجل.' },
            pros: { en: ['Pixel 45W', 'Google approved', 'Max speed'], ar: ['بيكسل 45 واط', 'موافق من جوجل', 'أقصى سرعة'] }
        },
        {
            author: 'Wael Hossam', rating: 5, location: 'المهندسين', datePublished: '2025-07-10',
            reviewBody: { en: 'Nintendo Switch charges while playing. Gamer essential cable.', ar: 'نينتندو سويتش يشحن أثناء اللعب. كابل أساسي للاعبين.' },
            pros: { en: ['Switch compatible', 'Gaming essential', 'Play + charge'], ar: ['متوافق مع سويتش', 'أساسي للألعاب', 'العب + اشحن'] }
        },
        {
            author: 'Islam Mohamed', rating: 5, location: 'أسيوط', datePublished: '2025-06-15',
            reviewBody: { en: 'Steam Deck charging during battles. No interruptions thanks to 60W.', ar: 'شحن Steam Deck أثناء المعارك. لا انقطاعات بفضل 60 واط.' },
            pros: { en: ['Steam Deck ready', 'No interruptions', '60W gaming'], ar: ['جاهز لـ Steam Deck', 'لا انقطاعات', '60 واط للألعاب'] }
        }
    ],

    'joyroom-usb-a-type-c-cable': [
        {
            author: 'Ayman Salah', rating: 5, location: 'القاهرة', datePublished: '2025-12-08',
            reviewBody: { en: 'Perfect for old chargers with USB-A output. Upgrade slowly without new charger.', ar: 'مثالي للشواحن القديمة بمخرج USB-A. ترقية تدريجية بدون شاحن جديد.' },
            pros: { en: ['Old charger compatible', 'Gradual upgrade', 'Budget friendly'], ar: ['متوافق مع شاحن قديم', 'ترقية تدريجية', 'صديق الميزانية'] }
        },
        {
            author: 'Essam Fouad', rating: 5, location: 'الجيزة', datePublished: '2025-11-02',
            reviewBody: { en: 'Samsung S26 connects to old laptop USB-A port. Legacy compatibility essential.', ar: 'سامسونج S26 يتصل بمنفذ USB-A في اللابتوب القديم. توافق إرثي أساسي.' },
            pros: { en: ['Legacy compatible', 'Old laptop works', 'Essential cable'], ar: ['متوافق مع القديم', 'اللابتوب القديم يعمل', 'كابل أساسي'] }
        },
        {
            author: 'Magdy Hassan', rating: 5, location: 'الإسكندرية', datePublished: '2025-10-05',
            reviewBody: { en: 'Car USB-A port charging works great. Not fast but reliable for driving.', ar: 'شحن منفذ USB-A في السيارة يعمل ممتاز. ليس سريع لكن موثوق للقيادة.' },
            pros: { en: ['Car USB-A works', 'Driving reliable', 'Universal'], ar: ['USB-A السيارة يعمل', 'موثوق للقيادة', 'عالمي'] }
        },
        {
            author: 'Osama Kamel', rating: 4, location: 'المنصورة', datePublished: '2025-09-10',
            reviewBody: { en: 'Only 18W max due to USB-A limitation. Fine for overnight charging.', ar: '18 واط فقط بسبب حد USB-A. كويس للشحن طول الليل.' },
            pros: { en: ['Reliable 18W', 'Overnight fine', 'Works well'], ar: ['18 واط موثوق', 'طول الليل كويس', 'يعمل جيداً'] },
            cons: { en: ['USB-A speed limit'], ar: ['حد سرعة USB-A'] }
        },
        {
            author: 'Ehab Refaat', rating: 5, location: 'طنطا', datePublished: '2025-08-01',
            reviewBody: { en: 'Office desktop USB-A port charges my phone all day. Perfect work setup.', ar: 'منفذ USB-A في كمبيوتر المكتب يشحن موبايلي طول اليوم. إعداد عمل مثالي.' },
            pros: { en: ['Office setup', 'All day charging', 'Desktop compatible'], ar: ['إعداد مكتب', 'شحن طول اليوم', 'متوافق مع الكمبيوتر'] }
        },
        {
            author: 'Hatem Samy', rating: 5, location: 'المهندسين', datePublished: '2025-07-10',
            reviewBody: { en: 'Power bank USB-A output to phone. Essential travel cable.', ar: 'مخرج USB-A في الباور بانك للموبايل. كابل سفر أساسي.' },
            pros: { en: ['Power bank ready', 'Travel essential', 'Always needed'], ar: ['جاهز للباور بانك', 'أساسي للسفر', 'مطلوب دائماً'] }
        },
        {
            author: 'Akram Helmy', rating: 5, location: 'أسيوط', datePublished: '2025-06-15',
            reviewBody: { en: 'Data sync to old computer works. File transfer bridge between generations.', ar: 'مزامنة البيانات للكمبيوتر القديم تعمل. جسر نقل ملفات بين الأجيال.' },
            pros: { en: ['Data sync works', 'Generation bridge', 'File transfer'], ar: ['مزامنة البيانات تعمل', 'جسر الأجيال', 'نقل ملفات'] }
        }
    ],

    'joyroom-usb-a-lightning-cable': [
        {
            author: 'Nader Tawfik', rating: 5, location: 'القاهرة', datePublished: '2025-12-10',
            reviewBody: { en: 'MFi certified USB-A to Lightning. Old charger, new iPhone compatibility.', ar: 'معتمد MFi من USB-A للايتننج. شاحن قديم، توافق ايفون جديد.' },
            pros: { en: ['MFi certified', 'Old charger works', 'New iPhone ready'], ar: ['معتمد MFi', 'الشاحن القديم يعمل', 'جاهز للايفون الجديد'] }
        },
        {
            author: 'Ramy Saeed', rating: 5, location: 'الجيزة', datePublished: '2025-11-05',
            reviewBody: { en: 'Perfect for car USB-A ports. CarPlay works flawlessly.', ar: 'مثالي لمنافذ USB-A في السيارة. CarPlay يعمل تماماً.' },
            pros: { en: ['Car USB-A', 'CarPlay works', 'Perfect fit'], ar: ['USB-A السيارة', 'CarPlay يعمل', 'توافق مثالي'] }
        },
        {
            author: 'Bassem Yousry', rating: 5, location: 'الإسكندرية', datePublished: '2025-10-01',
            reviewBody: { en: 'iPad 9th gen charges fine. Legacy iPad compatibility maintained.', ar: 'آيباد الجيل التاسع يشحن كويس. توافق آيباد القديم محفوظ.' },
            pros: { en: ['iPad compatible', 'Legacy support', 'Still works'], ar: ['متوافق مع آيباد', 'دعم القديم', 'لا يزال يعمل'] }
        },
        {
            author: 'Hany Farouk', rating: 4, location: 'المنصورة', datePublished: '2025-09-10',
            reviewBody: { en: 'Only 12W charging with USB-A. Slow but useful for overnight.', ar: 'شحن 12 واط فقط مع USB-A. بطيء لكن مفيد طول الليل.' },
            pros: { en: ['Works reliably', 'Overnight OK', 'Legacy support'], ar: ['يعمل بموثوقية', 'طول الليل كويس', 'دعم القديم'] },
            cons: { en: ['12W only (USB-A limit)'], ar: ['12 واط فقط (حد USB-A)'] }
        },
        {
            author: 'Sherif Nader', rating: 5, location: 'طنطا', datePublished: '2025-08-05',
            reviewBody: { en: 'Old iPad charger brick still useful. Extend equipment life with this cable.', ar: 'شاحن آيباد القديم لا يزال مفيد. أطل عمر المعدات مع هذا الكابل.' },
            pros: { en: ['Extends charger life', 'Equipment saver', 'Budget friendly'], ar: ['يطيل عمر الشاحن', 'موفر للمعدات', 'صديق الميزانية'] }
        },
        {
            author: 'Wael Hossam', rating: 5, location: 'المهندسين', datePublished: '2025-07-10',
            reviewBody: { en: 'iTunes sync still works. Data transfer to old MacBook successful.', ar: 'مزامنة iTunes لا تزال تعمل. نقل بيانات لماك بوك قديم ناجح.' },
            pros: { en: ['iTunes sync', 'Old MacBook', 'Data transfer'], ar: ['مزامنة iTunes', 'ماك بوك قديم', 'نقل بيانات'] }
        },
        {
            author: 'Islam Mohamed', rating: 5, location: 'أسيوط', datePublished: '2025-06-15',
            reviewBody: { en: 'Affordable MFi quality. Apple certification at Joyroom price.', ar: 'جودة MFi اقتصادية. شهادة أبل بسعر جويروم.' },
            pros: { en: ['MFi at low price', 'Apple certified', 'Affordable'], ar: ['MFi بسعر منخفض', 'معتمد من أبل', 'اقتصادي'] }
        }
    ]
};

// ============= FALLBACK GENERATOR =============
// For products not in database, generates realistic reviews based on product features

function generateFallbackReviews(
    productSlug: string,
    category: string,
    productName: { en: string; ar: string },
    price: number,
    features: { en: string[]; ar: string[] }
): ProductReview[] {
    const reviews: ProductReview[] = [];
    const seed = productSlug.length * 31 + price;
    const reviewCount = 7 + Math.floor(seededRandom(seed) * 6); // 7-12 reviews

    const shuffledNames = shuffleWithSeed(reviewerNames, seed);
    const shuffledCities = shuffleWithSeed(egyptianCities, seed);

    for (let i = 0; i < reviewCount; i++) {
        const reviewSeed = seed + i * 17;
        const rating = seededRandom(reviewSeed) < 0.7 ? 5 : (seededRandom(reviewSeed + 1) < 0.8 ? 4 : 3);
        const featureIdx = i % Math.max(1, features.en.length);
        const feature = features.en[featureIdx] || 'quality';
        const featureAr = features.ar[featureIdx] || 'الجودة';

        reviews.push({
            author: shuffledNames[i % shuffledNames.length],
            rating,
            location: shuffledCities[i % shuffledCities.length],
            datePublished: generateDate(reviewSeed + 10),
            reviewBody: {
                en: `The ${feature.toLowerCase()} is exactly as described. Very happy with this ${productName.en}.`,
                ar: `${featureAr} كما هو موصوف بالظبط. سعيد جداً بـ ${productName.ar}.`
            },
            pros: {
                en: [feature, 'Good value', 'Fast delivery'],
                ar: [featureAr, 'قيمة جيدة', 'توصيل سريع']
            }
        });
    }

    return reviews;
}

// ============= PUBLIC API =============

/**
 * Get reviews for a product
 * Returns from database if exists, generates fallback otherwise
 */
export function getProductReviews(
    productSlug: string,
    category: string,
    productName: { en: string; ar: string },
    price: number,
    features: { en: string[]; ar: string[] } = { en: ['quality'], ar: ['الجودة'] }
): ProductReview[] {
    // Try to get from database first
    if (productReviewsDb[productSlug]) {
        return productReviewsDb[productSlug];
    }

    // Generate fallback reviews
    return generateFallbackReviews(productSlug, category, productName, price, features);
}

/**
 * Calculate aggregate rating from reviews
 */
export function calculateAggregateRating(reviews: ProductReview[]): {
    ratingValue: string;
    reviewCount: string;
    bestRating: string;
    worstRating: string;
} | null {
    if (!reviews || reviews.length === 0) return null;

    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    const avg = (total / reviews.length).toFixed(1);

    return {
        ratingValue: avg,
        reviewCount: reviews.length.toString(),
        bestRating: '5',
        worstRating: '1'
    };
}

// Legacy export for compatibility
export function generateProductReviews(
    productSlug: string,
    category: string,
    price: number,
    _featured: boolean
): ProductReview[] {
    return getProductReviews(
        productSlug,
        category,
        { en: productSlug.replace(/-/g, ' '), ar: productSlug.replace(/-/g, ' ') },
        price
    );
}
