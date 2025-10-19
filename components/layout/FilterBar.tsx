'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ProjectCategory, Difficulty, ProjectStatus } from '@/types/project';

interface FilterBarProps {
  onSearchChange: (search: string) => void;
  onCategoryChange: (categories: ProjectCategory[]) => void;
  onDifficultyChange: (difficulties: Difficulty[]) => void;
  onStatusChange: (statuses: ProjectStatus[]) => void;
  activeFiltersCount: number;
  resetTrigger?: number;
}

const categories: { value: ProjectCategory; label: string }[] = [
  { value: 'fundamentals', label: 'Temel' },
  { value: 'css-ui', label: 'CSS & UI' },
  { value: 'react-nextjs', label: 'React' },
  { value: 'api-data', label: 'API' },
  { value: 'fullstack', label: 'Full-stack' },
  { value: 'components', label: 'Bileşenler' },
  { value: 'portfolio', label: 'Portföy' },
];

const difficulties: { value: Difficulty; label: string }[] = [
  { value: 'beginner', label: 'Başlangıç' },
  { value: 'intermediate', label: 'Orta' },
  { value: 'advanced', label: 'İleri' },
];

const statuses: { value: ProjectStatus; label: string }[] = [
  { value: 'completed', label: 'Tamamlandı' },
  { value: 'in-progress', label: 'Devam Ediyor' },
  { value: 'not-started', label: 'Başlanmadı' },
];

export function FilterBar({
  onSearchChange,
  onCategoryChange,
  onDifficultyChange,
  onStatusChange,
  resetTrigger = 0,
  activeFiltersCount,
}: FilterBarProps) {
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<
    ProjectCategory[]
  >([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<
    Difficulty[]
  >([]);
  const [selectedStatuses, setSelectedStatuses] = useState<ProjectStatus[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (resetTrigger > 0) {
      setSearch('');
      setSelectedCategories([]);
      setSelectedDifficulties([]);
      setSelectedStatuses([]);
    }
  }, [resetTrigger]);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value);
      onSearchChange(value);
    },
    [onSearchChange]
  );

  const toggleCategory = (category: ProjectCategory) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
    onCategoryChange(newCategories);
  };

  const toggleDifficulty = (difficulty: Difficulty) => {
    const newDifficulties = selectedDifficulties.includes(difficulty)
      ? selectedDifficulties.filter(d => d !== difficulty)
      : [...selectedDifficulties, difficulty];
    setSelectedDifficulties(newDifficulties);
    onDifficultyChange(newDifficulties);
  };

  const toggleStatus = (status: ProjectStatus) => {
    const newStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter(s => s !== status)
      : [...selectedStatuses, status];
    setSelectedStatuses(newStatuses);
    onStatusChange(newStatuses);
  };

  const clearAllFilters = () => {
    setSearch('');
    setSelectedCategories([]);
    setSelectedDifficulties([]);
    setSelectedStatuses([]);
    onSearchChange('');
    onCategoryChange([]);
    onDifficultyChange([]);
    onStatusChange([]);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar + Filter Toggle */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400 dark:text-secondary-500" />
          <input
            type="text"
            value={search}
            onChange={e => handleSearchChange(e.target.value)}
            placeholder="Proje ara... (başlık, açıklama, teknoloji)"
            className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder:text-secondary-400 dark:placeholder:text-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-600 focus:border-transparent transition-all"
            aria-label="Proje ara"
          />
          {search && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-secondary-700 rounded transition-colors"
              aria-label="Aramayı temizle"
            >
              <X className="w-4 h-4 text-secondary-400 dark:text-secondary-500" />
            </button>
          )}
        </div>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-gray-50 dark:hover:bg-secondary-700 transition-all sm:w-auto whitespace-nowrap"
          aria-label="Filtreleri göster/gizle"
          aria-expanded={showFilters}
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="font-medium">Filtreler</span>
          {activeFiltersCount > 0 && (
            <Badge variant="accent" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </button>
      </div>

      {/* Active Filters Summary */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-secondary-600 dark:text-secondary-400">
            Aktif filtreler:
          </span>
          {selectedCategories.map(cat => (
            <Badge
              key={cat}
              variant="default"
              className="cursor-pointer hover:bg-secondary-200 dark:hover:bg-secondary-700"
              onClick={() => toggleCategory(cat)}
            >
              {categories.find(c => c.value === cat)?.label}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
          {selectedDifficulties.map(diff => (
            <Badge
              key={diff}
              variant="accent"
              className="cursor-pointer hover:bg-accent-200 dark:hover:bg-accent-800"
              onClick={() => toggleDifficulty(diff)}
            >
              {difficulties.find(d => d.value === diff)?.label}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
          {selectedStatuses.map(status => (
            <Badge
              key={status}
              variant={
                status === 'completed'
                  ? 'success'
                  : status === 'in-progress'
                    ? 'warning'
                    : 'secondary'
              }
              className="cursor-pointer"
              onClick={() => toggleStatus(status)}
            >
              {statuses.find(s => s.value === status)?.label}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
          <button
            onClick={clearAllFilters}
            className="text-xs text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300 underline ml-2"
          >
            Tümünü temizle
          </button>
        </div>
      )}

      {/* Filter Options (Collapsible) */}
      {showFilters && (
        <div className="p-4 rounded-lg border border-gray-200 dark:border-secondary-700 bg-gray-50 dark:bg-secondary-800/50 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Kategori Filtreleri */}
          <div>
            <h3 className="text-sm font-semibold text-secondary-900 dark:text-white mb-3">
              Kategori
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => toggleCategory(cat.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedCategories.includes(cat.value)
                      ? 'bg-secondary-600 dark:bg-secondary-700 text-white border-2 border-secondary-600 dark:border-secondary-500'
                      : 'bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 border border-gray-200 dark:border-secondary-700 hover:border-secondary-400 dark:hover:border-secondary-600'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Zorluk Filtreleri */}
          <div>
            <h3 className="text-sm font-semibold text-secondary-900 dark:text-white mb-3">
              Zorluk Seviyesi
            </h3>
            <div className="flex flex-wrap gap-2">
              {difficulties.map(diff => (
                <button
                  key={diff.value}
                  onClick={() => toggleDifficulty(diff.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedDifficulties.includes(diff.value)
                      ? 'bg-accent-500 dark:bg-accent-600 text-white border-2 border-accent-500 dark:border-accent-500'
                      : 'bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 border border-gray-200 dark:border-secondary-700 hover:border-accent-400 dark:hover:border-accent-600'
                  }`}
                >
                  {diff.label}
                </button>
              ))}
            </div>
          </div>

          {/* Durum Filtreleri */}
          <div>
            <h3 className="text-sm font-semibold text-secondary-900 dark:text-white mb-3">
              Durum
            </h3>
            <div className="flex flex-wrap gap-2">
              {statuses.map(status => (
                <button
                  key={status.value}
                  onClick={() => toggleStatus(status.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedStatuses.includes(status.value)
                      ? status.value === 'completed'
                        ? 'bg-green-500 text-white border-2 border-green-500'
                        : status.value === 'in-progress'
                          ? 'bg-yellow-500 text-white border-2 border-yellow-500'
                          : 'bg-gray-500 text-white border-2 border-gray-500'
                      : 'bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 border border-gray-200 dark:border-secondary-700 hover:border-gray-400 dark:hover:border-gray-600'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
