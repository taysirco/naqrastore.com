"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DataTable, { StatusBadge, ActionMenu } from '@/components/admin/DataTable';
import { ConfirmDeleteModal } from '@/components/admin/Modal';
import { useToast } from '@/components/admin/Toast';
import { Button } from '@/components/admin/FormField';
import {
    Plus,
    Trash2,
    RefreshCw,
    Package,
    Eye,
    Edit2,
    Copy,
    MoreVertical
} from 'lucide-react';
import type { Product } from '@/types/admin';
import { formatPrice } from '@/lib/admin-utils';

export default function ProductsPage() {
    const router = useRouter();
    const { success, error } = useToast();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        productId?: string;
        productName?: string;
        isBulk?: boolean;
    }>({ isOpen: false });
    const [deleting, setDeleting] = useState(false);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 1,
    });

    // Fetch products
    const fetchProducts = async (page = 1) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/products?page=${page}&limit=${pagination.limit}`);
            if (res.ok) {
                const data = await res.json();
                if (data.items) {
                    setProducts(data.items);
                    setPagination(data.pagination);
                } else {
                    // Old API format
                    setProducts(Array.isArray(data) ? data : []);
                }
            }
        } catch (err) {
            console.error('Error fetching products:', err);
            error('خطأ', 'فشل في تحميل المنتجات');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle delete
    const handleDelete = async () => {
        setDeleting(true);
        try {
            if (deleteModal.isBulk) {
                // Bulk delete
                const res = await fetch('/api/products', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ids: selectedIds }),
                });

                if (res.ok) {
                    success('تم الحذف', `تم حذف ${selectedIds.length} منتج بنجاح`);
                    setSelectedIds([]);
                    fetchProducts(pagination.page);
                } else {
                    throw new Error('Delete failed');
                }
            } else if (deleteModal.productId) {
                // Single delete
                const res = await fetch(`/api/products/${deleteModal.productId}`, {
                    method: 'DELETE',
                });

                if (res.ok) {
                    success('تم الحذف', 'تم حذف المنتج بنجاح');
                    fetchProducts(pagination.page);
                } else {
                    throw new Error('Delete failed');
                }
            }
        } catch (err) {
            console.error('Delete error:', err);
            error('خطأ', 'فشل في حذف المنتج');
        } finally {
            setDeleting(false);
            setDeleteModal({ isOpen: false });
        }
    };

    // Duplicate product
    const handleDuplicate = async (product: Product) => {
        try {
            const newProduct = {
                ...product,
                slug: `${product.slug}-copy`,
                enName: product.translations.en.name,
                arName: product.translations.ar.name,
                enDesc: product.translations.en.description,
                arDesc: product.translations.ar.description,
                enMetaTitle: product.translations.en.metaTitle,
                arMetaTitle: product.translations.ar.metaTitle,
                enMetaDesc: product.translations.en.metaDesc,
                arMetaDesc: product.translations.ar.metaDesc,
                keywords: product.seo?.keywords,
                status: 'draft',
            };

            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct),
            });

            if (res.ok) {
                success('تم النسخ', 'تم نسخ المنتج بنجاح');
                fetchProducts(pagination.page);
            } else {
                throw new Error('Duplicate failed');
            }
        } catch (err) {
            console.error('Duplicate error:', err);
            error('خطأ', 'فشل في نسخ المنتج');
        }
    };

    // Table columns
    const columns = [
        {
            key: 'product',
            label: 'المنتج',
            render: (product: Product) => (
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                        {product.images?.[0]?.url ? (
                            <img
                                src={product.images[0].url}
                                alt={product.translations?.ar?.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Package className="w-5 h-5 text-gray-400" />
                            </div>
                        )}
                    </div>
                    <div className="min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white truncate">
                            {product.translations?.ar?.name || product.translations?.en?.name || 'بدون اسم'}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                            {product.slug}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            key: 'brand',
            label: 'العلامة',
            sortable: true,
            render: (product: Product) => (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
                    {product.brand}
                </span>
            ),
        },
        {
            key: 'price',
            label: 'السعر',
            sortable: true,
            render: (product: Product) => (
                <div>
                    <p className="font-bold text-gray-900 dark:text-white">
                        {formatPrice(product.price)}
                    </p>
                    {product.originalPrice && product.originalPrice > product.price && (
                        <p className="text-sm text-gray-400 line-through">
                            {formatPrice(product.originalPrice)}
                        </p>
                    )}
                </div>
            ),
        },
        {
            key: 'stock',
            label: 'المخزون',
            sortable: true,
            align: 'center' as const,
            render: (product: Product) => (
                <span className={`
                    font-medium
                    ${(product.stock || 0) === 0
                        ? 'text-red-600'
                        : (product.stock || 0) <= (product.lowStockThreshold || 5)
                            ? 'text-yellow-600'
                            : 'text-gray-900 dark:text-white'
                    }
                `}>
                    {product.stock || 0}
                </span>
            ),
        },
        {
            key: 'status',
            label: 'الحالة',
            render: (product: Product) => {
                const statusMap: Record<string, { label: string; type: 'success' | 'warning' | 'default' }> = {
                    active: { label: 'نشط', type: 'success' },
                    draft: { label: 'مسودة', type: 'warning' },
                    archived: { label: 'مؤرشف', type: 'default' },
                };
                const status = statusMap[product.status] || statusMap.draft;
                return <StatusBadge status={status.label} type={status.type} />;
            },
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        المنتجات
                    </h1>
                    <p className="text-gray-500">
                        إدارة جميع منتجات المتجر
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => fetchProducts(pagination.page)}
                        icon={<RefreshCw className="w-4 h-4" />}
                    >
                        تحديث
                    </Button>

                    {selectedIds.length > 0 && (
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => setDeleteModal({ isOpen: true, isBulk: true })}
                            icon={<Trash2 className="w-4 h-4" />}
                        >
                            حذف ({selectedIds.length})
                        </Button>
                    )}

                    <Link href="/admin/products/new">
                        <Button
                            variant="primary"
                            icon={<Plus className="w-4 h-4" />}
                        >
                            إضافة منتج
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Data Table */}
            <DataTable
                data={products}
                columns={columns}
                keyField="id"
                loading={loading}
                selectable
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                searchable
                searchPlaceholder="البحث في المنتجات..."
                emptyMessage="No products found"
                emptyMessageAr="لا توجد منتجات"
                pagination={{
                    ...pagination,
                    onPageChange: (page) => {
                        setPagination(p => ({ ...p, page }));
                        fetchProducts(page);
                    },
                }}
                actions={(product: Product) => (
                    <ActionMenu
                        items={[
                            {
                                label: 'عرض',
                                icon: <Eye className="w-4 h-4" />,
                                onClick: () => router.push(`/admin/products/${product.id}`),
                            },
                            {
                                label: 'تعديل',
                                icon: <Edit2 className="w-4 h-4" />,
                                onClick: () => router.push(`/admin/products/${product.id}/edit`),
                            },
                            {
                                label: 'نسخ',
                                icon: <Copy className="w-4 h-4" />,
                                onClick: () => handleDuplicate(product),
                            },
                            {
                                label: 'حذف',
                                icon: <Trash2 className="w-4 h-4" />,
                                onClick: () => setDeleteModal({
                                    isOpen: true,
                                    productId: product.id,
                                    productName: product.translations?.ar?.name || product.translations?.en?.name,
                                }),
                                variant: 'danger',
                            },
                        ]}
                    />
                )}
            />

            {/* Delete Modal */}
            <ConfirmDeleteModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false })}
                onConfirm={handleDelete}
                itemName={deleteModal.isBulk
                    ? `${selectedIds.length} منتج`
                    : deleteModal.productName
                }
                loading={deleting}
            />
        </div>
    );
}
