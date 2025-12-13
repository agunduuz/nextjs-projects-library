'use client';

import dynamic from 'next/dynamic';
import { Sparkles } from 'lucide-react';
import { ComponentType } from 'react';

interface DemoWrapperProps {
  projectId: string;
}

// Proje ID'sinden component'e map
const projectComponents: Record<
  string,
  () => Promise<{ default: ComponentType }>
> = {
  'project-001': () => import('@/components/projects/Project001'),
  'project-002': () => import('@/components/projects/Project002'),
  'project-003': () => import('@/components/projects/Project003'),
};

export function DemoWrapper({ projectId }: DemoWrapperProps) {
  console.log('🔍 ProjectId:', projectId); // ✅ EKLE
  console.log(
    '🔍 ComponentLoader:',
    projectComponents[projectId] ? 'VAR ✅' : 'YOK ❌'
  );
  const componentLoader = projectComponents[projectId];

  if (!componentLoader) {
    return (
      <div className="w-full p-8 text-center border-2 border-gray-300 border-dashed rounded-xl dark:border-secondary-700 bg-gray-50 dark:bg-secondary-800/50">
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
          <div className="w-16 h-16 border-4 rounded-full border-primary-200 dark:border-primary-900 border-t-primary-500 dark:border-t-primary-400 animate-spin" />
          <Sparkles className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 text-primary-500 dark:text-primary-400 top-1/2 left-1/2" />
        </div>
        <p className="mt-6 font-medium text-secondary-600 dark:text-secondary-400">
          Canlı demo yükleniyor...
        </p>
      </div>
    ),
    ssr: false,
  });

  return (
    <div className="relative p-6 overflow-hidden border-2 rounded-2xl border-primary-200 dark:border-primary-800 bg-gradient-to-br from-primary-50/50 via-white to-accent-50/50 dark:from-secondary-800 dark:via-secondary-900 dark:to-secondary-800 sm:p-8">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-200/20 dark:bg-primary-900/10 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent-200/20 dark:bg-accent-900/10 blur-3xl -z-10" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg animate-pulse shadow-green-500/50" />
            <h2 className="text-xl font-bold sm:text-2xl text-secondary-900 dark:text-white">
              🎮 Canlı Demo
            </h2>
          </div>
        </div>

        {/* Info Badge */}
        <span className="items-center hidden gap-2 px-3 py-1 text-xs font-medium border rounded-full sm:inline-flex bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm border-primary-200 dark:border-primary-800 text-secondary-600 dark:text-secondary-400">
          <Sparkles className="w-3 h-3 text-primary-500" />
          İnteraktif
        </span>
      </div>

      {/* Demo Component Container */}
      <div className="p-4 bg-white border border-gray-200 shadow-xl dark:bg-secondary-800 rounded-xl dark:border-secondary-700 sm:p-6">
        <DemoComponent />
      </div>

      {/* Alt Bilgi */}
      <p className="mt-4 text-sm text-center text-secondary-500 dark:text-secondary-400">
        💡 Demo tamamen fonksiyonel - hemen deneyin!
      </p>
    </div>
  );
}
