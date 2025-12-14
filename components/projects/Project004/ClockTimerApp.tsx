'use client';

import { useState } from 'react';
import { Clock, Timer as TimerIcon, CircleDot } from 'lucide-react';
import { TabType } from './types';
import { DigitalClock } from './DigitalClock';
import { Timer } from './Timer';
import { Stopwatch } from './Stopwatch';

export function ClockTimerApp() {
  const [activeTab, setActiveTab] = useState<TabType>('clock');

  const tabs = [
    { id: 'clock' as TabType, label: 'Saat', icon: Clock },
    { id: 'timer' as TabType, label: 'Zamanlayıcı', icon: TimerIcon },
    { id: 'stopwatch' as TabType, label: 'Kronometre', icon: CircleDot },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex items-center justify-center gap-2 p-1 mb-8 bg-gray-100 dark:bg-secondary-800 rounded-xl">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                isActive
                  ? 'bg-white dark:bg-secondary-700 text-primary-600 dark:text-primary-400 shadow-md'
                  : 'text-secondary-600 dark:text-secondary-400 hover:bg-gray-50 dark:hover:bg-secondary-700/50'
              }`}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden text-sm sm:inline sm:text-base">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-lg border border-gray-200 dark:border-secondary-700 p-4 sm:p-6 md:p-8 min-h-[400px]">
        {activeTab === 'clock' && <DigitalClock />}
        {activeTab === 'timer' && <Timer />}
        {activeTab === 'stopwatch' && <Stopwatch />}
      </div>

      {/* Klavye Kısayolları */}
      <div className="p-4 mt-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-secondary-800 dark:border-secondary-700">
        <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
          <strong>💡 İpucu:</strong>
          {activeTab === 'timer' &&
            ' Input alanlarını klavyeden doldurabilirsiniz'}
          {activeTab === 'stopwatch' &&
            ' Space tuşu ile başlat/durdur, L tuşu ile tur kaydet'}
          {activeTab === 'clock' && ' Gerçek zamanlı saat gösterilmektedir'}
        </p>
      </div>
    </div>
  );
}
