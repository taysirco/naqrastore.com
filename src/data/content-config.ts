/**
 * Content Configuration System
 * Centralized SEO content requirements per page type
 */

export interface ContentConfig {
    pageType: string;
    wordCountTarget: {
        min: number;
        ideal: number;
        max: number;
    };
    headingStructure: {
        h1Required: boolean;
        h2Min: number;
        h3Min: number;
    };
    entityDensity: {
        primaryKeyword: number; // percentage
        secondaryKeywords: number;
        brandMentions: number;
    };
    internalLinks: {
        min: number;
        max: number;
    };
    schemaRequired: string[];
    aeoFeatures: string[];
}

export const contentConfigs: Record<string, ContentConfig> = {
    homepage: {
        pageType: 'homepage',
        wordCountTarget: { min: 300, ideal: 500, max: 800 },
        headingStructure: { h1Required: true, h2Min: 2, h3Min: 0 },
        entityDensity: { primaryKeyword: 1.5, secondaryKeywords: 0.5, brandMentions: 3 },
        internalLinks: { min: 6, max: 12 },
        schemaRequired: ['WebSite', 'Organization', 'LocalBusiness', 'CollectionPage'],
        aeoFeatures: ['speakable', 'sitelinks-searchbox'],
    },
    brand: {
        pageType: 'brand',
        wordCountTarget: { min: 500, ideal: 800, max: 1200 },
        headingStructure: { h1Required: true, h2Min: 3, h3Min: 2 },
        entityDensity: { primaryKeyword: 2, secondaryKeywords: 1, brandMentions: 5 },
        internalLinks: { min: 4, max: 10 },
        schemaRequired: ['Brand', 'BreadcrumbList', 'Article', 'FAQPage'],
        aeoFeatures: ['speakable', 'faq-rich-result'],
    },
    category: {
        pageType: 'category',
        wordCountTarget: { min: 600, ideal: 1000, max: 1500 },
        headingStructure: { h1Required: true, h2Min: 4, h3Min: 3 },
        entityDensity: { primaryKeyword: 2.5, secondaryKeywords: 1.5, brandMentions: 4 },
        internalLinks: { min: 6, max: 15 },
        schemaRequired: ['ItemList', 'BreadcrumbList', 'FAQPage', 'HowTo'],
        aeoFeatures: ['speakable', 'comparison-table', 'buying-guide', 'faq-rich-result'],
    },
    product: {
        pageType: 'product',
        wordCountTarget: { min: 400, ideal: 700, max: 1000 },
        headingStructure: { h1Required: true, h2Min: 3, h3Min: 2 },
        entityDensity: { primaryKeyword: 3, secondaryKeywords: 1.5, brandMentions: 3 },
        internalLinks: { min: 3, max: 8 },
        schemaRequired: ['Product', 'BreadcrumbList', 'FAQPage', 'AggregateRating'],
        aeoFeatures: ['speakable', 'product-rich-result', 'faq-rich-result'],
    },
    faq: {
        pageType: 'faq',
        wordCountTarget: { min: 1000, ideal: 1500, max: 2500 },
        headingStructure: { h1Required: true, h2Min: 5, h3Min: 10 },
        entityDensity: { primaryKeyword: 1, secondaryKeywords: 0.5, brandMentions: 5 },
        internalLinks: { min: 5, max: 12 },
        schemaRequired: ['FAQPage', 'BreadcrumbList'],
        aeoFeatures: ['speakable', 'faq-rich-result', 'voice-search-optimized'],
    },
    about: {
        pageType: 'about',
        wordCountTarget: { min: 400, ideal: 600, max: 1000 },
        headingStructure: { h1Required: true, h2Min: 3, h3Min: 2 },
        entityDensity: { primaryKeyword: 1, secondaryKeywords: 0.5, brandMentions: 4 },
        internalLinks: { min: 3, max: 8 },
        schemaRequired: ['Article', 'BreadcrumbList', 'Organization'],
        aeoFeatures: ['speakable'],
    },
    shipping: {
        pageType: 'shipping',
        wordCountTarget: { min: 300, ideal: 500, max: 800 },
        headingStructure: { h1Required: true, h2Min: 3, h3Min: 0 },
        entityDensity: { primaryKeyword: 2, secondaryKeywords: 1, brandMentions: 2 },
        internalLinks: { min: 2, max: 5 },
        schemaRequired: ['BreadcrumbList', 'DeliveryService'],
        aeoFeatures: ['speakable', 'shipping-info-structured'],
    },
    warranty: {
        pageType: 'warranty',
        wordCountTarget: { min: 400, ideal: 600, max: 1000 },
        headingStructure: { h1Required: true, h2Min: 3, h3Min: 2 },
        entityDensity: { primaryKeyword: 2, secondaryKeywords: 1, brandMentions: 3 },
        internalLinks: { min: 2, max: 5 },
        schemaRequired: ['BreadcrumbList', 'WarrantyPromise'],
        aeoFeatures: ['speakable', 'warranty-info-structured'],
    },
};

/**
 * Get content configuration for a page type
 */
export function getContentConfig(pageType: string): ContentConfig | undefined {
    return contentConfigs[pageType];
}

/**
 * Validate content against configuration requirements
 */
export function validateContentAgainstConfig(
    pageType: string,
    content: {
        wordCount: number;
        h1Count: number;
        h2Count: number;
        h3Count: number;
        internalLinkCount: number;
    }
): {
    passed: boolean;
    score: number;
    issues: string[];
} {
    const config = contentConfigs[pageType];
    if (!config) {
        return { passed: false, score: 0, issues: ['Unknown page type'] };
    }

    const issues: string[] = [];
    let score = 100;

    // Word count validation
    if (content.wordCount < config.wordCountTarget.min) {
        issues.push(`Word count (${content.wordCount}) below minimum (${config.wordCountTarget.min})`);
        score -= 20;
    } else if (content.wordCount > config.wordCountTarget.max) {
        issues.push(`Word count (${content.wordCount}) exceeds maximum (${config.wordCountTarget.max})`);
        score -= 10;
    }

    // Heading structure validation
    if (config.headingStructure.h1Required && content.h1Count !== 1) {
        issues.push(`Page must have exactly 1 H1 (found ${content.h1Count})`);
        score -= 25;
    }
    if (content.h2Count < config.headingStructure.h2Min) {
        issues.push(`Needs at least ${config.headingStructure.h2Min} H2s (found ${content.h2Count})`);
        score -= 15;
    }
    if (content.h3Count < config.headingStructure.h3Min) {
        issues.push(`Needs at least ${config.headingStructure.h3Min} H3s (found ${content.h3Count})`);
        score -= 10;
    }

    // Internal links validation
    if (content.internalLinkCount < config.internalLinks.min) {
        issues.push(`Needs at least ${config.internalLinks.min} internal links (found ${content.internalLinkCount})`);
        score -= 15;
    }

    return {
        passed: issues.length === 0,
        score: Math.max(0, score),
        issues,
    };
}

/**
 * Get AEO feature requirements for a page type
 */
export function getAEORequirements(pageType: string): string[] {
    return contentConfigs[pageType]?.aeoFeatures || [];
}

/**
 * Get required schemas for a page type
 */
export function getRequiredSchemas(pageType: string): string[] {
    return contentConfigs[pageType]?.schemaRequired || [];
}
