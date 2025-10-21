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
    status: 'completed',
  },
  {
    id: 'project-002',
    day: 2,
    title: 'Calculator App',
    description: 'Temel matematiksel işlemleri yapan hesap makinesi',
    category: 'fundamentals',
    technologies: ['JavaScript', 'CSS', 'TypeScript'],
    difficulty: 'beginner',
    skills: [
      'Event handling',
      'State management',
      'Error handling',
      'CSS Grid layout',
    ],
    status: 'completed',
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
  {
    id: 'project-004',
    day: 4,
    title: 'Clock & Timer App',
    description: 'Dijital saat, zamanlayıcı ve kronometre özellikleri',
    category: 'fundamentals',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    difficulty: 'beginner',
    skills: ['Date API', 'setInterval', 'clearInterval', 'Time formatting'],
    status: 'not-started',
  },
  {
    id: 'project-005',
    day: 5,
    title: 'Random Quote Generator',
    description: 'API kullanarak rastgele ilham verici alıntılar gösterme',
    category: 'fundamentals',
    technologies: ['JavaScript', 'API'],
    difficulty: 'beginner',
    skills: [
      'Fetch API',
      'DOM manipülasyonu',
      'Event handling',
      'API tüketimi',
    ],
    status: 'not-started',
  },
  {
    id: 'project-006',
    day: 6,
    title: 'QR Code Generator',
    description: "Text veya URL'den QR kod oluşturma uygulaması",
    category: 'fundamentals',
    technologies: ['JavaScript', 'API'],
    difficulty: 'beginner',
    skills: ['3rd party API', 'Image handling', 'Download functionality'],
    status: 'not-started',
  },
  {
    id: 'project-007',
    day: 7,
    title: 'Markdown Editor',
    description: 'Canlı önizleme ile markdown editörü',
    category: 'fundamentals',
    technologies: ['JavaScript', 'React'],
    difficulty: 'intermediate',
    skills: [
      'Markdown parsing',
      'Live preview',
      'Textarea handling',
      'State management',
    ],
    status: 'not-started',
  },
  {
    id: 'project-008',
    day: 8,
    title: 'Unit Converter App',
    description: 'Uzunluk, ağırlık, sıcaklık dönüştürme uygulaması',
    category: 'fundamentals',
    technologies: ['JavaScript'],
    difficulty: 'beginner',
    skills: ['Matematiksel dönüşümler', 'Form handling', 'Validation'],
    status: 'not-started',
  },
  {
    id: 'project-009',
    day: 9,
    title: 'Typing Speed Test',
    description: 'WPM (words per minute) hesaplayan yazma hızı testi',
    category: 'fundamentals',
    technologies: ['JavaScript', 'TypeScript'],
    difficulty: 'intermediate',
    skills: [
      'Timer logic',
      'Input tracking',
      'Accuracy calculation',
      'Real-time stats',
    ],
    status: 'not-started',
  },
  {
    id: 'project-010',
    day: 10,
    title: 'Image Carousel',
    description: 'Manuel ve otomatik kaydırmalı resim galerisi',
    category: 'fundamentals',
    technologies: ['JavaScript', 'CSS'],
    difficulty: 'beginner',
    skills: [
      'DOM manipulation',
      'CSS transitions',
      'Timer',
      'Navigation logic',
    ],
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
