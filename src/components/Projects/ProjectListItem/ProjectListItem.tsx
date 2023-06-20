'use client';
import ImageFramed from '@/components/Layout/ImageFramed/ImageFramed';
import styles from './ProjectListItem.module.scss';
import { Mulish } from 'next/font/google';
import { forwardRef, useRef } from 'react';
import { ProjectItemProps } from '../ProjectItem/ProjectItem';
import TextHoverFrame from '@/components/Layout/TextHoverFrame.tsx/TextHoverFrame';
import Link from 'next/link';

const adventPro = Mulish({ subsets: ['latin', 'cyrillic'] });

interface ProjectListItemProps extends ProjectItemProps {
    toggle: boolean;
}

const ProjectListItem = forwardRef<HTMLElement, ProjectListItemProps>(
    ({ project, className: propsClassName }, ref) => {
        const titleRef = useRef<HTMLHeadingElement>(null);
        const descrRef = useRef<HTMLParagraphElement>(null);
        return (
            <article ref={ref} className={`${styles.wrapper} ${propsClassName}`}>
                <div className={styles.container}>
                    <Link href={`/projects/${project.href}`}>
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
                    </Link>
                    <div className={styles.info}>
                        <h3 ref={titleRef} className={styles.title}>
                            <TextHoverFrame>
                                <Link href={`/projects/${project.href}`}>{project.name}</Link>
                            </TextHoverFrame>
                        </h3>
                        <span className={styles.divider} />
                        <p ref={descrRef} className={`${styles.descr} ${adventPro.className}`}>
                            {project.shortDescr}
                        </p>
                    </div>
                </div>
            </article>
        );
    }
);

ProjectListItem.displayName = 'ProjectListItem';

export default ProjectListItem;
