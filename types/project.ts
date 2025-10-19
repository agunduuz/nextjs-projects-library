export interface Project {
  id: string;
  day: number; // 1-100
  title: string;
  description: string;
  category: ProjectCategory;
  technologies: Technology[];
  difficulty: Difficulty;
  skills: string[]; // Kazanımlar
  status: ProjectStatus;
  completedAt?: Date;
  demoUrl?: string;
  githubUrl?: string;

  // Yeni alanlar 👇
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
  };
  accessibility?: {
    features: string[]; // ARIA labels, keyboard navigation vs.
    wcagLevel: 'A' | 'AA' | 'AAA';
  };
  performance?: {
    lighthouseScore?: number;
    firstContentfulPaint?: number;
    largestContentfulPaint?: number;
  };
}

export type ProjectCategory =
  | 'fundamentals' // 01-10
  | 'css-ui' // 11-25
  | 'react-nextjs' // 26-45
  | 'api-data' // 46-60
  | 'fullstack' // 61-75
  | 'components' // 76-90
  | 'portfolio'; // 91-100

export type Technology =
  | 'HTML'
  | 'CSS'
  | 'JavaScript'
  | 'TypeScript'
  | 'React'
  | 'Next.js'
  | 'Tailwind'
  | 'Framer Motion'
  | 'Prisma'
  | 'MongoDB'
  | 'Redux'
  | 'Zustand'
  | 'Context API'
  | 'SWR'
  | 'React Query'
  | 'API';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type ProjectStatus = 'not-started' | 'in-progress' | 'completed';
