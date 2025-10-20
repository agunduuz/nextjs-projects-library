'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Sidebar } from './Sidebar';

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Sidebar açıkken body scroll'u engelle
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup: component unmount olduğunda scroll'u geri aç
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // ESC tuşuyla kapat
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      {/* Floating Action Button (FAB) - Sadece mobilde görünür */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-br from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 dark:from-primary-600 dark:to-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group animate-pulse hover:animate-none"
        aria-label="Menüyü aç"
      >
        <Menu className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Overlay (Karartma) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer (Soldan Kayar) */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white dark:bg-secondary-800 z-50 shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Mobil navigasyon menüsü"
        role="dialog"
        aria-modal="true"
      >
        {/* Header with Close Button */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white dark:bg-secondary-800 border-b border-gray-200 dark:border-secondary-700">
          <h2 className="text-lg font-bold text-secondary-900 dark:text-white">
            Projeler
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-secondary-700 rounded-lg transition-colors"
            aria-label="Menüyü kapat"
          >
            <X className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="p-4">
          <Sidebar />
        </div>
      </div>
    </>
  );
}
