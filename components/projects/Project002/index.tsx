'use client';

import { Calculator } from './Calculator';

export default function Project002() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl sm:text-3xl font-bold text-secondary-900 dark:text-white mb-2 flex items-center justify-center gap-2">
          <span className="text-3xl">🧮</span>
          <span>Calculator</span>
        </h3>
        <p className="text-sm sm:text-base text-secondary-500 dark:text-secondary-400">
          Temel matematiksel işlemler
        </p>
      </div>

      <Calculator />

      {/* Kullanım İpuçları */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-secondary-800 rounded-lg border border-gray-200 dark:border-secondary-700">
        <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
          💡 <strong>İpucu:</strong> Klavyenizi kullanabilirsiniz! (0-9, +, -,
          *, /, Enter, Backspace, Escape)
        </p>
      </div>
    </div>
  );
}
