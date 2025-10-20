import { MetadataRoute } from 'next';
import { projectsData } from '@/lib/projects-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nextjs-projects-library.vercel.app';

  // Ana sayfa
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
  ];

  // Tüm proje sayfaları
  const projectRoutes = projectsData.map(project => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: project.completedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...projectRoutes];
}
