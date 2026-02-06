import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Brand case correction mapping
const brandCaseMap: Record<string, string> = {
    'anker': 'Anker',
    'joyroom': 'Joyroom',
};

export default function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip API routes, static files, etc.
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    // Check for lowercase brand names and redirect to proper casing
    const pathSegments = pathname.split('/').filter(Boolean);

    // Determine if first segment is locale
    const hasLocale = pathSegments[0] === 'en' || pathSegments[0] === 'ar';
    const slugIndex = hasLocale ? 1 : 0;
    const firstSlug = pathSegments[slugIndex]?.toLowerCase();

    // ── Brand case correction ──
    // /anker/... → 301 redirect to /Anker/...
    if (firstSlug && brandCaseMap[firstSlug]) {
        const actualBrand = pathSegments[slugIndex];
        const properBrand = brandCaseMap[firstSlug];

        // Only redirect if case is wrong (lowercase brand in URL)
        if (actualBrand !== properBrand && actualBrand.toLowerCase() === firstSlug) {
            const correctedSegments = [...pathSegments];
            correctedSegments[slugIndex] = properBrand;

            const correctedPath = '/' + correctedSegments.join('/');
            const url = request.nextUrl.clone();
            url.pathname = correctedPath;

            // 301 permanent redirect to proper casing
            return NextResponse.redirect(url, { status: 301 });
        }
    }

    // Continue with internationalization middleware
    return intlMiddleware(request);
}

export const config = {
    // Match internationalized pathnames
    // Exclude /api, /_next, and files with extensions
    matcher: ['/((?!api|_next|.*\\..*).*)', '/(ar|en)/:path*']
};
