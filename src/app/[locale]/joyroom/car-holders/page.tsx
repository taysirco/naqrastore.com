import CategoryTemplate from '@/components/CategoryTemplate';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    if (locale === 'en') {
        return {
            title: 'Joyroom Car Phone Holders Egypt | Magnetic Mounts, Air Vent',
            description: 'Shop Joyroom car phone holders in Egypt. Magnetic mounts, air vent holders, dashboard mounts. Strong grip, 360° rotation. Best prices with warranty.',
            keywords: 'joyroom car holder, car phone mount, magnetic car holder, air vent mount, حامل جوال سيارة, car mount egypt',
            openGraph: {
                title: 'Joyroom Car Phone Holders Egypt | Magnetic Mounts',
                description: 'Premium Joyroom car phone holders with strong magnetic grip. 360° rotation, easy installation. Best prices in Egypt.',
                locale: 'en_US',
                type: 'website',
            },
        };
    }

    return {
        title: 'حوامل جوال للسيارة جوي روم | حامل مغناطيسي، حامل تكييف مصر',
        description: 'تسوق حوامل جوال للسيارة جوي روم في مصر. حوامل مغناطيسية، حوامل فتحة التكييف، حوامل الدتابورد. قبضة قوية، دوران 360 درجة. أفضل سعر مع ضمان.',
        keywords: 'حامل جوال سيارة, حامل موبايل للسيارة, حامل جوي روم, حامل مغناطيسي, joyroom car holder, car phone mount',
        openGraph: {
            title: 'حوامل جوال للسيارة جوي روم | حامل مغناطيسي مصر',
            description: 'حوامل جوال جوي روم الأصلية للسيارة بقبضة مغناطيسية قوية. دوران 360 درجة، تركيب سهل. أفضل سعر في مصر.',
            locale: 'ar_EG',
            type: 'website',
        },
    };
}

const seoContent = {
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
};

export default function JoyroomCarHoldersPage() {
    return (
        <CategoryTemplate
            brand="Joyroom"
            brandColor="red"
            category="Car Holders"
            categorySlug="car-holders"
            seoContent={seoContent}
        />
    );
}
