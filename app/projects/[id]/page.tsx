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

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return {
      title: '404 - Proje Bulunamadı',
      description: 'Aradığınız proje mevcut değil.',
    };
  }

  const projectUrl = `https://nextjs-projects-library.vercel.app/projects/${id}`;

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
          url: `/og-images/${id}.png`,
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
      images: [`/og-images/${id}.png`],
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

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  const hasDemoAvailable = hasLiveDemo(id);

  const currentIndex = projectsData.findIndex(p => p.id === project.id);
  const previousProject =
    currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projectsData.length - 1
      ? projectsData[currentIndex + 1]
      : null;

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

  const projectUrl = `https://nextjs-projects-library.vercel.app/projects/${id}`;
  const jsonLd = generateProjectJsonLd(project, projectUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container max-w-6xl px-4 py-8 mx-auto">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Projeler', href: '/#projeler' },
            { label: project.title },
          ]}
        />

        <header className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 border rounded-full bg-secondary-50 dark:bg-secondary-800/50 border-secondary-200 dark:border-secondary-700">
              <Calendar className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
              <span className="text-sm font-semibold text-secondary-700 dark:text-secondary-300">
                GÜN {project.day}
              </span>
            </span>

            <Badge variant={statusVariant[project.status]}>
              {statusLabel[project.status]}
            </Badge>
          </div>

          <h1 className="mb-3 text-3xl font-bold sm:text-4xl lg:text-5xl text-secondary-900 dark:text-white">
            {project.title}
          </h1>

          <p className="text-lg text-secondary-600 dark:text-secondary-300">
            {project.description}
          </p>
        </header>

        {hasDemoAvailable && (
          <section className="mb-12">
            <DemoWrapper projectId={id} />
          </section>
        )}

        {!hasDemoAvailable && (
          <div className="p-6 mb-12 border-2 border-gray-300 border-dashed rounded-xl dark:border-secondary-700 bg-gray-50 dark:bg-secondary-800/50">
            <p className="text-center text-secondary-600 dark:text-secondary-400">
              🚧 Bu proje için canlı demo henüz hazır değil. Yakında eklenecek!
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-3">
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
                  <Circle className="flex-shrink-0 w-2 h-2 mt-2 fill-current text-accent-500 dark:text-accent-400" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {(project.demoUrl || project.githubUrl) && (
          <div className="flex flex-col gap-4 mb-12 sm:flex-row">
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 font-medium text-white transition-colors rounded-lg bg-primary-500 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-700"
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
                className="flex items-center justify-center gap-2 px-6 py-3 font-medium transition-colors bg-white border border-gray-300 rounded-lg dark:border-secondary-700 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-gray-50 dark:hover:bg-secondary-700"
              >
                <Github className="w-5 h-5" />
                GitHub`da Görüntüle
              </Link>
            )}
          </div>
        )}

        <nav className="pt-8 border-t border-gray-200 dark:border-secondary-700">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {previousProject ? (
              <Link
                href={`/projects/${previousProject.id}`}
                className="flex items-center gap-3 p-4 transition-all border border-gray-200 rounded-lg group dark:border-secondary-700 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-gray-50 dark:hover:bg-secondary-800"
              >
                <ArrowLeft className="flex-shrink-0 w-5 h-5 transition-all text-secondary-400 group-hover:text-primary-500 group-hover:-translate-x-1" />
                <div className="text-left">
                  <p className="mb-1 text-xs text-secondary-500 dark:text-secondary-400">
                    Önceki Proje
                  </p>
                  <p className="text-sm font-semibold transition-colors text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-1">
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
                className="flex items-center gap-3 p-4 transition-all border border-gray-200 rounded-lg group dark:border-secondary-700 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-gray-50 dark:hover:bg-secondary-800 sm:ml-auto"
              >
                <div className="text-right">
                  <p className="mb-1 text-xs text-secondary-500 dark:text-secondary-400">
                    Sonraki Proje
                  </p>
                  <p className="text-sm font-semibold transition-colors text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-1">
                    {nextProject.title}
                  </p>
                </div>
                <ArrowRight className="flex-shrink-0 w-5 h-5 transition-all text-secondary-400 group-hover:text-primary-500 group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
