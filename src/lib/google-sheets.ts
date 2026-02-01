import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Sheet Config & Auth (Lazy Init)
let serviceAccountAuth: JWT | null = null;

function getAuth() {
    if (serviceAccountAuth) return serviceAccountAuth;

    const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
        return null;
    }

    try {
        serviceAccountAuth = new JWT({
            email: GOOGLE_CLIENT_EMAIL,
            key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        return serviceAccountAuth;
    } catch (error) {
        console.error('Google Auth Init Failed:', error);
        return null;
    }
}

export async function appendOrderToSheet(orderData: any) {
    const SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const auth = getAuth();

    if (!SHEET_ID || !auth) {
        console.error('Google Sheets credentials missing or invalid');
        return;
    }

    try {
        const doc = new GoogleSpreadsheet(SHEET_ID, auth);
        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[0]; // Assume first sheet

        const rows = orderData.items.map((item: any) => ({
            'تاريخ الطلب': new Date().toLocaleDateString('ar-EG'),
            'الاسم': orderData.customerName,
            'رقم الهاتف': orderData.phone,
            'رقم الواتس': orderData.whatsapp || orderData.phone,
            'المحافظة': orderData.cityLabel || orderData.city,
            'المنطقة': '', // Not collected explicitly
            'العنوان': orderData.address,
            'تفاصيل الطلب': `${item.name} (x${item.quantity})`,
            'الكمية': item.quantity,
            'توتال السعر شامل الشحن': orderData.totalAmount, // Total order price
            'اسم المنتج': item.name,
            'الحالة': 'جديد',
            'ملاحظات': 'طلب من الموقع',
        }));

        await sheet.addRows(rows);
        console.log('Order added to Google Sheet');
    } catch (error) {
        console.error('Error appending to Google Sheet:', error);
    }
}
