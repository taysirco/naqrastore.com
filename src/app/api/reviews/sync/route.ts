/**
 * Google Sheets Review Sync API
 * Reads orders from Google Sheets and creates review tokens for delivered orders
 */

import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { getSecret } from '@/lib/get-secrets';
import { createReviewToken, generateReviewRequestMessage } from '@/lib/verified-reviews';
import { getFirestore } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

// Column indices (0-based)
const COLUMNS = {
    ORDER_DATE: 0,      // A - تاريخ الطلب
    CUSTOMER_NAME: 1,   // B - الاسم
    PHONE: 2,           // C - رقم الهاتف
    WHATSAPP: 3,        // D - رقم الواتس
    GOVERNORATE: 4,     // E - المحافظة
    AREA: 5,            // F - المنطقة
    ADDRESS: 6,         // G - العنوان
    ORDER_DETAILS: 7,   // H - تفاصيل الطلب
    QUANTITY: 8,        // I - الكمية
    TOTAL_PRICE: 9,     // J - توتال السعر
    PRODUCT_NAME: 10,   // K - اسم المنتج
    STATUS: 11,         // L - الحالة
    NOTES: 12,          // M - ملاحظات
};

const DELIVERED_STATUS = 'تم التوصيل';
const REVIEW_SENT_MARKER = '📝 تم إرسال طلب التقييم';

async function getGoogleAuth() {
    const GOOGLE_CLIENT_EMAIL = await getSecret('google_service_account_email');
    const GOOGLE_PRIVATE_KEY = await getSecret('google_private_key');

    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
        throw new Error('Google Sheets credentials missing');
    }

    return new JWT({
        email: GOOGLE_CLIENT_EMAIL,
        key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
}

// GET: Check for new delivered orders and create review tokens
export async function GET(req: NextRequest) {
    try {
        const SHEET_ID = process.env.GOOGLE_SHEET_ID;
        if (!SHEET_ID) {
            return NextResponse.json({ error: 'Sheet ID not configured' }, { status: 500 });
        }

        const auth = await getGoogleAuth();
        const doc = new GoogleSpreadsheet(SHEET_ID, auth);
        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();

        const results: any[] = [];
        const db = await getFirestore();

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            // Get values using proper getters
            const status = row.get('الحالة') || '';
            const notes = row.get('ملاحظات') || '';
            const customerName = row.get('الاسم') || '';
            const customerPhone = row.get('رقم الواتس') || row.get('رقم الهاتف') || '';
            const productName = row.get('اسم المنتج') || '';
            const governorate = row.get('المحافظة') || '';

            // Skip if not delivered or already processed
            if (status !== DELIVERED_STATUS) continue;
            if (notes.includes(REVIEW_SENT_MARKER)) continue;
            if (!customerName || !customerPhone || !productName) continue;

            try {
                // Generate unique order ID
                const orderId = `GS-${i + 2}-${Date.now()}`;

                // Create review token
                const token = await createReviewToken(
                    orderId,
                    orderId,
                    productName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
                    productName,
                    customerName,
                    customerPhone,
                    governorate || 'مصر',
                    new Date()
                );

                // Generate WhatsApp message
                const message = generateReviewRequestMessage(
                    customerName.split(' ')[0],
                    productName,
                    token,
                    'ar'
                );

                const reviewUrl = `https://cairovolt.com/ar/review/${token}`;
                const whatsappLink = `https://wa.me/${customerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

                // Update the notes column to mark as processed
                row.set('ملاحظات', `${notes}\n${REVIEW_SENT_MARKER}\n🔗 ${reviewUrl}`);
                await row.save();

                // Log to Firestore
                await db.collection('review_requests').add({
                    orderId,
                    rowNumber: i + 2,
                    customerName,
                    customerPhone,
                    productName,
                    governorate,
                    token,
                    reviewUrl,
                    whatsappLink,
                    status: 'pending',
                    source: 'google_sheets_sync',
                    createdAt: FieldValue.serverTimestamp()
                });

                results.push({
                    rowNumber: i + 2,
                    customerName,
                    productName,
                    reviewUrl,
                    whatsappLink,
                    status: 'created'
                });

            } catch (rowError: any) {
                results.push({
                    rowNumber: i + 2,
                    customerName,
                    error: rowError.message,
                    status: 'error'
                });
            }
        }

        return NextResponse.json({
            success: true,
            processed: results.length,
            results
        });

    } catch (error: any) {
        console.error('Sheet sync error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}

// POST: Get pending review requests for display
export async function POST(req: NextRequest) {
    try {
        const db = await getFirestore();
        const snapshot = await db.collection('review_requests')
            .orderBy('createdAt', 'desc')
            .limit(50)
            .get();

        const requests = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null
        }));

        return NextResponse.json({
            success: true,
            total: requests.length,
            requests
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
