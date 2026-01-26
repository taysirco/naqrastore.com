"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, forwardRef } from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

// ============================================
// TEXT INPUT
// ============================================

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    hint?: string;
    success?: boolean;
    icon?: React.ReactNode;
    dir?: 'ltr' | 'rtl';
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({ label, error, hint, success, icon, className, dir, ...props }, ref) => {
        return (
            <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                    {props.required && <span className="text-red-500 mr-1">*</span>}
                </label>
                <div className="relative">
                    {icon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        dir={dir}
                        className={`
                            w-full px-4 py-2.5 
                            ${icon ? 'pl-10' : ''}
                            bg-white dark:bg-gray-800
                            border rounded-xl
                            text-gray-900 dark:text-white
                            placeholder:text-gray-400
                            transition-all duration-200
                            focus:outline-none focus:ring-2 focus:ring-offset-0
                            disabled:opacity-50 disabled:cursor-not-allowed
                            ${error
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                : success
                                    ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                                    : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-800'
                            }
                            ${className || ''}
                        `}
                        {...props}
                    />
                    {error && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                        </div>
                    )}
                    {success && !error && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                    )}
                </div>
                {error && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </p>
                )}
                {hint && !error && (
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Info className="w-4 h-4" />
                        {hint}
                    </p>
                )}
            </div>
        );
    }
);

FormInput.displayName = 'FormInput';

// ============================================
// TEXTAREA
// ============================================

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
    hint?: string;
    charCount?: boolean;
    maxChars?: number;
    dir?: 'ltr' | 'rtl';
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
    ({ label, error, hint, charCount, maxChars, className, dir, value, ...props }, ref) => {
        const currentLength = typeof value === 'string' ? value.length : 0;

        return (
            <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {label}
                        {props.required && <span className="text-red-500 mr-1">*</span>}
                    </label>
                    {charCount && maxChars && (
                        <span className={`text-xs ${currentLength > maxChars ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
                            {currentLength}/{maxChars}
                        </span>
                    )}
                </div>
                <textarea
                    ref={ref}
                    dir={dir}
                    value={value}
                    className={`
                        w-full px-4 py-3
                        bg-white dark:bg-gray-800
                        border rounded-xl
                        text-gray-900 dark:text-white
                        placeholder:text-gray-400
                        transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-offset-0
                        resize-none
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${error
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                            : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-800'
                        }
                        ${className || ''}
                    `}
                    {...props}
                />
                {error && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </p>
                )}
                {hint && !error && (
                    <p className="text-sm text-gray-500">{hint}</p>
                )}
            </div>
        );
    }
);

FormTextarea.displayName = 'FormTextarea';

// ============================================
// SELECT
// ============================================

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    error?: string;
    options: Array<{ value: string; label: string; labelAr?: string }>;
    placeholder?: string;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
    ({ label, error, options, placeholder, className, ...props }, ref) => {
        return (
            <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                    {props.required && <span className="text-red-500 mr-1">*</span>}
                </label>
                <select
                    ref={ref}
                    className={`
                        w-full px-4 py-2.5
                        bg-white dark:bg-gray-800
                        border rounded-xl
                        text-gray-900 dark:text-white
                        transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-offset-0
                        disabled:opacity-50 disabled:cursor-not-allowed
                        cursor-pointer
                        ${error
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                            : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-800'
                        }
                        ${className || ''}
                    `}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

FormSelect.displayName = 'FormSelect';

// ============================================
// CHECKBOX / TOGGLE
// ============================================

interface FormToggleProps {
    label: string;
    description?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
}

export function FormToggle({ label, description, checked, onChange, disabled }: FormToggleProps) {
    return (
        <label className={`
            flex items-center justify-between p-4 
            bg-gray-50 dark:bg-gray-800/50 
            rounded-xl cursor-pointer
            hover:bg-gray-100 dark:hover:bg-gray-800
            transition-colors
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}>
            <div>
                <p className="font-medium text-gray-900 dark:text-white">{label}</p>
                {description && (
                    <p className="text-sm text-gray-500">{description}</p>
                )}
            </div>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => onChange?.(!checked)}
                className={`
                    relative w-12 h-6 rounded-full
                    transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    ${checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}
                `}
            >
                <span
                    className={`
                        absolute top-0.5 left-0.5
                        w-5 h-5 bg-white rounded-full
                        shadow-sm
                        transition-transform duration-200
                        ${checked ? 'translate-x-6' : 'translate-x-0'}
                    `}
                />
            </button>
        </label>
    );
}

// ============================================
// FORM SECTION
// ============================================

interface FormSectionProps {
    title: string;
    titleIcon?: React.ReactNode;
    description?: string;
    children: React.ReactNode;
    collapsible?: boolean;
    defaultOpen?: boolean;
    borderColor?: 'blue' | 'green' | 'purple' | 'orange' | 'gray';
    dir?: 'ltr' | 'rtl';
}

export function FormSection({
    title,
    titleIcon,
    description,
    children,
    borderColor = 'gray',
    dir,
}: FormSectionProps) {
    const borderColors = {
        blue: 'border-l-blue-500',
        green: 'border-l-green-500',
        purple: 'border-l-purple-500',
        orange: 'border-l-orange-500',
        gray: 'border-l-gray-300',
    };

    return (
        <div
            dir={dir}
            className={`
                bg-white dark:bg-gray-800 
                rounded-xl 
                shadow-sm 
                border border-gray-100 dark:border-gray-700
                border-l-4 ${borderColors[borderColor]}
                overflow-hidden
            `}
        >
            <div className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                    {titleIcon}
                    <div>
                        <h2 className="font-bold text-gray-900 dark:text-white">{title}</h2>
                        {description && (
                            <p className="text-sm text-gray-500">{description}</p>
                        )}
                    </div>
                </div>
                <div className="space-y-4">
                    {children}
                </div>
            </div>
        </div>
    );
}

// ============================================
// BUTTON
// ============================================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'success';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    icon?: React.ReactNode;
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    loading,
    icon,
    className,
    disabled,
    ...props
}: ButtonProps) {
    const variants = {
        primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25',
        secondary: 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200',
        danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/25',
        ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300',
        success: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/25',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2.5 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    return (
        <button
            className={`
                inline-flex items-center justify-center gap-2
                font-medium rounded-xl
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                disabled:opacity-50 disabled:cursor-not-allowed
                ${variants[variant]}
                ${sizes[size]}
                ${className || ''}
            `}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            ) : icon}
            {children}
        </button>
    );
}
