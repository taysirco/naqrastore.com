import CategoryTemplate from '@/components/CategoryTemplate';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    if (locale === 'en') {
        return {
            title: 'Anker Power Bank Egypt | PowerCore 20000mAh, 10000mAh',
            description: 'Shop original Anker Power Bank in Egypt. Anker PowerCore 20000mAh, 10000mAh, Prime & 737. Fast charging with official warranty. Best prices.',
            keywords: 'anker power bank, anker power bank 20000mah, anker powercore, anker prime power bank, anker 737 power bank, power bank egypt',
        };
    }

    return {
        title: 'باور بانك انكر | Anker Power Bank Egypt - أفضل أسعار 2024',
        description: 'تسوق باور بانك انكر الأصلي في مصر. باور بانك انكر 20000 و 10000 مللي أمبير بأفضل الأسعار. شحن سريع وضمان أصلي.',
        keywords: 'باور بانك انكر, باور بانك انكر 20000, باور بانك انكر 10000, سعر باور بانك انكر, انكر باور بانك, باور بانك, افضل باور بانك',
    };
}

const seoContent = {
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
};

export default function AnkerPowerBanksPage() {
    return (
        <CategoryTemplate
            brand="Anker"
            brandColor="blue"
            category="Power Banks"
            categorySlug="power-banks"
            seoContent={seoContent}
        />
    );
}
