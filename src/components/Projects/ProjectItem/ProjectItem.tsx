'use client';
import ImageFramed from '@/components/Layout/ImageFramed/ImageFramed';
import styles from './ProjectItem.module.scss';
import { Mulish } from 'next/font/google';
import Link from 'next/link';

interface ProjectItemProps {
    project: IProjectItem;
}

const adventPro = Mulish({ subsets: ['latin', 'cyrillic'] });

const ProjectItem = ({ project }: ProjectItemProps) => {
    return (
        <article className={styles.wrapper}>
            <Link href={''} className={styles.link}>
                <h3 className={styles.title}>{project.name}</h3>
                <div className={styles.img}>
                    <ImageFramed
                        src={project.img}
                        alt={project.name}
                        containerClassName={styles.img_container}
                        className={styles.img_image}
                        fill
                        link
                    />
                </div>
                <p className={`${styles.descr} ${adventPro.className}`}>{project.shortDescr}</p>
            </Link>
        </article>
    );
};

export default ProjectItem;
