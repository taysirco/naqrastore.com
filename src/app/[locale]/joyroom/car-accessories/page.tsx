import CategoryTemplate from '@/components/CategoryTemplate';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    if (locale === 'en') {
        return {
            title: 'Joyroom Car Accessories Egypt | Car Charger, Holder',
            description: 'Shop Joyroom car accessories in Egypt. Car charger, phone holder. Affordable prices.',
            keywords: 'joyroom car charger, joyroom car holder, car accessories egypt',
        };
    }

    return {
        title: 'اكسسوارات سيارة جوي روم | Joyroom Car Accessories Egypt',
        description: 'تسوق اكسسوارات سيارة جوي روم في مصر. شاحن سيارة joyroom, joyroom car holder حامل موبايل للسيارة.',
        keywords: 'شاحن سيارة joyroom, joyroom car holder, اكسسوارات سيارة, حامل موبايل سيارة',
    };
}

const seoContent = {
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
};

export default function JoyroomCarAccessoriesPage() {
    return (
        <CategoryTemplate
            brand="Joyroom"
            brandColor="red"
            category="Car Accessories"
            categorySlug="car-accessories"
            seoContent={seoContent}
        />
    );
}
