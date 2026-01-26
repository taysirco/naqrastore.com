"use client";

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FormInput, FormTextarea, FormSelect, FormToggle, FormSection, Button } from '@/components/admin/FormField';
import ImageUploader from '@/components/admin/ImageUploader';
import SEOGenerator from '@/components/admin/SEOGenerator';
import { DualSEOPreview, SEOScoreIndicator } from '@/components/admin/SEOPreview';
import { useToast } from '@/components/admin/Toast';
import {
    Save,
    Eye,
    ArrowLeft,
    Package,
    Search,
    Sparkles,
    Trash2,
    ExternalLink,
    Loader2
} from 'lucide-react';
import type { Product, ProductImage } from '@/types/admin';
import { DEFAULT_BRANDS, DEFAULT_CATEGORIES } from '@/types/admin';
import { calculateSEOScore, productToFormData } from '@/lib/admin-utils';
import { ConfirmDeleteModal } from '@/components/admin/Modal';

interface EditProductPageProps {
    params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: EditProductPageProps) {
    const { id } = use(params);
    const router = useRouter();
    const { success, error } = useToast();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [product, setProduct] = useState<Product | null>(null);
    const [images, setImages] = useState<ProductImage[]>([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        slug: '',
        sku: '',
        price: '',
        originalPrice: '',
        brand: 'Anker',
        categorySlug: 'power-banks',
        subcategorySlug: '',
        stock: '0',
        featured: false,
        status: 'draft',
        enName: '',
        enDesc: '',
        enShortDesc: '',
        enMetaTitle: '',
        enMetaDesc: '',
        enFeatures: '',
        arName: '',
        arDesc: '',
        arShortDesc: '',
        arMetaTitle: '',
        arMetaDesc: '',
        arFeatures: '',
        keywords: '',
        focusKeyword: '',
    });

    // Fetch product
    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`/api/products/${id}`);
                if (!res.ok) {
                    throw new Error('Product not found');
                }
                const data = await res.json();
                setProduct(data);
                setImages(data.images || []);

                // Populate form
                setFormData({
                    slug: data.slug || '',
                    sku: data.sku || '',
                    price: String(data.price || ''),
                    originalPrice: data.originalPrice ? String(data.originalPrice) : '',
                    brand: data.brand || 'Anker',
                    categorySlug: data.categorySlug || 'power-banks',
                    subcategorySlug: data.subcategorySlug || '',
                    stock: String(data.stock || 0),
                    featured: data.featured || false,
                    status: data.status || 'draft',
                    enName: data.translations?.en?.name || '',
                    enDesc: data.translations?.en?.description || '',
                    enShortDesc: data.translations?.en?.shortDescription || '',
                    enMetaTitle: data.translations?.en?.metaTitle || '',
                    enMetaDesc: data.translations?.en?.metaDesc || '',
                    enFeatures: data.translations?.en?.features?.join('\n') || '',
                    arName: data.translations?.ar?.name || '',
                    arDesc: data.translations?.ar?.description || '',
                    arShortDesc: data.translations?.ar?.shortDescription || '',
                    arMetaTitle: data.translations?.ar?.metaTitle || '',
                    arMetaDesc: data.translations?.ar?.metaDesc || '',
                    arFeatures: data.translations?.ar?.features?.join('\n') || '',
                    keywords: data.seo?.keywords || '',
                    focusKeyword: data.seo?.focusKeyword || '',
                });
            } catch (err) {
                console.error('Error fetching product:', err);
                error('خطأ', 'فشل في تحميل المنتج');
                router.push('/admin/products');
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id, router, error]);

    // Update form field
    const updateField = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Apply SEO generated content
    const handleApplySEO = (seo: {
        metaTitle: string;
        metaTitleAr: string;
        metaDesc: string;
        metaDescAr: string;
        keywords: string[];
        keywordsAr: string[];
        focusKeyword: string;
        focusKeywordAr: string;
    }) => {
        setFormData(prev => ({
            ...prev,
            enMetaTitle: seo.metaTitle,
            enMetaDesc: seo.metaDesc,
            arMetaTitle: seo.metaTitleAr,
            arMetaDesc: seo.metaDescAr,
            keywords: [...seo.keywordsAr, ...seo.keywords].join(', '),
            focusKeyword: seo.focusKeywordAr,
        }));
        success('تم التطبيق', 'تم تطبيق محتوى SEO بنجاح');
    };

    // Get SEO score
    const getSEOScore = () => {
        if (!product) return 0;
        const analysis = calculateSEOScore({
            ...product,
            translations: {
                en: {
                    name: formData.enName,
                    description: formData.enDesc,
                    metaTitle: formData.enMetaTitle,
                    metaDesc: formData.enMetaDesc,
                },
                ar: {
                    name: formData.arName,
                    description: formData.arDesc,
                    metaTitle: formData.arMetaTitle,
                    metaDesc: formData.arMetaDesc,
                },
            },
            seo: {
                keywords: formData.keywords,
                focusKeyword: formData.focusKeyword,
            },
            images,
        });
        return analysis.score;
    };

    // Submit form
    const handleSubmit = async (e: React.FormEvent, newStatus?: string) => {
        e.preventDefault();

        if (!formData.slug || !formData.enName || !formData.arName || !formData.price) {
            error('خطأ', 'يرجى ملء جميع الحقول المطلوبة');
            return;
        }

        setSaving(true);

        try {
            const payload = {
                ...formData,
                price: Number(formData.price),
                originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
                stock: Number(formData.stock) || 0,
                status: newStatus || formData.status,
                images,
            };

            const res = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to update product');
            }

            success('تم الحفظ', 'تم تحديث المنتج بنجاح');

            // Update local state
            if (newStatus) {
                setFormData(prev => ({ ...prev, status: newStatus }));
            }
        } catch (err) {
            console.error('Error updating product:', err);
            error('خطأ', err instanceof Error ? err.message : 'فشل في تحديث المنتج');
        } finally {
            setSaving(false);
        }
    };

    // Delete product
    const handleDelete = async () => {
        setDeleting(true);
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Delete failed');
            }

            success('تم الحذف', 'تم حذف المنتج بنجاح');
            router.push('/admin/products');
        } catch (err) {
            console.error('Delete error:', err);
            error('خطأ', 'فشل في حذف المنتج');
        } finally {
            setDeleting(false);
            setDeleteModal(false);
        }
    };

    // Get category label
    const getCategoryLabel = () => {
        const cat = DEFAULT_CATEGORIES.find(c => c.value === formData.categorySlug);
        return { en: cat?.label || '', ar: cat?.labelAr || '' };
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
                            تعديل المنتج
                        </h1>
                        <p className="text-gray-500 flex items-center gap-2">
                            {formData.arName || formData.enName}
                            <span className={`
                                px-2 py-0.5 rounded-full text-xs font-bold
                                ${formData.status === 'active'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                }
                            `}>
                                {formData.status === 'active' ? 'نشط' : 'مسودة'}
                            </span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <SEOScoreIndicator score={getSEOScore()} label="SEO" />

                    <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-2" />

                    <Link
                        href={`/product/${formData.slug}`}
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

                    <Button
                        variant="secondary"
                        onClick={(e) => handleSubmit(e)}
                        loading={saving}
                        icon={<Save className="w-4 h-4" />}
                    >
                        حفظ
                    </Button>

                    {formData.status === 'draft' ? (
                        <Button
                            variant="primary"
                            onClick={(e) => handleSubmit(e, 'active')}
                            loading={saving}
                            icon={<Eye className="w-4 h-4" />}
                        >
                            نشر
                        </Button>
                    ) : (
                        <Button
                            variant="secondary"
                            onClick={(e) => handleSubmit(e, 'draft')}
                            loading={saving}
                        >
                            إلغاء النشر
                        </Button>
                    )}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <FormSection
                    title="المعلومات الأساسية"
                    titleIcon={<Package className="w-5 h-5 text-blue-500" />}
                    borderColor="blue"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            label="Slug (رابط URL)"
                            value={formData.slug}
                            onChange={(e) => updateField('slug', e.target.value)}
                            required
                        />
                        <FormInput
                            label="SKU (رمز المنتج)"
                            value={formData.sku}
                            onChange={(e) => updateField('sku', e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormInput
                            label="السعر (جنيه)"
                            type="number"
                            value={formData.price}
                            onChange={(e) => updateField('price', e.target.value)}
                            required
                        />
                        <FormInput
                            label="السعر الأصلي"
                            type="number"
                            value={formData.originalPrice}
                            onChange={(e) => updateField('originalPrice', e.target.value)}
                        />
                        <FormInput
                            label="المخزون"
                            type="number"
                            value={formData.stock}
                            onChange={(e) => updateField('stock', e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormSelect
                            label="العلامة التجارية"
                            value={formData.brand}
                            onChange={(e) => updateField('brand', e.target.value)}
                            options={DEFAULT_BRANDS.map(b => ({ value: b.label, label: `${b.label} (${b.labelAr})` }))}
                            required
                        />
                        <FormSelect
                            label="الفئة"
                            value={formData.categorySlug}
                            onChange={(e) => updateField('categorySlug', e.target.value)}
                            options={DEFAULT_CATEGORIES.map(c => ({ value: c.value, label: `${c.labelAr} (${c.label})` }))}
                            required
                        />
                    </div>

                    <FormToggle
                        label="منتج مميز"
                        description="سيظهر في قسم المنتجات المميزة"
                        checked={formData.featured}
                        onChange={(checked) => updateField('featured', checked)}
                    />
                </FormSection>

                {/* Images */}
                <FormSection title="صور المنتج" borderColor="purple">
                    <ImageUploader
                        images={images}
                        onChange={setImages}
                        maxImages={10}
                    />
                </FormSection>

                {/* English Content */}
                <FormSection
                    title="English Content"
                    titleIcon={<span className="text-lg">🇺🇸</span>}
                    borderColor="blue"
                >
                    <FormInput
                        label="Product Name"
                        value={formData.enName}
                        onChange={(e) => updateField('enName', e.target.value)}
                        required
                    />
                    <FormTextarea
                        label="Short Description"
                        value={formData.enShortDesc}
                        onChange={(e) => updateField('enShortDesc', e.target.value)}
                        rows={2}
                    />
                    <FormTextarea
                        label="Full Description"
                        value={formData.enDesc}
                        onChange={(e) => updateField('enDesc', e.target.value)}
                        rows={5}
                    />
                    <FormTextarea
                        label="Features (one per line)"
                        value={formData.enFeatures}
                        onChange={(e) => updateField('enFeatures', e.target.value)}
                        rows={4}
                    />
                </FormSection>

                {/* Arabic Content */}
                <FormSection
                    title="المحتوى العربي"
                    titleIcon={<span className="text-lg">🇪🇬</span>}
                    borderColor="green"
                    dir="rtl"
                >
                    <FormInput
                        label="اسم المنتج"
                        value={formData.arName}
                        onChange={(e) => updateField('arName', e.target.value)}
                        required
                        dir="rtl"
                    />
                    <FormTextarea
                        label="وصف مختصر"
                        value={formData.arShortDesc}
                        onChange={(e) => updateField('arShortDesc', e.target.value)}
                        rows={2}
                        dir="rtl"
                    />
                    <FormTextarea
                        label="الوصف الكامل"
                        value={formData.arDesc}
                        onChange={(e) => updateField('arDesc', e.target.value)}
                        rows={5}
                        dir="rtl"
                    />
                    <FormTextarea
                        label="المميزات"
                        value={formData.arFeatures}
                        onChange={(e) => updateField('arFeatures', e.target.value)}
                        rows={4}
                        dir="rtl"
                    />
                </FormSection>

                {/* SEO Generator */}
                <SEOGenerator
                    productName={formData.enName}
                    productNameAr={formData.arName}
                    category={getCategoryLabel().en}
                    categoryAr={getCategoryLabel().ar}
                    brand={formData.brand}
                    price={Number(formData.price) || 0}
                    onApply={handleApplySEO}
                />

                {/* SEO Settings */}
                <FormSection
                    title="إعدادات SEO"
                    titleIcon={<Search className="w-5 h-5 text-purple-500" />}
                    borderColor="purple"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            label="Meta Title (EN)"
                            value={formData.enMetaTitle}
                            onChange={(e) => updateField('enMetaTitle', e.target.value)}
                            hint={`${formData.enMetaTitle.length}/60`}
                        />
                        <FormInput
                            label="عنوان Meta (AR)"
                            value={formData.arMetaTitle}
                            onChange={(e) => updateField('arMetaTitle', e.target.value)}
                            hint={`${formData.arMetaTitle.length}/60`}
                            dir="rtl"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormTextarea
                            label="Meta Description (EN)"
                            value={formData.enMetaDesc}
                            onChange={(e) => updateField('enMetaDesc', e.target.value)}
                            rows={3}
                            charCount
                            maxChars={160}
                        />
                        <FormTextarea
                            label="وصف Meta (AR)"
                            value={formData.arMetaDesc}
                            onChange={(e) => updateField('arMetaDesc', e.target.value)}
                            rows={3}
                            charCount
                            maxChars={160}
                            dir="rtl"
                        />
                    </div>

                    <FormTextarea
                        label="الكلمات المفتاحية"
                        value={formData.keywords}
                        onChange={(e) => updateField('keywords', e.target.value)}
                        rows={2}
                    />

                    <FormInput
                        label="الكلمة المفتاحية الرئيسية"
                        value={formData.focusKeyword}
                        onChange={(e) => updateField('focusKeyword', e.target.value)}
                    />
                </FormSection>

                {/* SEO Preview */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                    <DualSEOPreview
                        titleAr={formData.arMetaTitle || formData.arName}
                        descriptionAr={formData.arMetaDesc || formData.arShortDesc}
                        titleEn={formData.enMetaTitle || formData.enName}
                        descriptionEn={formData.enMetaDesc || formData.enShortDesc}
                        urlSlug={formData.slug}
                    />
                </div>

                {/* Submit */}
                <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => router.back()}
                    >
                        إلغاء
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        loading={saving}
                        icon={<Sparkles className="w-4 h-4" />}
                    >
                        حفظ التغييرات
                    </Button>
                </div>
            </form>

            {/* Delete Modal */}
            <ConfirmDeleteModal
                isOpen={deleteModal}
                onClose={() => setDeleteModal(false)}
                onConfirm={handleDelete}
                itemName={formData.arName || formData.enName}
                loading={deleting}
            />
        </div>
    );
}
