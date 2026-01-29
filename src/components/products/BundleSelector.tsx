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
        <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-4 my-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg relative z-10 w-full" style={{ maxWidth: '100%', overflow: 'hidden', boxSizing: 'border-box' }}>
            {/* Header */}
            <h3 className="text-base font-bold mb-4 text-gray-900 dark:text-white text-center">
                {isArabic ? 'غالباً ما يتم شراؤها معاً' : 'Frequently Bought Together'}
            </h3>

            {/* Mobile Layout: Clean 2-column grid */}
            <div className="block lg:hidden" style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
                {/* Product Grid - 2 columns on mobile for better fit */}
                <div className="grid grid-cols-2 gap-3 mb-4" style={{ width: '100%' }}>
                    {allProducts.slice(0, 4).map((product) => {
                        const isSelected = selectedIds.includes(product.id);
                        const isMain = product.id === mainProduct.id;
                        const t = product.translations?.[isArabic ? 'ar' : 'en'] || product.translations?.en;

                        return (
                            <button
                                key={product.id}
                                onClick={() => toggleProduct(product.id)}
                                disabled={isMain}
                                className={`relative w-full rounded-xl border-2 p-2 bg-white dark:bg-gray-800 transition-all duration-300 
                                    ${isSelected
                                        ? 'border-green-500 shadow-md'
                                        : 'border-gray-200 dark:border-gray-700 opacity-50'
                                    }
                                    ${!isMain ? 'active:scale-95 cursor-pointer' : 'cursor-default'}`}
                                style={{ minWidth: 0 }}
                            >
                                {/* Product Image */}
                                <div className="relative w-full aspect-square mb-2">
                                    {product.images?.[0]?.url && (
                                        <Image
                                            src={product.images[0].url}
                                            alt={t?.name || product.slug}
                                            fill
                                            className="object-contain p-1"
                                        />
                                    )}
                                </div>
                                {/* Product Name - truncated */}
                                <p className={`text-xs font-medium truncate ${isSelected ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400 line-through'}`}>
                                    {t?.name}
                                </p>
                                {/* Price */}
                                <p className={`text-sm font-bold ${isSelected ? 'text-blue-600' : 'text-gray-400'}`}>
                                    {product.price.toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}
                                </p>
                                {/* Selection indicator */}
                                <div className={`absolute top-1 ${isArabic ? 'left-1' : 'right-1'} w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-all
                                    ${isSelected
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-300 text-gray-500'
                                    }`}
                                >
                                    {isSelected ? '✓' : ''}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Total & CTA */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800" style={{ width: '100%' }}>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {isArabic ? `${selectedProducts.length} منتجات` : `${selectedProducts.length} items`}
                        </span>
                        {savings > 0 && (
                            <span className="text-xs font-semibold text-green-600 bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full">
                                {isArabic ? `وفر ${savings.toLocaleString()}` : `Save ${savings.toLocaleString()}`}
                            </span>
                        )}
                    </div>
                    <div className="text-center mb-3">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            {totalBundlePrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 mr-1">{isArabic ? 'ج.م' : 'EGP'}</span>
                    </div>
                    <button
                        onClick={handleAddBundle}
                        disabled={selectedProducts.length === 0}
                        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-3 rounded-xl shadow-lg transition-all active:scale-95 text-sm disabled:opacity-50"
                        style={{ width: '100%', maxWidth: '100%' }}
                    >
                        {isArabic ? 'إضافة الكل للسلة' : 'Add All to Cart'}
                    </button>
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
