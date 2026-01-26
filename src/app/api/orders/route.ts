import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(req: NextRequest) {
    if (!adminDb) {
        return NextResponse.json({ error: 'Firebase not configured' }, { status: 503 });
    }

    try {
        const data = await req.json();

        // Validate required fields
        if (!data.customerName || !data.phone || !data.address || !data.city || !data.items?.length) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const orderData = {
            customerName: data.customerName,
            phone: data.phone,
            address: data.address,
            city: data.city,
            items: data.items,
            totalAmount: data.totalAmount,
            status: 'pending',
            paymentMethod: 'cod',
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
        };

        const docRef = await adminDb.collection('orders').add(orderData);

        return NextResponse.json({ id: docRef.id, message: 'Order placed successfully' });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}

export async function GET() {
    if (!adminDb) {
        return NextResponse.json([]);
    }

    try {
        const snapshot = await adminDb.collection('orders').orderBy('createdAt', 'desc').get();
        const orders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return NextResponse.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}
