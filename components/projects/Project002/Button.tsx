import { ButtonHTMLAttributes, ReactNode } from 'react';
import { ButtonType } from './types';

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: ReactNode;
  variant: ButtonType; // ✅ 'type' yerine 'variant' kullan
  span?: number;
}

export function Button({
  children,
  variant,
  span = 1,
  onClick,
  ...props
}: ButtonProps) {
  const baseClasses =
    'h-16 sm:h-20 rounded-xl font-semibold text-xl sm:text-2xl transition-all active:scale-95 touch-manipulation';

  const variantClasses = {
    number:
      'bg-gray-700 hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 text-white shadow-lg hover:shadow-xl',
    operator:
      'bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white shadow-lg hover:shadow-xl',
    function:
      'bg-gray-600 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 text-white shadow-lg hover:shadow-xl',
    equals:
      'bg-accent-500 hover:bg-accent-600 dark:bg-accent-600 dark:hover:bg-accent-700 text-white shadow-lg hover:shadow-xl',
  };

  const spanClass = span === 2 ? 'col-span-2' : '';

  return (
    <button
      type="button" // ✅ HTML native type her zaman "button"
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${spanClass}`}
      {...props}
    >
      {children}
    </button>
  );
}
