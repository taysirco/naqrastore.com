"use client";

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/admin/FormField';
import { SEOScoreIndicator } from '@/components/admin/SEOPreview';
import { ConfirmDeleteModal } from '@/components/admin/Modal';
import { useToast } from '@/components/admin/Toast';
import {
    ArrowLeft,
    Package,
    Edit2,
    Trash2,
    ExternalLink,
    Tag,
    DollarSign,
    Box,
    Calendar,
    Loader2,
    Globe,
    Star
} from 'lucide-react';
import type { Product } from '@/types/admin';
import { formatPrice, formatDate, calculateSEOScore } from '@/lib/admin-utils';

interface ProductDetailPageProps {
    params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { id } = use(params);
    const router = useRouter();
    const { success, error } = useToast();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`/api/products/${id}`);
                if (!res.ok) throw new Error('Product not found');
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.error('Error fetching product:', err);
                error('خطأ', 'المنتج غير موجود');
                router.push('/admin/products');
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id, router, error]);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Delete failed');
            success('تم الحذف', 'تم حذف المنتج بنجاح');
            router.push('/admin/products');
        } catch (err) {
            error('خطأ', 'فشل في حذف المنتج');
        } finally {
            setDeleting(false);
            setDeleteModal(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-12">
                <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    المنتج غير موجود
                </h2>
                <Link href="/admin/products" className="text-blue-600 hover:underline">
                    العودة للمنتجات
                </Link>
            </div>
        );
    }

    const seoScore = calculateSEOScore(product).score;

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {product.translations?.ar?.name || product.translations?.en?.name}
                        </h1>
                        <p className="text-gray-500 flex items-center gap-2">
                            <span>{product.brand}</span>
                            <span>•</span>
                            <span>{product.slug}</span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <SEOScoreIndicator score={seoScore} />

                    <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-2" />

                    <Link
                        href={`/product/${product.slug}`}
                        target="_blank"
                        className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <ExternalLink className="w-5 h-5" />
                    </Link>

                    <Button
                        variant="ghost"
                        onClick={() => setDeleteModal(true)}
                        icon={<Trash2 className="w-4 h-4" />}
                        className="text-red-600 hover:bg-red-50"
                    >
                        حذف
                    </Button>

                    <Link href={`/admin/products/${id}/edit`}>
                        <Button variant="primary" icon={<Edit2 className="w-4 h-4" />}>
                            تعديل
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Images */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                            صور المنتج
                        </h3>

                        {product.images && product.images.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {product.images.map((image, index) => (
                                    <div
                                        key={image.id}
                                        className={`
                                            aspect-square rounded-xl overflow-hidden border-2
                                            ${index === 0 ? 'border-blue-500' : 'border-gray-200 dark:border-gray-600'}
                                        `}
                                    >
                                        <img
                                            src={image.url}
                                            alt={image.alt}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                                <Package className="w-16 h-16 text-gray-300" />
                            </div>
                        )}
                    </div>

                    {/* Descriptions */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="grid grid-cols-2 divide-x divide-gray-100 dark:divide-gray-700">
                            {/* Arabic */}
                            <div className="p-6" dir="rtl">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-lg">🇪🇬</span>
                                    <h3 className="font-bold text-gray-900 dark:text-white">
                                        المحتوى العربي
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">الاسم</p>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {product.translations?.ar?.name || '-'}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">الوصف</p>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                            {product.translations?.ar?.description || '-'}
                                        </p>
                                    </div>

                                    {product.translations?.ar?.features && product.translations.ar.features.length > 0 && (
                                        <div>
                                            <p className="text-sm text-gray-500 mb-2">المميزات</p>
                                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                                {product.translations.ar.features.map((f, i) => (
                                                    <li key={i}>{f}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* English */}
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-lg">🇺🇸</span>
                                    <h3 className="font-bold text-gray-900 dark:text-white">
                                        English Content
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Name</p>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {product.translations?.en?.name || '-'}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Description</p>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                            {product.translations?.en?.description || '-'}
                                        </p>
                                    </div>

                                    {product.translations?.en?.features && product.translations.en.features.length > 0 && (
                                        <div>
                                            <p className="text-sm text-gray-500 mb-2">Features</p>
                                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                                {product.translations.en.features.map((f, i) => (
                                                    <li key={i}>{f}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SEO */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-4">
                            <Globe className="w-5 h-5 text-purple-500" />
                            <h3 className="font-bold text-gray-900 dark:text-white">
                                SEO
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Meta Title (AR)</p>
                                    <p className="text-sm text-gray-900 dark:text-white">
                                        {product.translations?.ar?.metaTitle || '-'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Meta Description (AR)</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        {product.translations?.ar?.metaDesc || '-'}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Meta Title (EN)</p>
                                    <p className="text-sm text-gray-900 dark:text-white">
                                        {product.translations?.en?.metaTitle || '-'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Meta Description (EN)</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        {product.translations?.en?.metaDesc || '-'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {product.seo?.keywords && (
                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <p className="text-xs text-gray-500 mb-2">Keywords</p>
                                <div className="flex flex-wrap gap-2">
                                    {product.seo.keywords.split(',').map((kw, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs"
                                        >
                                            {kw.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Status */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                            حالة المنتج
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">الحالة</span>
                                <span className={`
                                    px-3 py-1 rounded-full text-sm font-bold
                                    ${product.status === 'active'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                    }
                                `}>
                                    {product.status === 'active' ? 'نشط' : 'مسودة'}
                                </span>
                            </div>

                            {product.featured && (
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">مميز</span>
                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-4">
                            <DollarSign className="w-5 h-5 text-green-500" />
                            <h3 className="font-bold text-gray-900 dark:text-white">
                                التسعير
                            </h3>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">السعر</span>
                                <span className="text-xl font-bold text-gray-900 dark:text-white">
                                    {formatPrice(product.price)}
                                </span>
                            </div>

                            {product.originalPrice && product.originalPrice > product.price && (
                                <>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">قبل الخصم</span>
                                        <span className="text-gray-400 line-through">
                                            {formatPrice(product.originalPrice)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">الخصم</span>
                                        <span className="text-green-600 font-bold">
                                            {product.discountPercentage}%
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Inventory */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-4">
                            <Box className="w-5 h-5 text-blue-500" />
                            <h3 className="font-bold text-gray-900 dark:text-white">
                                المخزون
                            </h3>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">الكمية</span>
                                <span className={`
                                    font-bold
                                    ${(product.stock || 0) === 0
                                        ? 'text-red-600'
                                        : (product.stock || 0) <= 5
                                            ? 'text-yellow-600'
                                            : 'text-gray-900 dark:text-white'
                                    }
                                `}>
                                    {product.stock || 0}
                                </span>
                            </div>

                            {product.sku && (
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">SKU</span>
                                    <span className="font-mono text-sm">
                                        {product.sku}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Category */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-4">
                            <Tag className="w-5 h-5 text-purple-500" />
                            <h3 className="font-bold text-gray-900 dark:text-white">
                                التصنيف
                            </h3>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">العلامة</span>
                                <span className="font-medium">{product.brand}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">الفئة</span>
                                <span className="font-medium">{product.categorySlug}</span>
                            </div>
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-4">
                            <Calendar className="w-5 h-5 text-gray-500" />
                            <h3 className="font-bold text-gray-900 dark:text-white">
                                التواريخ
                            </h3>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">تاريخ الإنشاء</span>
                                <span>{product.createdAt ? formatDate(product.createdAt) : '-'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">آخر تحديث</span>
                                <span>{product.updatedAt ? formatDate(product.updatedAt) : '-'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            <ConfirmDeleteModal
                isOpen={deleteModal}
                onClose={() => setDeleteModal(false)}
                onConfirm={handleDelete}
                itemName={product.translations?.ar?.name || product.translations?.en?.name}
                loading={deleting}
            />
        </div>
    );
}
