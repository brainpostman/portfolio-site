import ProjectPage from '@/page_blocks/projects/ProjectPage/ProjectPage';
import styles from './page.module.scss';
import projectsMap from '@/data/allprojects.ts';
import BreadCrumbs from '@/components/UI/BreadCrumbs/BreadCrumbs';
import { redirect } from 'next/navigation';

export async function generateStaticParams() {
    const projects = Array.from(projectsMap.entries());

    return projects.map((project) => ({
        name: project[0],
    }));
}

const SingleProject = ({ params }: { params: { name: string } }) => {
    if (!projectsMap.has(params.name)) redirect('/projects');
    const project = projectsMap.get(params.name);

    return (
        <main className={styles.main}>
            <div className={styles.wrapper}>
                <BreadCrumbs />
                <ProjectPage project={project!} />
            </div>
        </main>
    );
};

export default SingleProject;
