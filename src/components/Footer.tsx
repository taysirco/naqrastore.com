'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function Footer() {
    const locale = useLocale();
    const t = useTranslations('Footer');
    const tCat = useTranslations('Categories');
    const isRTL = locale === 'ar';
    const currentYear = new Date().getFullYear();

    // Function to get localized href
    const getLocalizedHref = (path: string) => {
        if (locale === 'ar') {
            return path.startsWith('/') ? path : `/${path}`;
        }
        return path.startsWith('/en') ? path : `/en${path}`;
    };

    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-10 md:pt-16 pb-8" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
                    {/* About Section */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="mb-3 md:mb-4">
                            <img
                                src="/cairovolt_logo.png"
                                alt={isRTL ? 'كايرو فولت' : 'Cairo Volt'}
                                style={{ height: '64px', width: 'auto', maxWidth: '200px' }}
                                className="object-contain"
                            />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm leading-relaxed">
                            {t('aboutDescription')}
                        </p>
                    </div>

                    {/* Shop Anker */}
                    <div>
                        <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">{t('shopAnker')}</h4>
                        <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                            <li>
                                <Link href={getLocalizedHref('/Anker/power-banks')} className="hover:text-blue-600 transition-colors">
                                    {tCat('powerBanks')}
                                </Link>
                            </li>
                            <li>
                                <Link href={getLocalizedHref('/Anker/wall-chargers')} className="hover:text-blue-600 transition-colors">
                                    {tCat('wallChargers')}
                                </Link>
                            </li>
                            <li>
                                <Link href={getLocalizedHref('/Anker/cables')} className="hover:text-blue-600 transition-colors">
                                    {tCat('cables')}
                                </Link>
                            </li>
                            <li>
                                <Link href={getLocalizedHref('/Anker/car-chargers')} className="hover:text-blue-600 transition-colors">
                                    {tCat('carChargers')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Shop Joyroom */}
                    <div>
                        <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">{t('shopJoyroom')}</h4>
                        <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                            <li>
                                <Link href={getLocalizedHref('/Joyroom/audio')} className="hover:text-red-600 transition-colors">
                                    {tCat('audio')}
                                </Link>
                            </li>
                            <li>
                                <Link href={getLocalizedHref('/Joyroom/power-banks')} className="hover:text-red-600 transition-colors">
                                    {tCat('powerBanks')}
                                </Link>
                            </li>
                            <li>
                                <Link href={getLocalizedHref('/Joyroom/cables')} className="hover:text-red-600 transition-colors">
                                    {tCat('cables')}
                                </Link>
                            </li>
                            <li>
                                <Link href={getLocalizedHref('/Joyroom/wall-chargers')} className="hover:text-red-600 transition-colors">
                                    {tCat('wallChargers')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">{t('customerService')}</h4>
                        <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                            <li>
                                <Link href={getLocalizedHref('/contact')} className="hover:text-gray-900 dark:hover:text-white transition-colors">
                                    {t('contactUs')}
                                </Link>
                            </li>
                            <li>
                                <Link href={getLocalizedHref('/shipping')} className="hover:text-gray-900 dark:hover:text-white transition-colors">
                                    {t('shippingPolicy')}
                                </Link>
                            </li>
                            <li>
                                <Link href={getLocalizedHref('/warranty')} className="hover:text-gray-900 dark:hover:text-white transition-colors">
                                    {t('warrantyInfo')}
                                </Link>
                            </li>
                            <li>
                                <Link href={getLocalizedHref('/faq')} className="hover:text-gray-900 dark:hover:text-white transition-colors">
                                    {t('faqs')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <p>
                        © {currentYear} {isRTL ? 'موبايل ستور مصر' : 'Mobile Store Egypt'}. {t('allRightsReserved')}.
                    </p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link href={getLocalizedHref('/privacy')} className="hover:text-gray-900 dark:hover:text-white">
                            {t('privacyPolicy')}
                        </Link>
                        <Link href={getLocalizedHref('/terms')} className="hover:text-gray-900 dark:hover:text-white">
                            {t('termsConditions')}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
