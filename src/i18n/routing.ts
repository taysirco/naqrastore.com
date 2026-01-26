import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['ar', 'en'],

    // Arabic is the default locale
    defaultLocale: 'ar',

    // 'as-needed' means: no prefix for default locale (ar), prefix for others (/en)
    localePrefix: 'as-needed',

    // Disable locale detection from browser Accept-Language header
    // This ensures Arabic is ALWAYS shown at root, not based on browser language
    localeDetection: false
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);
