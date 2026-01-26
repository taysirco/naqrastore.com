import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { staticCategories, staticProducts } from '@/lib/static-products';

// ============================================
// GET - List all categories
// ============================================

export async function GET() {
    // Use static data when Firebase is not configured
    if (!adminDb) {
        // Add product counts to categories
        const categoriesWithCounts = staticCategories.map(cat => ({
            id: `static_${cat.slug}`,
            ...cat,
            productCount: staticProducts.filter(p => p.categorySlug === cat.slug).length
        }));
        return NextResponse.json(categoriesWithCounts);
    }

    try {
        const snapshot = await adminDb.collection('categories')
            .orderBy('order', 'asc')
            .get();

        const categories = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return NextResponse.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

// ============================================
// POST - Create new category
// ============================================

export async function POST(req: NextRequest) {
    if (!adminDb) {
        return NextResponse.json({ error: 'Firebase not configured' }, { status: 503 });
    }

    try {
        const data = await req.json();

        if (!data.slug || !data.enName || !data.arName) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check slug uniqueness
        const existingSlug = await adminDb.collection('categories')
            .where('slug', '==', data.slug)
            .get();

        if (!existingSlug.empty) {
            return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
        }

        // Get max order
        const maxOrderSnapshot = await adminDb.collection('categories')
            .orderBy('order', 'desc')
            .limit(1)
            .get();

        const maxOrder = maxOrderSnapshot.empty ? 0 : (maxOrderSnapshot.docs[0].data().order || 0);

        const categoryData = {
            slug: data.slug,
            icon: data.icon || null,
            image: data.image || null,
            order: data.order ?? maxOrder + 1,
            status: data.status || 'active',
            productCount: 0,
            translations: {
                en: {
                    name: data.enName,
                    description: data.enDesc || '',
                    metaTitle: data.enMetaTitle || data.enName,
                    metaDesc: data.enMetaDesc || '',
                },
                ar: {
                    name: data.arName,
                    description: data.arDesc || '',
                    metaTitle: data.arMetaTitle || data.arName,
                    metaDesc: data.arMetaDesc || '',
                },
            },
            seo: {
                keywords: data.keywords || '',
                canonical: data.canonical || null,
            },
            subcategories: [],
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
        };

        const docRef = await adminDb.collection('categories').add(categoryData);

        return NextResponse.json({
            success: true,
            id: docRef.id,
            ...categoryData
        });
    } catch (error) {
        console.error('Error creating category:', error);
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }
}

// ============================================
// DELETE - Bulk delete categories
// ============================================

export async function DELETE(req: NextRequest) {
    if (!adminDb) {
        return NextResponse.json({ error: 'Firebase not configured' }, { status: 503 });
    }

    try {
        const { ids } = await req.json();

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'No category IDs provided' }, { status: 400 });
        }

        const batch = adminDb.batch();

        for (const id of ids) {
            const docRef = adminDb.collection('categories').doc(id);
            batch.delete(docRef);
        }

        await batch.commit();

        return NextResponse.json({
            success: true,
            deleted: ids.length
        });
    } catch (error) {
        console.error('Error deleting categories:', error);
        return NextResponse.json({ error: 'Failed to delete categories' }, { status: 500 });
    }
}
