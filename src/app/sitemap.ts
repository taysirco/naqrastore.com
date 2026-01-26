import { MetadataRoute } from 'next';

const baseUrl = 'https://yourdomain.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        // Home
        { url: baseUrl, priority: 1.0 },
        { url: `${baseUrl}/en`, priority: 1.0 },

        // Anker Pages
        { url: `${baseUrl}/anker`, priority: 0.9 },
        { url: `${baseUrl}/en/anker`, priority: 0.9 },
        { url: `${baseUrl}/anker/power-banks`, priority: 0.9 },
        { url: `${baseUrl}/en/anker/power-banks`, priority: 0.9 },
        { url: `${baseUrl}/anker/audio`, priority: 0.8 },
        { url: `${baseUrl}/en/anker/audio`, priority: 0.8 },
        { url: `${baseUrl}/anker/wall-chargers`, priority: 0.9 },
        { url: `${baseUrl}/en/anker/wall-chargers`, priority: 0.9 },
        { url: `${baseUrl}/anker/cables`, priority: 0.7 },
        { url: `${baseUrl}/en/anker/cables`, priority: 0.7 },
        { url: `${baseUrl}/anker/car-chargers`, priority: 0.6 },
        { url: `${baseUrl}/en/anker/car-chargers`, priority: 0.6 },

        // Joyroom Pages
        { url: `${baseUrl}/joyroom`, priority: 0.9 },
        { url: `${baseUrl}/en/joyroom`, priority: 0.9 },
        { url: `${baseUrl}/joyroom/audio`, priority: 1.0 }, // Hero Product T03s
        { url: `${baseUrl}/en/joyroom/audio`, priority: 1.0 },
        { url: `${baseUrl}/joyroom/power-banks`, priority: 0.8 },
        { url: `${baseUrl}/en/joyroom/power-banks`, priority: 0.8 },
        { url: `${baseUrl}/joyroom/wall-chargers`, priority: 0.6 },
        { url: `${baseUrl}/en/joyroom/wall-chargers`, priority: 0.6 },
        { url: `${baseUrl}/joyroom/cables`, priority: 0.5 },
        { url: `${baseUrl}/en/joyroom/cables`, priority: 0.5 },
        { url: `${baseUrl}/joyroom/car-accessories`, priority: 0.5 },
        { url: `${baseUrl}/en/joyroom/car-accessories`, priority: 0.5 },

        // Checkout
        { url: `${baseUrl}/checkout`, priority: 0.7 },
        { url: `${baseUrl}/en/checkout`, priority: 0.7 },
    ];

    return routes.map((route) => ({
        url: route.url,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route.priority,
    }));
}
