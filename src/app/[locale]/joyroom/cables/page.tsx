import CategoryTemplate from '@/components/CategoryTemplate';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    if (locale === 'en') {
        return {
            title: 'Joyroom Cable Egypt | Lightning, USB-C',
            description: 'Shop original Joyroom cables in Egypt. Lightning, USB-C cables at affordable prices.',
            keywords: 'joyroom cable, joyroom lightning cable, joyroom type c cable, cable egypt',
        };
    }

    return {
        title: 'كابل جوي روم | Joyroom Cable Egypt - وصلة جيروم',
        description: 'تسوق كابل جوي روم الأصلي في مصر. وصلة جيروم للآيفون وتايب سي بأفضل سعر.',
        keywords: 'كابل جوي روم, وصلة جيروم, وصلة شاحن, كابل شحن',
    };
}

const seoContent = {
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
};

export default function JoyroomCablesPage() {
    return (
        <CategoryTemplate
            brand="Joyroom"
            brandColor="red"
            category="Cables"
            categorySlug="cables"
            seoContent={seoContent}
        />
    );
}
