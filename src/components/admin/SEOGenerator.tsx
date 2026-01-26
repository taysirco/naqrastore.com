"use client";

import { useState } from 'react';
import {
    Sparkles,
    Loader2,
    Copy,
    Check,
    RefreshCw,
    Target,
    TrendingUp,
    Search,
    Globe
} from 'lucide-react';
import { Button } from './FormField';

// ============================================
// TYPES
// ============================================

interface SEOGeneratorProps {
    productName: string;
    productNameAr: string;
    category: string;
    categoryAr: string;
    brand: string;
    price: number;
    onApply: (data: GeneratedSEO) => void;
}

interface GeneratedSEO {
    metaTitle: string;
    metaTitleAr: string;
    metaDesc: string;
    metaDescAr: string;
    keywords: string[];
    keywordsAr: string[];
    focusKeyword: string;
    focusKeywordAr: string;
}

// ============================================
// SEO GENERATOR
// ============================================

export default function SEOGenerator({
    productName,
    productNameAr,
    category,
    categoryAr,
    brand,
    price,
    onApply,
}: SEOGeneratorProps) {
    const [loading, setLoading] = useState(false);
    const [generated, setGenerated] = useState<GeneratedSEO | null>(null);
    const [copied, setCopied] = useState<string | null>(null);

    const generateSEO = async () => {
        if (!productName && !productNameAr) {
            alert('يرجى إدخال اسم المنتج أولاً');
            return;
        }

        setLoading(true);

        try {
            // Generate SEO locally (intelligent generation)
            const seo = generateLocalSEO({
                productName,
                productNameAr,
                category,
                categoryAr,
                brand,
                price,
            });

            setGenerated(seo);
        } catch (error) {
            console.error('SEO generation error:', error);
            alert('حدث خطأ أثناء توليد SEO');
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopied(field);
        setTimeout(() => setCopied(null), 2000);
    };

    const handleApplyAll = () => {
        if (generated) {
            onApply(generated);
        }
    };

    return (
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                            مولد SEO الذكي
                        </h3>
                        <p className="text-sm text-gray-500">
                            توليد محتوى SEO احترافي للسوق المصري
                        </p>
                    </div>
                </div>

                <Button
                    onClick={generateSEO}
                    loading={loading}
                    icon={loading ? undefined : <Sparkles className="w-4 h-4" />}
                    variant="primary"
                >
                    {loading ? 'جاري التوليد...' : 'توليد SEO'}
                </Button>
            </div>

            {generated && (
                <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
                    {/* Meta Titles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <GeneratedField
                            label="عنوان Meta (عربي)"
                            value={generated.metaTitleAr}
                            onCopy={() => handleCopy(generated.metaTitleAr, 'metaTitleAr')}
                            copied={copied === 'metaTitleAr'}
                            icon={<Globe className="w-4 h-4" />}
                            dir="rtl"
                            charLimit={60}
                        />
                        <GeneratedField
                            label="Meta Title (English)"
                            value={generated.metaTitle}
                            onCopy={() => handleCopy(generated.metaTitle, 'metaTitle')}
                            copied={copied === 'metaTitle'}
                            icon={<Globe className="w-4 h-4" />}
                            charLimit={60}
                        />
                    </div>

                    {/* Meta Descriptions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <GeneratedField
                            label="وصف Meta (عربي)"
                            value={generated.metaDescAr}
                            onCopy={() => handleCopy(generated.metaDescAr, 'metaDescAr')}
                            copied={copied === 'metaDescAr'}
                            icon={<Search className="w-4 h-4" />}
                            dir="rtl"
                            charLimit={160}
                            multiline
                        />
                        <GeneratedField
                            label="Meta Description (English)"
                            value={generated.metaDesc}
                            onCopy={() => handleCopy(generated.metaDesc, 'metaDesc')}
                            copied={copied === 'metaDesc'}
                            icon={<Search className="w-4 h-4" />}
                            charLimit={160}
                            multiline
                        />
                    </div>

                    {/* Focus Keywords */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <GeneratedField
                            label="الكلمة المفتاحية الرئيسية (عربي)"
                            value={generated.focusKeywordAr}
                            onCopy={() => handleCopy(generated.focusKeywordAr, 'focusKeywordAr')}
                            copied={copied === 'focusKeywordAr'}
                            icon={<Target className="w-4 h-4" />}
                            dir="rtl"
                        />
                        <GeneratedField
                            label="Focus Keyword (English)"
                            value={generated.focusKeyword}
                            onCopy={() => handleCopy(generated.focusKeyword, 'focusKeyword')}
                            copied={copied === 'focusKeyword'}
                            icon={<Target className="w-4 h-4" />}
                        />
                    </div>

                    {/* Keywords */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <TrendingUp className="w-4 h-4" />
                            الكلمات المفتاحية المقترحة
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {[...generated.keywordsAr, ...generated.keywords].map((keyword, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleCopy(keyword, `keyword-${i}`)}
                                    className={`
                                        px-3 py-1.5 rounded-full text-sm font-medium
                                        transition-all duration-200
                                        ${copied === `keyword-${i}`
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                                        }
                                        border border-gray-200 dark:border-gray-600
                                    `}
                                >
                                    {copied === `keyword-${i}` ? (
                                        <Check className="w-4 h-4 inline mr-1" />
                                    ) : null}
                                    {keyword}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Apply All Button */}
                    <div className="flex justify-end gap-2 pt-4 border-t border-purple-200 dark:border-purple-800">
                        <Button
                            variant="secondary"
                            onClick={generateSEO}
                            icon={<RefreshCw className="w-4 h-4" />}
                        >
                            إعادة التوليد
                        </Button>
                        <Button
                            variant="success"
                            onClick={handleApplyAll}
                            icon={<Check className="w-4 h-4" />}
                        >
                            تطبيق الكل
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

// ============================================
// GENERATED FIELD
// ============================================

function GeneratedField({
    label,
    value,
    onCopy,
    copied,
    icon,
    dir,
    charLimit,
    multiline,
}: {
    label: string;
    value: string;
    onCopy: () => void;
    copied: boolean;
    icon: React.ReactNode;
    dir?: 'rtl' | 'ltr';
    charLimit?: number;
    multiline?: boolean;
}) {
    const isOverLimit = charLimit && value.length > charLimit;

    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {icon}
                    {label}
                </div>
                {charLimit && (
                    <span className={`text-xs ${isOverLimit ? 'text-red-500' : 'text-gray-400'}`}>
                        {value.length}/{charLimit}
                    </span>
                )}
            </div>

            <div className="relative group">
                <div
                    dir={dir}
                    className={`
                        w-full p-3 pr-10
                        bg-white dark:bg-gray-800
                        border rounded-xl
                        text-sm text-gray-900 dark:text-white
                        ${isOverLimit ? 'border-red-300' : 'border-gray-200 dark:border-gray-600'}
                        ${multiline ? 'min-h-[80px]' : ''}
                    `}
                >
                    {value}
                </div>

                <button
                    onClick={onCopy}
                    className={`
                        absolute top-2 right-2 p-1.5 rounded-lg
                        transition-all duration-200
                        ${copied
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-400 opacity-0 group-hover:opacity-100'
                        }
                    `}
                >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
}

// ============================================
// LOCAL SEO GENERATION (No API needed)
// ============================================

function generateLocalSEO({
    productName,
    productNameAr,
    category,
    categoryAr,
    brand,
    price,
}: {
    productName: string;
    productNameAr: string;
    category: string;
    categoryAr: string;
    brand: string;
    price: number;
}): GeneratedSEO {
    const formattedPrice = new Intl.NumberFormat('ar-EG').format(price);

    // Arabic SEO
    const metaTitleAr = `${productNameAr} | ${brand} اصلي في مصر - سعر ${formattedPrice} جنيه`;
    const metaDescAr = `اشتري ${productNameAr} ${brand} الاصلي بأفضل سعر في مصر. ${categoryAr} بضمان رسمي وتوصيل سريع. سعر ${formattedPrice} جنيه. اطلب الآن!`;
    const focusKeywordAr = `${productNameAr} ${brand}`;

    // English SEO
    const metaTitle = `${productName} | Original ${brand} in Egypt - EGP ${formattedPrice}`;
    const metaDesc = `Buy original ${productName} by ${brand} at the best price in Egypt. ${category} with official warranty and fast delivery. Only EGP ${formattedPrice}. Order now!`;
    const focusKeyword = `${productName} ${brand} Egypt`;

    // Keywords
    const keywordsAr = [
        productNameAr,
        `${productNameAr} مصر`,
        `${productNameAr} اصلي`,
        `سعر ${productNameAr}`,
        `${brand} ${categoryAr}`,
        `اشتري ${productNameAr}`,
        `${categoryAr} ${brand}`,
        `افضل ${categoryAr}`,
    ].filter(Boolean);

    const keywords = [
        productName,
        `${productName} Egypt`,
        `${brand} ${category}`,
        `buy ${productName}`,
        `${productName} price`,
        `original ${brand}`,
    ].filter(Boolean);

    return {
        metaTitle: metaTitle.slice(0, 60),
        metaTitleAr: metaTitleAr.slice(0, 60),
        metaDesc: metaDesc.slice(0, 160),
        metaDescAr: metaDescAr.slice(0, 160),
        keywords,
        keywordsAr,
        focusKeyword,
        focusKeywordAr,
    };
}
