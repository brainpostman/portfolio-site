'use client';
import ImageFramed from '@/components/Layout/ImageFramed/ImageFramed';
import styles from './ProjectHomeItem.module.scss';
import Link from 'next/link';
import { forwardRef, useRef } from 'react';
import { IProjectItem } from '@/types/IProjectItem';

export interface ProjectItemProps {
    project: IProjectItem;
    className?: string;
}

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
                            placeholder='blur'
                            blurDataURL={project.blurImg}
                            fill
                            link
                        />
                    </div>
                    <p ref={descrRef} className={styles.descr}>
                        {project.shortDescr}
                    </p>
                </Link>
            </article>
        );
    }
);

ProjectHomeItem.displayName = 'ProjectHomeItem';

export default ProjectHomeItem;
