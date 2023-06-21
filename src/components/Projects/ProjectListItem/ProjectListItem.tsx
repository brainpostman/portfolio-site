'use client';
import ImageFramed from '@/components/Layout/ImageFramed/ImageFramed';
import styles from './ProjectListItem.module.scss';
import { forwardRef, useEffect, useRef, useState, useImperativeHandle } from 'react';
import { ProjectItemProps } from '../ProjectItem/ProjectItem';
import TextHoverFrame from '@/components/Layout/TextHoverFrame.tsx/TextHoverFrame';
import Link from 'next/link';

const ProjectListItem = forwardRef<HTMLElement, ProjectItemProps>(
    ({ project, className: propsClassName }, ref) => {
        const [toggle, setToggle] = useState(false);
        const titleRef = useRef<HTMLHeadingElement>(null);
        const descrRef = useRef<HTMLParagraphElement>(null);
        const parentRef = useRef<HTMLElement>(null);
        const mutationRef = useRef<MutationObserver>();
        useImperativeHandle<HTMLElement | null, HTMLElement | null>(ref, () => parentRef.current);
        useEffect(() => {
            const mutationCb = (records: MutationRecord[], observer: MutationObserver) => {
                records[0];
            };
            // if (lastClass && lastClass.includes('show')) {
            //     setToggle(true);
            //     console.log('shown');
            // } else {
            //     setToggle(false);
            // }
            mutationRef.current = new MutationObserver(mutationCb);
            if (parentRef.current) mutationRef.current.observe(parentRef.current);
            return () => {
                mutationRef.current?.disconnect();
            }
        }, []);
        return (
            <article ref={parentRef} className={`${styles.wrapper} ${propsClassName}`}>
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
                        <p ref={descrRef} className={styles.descr}>
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
