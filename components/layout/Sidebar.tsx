'use client';

import { useState } from 'react';
import Link from 'next/link';
import { projectsData } from '@/lib/projects-data';
import { ProjectCategory, Difficulty } from '@/types/project';
import {
  BookOpen,
  Palette,
  ChevronDown,
  ChevronRight,
  Component,
  Database,
  Rocket,
  Package,
  Briefcase,
} from 'lucide-react';

const categories: {
  key: ProjectCategory;
  label: string;
  icon: React.ElementType;
}[] = [
  { key: 'fundamentals', label: 'Temel Uygulamalar', icon: BookOpen },
  { key: 'css-ui', label: 'CSS & UI/UX', icon: Palette },
  { key: 'react-nextjs', label: 'React & Next.js', icon: Component },
  { key: 'api-data', label: 'API & Data', icon: Database },
  { key: 'fullstack', label: 'Full-stack', icon: Rocket },
  { key: 'components', label: 'UI Components', icon: Package },
  { key: 'portfolio', label: 'Portfolio', icon: Briefcase },
];

const difficulties: { key: Difficulty; label: string; color: string }[] = [
  { key: 'beginner', label: 'Başlangıç', color: 'text-green-600' },
  { key: 'intermediate', label: 'Orta', color: 'text-yellow-600' },
  { key: 'advanced', label: 'İleri', color: 'text-red-600' },
];

export function Sidebar() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openDifficulty, setOpenDifficulty] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
    setOpenDifficulty(null); // Kategori değişince zorluk sıfırla
  };

  const toggleDifficulty = (difficulty: string) => {
    setOpenDifficulty(openDifficulty === difficulty ? null : difficulty);
  };

  const getProjectsByCategory = (category: ProjectCategory) => {
    return projectsData.filter(p => p.category === category);
  };

  const getProjectsByCategoryAndDifficulty = (
    category: ProjectCategory,
    difficulty: Difficulty
  ) => {
    return projectsData.filter(
      p => p.category === category && p.difficulty === difficulty
    );
  };

  return (
    <aside className="w-80 h-[calc(100vh-5rem)] sticky top-20 overflow-y-auto bg-white dark:bg-secondary-800 border-r border-gray-200 dark:border-secondary-700 p-4">
      <h2 className="text-lg font-semibold mb-4 text-secondary-900 dark:text-white">
        Projeler
      </h2>

      <nav className="space-y-2">
        {categories.map(category => {
          const categoryProjects = getProjectsByCategory(category.key);
          const isOpen = openCategory === category.key;

          return (
            <div key={category.key}>
              {/* Kategori Başlığı */}
              <button
                onClick={() => toggleCategory(category.key)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <category.icon className="w-4 h-4 text-secondary-600 dark:text-primary-500" />{' '}
                  {/* ← Değişti */}
                  <span className="text-sm font-medium text-secondary-900 dark:text-white">
                    {category.label}
                  </span>
                  <span className="text-xs text-secondary-500 dark:text-secondary-400">
                    ({categoryProjects.length})
                  </span>
                </div>
                {isOpen ? (
                  <ChevronDown className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
                )}
              </button>

              {/* Zorluk Seviyeleri */}
              {isOpen && (
                <div className="ml-6 mt-2 space-y-1">
                  {difficulties.map(difficulty => {
                    const difficultyProjects =
                      getProjectsByCategoryAndDifficulty(
                        category.key,
                        difficulty.key
                      );

                    if (difficultyProjects.length === 0) return null;

                    const isDifficultyOpen =
                      openDifficulty === `${category.key}-${difficulty.key}`;

                    return (
                      <div key={difficulty.key}>
                        {/* Zorluk Başlığı */}
                        <button
                          onClick={() =>
                            toggleDifficulty(
                              `${category.key}-${difficulty.key}`
                            )
                          }
                          className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-secondary-700/50 transition-colors text-left"
                        >
                          <span
                            className={`text-sm font-medium ${difficulty.color}`}
                          >
                            {difficulty.label}
                          </span>
                          <span className="text-xs text-secondary-500">
                            ({difficultyProjects.length})
                          </span>
                        </button>

                        {/* Projeler Listesi */}
                        {isDifficultyOpen && (
                          <div className="ml-4 mt-1 space-y-1">
                            {difficultyProjects.map(project => (
                              <Link
                                key={project.id}
                                href={`/projects/${project.id}`}
                                className="block p-2 text-xs text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-secondary-700/50 rounded transition-colors"
                              >
                                Gün {project.day}: {project.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
