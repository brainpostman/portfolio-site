'use client';
import ImageFramed from '@/components/Layout/ImageFramed/ImageFramed';
import styles from './ProjectListItem.module.scss';
import { forwardRef, useEffect, useRef, useState, useImperativeHandle } from 'react';
import { ProjectItemProps } from '../ProjectHomeItem/ProjectItem';
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
                if (toggle) return;
                if (records[0].type !== 'attributes' && records[0].attributeName !== 'class')
                    return;
                const target = records[0].target as Element;
                if (target.className.includes('show') && !toggle) {
                    setToggle(true);
                } else {
                    setToggle(false);
                }
            };
            mutationRef.current = new MutationObserver(mutationCb);
            if (parentRef.current)
                mutationRef.current.observe(parentRef.current, { attributes: true });
            return () => {
                mutationRef.current?.disconnect();
            };
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
                                placeholder='blur'
                                blurDataURL={project.blurImg}
                            />
                        </div>
                    </Link>
                    <div className={styles.info}>
                        <h3
                            ref={titleRef}
                            className={`${styles.title} ${toggle ? styles.show : ''}`}>
                            <TextHoverFrame className={styles.title_hover}>
                                <Link href={`/projects/${project.href}`}>{project.name}</Link>
                            </TextHoverFrame>
                        </h3>
                        <span className={`${styles.divider} ${toggle ? styles.show : ''}`} />
                        <p
                            ref={descrRef}
                            className={`${styles.descr} ${toggle ? styles.show : ''}`}>
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
