import ImageFramed from '@/components/Layout/ImageFramed/ImageFramed';
import styles from './ProjectPage.module.scss';


interface ProjectPageProps {
    project: IProjectItem;
}

const ProjectPage = ({ project }: ProjectPageProps) => {
    return (
        <section className={styles.info}>
            <div className={styles.info_primary}>
                <ImageFramed src={''} alt={''} />
            </div>
            <div className={styles.info_secondary}></div>
        </section>
    );
};

export default ProjectPage;
