// ============================================
// Admin Dashboard Type Definitions
// Complete TypeScript interfaces for the admin system
// ============================================

// ============================================
// PRODUCT TYPES
// ============================================

export interface ProductTranslation {
    name: string;
    description: string;
    shortDescription?: string;
    metaTitle: string;
    metaDesc: string;
    features?: string[];
}

export interface ProductSEO {
    keywords: string;
    canonical?: string | null;
    focusKeyword?: string;
    schemaType?: 'Product' | 'Offer';
    noIndex?: boolean;
    noFollow?: boolean;
}

export interface ProductImage {
    id: string;
    url: string;
    alt: string;
    altAr?: string;
    order: number;
    isPrimary?: boolean;
}

export interface ProductVariant {
    id: string;
    sku: string;
    name: string;
    nameAr: string;
    price: number;
    stock: number;
    attributes: Record<string, string>;
}

export interface Product {
    id: string;
    slug: string;
    sku: string | null;
    price: number;
    originalPrice?: number;
    discountPercentage?: number;
    brand: string;
    brandSlug?: string;
    categoryId: string;
    categorySlug: string;
    subcategoryId?: string;
    subcategorySlug?: string;
    images: ProductImage[];
    featured: boolean;
    status: 'active' | 'draft' | 'archived';
    stock: number;
    lowStockThreshold?: number;
    translations: {
        en: ProductTranslation;
        ar: ProductTranslation;
    };
    seo: ProductSEO;
    variants?: ProductVariant[];
    relatedProducts?: string[];
    tags?: string[];
    createdAt: Date | FirebaseTimestamp;
    updatedAt: Date | FirebaseTimestamp;
}

export interface ProductFormData {
    slug: string;
    sku?: string;
    price: number;
    originalPrice?: number;
    brand: string;
    categorySlug: string;
    subcategorySlug?: string;
    featured?: boolean;
    status?: 'active' | 'draft' | 'archived';
    stock?: number;
    // English
    enName: string;
    enDesc: string;
    enShortDesc?: string;
    enMetaTitle?: string;
    enMetaDesc?: string;
    enFeatures?: string;
    // Arabic
    arName: string;
    arDesc: string;
    arShortDesc?: string;
    arMetaTitle?: string;
    arMetaDesc?: string;
    arFeatures?: string;
    // SEO
    keywords?: string;
    focusKeyword?: string;
    canonical?: string;
    // Images
    images?: ProductImage[];
    imageUrl?: string;
}

// ============================================
// CATEGORY TYPES
// ============================================

export interface CategoryTranslation {
    name: string;
    description: string;
    metaTitle: string;
    metaDesc: string;
}

export interface Category {
    id: string;
    slug: string;
    icon?: string;
    image?: string;
    order: number;
    status: 'active' | 'hidden';
    productCount?: number;
    translations: {
        en: CategoryTranslation;
        ar: CategoryTranslation;
    };
    seo?: {
        keywords: string;
        canonical?: string;
    };
    subcategories?: Subcategory[];
    createdAt: Date | FirebaseTimestamp;
    updatedAt: Date | FirebaseTimestamp;
}

export interface Subcategory {
    id: string;
    parentId: string;
    slug: string;
    icon?: string;
    image?: string;
    order: number;
    status: 'active' | 'hidden';
    productCount?: number;
    translations: {
        en: CategoryTranslation;
        ar: CategoryTranslation;
    };
    createdAt: Date | FirebaseTimestamp;
    updatedAt: Date | FirebaseTimestamp;
}

export interface CategoryFormData {
    slug: string;
    icon?: string;
    order?: number;
    status?: 'active' | 'hidden';
    enName: string;
    enDesc: string;
    enMetaTitle?: string;
    enMetaDesc?: string;
    arName: string;
    arDesc: string;
    arMetaTitle?: string;
    arMetaDesc?: string;
    keywords?: string;
}

// ============================================
// BRAND TYPES
// ============================================

export interface Brand {
    id: string;
    slug: string;
    name: string;
    nameAr: string;
    logo?: string;
    description?: string;
    descriptionAr?: string;
    website?: string;
    featured: boolean;
    productCount?: number;
    order: number;
    status: 'active' | 'hidden';
    seo?: {
        metaTitle: string;
        metaTitleAr: string;
        metaDesc: string;
        metaDescAr: string;
        keywords: string;
    };
    createdAt: Date | FirebaseTimestamp;
    updatedAt: Date | FirebaseTimestamp;
}

// ============================================
// ORDER TYPES
// ============================================

export interface OrderItem {
    productId: string;
    productSlug: string;
    productName: string;
    productNameAr: string;
    quantity: number;
    price: number;
    total: number;
    image?: string;
}

export interface OrderCustomer {
    name: string;
    email?: string;
    phone: string;
    address: string;
    city: string;
    governorate: string;
    notes?: string;
}

export interface Order {
    id: string;
    orderNumber: string;
    customer: OrderCustomer;
    items: OrderItem[];
    subtotal: number;
    shippingCost: number;
    discount?: number;
    total: number;
    status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    paymentMethod: 'cod' | 'card' | 'wallet';
    paymentStatus: 'pending' | 'paid' | 'refunded';
    trackingNumber?: string;
    notes?: string;
    createdAt: Date | FirebaseTimestamp;
    updatedAt: Date | FirebaseTimestamp;
}

// ============================================
// SEO TYPES
// ============================================

export interface SEOGeneratorInput {
    productName: string;
    productNameAr: string;
    category: string;
    categoryAr: string;
    brand: string;
    price: number;
    features?: string[];
    featuresAr?: string[];
}

export interface SEOGeneratorOutput {
    metaTitle: string;
    metaTitleAr: string;
    metaDesc: string;
    metaDescAr: string;
    keywords: string[];
    keywordsAr: string[];
    focusKeyword: string;
    focusKeywordAr: string;
    schemaMarkup: Record<string, unknown>;
    score: number;
    suggestions: string[];
}

export interface SEOAnalysis {
    score: number;
    titleLength: { value: number; status: 'good' | 'warning' | 'error' };
    descLength: { value: number; status: 'good' | 'warning' | 'error' };
    keywordDensity: { value: number; status: 'good' | 'warning' | 'error' };
    hasSchema: boolean;
    hasImages: boolean;
    imagesWithAlt: number;
    suggestions: string[];
}

// ============================================
// ANALYTICS TYPES
// ============================================

export interface DashboardStats {
    totalProducts: number;
    activeProducts: number;
    draftProducts: number;
    totalCategories: number;
    totalOrders: number;
    pendingOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    averageSEOScore: number;
    lowStockProducts: number;
}

export interface ProductAnalytics {
    productId: string;
    views: number;
    clicks: number;
    addToCart: number;
    purchases: number;
    conversionRate: number;
}

// ============================================
// UI TYPES
// ============================================

export interface TableColumn<T> {
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    width?: string;
    render?: (item: T) => React.ReactNode;
}

export interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface FilterOption {
    value: string;
    label: string;
    labelAr?: string;
}

export interface ToastMessage {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    duration?: number;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    pagination: PaginationInfo;
}

// ============================================
// FIREBASE TYPES
// ============================================

export interface FirebaseTimestamp {
    seconds: number;
    nanoseconds: number;
    toDate: () => Date;
}

// ============================================
// CONSTANTS
// ============================================

export const PRODUCT_STATUSES = [
    { value: 'active', label: 'Active', labelAr: 'نشط', color: 'green' },
    { value: 'draft', label: 'Draft', labelAr: 'مسودة', color: 'yellow' },
    { value: 'archived', label: 'Archived', labelAr: 'مؤرشف', color: 'gray' },
] as const;

export const ORDER_STATUSES = [
    { value: 'pending', label: 'Pending', labelAr: 'قيد الانتظار', color: 'yellow' },
    { value: 'confirmed', label: 'Confirmed', labelAr: 'مؤكد', color: 'blue' },
    { value: 'processing', label: 'Processing', labelAr: 'جاري التجهيز', color: 'purple' },
    { value: 'shipped', label: 'Shipped', labelAr: 'تم الشحن', color: 'indigo' },
    { value: 'delivered', label: 'Delivered', labelAr: 'تم التوصيل', color: 'green' },
    { value: 'cancelled', label: 'Cancelled', labelAr: 'ملغي', color: 'red' },
] as const;

export const DEFAULT_BRANDS = [
    { value: 'anker', label: 'Anker', labelAr: 'انكر' },
    { value: 'joyroom', label: 'Joyroom', labelAr: 'جوي روم' },
    { value: 'baseus', label: 'Baseus', labelAr: 'باسيوس' },
    { value: 'ugreen', label: 'UGREEN', labelAr: 'يو جرين' },
    { value: 'samsung', label: 'Samsung', labelAr: 'سامسونج' },
    { value: 'apple', label: 'Apple', labelAr: 'ابل' },
] as const;

export const DEFAULT_CATEGORIES = [
    { value: 'power-banks', label: 'Power Banks', labelAr: 'باور بانك' },
    { value: 'wall-chargers', label: 'Wall Chargers', labelAr: 'شواحن حائط' },
    { value: 'car-chargers', label: 'Car Chargers', labelAr: 'شواحن سيارة' },
    { value: 'cables', label: 'Cables', labelAr: 'كابلات' },
    { value: 'audio', label: 'Audio', labelAr: 'سماعات' },
    { value: 'smart-watches', label: 'Smart Watches', labelAr: 'ساعات ذكية' },
    { value: 'cases-covers', label: 'Cases & Covers', labelAr: 'جرابات وأغطية' },
    { value: 'screen-protectors', label: 'Screen Protectors', labelAr: 'واقي شاشة' },
    { value: 'car-accessories', label: 'Car Accessories', labelAr: 'اكسسوارات سيارة' },
    { value: 'other', label: 'Other', labelAr: 'أخرى' },
] as const;
