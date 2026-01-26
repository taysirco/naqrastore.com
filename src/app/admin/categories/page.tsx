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
    FolderTree,
    Eye,
    Edit2,
    GripVertical,
    Package
} from 'lucide-react';
import type { Category } from '@/types/admin';

export default function CategoriesPage() {
    const router = useRouter();
    const { success, error } = useToast();

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        categoryId?: string;
        categoryName?: string;
        isBulk?: boolean;
    }>({ isOpen: false });
    const [deleting, setDeleting] = useState(false);

    // Fetch categories
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/categories');
            if (res.ok) {
                const data = await res.json();
                setCategories(Array.isArray(data) ? data : []);
            }
        } catch (err) {
            console.error('Error fetching categories:', err);
            error('خطأ', 'فشل في تحميل الفئات');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Handle delete
    const handleDelete = async () => {
        setDeleting(true);
        try {
            if (deleteModal.isBulk) {
                const res = await fetch('/api/categories', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ids: selectedIds }),
                });

                if (res.ok) {
                    success('تم الحذف', `تم حذف ${selectedIds.length} فئة بنجاح`);
                    setSelectedIds([]);
                    fetchCategories();
                } else {
                    throw new Error('Delete failed');
                }
            } else if (deleteModal.categoryId) {
                const res = await fetch(`/api/categories/${deleteModal.categoryId}`, {
                    method: 'DELETE',
                });

                if (res.ok) {
                    success('تم الحذف', 'تم حذف الفئة بنجاح');
                    fetchCategories();
                } else {
                    throw new Error('Delete failed');
                }
            }
        } catch (err) {
            console.error('Delete error:', err);
            error('خطأ', 'فشل في حذف الفئة');
        } finally {
            setDeleting(false);
            setDeleteModal({ isOpen: false });
        }
    };

    // Table columns
    const columns = [
        {
            key: 'order',
            label: '#',
            width: '60px',
            render: (category: Category) => (
                <div className="flex items-center gap-2 text-gray-400">
                    <GripVertical className="w-4 h-4" />
                    <span>{category.order}</span>
                </div>
            ),
        },
        {
            key: 'category',
            label: 'الفئة',
            render: (category: Category) => (
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {category.image ? (
                            <img
                                src={category.image}
                                alt={category.translations?.ar?.name}
                                className="w-full h-full object-cover"
                            />
                        ) : category.icon ? (
                            <span className="text-2xl">{category.icon}</span>
                        ) : (
                            <FolderTree className="w-5 h-5 text-purple-500" />
                        )}
                    </div>
                    <div className="min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white truncate">
                            {category.translations?.ar?.name || category.translations?.en?.name || 'بدون اسم'}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                            {category.slug}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            key: 'englishName',
            label: 'English Name',
            render: (category: Category) => (
                <span className="text-gray-600 dark:text-gray-400">
                    {category.translations?.en?.name || '-'}
                </span>
            ),
        },
        {
            key: 'products',
            label: 'المنتجات',
            align: 'center' as const,
            render: (category: Category) => (
                <div className="flex items-center justify-center gap-1">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{category.productCount || 0}</span>
                </div>
            ),
        },
        {
            key: 'status',
            label: 'الحالة',
            render: (category: Category) => {
                const statusMap: Record<string, { label: string; type: 'success' | 'warning' | 'default' }> = {
                    active: { label: 'نشط', type: 'success' },
                    inactive: { label: 'غير نشط', type: 'warning' },
                };
                const status = statusMap[category.status] || statusMap.active;
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
                        الفئات
                    </h1>
                    <p className="text-gray-500">
                        إدارة فئات المنتجات
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={fetchCategories}
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

                    <Link href="/admin/categories/new">
                        <Button
                            variant="primary"
                            icon={<Plus className="w-4 h-4" />}
                        >
                            إضافة فئة
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Data Table */}
            <DataTable
                data={categories}
                columns={columns}
                keyField="id"
                loading={loading}
                selectable
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                searchable
                searchPlaceholder="البحث في الفئات..."
                emptyMessage="No categories found"
                emptyMessageAr="لا توجد فئات"
                actions={(category: Category) => (
                    <ActionMenu
                        items={[
                            {
                                label: 'عرض',
                                icon: <Eye className="w-4 h-4" />,
                                onClick: () => router.push(`/admin/categories/${category.id}`),
                            },
                            {
                                label: 'تعديل',
                                icon: <Edit2 className="w-4 h-4" />,
                                onClick: () => router.push(`/admin/categories/${category.id}/edit`),
                            },
                            {
                                label: 'حذف',
                                icon: <Trash2 className="w-4 h-4" />,
                                onClick: () => setDeleteModal({
                                    isOpen: true,
                                    categoryId: category.id,
                                    categoryName: category.translations?.ar?.name || category.translations?.en?.name,
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
                    ? `${selectedIds.length} فئة`
                    : deleteModal.categoryName
                }
                loading={deleting}
            />
        </div>
    );
}
