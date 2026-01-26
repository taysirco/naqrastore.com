"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Search,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    ArrowRight,
    Edit2,
    RefreshCw,
    BarChart3,
    Target,
    Package
} from 'lucide-react';
import StatCard, { SEOScoreCard } from '@/components/admin/StatCard';
import { Button } from '@/components/admin/FormField';
import { StatusBadge } from '@/components/admin/DataTable';
import type { Product } from '@/types/admin';
import { calculateSEOScore } from '@/lib/admin-utils';

interface SEOIssue {
    productId: string;
    productName: string;
    issues: string[];
    score: number;
}

export default function SEOCenterPage() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [averageScore, setAverageScore] = useState(0);
    const [seoIssues, setSEOIssues] = useState<SEOIssue[]>([]);
    const [stats, setStats] = useState({
        excellent: 0,
        good: 0,
        needsWork: 0,
        total: 0,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/products?limit=100');
            if (res.ok) {
                const data = await res.json();
                const productList = data.items || data || [];
                setProducts(productList);
                analyzeProducts(productList);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const analyzeProducts = (productList: Product[]) => {
        if (!productList.length) {
            setAverageScore(0);
            setSEOIssues([]);
            return;
        }

        let totalScore = 0;
        const issues: SEOIssue[] = [];
        let excellent = 0, good = 0, needsWork = 0;

        productList.forEach(product => {
            const analysis = calculateSEOScore(product);
            totalScore += analysis.score;

            if (analysis.score >= 80) excellent++;
            else if (analysis.score >= 60) good++;
            else needsWork++;

            if (analysis.suggestions.length > 0) {
                issues.push({
                    productId: product.id,
                    productName: product.translations?.ar?.name || product.translations?.en?.name || product.slug,
                    issues: analysis.suggestions,
                    score: analysis.score,
                });
            }
        });

        setAverageScore(Math.round(totalScore / productList.length));
        setSEOIssues(issues.sort((a, b) => a.score - b.score).slice(0, 10));
        setStats({
            excellent,
            good,
            needsWork,
            total: productList.length,
        });
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        مركز SEO 🔍
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        تحليل وتحسين محركات البحث لجميع المنتجات
                    </p>
                </div>

                <Button
                    variant="secondary"
                    onClick={fetchData}
                    loading={loading}
                    icon={<RefreshCw className="w-4 h-4" />}
                >
                    تحديث التحليل
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SEOScoreCard score={averageScore} />

                <StatCard
                    title="ممتاز (80+)"
                    value={stats.excellent}
                    subtitle={`${Math.round((stats.excellent / (stats.total || 1)) * 100)}% من المنتجات`}
                    icon="custom"
                    customIcon={<CheckCircle className="w-6 h-6 text-green-500" />}
                    color="green"
                />

                <StatCard
                    title="جيد (60-79)"
                    value={stats.good}
                    subtitle={`${Math.round((stats.good / (stats.total || 1)) * 100)}% من المنتجات`}
                    icon="custom"
                    customIcon={<TrendingUp className="w-6 h-6 text-yellow-500" />}
                    color="orange"
                />

                <StatCard
                    title="يحتاج تحسين (<60)"
                    value={stats.needsWork}
                    subtitle={`${Math.round((stats.needsWork / (stats.total || 1)) * 100)}% من المنتجات`}
                    icon="custom"
                    customIcon={<AlertTriangle className="w-6 h-6 text-red-500" />}
                    color="red"
                />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Issues List */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-orange-500" />
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                منتجات تحتاج تحسين
                            </h2>
                        </div>
                        <span className="text-sm text-gray-500">
                            {seoIssues.length} منتج
                        </span>
                    </div>

                    {loading ? (
                        <div className="p-6 space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="animate-pulse flex gap-4">
                                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : seoIssues.length === 0 ? (
                        <div className="p-12 text-center">
                            <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                ممتاز! 🎉
                            </h3>
                            <p className="text-gray-500">
                                جميع المنتجات لديها SEO جيد
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100 dark:divide-gray-700">
                            {seoIssues.map((item) => (
                                <div
                                    key={item.productId}
                                    className="flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                                >
                                    {/* Score */}
                                    <div className={`
                                        w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg
                                        ${item.score >= 60
                                            ? 'bg-yellow-100 text-yellow-700'
                                            : 'bg-red-100 text-red-700'
                                        }
                                    `}>
                                        {item.score}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-gray-900 dark:text-white truncate">
                                            {item.productName}
                                        </h4>
                                        <ul className="mt-1 space-y-0.5">
                                            {item.issues.slice(0, 3).map((issue, i) => (
                                                <li key={i} className="text-sm text-gray-500 flex items-center gap-1">
                                                    <span className="w-1 h-1 bg-orange-400 rounded-full" />
                                                    {issue}
                                                </li>
                                            ))}
                                            {item.issues.length > 3 && (
                                                <li className="text-sm text-gray-400">
                                                    +{item.issues.length - 3} مشاكل أخرى
                                                </li>
                                            )}
                                        </ul>
                                    </div>

                                    {/* Action */}
                                    <Link
                                        href={`/admin/products/${item.productId}/edit`}
                                        className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                    >
                                        <Edit2 className="w-5 h-5" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Tips & Quick Stats */}
                <div className="space-y-6">
                    {/* SEO Tips */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-2 mb-4">
                            <Target className="w-5 h-5 text-blue-600" />
                            <h3 className="font-bold text-gray-900 dark:text-white">
                                نصائح SEO
                            </h3>
                        </div>

                        <ul className="space-y-3">
                            <SEOTip
                                title="عنوان Meta"
                                description="30-60 حرف، يحتوي الكلمة المفتاحية"
                                icon="📝"
                            />
                            <SEOTip
                                title="وصف Meta"
                                description="120-160 حرف، جذاب للنقر"
                                icon="📄"
                            />
                            <SEOTip
                                title="صور"
                                description="Alt text وصفي لكل صورة"
                                icon="🖼️"
                            />
                            <SEOTip
                                title="الكلمات المفتاحية"
                                description="3-5 كلمات ذات صلة"
                                icon="🔑"
                            />
                        </ul>
                    </div>

                    {/* Score Distribution */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-4">
                            <BarChart3 className="w-5 h-5 text-purple-500" />
                            <h3 className="font-bold text-gray-900 dark:text-white">
                                توزيع النتائج
                            </h3>
                        </div>

                        <div className="space-y-3">
                            <ScoreBar
                                label="ممتاز"
                                value={stats.excellent}
                                total={stats.total}
                                color="green"
                            />
                            <ScoreBar
                                label="جيد"
                                value={stats.good}
                                total={stats.total}
                                color="yellow"
                            />
                            <ScoreBar
                                label="ضعيف"
                                value={stats.needsWork}
                                total={stats.total}
                                color="red"
                            />
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                            إجراءات سريعة
                        </h3>

                        <div className="space-y-2">
                            <Link
                                href="/admin/products"
                                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <Package className="w-5 h-5 text-blue-500" />
                                    <span className="font-medium text-gray-700 dark:text-gray-300">
                                        إدارة المنتجات
                                    </span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// SEO Tip Component
function SEOTip({ title, description, icon }: { title: string; description: string; icon: string }) {
    return (
        <li className="flex items-start gap-3">
            <span className="text-xl">{icon}</span>
            <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">{title}</p>
                <p className="text-xs text-gray-500">{description}</p>
            </div>
        </li>
    );
}

// Score Bar Component
function ScoreBar({
    label,
    value,
    total,
    color
}: {
    label: string;
    value: number;
    total: number;
    color: 'green' | 'yellow' | 'red';
}) {
    const percentage = total > 0 ? (value / total) * 100 : 0;

    const colors = {
        green: 'bg-green-500',
        yellow: 'bg-yellow-500',
        red: 'bg-red-500',
    };

    return (
        <div>
            <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">{label}</span>
                <span className="font-medium text-gray-900 dark:text-white">{value}</span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                    className={`h-full ${colors[color]} rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
