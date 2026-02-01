"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCart } from '@/context/CartContext';

// All Egyptian Governorates
const GOVERNORATES = [
    { value: 'cairo', label: 'القاهرة' },
    { value: 'giza', label: 'الجيزة' },
    { value: 'alexandria', label: 'الإسكندرية' },
    { value: 'qalyubia', label: 'القليوبية' },
    { value: 'dakahlia', label: 'الدقهلية' },
    { value: 'sharqia', label: 'الشرقية' },
    { value: 'gharbia', label: 'الغربية' },
    { value: 'monufia', label: 'المنوفية' },
    { value: 'beheira', label: 'البحيرة' },
    { value: 'kafr-el-sheikh', label: 'كفر الشيخ' },
    { value: 'damietta', label: 'دمياط' },
    { value: 'port-said', label: 'بورسعيد' },
    { value: 'ismailia', label: 'الإسماعيلية' },
    { value: 'suez', label: 'السويس' },
    { value: 'fayoum', label: 'الفيوم' },
    { value: 'beni-suef', label: 'بني سويف' },
    { value: 'minya', label: 'المنيا' },
    { value: 'asyut', label: 'أسيوط' },
    { value: 'sohag', label: 'سوهاج' },
    { value: 'qena', label: 'قنا' },
    { value: 'luxor', label: 'الأقصر' },
    { value: 'aswan', label: 'أسوان' },
    { value: 'red-sea', label: 'البحر الأحمر' },
    { value: 'north-sinai', label: 'شمال سيناء' },
    { value: 'south-sinai', label: 'جنوب سيناء' },
    { value: 'matrouh', label: 'مطروح' },
    { value: 'new-valley', label: 'الوادي الجديد' },
];

// Convert Arabic numerals to English
function convertArabicToEnglish(str: string): string {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    let result = str;
    arabicNumerals.forEach((arabic, index) => {
        result = result.replace(new RegExp(arabic, 'g'), index.toString());
    });
    return result;
}

export default function CheckoutPage() {
    const t = useTranslations('Checkout');
    const router = useRouter();
    const { items: cartItems, totalAmount, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [phone, setPhone] = useState('');
    const [whatsapp, setWhatsapp] = useState('');

    // Redirect if cart is empty
    useEffect(() => {
        if (!loading && !success && cartItems.length === 0) {
            router.push('/');
        }
    }, [cartItems, loading, success, router]);

    // Handle phone input - convert Arabic to English
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const converted = convertArabicToEnglish(e.target.value);
        setPhone(converted.replace(/[^0-9]/g, ''));
    };

    // Handle WhatsApp input - convert Arabic to English
    const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const converted = convertArabicToEnglish(e.target.value);
        setWhatsapp(converted.replace(/[^0-9]/g, ''));
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const orderData = {
            customerName: formData.get('customerName'),
            phone: phone,
            whatsapp: whatsapp || phone, // Use phone if WhatsApp not provided
            address: formData.get('address'),
            city: formData.get('city'),
            items: cartItems,
            totalAmount,
        };

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            if (!res.ok) throw new Error('Failed to place order');

            setSuccess(true);
            clearCart();
        } catch (error) {
            alert('حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.');
        } finally {
            setLoading(false);
        }
    }

    if (success) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="bg-green-50 p-8 rounded-2xl max-w-md mx-auto">
                    <div className="text-5xl mb-4">✅</div>
                    <h1 className="text-2xl font-bold text-green-700 mb-2">تم استلام طلبك بنجاح!</h1>
                    <p className="text-gray-600">سنتواصل معك قريباً لتأكيد الطلب.</p>
                    <p className="text-sm text-gray-400 mt-4">💵 الدفع عند الاستلام</p>
                    <button
                        onClick={() => router.push('/')}
                        className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        العودة للرئيسية
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12" dir="rtl">
            <h1 className="text-3xl font-bold mb-8 text-center">إتمام الطلب</h1>

            <div className="max-w-2xl mx-auto grid gap-8">
                {/* Order Summary */}
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl">
                    <h2 className="font-bold mb-4">ملخص الطلب</h2>
                    {cartItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between py-2 border-b">
                            <span>{item.name} x{item.quantity}</span>
                            <span className="font-bold">{item.price * item.quantity} جنيه</span>
                        </div>
                    ))}
                    <div className="flex justify-between pt-4 text-lg font-bold">
                        <span>الإجمالي</span>
                        <span className="text-green-600">{totalAmount} جنيه</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">💵 الدفع عند الاستلام</p>
                </div>

                {/* Checkout Form */}
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border space-y-4">
                    <h2 className="font-bold mb-4">بيانات التوصيل</h2>

                    <div>
                        <label className="block text-sm font-medium mb-1">الاسم بالكامل</label>
                        <input
                            name="customerName"
                            required
                            className="w-full border rounded-lg p-3 dark:bg-gray-800 dark:border-gray-700"
                            placeholder="أحمد محمد"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">رقم الهاتف</label>
                        <input
                            name="phone"
                            type="tel"
                            required
                            value={phone}
                            onChange={handlePhoneChange}
                            className="w-full border rounded-lg p-3 dark:bg-gray-800 dark:border-gray-700"
                            placeholder="01xxxxxxxxx"
                            dir="ltr"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">رقم الواتساب (اختياري)</label>
                        <input
                            name="whatsapp"
                            type="tel"
                            value={whatsapp}
                            onChange={handleWhatsappChange}
                            className="w-full border rounded-lg p-3 dark:bg-gray-800 dark:border-gray-700"
                            placeholder="01xxxxxxxxx (اتركه فارغ إذا كان نفس رقم الهاتف)"
                            dir="ltr"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">المحافظة</label>
                        <select name="city" required className="w-full border rounded-lg p-3 dark:bg-gray-800 dark:border-gray-700">
                            <option value="">اختر المحافظة</option>
                            {GOVERNORATES.map((gov) => (
                                <option key={gov.value} value={gov.value}>{gov.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">العنوان بالتفصيل</label>
                        <textarea
                            name="address"
                            required
                            className="w-full border rounded-lg p-3 h-24 dark:bg-gray-800 dark:border-gray-700"
                            placeholder="الشارع، المبنى، الطابق، علامة مميزة"
                        />
                    </div>

                    <button
                        disabled={loading}
                        className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50"
                    >
                        {loading ? 'جاري إرسال الطلب...' : 'تأكيد الطلب (الدفع عند الاستلام)'}
                    </button>
                </form>

                {/* Trust Badges */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-2xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-4">
                            <div className="text-3xl mb-2">💵</div>
                            <h3 className="font-bold text-sm text-gray-700 dark:text-gray-300">الدفع عند الاستلام</h3>
                            <p className="text-xs text-gray-500 mt-1">ادفع لما الطلب يوصلك</p>
                        </div>
                        <div className="p-4">
                            <div className="text-3xl mb-2">🚚</div>
                            <h3 className="font-bold text-sm text-gray-700 dark:text-gray-300">شحن لكل مصر</h3>
                            <p className="text-xs text-gray-500 mt-1">27 محافظة</p>
                        </div>
                        <div className="p-4">
                            <div className="text-3xl mb-2">🔄</div>
                            <h3 className="font-bold text-sm text-gray-700 dark:text-gray-300">استبدال واسترجاع</h3>
                            <p className="text-xs text-gray-500 mt-1">خلال 14 يوم</p>
                        </div>
                        <div className="p-4">
                            <div className="text-3xl mb-2">🛡️</div>
                            <h3 className="font-bold text-sm text-gray-700 dark:text-gray-300">ضمان المنتج</h3>
                            <p className="text-xs text-gray-500 mt-1">حسب البراند</p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
                        <p className="text-xs text-gray-500">
                            🏪 <strong>Anker:</strong> ضمان 18 شهر |
                            🏪 <strong>Joyroom:</strong> ضمان 12 شهر
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
