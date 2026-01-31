import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Checkout | CairoVolt',
    description: 'Complete your order - Cash on Delivery available',
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
        },
    },
};

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
