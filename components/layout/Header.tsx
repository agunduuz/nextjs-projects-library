'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun, Github } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hydration hatası önleme
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-secondary-700 bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
              100 Günlük{' '}
              <span className="text-primary-500 dark:text-primary-400">
                Next.js
              </span>{' '}
              Projesi
            </h1>
          </Link>

          {/* Actions */}
          <nav className="flex items-center gap-4">
            {/* GitHub Link */}
            <Link
              href="https://github.com/agunduuz/nextjs-projects-library"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-secondary-600 hover:text-secondary-900 dark:text-secondary-300 dark:hover:text-white transition-colors flex items-center gap-2"
              aria-label="GitHub repository'yi aç"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">GitHub</span>
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700 transition-colors"
              aria-label={theme === 'dark' ? 'Light moda geç' : 'Dark moda geç'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-primary-400" />
              ) : (
                <Moon className="w-5 h-5 text-secondary-600" />
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
