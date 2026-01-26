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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mobile Accessories Egypt | Anker & Joyroom Official Store",
  description: "Shop the best mobile accessories in Egypt. Certified Anker power banks, Joyroom headphones, chargers, and cables. Fast shipping across Egypt.",
  alternates: {
    canonical: 'https://naqrastore.com',
    languages: {
      'ar': 'https://naqrastore.com/ar',
      'en': 'https://naqrastore.com/en',
      'x-default': 'https://naqrastore.com/ar',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    alternateLocale: 'en_US',
    siteName: 'MobileStore Egypt',
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!['ar', 'en'].includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        {/* hreflang tags for better international SEO */}
        <link rel="alternate" hrefLang="ar" href="https://naqrastore.com/ar" />
        <link rel="alternate" hrefLang="en" href="https://naqrastore.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://naqrastore.com/ar" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-black`}
      >
        <OrganizationSchema locale={locale} />
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

