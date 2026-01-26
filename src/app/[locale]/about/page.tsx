import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'About' });
    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
    };
}

export default function AboutPage() {
    const t = useTranslations('About');

    return (
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
                </div>
            </div>
        </main>
    );
}
