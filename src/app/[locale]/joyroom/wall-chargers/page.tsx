import CategoryTemplate from '@/components/CategoryTemplate';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    if (locale === 'en') {
        return {
            title: 'Joyroom Charger Egypt | Fast Charging 20W',
            description: 'Shop original Joyroom Charger in Egypt. Fast charging 20W, affordable prices. Official warranty.',
            keywords: 'joyroom charger, joyroom 20w, charger egypt, fast charger',
        };
    }

    return {
        title: 'شاحن جوي روم | Joyroom Charger Egypt - شاحن جيروم سريع',
        description: 'تسوق شاحن جوي روم الأصلي في مصر. شاحن joyroom, شاحن جيروم سريع, joyroom charger بأفضل الأسعار.',
        keywords: 'شاحن joyroom, شاحن جوي روم, شاحن جيروم, joyroom charger, شاحن سريع',
    };
}

const seoContent = {
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
};

export default function JoyroomWallChargersPage() {
    return (
        <CategoryTemplate
            brand="Joyroom"
            brandColor="red"
            category="Wall Chargers"
            categorySlug="wall-chargers"
            seoContent={seoContent}
        />
    );
}
