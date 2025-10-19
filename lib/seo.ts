import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  slug?: string;
  image?: string;
  keywords?: string[];
}

export function generateProjectSEO({
  title,
  description,
  slug,
  image = '/og-image.png',
  keywords = [],
}: SEOProps): Metadata {
  const url = `https://nextjs-projects-library.vercel.app${slug ? `/projects/${slug}` : ''}`;
  return {
    title: `${title} | 100 Günlük Next.js Projesi`,
    description,
    keywords: [
      'Next.js',
      'React',
      'TypeScript',
      'Web Development',
      ...keywords,
    ],
    authors: [{ name: 'Anıl Gündüz' }],
    creator: 'Anıl Gündüz',
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      siteName: '100 Günlük Next.js Projesi',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
