import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Match internationalized pathnames
    // Exclude /api, /_next, and files with extensions
    matcher: ['/((?!api|_next|.*\\..*).*)', '/(ar|en)/:path*']
};
