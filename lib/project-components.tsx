// Hangi projelerin demosu var?
const projectsWithDemo = [
  'project-001',
  'project-002',
  'project-003',
  'project-004',
  'project-005',
];

/**
 * Projenin canlı demosu var mı kontrol et
 */
export function hasLiveDemo(projectId: string): boolean {
  return projectsWithDemo.includes(projectId);
}
