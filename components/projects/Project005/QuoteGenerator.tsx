'use client';

import { useState, useEffect } from 'react';
import { QuoteState } from './types';
import { fetchRandomQuote } from './quoteService';
import { QuoteCard } from './QuoteCard';
import { RefreshCw, Sparkles } from 'lucide-react';

export function QuoteGenerator() {
  const [state, setState] = useState<QuoteState>({
    quote: null,
    loading: true,
    error: null,
  });

  // İlk quote'u yükle
  useEffect(() => {
    loadQuote();
  }, []);

  const loadQuote = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const quote = await fetchRandomQuote();
      setState({ quote, loading: false, error: null });
    } catch (error) {
      setState({
        quote: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Bir hata oluştu',
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary-500 dark:text-primary-400" />
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl text-secondary-900 dark:text-white">
            İlham Verici Alıntılar
          </h2>
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary-500 dark:text-primary-400" />
        </div>
        <p className="text-sm sm:text-base text-secondary-600 dark:text-secondary-400">
          Her gün yeni bir ilham kaynağı keşfedin
        </p>
      </div>

      {/* Loading State */}
      {state.loading && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="relative">
            <div className="w-16 h-16 border-4 rounded-full border-primary-200 dark:border-primary-900 border-t-primary-500 dark:border-t-primary-400 animate-spin" />
            <Sparkles className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 text-primary-500 dark:text-primary-400 top-1/2 left-1/2" />
          </div>
          <p className="mt-4 font-medium text-secondary-600 dark:text-secondary-400">
            Alıntı yükleniyor...
          </p>
        </div>
      )}

      {/* Error State */}
      {state.error && (
        <div className="p-6 text-center border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 rounded-xl">
          <p className="mb-4 font-medium text-red-600 dark:text-red-400">
            {state.error}
          </p>
          <button
            onClick={loadQuote}
            className="px-6 py-2 font-medium text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
          >
            Tekrar Dene
          </button>
        </div>
      )}

      {/* Quote Display */}
      {!state.loading && !state.error && state.quote && (
        <div className="space-y-6">
          <QuoteCard key={state.quote._id} quote={state.quote} />

          {/* New Quote Button */}
          <div className="flex justify-center">
            <button
              onClick={loadQuote}
              disabled={state.loading}
              className="flex items-center gap-3 px-6 py-3 font-semibold text-white transition-all shadow-lg group bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 dark:bg-primary-600 dark:hover:bg-primary-700 rounded-xl hover:shadow-xl disabled:cursor-not-allowed"
            >
              <RefreshCw className="w-5 h-5 transition-transform duration-500 group-hover:rotate-180" />
              <span>Yeni Alıntı</span>
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-secondary-500 dark:text-secondary-400">
            <span>Uzunluk: {state.quote.length} karakter</span>
            <span>•</span>
            <span>{state.quote.tags.length} etiket</span>
          </div>
        </div>
      )}
    </div>
  );
}
