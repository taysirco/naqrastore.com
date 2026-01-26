"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    FolderTree,
    ShoppingCart,
    Search as SearchIcon,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronDown,
    Plus,
    Bell,
    Moon,
    Sun
} from 'lucide-react';
import { ToastProvider } from '@/components/admin/Toast';
import '@/app/globals.css';

// ============================================
// NAVIGATION CONFIG
// ============================================

const navigation = [
    {
        name: 'Dashboard',
        nameAr: 'لوحة التحكم',
        href: '/admin',
        icon: LayoutDashboard,
        exact: true,
    },
    {
        name: 'Products',
        nameAr: 'المنتجات',
        href: '/admin/products',
        icon: Package,
        children: [
            { name: 'All Products', nameAr: 'كل المنتجات', href: '/admin/products' },
            { name: 'Add Product', nameAr: 'إضافة منتج', href: '/admin/products/new' },
        ],
    },
    {
        name: 'Categories',
        nameAr: 'الفئات',
        href: '/admin/categories',
        icon: FolderTree,
        children: [
            { name: 'All Categories', nameAr: 'كل الفئات', href: '/admin/categories' },
            { name: 'Add Category', nameAr: 'إضافة فئة', href: '/admin/categories/new' },
        ],
    },
    {
        name: 'Orders',
        nameAr: 'الطلبات',
        href: '/admin/orders',
        icon: ShoppingCart,
    },
    {
        name: 'SEO Center',
        nameAr: 'مركز SEO',
        href: '/admin/seo',
        icon: SearchIcon,
    },
];

// ============================================
// LAYOUT
// ============================================

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [darkMode, setDarkMode] = useState(false);

    // Toggle expanded menu items
    const toggleExpanded = (name: string) => {
        setExpandedItems(prev =>
            prev.includes(name)
                ? prev.filter(n => n !== name)
                : [...prev, name]
        );
    };

    // Check if nav item is active
    const isActive = (href: string, exact?: boolean) => {
        if (exact) return pathname === href;
        return pathname.startsWith(href);
    };

    // Auto-expand active parent
    useEffect(() => {
        navigation.forEach(item => {
            if (item.children && pathname.startsWith(item.href)) {
                setExpandedItems(prev =>
                    prev.includes(item.name) ? prev : [...prev, item.name]
                );
            }
        });
    }, [pathname]);

    return (
        <html lang="ar" dir="rtl" className={darkMode ? 'dark' : ''}>
            <body className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
                <ToastProvider>
                    <div className="flex min-h-screen">
                        {/* Mobile backdrop */}
                        {sidebarOpen && (
                            <div
                                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                                onClick={() => setSidebarOpen(false)}
                            />
                        )}

                        {/* Sidebar - RTL: on the right side */}
                        <aside className={`
                            fixed inset-y-0 right-0 z-50
                            w-72 
                            bg-white dark:bg-gray-900
                            border-l border-gray-200 dark:border-gray-800
                            transform transition-transform duration-300 ease-out
                            lg:translate-x-0
                            ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
                        `}>
                            <div className="flex flex-col h-full">
                                {/* Logo */}
                                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-800">
                                    <Link href="/admin" className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                                            <Package className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h1 className="font-bold text-gray-900 dark:text-white">
                                                Store Admin
                                            </h1>
                                            <p className="text-xs text-gray-500">لوحة التحكم</p>
                                        </div>
                                    </Link>

                                    <button
                                        onClick={() => setSidebarOpen(false)}
                                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Quick Action */}
                                <div className="p-4">
                                    <Link
                                        href="/admin/products/new"
                                        className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-200"
                                    >
                                        <Plus className="w-5 h-5" />
                                        <span>منتج جديد</span>
                                    </Link>
                                </div>

                                {/* Navigation */}
                                <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                                    {navigation.map((item) => {
                                        const Icon = item.icon;
                                        const active = isActive(item.href, item.exact);
                                        const expanded = expandedItems.includes(item.name);

                                        return (
                                            <div key={item.name}>
                                                {item.children ? (
                                                    <button
                                                        onClick={() => toggleExpanded(item.name)}
                                                        className={`
                                                    w-full flex items-center justify-between gap-3 
                                                    px-4 py-3 rounded-xl
                                                    transition-all duration-200
                                                    ${active
                                                                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                                            }
                                                `}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <Icon className="w-5 h-5" />
                                                            <span className="font-medium">{item.nameAr}</span>
                                                        </div>
                                                        <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                                                    </button>
                                                ) : (
                                                    <Link
                                                        href={item.href}
                                                        className={`
                                                    flex items-center gap-3 
                                                    px-4 py-3 rounded-xl
                                                    transition-all duration-200
                                                    ${active
                                                                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                                            }
                                                `}
                                                    >
                                                        <Icon className="w-5 h-5" />
                                                        <span>{item.nameAr}</span>
                                                    </Link>
                                                )}

                                                {/* Submenu */}
                                                {item.children && expanded && (
                                                    <div className="mt-1 ml-8 space-y-1">
                                                        {item.children.map((child) => (
                                                            <Link
                                                                key={child.href}
                                                                href={child.href}
                                                                className={`
                                                            block px-4 py-2 rounded-lg text-sm
                                                            transition-colors
                                                            ${pathname === child.href
                                                                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium'
                                                                        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                                                    }
                                                        `}
                                                            >
                                                                {child.nameAr}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </nav>

                                {/* Footer */}
                                <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
                                    <button
                                        onClick={() => setDarkMode(!darkMode)}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                    >
                                        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                        <span>{darkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}</span>
                                    </button>

                                    <Link
                                        href="/"
                                        target="_blank"
                                        className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                    >
                                        <Settings className="w-5 h-5" />
                                        <span>عرض الموقع</span>
                                    </Link>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content - RTL: margin on right */}
                        <div className="flex-1 lg:mr-72">
                            {/* Header */}
                            <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
                                <div className="flex items-center justify-between h-full px-4 lg:px-8">
                                    {/* Mobile menu button */}
                                    <button
                                        onClick={() => setSidebarOpen(true)}
                                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        <Menu className="w-6 h-6" />
                                    </button>

                                    {/* Breadcrumb / Title */}
                                    <div className="hidden lg:block">
                                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                            {getPageTitle(pathname)}
                                        </h2>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <button className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                                        </button>

                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                            A
                                        </div>
                                    </div>
                                </div>
                            </header>

                            {/* Page Content */}
                            <main className="p-4 lg:p-8 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-4rem)]">
                                {children}
                            </main>
                        </div>
                    </div>
                </ToastProvider>
            </body>
        </html>
    );
}

// Helper to get page title from pathname
function getPageTitle(pathname: string): string {
    const titles: Record<string, string> = {
        '/admin': 'لوحة التحكم',
        '/admin/products': 'المنتجات',
        '/admin/products/new': 'إضافة منتج جديد',
        '/admin/categories': 'الفئات',
        '/admin/categories/new': 'إضافة فئة جديدة',
        '/admin/orders': 'الطلبات',
        '/admin/seo': 'مركز SEO',
    };

    // Check for dynamic routes
    if (pathname.match(/\/admin\/products\/[^/]+\/edit/)) {
        return 'تعديل المنتج';
    }
    if (pathname.match(/\/admin\/products\/[^/]+/)) {
        return 'تفاصيل المنتج';
    }
    if (pathname.match(/\/admin\/categories\/[^/]+/)) {
        return 'تفاصيل الفئة';
    }

    return titles[pathname] || 'لوحة التحكم';
}
