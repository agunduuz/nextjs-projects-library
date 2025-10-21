'use client';

import React from 'react';
import Link from 'next/link';
import { Project } from '@/types/project';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getDifficultyColor } from '@/lib/utils';
import { Circle, ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  isLarge?: boolean;
}

export function ProjectCard({ project, isLarge = false }: ProjectCardProps) {
  const statusVariant = {
    'not-started': 'secondary',
    'in-progress': 'warning',
    completed: 'success',
  } as const;

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block h-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-xl"
      aria-label={`${project.title} projesini görüntüle - Gün ${project.day}`}
    >
      <Card className="h-full flex flex-col transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:border-primary-400 dark:group-hover:border-primary-600 group-hover:-translate-y-1">
        {/* Header - Sabit Yükseklik */}
        <CardHeader className="flex-shrink-0 pb-2">
          <div className="mb-3 flex items-center justify-between">
            <span
              className={`text-xs font-semibold text-primary-600 dark:text-primary-400 ${
                isLarge ? 'text-sm' : ''
              }`}
            >
              GÜN {project.day}
            </span>
            <Badge variant={statusVariant[project.status]}>
              {project.status === 'not-started' && 'Başlanmadı'}
              {project.status === 'in-progress' && 'Devam Ediyor'}
              {project.status === 'completed' && 'Tamamlandı'}
            </Badge>
          </div>

          {/* Başlık - 2 satır max */}
          <CardTitle
            className={`group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 min-h-[1.5rem] mb-2`}
          >
            {project.title}
          </CardTitle>

          {/* Açıklama - 3 satır max */}
          <CardDescription className={`line-clamp-1 min-h-[0.5rem]`}>
            {project.description}
          </CardDescription>
        </CardHeader>

        {/* Content - Flex grow ile boş alanı doldur */}
        <CardContent className="flex-grow py-0">
          {/* Teknolojiler */}
          <div className="pt-4 pb-6 border-t border-gray-100 dark:border-secondary-700">
            <p
              className={`mb-3 text-xs font-semibold text-secondary-500 dark:text-secondary-400 uppercase tracking-wider ${
                isLarge ? 'text-sm' : ''
              }`}
            >
              Teknolojiler
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, isLarge ? 6 : 4).map(tech => (
                <Badge key={tech} variant="default" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > (isLarge ? 6 : 4) && (
                <Badge variant="secondary" className="text-xs">
                  +{project.technologies.length - (isLarge ? 6 : 4)}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>

        {/* Footer - Sabit Yükseklik */}
        <CardFooter className="flex-shrink-0 justify-between items-center mt-auto pt-6 border-t border-gray-100 dark:border-secondary-700">
          <span
            className={`text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 ${getDifficultyColor(project.difficulty)}`}
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

          <ArrowRight className="w-4 h-4 text-secondary-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
        </CardFooter>
      </Card>
    </Link>
  );
}
