'use client';

import { useState, useEffect } from 'react';
import { formatClock, formatDate } from './utils';

export function DigitalClock() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // İlk mount'ta zamanı set et
    setCurrentTime(new Date());
    setIsMounted(true);

    // Interval başlat
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted || !currentTime) {
    return (
      <div className="flex flex-col items-center justify-center py-4 sm:py-8">
        <div className="font-mono text-4xl font-bold tracking-wider sm:text-6xl md:text-7xl lg:text-8xl text-primary-600 dark:text-primary-400 animate-pulse">
          --:--:--
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-4 sm:py-8">
      {/* Tarih */}
      <p className="mb-2 text-xs sm:text-sm text-secondary-500 dark:text-secondary-400 sm:mb-4">
        {formatDate(currentTime)}
      </p>

      {/* Dijital Saat - Responsive */}
      <div className="relative">
        <div className="font-mono text-4xl font-bold tracking-wider sm:text-6xl md:text-7xl lg:text-8xl text-primary-600 dark:text-primary-400">
          {formatClock(currentTime)}
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 font-mono text-4xl font-bold tracking-wider sm:text-6xl md:text-7xl lg:text-8xl text-primary-600 dark:text-primary-400 blur-xl opacity-30">
          {formatClock(currentTime)}
        </div>
      </div>

      {/* Timezone */}
      <p className="mt-2 text-xs sm:text-sm text-secondary-400 dark:text-secondary-500 sm:mt-4">
        {Intl.DateTimeFormat().resolvedOptions().timeZone}
      </p>
    </div>
  );
}
