"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
    const t = useTranslations('Checkout');
    const router = useRouter();
    const { items: cartItems, totalAmount, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Redirect if cart is empty
    useEffect(() => {
        if (!loading && !success && cartItems.length === 0) {
            router.push('/');
        }
    }, [cartItems, loading, success, router]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const orderData = {
            customerName: formData.get('customerName'),
            phone: formData.get('phone'),
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
            clearCart(); // Clear cart after successful order
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
                    <p className="text-sm text-gray-400 mt-4">الدفع عند الاستلام</p>
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
                        <input name="customerName" required className="w-full border rounded-lg p-3" placeholder="أحمد محمد" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">رقم الهاتف</label>
                        <input name="phone" type="tel" required className="w-full border rounded-lg p-3" placeholder="01xxxxxxxxx" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">المدينة</label>
                        <select name="city" required className="w-full border rounded-lg p-3">
                            <option value="">اختر المدينة</option>
                            <option value="cairo">القاهرة</option>
                            <option value="giza">الجيزة</option>
                            <option value="alexandria">الإسكندرية</option>
                            <option value="mansoura">المنصورة</option>
                            <option value="other">مدينة أخرى</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">العنوان بالتفصيل</label>
                        <textarea name="address" required className="w-full border rounded-lg p-3 h-24" placeholder="الشارع، المبنى، الطابق، علامة مميزة" />
                    </div>

                    <button
                        disabled={loading}
                        className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50"
                    >
                        {loading ? 'جاري إرسال الطلب...' : 'تأكيد الطلب (الدفع عند الاستلام)'}
                    </button>
                </form>
            </div>
        </div>
    );
}
