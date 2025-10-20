'use client';

import { useState, useMemo } from 'react';
import { projectsData } from '@/lib/projects-data';
import { generateWebsiteJsonLd } from '@/lib/seo';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Sparkles, TrendingUp, Package } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { FilterBar } from '@/components/layout/FilterBar';
import { ProjectCategory, Difficulty, ProjectStatus } from '@/types/project';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<
    ProjectCategory[]
  >([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<
    Difficulty[]
  >([]);
  const [selectedStatuses, setSelectedStatuses] = useState<ProjectStatus[]>([]);
  const [resetTrigger, setResetTrigger] = useState(0); // ✅ YENİ: Reset tetikleyici

  // Filtrelenmiş projeler
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      // Arama filtresi
      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        project.skills.some(skill =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Kategori filtresi
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(project.category);

      // Zorluk filtresi
      const matchesDifficulty =
        selectedDifficulties.length === 0 ||
        selectedDifficulties.includes(project.difficulty);

      // Durum filtresi
      const matchesStatus =
        selectedStatuses.length === 0 ||
        selectedStatuses.includes(project.status);

      return (
        matchesSearch && matchesCategory && matchesDifficulty && matchesStatus
      );
    });
  }, [searchQuery, selectedCategories, selectedDifficulties, selectedStatuses]);

  const completedCount = projectsData.filter(
    p => p.status === 'completed'
  ).length;
  const inProgressCount = projectsData.filter(
    p => p.status === 'in-progress'
  ).length;
  const totalCount = projectsData.length;
  const completionRate = Math.round((completedCount / totalCount) * 100);

  const activeFiltersCount =
    selectedCategories.length +
    selectedDifficulties.length +
    selectedStatuses.length;

  // ✅ YENİ: Tüm filtreleri temizle fonksiyonu
  const handleClearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedDifficulties([]);
    setSelectedStatuses([]);
    setResetTrigger(prev => prev + 1); // FilterBar'ı resetle
  };

  const jsonLd = generateWebsiteJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full max-w-7xl mx-auto space-y-12">
          {/* Hero Section - Compact & Modern */}
          <section className="relative overflow-hidden">
            <div className="relative z-10 text-center py-8 px-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-secondary-50 dark:bg-primary-900/20 border border-secondary-200 dark:border-primary-800">
                <Sparkles className="w-4 h-4 text-secondary-600 dark:text-primary-400" />
                <span className="text-sm font-medium text-secondary-700 dark:text-primary-300">
                  100 Günlük Kodlama Yolculuğu
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-900 dark:text-white mb-3">
                100 Günde{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-600 via-accent-500 to-primary-600 dark:from-primary-500 dark:to-accent-500">
                  100 Proje
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
                Next.js, TypeScript ve modern web teknolojileri ile günlük proje
                geliştirme deneyimi
              </p>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent-200/20 dark:bg-accent-900/10 rounded-full blur-3xl" />
            </div>
          </section>

          {/* Stats - Inline & Minimal */}
          <section className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-4">
            {/* Completed */}
            <div className="flex items-center gap-3 group">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary-50 dark:bg-green-900/20 border border-secondary-200 dark:border-green-800 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-secondary-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {completedCount}
                </p>
                <p className="text-xs text-secondary-500 dark:text-secondary-400">
                  Tamamlandı
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-12 bg-gray-200 dark:bg-secondary-700" />

            {/* In Progress */}
            <div className="flex items-center gap-3 group">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-accent-600 dark:text-accent-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {inProgressCount}
                </p>
                <p className="text-xs text-secondary-500 dark:text-secondary-400">
                  Devam Ediyor
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-12 bg-gray-200 dark:bg-secondary-700" />

            {/* Total */}
            <div className="flex items-center gap-3 group">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary-50 dark:bg-primary-900/20 border border-secondary-200 dark:border-primary-800 group-hover:scale-110 transition-transform">
                <Package className="w-6 h-6 text-secondary-600 dark:text-primary-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {totalCount}
                </p>
                <p className="text-xs text-secondary-500 dark:text-secondary-400">
                  Toplam Proje
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-12 bg-gray-200 dark:bg-secondary-700" />

            {/* Completion Rate */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                {/* Progress Circle */}
                <svg className="w-12 h-12 -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-gray-200 dark:text-secondary-700"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 20}`}
                    strokeDashoffset={`${2 * Math.PI * 20 * (1 - completionRate / 100)}`}
                    className="text-primary-500 dark:text-primary-400 transition-all duration-500"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-secondary-900 dark:text-white">
                  {completionRate}%
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-900 dark:text-white">
                  İlerleme
                </p>
                <p className="text-xs text-secondary-500 dark:text-secondary-400">
                  Tamamlanma
                </p>
              </div>
            </div>
          </section>

          {/* Filter Bar - YENİ */}
          <section className="px-4">
            <FilterBar
              onSearchChange={setSearchQuery}
              onCategoryChange={setSelectedCategories}
              onDifficultyChange={setSelectedDifficulties}
              onStatusChange={setSelectedStatuses}
              activeFiltersCount={activeFiltersCount}
              resetTrigger={resetTrigger} // ✅ YENİ prop
            />
          </section>

          {/* Projects Grid */}
          <section className="px-4 pb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900 dark:text-white">
                  Projeler
                </h2>
                <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-1">
                  {filteredProjects.length} proje bulundu
                </p>
              </div>
            </div>

            {/* Bento Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-auto">
                {filteredProjects.map((project, index) => {
                  const isLarge = (index + 1) % 7 === 0;
                  return (
                    <div
                      key={project.id}
                      className={`${
                        isLarge
                          ? 'sm:col-span-2 lg:col-span-2 sm:row-span-2'
                          : 'col-span-1'
                      }`}
                    >
                      <ProjectCard project={project} isLarge={isLarge} />
                    </div>
                  );
                })}
              </div>
            ) : (
              // Empty State
              <div className="text-center py-16">
                <Package className="w-16 h-16 text-secondary-300 dark:text-secondary-700 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                  Proje bulunamadı
                </h3>
                <p className="text-sm text-secondary-500 dark:text-secondary-400 mb-4">
                  Arama kriterlerinize uygun proje yok
                </p>
                <button
                  onClick={handleClearAllFilters} // ✅ Güncellendi
                  className="px-4 py-2 rounded-lg bg-primary-500 dark:bg-primary-600 text-white hover:bg-primary-600 dark:hover:bg-primary-700 transition-colors"
                >
                  Filtreleri Temizle
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
