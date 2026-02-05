import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: [
                    '/',
                    '/Anker/',
                    '/Joyroom/',
                    '/en/',
                ],
                disallow: [
                    '/api/',
                    '/checkout/',
                    '/private/',
                    '/_next/',
                    '/admin/',
                ],
            },
            {
                // Specific rules for AI crawlers (Googlebot, Bingbot)
                userAgent: ['Googlebot', 'Bingbot', 'Slurp'],
                allow: '/',
                disallow: ['/api/', '/checkout/', '/_next/'],
            },
        ],
        sitemap: [
            'https://cairovolt.com/sitemap.xml',
            'https://cairovolt.com/image-sitemap.xml',
        ],
        host: 'https://cairovolt.com',
    };
}
