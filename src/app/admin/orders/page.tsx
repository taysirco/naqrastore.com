"use client";

import { useEffect, useState } from 'react';

interface OrderItem {
    productId: string;
    name: string;
    quantity: number;
    priceAtPurchase: number;
}

interface Order {
    id: string;
    customerName: string;
    phone: string;
    address: string;
    city: string;
    items: OrderItem[];
    totalAmount: number;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
    paymentMethod: string;
    createdAt: { _seconds: number };
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/orders')
            .then(res => res.json())
            .then(data => {
                setOrders(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'confirmed': return 'bg-blue-100 text-blue-700';
            case 'shipped': return 'bg-purple-100 text-purple-700';
            case 'delivered': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Loading orders...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Orders</h1>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Customer</th>
                            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Phone</th>
                            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">City</th>
                            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Total</th>
                            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Payment</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-600">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                                <td className="px-6 py-4 font-medium">{order.customerName}</td>
                                <td className="px-6 py-4 text-gray-500 text-sm">{order.phone}</td>
                                <td className="px-6 py-4 text-gray-500">{order.city}</td>
                                <td className="px-6 py-4 font-bold">{order.totalAmount} EGP</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 uppercase">{order.paymentMethod}</td>
                            </tr>
                        ))}
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No orders yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
