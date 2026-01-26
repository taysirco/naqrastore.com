"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import StatCard, { SEOScoreCard } from '@/components/admin/StatCard';
import {
    Package,
    ShoppingCart,
    TrendingUp,
    Plus,
    Eye,
    Edit2,
    ArrowRight
} from 'lucide-react';
import type { Product, DashboardStats } from '@/types/admin';
import { formatPrice, formatRelativeTime } from '@/lib/admin-utils';

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [recentProducts, setRecentProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch dashboard stats
        async function fetchData() {
            try {
                // Fetch stats
                const statsRes = await fetch('/api/admin/analytics');
                if (statsRes.ok) {
                    const statsData = await statsRes.json();
                    setStats(statsData);
                }

                // Fetch recent products
                const productsRes = await fetch('/api/products?limit=5');
                if (productsRes.ok) {
                    const productsData = await productsRes.json();
                    setRecentProducts(Array.isArray(productsData) ? productsData.slice(0, 5) : []);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        مرحباً بك! 👋
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        إليك نظرة عامة على متجرك اليوم
                    </p>
                </div>

                <div className="flex gap-3">
                    <Link
                        href="/admin/products/new"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-200"
                    >
                        <Plus className="w-5 h-5" />
                        إضافة منتج
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="إجمالي المنتجات"
                    value={loading ? '...' : stats?.totalProducts || 0}
                    subtitle={`${stats?.activeProducts || 0} نشط • ${stats?.draftProducts || 0} مسودة`}
                    icon="products"
                    color="blue"
                />

                <StatCard
                    title="الفئات"
                    value={loading ? '...' : stats?.totalCategories || 0}
                    subtitle="فئة رئيسية"
                    icon="categories"
                    color="purple"
                />

                <StatCard
                    title="الطلبات"
                    value={loading ? '...' : stats?.totalOrders || 0}
                    subtitle={`${stats?.pendingOrders || 0} قيد الانتظار`}
                    icon="orders"
                    color="green"
                />

                <StatCard
                    title="منتجات منخفضة المخزون"
                    value={loading ? '...' : stats?.lowStockProducts || 0}
                    subtitle="تحتاج إعادة تعبئة"
                    icon="alert"
                    color="orange"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Products */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            أحدث المنتجات
                        </h2>
                        <Link
                            href="/admin/products"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                        >
                            عرض الكل
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="p-6 space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="animate-pulse flex gap-4">
                                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-xl" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : recentProducts.length === 0 ? (
                        <div className="p-12 text-center">
                            <Package className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                لا توجد منتجات بعد
                            </p>
                            <Link
                                href="/admin/products/new"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700"
                            >
                                <Plus className="w-4 h-4" />
                                أضف أول منتج
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100 dark:divide-gray-700">
                            {recentProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                                >
                                    {/* Image */}
                                    <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                                        {product.images?.[0]?.url ? (
                                            <img
                                                src={product.images[0].url}
                                                alt={product.translations?.ar?.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Package className="w-6 h-6 text-gray-400" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-gray-900 dark:text-white truncate">
                                            {product.translations?.ar?.name || product.translations?.en?.name || 'بدون اسم'}
                                        </h3>
                                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                            <span>{formatPrice(product.price)}</span>
                                            <span>•</span>
                                            <span>{product.brand}</span>
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div className="flex items-center gap-2">
                                        <span className={`
                                            px-2 py-1 rounded-full text-xs font-bold
                                            ${product.status === 'active'
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                            }
                                        `}>
                                            {product.status === 'active' ? 'نشط' : 'مسودة'}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-1">
                                        <Link
                                            href={`/admin/products/${product.id}`}
                                            className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </Link>
                                        <Link
                                            href={`/admin/products/${product.id}/edit`}
                                            className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                        >
                                            <Edit2 className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* SEO Score & Quick Actions */}
                <div className="space-y-6">
                    {/* SEO Score */}
                    <SEOScoreCard score={stats?.averageSEOScore || 0} />

                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                            إجراءات سريعة
                        </h3>
                        <div className="space-y-2">
                            <QuickAction
                                href="/admin/products/new"
                                icon={<Plus className="w-5 h-5" />}
                                label="إضافة منتج جديد"
                                color="blue"
                            />
                            <QuickAction
                                href="/admin/categories/new"
                                icon={<Plus className="w-5 h-5" />}
                                label="إضافة فئة جديدة"
                                color="purple"
                            />
                            <QuickAction
                                href="/admin/seo"
                                icon={<TrendingUp className="w-5 h-5" />}
                                label="تحسين SEO"
                                color="green"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Quick Action Component
function QuickAction({
    href,
    icon,
    label,
    color
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
    color: 'blue' | 'purple' | 'green';
}) {
    const colors = {
        blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
        purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
        green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    };

    return (
        <Link
            href={href}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors group"
        >
            <div className={`w-10 h-10 rounded-xl ${colors[color]} flex items-center justify-center`}>
                {icon}
            </div>
            <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                {label}
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
    );
}
