'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { TimerState } from './types';
import { formatTime } from './utils';

export function Timer() {
  const [state, setState] = useState<TimerState>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    isRunning: false,
    totalSeconds: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Countdown
  useEffect(() => {
    if (state.isRunning && state.totalSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setState(prev => {
          if (prev.totalSeconds <= 1) {
            // Timer bitti - ses çal (opsiyonel)
            if (typeof Audio !== 'undefined') {
              const audio = new Audio('/sounds/beep.mp3'); // Ses dosyası eklenebilir
              audio.play().catch(() => {}); // Ses çalmazsa hata verme
            }
            return { ...prev, totalSeconds: 0, isRunning: false };
          }
          return { ...prev, totalSeconds: prev.totalSeconds - 1 };
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isRunning, state.totalSeconds]);

  // Input değişimi
  const handleInputChange = (
    field: 'hours' | 'minutes' | 'seconds',
    value: string
  ) => {
    const num = parseInt(value) || 0;
    const clampedValue = Math.max(
      0,
      Math.min(field === 'hours' ? 23 : 59, num)
    );

    setState(prev => ({
      ...prev,
      [field]: clampedValue,
    }));
  };

  // Başlat/Durdur
  const handleToggle = () => {
    if (!state.isRunning && state.totalSeconds === 0) {
      // İlk başlatma - toplam saniyeyi hesapla
      const total = state.hours * 3600 + state.minutes * 60 + state.seconds;
      if (total === 0) return; // Süre girilmemişse başlatma

      setState(prev => ({
        ...prev,
        totalSeconds: total,
        isRunning: true,
      }));
    } else {
      // Durdur/Devam et
      setState(prev => ({
        ...prev,
        isRunning: !prev.isRunning,
      }));
    }
  };

  // Sıfırla
  const handleReset = () => {
    setState({
      hours: 0,
      minutes: 0,
      seconds: 0,
      isRunning: false,
      totalSeconds: 0,
    });
  };

  const isActive = state.totalSeconds > 0;

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {!isActive ? (
        // Input Modu
        <div className="mb-6 sm:mb-8">
          <p className="mb-3 text-xs text-center sm:text-sm text-secondary-500 dark:text-secondary-400 sm:mb-4">
            Süre girin
          </p>
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
            {/* Saat */}
            <div className="flex flex-col items-center">
              <input
                type="number"
                min="0"
                max="23"
                value={state.hours}
                onChange={e => handleInputChange('hours', e.target.value)}
                className="w-12 h-12 font-mono text-xl font-bold text-center bg-white border-2 border-gray-300 rounded-lg sm:w-16 sm:h-16 md:w-20 md:h-20 sm:text-2xl md:text-3xl lg:text-4xl dark:border-secondary-600 dark:bg-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <span className="text-[10px] sm:text-xs text-secondary-500 dark:text-secondary-400 mt-1 sm:mt-2">
                Saat
              </span>
            </div>

            <span className="text-2xl font-bold sm:text-3xl md:text-4xl text-secondary-400 dark:text-secondary-500">
              :
            </span>

            {/* Dakika */}
            <div className="flex flex-col items-center">
              <input
                type="number"
                min="0"
                max="59"
                value={state.minutes}
                onChange={e => handleInputChange('minutes', e.target.value)}
                className="w-12 h-12 font-mono text-xl font-bold text-center bg-white border-2 border-gray-300 rounded-lg sm:w-16 sm:h-16 md:w-20 md:h-20 sm:text-2xl md:text-3xl lg:text-4xl dark:border-secondary-600 dark:bg-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <span className="text-[10px] sm:text-xs text-secondary-500 dark:text-secondary-400 mt-1 sm:mt-2">
                Dakika
              </span>
            </div>

            <span className="text-2xl font-bold sm:text-3xl md:text-4xl text-secondary-400 dark:text-secondary-500">
              :
            </span>

            {/* Saniye */}
            <div className="flex flex-col items-center">
              <input
                type="number"
                min="0"
                max="59"
                value={state.seconds}
                onChange={e => handleInputChange('seconds', e.target.value)}
                className="w-12 h-12 font-mono text-xl font-bold text-center bg-white border-2 border-gray-300 rounded-lg sm:w-16 sm:h-16 md:w-20 md:h-20 sm:text-2xl md:text-3xl lg:text-4xl dark:border-secondary-600 dark:bg-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <span className="text-[10px] sm:text-xs text-secondary-500 dark:text-secondary-400 mt-1 sm:mt-2">
                Saniye
              </span>
            </div>
          </div>
        </div>
      ) : (
        // Countdown Display
        <div className="mb-6 sm:mb-8">
          <p className="mb-3 text-xs text-center sm:text-sm text-secondary-500 dark:text-secondary-400 sm:mb-4">
            {state.totalSeconds === 0 ? '⏰ Süre doldu!' : 'Kalan süre'}
          </p>
          <div className="font-mono text-4xl font-bold tracking-wider sm:text-6xl md:text-7xl lg:text-8xl text-primary-600 dark:text-primary-400">
            {formatTime(state.totalSeconds)}
          </div>
        </div>
      )}
      {/* Kontroller */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleToggle}
          disabled={
            !isActive &&
            state.hours === 0 &&
            state.minutes === 0 &&
            state.seconds === 0
          }
          className="flex items-center justify-center text-white transition-colors rounded-full shadow-lg w-14 h-14 sm:w-16 sm:h-16 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 dark:disabled:bg-secondary-700 disabled:cursor-not-allowed hover:shadow-xl"
        >
          {state.isRunning ? (
            <Pause className="w-6 h-6 sm:w-7 sm:h-7" />
          ) : (
            <Play className="w-6 h-6 ml-1 sm:w-7 sm:h-7" />
          )}
        </button>

        <button
          onClick={handleReset}
          className="flex items-center justify-center transition-colors rounded-full shadow-lg w-14 h-14 sm:w-16 sm:h-16 bg-secondary-200 hover:bg-secondary-300 dark:bg-secondary-700 dark:hover:bg-secondary-600 text-secondary-700 dark:text-secondary-300 hover:shadow-xl"
        >
          <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
}
