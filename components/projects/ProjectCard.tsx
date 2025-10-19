// components/projects/ProjectCard.tsx
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
import {
  getCategoryBadgeColor,
  getCategoryLabel,
  getDifficultyColor,
} from '@/lib/utils';
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
      <Card
        className={`h-full transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg group-hover:border-primary-300 dark:group-hover:border-primary-700 ${
          isLarge ? 'p-8' : ''
        }`}
      >
        <CardHeader>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-secondary-700 dark:text-primary-400">
              GÜN {project.day}
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full border ${getCategoryBadgeColor(project.category)}`}
              >
                {getCategoryLabel(project.category)}
              </span>

              <Badge variant={statusVariant[project.status]}>
                {project.status === 'not-started' && 'Başlanmadı'}
                {project.status === 'in-progress' && 'Devam Ediyor'}
                {project.status === 'completed' && 'Tamamlandı'}
              </Badge>
            </div>
          </div>

          <CardTitle className="group-hover:text-secondary-700 dark:group-hover:text-primary-400 transition-colors">
            {project.title}
          </CardTitle>
          <CardDescription className={isLarge ? 'text-base' : ''}>
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Teknolojiler */}
          <div>
            <p
              className={`mb-2 text-xs font-medium text-secondary-700 dark:text-secondary-300 ${
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

          {/* Kazanımlar */}
          {isLarge && (
            <div>
              <p className="mb-2 text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Kazanımlar
              </p>
              <ul className="space-y-2">
                {project.skills.map((skill, index) => (
                  <li
                    key={index}
                    className="text-sm text-secondary-600 dark:text-secondary-300 flex items-start"
                  >
                    <span className="mr-2 text-primary-500">•</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>

        <CardFooter className="justify-between items-center">
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
          <ArrowRight className="w-4 h-4 text-secondary-400 group-hover:text-secondary-700 dark:group-hover:text-primary-500 transition-all" />
        </CardFooter>
      </Card>
    </Link>
  );
}
