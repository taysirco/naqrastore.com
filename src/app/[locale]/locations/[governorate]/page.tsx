import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getGovernorateBySlug, governorates, Governorate } from '@/data/governorates';
import { staticProducts, staticCategories } from '@/lib/static-products';
import { LocalBusinessSchema } from '@/components/schemas/AEOSchemas';
import { BreadcrumbSchema } from '@/components/schemas/ProductSchema';

interface PageProps {
    params: Promise<{
        locale: string;
        governorate: string;
    }>;
}

// Generate static params for all governorates
export async function generateStaticParams() {
    return governorates.map((gov) => ({
        governorate: gov.slug,
    }));
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale, governorate: governorateSlug } = await params;
    const gov = getGovernorateBySlug(governorateSlug);

    if (!gov) {
        return {
            title: 'Location Not Found',
        };
    }

    const isArabic = locale === 'ar';

    return {
        title: isArabic ? gov.seo.titleAr : gov.seo.titleEn,
        description: isArabic ? gov.seo.descriptionAr : gov.seo.descriptionEn,
        alternates: {
            canonical: `https://cairovolt.com/${locale}/locations/${gov.slug}`,
            languages: {
                'ar': `https://cairovolt.com/ar/locations/${gov.slug}`,
                'en': `https://cairovolt.com/en/locations/${gov.slug}`,
            },
        },
        openGraph: {
            title: isArabic ? gov.seo.titleAr : gov.seo.titleEn,
            description: isArabic ? gov.seo.descriptionAr : gov.seo.descriptionEn,
            locale: isArabic ? 'ar_EG' : 'en_US',
            type: 'website',
        },
    };
}

export default async function GovernoratePage({ params }: PageProps) {
    const { locale, governorate: governorateSlug } = await params;
    const gov = getGovernorateBySlug(governorateSlug);

    if (!gov) {
        notFound();
    }

    const isArabic = locale === 'ar';
    const govName = isArabic ? gov.nameAr : gov.nameEn;

    // Get featured products
    const featuredProducts = staticProducts.filter(p => p.featured).slice(0, 8);

    return (
        <>
            {/* LocalBusiness Schema for this governorate */}
            <LocalBusinessSchema locale={locale} />

            {/* Breadcrumb Schema */}
            <BreadcrumbSchema
                items={[
                    { name: isArabic ? 'الرئيسية' : 'Home', url: `https://cairovolt.com/${locale}` },
                    { name: isArabic ? 'المواقع' : 'Locations', url: `https://cairovolt.com/${locale}/locations` },
                    { name: govName, url: `https://cairovolt.com/${locale}/locations/${gov.slug}` },
                ]}
                locale={locale}
            />

            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                {isArabic
                                    ? `اكسسوارات موبايل ${govName}`
                                    : `Mobile Accessories in ${govName}`}
                            </h1>
                            <p className="text-xl opacity-90 mb-6">
                                {isArabic ? gov.seo.descriptionAr : gov.seo.descriptionEn}
                            </p>

                            {/* Delivery Badge */}
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-6 py-3">
                                <span className="text-2xl">🚚</span>
                                <span className="font-semibold">
                                    {isArabic
                                        ? `التوصيل خلال ${gov.deliveryDays} ${gov.deliveryDays === 1 ? 'يوم' : 'أيام'}`
                                        : `${gov.deliveryDays}-Day Delivery`}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-12 container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                            <span className="text-4xl mb-3 block">✅</span>
                            <h3 className="font-bold text-gray-900 dark:text-white">
                                {isArabic ? 'منتجات أصلية' : 'Original Products'}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {isArabic ? 'Anker & Joyroom' : 'Anker & Joyroom'}
                            </p>
                        </div>
                        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                            <span className="text-4xl mb-3 block">🚚</span>
                            <h3 className="font-bold text-gray-900 dark:text-white">
                                {isArabic ? 'توصيل سريع' : 'Fast Delivery'}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {isArabic ? `${gov.deliveryDays} أيام` : `${gov.deliveryDays} days`}
                            </p>
                        </div>
                        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                            <span className="text-4xl mb-3 block">🛡️</span>
                            <h3 className="font-bold text-gray-900 dark:text-white">
                                {isArabic ? 'ضمان رسمي' : 'Official Warranty'}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {isArabic ? '18 شهر' : '18 months'}
                            </p>
                        </div>
                        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                            <span className="text-4xl mb-3 block">💵</span>
                            <h3 className="font-bold text-gray-900 dark:text-white">
                                {isArabic ? 'الدفع عند الاستلام' : 'Cash on Delivery'}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {isArabic ? `متاح في ${gov.nameAr}` : `Available in ${gov.nameEn}`}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="py-12 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                            {isArabic
                                ? `تسوق حسب الفئة في ${govName}`
                                : `Shop by Category in ${govName}`}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                            {staticCategories.slice(0, 8).map((cat) => (
                                <Link
                                    key={cat.slug}
                                    href={`/${locale}/anker/${cat.slug}`}
                                    className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all text-center"
                                >
                                    <span className="text-3xl mb-2 block">{cat.icon}</span>
                                    <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600">
                                        {isArabic ? cat.translations.ar.name : cat.translations.en.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Products */}
                <section className="py-12 container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                        {isArabic
                            ? `أفضل المنتجات في ${govName}`
                            : `Top Products in ${govName}`}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {featuredProducts.map((product) => {
                            const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
                            return (
                                <Link
                                    key={product.slug}
                                    href={`/${locale}/${product.brand.toLowerCase()}/${product.categorySlug}/${product.slug}`}
                                    className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition-all"
                                >
                                    <div className="aspect-square bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                                        {primaryImage && (
                                            <img
                                                src={primaryImage.url}
                                                alt={primaryImage.alt}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                            />
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2">
                                            {isArabic
                                                ? product.translations.ar.name
                                                : product.translations.en.name}
                                        </h3>
                                        <p className="text-blue-600 font-bold mt-2">
                                            {product.price.toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>

                {/* Other Governorates */}
                <section className="py-12 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                            {isArabic ? 'نوصل لكل محافظات مصر' : 'We Deliver to All Egypt'}
                        </h2>
                        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
                            {governorates.slice(0, 12).map((g) => (
                                <Link
                                    key={g.slug}
                                    href={`/${locale}/locations/${g.slug}`}
                                    className={`px-4 py-2 rounded-full text-sm transition-all ${g.slug === gov.slug
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {isArabic ? g.nameAr : g.nameEn}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
