'use client';

import { Quote } from './types';
import { Quote as QuoteIcon, Copy, Twitter, Check } from 'lucide-react';
import { useState } from 'react';
import { getTwitterShareUrl, copyToClipboard } from './quoteService';

interface QuoteCardProps {
  quote: Quote;
}

export function QuoteCard({ quote }: QuoteCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `"${quote.content}" - ${quote.author}`;
    const success = await copyToClipboard(text);

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTwitterShare = () => {
    const url = getTwitterShareUrl(quote.content, quote.author);
    window.open(url, '_blank', 'width=550,height=420');
  };

  return (
    <div className="relative p-8 border shadow-xl bg-gradient-to-br from-primary-50 to-accent-50 dark:from-secondary-800 dark:to-secondary-900 rounded-2xl sm:p-10 border-primary-200 dark:border-secondary-700">
      {/* Quote Icon */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
        <QuoteIcon className="w-8 h-8 sm:w-10 sm:h-10 text-primary-300 dark:text-primary-700" />
      </div>

      {/* Quote Content */}
      <div className="mt-8 mb-6">
        <p className="font-serif text-xl leading-relaxed text-center sm:text-2xl md:text-3xl text-secondary-800 dark:text-white">
          `{quote.content}`
        </p>
      </div>

      {/* Author */}
      <p className="mb-6 text-base font-semibold text-center sm:text-lg text-primary-600 dark:text-primary-400">
        — {quote.author}
      </p>

      {/* Tags */}
      {quote.tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {quote.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium border rounded-full bg-white/50 dark:bg-secondary-700/50 text-secondary-600 dark:text-secondary-300 border-primary-200 dark:border-secondary-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-center gap-3">
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 transition-colors bg-white border border-gray-300 rounded-lg dark:bg-secondary-700 dark:border-secondary-600 text-secondary-700 dark:text-secondary-300 hover:bg-gray-50 dark:hover:bg-secondary-600"
          title="Panoya kopyala"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium">Kopyalandı!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className="text-sm font-medium">Kopyala</span>
            </>
          )}
        </button>

        {/* Twitter Share Button */}
        <button
          onClick={handleTwitterShare}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white transition-colors"
          title="Twitter'da paylaş"
        >
          <Twitter className="w-4 h-4" />
          <span className="text-sm font-medium">Paylaş</span>
        </button>
      </div>
    </div>
  );
}
