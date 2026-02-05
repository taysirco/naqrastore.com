import { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isArabic = locale === 'ar';

    return {
        title: isArabic ? 'اتصل بنا | كايرو فولت' : 'Contact Us | Cairo Volt',
        description: isArabic
            ? 'تواصل معنا عبر واتساب أو الهاتف. نحن هنا لمساعدتك في اختيار أفضل إكسسوارات الموبايل من Anker و Joyroom في مصر.'
            : 'Contact us via WhatsApp or phone. We are here to help you choose the best mobile accessories from Anker and Joyroom in Egypt.',
        alternates: {
            canonical: isArabic
                ? 'https://cairovolt.com/contact'
                : 'https://cairovolt.com/en/contact',
            languages: {
                'ar': 'https://cairovolt.com/contact',
                'en': 'https://cairovolt.com/en/contact',
            },
        },
    };
}

export default function ContactPage() {
    return <ContactPageClient />;
}

