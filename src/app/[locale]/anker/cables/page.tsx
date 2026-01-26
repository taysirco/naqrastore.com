import CategoryTemplate from '@/components/CategoryTemplate';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    if (locale === 'en') {
        return {
            title: 'Anker Cable Egypt | Lightning, USB-C, PowerLine',
            description: 'Shop original Anker cables in Egypt. Anker PowerLine Lightning, USB-C cables. Lifetime warranty. Best prices.',
            keywords: 'anker cable, anker lightning cable, anker type c cable, anker powerline, cable egypt',
        };
    }

    return {
        title: 'كابل انكر | Anker Cable Egypt - وصلة انكر للايفون',
        description: 'تسوق كابل انكر الأصلي في مصر. وصلة انكر للايفون, كابل شاحن انكر, anker type c cable, وصلة شاحن انكر بأفضل سعر.',
        keywords: 'وصلة انكر للايفون, وصلة شاحن انكر, كابل شاحن انكر, anker type c cable, كابل انكر ايفون, وصلة شاحن, وصلة ايفون',
    };
}

const seoContent = {
    ar: {
        title: 'كابل انكر الأصلي',
        subtitle: 'Anker Cable - المتانة التي لا تُقارن',
        description: `
      اكتشف **كابل انكر** الأصلي في مصر - الأقوى والأكثر متانة!
      
      **لماذا كابل انكر؟**
      - يتحمل أكثر من 12,000 ثني
      - شحن سريع يصل إلى 100 واط
      - ألياف الكيفلار للمتانة القصوى
      - ضمان مدى الحياة
    `,
        products: [
            { name: 'Anker PowerLine Lightning', price: 200, badge: 'iPhone' },
            { name: 'Anker USB-C to USB-C', price: 180, badge: 'Type-C' },
            { name: 'Anker USB-C to Lightning', price: 250, badge: 'Fast Charge iPhone' },
            { name: 'Anker PowerLine 3m', price: 220, badge: 'طويل' },
        ]
    },
    en: {
        title: 'Anker Cable Original',
        subtitle: 'Unmatched Durability',
        description: `
      Discover the original **Anker Cable** in Egypt - the strongest and most durable!
      
      **Why Anker Cable?**
      - Withstands 12,000+ bends
      - Fast charging up to 100W
      - Kevlar fiber for ultimate durability
      - Lifetime warranty
    `,
        products: [
            { name: 'Anker PowerLine Lightning', price: 200, badge: 'iPhone' },
            { name: 'Anker USB-C to USB-C', price: 180, badge: 'Type-C' },
            { name: 'Anker USB-C to Lightning', price: 250, badge: 'Fast Charge iPhone' },
            { name: 'Anker PowerLine 3m', price: 220, badge: 'Extra Long' },
        ]
    }
};

export default function AnkerCablesPage() {
    return (
        <CategoryTemplate
            brand="Anker"
            brandColor="blue"
            category="Cables"
            categorySlug="cables"
            seoContent={seoContent}
        />
    );
}
