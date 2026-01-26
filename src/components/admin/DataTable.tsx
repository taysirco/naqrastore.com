"use client";

import { useState, useMemo } from 'react';
import {
    ChevronUp,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Search,
    Filter,
    MoreVertical,
    Check,
    X
} from 'lucide-react';

// ============================================
// TYPES
// ============================================

interface Column<T> {
    key: string;
    label: string;
    labelAr?: string;
    sortable?: boolean;
    width?: string;
    align?: 'left' | 'center' | 'right';
    render?: (item: T, index: number) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    keyField: keyof T;
    loading?: boolean;
    selectable?: boolean;
    selectedIds?: string[];
    onSelectionChange?: (ids: string[]) => void;
    onRowClick?: (item: T) => void;
    searchable?: boolean;
    searchPlaceholder?: string;
    emptyMessage?: string;
    emptyMessageAr?: string;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        onPageChange: (page: number) => void;
    };
    actions?: (item: T) => React.ReactNode;
}

// ============================================
// DATA TABLE
// ============================================

export default function DataTable<T extends object>({
    data,
    columns,
    keyField,
    loading,
    selectable,
    selectedIds = [],
    onSelectionChange,
    onRowClick,
    searchable,
    searchPlaceholder = 'Search...',
    emptyMessage = 'No data found',
    emptyMessageAr = 'لا توجد بيانات',
    pagination,
    actions,
}: DataTableProps<T>) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Handle sorting
    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Filtered and sorted data
    const processedData = useMemo(() => {
        let result = [...data];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(item => {
                return columns.some(col => {
                    const value = (item as Record<string, unknown>)[col.key];
                    if (typeof value === 'string') {
                        return value.toLowerCase().includes(query);
                    }
                    if (typeof value === 'number') {
                        return value.toString().includes(query);
                    }
                    return false;
                });
            });
        }

        // Sort
        if (sortField) {
            result.sort((a, b) => {
                const aVal = (a as Record<string, unknown>)[sortField];
                const bVal = (b as Record<string, unknown>)[sortField];

                if (typeof aVal === 'string' && typeof bVal === 'string') {
                    return sortDirection === 'asc'
                        ? aVal.localeCompare(bVal)
                        : bVal.localeCompare(aVal);
                }

                if (typeof aVal === 'number' && typeof bVal === 'number') {
                    return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
                }

                return 0;
            });
        }

        return result;
    }, [data, searchQuery, sortField, sortDirection, columns]);

    // Selection handlers
    const allSelected = processedData.length > 0 &&
        processedData.every(item => selectedIds.includes(String(item[keyField])));

    const handleSelectAll = () => {
        if (allSelected) {
            onSelectionChange?.([]);
        } else {
            onSelectionChange?.(processedData.map(item => String(item[keyField])));
        }
    };

    const handleSelectRow = (id: string) => {
        if (selectedIds.includes(id)) {
            onSelectionChange?.(selectedIds.filter(i => i !== id));
        } else {
            onSelectionChange?.([...selectedIds, id]);
        }
    };

    // Pagination
    const totalPages = pagination ? Math.ceil(pagination.total / pagination.limit) : 1;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            {/* Toolbar */}
            {(searchable || selectedIds.length > 0) && (
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between gap-4">
                    {/* Search */}
                    {searchable && (
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={searchPlaceholder}
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}

                    {/* Selection info */}
                    {selectedIds.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">{selectedIds.length} selected</span>
                            <button
                                onClick={() => onSelectionChange?.([])}
                                className="text-blue-600 hover:underline"
                            >
                                Clear
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                        <tr>
                            {/* Checkbox column */}
                            {selectable && (
                                <th className="w-12 px-4 py-3">
                                    <button
                                        onClick={handleSelectAll}
                                        className={`
                                            w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                                            ${allSelected
                                                ? 'bg-blue-600 border-blue-600 text-white'
                                                : 'border-gray-300 dark:border-gray-600 hover:border-blue-500'
                                            }
                                        `}
                                    >
                                        {allSelected && <Check className="w-3 h-3" />}
                                    </button>
                                </th>
                            )}

                            {/* Data columns */}
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    style={{ width: col.width }}
                                    className={`
                                        px-4 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider
                                        ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'}
                                        ${col.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors' : ''}
                                    `}
                                    onClick={() => col.sortable && handleSort(col.key)}
                                >
                                    <span className="flex items-center gap-1">
                                        {col.label}
                                        {col.sortable && sortField === col.key && (
                                            sortDirection === 'asc'
                                                ? <ChevronUp className="w-4 h-4" />
                                                : <ChevronDown className="w-4 h-4" />
                                        )}
                                    </span>
                                </th>
                            ))}

                            {/* Actions column */}
                            {actions && (
                                <th className="w-20 px-4 py-3 text-right">
                                    <span className="sr-only">Actions</span>
                                </th>
                            )}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {loading ? (
                            // Loading skeleton
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i}>
                                    {selectable && (
                                        <td className="px-4 py-4">
                                            <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                        </td>
                                    )}
                                    {columns.map((col) => (
                                        <td key={col.key} className="px-4 py-4">
                                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                        </td>
                                    ))}
                                    {actions && (
                                        <td className="px-4 py-4">
                                            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ml-auto" />
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : processedData.length === 0 ? (
                            // Empty state
                            <tr>
                                <td
                                    colSpan={columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)}
                                    className="px-4 py-12 text-center"
                                >
                                    <div className="text-gray-400 dark:text-gray-500">
                                        <Filter className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                        <p className="font-medium">{emptyMessageAr}</p>
                                        <p className="text-sm">{emptyMessage}</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            // Data rows
                            processedData.map((item, index) => {
                                const id = String(item[keyField]);
                                const isSelected = selectedIds.includes(id);

                                return (
                                    <tr
                                        key={id}
                                        className={`
                                            transition-colors
                                            ${isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}
                                            ${onRowClick ? 'cursor-pointer' : ''}
                                        `}
                                        onClick={() => onRowClick?.(item)}
                                    >
                                        {selectable && (
                                            <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                                                <button
                                                    onClick={() => handleSelectRow(id)}
                                                    className={`
                                                        w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                                                        ${isSelected
                                                            ? 'bg-blue-600 border-blue-600 text-white'
                                                            : 'border-gray-300 dark:border-gray-600 hover:border-blue-500'
                                                        }
                                                    `}
                                                >
                                                    {isSelected && <Check className="w-3 h-3" />}
                                                </button>
                                            </td>
                                        )}

                                        {columns.map((col) => (
                                            <td
                                                key={col.key}
                                                className={`
                                                    px-4 py-4 text-sm text-gray-900 dark:text-gray-100
                                                    ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'}
                                                `}
                                            >
                                                {col.render
                                                    ? col.render(item, index)
                                                    : String((item as Record<string, unknown>)[col.key] ?? '-')
                                                }
                                            </td>
                                        ))}

                                        {actions && (
                                            <td className="px-4 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                                                {actions(item)}
                                            </td>
                                        )}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && totalPages > 1 && (
                <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                        {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                        {pagination.total} results
                    </p>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => pagination.onPageChange(pagination.page - 1)}
                            disabled={pagination.page === 1}
                            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                            let pageNum: number;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (pagination.page <= 3) {
                                pageNum = i + 1;
                            } else if (pagination.page >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = pagination.page - 2 + i;
                            }

                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => pagination.onPageChange(pageNum)}
                                    className={`
                                        w-10 h-10 rounded-lg font-medium text-sm transition-colors
                                        ${pagination.page === pageNum
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }
                                    `}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        <button
                            onClick={() => pagination.onPageChange(pagination.page + 1)}
                            disabled={pagination.page === totalPages}
                            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// ============================================
// STATUS BADGE
// ============================================

interface StatusBadgeProps {
    status: string;
    type?: 'success' | 'warning' | 'error' | 'info' | 'default';
}

export function StatusBadge({ status, type = 'default' }: StatusBadgeProps) {
    const colors = {
        success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        default: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    };

    return (
        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${colors[type]}`}>
            {status}
        </span>
    );
}

// ============================================
// ACTION MENU
// ============================================

interface ActionMenuItem {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    variant?: 'default' | 'danger';
    disabled?: boolean;
}

export function ActionMenu({ items }: { items: ActionMenuItem[] }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
                <MoreVertical className="w-5 h-5" />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-1 z-20">
                        {items.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setIsOpen(false);
                                    item.onClick();
                                }}
                                disabled={item.disabled}
                                className={`
                                    w-full px-4 py-2 text-sm text-left flex items-center gap-2 transition-colors
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                    ${item.variant === 'danger'
                                        ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }
                                `}
                            >
                                {item.icon}
                                {item.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
