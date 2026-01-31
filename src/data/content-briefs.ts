/**
 * Content Briefs for CairoVolt SEO Strategy
 * Provides structured templates for content creation across all page types
 * Used by content creators and for programmatic SEO validation
 */

export type PageType = 'product' | 'category' | 'brand' | 'article' | 'faq' | 'policy';
export type SearchIntent = 'informational' | 'commercial' | 'transactional' | 'navigational';
export type ContentSectionType = 'intro' | 'features' | 'specs' | 'faq' | 'buying_guide' | 'comparison' | 'trust_signals' | 'cta';

export interface HeadingStructure {
    h1: string;
    h1Ar: string;
    h2s: Array<{ en: string; ar: string }>;
    h3s?: Array<{ en: string; ar: string }>;
}

export interface ContentSection {
    type: ContentSectionType;
    wordCountTarget: number;
    requirements: string[];
    seoTips: string[];
}

export interface ContentBrief {
    pageType: PageType;
    primaryKeyword: { en: string; ar: string };
    secondaryKeywords: { en: string[]; ar: string[] };
    searchIntent: SearchIntent;
    headingStructure: HeadingStructure;
    contentSections: ContentSection[];
    entityMentions: string[];
    internalLinksRequired: number;
    externalLinksRecommended: number;
    schemaRequired: string[];
    featuredSnippetTarget: boolean;
    voiceSearchOptimized: boolean;
}

// ============================================
// CONTENT BRIEF TEMPLATES
// ============================================

export const contentBriefTemplates: Record<PageType, ContentBrief> = {
    product: {
        pageType: 'product',
        primaryKeyword: { en: '[Product Name]', ar: '[اسم المنتج]' },
        secondaryKeywords: {
            en: ['buy [product]', '[product] price egypt', '[product] review', '[brand] [category]'],
            ar: ['شراء [منتج]', 'سعر [منتج] مصر', 'تقييم [منتج]', '[ماركة] [تصنيف]'],
        },
        searchIntent: 'transactional',
        headingStructure: {
            h1: '[Product Name] - [Key Feature] | [Brand]',
            h1Ar: '[اسم المنتج] - [ميزة رئيسية] | [الماركة]',
            h2s: [
                { en: 'Key Features', ar: 'المميزات الرئيسية' },
                { en: 'Specifications', ar: 'المواصفات' },
                { en: 'Frequently Asked Questions', ar: 'الأسئلة الشائعة' },
                { en: 'What\'s in the Box', ar: 'محتويات العلبة' },
            ],
            h3s: [
                { en: 'Fast Charging Technology', ar: 'تقنية الشحن السريع' },
                { en: 'Build Quality', ar: 'جودة التصنيع' },
                { en: 'Compatibility', ar: 'التوافق' },
            ],
        },
        contentSections: [
            {
                type: 'intro',
                wordCountTarget: 100,
                requirements: [
                    'Include primary keyword in first 100 words',
                    'Mention key USP (unique selling point)',
                    'Include price range',
                ],
                seoTips: [
                    'Lead with a compelling hook',
                    'Answer the main search query immediately',
                ],
            },
            {
                type: 'features',
                wordCountTarget: 200,
                requirements: [
                    'List 4-6 key features with benefits',
                    'Use bullet points for scannability',
                    'Include technical specs where relevant',
                ],
                seoTips: [
                    'Each feature should target a secondary keyword',
                    'Use schema-friendly formatting',
                ],
            },
            {
                type: 'specs',
                wordCountTarget: 150,
                requirements: [
                    'Include all technical specifications',
                    'Use structured table format',
                    'Include dimensions, weight, capacity',
                ],
                seoTips: [
                    'Tables help Google understand spec-based queries',
                ],
            },
            {
                type: 'faq',
                wordCountTarget: 300,
                requirements: [
                    'Minimum 5 FAQs',
                    'Answer "People Also Ask" queries',
                    'Include product-specific questions',
                ],
                seoTips: [
                    'FAQs are prime AEO content',
                    'Start answers with the question rephrased',
                ],
            },
        ],
        entityMentions: ['Brand Name', 'Product Category', 'Target Devices', 'Key Technologies'],
        internalLinksRequired: 3,
        externalLinksRecommended: 0,
        schemaRequired: ['Product', 'FAQ', 'Breadcrumb', 'Offer'],
        featuredSnippetTarget: true,
        voiceSearchOptimized: true,
    },

    category: {
        pageType: 'category',
        primaryKeyword: { en: '[Brand] [Category] Egypt', ar: '[ماركة] [تصنيف] مصر' },
        secondaryKeywords: {
            en: ['best [category]', '[category] price egypt', 'buy [category] online'],
            ar: ['افضل [تصنيف]', 'سعر [تصنيف] مصر', 'شراء [تصنيف] اونلاين'],
        },
        searchIntent: 'commercial',
        headingStructure: {
            h1: '[Brand] [Category] - Shop [Count] Products | Egypt',
            h1Ar: '[ماركة] [تصنيف] - تسوق [عدد] منتج | مصر',
            h2s: [
                { en: 'Why Choose [Brand] [Category]', ar: 'لماذا تختار [ماركة] [تصنيف]' },
                { en: 'Buying Guide', ar: 'دليل الشراء' },
                { en: 'Popular Products', ar: 'المنتجات الأكثر مبيعاً' },
                { en: 'FAQs', ar: 'الأسئلة الشائعة' },
            ],
        },
        contentSections: [
            {
                type: 'intro',
                wordCountTarget: 150,
                requirements: [
                    'Explain category value proposition',
                    'Mention product count and price range',
                    'Include primary keyword naturally',
                ],
                seoTips: [
                    'First paragraph should be speakable-friendly',
                ],
            },
            {
                type: 'buying_guide',
                wordCountTarget: 400,
                requirements: [
                    'Explain key decision factors',
                    'Compare different options/tiers',
                    'Include capacity/wattage guide if applicable',
                ],
                seoTips: [
                    'Use HowTo schema for step-by-step buying guide',
                    'This is prime featured snippet content',
                ],
            },
            {
                type: 'trust_signals',
                wordCountTarget: 100,
                requirements: [
                    'Warranty information',
                    'Official dealer status',
                    'Shipping information',
                ],
                seoTips: [
                    'Trust signals improve E-E-A-T',
                ],
            },
            {
                type: 'faq',
                wordCountTarget: 250,
                requirements: [
                    'Minimum 5 category-specific FAQs',
                    'Include "best for X" questions',
                    'Address common concerns',
                ],
                seoTips: [
                    'Use PAA research for FAQ topics',
                ],
            },
        ],
        entityMentions: ['Brand', 'Category', 'Top Products', 'Key Features', 'Egypt'],
        internalLinksRequired: 5,
        externalLinksRecommended: 0,
        schemaRequired: ['ItemList', 'FAQ', 'Breadcrumb', 'CollectionPage'],
        featuredSnippetTarget: true,
        voiceSearchOptimized: true,
    },

    brand: {
        pageType: 'brand',
        primaryKeyword: { en: '[Brand] Egypt Official Store', ar: '[ماركة] مصر المتجر الرسمي' },
        secondaryKeywords: {
            en: ['[brand] products', '[brand] price egypt', '[brand] warranty egypt'],
            ar: ['منتجات [ماركة]', 'سعر [ماركة] مصر', 'ضمان [ماركة] مصر'],
        },
        searchIntent: 'navigational',
        headingStructure: {
            h1: '[Brand] Egypt - Official Authorized Dealer',
            h1Ar: '[ماركة] مصر - الموزع المعتمد الرسمي',
            h2s: [
                { en: 'Shop by Category', ar: 'تسوق حسب القسم' },
                { en: 'Why [Brand]?', ar: 'لماذا [ماركة]؟' },
                { en: 'Official Warranty', ar: 'الضمان الرسمي' },
            ],
        },
        contentSections: [
            {
                type: 'intro',
                wordCountTarget: 200,
                requirements: [
                    'Establish official dealer status',
                    'Overview of brand heritage',
                    'Key brand differentiators',
                ],
                seoTips: [
                    'Include brand entity markup',
                    'Mention authorization/partnership',
                ],
            },
            {
                type: 'trust_signals',
                wordCountTarget: 150,
                requirements: [
                    'Warranty details',
                    'Authenticity guarantee',
                    'Customer reviews summary',
                ],
                seoTips: [
                    'Critical for E-E-A-T scoring',
                ],
            },
        ],
        entityMentions: ['Brand', 'Egypt', 'Official Dealer', 'Warranty', 'Categories'],
        internalLinksRequired: 4,
        externalLinksRecommended: 1,
        schemaRequired: ['Organization', 'WebPage', 'Breadcrumb', 'Article'],
        featuredSnippetTarget: false,
        voiceSearchOptimized: true,
    },

    article: {
        pageType: 'article',
        primaryKeyword: { en: '[Topic] Guide [Year]', ar: 'دليل [موضوع] [سنة]' },
        secondaryKeywords: {
            en: ['how to [action]', 'best [topic]', '[topic] tips'],
            ar: ['كيفية [فعل]', 'افضل [موضوع]', 'نصائح [موضوع]'],
        },
        searchIntent: 'informational',
        headingStructure: {
            h1: '[Topic]: Complete Guide [Year]',
            h1Ar: '[موضوع]: الدليل الشامل [سنة]',
            h2s: [
                { en: 'What is [Topic]', ar: 'ما هو [موضوع]' },
                { en: 'How to Choose', ar: 'كيف تختار' },
                { en: 'Top Recommendations', ar: 'أفضل التوصيات' },
                { en: 'FAQs', ar: 'الأسئلة الشائعة' },
            ],
        },
        contentSections: [
            {
                type: 'intro',
                wordCountTarget: 150,
                requirements: [
                    'Hook the reader',
                    'Preview what will be covered',
                    'Include primary keyword',
                ],
                seoTips: [
                    'First paragraph determines snippet eligibility',
                ],
            },
            {
                type: 'buying_guide',
                wordCountTarget: 600,
                requirements: [
                    'Deep-dive into topic',
                    'Include actionable advice',
                    'Use examples and comparisons',
                ],
                seoTips: [
                    'Use HowTo schema if step-based',
                    'Include images with alt text',
                ],
            },
            {
                type: 'comparison',
                wordCountTarget: 300,
                requirements: [
                    'Compare options objectively',
                    'Use tables for clarity',
                    'Link to product pages',
                ],
                seoTips: [
                    'Tables improve featured snippet chances',
                ],
            },
            {
                type: 'faq',
                wordCountTarget: 200,
                requirements: [
                    'Answer PAA questions',
                    'Be concise but complete',
                ],
                seoTips: [
                    'FAQs are prime AEO content',
                ],
            },
        ],
        entityMentions: ['Topic', 'Related Products', 'Technologies', 'Brands'],
        internalLinksRequired: 5,
        externalLinksRecommended: 2,
        schemaRequired: ['Article', 'FAQ', 'Breadcrumb', 'HowTo'],
        featuredSnippetTarget: true,
        voiceSearchOptimized: true,
    },

    faq: {
        pageType: 'faq',
        primaryKeyword: { en: '[Brand/Topic] FAQ', ar: 'الأسئلة الشائعة [ماركة/موضوع]' },
        secondaryKeywords: {
            en: ['[topic] questions', 'how does [topic] work'],
            ar: ['اسئلة [موضوع]', 'كيف يعمل [موضوع]'],
        },
        searchIntent: 'informational',
        headingStructure: {
            h1: 'Frequently Asked Questions',
            h1Ar: 'الأسئلة الشائعة',
            h2s: [
                { en: 'Ordering', ar: 'الطلب' },
                { en: 'Shipping', ar: 'الشحن' },
                { en: 'Warranty', ar: 'الضمان' },
                { en: 'Products', ar: 'المنتجات' },
            ],
        },
        contentSections: [
            {
                type: 'faq',
                wordCountTarget: 1000,
                requirements: [
                    'Organize by category',
                    'Minimum 15 questions',
                    'Concise but complete answers',
                ],
                seoTips: [
                    'Each question is AEO opportunity',
                    'Use FAQ schema',
                ],
            },
        ],
        entityMentions: ['Brand', 'Products', 'Services', 'Policies'],
        internalLinksRequired: 10,
        externalLinksRecommended: 0,
        schemaRequired: ['FAQPage'],
        featuredSnippetTarget: true,
        voiceSearchOptimized: true,
    },

    policy: {
        pageType: 'policy',
        primaryKeyword: { en: '[Policy Type]', ar: '[نوع السياسة]' },
        secondaryKeywords: {
            en: ['[store] [policy]', '[policy] details'],
            ar: ['[سياسة] [متجر]', 'تفاصيل [سياسة]'],
        },
        searchIntent: 'informational',
        headingStructure: {
            h1: '[Policy Type] | [Store Name]',
            h1Ar: '[نوع السياسة] | [اسم المتجر]',
            h2s: [
                { en: 'Overview', ar: 'نظرة عامة' },
                { en: 'Details', ar: 'التفاصيل' },
                { en: 'Contact', ar: 'تواصل معنا' },
            ],
        },
        contentSections: [
            {
                type: 'intro',
                wordCountTarget: 500,
                requirements: [
                    'Clear, legal language',
                    'Cover all policy aspects',
                    'Include effective dates',
                ],
                seoTips: [
                    'Policy pages improve E-E-A-T',
                ],
            },
        ],
        entityMentions: ['Store Name', 'Policy Terms'],
        internalLinksRequired: 2,
        externalLinksRecommended: 0,
        schemaRequired: ['WebPage'],
        featuredSnippetTarget: false,
        voiceSearchOptimized: false,
    },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get content brief for a specific page type
 */
export function getContentBrief(pageType: PageType): ContentBrief {
    return contentBriefTemplates[pageType];
}

/**
 * Validate content against brief requirements
 */
export function validateContent(
    pageType: PageType,
    content: { wordCount: number; hasSchema: string[]; internalLinks: number }
): { valid: boolean; issues: string[] } {
    const brief = contentBriefTemplates[pageType];
    const issues: string[] = [];

    const totalWordTarget = brief.contentSections.reduce((sum, s) => sum + s.wordCountTarget, 0);
    if (content.wordCount < totalWordTarget * 0.8) {
        issues.push(`Content is ${Math.round((1 - content.wordCount / totalWordTarget) * 100)}% below target word count`);
    }

    const missingSchemas = brief.schemaRequired.filter(s => !content.hasSchema.includes(s));
    if (missingSchemas.length > 0) {
        issues.push(`Missing schemas: ${missingSchemas.join(', ')}`);
    }

    if (content.internalLinks < brief.internalLinksRequired) {
        issues.push(`Need ${brief.internalLinksRequired - content.internalLinks} more internal links`);
    }

    return { valid: issues.length === 0, issues };
}

/**
 * Get SEO score based on content brief compliance
 */
export function getSEOScore(pageType: PageType, metrics: {
    wordCount: number;
    hasSchema: string[];
    internalLinks: number;
    hasFAQ: boolean;
    hasH2s: number;
}): number {
    const brief = contentBriefTemplates[pageType];
    let score = 0;
    const maxScore = 100;

    // Word count (30 points)
    const totalWordTarget = brief.contentSections.reduce((sum, s) => sum + s.wordCountTarget, 0);
    const wordRatio = Math.min(metrics.wordCount / totalWordTarget, 1);
    score += wordRatio * 30;

    // Schema compliance (25 points)
    const schemaRatio = brief.schemaRequired.filter(s => metrics.hasSchema.includes(s)).length / brief.schemaRequired.length;
    score += schemaRatio * 25;

    // Internal links (15 points)
    const linkRatio = Math.min(metrics.internalLinks / brief.internalLinksRequired, 1);
    score += linkRatio * 15;

    // FAQ presence (15 points)
    if (metrics.hasFAQ) score += 15;

    // Heading structure (15 points)
    const h2Ratio = Math.min(metrics.hasH2s / brief.headingStructure.h2s.length, 1);
    score += h2Ratio * 15;

    return Math.round(score);
}
