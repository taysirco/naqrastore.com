import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/schemas/ProductSchema';
import { ArticleSchema } from '@/components/schemas/AEOSchemas';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'About' });
    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
        alternates: {
            canonical: locale === 'ar'
                ? 'https://cairovolt.com/about'
                : 'https://cairovolt.com/en/about',
            languages: {
                'ar': 'https://cairovolt.com/about',
                'en': 'https://cairovolt.com/en/about',
            },
        },
        openGraph: {
            title: t('metaTitle'),
            description: t('metaDescription'),
            locale: locale === 'ar' ? 'ar_EG' : 'en_US',
            type: 'website',
            siteName: locale === 'ar' ? 'كايرو فولت' : 'Cairo Volt',
        },
    };
}

export default function AboutPage() {
    const t = useTranslations('About');
    const locale = useLocale();
    const isArabic = locale === 'ar';

    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: isArabic ? 'الرئيسية' : 'Home', url: `https://cairovolt.com${isArabic ? '' : '/en'}` },
                    { name: t('title'), url: `https://cairovolt.com${isArabic ? '' : '/en'}/about` },
                ]}
                locale={locale}
            />
            <ArticleSchema
                headline={t('title')}
                description={t('metaDescription')}
                url={`https://cairovolt.com${isArabic ? '' : '/en'}/about`}
                locale={locale}
                articleType="Article"
            />
            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto">
                        {/* Hero Section */}
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                {t('title')}
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                {t('subtitle')}
                            </p>
                        </div>

                        {/* Mission */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                                <span className="text-3xl">🎯</span>
                                {t('mission.title')}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {t('mission.description')}
                            </p>
                        </section>

                        {/* Why Choose Us */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                                <span className="text-3xl">⭐</span>
                                {t('whyUs.title')}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {['original', 'warranty', 'prices', 'support'].map((item) => (
                                    <div key={item} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                                        <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">
                                            {t(`whyUs.${item}.title`)}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            {t(`whyUs.${item}.description`)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Our Brands */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                                <span className="text-3xl">🏆</span>
                                {t('brands.title')}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-6">
                                    <h3 className="text-2xl font-bold mb-2 text-blue-700 dark:text-blue-400">Anker</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{t('brands.anker')}</p>
                                </div>
                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl p-6">
                                    <h3 className="text-2xl font-bold mb-2 text-purple-700 dark:text-purple-400">Joyroom</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{t('brands.joyroom')}</p>
                                </div>
                            </div>
                        </section>

                        {/* Stats */}
                        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                <div>
                                    <p className="text-4xl font-bold">1000+</p>
                                    <p className="text-sm opacity-80">{t('stats.customers')}</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-bold">50+</p>
                                    <p className="text-sm opacity-80">{t('stats.products')}</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-bold">18</p>
                                    <p className="text-sm opacity-80">{t('stats.warranty')}</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-bold">24/7</p>
                                    <p className="text-sm opacity-80">{t('stats.support')}</p>
                                </div>
                            </div>
                        </section>

                        {/* E-E-A-T: Authorization & Credentials */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8 mt-8">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                                <span className="text-3xl">📜</span>
                                {isArabic ? 'اعتمادات وشهادات التوكيل' : 'Authorization & Credentials'}
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                                    <span className="text-2xl flex-shrink-0">✅</span>
                                    <div>
                                        <h3 className="font-bold text-green-800 dark:text-green-300">
                                            {isArabic ? 'وكيل Anker المعتمد في مصر' : 'Authorized Anker Dealer in Egypt'}
                                        </h3>
                                        <p className="text-sm text-green-700 dark:text-green-400">
                                            {isArabic
                                                ? 'نحن موزع معتمد رسمياً لمنتجات Anker. كل منتج يأتي بضمان 18 شهر قابل للتحقق عبر موقع anker.com/verify.'
                                                : 'We are an officially authorized Anker distributor. Every product comes with an 18-month warranty verifiable at anker.com/verify.'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                                    <span className="text-2xl flex-shrink-0">✅</span>
                                    <div>
                                        <h3 className="font-bold text-green-800 dark:text-green-300">
                                            {isArabic ? 'وكيل Joyroom المعتمد في مصر' : 'Authorized Joyroom Dealer in Egypt'}
                                        </h3>
                                        <p className="text-sm text-green-700 dark:text-green-400">
                                            {isArabic
                                                ? 'موزع معتمد لمنتجات Joyroom بضمان الكود الذهبي. ضمان 12 شهر مع استبدال فوري.'
                                                : 'Authorized Joyroom distributor with Golden Code warranty. 12-month warranty with instant replacement.'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                                    <span className="text-2xl flex-shrink-0">🏢</span>
                                    <div>
                                        <h3 className="font-bold text-blue-800 dark:text-blue-300">
                                            {isArabic ? 'سجل تجاري مصري' : 'Egyptian Commercial Registry'}
                                        </h3>
                                        <p className="text-sm text-blue-700 dark:text-blue-400">
                                            {isArabic
                                                ? 'شركة مسجلة رسمياً في مصر. نعمل بشفافية كاملة وفقاً للقوانين المصرية.'
                                                : 'Officially registered company in Egypt. We operate with full transparency under Egyptian law.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* E-E-A-T: Team Expertise */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                                <span className="text-3xl">👨‍💻</span>
                                {isArabic ? 'فريقنا المتخصص' : 'Our Expert Team'}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                {isArabic
                                    ? 'فريق كايرو فولت يضم متخصصين في تقنيات الشحن والإلكترونيات الاستهلاكية. نختبر كل منتج شخصياً قبل إضافته لمتجرنا، ونكتب مراجعات وأدلة شراء مبنية على خبرة فعلية — وليست منسوخة من الإنترنت.'
                                    : 'The Cairo Volt team includes specialists in charging technology and consumer electronics. We personally test every product before adding it to our store, and write reviews and buying guides based on hands-on experience — not copied from the internet.'}
                            </p>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="text-center p-5 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                    <span className="text-3xl mb-2 block">🔬</span>
                                    <h3 className="font-bold text-sm mb-1">{isArabic ? 'اختبار شخصي' : 'Hands-on Testing'}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {isArabic ? 'كل منتج يتم اختباره قبل البيع' : 'Every product tested before sale'}
                                    </p>
                                </div>
                                <div className="text-center p-5 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                    <span className="text-3xl mb-2 block">📝</span>
                                    <h3 className="font-bold text-sm mb-1">{isArabic ? 'محتوى أصلي' : 'Original Content'}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {isArabic ? 'مراجعات وأدلة من خبرتنا الفعلية' : 'Reviews & guides from real experience'}
                                    </p>
                                </div>
                                <div className="text-center p-5 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                    <span className="text-3xl mb-2 block">🎓</span>
                                    <h3 className="font-bold text-sm mb-1">{isArabic ? 'خبرة تقنية' : 'Technical Expertise'}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {isArabic ? 'متخصصون في تقنيات الشحن الحديثة' : 'Specialists in modern charging tech'}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* E-E-A-T: Editorial Policy */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                                <span className="text-3xl">📋</span>
                                {isArabic ? 'سياسة المحتوى التحريري' : 'Editorial Content Policy'}
                            </h2>
                            <div className="text-gray-600 dark:text-gray-300 space-y-3 text-sm leading-relaxed">
                                <p>
                                    {isArabic
                                        ? 'في كايرو فولت، نلتزم بالشفافية الكاملة في محتوانا التحريري:'
                                        : 'At Cairo Volt, we are committed to full transparency in our editorial content:'}
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">✓</span>
                                        <span>{isArabic
                                            ? 'كل مقارنة بين المنتجات مبنية على اختبارات فعلية — ليست نظرية'
                                            : 'All product comparisons are based on actual testing — not theoretical'}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">✓</span>
                                        <span>{isArabic
                                            ? 'نذكر عيوب المنتجات بصراحة بجانب مميزاتها'
                                            : 'We honestly mention product drawbacks alongside advantages'}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">✓</span>
                                        <span>{isArabic
                                            ? 'الأسعار محدثة ودقيقة — نحدثها فور تغيرها'
                                            : 'Prices are updated and accurate — we update them as soon as they change'}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">✓</span>
                                        <span>{isArabic
                                            ? 'مراجعات العملاء حقيقية ولا يتم تعديلها أو حذفها'
                                            : 'Customer reviews are genuine and are not edited or deleted'}</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* E-E-A-T: Contact & Location */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                                <span className="text-3xl">📍</span>
                                {isArabic ? 'تواصل معنا' : 'Contact & Location'}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-lg">📱</span>
                                        <div>
                                            <p className="font-bold text-sm">{isArabic ? 'واتساب' : 'WhatsApp'}</p>
                                            <p className="text-sm text-gray-500" dir="ltr">+20 106 337 4834</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-lg">📧</span>
                                        <div>
                                            <p className="font-bold text-sm">{isArabic ? 'البريد الإلكتروني' : 'Email'}</p>
                                            <p className="text-sm text-gray-500">info@cairovolt.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-lg">🌐</span>
                                        <div>
                                            <p className="font-bold text-sm">{isArabic ? 'الموقع' : 'Website'}</p>
                                            <p className="text-sm text-gray-500">cairovolt.com</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-lg">📍</span>
                                        <div>
                                            <p className="font-bold text-sm">{isArabic ? 'منطقة الخدمة' : 'Service Area'}</p>
                                            <p className="text-sm text-gray-500">{isArabic ? 'جميع محافظات مصر (27 محافظة)' : 'All 27 Egyptian Governorates'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-lg">⏰</span>
                                        <div>
                                            <p className="font-bold text-sm">{isArabic ? 'ساعات العمل' : 'Working Hours'}</p>
                                            <p className="text-sm text-gray-500">{isArabic ? 'يومياً من 10 صباحاً - 10 مساءً' : 'Daily 10 AM - 10 PM'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-lg">🚚</span>
                                        <div>
                                            <p className="font-bold text-sm">{isArabic ? 'التوصيل' : 'Delivery'}</p>
                                            <p className="text-sm text-gray-500">{isArabic ? '1-2 يوم القاهرة، 3-5 أيام المحافظات' : '1-2 days Cairo, 3-5 days other governorates'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}
