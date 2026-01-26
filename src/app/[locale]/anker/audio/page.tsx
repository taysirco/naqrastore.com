import CategoryTemplate from '@/components/CategoryTemplate';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    if (locale === 'en') {
        return {
            title: 'Anker Soundcore Earbuds Egypt | R50i, P20i, Liberty',
            description: 'Shop Anker Soundcore earbuds in Egypt. Anker R50i, P20i, Liberty. Premium audio quality with official warranty. Best prices.',
            keywords: 'anker soundcore, anker earbuds, anker r50i, soundcore r50i, anker p20i, anker liberty',
        };
    }

    return {
        title: 'سماعات انكر Soundcore | Anker Earbuds Egypt - R50i, P20i',
        description: 'تسوق سماعات انكر Soundcore الأصلية في مصر. anker soundcore, سماعة انكر, anker r50i, soundcore r50i, anker p20i. سماعة انكر بلوتوث بأفضل سعر.',
        keywords: 'anker soundcore, سماعة انكر, سماعات انكر, anker r50i, soundcore r50i, anker p20i, سماعة انكر بلوتوث',
    };
}

const seoContent = {
    ar: {
        title: 'سماعات انكر Soundcore',
        subtitle: 'Anker Soundcore - جودة صوت استثنائية',
        description: `
      اكتشف **سماعات انكر Soundcore** الأصلية في مصر - العلامة التجارية الأولى عالمياً في الصوتيات.
      
      **لماذا Anker Soundcore؟**
      - تقنية BassUp للصوت العميق
      - إلغاء الضوضاء النشط (ANC)
      - بطارية طويلة الأمد
      - مقاومة للماء IPX5
      - ضمان انكر الرسمي
    `,
        products: [
            { name: 'Anker Soundcore R50i', price: 600, badge: 'اقتصادي ناجح' },
            { name: 'Anker Soundcore P20i', price: 500, badge: 'Best Value' },
            { name: 'Anker Liberty 4', price: 2500, badge: 'Premium ANC' },
        ]
    },
    en: {
        title: 'Anker Soundcore Earbuds',
        subtitle: 'Exceptional Audio Quality',
        description: `
      Discover the original **Anker Soundcore** earbuds in Egypt - the world's #1 audio brand.
      
      **Why Anker Soundcore?**
      - BassUp technology for deep sound
      - Active Noise Cancellation (ANC)
      - Long-lasting battery
      - IPX5 water resistance
      - Official Anker warranty
    `,
        products: [
            { name: 'Anker Soundcore R50i', price: 600, badge: 'Budget King' },
            { name: 'Anker Soundcore P20i', price: 500, badge: 'Best Value' },
            { name: 'Anker Liberty 4', price: 2500, badge: 'Premium ANC' },
        ]
    }
};

export default function AnkerAudioPage() {
    return (
        <CategoryTemplate
            brand="Anker"
            brandColor="blue"
            category="Audio & Earbuds"
            categorySlug="audio"
            seoContent={seoContent}
        />
    );
}
