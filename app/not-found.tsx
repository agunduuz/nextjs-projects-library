'use client';

import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Sayfa Bulunamadı',
  description: 'Aradığınız sayfa mevcut değil.',
};
export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-secondary-900">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animasyonu */}
        <div className="relative mb-8">
          <h1 className="text-[150px] sm:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary-300 via-accent-300 to-primary-200 dark:from-primary-600 dark:via-accent-600 dark:to-primary-500 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-16 h-16 sm:w-24 sm:h-24 text-secondary-300 dark:text-secondary-700 animate-pulse" />
          </div>
        </div>

        {/* Başlık */}
        <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900 dark:text-white mb-4">
          Sayfa Bulunamadı
        </h2>

        {/* Açıklama */}
        <p className="text-base sm:text-lg text-secondary-600 dark:text-secondary-400 mb-8 max-w-md mx-auto">
          Aradığınız sayfa mevcut değil, taşınmış veya silinmiş olabilir.
        </p>

        {/* Aksiyonlar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Ana Sayfaya Dön */}
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary-500 dark:bg-primary-600 text-white hover:bg-primary-600 dark:hover:bg-primary-700 transition-colors font-medium group"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Ana Sayfaya Dön
          </Link>

          {/* Geri Git */}
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-300 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-gray-50 dark:hover:bg-secondary-700 transition-colors font-medium group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Geri Git
          </button>
        </div>

        {/* Popüler Linkler */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-secondary-700">
          <p className="text-sm text-secondary-500 dark:text-secondary-400 mb-4">
            Veya bu sayfalara göz atabilirsiniz:
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/"
              className="text-sm px-4 py-2 rounded-lg bg-gray-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-gray-200 dark:hover:bg-secondary-700 transition-colors"
            >
              Tüm Projeler
            </Link>
            <Link
              href="/#projeler"
              className="text-sm px-4 py-2 rounded-lg bg-gray-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-gray-200 dark:hover:bg-secondary-700 transition-colors"
            >
              Projeler
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
