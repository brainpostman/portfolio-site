'use client';
import ImageFramed from '@/components/Layout/ImageFramed/ImageFramed';
import styles from './ProjectItem.module.scss';
import { Mulish } from 'next/font/google';
import Link from 'next/link';
import { forwardRef, useRef } from 'react';

export interface ProjectItemProps {
    project: IProjectItem;
    className?: string;
}

const adventPro = Mulish({ subsets: ['latin', 'cyrillic'] });

const ProjectHomeItem = forwardRef<HTMLElement, ProjectItemProps>(
    ({ project, className: propsClassName }, ref) => {
        const titleRef = useRef<HTMLHeadingElement>(null);
        const descrRef = useRef<HTMLParagraphElement>(null);

        return (
            <article ref={ref} className={`${styles.wrapper} ${propsClassName}`}>
                <Link href={`/projects/${project.href}`} className={styles.link}>
                    <h3 ref={titleRef} className={styles.title}>
                        {project.name}
                    </h3>
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
                    <p ref={descrRef} className={`${styles.descr} ${adventPro.className}`}>
                        {project.shortDescr}
                    </p>
                </Link>
            </article>
        );
    }
);

ProjectHomeItem.displayName = 'ProjectHomeItem';

export default ProjectHomeItem;
