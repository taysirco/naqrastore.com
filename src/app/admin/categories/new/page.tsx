"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormInput, FormTextarea, FormSelect, FormSection, Button } from '@/components/admin/FormField';
import { SingleImageUpload } from '@/components/admin/ImageUploader';
import { useToast } from '@/components/admin/Toast';
import {
    Save,
    ArrowLeft,
    FolderTree,
    Globe,
    Sparkles
} from 'lucide-react';
import { generateSlug } from '@/lib/admin-utils';

// Category icons
const CATEGORY_ICONS = [
    { value: '🔋', label: 'Battery' },
    { value: '🔌', label: 'Charger' },
    { value: '🎧', label: 'Headphones' },
    { value: '📱', label: 'Phone' },
    { value: '⌚', label: 'Watch' },
    { value: '🎮', label: 'Gaming' },
    { value: '🔊', label: 'Speaker' },
    { value: '💡', label: 'Lighting' },
    { value: '🖥️', label: 'Computer' },
    { value: '📷', label: 'Camera' },
];

export default function NewCategoryPage() {
    const router = useRouter();
    const { success, error } = useToast();

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<string | undefined>();

    const [formData, setFormData] = useState({
        slug: '',
        icon: '🔋',
        order: '0',
        status: 'active',
        // English
        enName: '',
        enDesc: '',
        enMetaTitle: '',
        enMetaDesc: '',
        // Arabic
        arName: '',
        arDesc: '',
        arMetaTitle: '',
        arMetaDesc: '',
        // SEO
        keywords: '',
    });

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleArNameChange = (value: string) => {
        updateField('arName', value);
        if (!formData.slug && value) {
            updateField('slug', generateSlug(value));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.slug || !formData.enName || !formData.arName) {
            error('خطأ', 'يرجى ملء جميع الحقول المطلوبة');
            return;
        }

        setLoading(true);

        try {
            const payload = {
                ...formData,
                order: Number(formData.order) || 0,
                image,
            };

            const res = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to create category');
            }

            success('تم الإنشاء', 'تم إنشاء الفئة بنجاح');
            router.push('/admin/categories');
        } catch (err) {
            console.error('Error creating category:', err);
            error('خطأ', err instanceof Error ? err.message : 'فشل في إنشاء الفئة');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
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
                            إضافة فئة جديدة
                        </h1>
                        <p className="text-gray-500">أنشئ فئة جديدة للمنتجات</p>
                    </div>
                </div>

                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    loading={loading}
                    icon={<Save className="w-4 h-4" />}
                >
                    حفظ الفئة
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <FormSection
                    title="المعلومات الأساسية"
                    titleIcon={<FolderTree className="w-5 h-5 text-purple-500" />}
                    borderColor="purple"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            label="Slug (رابط URL)"
                            value={formData.slug}
                            onChange={(e) => updateField('slug', e.target.value)}
                            placeholder="power-banks"
                            required
                        />
                        <FormInput
                            label="الترتيب"
                            type="number"
                            value={formData.order}
                            onChange={(e) => updateField('order', e.target.value)}
                            placeholder="0"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormSelect
                            label="الأيقونة"
                            value={formData.icon}
                            onChange={(e) => updateField('icon', e.target.value)}
                            options={CATEGORY_ICONS.map(i => ({
                                value: i.value,
                                label: `${i.value} ${i.label}`
                            }))}
                        />
                        <FormSelect
                            label="الحالة"
                            value={formData.status}
                            onChange={(e) => updateField('status', e.target.value)}
                            options={[
                                { value: 'active', label: 'نشط' },
                                { value: 'inactive', label: 'غير نشط' },
                            ]}
                        />
                    </div>

                    <SingleImageUpload
                        label="صورة الفئة"
                        value={image}
                        onChange={setImage}
                    />
                </FormSection>

                {/* English Content */}
                <FormSection
                    title="English Content"
                    titleIcon={<span className="text-lg">🇺🇸</span>}
                    borderColor="blue"
                >
                    <FormInput
                        label="Category Name"
                        value={formData.enName}
                        onChange={(e) => updateField('enName', e.target.value)}
                        placeholder="Power Banks"
                        required
                    />
                    <FormTextarea
                        label="Description"
                        value={formData.enDesc}
                        onChange={(e) => updateField('enDesc', e.target.value)}
                        placeholder="Category description..."
                        rows={3}
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
                        label="اسم الفئة"
                        value={formData.arName}
                        onChange={(e) => handleArNameChange(e.target.value)}
                        placeholder="باور بانك"
                        required
                        dir="rtl"
                    />
                    <FormTextarea
                        label="الوصف"
                        value={formData.arDesc}
                        onChange={(e) => updateField('arDesc', e.target.value)}
                        placeholder="وصف الفئة..."
                        rows={3}
                        dir="rtl"
                    />
                </FormSection>

                {/* SEO */}
                <FormSection
                    title="SEO"
                    titleIcon={<Globe className="w-5 h-5 text-purple-500" />}
                    borderColor="purple"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            label="Meta Title (EN)"
                            value={formData.enMetaTitle}
                            onChange={(e) => updateField('enMetaTitle', e.target.value)}
                            placeholder="Power Banks | Best Prices in Egypt"
                        />
                        <FormInput
                            label="عنوان Meta (AR)"
                            value={formData.arMetaTitle}
                            onChange={(e) => updateField('arMetaTitle', e.target.value)}
                            placeholder="باور بانك | أفضل الأسعار في مصر"
                            dir="rtl"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormTextarea
                            label="Meta Description (EN)"
                            value={formData.enMetaDesc}
                            onChange={(e) => updateField('enMetaDesc', e.target.value)}
                            rows={2}
                            charCount
                            maxChars={160}
                        />
                        <FormTextarea
                            label="وصف Meta (AR)"
                            value={formData.arMetaDesc}
                            onChange={(e) => updateField('arMetaDesc', e.target.value)}
                            rows={2}
                            charCount
                            maxChars={160}
                            dir="rtl"
                        />
                    </div>

                    <FormTextarea
                        label="الكلمات المفتاحية"
                        value={formData.keywords}
                        onChange={(e) => updateField('keywords', e.target.value)}
                        placeholder="باور بانك, شاحن متنقل, power bank"
                        rows={2}
                    />
                </FormSection>

                {/* Submit */}
                <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => router.back()}
                    >
                        إلغاء
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        loading={loading}
                        icon={<Sparkles className="w-4 h-4" />}
                    >
                        إنشاء الفئة
                    </Button>
                </div>
            </form>
        </div>
    );
}
