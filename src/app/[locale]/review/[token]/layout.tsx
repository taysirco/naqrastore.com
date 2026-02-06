import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Write Review | CairoVolt',
    description: 'Share your product review',
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
        },
    },
};

export default function ReviewLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
