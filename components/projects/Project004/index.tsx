'use client';

import { ClockTimerApp } from './ClockTimerApp';

export default function Project004() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header - Kompakt */}
      <div className="mb-4 text-center sm:mb-6">
        <h3 className="flex items-center justify-center gap-2 mb-1 text-xl font-bold sm:mb-2 sm:text-2xl md:text-3xl text-secondary-900 dark:text-white">
          <span className="text-2xl sm:text-3xl">⏰</span>
          <span>Clock & Timer App</span>
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-secondary-500 dark:text-secondary-400">
          Dijital saat, zamanlayıcı ve kronometre
        </p>
      </div>

      <ClockTimerApp />
    </div>
  );
}
