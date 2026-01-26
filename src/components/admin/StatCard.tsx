"use client";

import { ReactNode } from 'react';
import {
    TrendingUp,
    TrendingDown,
    Package,
    ShoppingCart,
    Tag,
    Search,
    DollarSign,
    AlertTriangle
} from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon?: 'products' | 'orders' | 'categories' | 'seo' | 'revenue' | 'alert' | 'custom';
    customIcon?: ReactNode;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'indigo' | 'pink';
    size?: 'default' | 'large';
}

const iconMap = {
    products: Package,
    orders: ShoppingCart,
    categories: Tag,
    seo: Search,
    revenue: DollarSign,
    alert: AlertTriangle,
};

const colorClasses = {
    blue: {
        bg: 'bg-blue-500/10',
        icon: 'text-blue-500',
        border: 'border-blue-500/20',
        gradient: 'from-blue-500 to-blue-600',
    },
    green: {
        bg: 'bg-green-500/10',
        icon: 'text-green-500',
        border: 'border-green-500/20',
        gradient: 'from-green-500 to-green-600',
    },
    purple: {
        bg: 'bg-purple-500/10',
        icon: 'text-purple-500',
        border: 'border-purple-500/20',
        gradient: 'from-purple-500 to-purple-600',
    },
    orange: {
        bg: 'bg-orange-500/10',
        icon: 'text-orange-500',
        border: 'border-orange-500/20',
        gradient: 'from-orange-500 to-orange-600',
    },
    red: {
        bg: 'bg-red-500/10',
        icon: 'text-red-500',
        border: 'border-red-500/20',
        gradient: 'from-red-500 to-red-600',
    },
    indigo: {
        bg: 'bg-indigo-500/10',
        icon: 'text-indigo-500',
        border: 'border-indigo-500/20',
        gradient: 'from-indigo-500 to-indigo-600',
    },
    pink: {
        bg: 'bg-pink-500/10',
        icon: 'text-pink-500',
        border: 'border-pink-500/20',
        gradient: 'from-pink-500 to-pink-600',
    },
};

export default function StatCard({
    title,
    value,
    subtitle,
    icon = 'products',
    customIcon,
    trend,
    color = 'blue',
    size = 'default',
}: StatCardProps) {
    const IconComponent = icon !== 'custom' ? iconMap[icon] : null;
    const colors = colorClasses[color];

    return (
        <div className={`
            relative overflow-hidden
            bg-white dark:bg-gray-800 
            rounded-2xl p-6 
            shadow-sm hover:shadow-lg
            border border-gray-100 dark:border-gray-700
            transition-all duration-300 ease-out
            hover:-translate-y-1
            group
        `}>
            {/* Background Gradient Decoration */}
            <div className={`
                absolute -right-8 -top-8 w-32 h-32 
                bg-gradient-to-br ${colors.gradient} 
                rounded-full opacity-10 
                group-hover:opacity-20 
                transition-opacity duration-300
            `} />

            <div className="relative flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        {title}
                    </p>
                    <h3 className={`
                        font-bold text-gray-900 dark:text-white
                        ${size === 'large' ? 'text-4xl' : 'text-2xl'}
                    `}>
                        {value}
                    </h3>

                    {subtitle && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            {subtitle}
                        </p>
                    )}

                    {trend && (
                        <div className={`
                            flex items-center gap-1 mt-2 text-sm font-medium
                            ${trend.isPositive ? 'text-green-600' : 'text-red-500'}
                        `}>
                            {trend.isPositive ? (
                                <TrendingUp className="w-4 h-4" />
                            ) : (
                                <TrendingDown className="w-4 h-4" />
                            )}
                            <span>{trend.value}%</span>
                            <span className="text-gray-400 font-normal">vs last month</span>
                        </div>
                    )}
                </div>

                {/* Icon */}
                <div className={`
                    w-12 h-12 rounded-xl 
                    ${colors.bg} ${colors.border}
                    border
                    flex items-center justify-center
                    transition-transform duration-300
                    group-hover:scale-110
                `}>
                    {customIcon || (IconComponent && (
                        <IconComponent className={`w-6 h-6 ${colors.icon}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Mini Stat Card for compact displays
export function MiniStatCard({
    label,
    value,
    color = 'blue',
}: {
    label: string;
    value: string | number;
    color?: keyof typeof colorClasses;
}) {
    const colors = colorClasses[color];

    return (
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
            <span className={`font-bold ${colors.icon}`}>{value}</span>
        </div>
    );
}

// SEO Score Card with circular progress
export function SEOScoreCard({ score }: { score: number }) {
    const circumference = 2 * Math.PI * 36;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    const getScoreColor = () => {
        if (score >= 80) return { stroke: '#22c55e', text: 'text-green-500', bg: 'bg-green-500/10' };
        if (score >= 60) return { stroke: '#f59e0b', text: 'text-yellow-500', bg: 'bg-yellow-500/10' };
        return { stroke: '#ef4444', text: 'text-red-500', bg: 'bg-red-500/10' };
    };

    const colors = getScoreColor();

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">SEO Score</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${colors.bg} ${colors.text}`}>
                    {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Work'}
                </span>
            </div>

            <div className="flex items-center justify-center">
                <div className="relative">
                    <svg className="w-24 h-24 -rotate-90">
                        <circle
                            cx="48"
                            cy="48"
                            r="36"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            className="text-gray-200 dark:text-gray-700"
                        />
                        <circle
                            cx="48"
                            cy="48"
                            r="36"
                            stroke={colors.stroke}
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-500 ease-out"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-2xl font-bold ${colors.text}`}>{score}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
