import projects from '@/data/allprojects';
import { IRoute } from '@/types/IRoute';

const breadCrumbConf: IRoute = {
    path: '',
    href: '/',
    name: 'Главная',
    children: [
        {
            path: 'projects',
            href: '/projects',
            name: 'Проекты',
            children: [],
        },
    ],
};

const projectCrumbs = breadCrumbConf.children.filter((route) => {
    return route.path === 'projects';
})[0].children;

for (let project of projects.values()) {
    projectCrumbs.push({
        path: project.href,
        href: `/projects/${project.href}`,
        name: project.name,
        children: [],
    });
}

export default breadCrumbConf;
