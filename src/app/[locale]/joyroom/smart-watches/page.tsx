import CategoryTemplate from '@/components/CategoryTemplate';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    if (locale === 'en') {
        return {
            title: 'Joyroom Smart Watch Egypt | Fitness Tracker',
            description: 'Shop Joyroom Smart Watch in Egypt. Fitness tracker, health monitoring. Affordable prices.',
            keywords: 'joyroom smart watch, joyroom watch, fitness tracker, smart watch egypt',
        };
    }

    return {
        title: 'ساعات جوي روم الذكية | Joyroom Smart Watch Egypt',
        description: 'تسوق ساعات جوي روم الذكية في مصر. ساعة ذكية Joyroom بمميزات رائعة وسعر اقتصادي.',
        keywords: 'ساعة جوي روم, ساعة ذكية, joyroom smart watch, fitness tracker',
    };
}

const seoContent = {
    ar: {
        title: 'ساعات جوي روم الذكية',
        subtitle: 'Joyroom Smart Watch - الأناقة تلتقي بالذكاء',
        description: `
      اكتشف **ساعات جوي روم الذكية** في مصر!
      
      **المميزات:**
      - تتبع اللياقة البدنية والرياضة
      - مراقبة صحة القلب والنوم
      - إجراء واستقبال المكالمات
      - تصميم أنيق وخفيف
    `,
        products: [
            { name: 'Joyroom Smart Watch', price: 800, badge: 'جديد' },
            { name: 'Joyroom Fitness Band', price: 400, badge: 'اقتصادي' },
        ]
    },
    en: {
        title: 'Joyroom Smart Watches',
        subtitle: 'Style Meets Intelligence',
        description: `
      Discover **Joyroom Smart Watches** in Egypt!
      
      **Features:**
      - Fitness and sports tracking
      - Heart and sleep monitoring
      - Make and receive calls
      - Sleek and lightweight design
    `,
        products: [
            { name: 'Joyroom Smart Watch', price: 800, badge: 'New' },
            { name: 'Joyroom Fitness Band', price: 400, badge: 'Budget' },
        ]
    }
};

export default function JoyroomSmartWatchesPage() {
    return (
        <CategoryTemplate
            brand="Joyroom"
            brandColor="red"
            category="Smart Watches"
            categorySlug="smart-watches"
            seoContent={seoContent}
        />
    );
}
