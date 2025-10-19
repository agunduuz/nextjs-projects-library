// Hangi projelerin demosu var?
const projectsWithDemo = ['project-001'];

/**
 * Projenin canlı demosu var mı kontrol et
 */
export function hasLiveDemo(projectId: string): boolean {
  return projectsWithDemo.includes(projectId);
}
