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

  const baseMetadata = {
    alternates: {
      // Arabic is default locale - no /ar/ prefix
      canonical: locale === 'ar' ? 'https://cairovolt.com' : 'https://cairovolt.com/en',
      languages: {
        'ar': 'https://cairovolt.com',
        'en': 'https://cairovolt.com/en',
      },
    },
  };

  if (locale === 'en') {
    return {
      ...baseMetadata,
      title: 'Mobile Accessories Egypt | Anker & Joyroom - Best Prices 2026',
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
    ...baseMetadata,
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

  // Use proper brand casing (Anker, Joyroom) in URLs
  const heroProducts = isRTL
    ? [
      { name: 'Joyroom T03s', category: 'سماعات', badge: '⭐ الأكثر مبيعاً', href: '/Joyroom/audio' },
      { name: 'Anker PowerCore 20000', category: 'باور بانك', badge: '🔥 الأعلى طلباً', href: '/Anker/power-banks' },
      { name: 'Anker Nano 20W', category: 'شاحن', badge: '📱 iPhone', href: '/Anker/wall-chargers' },
    ]
    : [
      { name: 'Joyroom T03s', category: 'Earbuds', badge: '⭐ Best Seller', href: '/en/Joyroom/audio' },
      { name: 'Anker PowerCore 20000', category: 'Power Bank', badge: '🔥 Top Seller', href: '/en/Anker/power-banks' },
      { name: 'Anker Nano 20W', category: 'Charger', badge: '📱 iPhone', href: '/en/Anker/wall-chargers' },
    ];

  const categories = isRTL
    ? [
      { title: 'باور بانك', brand: 'Anker', href: '/Anker/power-banks', icon: '⚡', color: 'from-blue-600 to-blue-400' },
      { title: 'سماعات T03s', brand: 'Joyroom', href: '/Joyroom/audio', icon: '🎧', color: 'from-red-600 to-red-400', badge: 'Hero' },
      { title: 'شواحن', brand: 'Anker', href: '/Anker/wall-chargers', icon: '🔌', color: 'from-purple-600 to-purple-400' },
      { title: 'كابلات', brand: 'Anker', href: '/Anker/cables', icon: '🔗', color: 'from-green-600 to-green-400' },
      { title: 'Soundcore', brand: 'Anker', href: '/Anker/audio', icon: '🎵', color: 'from-indigo-600 to-indigo-400' },
      { title: 'شاحن سيارة', brand: 'Anker', href: '/Anker/car-chargers', icon: '🚗', color: 'from-orange-600 to-orange-400' },
    ]
    : [
      { title: 'Power Banks', brand: 'Anker', href: '/en/Anker/power-banks', icon: '⚡', color: 'from-blue-600 to-blue-400' },
      { title: 'T03s Earbuds', brand: 'Joyroom', href: '/en/Joyroom/audio', icon: '🎧', color: 'from-red-600 to-red-400', badge: 'Hero' },
      { title: 'Wall Chargers', brand: 'Anker', href: '/en/Anker/wall-chargers', icon: '🔌', color: 'from-purple-600 to-purple-400' },
      { title: 'Cables', brand: 'Anker', href: '/en/Anker/cables', icon: '🔗', color: 'from-green-600 to-green-400' },
      { title: 'Soundcore', brand: 'Anker', href: '/en/Anker/audio', icon: '🎵', color: 'from-indigo-600 to-indigo-400' },
      { title: 'Car Chargers', brand: 'Anker', href: '/en/Anker/car-chargers', icon: '🚗', color: 'from-orange-600 to-orange-400' },
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
        pageUrl={`https://cairovolt.com${isRTL ? '' : '/en'}`}
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
              <Link href={isRTL ? '/Anker' : '/en/Anker'} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-blue-600/30">
                {isRTL ? 'تسوق Anker' : 'Shop Anker'}
              </Link>
              <Link href={isRTL ? '/Joyroom' : '/en/Joyroom'} className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-red-600/30">
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
            <Link href={isRTL ? '/Anker' : '/en/Anker'} className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white hover:shadow-2xl transition-all">
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
            <Link href={isRTL ? '/Joyroom' : '/en/Joyroom'} className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 to-red-800 p-8 text-white hover:shadow-2xl transition-all">
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

        {/* SEO Content Section - About Store */}
        <section className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              {isRTL ? 'كايرو فولت - متجر إكسسوارات الموبايل الأصلية في مصر' : 'Cairo Volt - Original Mobile Accessories Store in Egypt'}
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-gray-600 dark:text-gray-400">
              {isRTL ? (
                <>
                  <p>
                    مرحباً بك في <strong>كايرو فولت</strong>، الوجهة الأولى لإكسسوارات الموبايل الأصلية في مصر. نحن الموزع المعتمد لأكبر العلامات التجارية العالمية:
                    <strong> Anker</strong> العلامة الأولى عالمياً في تقنيات الشحن، و<strong>Joyroom</strong> الرائدة في إكسسوارات الموبايل عالية الجودة بأسعار مناسبة.
                  </p>
                  <p>
                    نقدم مجموعة واسعة من المنتجات تشمل: <strong>باور بانك أنكر</strong> بسعات مختلفة من 5000 إلى 26800 mAh،
                    <strong> شواحن سريعة</strong> تدعم تقنيات GaN و PD و QC3.0، <strong>كابلات شحن</strong> أصلية معتمدة MFi لأجهزة iPhone و iPad،
                    <strong> سماعات Joyroom T03s</strong> الأكثر مبيعاً في مصر، و<strong>سماعات Soundcore</strong> من Anker بجودة صوت استثنائية.
                  </p>
                  <p>
                    ما يميز كايرو فولت هو التزامنا بتقديم منتجات أصلية 100% مع <strong>ضمان رسمي</strong> يصل إلى 18 شهر على منتجات Anker و12 شهر على منتجات Joyroom.
                    نوفر خدمة <strong>الشحن لجميع محافظات مصر</strong> مع إمكانية <strong>الدفع عند الاستلام</strong> بدون أي مقدم.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Welcome to <strong>Cairo Volt</strong>, Egypt&apos;s premier destination for original mobile accessories. We are the authorized distributor for world-leading brands:
                    <strong> Anker</strong>, the world&apos;s #1 charging technology brand, and <strong>Joyroom</strong>, a leader in premium mobile accessories at affordable prices.
                  </p>
                  <p>
                    We offer a wide range of products including: <strong>Anker power banks</strong> with capacities from 5,000 to 26,800 mAh,
                    <strong> fast chargers</strong> supporting GaN, PD, and QC3.0 technologies, <strong>MFi-certified charging cables</strong> for iPhone and iPad devices,
                    <strong> Joyroom T03s earbuds</strong> - Egypt&apos;s best-selling earbuds, and <strong>Soundcore speakers</strong> from Anker with exceptional audio quality.
                  </p>
                  <p>
                    What sets Cairo Volt apart is our commitment to providing 100% original products with <strong>official warranty</strong> up to 18 months for Anker and 12 months for Joyroom products.
                    We offer <strong>shipping to all Egyptian governorates</strong> with <strong>cash on delivery</strong> option - no prepayment required.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* SEO Content Section - Products Overview */}
        <section className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold mb-4 text-blue-800 dark:text-blue-300">
                {isRTL ? 'منتجات Anker الأصلية' : 'Original Anker Products'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {isRTL
                  ? 'أنكر هي العلامة التجارية رقم 1 عالمياً في مجال الشحن، تخدم أكثر من 200 مليون مستخدم حول العالم. نوفر لك في كايرو فولت مجموعة كاملة من منتجات أنكر تشمل: باور بانك PowerCore بسعات متنوعة، شواحن حائط Nano و Prime بتقنية GaN المتطورة، كابلات PowerLine معتمدة MFi للآيفون، وشواحن سيارة PowerDrive. جميع المنتجات أصلية 100% مع ضمان رسمي 18 شهر.'
                  : "Anker is the world's #1 charging brand, serving over 200 million users globally. At Cairo Volt, we offer the complete Anker range including: PowerCore power banks in various capacities, Nano and Prime wall chargers with advanced GaN technology, MFi-certified PowerLine cables for iPhone, and PowerDrive car chargers. All products are 100% original with 18-month official warranty."}
              </p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold mb-4 text-red-800 dark:text-red-300">
                {isRTL ? 'منتجات Joyroom الأصلية' : 'Original Joyroom Products'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {isRTL
                  ? 'جوي روم هي علامة تجارية رائدة تقدم إكسسوارات موبايل عالية الجودة بأسعار مناسبة للجميع. سماعات Joyroom T03s هي الأكثر مبيعاً في مصر بفضل جودة الصوت الممتازة والبطارية طويلة العمر. نوفر أيضاً باور بانك جوي روم، كابلات شحن سريع، حوامل جوال للسيارة، وساعات ذكية. جميع المنتجات أصلية بضمان 12 شهر.'
                  : "Joyroom is a leading brand offering premium mobile accessories at prices accessible to everyone. Joyroom T03s earbuds are Egypt's best-selling earbuds thanks to their excellent sound quality and long battery life. We also offer Joyroom power banks, fast charging cables, car phone holders, and smart watches. All products are original with 12-month warranty."}
              </p>
            </div>
          </div>
        </section>

        {/* SEO Content Section - Why Choose Us */}
        <section className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              {isRTL ? 'لماذا تختار كايرو فولت؟' : 'Why Choose Cairo Volt?'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h4 className="font-bold mb-2">{isRTL ? 'الوكيل المعتمد' : 'Authorized Dealer'}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isRTL
                    ? 'نحن الموزع المعتمد الرسمي لـ Anker و Joyroom في مصر. كل منتج نبيعه أصلي 100% ومضمون.'
                    : 'We are the official authorized distributor for Anker and Joyroom in Egypt. Every product we sell is 100% original and guaranteed.'}
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📦</div>
                <h4 className="font-bold mb-2">{isRTL ? 'شحن لكل مصر' : 'Nationwide Shipping'}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isRTL
                    ? 'نوصل طلباتك إلى جميع محافظات مصر: القاهرة، الجيزة، الإسكندرية، المنصورة، طنطا، أسيوط، الأقصر وأسوان وجميع المحافظات الأخرى.'
                    : 'We deliver to all Egyptian governorates: Cairo, Giza, Alexandria, Mansoura, Tanta, Assiut, Luxor, Aswan, and all other regions.'}
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💬</div>
                <h4 className="font-bold mb-2">{isRTL ? 'دعم واتساب' : 'WhatsApp Support'}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isRTL
                    ? 'فريق دعم العملاء متاح على مدار الساعة عبر واتساب للإجابة على استفساراتك ومساعدتك في اختيار المنتج المناسب.'
                    : 'Our customer support team is available around the clock via WhatsApp to answer your questions and help you choose the right product.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Shop by Category - Internal Links to Generic Pages */}
        <section className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            {isRTL ? 'تسوق حسب الفئة' : 'Shop by Category'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { slug: 'power-banks', icon: '🔋', ar: 'باور بانك', en: 'Power Banks' },
              { slug: 'chargers', icon: '⚡', ar: 'شواحن', en: 'Chargers' },
              { slug: 'earbuds', icon: '🎧', ar: 'سماعات بلوتوث', en: 'Earbuds' },
              { slug: 'cables', icon: '🔌', ar: 'كابلات شحن', en: 'Cables' },
            ].map(cat => (
              <Link
                key={cat.slug}
                href={isRTL ? `/${cat.slug}` : `/${locale}/${cat.slug}`}
                className="group flex flex-col items-center gap-3 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="font-bold text-sm text-gray-900 dark:text-white">{isRTL ? cat.ar : cat.en}</span>
                <span className="text-xs text-gray-500">{isRTL ? 'Anker & Joyroom' : 'All Brands'}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Blog & Guides Section */}
        <section className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                {isRTL ? 'أدلة الشراء والمقالات' : 'Buying Guides & Articles'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {isRTL ? 'مقالات متخصصة تساعدك في اختيار المنتج المناسب' : 'Expert articles to help you choose the right product'}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                { slug: 'best-power-bank-egypt-2026', ar: 'أفضل باور بانك في مصر 2026', en: 'Best Power Bank Egypt 2026', icon: '🔋' },
                { slug: 'anker-vs-joyroom-comparison', ar: 'انكر vs جوي روم: أيهما أفضل؟', en: 'Anker vs Joyroom: Which is Better?', icon: '⚖️' },
                { slug: 'how-to-identify-original-anker', ar: 'كيف تعرف انكر الأصلي؟', en: 'How to Spot Fake Anker', icon: '🔍' },
              ].map(article => (
                <Link
                  key={article.slug}
                  href={isRTL ? `/blog/${article.slug}` : `/${locale}/blog/${article.slug}`}
                  className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all group"
                >
                  <span className="text-2xl flex-shrink-0">{article.icon}</span>
                  <span className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {isRTL ? article.ar : article.en}
                  </span>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link
                href={isRTL ? '/blog' : `/${locale}/blog`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-full hover:bg-emerald-700 transition-colors"
              >
                {isRTL ? 'عرض كل المقالات' : 'View All Articles'}
                <span>{isRTL ? '←' : '→'}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* SEO Content Section - Geographic Coverage */}
        <section className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              {isRTL ? 'نوصل لكل مصر' : 'We Deliver Across Egypt'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              {isRTL
                ? 'كايرو فولت يوفر خدمة الشحن السريع لجميع محافظات مصر. سواء كنت في القاهرة الكبرى (القاهرة، الجيزة، القليوبية)، الدلتا (الإسكندرية، الدقهلية، الغربية، الشرقية، المنوفية، كفر الشيخ، البحيرة، دمياط)، الصعيد (أسيوط، سوهاج، قنا، الأقصر، أسوان، المنيا، بني سويف)، أو القناة والساحل (السويس، الإسماعيلية، بورسعيد، البحر الأحمر، مطروح، شمال وجنوب سيناء) - نوصلك منتجات أصلية بضمان رسمي.'
                : "Cairo Volt provides fast shipping to all Egyptian governorates. Whether you're in Greater Cairo (Cairo, Giza, Qalyubia), the Delta (Alexandria, Dakahlia, Gharbia, Sharqia, Monufia, Kafr El Sheikh, Beheira, Damietta), Upper Egypt (Assiut, Sohag, Qena, Luxor, Aswan, Minya, Beni Suef), or Canal and Coast regions (Suez, Ismailia, Port Said, Red Sea, Matrouh, North and South Sinai) - we deliver original products with official warranty."}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
