"use client";

import { useEffect, useCallback } from 'react';
import { X, AlertTriangle, CheckCircle, Trash2 } from 'lucide-react';
import { Button } from './FormField';

// ============================================
// BASE MODAL
// ============================================

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showCloseButton?: boolean;
}

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    showCloseButton = true,
}: ModalProps) {
    // Close on escape key
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div
                    className={`
                        relative w-full ${sizeClasses[size]}
                        bg-white dark:bg-gray-800 
                        rounded-2xl shadow-2xl
                        transform transition-all
                        animate-in fade-in-0 zoom-in-95 duration-200
                    `}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    {(title || showCloseButton) && (
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                            {title && (
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {title}
                                </h3>
                            )}
                            {showCloseButton && (
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================
// CONFIRM DELETE MODAL
// ============================================

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    itemName?: string;
    message?: string;
    loading?: boolean;
}

export function ConfirmDeleteModal({
    isOpen,
    onClose,
    onConfirm,
    title = 'تأكيد الحذف',
    itemName,
    message,
    loading,
}: ConfirmDeleteModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={false}>
            <div className="text-center">
                {/* Warning Icon */}
                <div className="mx-auto w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                    <Trash2 className="w-8 h-8 text-red-600" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {title}
                </h3>

                {/* Message */}
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {message || (
                        <>
                            هل أنت متأكد من حذف{' '}
                            {itemName && (
                                <span className="font-bold text-gray-900 dark:text-white">
                                    &quot;{itemName}&quot;
                                </span>
                            )}
                            ؟
                            <br />
                            <span className="text-sm text-red-500">
                                هذا الإجراء لا يمكن التراجع عنه.
                            </span>
                        </>
                    )}
                </p>

                {/* Actions */}
                <div className="flex gap-3">
                    <Button
                        variant="secondary"
                        className="flex-1"
                        onClick={onClose}
                        disabled={loading}
                    >
                        إلغاء
                    </Button>
                    <Button
                        variant="danger"
                        className="flex-1"
                        onClick={onConfirm}
                        loading={loading}
                        icon={<Trash2 className="w-4 h-4" />}
                    >
                        حذف
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

// ============================================
// CONFIRM ACTION MODAL
// ============================================

interface ConfirmActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'warning' | 'info' | 'success';
    loading?: boolean;
}

export function ConfirmActionModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'تأكيد',
    cancelText = 'إلغاء',
    type = 'warning',
    loading,
}: ConfirmActionModalProps) {
    const icons = {
        warning: <AlertTriangle className="w-8 h-8 text-yellow-600" />,
        info: <AlertTriangle className="w-8 h-8 text-blue-600" />,
        success: <CheckCircle className="w-8 h-8 text-green-600" />,
    };

    const colors = {
        warning: 'bg-yellow-100 dark:bg-yellow-900/30',
        info: 'bg-blue-100 dark:bg-blue-900/30',
        success: 'bg-green-100 dark:bg-green-900/30',
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={false}>
            <div className="text-center">
                <div className={`mx-auto w-16 h-16 rounded-full ${colors[type]} flex items-center justify-center mb-4`}>
                    {icons[type]}
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {message}
                </p>

                <div className="flex gap-3">
                    <Button
                        variant="secondary"
                        className="flex-1"
                        onClick={onClose}
                        disabled={loading}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant={type === 'warning' ? 'danger' : 'primary'}
                        className="flex-1"
                        onClick={onConfirm}
                        loading={loading}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

// ============================================
// SLIDE OVER PANEL
// ============================================

interface SlideOverProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    width?: 'sm' | 'md' | 'lg' | 'xl';
}

export function SlideOver({ isOpen, onClose, title, children, width = 'md' }: SlideOverProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const widthClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
    };

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="fixed inset-y-0 right-0 flex max-w-full">
                <div
                    className={`
                        w-screen ${widthClasses[width]}
                        bg-white dark:bg-gray-800
                        shadow-2xl
                        transform transition-transform duration-300
                        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                    `}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            {title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
