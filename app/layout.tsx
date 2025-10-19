import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jost',
});

export const metadata: Metadata = {
  title: '100 Günlük Next.js Projesi | Anıl Gündüz',
  description:
    '100 gün boyunca her gün bir proje geliştirerek Next.js, TypeScript ve modern web teknolojilerini öğrenme yolculuğu.',
  keywords: [
    'Next.js',
    'React',
    'TypeScript',
    'Web Development',
    '100 Days of Code',
    'Frontend',
  ],
  authors: [{ name: 'Anıl Gündüz' }],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://nextjs-projects-library.vercel.app',
    title: '100 Günlük Next.js Projesi',
    description: 'Her gün bir proje ile Next.js öğrenme yolculuğu',
    siteName: '100 Günlük Next.js Projesi',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={jost.variable} suppressHydrationWarning>
      <body className="font-sans">
        <Providers>
          <div className="min-h-screen bg-gray-50 dark:bg-secondary-900">
            <Header />
            <main className="container mx-auto px-4 py-8">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
