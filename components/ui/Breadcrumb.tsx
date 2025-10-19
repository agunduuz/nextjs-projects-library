import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string; // href yoksa aktif sayfa demektir
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {/* Eğer link varsa ve son eleman değilse, tıklanabilir yap */}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                // Son eleman - link değil, sadece text
                <span
                  className={`${
                    isLast
                      ? 'text-secondary-900 dark:text-white font-medium'
                      : 'text-secondary-600 dark:text-secondary-400'
                  }`}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}

              {/* Son eleman değilse ok ikonu göster */}
              {!isLast && (
                <ChevronRight className="w-4 h-4 text-secondary-400 dark:text-secondary-600" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
