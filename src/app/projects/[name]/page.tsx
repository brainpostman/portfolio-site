import ProjectPage from '@/components/Projects/ProjectPage/ProjectPage';
import styles from './page.module.scss';
import projectsMap from '@/data/allprojects.ts';

const AllProjects = ({ params }: { params: { name: string } }) => {
    const project = projectsMap.get(params.name);

    return (
        <main className={styles.main}>
            <div className={styles.wrapper}>
                <ProjectPage project={project!} />
            </div>
        </main>
    );
};

export default AllProjects;
