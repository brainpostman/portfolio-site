'use client';
import ProjectItem from '@/components/Projects/ProjectItem/ProjectItem';
import styles from './Projects.module.scss';
import projects from '@/data/projects.json';
import Link from 'next/link';
import TextHoverFrame from '@/components/Layout/TextHoverFrame.tsx/TextHoverFrame';

const Projects = () => {
    let shownProjects = projects.mainProjects;
    if (shownProjects.length < 3) {
        shownProjects = shownProjects.concat(projects.miniProjects.slice(0, 1));
    }

    

    return (
        <section id='projects' className={styles.projects}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Проекты</h1>
                <div className={styles.items}>
                    {shownProjects.map((project) => (
                        <ProjectItem key={project.name} project={project} />
                    ))}
                </div>
                <h2 className={styles.seeAll}>
                    <Link href={''}>
                        <TextHoverFrame>Смотреть все → </TextHoverFrame>
                    </Link>
                </h2>
            </div>
        </section>
    );
};

export default Projects;
