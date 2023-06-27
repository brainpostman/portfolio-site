import { IProjectItem } from '@/types/IProjectItem';
import projects from './projects.json';

const allProjects = projects.mainProjects.concat(projects.miniProjects);
const projectsMap = new Map<string, IProjectItem>();
for (let project of allProjects) {
    projectsMap.set(project.href, project);
}

export default projectsMap;
