"use client";

import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

// ============================================
// TOAST TYPES
// ============================================

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
}

interface ToastContextValue {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: string) => void;
    success: (title: string, message?: string) => void;
    error: (title: string, message?: string) => void;
    warning: (title: string, message?: string) => void;
    info: (title: string, message?: string) => void;
}

// ============================================
// CONTEXT
// ============================================

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

// ============================================
// PROVIDER
// ============================================

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        const duration = toast.duration || 5000;

        setToasts(prev => [...prev, { ...toast, id }]);

        // Auto remove after duration
        setTimeout(() => {
            removeToast(id);
        }, duration);
    }, [removeToast]);

    const success = useCallback((title: string, message?: string) => {
        addToast({ type: 'success', title, message });
    }, [addToast]);

    const error = useCallback((title: string, message?: string) => {
        addToast({ type: 'error', title, message, duration: 7000 });
    }, [addToast]);

    const warning = useCallback((title: string, message?: string) => {
        addToast({ type: 'warning', title, message });
    }, [addToast]);

    const info = useCallback((title: string, message?: string) => {
        addToast({ type: 'info', title, message });
    }, [addToast]);

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast, success, error, warning, info }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
}

// ============================================
// TOAST CONTAINER
// ============================================

function ToastContainer({
    toasts,
    removeToast
}: {
    toasts: Toast[];
    removeToast: (id: string) => void;
}) {
    return (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-md">
            {toasts.map(toast => (
                <ToastItem
                    key={toast.id}
                    toast={toast}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </div>
    );
}

// ============================================
// TOAST ITEM
// ============================================

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger enter animation
        requestAnimationFrame(() => {
            setIsVisible(true);
        });
    }, []);

    const icons = {
        success: <CheckCircle className="w-5 h-5" />,
        error: <AlertCircle className="w-5 h-5" />,
        warning: <AlertTriangle className="w-5 h-5" />,
        info: <Info className="w-5 h-5" />,
    };

    const colors = {
        success: {
            bg: 'bg-green-50 dark:bg-green-900/30',
            border: 'border-green-200 dark:border-green-800',
            icon: 'text-green-600 dark:text-green-400',
            title: 'text-green-800 dark:text-green-200',
        },
        error: {
            bg: 'bg-red-50 dark:bg-red-900/30',
            border: 'border-red-200 dark:border-red-800',
            icon: 'text-red-600 dark:text-red-400',
            title: 'text-red-800 dark:text-red-200',
        },
        warning: {
            bg: 'bg-yellow-50 dark:bg-yellow-900/30',
            border: 'border-yellow-200 dark:border-yellow-800',
            icon: 'text-yellow-600 dark:text-yellow-400',
            title: 'text-yellow-800 dark:text-yellow-200',
        },
        info: {
            bg: 'bg-blue-50 dark:bg-blue-900/30',
            border: 'border-blue-200 dark:border-blue-800',
            icon: 'text-blue-600 dark:text-blue-400',
            title: 'text-blue-800 dark:text-blue-200',
        },
    };

    const style = colors[toast.type];

    return (
        <div
            className={`
                flex items-start gap-3 p-4
                ${style.bg} ${style.border}
                border rounded-xl shadow-lg
                transform transition-all duration-300 ease-out
                ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
            `}
        >
            <div className={`flex-shrink-0 ${style.icon}`}>
                {icons[toast.type]}
            </div>

            <div className="flex-1 min-w-0">
                <p className={`font-medium ${style.title}`}>
                    {toast.title}
                </p>
                {toast.message && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                        {toast.message}
                    </p>
                )}
            </div>

            <button
                onClick={onClose}
                className="flex-shrink-0 p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}

// ============================================
// STANDALONE TOAST FUNCTION (for non-context use)
// ============================================

let toastHandler: ToastContextValue | null = null;

export function setToastHandler(handler: ToastContextValue) {
    toastHandler = handler;
}

export function showToast(type: ToastType, title: string, message?: string) {
    if (toastHandler) {
        toastHandler.addToast({ type, title, message });
    } else {
        console.warn('Toast handler not initialized. Wrap your app with ToastProvider.');
    }
}
