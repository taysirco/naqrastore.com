"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useCart } from '@/context/CartContext';

// All Egyptian Governorates (bilingual)
const GOVERNORATES = {
    en: [
        { value: 'cairo', label: 'Cairo' },
        { value: 'giza', label: 'Giza' },
        { value: 'alexandria', label: 'Alexandria' },
        { value: 'qalyubia', label: 'Qalyubia' },
        { value: 'dakahlia', label: 'Dakahlia' },
        { value: 'sharqia', label: 'Sharqia' },
        { value: 'gharbia', label: 'Gharbia' },
        { value: 'monufia', label: 'Monufia' },
        { value: 'beheira', label: 'Beheira' },
        { value: 'kafr-el-sheikh', label: 'Kafr El Sheikh' },
        { value: 'damietta', label: 'Damietta' },
        { value: 'port-said', label: 'Port Said' },
        { value: 'ismailia', label: 'Ismailia' },
        { value: 'suez', label: 'Suez' },
        { value: 'fayoum', label: 'Fayoum' },
        { value: 'beni-suef', label: 'Beni Suef' },
        { value: 'minya', label: 'Minya' },
        { value: 'asyut', label: 'Asyut' },
        { value: 'sohag', label: 'Sohag' },
        { value: 'qena', label: 'Qena' },
        { value: 'luxor', label: 'Luxor' },
        { value: 'aswan', label: 'Aswan' },
        { value: 'red-sea', label: 'Red Sea' },
        { value: 'north-sinai', label: 'North Sinai' },
        { value: 'south-sinai', label: 'South Sinai' },
        { value: 'matrouh', label: 'Matrouh' },
        { value: 'new-valley', label: 'New Valley' },
    ],
    ar: [
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
    ],
};

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
    const tCommon = useTranslations('Common');
    const locale = useLocale();
    const isArabic = locale === 'ar';
    const router = useRouter();
    const { items: cartItems, totalAmount, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [whatsapp, setWhatsapp] = useState('');

    const governorates = isArabic ? GOVERNORATES.ar : GOVERNORATES.en;
    const currency = isArabic ? 'جنيه' : 'EGP';

    // Redirect if cart is empty
    useEffect(() => {
        if (!loading && cartItems.length === 0) {
            router.push('/');
        }
    }, [cartItems, loading, router]);

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

        const shipping = totalAmount >= 500 ? 0 : 40;
        const finalTotal = totalAmount + shipping;

        const orderData = {
            customerName: formData.get('customerName'),
            phone: phone,
            whatsapp: whatsapp || phone,
            address: formData.get('address'),
            city: formData.get('city'),
            items: cartItems,
            totalAmount: finalTotal, // Send final total including shipping
            subtotal: totalAmount, // Keep track of subtotal
        };

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            if (!res.ok) throw new Error('Failed to place order');

            const result = await res.json();

            // Prepare order data for confirmation page
            const city = formData.get('city') as string;
            const confirmData = {
                orderId: result.orderId || `CV-${Date.now().toString(36).toUpperCase()}`,
                customerName: formData.get('customerName') as string,
                phone: phone,
                whatsapp: whatsapp || phone,
                address: formData.get('address') as string,
                city: city,
                cityLabel: governorates.find(g => g.value === city)?.label || city,
                items: cartItems,
                subtotal: totalAmount,
                shipping: totalAmount >= 500 ? 0 : 40,
                total: totalAmount >= 500 ? totalAmount : totalAmount + 40,
                orderDate: new Date().toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }),
            };

            // Store in sessionStorage for confirm page
            sessionStorage.setItem('lastOrder', JSON.stringify(confirmData));

            // Redirect FIRST, then clear cart (to avoid useEffect redirect to /)
            router.push('/confirm');

            // Clear cart after initiating redirect
            setTimeout(() => clearCart(), 100);
        } catch (error) {
            alert(isArabic ? 'حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.' : 'An error occurred while placing your order. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mx-auto px-4 py-12" dir={isArabic ? 'rtl' : 'ltr'}>
            <h1 className="text-3xl font-bold mb-8 text-center">{t('checkout')}</h1>

            <div className="max-w-2xl mx-auto grid gap-8">
                {/* Order Summary */}
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl">
                    <h2 className="font-bold mb-4">{t('orderSummary')}</h2>
                    {cartItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between py-2 border-b">
                            <span>{item.name} x{item.quantity}</span>
                            <span className="font-bold">{item.price * item.quantity} {currency}</span>
                        </div>
                    ))}
                    <div className="flex justify-between pt-4 text-lg font-bold">
                        <span>{tCommon('items')}</span>
                        <span className="text-green-600">{totalAmount} {currency}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">💵 {t('cashOnDelivery')}</p>
                </div>

                {/* Checkout Form */}
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border space-y-4">
                    <h2 className="font-bold mb-4">{t('shippingInfo')}</h2>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            {isArabic ? 'الاسم بالكامل' : 'Full Name'}
                        </label>
                        <input
                            name="customerName"
                            required
                            className="w-full border rounded-lg p-3 dark:bg-gray-800 dark:border-gray-700"
                            placeholder={isArabic ? 'أحمد محمد' : 'Ahmed Mohamed'}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">{t('phone')}</label>
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
                        <label className="block text-sm font-medium mb-1">
                            {isArabic ? 'رقم الواتساب (اختياري)' : 'WhatsApp Number (Optional)'}
                        </label>
                        <input
                            name="whatsapp"
                            type="tel"
                            value={whatsapp}
                            onChange={handleWhatsappChange}
                            className="w-full border rounded-lg p-3 dark:bg-gray-800 dark:border-gray-700"
                            placeholder={isArabic ? '01xxxxxxxxx (اتركه فارغ إذا كان نفس رقم الهاتف)' : '01xxxxxxxxx (Leave empty if same as phone)'}
                            dir="ltr"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">{t('governorate')}</label>
                        <select name="city" required className="w-full border rounded-lg p-3 dark:bg-gray-800 dark:border-gray-700">
                            <option value="">{isArabic ? 'اختر المحافظة' : 'Select Governorate'}</option>
                            {governorates.map((gov) => (
                                <option key={gov.value} value={gov.value}>{gov.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">{t('address')}</label>
                        <textarea
                            name="address"
                            required
                            className="w-full border rounded-lg p-3 h-24 dark:bg-gray-800 dark:border-gray-700"
                            placeholder={isArabic ? 'الشارع، المبنى، الطابق، علامة مميزة' : 'Street, Building, Floor, Landmark'}
                        />
                    </div>

                    <button
                        disabled={loading}
                        className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50"
                    >
                        {loading
                            ? (isArabic ? 'جاري إرسال الطلب...' : 'Placing Order...')
                            : (isArabic ? 'تأكيد الطلب (الدفع عند الاستلام)' : 'Place Order (Cash on Delivery)')
                        }
                    </button>
                </form>

                {/* Trust Badges */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-2xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-4">
                            <div className="text-3xl mb-2">💵</div>
                            <h3 className="font-bold text-sm text-gray-700 dark:text-gray-300">
                                {isArabic ? 'الدفع عند الاستلام' : 'Cash on Delivery'}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                                {isArabic ? 'ادفع لما الطلب يوصلك' : 'Pay when you receive'}
                            </p>
                        </div>
                        <div className="p-4">
                            <div className="text-3xl mb-2">🚚</div>
                            <h3 className="font-bold text-sm text-gray-700 dark:text-gray-300">
                                {isArabic ? 'شحن لكل مصر' : 'Nationwide Shipping'}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                                {isArabic ? '27 محافظة' : '27 Governorates'}
                            </p>
                        </div>
                        <div className="p-4">
                            <div className="text-3xl mb-2">🔄</div>
                            <h3 className="font-bold text-sm text-gray-700 dark:text-gray-300">
                                {isArabic ? 'استبدال واسترجاع' : 'Returns & Exchange'}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                                {isArabic ? 'خلال 14 يوم' : 'Within 14 days'}
                            </p>
                        </div>
                        <div className="p-4">
                            <div className="text-3xl mb-2">🛡️</div>
                            <h3 className="font-bold text-sm text-gray-700 dark:text-gray-300">
                                {isArabic ? 'ضمان المنتج' : 'Product Warranty'}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                                {isArabic ? 'حسب البراند' : 'By Brand'}
                            </p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
                        <p className="text-xs text-gray-500">
                            🏪 <strong>Anker:</strong> {isArabic ? 'ضمان 18 شهر' : '18 month warranty'} |
                            🏪 <strong>Joyroom:</strong> {isArabic ? 'ضمان 12 شهر' : '12 month warranty'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
