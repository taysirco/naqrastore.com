import CategoryTemplate from '@/components/CategoryTemplate';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    if (locale === 'en') {
        return {
            title: 'Anker Charger Egypt | 20W iPhone, 25W Samsung',
            description: 'Shop original Anker Charger in Egypt. Anker Nano 20W for iPhone, Anker 25W for Samsung. Fast charging with official warranty.',
            keywords: 'anker charger, anker 20w charger, anker nano, anker charger iphone, anker 25w, charger egypt',
        };
    }

    return {
        title: 'شاحن انكر | Anker Charger Egypt - شاحن انكر 20 وات ايفون',
        description: 'تسوق شاحن انكر الأصلي في مصر. شاحن انكر 20 وات, شاحن انكر ايفون, راس شاحن انكر, شاحن انكر 25 واط سامسونج. Anker Nano 20W.',
        keywords: 'شاحن انكر, شاحن انكر ايفون, شاحن انكر 20 وات, راس شاحن انكر, شاحن انكر 25 واط, شاحن انكر تايب سي, شاحن ايفون اصلي, شاحن سريع',
    };
}

const seoContent = {
    ar: {
        title: 'شاحن انكر الأصلي',
        subtitle: 'Anker Charger - الشحن السريع بجودة عالمية',
        description: `
      اكتشف **شاحن انكر** الأصلي في مصر - العلامة الأولى في الشحن السريع!
      
      **الأكثر مبيعاً:**
      - **شاحن انكر 20 وات** - الأمثل لـ iPhone 15/14/13
      - **شاحن انكر 25 واط** - للسامسونج Galaxy
      - **راس شاحن انكر** تايب سي للشحن السريع
    `,
        products: [
            { name: 'Anker Nano 20W', price: 350, badge: 'الأكثر مبيعاً iPhone' },
            { name: 'Anker 25W Samsung', price: 400, badge: 'Galaxy Series' },
            { name: 'Anker 65W GaN', price: 850, badge: 'Multi-Device' },
            { name: 'Anker 45W Type-C', price: 550, badge: 'شحن سريع جداً' },
        ]
    },
    en: {
        title: 'Anker Charger Original',
        subtitle: 'Fast Charging with World-Class Quality',
        description: `
      Discover the original **Anker Charger** in Egypt - the #1 brand in fast charging!
      
      **Best Sellers:**
      - **Anker 20W Charger** - Perfect for iPhone 15/14/13
      - **Anker 25W Charger** - For Samsung Galaxy
      - **Anker Type-C** fast charging head
    `,
        products: [
            { name: 'Anker Nano 20W', price: 350, badge: 'Best for iPhone' },
            { name: 'Anker 25W Samsung', price: 400, badge: 'Galaxy Series' },
            { name: 'Anker 65W GaN', price: 850, badge: 'Multi-Device' },
            { name: 'Anker 45W Type-C', price: 550, badge: 'Ultra Fast' },
        ]
    }
};

export default function AnkerWallChargersPage() {
    return (
        <CategoryTemplate
            brand="Anker"
            brandColor="blue"
            category="Wall Chargers"
            categorySlug="wall-chargers"
            seoContent={seoContent}
        />
    );
}
