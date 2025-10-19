import { Project } from '@/types/project';

export const projectsData: Project[] = [
  // Fundamentals (1-10)
  {
    id: 'project-001',
    day: 1,
    title: 'To-Do List App',
    description: 'Temel CRUD işlemleri ile görev yönetimi uygulaması',
    category: 'fundamentals',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    difficulty: 'beginner',
    skills: ['DOM manipülasyonu', 'localStorage', 'Event handling'],
    status: 'not-started',
  },
  {
    id: 'project-002',
    day: 2,
    title: 'Calculator App',
    description: 'Temel matematiksel işlemleri yapan hesap makinesi',
    category: 'fundamentals',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    difficulty: 'beginner',
    skills: ['Olay yönetimi', 'UI mantığı', 'Fonksiyonlar'],
    status: 'not-started',
  },
  {
    id: 'project-003',
    day: 3,
    title: 'Weather App',
    description: 'API kullanarak hava durumu gösterimi',
    category: 'fundamentals',
    technologies: ['JavaScript', 'API'],
    difficulty: 'beginner',
    skills: ['Fetch API', 'async/await', 'API tüketimi'],
    status: 'not-started',
  },
  // ... (diğer 97 proje buraya eklenecek)
];

// Kategori bazlı filtreleme
export const getProjectsByCategory = (category: string) => {
  return projectsData.filter(project => project.category === category);
};

// ID'ye göre proje getir
export const getProjectById = (id: string) => {
  return projectsData.find(project => project.id === id);
};

// Durum bazlı filtreleme
export const getProjectsByStatus = (status: string) => {
  return projectsData.filter(project => project.status === status);
};
