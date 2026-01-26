"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormInput, FormTextarea, FormSelect, FormToggle, FormSection, Button } from '@/components/admin/FormField';
import ImageUploader from '@/components/admin/ImageUploader';
import SEOGenerator from '@/components/admin/SEOGenerator';
import { DualSEOPreview } from '@/components/admin/SEOPreview';
import { useToast } from '@/components/admin/Toast';
import {
    Save,
    Eye,
    ArrowLeft,
    Package,
    Globe,
    Search,
    Sparkles
} from 'lucide-react';
import type { ProductImage } from '@/types/admin';
import { DEFAULT_BRANDS, DEFAULT_CATEGORIES } from '@/types/admin';
import { generateSlug } from '@/lib/admin-utils';

export default function NewProductPage() {
    const router = useRouter();
    const { success, error } = useToast();

    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<ProductImage[]>([]);

    // Form state
    const [formData, setFormData] = useState({
        // Basic
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
        // English
        enName: '',
        enDesc: '',
        enShortDesc: '',
        enMetaTitle: '',
        enMetaDesc: '',
        enFeatures: '',
        // Arabic
        arName: '',
        arDesc: '',
        arShortDesc: '',
        arMetaTitle: '',
        arMetaDesc: '',
        arFeatures: '',
        // SEO
        keywords: '',
        focusKeyword: '',
    });

    // Update form field
    const updateField = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Auto-generate slug from Arabic name
    const handleArNameChange = (value: string) => {
        updateField('arName', value);
        if (!formData.slug && value) {
            const slug = generateSlug(value);
            updateField('slug', slug);
        }
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

    // Submit form
    const handleSubmit = async (e: React.FormEvent, saveAsDraft = true) => {
        e.preventDefault();

        // Validate
        if (!formData.slug || !formData.enName || !formData.arName || !formData.price) {
            error('خطأ', 'يرجى ملء جميع الحقول المطلوبة');
            return;
        }

        setLoading(true);

        try {
            const payload = {
                ...formData,
                price: Number(formData.price),
                originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
                stock: Number(formData.stock) || 0,
                status: saveAsDraft ? 'draft' : 'active',
                images,
            };

            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to create product');
            }

            success('تم الإنشاء', 'تم إنشاء المنتج بنجاح');
            router.push('/admin/products');
        } catch (err) {
            console.error('Error creating product:', err);
            error('خطأ', err instanceof Error ? err.message : 'فشل في إنشاء المنتج');
        } finally {
            setLoading(false);
        }
    };

    // Get category label
    const getCategoryLabel = () => {
        const cat = DEFAULT_CATEGORIES.find(c => c.value === formData.categorySlug);
        return { en: cat?.label || '', ar: cat?.labelAr || '' };
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            إضافة منتج جديد
                        </h1>
                        <p className="text-gray-500">أنشئ منتجاً جديداً مع دعم SEO كامل</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="secondary"
                        onClick={(e) => handleSubmit(e, true)}
                        loading={loading}
                        icon={<Save className="w-4 h-4" />}
                    >
                        حفظ كمسودة
                    </Button>
                    <Button
                        variant="primary"
                        onClick={(e) => handleSubmit(e, false)}
                        loading={loading}
                        icon={<Eye className="w-4 h-4" />}
                    >
                        نشر المنتج
                    </Button>
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
                            placeholder="anker-powercore-20k"
                            required
                            hint="سيتم توليده تلقائياً من الاسم العربي"
                        />
                        <FormInput
                            label="SKU (رمز المنتج)"
                            value={formData.sku}
                            onChange={(e) => updateField('sku', e.target.value)}
                            placeholder="ANK-2026-001"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormInput
                            label="السعر (جنيه)"
                            type="number"
                            value={formData.price}
                            onChange={(e) => updateField('price', e.target.value)}
                            placeholder="999"
                            required
                        />
                        <FormInput
                            label="السعر الأصلي (قبل الخصم)"
                            type="number"
                            value={formData.originalPrice}
                            onChange={(e) => updateField('originalPrice', e.target.value)}
                            placeholder="1299"
                        />
                        <FormInput
                            label="المخزون"
                            type="number"
                            value={formData.stock}
                            onChange={(e) => updateField('stock', e.target.value)}
                            placeholder="50"
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
                        description="سيظهر في قسم المنتجات المميزة على الصفحة الرئيسية"
                        checked={formData.featured}
                        onChange={(checked) => updateField('featured', checked)}
                    />
                </FormSection>

                {/* Images */}
                <FormSection
                    title="صور المنتج"
                    description="اسحب وأفلت الصور أو اضغط للاختيار"
                    borderColor="purple"
                >
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
                        placeholder="Anker PowerCore 20000mAh Power Bank"
                        required
                    />
                    <FormTextarea
                        label="Short Description"
                        value={formData.enShortDesc}
                        onChange={(e) => updateField('enShortDesc', e.target.value)}
                        placeholder="Brief product description for listings..."
                        rows={2}
                    />
                    <FormTextarea
                        label="Full Description"
                        value={formData.enDesc}
                        onChange={(e) => updateField('enDesc', e.target.value)}
                        placeholder="Detailed product description with features and benefits..."
                        rows={5}
                    />
                    <FormTextarea
                        label="Features (one per line)"
                        value={formData.enFeatures}
                        onChange={(e) => updateField('enFeatures', e.target.value)}
                        placeholder="20000mAh capacity&#10;PowerIQ 3.0 technology&#10;Dual USB-C ports"
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
                        onChange={(e) => handleArNameChange(e.target.value)}
                        placeholder="باور بانك انكر 20000 مللي امبير"
                        required
                        dir="rtl"
                    />
                    <FormTextarea
                        label="وصف مختصر"
                        value={formData.arShortDesc}
                        onChange={(e) => updateField('arShortDesc', e.target.value)}
                        placeholder="وصف مختصر للمنتج..."
                        rows={2}
                        dir="rtl"
                    />
                    <FormTextarea
                        label="الوصف الكامل"
                        value={formData.arDesc}
                        onChange={(e) => updateField('arDesc', e.target.value)}
                        placeholder="وصف تفصيلي للمنتج مع المميزات والفوائد..."
                        rows={5}
                        dir="rtl"
                    />
                    <FormTextarea
                        label="المميزات (واحدة في كل سطر)"
                        value={formData.arFeatures}
                        onChange={(e) => updateField('arFeatures', e.target.value)}
                        placeholder="سعة 20000 مللي امبير&#10;تقنية PowerIQ 3.0&#10;منفذين USB-C"
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
                    description="تحسين محركات البحث للظهور في النتائج الأولى"
                    borderColor="purple"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            label="Meta Title (English)"
                            value={formData.enMetaTitle}
                            onChange={(e) => updateField('enMetaTitle', e.target.value)}
                            placeholder="Product Name | Brand - Best Price in Egypt"
                            hint={`${formData.enMetaTitle.length}/60 حرف`}
                        />
                        <FormInput
                            label="عنوان Meta (عربي)"
                            value={formData.arMetaTitle}
                            onChange={(e) => updateField('arMetaTitle', e.target.value)}
                            placeholder="اسم المنتج | العلامة - أفضل سعر في مصر"
                            hint={`${formData.arMetaTitle.length}/60 حرف`}
                            dir="rtl"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormTextarea
                            label="Meta Description (English)"
                            value={formData.enMetaDesc}
                            onChange={(e) => updateField('enMetaDesc', e.target.value)}
                            placeholder="Buy original product at best price in Egypt..."
                            rows={3}
                            charCount
                            maxChars={160}
                        />
                        <FormTextarea
                            label="وصف Meta (عربي)"
                            value={formData.arMetaDesc}
                            onChange={(e) => updateField('arMetaDesc', e.target.value)}
                            placeholder="اشتري المنتج الأصلي بأفضل سعر في مصر..."
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
                        placeholder="باور بانك, انكر مصر, شاحن متنقل, power bank egypt"
                        rows={2}
                        hint="افصل بين الكلمات بفاصلة"
                    />

                    <FormInput
                        label="الكلمة المفتاحية الرئيسية"
                        value={formData.focusKeyword}
                        onChange={(e) => updateField('focusKeyword', e.target.value)}
                        placeholder="باور بانك انكر"
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

                {/* Submit Buttons */}
                <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => router.back()}
                    >
                        إلغاء
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={(e) => handleSubmit(e, true)}
                        loading={loading}
                        icon={<Save className="w-4 h-4" />}
                    >
                        حفظ كمسودة
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        loading={loading}
                        icon={<Sparkles className="w-4 h-4" />}
                    >
                        نشر المنتج
                    </Button>
                </div>
            </form>
        </div>
    );
}
