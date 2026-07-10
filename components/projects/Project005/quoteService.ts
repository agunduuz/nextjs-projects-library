import { Quote } from './types';

const API_BASE_URL = 'https://dummyjson.com';

export async function fetchRandomQuote(): Promise<Quote> {
  try {
    const response = await fetch(`${API_BASE_URL}/quotes/random`);

    if (!response.ok) {
      throw new Error('Alıntı getirilemedi');
    }

    const data = await response.json();

    return {
      _id: String(data.id),
      content: data.quote,
      author: data.author,
      tags: [],
      authorSlug: data.author.toLowerCase().replace(/\s+/g, '-'),
      length: data.quote.length,
      dateAdded: '',
      dateModified: '',
    };
  } catch (error) {
    console.error('Quote fetch error:', error);
    throw new Error('Alıntı yüklenirken bir hata oluştu');
  }
}

// Twitter paylaşım URL'i oluştur
export function getTwitterShareUrl(quote: string, author: string): string {
  const text = `"${quote}" - ${author}`;
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
}

// Panoya kopyala
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Clipboard error:', error);
    return false;
  }
}
