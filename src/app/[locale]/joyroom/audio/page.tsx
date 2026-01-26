import CategoryTemplate from '@/components/CategoryTemplate';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    if (locale === 'en') {
        return {
            title: 'Joyroom T03s Earbuds Egypt | Best Selling Earbuds',
            description: 'Shop Joyroom T03s earbuds in Egypt. JR-T03s Pro, Joyroom earbuds. Best selling earbuds at affordable prices. Official warranty.',
            keywords: 'joyroom t03s, joyroom earbuds, jr-t03s pro, joyroom jr-t03s, earbuds egypt',
        };
    }

    return {
        title: 'سماعات جوي روم T03s | Joyroom Earbuds Egypt - أفضل سعر',
        description: 'تسوق سماعات جوي روم T03s الأصلية في مصر. joyroom t03s, سماعات جيروم, اير بودز جوي روم بأفضل الأسعار. JR-T03s Pro الموديل البرو.',
        keywords: 'joyroom t03s, سماعات جوي روم, سماعة جيروم, سماعات جيروم, joyroom jr-t03s, jr t03s pro, اير بودز جوي روم, سماعة جيروم t03s',
    };
}

const seoContent = {
    ar: {
        title: 'سماعات جوي روم T03s - المنتج النجم',
        subtitle: 'Joyroom Earbuds - الأعلى مبيعاً في مصر',
        description: `
      اكتشف **سماعات جوي روم T03s** الأصلية - المنتج النجم والأكثر مبيعاً في مصر!
      
      **لماذا T03s هي الأفضل؟**
      - صوت نقي وباس قوي
      - بلوتوث 5.0 للاتصال المستقر
      - بطارية تدوم حتى 24 ساعة
      - تصميم مريح وخفيف الوزن
      - مقاومة للماء والعرق
      
      متوفر أيضاً: **JR-T03s Pro** الموديل البرو!
    `,
        products: [
            { name: 'Joyroom T03s', price: 350, badge: '⭐ المنتج النجم' },
            { name: 'JR-T03s Pro', price: 450, badge: 'الموديل البرو' },
            { name: 'Joyroom T03s Plus', price: 400, badge: 'بطارية أطول' },
        ]
    },
    en: {
        title: 'Joyroom T03s Earbuds - Hero Product',
        subtitle: 'Best Selling Earbuds in Egypt',
        description: `
      Discover the original **Joyroom T03s** earbuds - the hero product and best seller in Egypt!
      
      **Why T03s is the Best?**
      - Crystal clear sound with powerful bass
      - Bluetooth 5.0 for stable connection
      - Battery lasts up to 24 hours
      - Comfortable and lightweight design
      - Water and sweat resistant
      
      Also available: **JR-T03s Pro** with extra features!
    `,
        products: [
            { name: 'Joyroom T03s', price: 350, badge: '⭐ Hero Product' },
            { name: 'JR-T03s Pro', price: 450, badge: 'Pro Model' },
            { name: 'Joyroom T03s Plus', price: 400, badge: 'Extended Battery' },
        ]
    }
};

export default function JoyroomAudioPage() {
    return (
        <CategoryTemplate
            brand="Joyroom"
            brandColor="red"
            category="Audio & Earbuds"
            categorySlug="audio"
            seoContent={seoContent}
        />
    );
}
