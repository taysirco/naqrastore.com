import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css"; // Corrected path
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { OrganizationSchema } from '@/components/schemas/ProductSchema';
import { CartProvider } from '@/context/CartContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cairovolt.com'),
  title: {
    template: '%s | Cairo Volt',
    default: 'Cairo Volt - Premium Mobile Accessories in Egypt',
  },
  description: 'Shop the best mobile accessories from Anker and Joyroom in Egypt. Power banks, chargers, earbuds, cables at the best prices with official warranty.',
  icons: {
    icon: '/favicon.ico',
  },
  alternates: {
    canonical: 'https://cairovolt.com',
    languages: {
      'ar': 'https://cairovolt.com/ar',
      'en': 'https://cairovolt.com/en',
      'x-default': 'https://cairovolt.com/ar',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    alternateLocale: 'en_US',
    siteName: 'Cairo Volt',
  },
};

import CartDrawer from "@/components/cart/CartDrawer";

// ... imports remain the same

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // ... validation remains

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        {/* hreflang tags for better international SEO */}
        <link rel="alternate" hrefLang="ar" href="https://cairovolt.com/ar" />
        <link rel="alternate" hrefLang="en" href="https://cairovolt.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://cairovolt.com/ar" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <OrganizationSchema locale={locale} />
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <CartDrawer locale={locale} />
              <Footer />
            </div>
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

