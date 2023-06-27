import styles from './page.module.scss';
import projects from '@/data/projects.json';
import GoToTop from '@/components/UI/GoToTop/GoToTop';
import ProjectList from '@/page_blocks/projects/ProjectList/ProjectList';
import BreadCrumbs from '@/components/UI/BreadCrumbs/BreadCrumbs';

const AllProjects = () => {
    return (
        <main className={styles.main}>
            <div className={styles.wrapper}>
                <BreadCrumbs />
                <section className={styles.mainProjects}>
                    <ProjectList title={'Проекты'} projects={projects.mainProjects} />
                </section>
                <section className={styles.miniProjects}>
                    <ProjectList title={'Мини-проекты'} projects={projects.miniProjects} />
                </section>
            </div>
            <GoToTop />
        </main>
    );
};

export default AllProjects;
