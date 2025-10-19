'use client';

import dynamic from 'next/dynamic';
import { Sparkles } from 'lucide-react';

interface DemoWrapperProps {
  projectId: string;
}

// Proje ID'sinden component'e map
const projectComponents: Record<string, any> = {
  'project-001': () => import('@/components/projects/Project001'),
  // Diğer projeler buraya eklenecek
};

export function DemoWrapper({ projectId }: DemoWrapperProps) {
  // Component loader'ı al
  const componentLoader = projectComponents[projectId];

  // Eğer component yoksa, boş döndür
  if (!componentLoader) {
    return (
      <div className="w-full p-8 text-center rounded-xl border-2 border-dashed border-gray-300 dark:border-secondary-700 bg-gray-50 dark:bg-secondary-800/50">
        <p className="text-secondary-600 dark:text-secondary-400">
          🚧 Bu proje için canlı demo henüz hazır değil. Yakında eklenecek!
        </p>
      </div>
    );
  }

  // Dinamik olarak component'i yükle
  const DemoComponent = dynamic(componentLoader, {
    loading: () => (
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-secondary-800 dark:to-secondary-900 rounded-xl border border-gray-200 dark:border-secondary-700">
        <div className="relative">
          {/* Animated Spinner */}
          <div className="w-16 h-16 border-4 border-primary-200 dark:border-primary-900 border-t-primary-500 dark:border-t-primary-400 rounded-full animate-spin" />
          <Sparkles className="w-6 h-6 text-primary-500 dark:text-primary-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="mt-6 text-secondary-600 dark:text-secondary-400 font-medium">
          Canlı demo yükleniyor...
        </p>
      </div>
    ),
    ssr: false,
  });

  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-primary-200 dark:border-primary-800 bg-gradient-to-br from-primary-50/50 via-white to-accent-50/50 dark:from-secondary-800 dark:via-secondary-900 dark:to-secondary-800 p-6 sm:p-8">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-200/20 dark:bg-accent-900/10 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
            <h2 className="text-xl sm:text-2xl font-bold text-secondary-900 dark:text-white">
              🎮 Canlı Demo
            </h2>
          </div>
        </div>

        {/* Info Badge */}
        <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm border border-primary-200 dark:border-primary-800 text-xs font-medium text-secondary-600 dark:text-secondary-400">
          <Sparkles className="w-3 h-3 text-primary-500" />
          İnteraktif
        </span>
      </div>

      {/* Demo Component Container */}
      <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-xl border border-gray-200 dark:border-secondary-700 p-4 sm:p-6">
        <DemoComponent />
      </div>

      {/* Alt Bilgi */}
      <p className="mt-4 text-sm text-secondary-500 dark:text-secondary-400 text-center">
        💡 Demo tamamen fonksiyonel - hemen deneyin!
      </p>
    </div>
  );
}
