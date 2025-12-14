'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';
import { StopwatchState } from './types';
import { formatStopwatch } from './utils';

export function Stopwatch() {
  const [state, setState] = useState<StopwatchState>({
    milliseconds: 0,
    isRunning: false,
    laps: [],
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Stopwatch logic
  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = setInterval(() => {
        setState(prev => ({
          ...prev,
          milliseconds: prev.milliseconds + 10,
        }));
      }, 10);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isRunning]);

  // Başlat/Durdur
  const handleToggle = () => {
    setState(prev => ({
      ...prev,
      isRunning: !prev.isRunning,
    }));
  };

  // Sıfırla
  const handleReset = () => {
    setState({
      milliseconds: 0,
      isRunning: false,
      laps: [],
    });
  };

  // Tur kaydet
  const handleLap = () => {
    if (state.isRunning) {
      setState(prev => ({
        ...prev,
        laps: [...prev.laps, prev.milliseconds],
      }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* Stopwatch Display */}
      <div className="mb-6 sm:mb-8">
        <p className="mb-3 text-xs text-center sm:text-sm text-secondary-500 dark:text-secondary-400 sm:mb-4">
          Kronometre
        </p>
        <div className="relative">
          <div className="font-mono text-4xl font-bold tracking-wider sm:text-6xl md:text-7xl lg:text-8xl text-primary-600 dark:text-primary-400">
            {formatStopwatch(state.milliseconds)}
          </div>

          {/* Glow Effect */}
          {state.isRunning && (
            <div className="absolute inset-0 font-mono text-4xl font-bold tracking-wider sm:text-6xl md:text-7xl lg:text-8xl text-primary-600 dark:text-primary-400 blur-xl opacity-30">
              {formatStopwatch(state.milliseconds)}
            </div>
          )}
        </div>
      </div>

      {/* Kontroller */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={handleToggle}
          className="flex items-center justify-center text-white transition-colors rounded-full shadow-lg w-14 h-14 sm:w-16 sm:h-16 bg-primary-500 hover:bg-primary-600 hover:shadow-xl"
        >
          {state.isRunning ? (
            <Pause className="w-6 h-6 sm:w-7 sm:h-7" />
          ) : (
            <Play className="w-6 h-6 ml-1 sm:w-7 sm:h-7" />
          )}
        </button>

        <button
          onClick={handleLap}
          disabled={!state.isRunning}
          className="flex items-center justify-center text-white transition-colors rounded-full shadow-lg w-14 h-14 sm:w-16 sm:h-16 bg-accent-500 hover:bg-accent-600 disabled:bg-gray-300 dark:disabled:bg-secondary-700 disabled:cursor-not-allowed hover:shadow-xl"
        >
          <Flag className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={handleReset}
          className="flex items-center justify-center transition-colors rounded-full shadow-lg w-14 h-14 sm:w-16 sm:h-16 bg-secondary-200 hover:bg-secondary-300 dark:bg-secondary-700 dark:hover:bg-secondary-600 text-secondary-700 dark:text-secondary-300 hover:shadow-xl"
        >
          <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
      {/* Tur Listesi */}
      {state.laps.length > 0 && (
        <div className="w-full max-w-md">
          <h4 className="flex items-center gap-2 mb-3 text-sm font-semibold text-secondary-700 dark:text-secondary-300">
            <Flag className="w-4 h-4" />
            Turlar ({state.laps.length})
          </h4>
          <div className="overflow-y-auto border border-gray-200 bg-gray-50 dark:bg-secondary-800 rounded-xl dark:border-secondary-700 max-h-48">
            {state.laps
              .map((lap, index) => {
                const lapTime = index === 0 ? lap : lap - state.laps[index - 1];
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between px-4 py-3 transition-colors border-b border-gray-200 dark:border-secondary-700 last:border-b-0 hover:bg-gray-100 dark:hover:bg-secondary-700/50"
                  >
                    <span className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                      Tur {state.laps.length - index}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm text-secondary-500 dark:text-secondary-500">
                        +{formatStopwatch(lapTime)}
                      </span>
                      <span className="font-mono text-base font-bold text-secondary-900 dark:text-white">
                        {formatStopwatch(lap)}
                      </span>
                    </div>
                  </div>
                );
              })
              .reverse()}
          </div>
        </div>
      )}
      {state.laps.length === 0 && (
        <p className="text-sm text-center text-secondary-400 dark:text-secondary-500">
          Kronometre çalışırken tur kaydetmek için bayrak butonuna basın
        </p>
      )}
    </div>
  );
}
