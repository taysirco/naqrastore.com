import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Order Confirmation | CairoVolt',
    description: 'Your order has been confirmed',
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
        },
    },
};

export default function ConfirmLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
