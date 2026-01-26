"use client";

import { useMemo } from 'react';
import { Globe, Smartphone } from 'lucide-react';

// ============================================
// TYPES
// ============================================

interface SEOPreviewProps {
    title: string;
    description: string;
    url?: string;
    type?: 'google' | 'mobile';
}

// ============================================
// SEO PREVIEW (Google Search Result)
// ============================================

export default function SEOPreview({
    title,
    description,
    url = 'https://yoursite.com/product/...',
    type = 'google',
}: SEOPreviewProps) {
    const truncatedTitle = useMemo(() => {
        if (title.length > 60) {
            return title.slice(0, 57) + '...';
        }
        return title;
    }, [title]);

    const truncatedDesc = useMemo(() => {
        if (description.length > 160) {
            return description.slice(0, 157) + '...';
        }
        return description;
    }, [description]);

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                {type === 'google' ? (
                    <Globe className="w-4 h-4" />
                ) : (
                    <Smartphone className="w-4 h-4" />
                )}
                معاينة نتائج البحث
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 p-4 shadow-sm">
                {/* Google-style result */}
                <div className="space-y-1">
                    {/* URL breadcrumb */}
                    <div className="flex items-center gap-2 text-sm">
                        <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                            <Globe className="w-4 h-4 text-gray-400" />
                        </div>
                        <div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                yoursite.com
                            </div>
                            <div className="text-xs text-gray-400 truncate max-w-[300px]">
                                {url}
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl text-blue-700 dark:text-blue-400 hover:underline cursor-pointer leading-tight">
                        {truncatedTitle || 'عنوان المنتج'}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {truncatedDesc || 'وصف المنتج سيظهر هنا...'}
                    </p>
                </div>
            </div>

            {/* Character counts */}
            <div className="flex gap-4 text-xs text-gray-500">
                <span className={title.length > 60 ? 'text-red-500' : ''}>
                    العنوان: {title.length}/60
                </span>
                <span className={description.length > 160 ? 'text-red-500' : ''}>
                    الوصف: {description.length}/160
                </span>
            </div>
        </div>
    );
}

// ============================================
// DUAL LANGUAGE PREVIEW
// ============================================

interface DualSEOPreviewProps {
    titleAr: string;
    descriptionAr: string;
    titleEn: string;
    descriptionEn: string;
    urlSlug?: string;
    domain?: string;
}

export function DualSEOPreview({
    titleAr,
    descriptionAr,
    titleEn,
    descriptionEn,
    urlSlug = 'product-name',
    domain = 'yoursite.com',
}: DualSEOPreviewProps) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Arabic Preview */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">AR</span>
                        معاينة البحث (عربي)
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 p-4" dir="rtl">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                    <Globe className="w-3 h-3 text-gray-400" />
                                </div>
                                <span className="text-gray-600 dark:text-gray-400 text-xs">
                                    {domain}
                                </span>
                            </div>

                            <h3 className="text-lg text-blue-700 dark:text-blue-400 hover:underline cursor-pointer">
                                {titleAr.slice(0, 60) || 'عنوان المنتج'}
                                {titleAr.length > 60 && '...'}
                            </h3>

                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {descriptionAr.slice(0, 160) || 'وصف المنتج...'}
                                {descriptionAr.length > 160 && '...'}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 text-xs text-gray-500">
                        <span className={titleAr.length > 60 ? 'text-red-500 font-medium' : ''}>
                            العنوان: {titleAr.length}/60
                        </span>
                        <span className={descriptionAr.length > 160 ? 'text-red-500 font-medium' : ''}>
                            الوصف: {descriptionAr.length}/160
                        </span>
                    </div>
                </div>

                {/* English Preview */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">EN</span>
                        Search Preview (English)
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 p-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                    <Globe className="w-3 h-3 text-gray-400" />
                                </div>
                                <span className="text-gray-600 dark:text-gray-400 text-xs">
                                    {domain}/en/{urlSlug}
                                </span>
                            </div>

                            <h3 className="text-lg text-blue-700 dark:text-blue-400 hover:underline cursor-pointer">
                                {titleEn.slice(0, 60) || 'Product Title'}
                                {titleEn.length > 60 && '...'}
                            </h3>

                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {descriptionEn.slice(0, 160) || 'Product description...'}
                                {descriptionEn.length > 160 && '...'}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 text-xs text-gray-500">
                        <span className={titleEn.length > 60 ? 'text-red-500 font-medium' : ''}>
                            Title: {titleEn.length}/60
                        </span>
                        <span className={descriptionEn.length > 160 ? 'text-red-500 font-medium' : ''}>
                            Desc: {descriptionEn.length}/160
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================
// SEO SCORE INDICATOR
// ============================================

interface SEOScoreIndicatorProps {
    score: number;
    label?: string;
}

export function SEOScoreIndicator({ score, label = 'SEO Score' }: SEOScoreIndicatorProps) {
    const getColor = () => {
        if (score >= 80) return 'text-green-500';
        if (score >= 60) return 'text-yellow-500';
        return 'text-red-500';
    };

    const getBackground = () => {
        if (score >= 80) return 'bg-green-500';
        if (score >= 60) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
                <svg className="w-12 h-12 -rotate-90">
                    <circle
                        cx="24"
                        cy="24"
                        r="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-gray-200 dark:text-gray-700"
                    />
                    <circle
                        cx="24"
                        cy="24"
                        r="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={`${score * 1.26} 126`}
                        className={getColor()}
                    />
                </svg>
                <span className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${getColor()}`}>
                    {score}
                </span>
            </div>

            <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getBackground()}`} />
                    <span className="text-xs text-gray-500">
                        {score >= 80 ? 'ممتاز' : score >= 60 ? 'جيد' : 'يحتاج تحسين'}
                    </span>
                </div>
            </div>
        </div>
    );
}
