import { Metadata } from 'next';
import Link from 'next/link';
import { blogArticles } from '@/data/blog-articles';
import { BreadcrumbSchema } from '@/components/schemas/ProductSchema';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isArabic = locale === 'ar';

    const title = isArabic
        ? 'مدونة كايرو فولت | أدلة شراء ومراجعات اكسسوارات الموبايل'
        : 'Cairo Volt Blog | Mobile Accessories Buying Guides & Reviews';
    const description = isArabic
        ? 'أدلة شراء شاملة ومقارنات ومراجعات لأفضل اكسسوارات الموبايل في مصر. باور بانك، شواحن، سماعات من Anker و Joyroom.'
        : 'Complete buying guides, comparisons, and reviews for the best mobile accessories in Egypt. Power banks, chargers, earbuds from Anker & Joyroom.';

    return {
        title,
        description,
        alternates: {
            canonical: isArabic
                ? 'https://cairovolt.com/blog'
                : 'https://cairovolt.com/en/blog',
            languages: {
                'ar': 'https://cairovolt.com/blog',
                'en': 'https://cairovolt.com/en/blog',
            },
        },
        openGraph: {
            title,
            description,
            locale: isArabic ? 'ar_EG' : 'en_US',
            type: 'website',
            siteName: isArabic ? 'كايرو فولت' : 'Cairo Volt',
        },
    };
}

const categoryLabels: Record<string, { ar: string; en: string; icon: string }> = {
    'buying-guide': { ar: 'دليل شراء', en: 'Buying Guide', icon: '📚' },
    'comparison': { ar: 'مقارنة', en: 'Comparison', icon: '⚖️' },
    'how-to': { ar: 'شرح', en: 'How-To', icon: '🔧' },
    'review': { ar: 'مراجعة', en: 'Review', icon: '⭐' },
    'tips': { ar: 'نصائح', en: 'Tips', icon: '💡' },
};

export default async function BlogPage({ params }: Props) {
    const { locale } = await params;
    const isArabic = locale === 'ar';

    const getLocalizedHref = (path: string) => {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return locale === 'ar' ? cleanPath : `/${locale}${cleanPath}`;
    };

    // Sort articles by modified date descending
    const sortedArticles = [...blogArticles].sort(
        (a, b) => new Date(b.modifiedDate).getTime() - new Date(a.modifiedDate).getTime()
    );

    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: isArabic ? 'الرئيسية' : 'Home', url: `https://cairovolt.com${isArabic ? '' : '/en'}` },
                    { name: isArabic ? 'المدونة' : 'Blog', url: `https://cairovolt.com${isArabic ? '' : '/en'}/blog` },
                ]}
                locale={locale}
            />

            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4 py-12 md:py-16">
                    {/* Hero */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {isArabic ? 'مدونة كايرو فولت' : 'Cairo Volt Blog'}
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            {isArabic
                                ? 'أدلة شراء شاملة، مقارنات، ونصائح لاختيار أفضل اكسسوارات الموبايل في مصر'
                                : 'Complete buying guides, comparisons, and tips for choosing the best mobile accessories in Egypt'}
                        </p>
                    </div>

                    {/* Articles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {sortedArticles.map((article) => {
                            const trans = article.translations[isArabic ? 'ar' : 'en'];
                            const catLabel = categoryLabels[article.category];

                            return (
                                <Link
                                    key={article.slug}
                                    href={getLocalizedHref(`/blog/${article.slug}`)}
                                    className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    {/* Category Badge */}
                                    <div className="p-6 pb-0">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                            {catLabel.icon} {isArabic ? catLabel.ar : catLabel.en}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                            {trans.title}
                                        </h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                            {trans.excerpt}
                                        </p>

                                        {/* Meta */}
                                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-700">
                                            <span>
                                                {new Date(article.modifiedDate).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                            <span>
                                                {isArabic
                                                    ? `${article.readingTime} دقائق قراءة`
                                                    : `${article.readingTime} min read`}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </main>
        </>
    );
}
