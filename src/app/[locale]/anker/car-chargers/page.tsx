import CategoryTemplate from '@/components/CategoryTemplate';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    if (locale === 'en') {
        return {
            title: 'Anker Car Charger Egypt | Fast Charging 48W',
            description: 'Shop original Anker Car Charger in Egypt. Fast charging 48W, dual ports. Official warranty.',
            keywords: 'anker car charger, car charger egypt, fast car charger, anker powerdrive',
        };
    }

    return {
        title: 'شاحن سيارة انكر | Anker Car Charger Egypt - شحن سريع',
        description: 'تسوق شاحن سيارة انكر الأصلي في مصر. شاحن سيارة انكر سريع، Anker Car Charger بأفضل سعر. شاحن سيارة سريع.',
        keywords: 'شاحن سيارة انكر, شاحن سيارة سريع, anker car charger, شاحن سيارة',
    };
}

const seoContent = {
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
};

export default function AnkerCarChargersPage() {
    return (
        <CategoryTemplate
            brand="Anker"
            brandColor="blue"
            category="Car Chargers"
            categorySlug="car-chargers"
            seoContent={seoContent}
        />
    );
}
