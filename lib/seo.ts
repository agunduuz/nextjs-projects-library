import { Project } from '@/types/project';

/**
 * Google için JSON-LD structured data oluştur
 */
export function generateProjectJsonLd(project: Project, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: project.title,
    description: project.description,
    author: {
      '@type': 'Person',
      name: 'Anıl Gündüz',
      url: 'https://github.com/agunduuz',
    },
    datePublished:
      project.completedAt?.toISOString() || new Date().toISOString(),
    dateModified:
      project.completedAt?.toISOString() || new Date().toISOString(),
    image: `/og-images/${project.id}.png`,
    url: url,
    keywords: [...project.technologies, ...project.skills].join(', '),
    articleSection: project.category,
    about: {
      '@type': 'Thing',
      name: project.category,
    },
    educationalLevel: project.difficulty,
    teaches: project.skills.join(', '),
  };
}

/**
 * Site geneli için JSON-LD
 */
export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '100 Günlük Next.js Projesi',
    description:
      'Next.js, TypeScript ve modern web teknolojileri öğrenme yolculuğu',
    url: 'https://nextjs-projects-library.vercel.app',
    author: {
      '@type': 'Person',
      name: 'Anıl Gündüz',
      url: 'https://github.com/agunduuz',
    },
    inLanguage: 'tr-TR',
  };
}
