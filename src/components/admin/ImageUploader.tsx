"use client";

import { useState, useRef, useCallback } from 'react';
import {
    Upload,
    X,
    Image as ImageIcon,
    GripVertical,
    Star,
    Trash2,
    Plus,
    Loader2
} from 'lucide-react';
import type { ProductImage } from '@/types/admin';
import { generateImageId } from '@/lib/admin-utils';

// ============================================
// TYPES
// ============================================

interface ImageUploaderProps {
    images: ProductImage[];
    onChange: (images: ProductImage[]) => void;
    maxImages?: number;
    disabled?: boolean;
}

// ============================================
// IMAGE UPLOADER
// ============================================

export default function ImageUploader({
    images,
    onChange,
    maxImages = 10,
    disabled,
}: ImageUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle file selection
    const handleFiles = useCallback(async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        const remainingSlots = maxImages - images.length;
        if (remainingSlots <= 0) return;

        setUploading(true);

        try {
            const newImages: ProductImage[] = [];
            const filesToProcess = Array.from(files).slice(0, remainingSlots);

            for (const file of filesToProcess) {
                // Validate file type
                if (!file.type.startsWith('image/')) continue;

                // Upload to Firebase Storage
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('/api/admin/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Upload failed');
                }

                const { url } = await response.json();

                newImages.push({
                    id: generateImageId(),
                    url,
                    alt: file.name.replace(/\.[^/.]+$/, ''),
                    order: images.length + newImages.length,
                    isPrimary: images.length === 0 && newImages.length === 0,
                });
            }

            onChange([...images, ...newImages]);
        } catch (error) {
            console.error('Upload error:', error);
            alert('حدث خطأ أثناء رفع الصور');
        } finally {
            setUploading(false);
        }
    }, [images, maxImages, onChange]);

    // Drag and drop handlers
    const handleDragEnter = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    }, [handleFiles]);

    // Reorder handlers
    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    const handleDragOverImage = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;

        const newImages = [...images];
        const [draggedItem] = newImages.splice(draggedIndex, 1);
        newImages.splice(index, 0, draggedItem);

        // Update order and primary
        const updatedImages = newImages.map((img, i) => ({
            ...img,
            order: i,
            isPrimary: i === 0,
        }));

        onChange(updatedImages);
        setDraggedIndex(index);
    };

    // Remove image
    const handleRemove = (id: string) => {
        const filtered = images.filter(img => img.id !== id);
        const updated = filtered.map((img, i) => ({
            ...img,
            order: i,
            isPrimary: i === 0,
        }));
        onChange(updated);
    };

    // Set primary image
    const handleSetPrimary = (id: string) => {
        const targetIndex = images.findIndex(img => img.id === id);
        if (targetIndex <= 0) return;

        const newImages = [...images];
        const [target] = newImages.splice(targetIndex, 1);
        newImages.unshift(target);

        const updated = newImages.map((img, i) => ({
            ...img,
            order: i,
            isPrimary: i === 0,
        }));

        onChange(updated);
    };

    // Update alt text
    const handleUpdateAlt = (id: string, alt: string) => {
        const updated = images.map(img =>
            img.id === id ? { ...img, alt } : img
        );
        onChange(updated);
    };

    return (
        <div className="space-y-4">
            {/* Upload Area */}
            <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`
                    relative border-2 border-dashed rounded-2xl p-8
                    transition-all duration-200
                    ${isDragging
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }
                    ${disabled || uploading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
                `}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFiles(e.target.files)}
                    className="hidden"
                    disabled={disabled || uploading}
                />

                <div className="text-center">
                    {uploading ? (
                        <Loader2 className="w-12 h-12 mx-auto text-blue-500 animate-spin" />
                    ) : (
                        <Upload className="w-12 h-12 mx-auto text-gray-400" />
                    )}

                    <h3 className="mt-4 font-bold text-gray-900 dark:text-white">
                        {uploading ? 'جاري الرفع...' : 'اسحب وأفلت الصور هنا'}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        أو اضغط لاختيار الصور من جهازك
                    </p>

                    <p className="mt-2 text-xs text-gray-400">
                        PNG, JPG, WebP حتى 5MB • {images.length}/{maxImages} صور
                    </p>
                </div>
            </div>

            {/* Image Grid */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                        <div
                            key={image.id}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragEnd={handleDragEnd}
                            onDragOver={(e) => handleDragOverImage(e, index)}
                            className={`
                                relative group rounded-xl overflow-hidden
                                border-2 transition-all duration-200
                                ${image.isPrimary
                                    ? 'border-blue-500 ring-2 ring-blue-500/20'
                                    : 'border-gray-200 dark:border-gray-600'
                                }
                                ${draggedIndex === index ? 'opacity-50' : ''}
                            `}
                        >
                            {/* Image */}
                            <div className="aspect-square bg-gray-100 dark:bg-gray-700">
                                <img
                                    src={image.url}
                                    alt={image.alt}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Primary Badge */}
                            {image.isPrimary && (
                                <div className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-current" />
                                    الرئيسية
                                </div>
                            )}

                            {/* Drag Handle */}
                            <div className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                                <GripVertical className="w-4 h-4 text-white" />
                            </div>

                            {/* Actions Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                {!image.isPrimary && (
                                    <button
                                        onClick={() => handleSetPrimary(image.id)}
                                        className="p-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors"
                                        title="تعيين كصورة رئيسية"
                                    >
                                        <Star className="w-5 h-5" />
                                    </button>
                                )}
                                <button
                                    onClick={() => handleRemove(image.id)}
                                    className="p-2 bg-red-500/80 rounded-lg text-white hover:bg-red-600 transition-colors"
                                    title="حذف"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Alt Text Input */}
                            <div className="p-2 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                                <input
                                    type="text"
                                    value={image.alt}
                                    onChange={(e) => handleUpdateAlt(image.id, e.target.value)}
                                    placeholder="وصف الصورة (Alt)"
                                    className="w-full text-xs bg-gray-50 dark:bg-gray-900 border-0 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    ))}

                    {/* Add More Button */}
                    {images.length < maxImages && (
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="aspect-square rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-blue-500"
                        >
                            <Plus className="w-8 h-8" />
                            <span className="text-sm font-medium">إضافة صورة</span>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

// ============================================
// SINGLE IMAGE UPLOAD (for categories, etc)
// ============================================

interface SingleImageUploadProps {
    value?: string;
    onChange: (url: string | undefined) => void;
    label?: string;
    disabled?: boolean;
}

export function SingleImageUpload({
    value,
    onChange,
    label = 'صورة',
    disabled,
}: SingleImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        if (!file.type.startsWith('image/')) return;

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const { url } = await response.json();
            onChange(url);
        } catch (error) {
            console.error('Upload error:', error);
            alert('حدث خطأ أثناء رفع الصورة');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </label>

            {value ? (
                <div className="relative w-32 h-32 rounded-xl overflow-hidden group">
                    <img src={value} alt="" className="w-full h-full object-cover" />
                    <button
                        onClick={() => onChange(undefined)}
                        disabled={disabled}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                        <Trash2 className="w-6 h-6 text-white" />
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={disabled || uploading}
                    className="w-32 h-32 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600 hover:border-blue-400 transition-colors flex flex-col items-center justify-center gap-2 text-gray-400 disabled:opacity-50"
                >
                    {uploading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                        <>
                            <ImageIcon className="w-6 h-6" />
                            <span className="text-xs">اختر صورة</span>
                        </>
                    )}
                </button>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                className="hidden"
            />
        </div>
    );
}
