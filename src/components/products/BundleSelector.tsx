"use client";

import Image from 'next/image';
import { useState, useMemo } from 'react';
import { useCart } from '@/context/CartContext';

// We need a shared interface for products passed from server
interface Product {
    id: string;
    slug: string;
    brand: string;
    categorySlug: string;
    price: number;
    originalPrice?: number;
    images?: Array<{ url: string; alt?: string; isPrimary?: boolean }>;
    translations?: {
        en?: { name?: string };
        ar?: { name?: string };
    };
}

interface BundleSelectorProps {
    mainProduct: Product;
    relatedProducts: Product[];
    locale: string;
}

export default function BundleSelector({ mainProduct, relatedProducts, locale }: BundleSelectorProps) {
    const { addToCart } = useCart();
    const isArabic = locale === 'ar';

    // State to track selected products in the bundle (initially all selected)
    const [selectedIds, setSelectedIds] = useState<string[]>([
        mainProduct.id,
        ...relatedProducts.map(p => p.id)
    ]);

    // Derived state for selected products objects
    const selectedProducts = useMemo(() => {
        const all = [mainProduct, ...relatedProducts];
        return all.filter(p => selectedIds.includes(p.id));
    }, [mainProduct, relatedProducts, selectedIds]);

    // Calculate totals
    const totalBundlePrice = selectedProducts.reduce((sum, p) => sum + p.price, 0);
    const totalOriginalPrice = selectedProducts.reduce((sum, p) => sum + (p.originalPrice || p.price), 0);
    const savings = totalOriginalPrice - totalBundlePrice;

    // Handlers
    const toggleProduct = (id: string) => {
        if (id === mainProduct.id) return; // Cannot deselect main product
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleAddBundle = () => {
        selectedProducts.forEach(product => {
            const t = product.translations?.[isArabic ? 'ar' : 'en'] || product.translations?.en;
            addToCart({
                productId: product.id,
                name: t?.name || product.slug,
                price: product.price,
                quantity: 1,
                image: product.images?.[0]?.url,
                brand: product.brand
            });
        });
    };

    if (relatedProducts.length === 0) return null;

    const allProducts = [mainProduct, ...relatedProducts];

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-6 my-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg relative z-10 overflow-hidden">
            {/* Header */}
            <h3 className="text-lg sm:text-xl font-bold mb-5 text-gray-900 dark:text-white text-center sm:text-start">
                {isArabic ? 'غالباً ما يتم شراؤها معاً' : 'Frequently Bought Together'}
            </h3>

            {/* Mobile Layout: Stacked Cards */}
            <div className="block lg:hidden">
                {/* Product Grid - 3 columns on mobile with larger images */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    {allProducts.map((product, idx) => {
                        const isSelected = selectedIds.includes(product.id);
                        const isMain = product.id === mainProduct.id;

                        return (
                            <div key={product.id} className="relative">
                                {/* Plus sign between products */}
                                {idx > 0 && (
                                    <div className="absolute -start-2 top-1/2 -translate-y-1/2 z-10">
                                        <span className="bg-white dark:bg-gray-800 text-gray-400 font-bold text-lg px-1 rounded shadow-sm">+</span>
                                    </div>
                                )}
                                <button
                                    onClick={() => toggleProduct(product.id)}
                                    disabled={isMain}
                                    className={`relative w-full aspect-square rounded-xl border-2 p-2 bg-white dark:bg-gray-800 transition-all duration-300 
                                        ${isSelected
                                            ? 'border-green-500 shadow-md shadow-green-100 dark:shadow-green-900/20'
                                            : 'border-gray-200 dark:border-gray-700 opacity-50 grayscale'
                                        }
                                        ${!isMain ? 'active:scale-95 cursor-pointer' : 'cursor-default'}
                                    `}
                                >
                                    {product.images?.[0]?.url && (
                                        <Image
                                            src={product.images[0].url}
                                            alt={product.translations?.[isArabic ? 'ar' : 'en']?.name || product.slug}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    )}
                                    {/* Selection indicator */}
                                    <div className={`absolute -top-2 -end-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-lg z-10 transition-all duration-300
                                        ${isSelected
                                            ? 'bg-green-500 text-white scale-100'
                                            : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 scale-90'
                                        }`}
                                    >
                                        {isSelected ? '✓' : ''}
                                    </div>
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Product Details List - Compact Cards */}
                <div className="space-y-2 mb-5">
                    {allProducts.map((product) => {
                        const isSelected = selectedIds.includes(product.id);
                        const t = product.translations?.[isArabic ? 'ar' : 'en'] || product.translations?.en;
                        const isMain = product.id === mainProduct.id;

                        return (
                            <button
                                key={product.id}
                                onClick={() => toggleProduct(product.id)}
                                disabled={isMain}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 
                                    ${isSelected
                                        ? 'bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700'
                                        : 'bg-gray-50 dark:bg-gray-800/50 opacity-60'
                                    }
                                    ${!isMain ? 'active:bg-gray-100 dark:active:bg-gray-700' : ''}
                                `}
                            >
                                {/* Mini Image */}
                                <div className={`relative w-12 h-12 rounded-lg border bg-white dark:bg-gray-900 flex-shrink-0 overflow-hidden
                                    ${isSelected ? 'border-green-200 dark:border-green-800' : 'border-gray-200 dark:border-gray-700'}
                                `}>
                                    {product.images?.[0]?.url && (
                                        <Image
                                            src={product.images[0].url}
                                            alt={t?.name || product.slug}
                                            fill
                                            className="object-contain p-1"
                                        />
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="flex-1 min-w-0 text-start">
                                    <p className={`text-sm font-medium truncate ${isSelected ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400 line-through'}`}>
                                        {t?.name}
                                    </p>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className={`font-bold text-sm ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
                                            {product.price.toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}
                                        </span>
                                        {product.originalPrice && product.originalPrice > product.price && (
                                            <span className="text-gray-400 text-xs line-through">
                                                {product.originalPrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Checkbox */}
                                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all
                                    ${isSelected
                                        ? 'bg-blue-600 border-blue-600 text-white'
                                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                                    }`}
                                >
                                    {isSelected && (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Total & CTA - Sticky Bottom Style */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {isArabic ? `إجمالي سعر الباقة (${selectedProducts.length} منتجات):` : `Total for ${selectedProducts.length} items:`}
                        </span>
                        {savings > 0 && (
                            <span className="text-xs font-semibold text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
                                {isArabic ? `وفرت ${savings.toLocaleString()} ج.م` : `Save ${savings.toLocaleString()}`}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {totalBundlePrice.toLocaleString()} <span className="text-base font-medium text-gray-500">{isArabic ? 'ج.م' : 'EGP'}</span>
                        </div>
                        <button
                            onClick={handleAddBundle}
                            disabled={selectedProducts.length === 0}
                            className="flex-1 max-w-[200px] bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-3 px-4 rounded-xl shadow-md shadow-yellow-200 dark:shadow-yellow-900/30 transition-all transform active:scale-95 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isArabic ? 'إضافة الكل للسلة' : 'Add All to Cart'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop Layout - Professional Grid */}
            <div className="hidden lg:block">
                {/* Products Row with Plus Signs - now scrollable if needed */}
                <div className="flex items-stretch justify-start gap-4 mb-8 overflow-x-auto pb-2">
                    {allProducts.map((product, idx) => {
                        const isSelected = selectedIds.includes(product.id);
                        const t = product.translations?.[isArabic ? 'ar' : 'en'] || product.translations?.en;
                        const isMain = product.id === mainProduct.id;

                        return (
                            <div key={product.id} className="flex items-center">
                                {/* Product Card */}
                                <button
                                    onClick={() => toggleProduct(product.id)}
                                    disabled={isMain}
                                    className={`relative group transition-all duration-300 
                                        ${!isSelected ? 'opacity-50 grayscale' : ''} 
                                        ${!isMain ? 'cursor-pointer hover:scale-[1.02]' : 'cursor-default'}`}
                                >
                                    <div className={`w-48 rounded-2xl border-2 p-4 bg-white dark:bg-gray-800 transition-all
                                        ${isSelected
                                            ? 'border-green-500 shadow-xl shadow-green-100 dark:shadow-green-900/20'
                                            : 'border-gray-200 dark:border-gray-700'
                                        }`}
                                    >
                                        {/* Image */}
                                        <div className="relative w-full aspect-square mb-4">
                                            {product.images?.[0]?.url && (
                                                <Image
                                                    src={product.images[0].url}
                                                    alt={t?.name || product.slug}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            )}
                                        </div>

                                        {/* Product Info */}
                                        <div className="text-center">
                                            <p className={`text-sm font-medium mb-2 line-clamp-2 h-10 ${!isSelected ? 'text-gray-400 line-through' : 'text-gray-800 dark:text-gray-200'}`}>
                                                {t?.name}
                                            </p>
                                            <div className="flex items-center justify-center gap-2 flex-wrap">
                                                <span className={`font-bold text-lg ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
                                                    {product.price.toLocaleString()}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {isArabic ? 'ج.م' : 'EGP'}
                                                </span>
                                            </div>
                                            {product.originalPrice && product.originalPrice > product.price && (
                                                <span className="text-gray-400 text-xs line-through">
                                                    {product.originalPrice.toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}
                                                </span>
                                            )}
                                        </div>

                                        {/* Checkbox in corner */}
                                        <div className={`absolute top-3 ${isArabic ? 'left-3' : 'right-3'} w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all
                                            ${isSelected
                                                ? 'bg-green-500 border-green-500 text-white'
                                                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                                            }`}
                                        >
                                            {isSelected && (
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                </button>

                                {/* Plus Sign */}
                                {idx < allProducts.length - 1 && (
                                    <span className="text-gray-300 dark:text-gray-600 font-light text-4xl mx-5">+</span>
                                )}
                            </div>
                        );
                    })}

                    {/* Equals and Total */}
                    <div className="flex items-center">
                        <span className="text-gray-300 dark:text-gray-600 font-light text-4xl mx-5">=</span>

                        {/* Total Card */}
                        <div className="w-56 rounded-2xl border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-5 shadow-xl shadow-yellow-100 dark:shadow-yellow-900/10">
                            <div className="text-center mb-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                    {isArabic ? `إجمالي ${selectedProducts.length} منتجات` : `Total for ${selectedProducts.length} items`}
                                </p>
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {totalBundlePrice.toLocaleString()}
                                    <span className="text-base font-medium text-gray-500 ms-1">{isArabic ? 'ج.م' : 'EGP'}</span>
                                </div>
                                {savings > 0 && (
                                    <span className="inline-block mt-2 text-sm font-semibold text-green-600 bg-green-100 dark:bg-green-900/40 px-3 py-1 rounded-full">
                                        {isArabic ? `وفرت ${savings.toLocaleString()} ج.م` : `Save ${savings.toLocaleString()} EGP`}
                                    </span>
                                )}
                            </div>

                            <button
                                onClick={handleAddBundle}
                                disabled={selectedProducts.length === 0}
                                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-3 px-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isArabic ? 'إضافة الكل للسلة' : 'Add All to Cart'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
