import CategoryTemplate from '@/components/CategoryTemplate';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    if (locale === 'en') {
        return {
            title: 'Joyroom Power Bank Egypt | 20000mAh, 10000mAh',
            description: 'Shop original Joyroom Power Bank in Egypt. Joyroom 20000mAh, 10000mAh power banks. Affordable quality with warranty. Best prices.',
            keywords: 'joyroom power bank, joyroom power bank 10000, joyroom power bank 20000, power bank egypt',
        };
    }

    return {
        title: 'باور بانك جوي روم | Joyroom Power Bank Egypt - أسعار 2024',
        description: 'تسوق باور بانك جوي روم الأصلي في مصر. باور بانك جوي روم 20000 و 10000 مللي أمبير بأفضل الأسعار. باور بانك جيروم.',
        keywords: 'باور بانك جوي روم 10000, باور بانك جوي روم 20000, باور بانك جيروم, سعر باور بانك joyroom, joyroom power bank',
    };
}

const seoContent = {
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
};

export default function JoyroomPowerBanksPage() {
    return (
        <CategoryTemplate
            brand="Joyroom"
            brandColor="red"
            category="Power Banks"
            categorySlug="power-banks"
            seoContent={seoContent}
        />
    );
}
