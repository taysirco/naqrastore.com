import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { WebSiteSchema, CollectionPageSchema, SpeakableSchema } from '@/components/schemas/AEOSchemas';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (locale === 'en') {
    return {
      title: 'Mobile Accessories Egypt | Anker & Joyroom - Best Prices 2024',
      description: 'Shop original mobile accessories in Egypt. Anker power banks, chargers, cables. Joyroom T03s earbuds. 100% authentic with official warranty. Fast shipping.',
      keywords: 'mobile accessories, anker egypt, joyroom, power bank, earbuds, anker charger, joyroom t03s',
      openGraph: {
        title: 'Mobile Accessories Egypt | Anker & Joyroom',
        description: 'Original Anker & Joyroom accessories with official warranty.',
        locale: 'en_US',
      },
    };
  }

  // Arabic (default)
  return {
    title: 'اكسسوارات موبايل مصر | Anker Egypt & Joyroom - أفضل الأسعار',
    description: 'متجر اكسسوارات موبايل في مصر. Anker Egypt، Joyroom أصلي. باور بانك، سماعات، شواحن، كابلات. أفضل أسعار وضمان رسمي. 💯 منتجات أصلية.',
    keywords: 'اكسسوارات موبايل, انكر مصر, جوي روم, باور بانك, سماعات, شاحن انكر, شاحن ايفون اصلي, joyroom t03s',
    openGraph: {
      title: 'اكسسوارات موبايل مصر | Anker Egypt & Joyroom',
      description: 'أفضل اكسسوارات موبايل أصلية في مصر. Anker و Joyroom بضمان رسمي.',
      locale: 'ar_EG',
    },
  };
}

export default function Home() {
  const t = useTranslations('HomePage');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const heroProducts = isRTL
    ? [
      { name: 'Joyroom T03s', category: 'سماعات', badge: '⭐ الأكثر مبيعاً', href: '/joyroom/audio' },
      { name: 'Anker PowerCore 20000', category: 'باور بانك', badge: '🔥 الأعلى طلباً', href: '/anker/power-banks' },
      { name: 'Anker Nano 20W', category: 'شاحن', badge: '📱 iPhone', href: '/anker/wall-chargers' },
    ]
    : [
      { name: 'Joyroom T03s', category: 'Earbuds', badge: '⭐ Best Seller', href: '/en/joyroom/audio' },
      { name: 'Anker PowerCore 20000', category: 'Power Bank', badge: '🔥 Top Seller', href: '/en/anker/power-banks' },
      { name: 'Anker Nano 20W', category: 'Charger', badge: '📱 iPhone', href: '/en/anker/wall-chargers' },
    ];

  const categories = isRTL
    ? [
      { title: 'باور بانك', brand: 'Anker', href: '/anker/power-banks', icon: '⚡', color: 'from-blue-600 to-blue-400' },
      { title: 'سماعات T03s', brand: 'Joyroom', href: '/joyroom/audio', icon: '🎧', color: 'from-red-600 to-red-400', badge: 'Hero' },
      { title: 'شواحن', brand: 'Anker', href: '/anker/wall-chargers', icon: '🔌', color: 'from-purple-600 to-purple-400' },
      { title: 'كابلات', brand: 'Anker', href: '/anker/cables', icon: '🔗', color: 'from-green-600 to-green-400' },
      { title: 'Soundcore', brand: 'Anker', href: '/anker/audio', icon: '🎵', color: 'from-indigo-600 to-indigo-400' },
      { title: 'شاحن سيارة', brand: 'Anker', href: '/anker/car-chargers', icon: '🚗', color: 'from-orange-600 to-orange-400' },
    ]
    : [
      { title: 'Power Banks', brand: 'Anker', href: '/en/anker/power-banks', icon: '⚡', color: 'from-blue-600 to-blue-400' },
      { title: 'T03s Earbuds', brand: 'Joyroom', href: '/en/joyroom/audio', icon: '🎧', color: 'from-red-600 to-red-400', badge: 'Hero' },
      { title: 'Wall Chargers', brand: 'Anker', href: '/en/anker/wall-chargers', icon: '🔌', color: 'from-purple-600 to-purple-400' },
      { title: 'Cables', brand: 'Anker', href: '/en/anker/cables', icon: '🔗', color: 'from-green-600 to-green-400' },
      { title: 'Soundcore', brand: 'Anker', href: '/en/anker/audio', icon: '🎵', color: 'from-indigo-600 to-indigo-400' },
      { title: 'Car Chargers', brand: 'Anker', href: '/en/anker/car-chargers', icon: '🚗', color: 'from-orange-600 to-orange-400' },
    ];

  return (
    <>
      {/* SEO Schema Markup */}
      <WebSiteSchema locale={locale} />
      <CollectionPageSchema
        locale={locale}
        collections={categories.map(cat => ({
          name: cat.title,
          url: `https://cairovolt.com${cat.href}`,
          description: isRTL ? `تسوق ${cat.title} ${cat.brand} الأصلية` : `Shop original ${cat.brand} ${cat.title}`,
        }))}
      />
      <SpeakableSchema
        pageUrl={`https://cairovolt.com/${locale}`}
        speakableSelectors={['h1', '.hero-description', '.trust-badges']}
        headline={isRTL ? 'اكسسوارات موبايل Anker و Joyroom في مصر' : 'Anker & Joyroom Mobile Accessories in Egypt'}
        description={isRTL
          ? 'متجر إكسسوارات الموبايل الأصلية في مصر. باور بانك، سماعات، شواحن وكابلات Anker و Joyroom بضمان رسمي.'
          : 'Original mobile accessories store in Egypt. Power banks, earbuds, chargers & cables from Anker & Joyroom with official warranty.'}
        locale={locale}
      />

      <div className="flex flex-col gap-16 pb-16" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Hero Section */}
        <section className="relative min-h-[500px] md:min-h-[700px] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-blue-200/50 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-red-200/50 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center">
            <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-blue-100/50 backdrop-blur-sm rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6 text-blue-800 border border-blue-100">
              🇪🇬 {isRTL ? 'الوكيل المعتمد في مصر' : 'Authorized Dealer in Egypt'}
            </span>

            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 tracking-tight text-gray-900">
              <span className="block">{isRTL ? 'اكسسوارات موبايل' : 'Mobile Accessories'}</span>
              <span className="block bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                Anker & Joyroom
              </span>
            </h1>

            <p className="text-base md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
              {isRTL
                ? 'منتجات أصلية 100% بضمان رسمي. باور بانك، سماعات، شواحن وكابلات.'
                : '100% Original products with official warranty. Power banks, earbuds, chargers & cables.'}
            </p>

            {/* Hero Products */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-10">
              {heroProducts.map((product, idx) => (
                <Link
                  key={idx}
                  href={product.href}
                  className="px-3 py-2 md:px-6 md:py-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all flex items-center gap-1 md:gap-2 shadow-sm border border-gray-100 text-gray-800 text-xs md:text-base"
                >
                  <span className="text-xs bg-yellow-400 text-black px-2 py-0.5 rounded-full font-bold">{product.badge}</span>
                  <span>{product.name}</span>
                </Link>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={isRTL ? '/anker' : '/en/anker'} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-blue-600/30">
                {isRTL ? 'تسوق Anker' : 'Shop Anker'}
              </Link>
              <Link href={isRTL ? '/joyroom' : '/en/joyroom'} className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-red-600/30">
                {isRTL ? 'تسوق Joyroom' : 'Shop Joyroom'}
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            {isRTL ? 'الأقسام الرئيسية' : 'Featured Categories'}
          </h2>
          <p className="text-center text-gray-500 mb-12">
            {isRTL ? 'تسوق حسب القسم واحصل على أفضل العروض' : 'Shop by category and get the best deals'}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className="group relative p-4 md:p-6 rounded-xl md:rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all text-center"
              >
                {cat.badge && (
                  <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 px-2 py-0.5 md:py-1 bg-yellow-400 text-black text-[10px] md:text-xs font-bold rounded-full">
                    {cat.badge}
                  </span>
                )}
                <div className={`text-2xl md:text-4xl mb-2 md:mb-3 w-12 h-12 md:w-16 md:h-16 mx-auto rounded-xl md:rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                  {cat.icon}
                </div>
                <h3 className="font-bold text-sm md:text-base mb-1">{cat.title}</h3>
                <span className={`text-sm ${cat.brand === 'Anker' ? 'text-blue-600' : 'text-red-600'}`}>
                  {cat.brand}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Brands Section */}
        <section className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Anker */}
            <Link href={isRTL ? '/anker' : '/en/anker'} className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white hover:shadow-2xl transition-all">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-2">Anker</h3>
                <p className="text-blue-100 mb-4">
                  {isRTL ? 'العلامة الأولى عالمياً في إكسسوارات الشحن' : "World's #1 Charging Brand"}
                </p>
                <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm group-hover:bg-white/30 transition-colors">
                  {isRTL ? 'تصفح المنتجات' : 'Browse Products'} →
                </span>
              </div>
              <div className="absolute -bottom-10 -right-10 text-[200px] font-bold text-white/10">A</div>
            </Link>

            {/* Joyroom */}
            <Link href={isRTL ? '/joyroom' : '/en/joyroom'} className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 to-red-800 p-8 text-white hover:shadow-2xl transition-all">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-2">Joyroom</h3>
                <p className="text-red-100 mb-4">
                  {isRTL ? 'جودة عالية بأسعار مناسبة' : 'Premium Quality, Affordable Prices'}
                </p>
                <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm group-hover:bg-white/30 transition-colors">
                  {isRTL ? 'تصفح المنتجات' : 'Browse Products'} →
                </span>
              </div>
              <div className="absolute -bottom-10 -right-10 text-[200px] font-bold text-white/10">J</div>
            </Link>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 text-center">
            <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-gray-900">
              <div className="text-2xl md:text-3xl mb-1 md:mb-2">✅</div>
              <h4 className="font-bold">{isRTL ? 'منتجات أصلية' : 'Original Products'}</h4>
              <p className="text-sm text-gray-500">{isRTL ? 'ضمان 100%' : '100% Guarantee'}</p>
            </div>
            <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-gray-900">
              <div className="text-3xl mb-2">🚚</div>
              <h4 className="font-bold">{isRTL ? 'شحن سريع' : 'Fast Shipping'}</h4>
              <p className="text-sm text-gray-500">{isRTL ? 'لجميع المحافظات' : 'All Governorates'}</p>
            </div>
            <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-gray-900">
              <div className="text-3xl mb-2">💵</div>
              <h4 className="font-bold">{isRTL ? 'الدفع عند الاستلام' : 'Cash on Delivery'}</h4>
              <p className="text-sm text-gray-500">{isRTL ? 'بدون مقدم' : 'No Prepayment'}</p>
            </div>
            <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-gray-900">
              <div className="text-3xl mb-2">🛡️</div>
              <h4 className="font-bold">{isRTL ? 'ضمان رسمي' : 'Official Warranty'}</h4>
              <p className="text-sm text-gray-500">{isRTL ? 'استبدال فوري' : 'Instant Replacement'}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
