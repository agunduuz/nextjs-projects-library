import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'default'
    | 'success'
    | 'warning'
    | 'error'
    | 'secondary'
    | 'accent';
  children: React.ReactNode;
}

export function Badge({
  variant = 'default',
  children,
  className,
  ...props
}: BadgeProps) {
  const variants = {
    // Default: Secondary renkleri (light mode'da koyu yeşil, dark mode'da daha açık)
    default:
      'bg-secondary-50 dark:bg-secondary-800/50 text-secondary-700 dark:text-secondary-200 border-secondary-200 dark:border-secondary-700',

    // Success: Yeşil tonları (tamamlanan projeler)
    success:
      'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',

    // Warning: Sarı/turuncu (devam eden projeler)
    warning:
      'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',

    // Error: Kırmızı (hata/uyarı)
    error:
      'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',

    // Secondary: Gri tonları (nötr)
    secondary:
      'bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700',

    // Accent: Turkuaz/cyan (özel vurgular)
    accent:
      'bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 border-accent-200 dark:border-accent-800',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
