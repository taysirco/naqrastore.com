import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

// ============================================
// GET - Dashboard Analytics
// ============================================

export async function GET() {
    if (!adminDb) {
        return NextResponse.json({
            totalProducts: 0,
            activeProducts: 0,
            draftProducts: 0,
            totalCategories: 0,
            totalOrders: 0,
            pendingOrders: 0,
            totalRevenue: 0,
            averageOrderValue: 0,
            averageSEOScore: 0,
            lowStockProducts: 0,
        });
    }

    try {
        // Fetch products
        const productsSnapshot = await adminDb.collection('products').get();
        const products = productsSnapshot.docs.map(doc => doc.data());

        const totalProducts = products.length;
        const activeProducts = products.filter(p => p.status === 'active').length;
        const draftProducts = products.filter(p => p.status === 'draft').length;

        // Low stock
        const lowStockProducts = products.filter(p => {
            const stock = p.stock || 0;
            const threshold = p.lowStockThreshold || 5;
            return stock <= threshold && stock > 0;
        }).length;

        // Categories
        const categoriesSnapshot = await adminDb.collection('categories').get();
        const totalCategories = categoriesSnapshot.size;

        // Orders (if collection exists)
        let totalOrders = 0;
        let pendingOrders = 0;
        let totalRevenue = 0;

        try {
            const ordersSnapshot = await adminDb.collection('orders').get();
            const orders = ordersSnapshot.docs.map(doc => doc.data());

            totalOrders = orders.length;
            pendingOrders = orders.filter(o => o.status === 'pending').length;
            totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
        } catch {
            // Orders collection might not exist yet
        }

        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        // Calculate average SEO score
        let totalSEOScore = 0;
        let productsWithSEO = 0;

        for (const product of products) {
            let score = 0;

            // Title check
            const titleAr = product.translations?.ar?.metaTitle || product.translations?.ar?.name || '';
            if (titleAr.length >= 30 && titleAr.length <= 60) score += 25;
            else if (titleAr.length > 0) score += 10;

            // Description check
            const descAr = product.translations?.ar?.metaDesc || '';
            if (descAr.length >= 120 && descAr.length <= 160) score += 25;
            else if (descAr.length > 0) score += 10;

            // Keywords check
            const keywords = product.seo?.keywords || '';
            if (keywords.split(',').filter((k: string) => k.trim()).length >= 3) score += 25;
            else if (keywords) score += 10;

            // Images check
            if (product.images && product.images.length > 0) score += 25;

            if (score > 0) {
                totalSEOScore += score;
                productsWithSEO++;
            }
        }

        const averageSEOScore = productsWithSEO > 0
            ? Math.round(totalSEOScore / productsWithSEO)
            : 0;

        return NextResponse.json({
            totalProducts,
            activeProducts,
            draftProducts,
            totalCategories,
            totalOrders,
            pendingOrders,
            totalRevenue,
            averageOrderValue: Math.round(averageOrderValue),
            averageSEOScore,
            lowStockProducts,
        });
    } catch (error) {
        console.error('Analytics error:', error);
        return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }
}
