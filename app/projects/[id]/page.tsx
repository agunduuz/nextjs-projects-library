import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProjectById, projectsData } from '@/lib/projects-data';
import { generateProjectJsonLd } from '@/lib/seo';
import { hasLiveDemo } from '@/lib/project-components';
import { DemoWrapper } from '@/components/projects/DemoWrapper';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  ArrowLeft,
  ArrowRight,
  Circle,
  ExternalLink,
  Github,
  Calendar,
  Layers,
  Zap,
  Sparkles,
} from 'lucide-react';
import { getDifficultyColor, getCategoryLabel } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const project = getProjectById(params.id);

  // Proje bulunamazsa basit bir metadata döndür
  if (!project) {
    return {
      title: '404 - Proje Bulunamadı',
      description: 'Aradığınız proje mevcut değil.',
    };
  }

  // Proje bulunduysa detaylı metadata oluştur
  const projectUrl = `https://nextjs-projects-library.vercel.app/projects/${params.id}`;

  return {
    title: `${project.title} - Gün ${project.day} | 100 Günlük Next.js Projesi`,
    description: `${project.description} | Teknolojiler: ${project.technologies.join(', ')} | Zorluk: ${project.difficulty}`,
    keywords: [
      project.title,
      ...project.technologies,
      ...project.skills,
      project.category,
      project.difficulty,
      'Next.js',
      'TypeScript',
      'Web Development',
    ],
    authors: [{ name: 'Anıl Gündüz', url: 'https://github.com/agunduuz' }],
    creator: 'Anıl Gündüz',
    openGraph: {
      type: 'article',
      locale: 'tr_TR',
      url: projectUrl,
      title: `${project.title} - Gün ${project.day}`,
      description: project.description,
      siteName: '100 Günlük Next.js Projesi',
      images: [
        {
          url: `/og-images/${params.id}.png`, // Proje bazlı görsel (ileride)
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      publishedTime: project.completedAt?.toISOString(),
      tags: [...project.technologies, ...project.skills],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - Gün ${project.day}`,
      description: project.description,
      creator: '@frontendanil',
      images: [`/og-images/${params.id}.png`],
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
    alternates: {
      canonical: projectUrl,
    },
  };
}

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Projeyi bul
  const project = getProjectById(params.id);

  // Proje bulunamadıysa 404
  if (!project) {
    notFound();
  }

  // Canlı demo var mı kontrol et
  const hasDemoAvailable = hasLiveDemo(params.id);

  // Önceki ve sonraki projeleri bul
  const currentIndex = projectsData.findIndex(p => p.id === project.id);
  const previousProject =
    currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projectsData.length - 1
      ? projectsData[currentIndex + 1]
      : null;

  // Durum badge variant'ı
  const statusVariant = {
    'not-started': 'secondary',
    'in-progress': 'warning',
    completed: 'success',
  } as const;

  const statusLabel = {
    'not-started': 'Başlanmadı',
    'in-progress': 'Devam Ediyor',
    completed: 'Tamamlandı',
  };

  const projectUrl = `https://nextjs-projects-library.vercel.app/projects/${params.id}`;
  const jsonLd = generateProjectJsonLd(project, projectUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Projeler', href: '/#projeler' },
            { label: project.title },
          ]}
        />

        {/* Header Section */}
        <header className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-50 dark:bg-secondary-800/50 border border-secondary-200 dark:border-secondary-700">
              <Calendar className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
              <span className="text-sm font-semibold text-secondary-700 dark:text-secondary-300">
                GÜN {project.day}
              </span>
            </span>

            <Badge variant={statusVariant[project.status]}>
              {statusLabel[project.status]}
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-900 dark:text-white mb-3">
            {project.title}
          </h1>

          <p className="text-lg text-secondary-600 dark:text-secondary-300">
            {project.description}
          </p>
        </header>

        {/* 🎮 CANLI DEMO BÖLÜMÜ */}
        {hasDemoAvailable && (
          <section className="mb-12">
            <DemoWrapper projectId={params.id} />
          </section>
        )}

        {/* Demo Yoksa Bilgi Mesajı */}
        {!hasDemoAvailable && (
          <div className="mb-12 p-6 rounded-xl border-2 border-dashed border-gray-300 dark:border-secondary-700 bg-gray-50 dark:bg-secondary-800/50">
            <p className="text-center text-secondary-600 dark:text-secondary-400">
              🚧 Bu proje için canlı demo henüz hazır değil. Yakında eklenecek!
            </p>
          </div>
        )}

        {/* Meta Bilgiler Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-secondary-500 dark:text-secondary-400" />
                <CardTitle className="text-sm">Kategori</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-base font-semibold text-secondary-900 dark:text-white">
                {getCategoryLabel(project.category)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-secondary-500 dark:text-secondary-400" />
                <CardTitle className="text-sm">Zorluk Seviyesi</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <span
                className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full ${getDifficultyColor(project.difficulty)}`}
              >
                <Circle
                  className={`w-2 h-2 fill-current ${
                    project.difficulty === 'beginner'
                      ? 'text-green-600 dark:text-green-400'
                      : project.difficulty === 'intermediate'
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-red-600 dark:text-red-400'
                  }`}
                />
                {project.difficulty === 'beginner' && 'Başlangıç'}
                {project.difficulty === 'intermediate' && 'Orta'}
                {project.difficulty === 'advanced' && 'İleri'}
              </span>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-secondary-500 dark:text-secondary-400" />
                <CardTitle className="text-sm">Teknolojiler</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-base font-semibold text-secondary-900 dark:text-white">
                {project.technologies.length} Teknoloji
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Teknolojiler */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Kullanılan Teknolojiler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <Badge key={tech} variant="default">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Kazanımlar */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Bu Projeden Kazanılanlar</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {project.skills.map((skill, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-secondary-700 dark:text-secondary-300"
                >
                  <Circle className="w-2 h-2 fill-current text-accent-500 dark:text-accent-400 mt-2 flex-shrink-0" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Demo ve GitHub Linkleri */}
        {(project.demoUrl || project.githubUrl) && (
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary-500 dark:bg-primary-600 text-white hover:bg-primary-600 dark:hover:bg-primary-700 transition-colors font-medium"
              >
                <ExternalLink className="w-5 h-5" />
                Canlı Demo
              </Link>
            )}
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-300 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-gray-50 dark:hover:bg-secondary-700 transition-colors font-medium"
              >
                <Github className="w-5 h-5" />
                GitHub&apos;da Görüntüle
              </Link>
            )}
          </div>
        )}

        {/* Önceki/Sonraki Navigasyon */}
        <nav className="border-t border-gray-200 dark:border-secondary-700 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {previousProject ? (
              <Link
                href={`/projects/${previousProject.id}`}
                className="group flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-secondary-700 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-gray-50 dark:hover:bg-secondary-800 transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-secondary-400 group-hover:text-primary-500 group-hover:-translate-x-1 transition-all flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-secondary-500 dark:text-secondary-400 mb-1">
                    Önceki Proje
                  </p>
                  <p className="text-sm font-semibold text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
                    {previousProject.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextProject && (
              <Link
                href={`/projects/${nextProject.id}`}
                className="group flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-secondary-700 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-gray-50 dark:hover:bg-secondary-800 transition-all sm:ml-auto"
              >
                <div className="text-right">
                  <p className="text-xs text-secondary-500 dark:text-secondary-400 mb-1">
                    Sonraki Proje
                  </p>
                  <p className="text-sm font-semibold text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
                    {nextProject.title}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-secondary-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
