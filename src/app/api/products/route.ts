import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import { FieldValue, Query } from 'firebase-admin/firestore';
import { staticProducts } from '@/lib/static-products';

// ============================================
// GET - List all products with pagination & filtering
// ============================================

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const brand = url.searchParams.get('brand');
    const category = url.searchParams.get('category');
    const status = url.searchParams.get('status');
    const search = url.searchParams.get('search');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const page = parseInt(url.searchParams.get('page') || '1');
    const useFirebase = url.searchParams.get('firebase') === 'true';

    // Default to static data if not requested optionally, BUT we want Firebase as primary now?
    // The previous logic was: "Only use Firebase when explicitly requested".
    // I should preserve that logic unless the USER wants the site to run off Firebase.
    // The issue "503 error preventing order processing" implies orders use Firebase.
    // Products might be hybrid. Let's keep the existing logic:
    // "Only use Firebase when explicitly requested with ?firebase=true"
    // Wait, if I change `if (!useFirebase || !adminDb)` to `if (!useFirebase) return static`, 
    // it simplifies things. But wait, `adminDb` check was there to fallback if not connected.
    // Now `getFirestore()` throws.

    // I will check useFirebase flag. If false, return static.
    if (!useFirebase) {
        let products = [...staticProducts];

        // Apply filters
        if (brand) {
            products = products.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
        }
        if (category) {
            products = products.filter(p => p.categorySlug === category);
        }
        if (status) {
            products = products.filter(p => p.status === status);
        }
        if (search) {
            const searchLower = search.toLowerCase();
            products = products.filter(p =>
                p.translations.en.name.toLowerCase().includes(searchLower) ||
                p.translations.ar.name.includes(search) ||
                p.slug.toLowerCase().includes(searchLower)
            );
        }

        // Pagination
        const total = products.length;
        const totalPages = Math.ceil(total / limit);
        const startIndex = (page - 1) * limit;
        const paginatedProducts = products.slice(startIndex, startIndex + limit);

        // Add fake IDs for compatibility
        const productsWithIds = paginatedProducts.map((p, i) => ({
            id: `static_${p.slug}`,
            ...p
        }));

        return NextResponse.json({
            items: productsWithIds,
            pagination: { page, limit, total, totalPages },
            source: 'static'
        });
    }

    // Firebase Path
    try {
        const db = await getFirestore();
        let query: Query = db.collection('products');

        // Apply filters
        if (brand) {
            query = query.where('brand', '==', brand);
        }
        if (category) {
            query = query.where('categorySlug', '==', category);
        }
        if (status) {
            query = query.where('status', '==', status);
        }

        // Order by creation date
        query = query.orderBy('createdAt', 'desc');

        // Execute query
        const snapshot = await query.get();

        let products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Client-side search (Firestore doesn't support full-text search)
        if (search) {
            const searchLower = search.toLowerCase();
            products = products.filter(p => {
                const data = p as Record<string, unknown>;
                const translations = data.translations as Record<string, Record<string, string>> | undefined;
                const enName = translations?.en?.name?.toLowerCase() || '';
                const arName = translations?.ar?.name || '';
                const slug = (data.slug as string)?.toLowerCase() || '';

                return enName.includes(searchLower) ||
                    arName.includes(search) ||
                    slug.includes(searchLower);
            });
        }

        // Pagination
        const total = products.length;
        const totalPages = Math.ceil(total / limit);
        const startIndex = (page - 1) * limit;
        const paginatedProducts = products.slice(startIndex, startIndex + limit);

        return NextResponse.json({
            items: paginatedProducts,
            pagination: {
                page,
                limit,
                total,
                totalPages,
            }
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

// ============================================
// POST - Create new product
// ============================================

export async function POST(req: NextRequest) {
    const db = await getFirestore();

    try {
        const data = await req.json();

        // Validate data
        if (!data.slug || !data.price || !data.enName || !data.arName) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check slug uniqueness
        const existingSlug = await db.collection('products')
            .where('slug', '==', data.slug)
            .get();

        if (!existingSlug.empty) {
            return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
        }

        // Parse images if string
        let images = data.images || [];
        if (typeof images === 'string') {
            try {
                images = JSON.parse(images);
            } catch {
                images = [];
            }
        }

        // If single imageUrl provided, convert to images array
        if (data.imageUrl && !images.length) {
            images = [{
                id: `img_${Date.now()}`,
                url: data.imageUrl,
                alt: data.enName,
                altAr: data.arName,
                order: 0,
                isPrimary: true,
            }];
        }

        const productData = {
            slug: data.slug,
            sku: data.sku || null,
            price: Number(data.price),
            originalPrice: data.originalPrice ? Number(data.originalPrice) : null,
            discountPercentage: data.originalPrice
                ? Math.round((1 - data.price / data.originalPrice) * 100)
                : null,
            brand: data.brand,
            brandSlug: data.brand?.toLowerCase().replace(/\s+/g, '-'),
            categorySlug: data.categorySlug || 'general',
            subcategorySlug: data.subcategorySlug || null,
            images: images,
            featured: data.featured === true || data.featured === 'true',
            status: data.status || 'draft',
            stock: Number(data.stock) || 0,
            lowStockThreshold: Number(data.lowStockThreshold) || 5,
            translations: {
                en: {
                    name: data.enName,
                    description: data.enDesc || '',
                    shortDescription: data.enShortDesc || '',
                    metaTitle: data.enMetaTitle || data.enName,
                    metaDesc: data.enMetaDesc || '',
                    features: data.enFeatures
                        ? (typeof data.enFeatures === 'string'
                            ? data.enFeatures.split('\n').filter(Boolean)
                            : data.enFeatures)
                        : [],
                },
                ar: {
                    name: data.arName,
                    description: data.arDesc || '',
                    shortDescription: data.arShortDesc || '',
                    metaTitle: data.arMetaTitle || data.arName,
                    metaDesc: data.arMetaDesc || '',
                    features: data.arFeatures
                        ? (typeof data.arFeatures === 'string'
                            ? data.arFeatures.split('\n').filter(Boolean)
                            : data.arFeatures)
                        : [],
                },
            },
            seo: {
                keywords: data.keywords || '',
                focusKeyword: data.focusKeyword || '',
                canonical: data.canonical || null,
                schemaType: 'Product',
            },
            tags: data.tags
                ? (typeof data.tags === 'string' ? data.tags.split(',').map((t: string) => t.trim()) : data.tags)
                : [],
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
        };

        const docRef = await db.collection('products').add(productData);

        return NextResponse.json({
            success: true,
            id: docRef.id,
            ...productData
        });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}

// ============================================
// DELETE - Bulk delete products
// ============================================

export async function DELETE(req: NextRequest) {
    const db = await getFirestore();

    try {
        const { ids } = await req.json();

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'No product IDs provided' }, { status: 400 });
        }

        const batch = db.batch();

        for (const id of ids) {
            const docRef = db.collection('products').doc(id);
            batch.delete(docRef);
        }

        await batch.commit();

        return NextResponse.json({
            success: true,
            deleted: ids.length
        });
    } catch (error) {
        console.error('Error deleting products:', error);
        return NextResponse.json({ error: 'Failed to delete products' }, { status: 500 });
    }
}
