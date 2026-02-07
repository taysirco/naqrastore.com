'use client';

import dynamic from 'next/dynamic';

const CartDrawer = dynamic(() => import('@/components/cart/CartDrawer'), {
    ssr: false,
});

const AITrafficTracker = dynamic(() => import('@/components/seo/AITrafficTracker'), {
    ssr: false,
});

interface LazyClientComponentsProps {
    locale: string;
}

export default function LazyClientComponents({ locale }: LazyClientComponentsProps) {
    return (
        <>
            <AITrafficTracker />
            <CartDrawer locale={locale} />
        </>
    );
}
