import React from "react";

export default function OrdersTableSkeleton({ rows = 5, columns = 7 }) {
  return (
    <div className="p-4 w-full animate-pulse">
      <div className="w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-7 bg-gray-100 dark:bg-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-300">
          {Array.from({ length: columns }).map((_, i) => (
            <div
              key={i}
              className="p-3 border-b border-gray-200 dark:border-gray-700"
            >
              <div className="h-4 w-1/3 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <div
              key={rowIdx}
              className="grid grid-cols-7 items-center px-3 py-3 bg-white dark:bg-gray-900"
            >
              {Array.from({ length: columns }).map((_, colIdx) => (
                <div key={colIdx} className="flex items-center gap-2 px-2">
                  <div className="h-10  w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
