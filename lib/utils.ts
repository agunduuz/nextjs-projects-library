import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Tailwind class'larını birleştir (çakışmaları önler)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Tarih formatla
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

// Zorluk seviyesine göre renk
export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'beginner':
      return 'text-green-600 bg-green-50';
    case 'intermediate':
      return 'text-yellow-600 bg-yellow-50';
    case 'advanced':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

export function getCategoryBadgeColor(category: string): string {
  const colors: Record<string, string> = {
    fundamentals:
      'bg-secondary-100 dark:bg-secondary-800/50 text-secondary-700 dark:text-secondary-300 border-secondary-300 dark:border-secondary-700',
    'css-ui':
      'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 border-accent-300 dark:border-accent-800',
    'react-nextjs':
      'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border-primary-300 dark:border-primary-800',
    'api-data':
      'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800',
    fullstack:
      'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800',
    components:
      'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-800',
    portfolio:
      'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-pink-300 dark:border-pink-800',
  };

  return colors[category] || colors.fundamentals;
}

// Kategori isimlerini Türkçeleştir
export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    fundamentals: 'Temel',
    'css-ui': 'CSS & UI',
    'react-nextjs': 'React & Next.js',
    'api-data': 'API',
    fullstack: 'Full-stack',
    components: 'Components',
    portfolio: 'Portföy',
  };

  return labels[category] || category;
}
