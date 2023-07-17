'use client';
import ImageFramed from '@/components/Layout/ImageFramed/ImageFramed';
import styles from './ProjectListItem.module.scss';
import { forwardRef, useEffect, useRef, useState, useImperativeHandle } from 'react';
import { ProjectItemProps } from '../ProjectHomeItem/ProjectHomeItem';
import TextHoverFrame from '@/components/Layout/TextHoverFrame.tsx/TextHoverFrame';
import Link from 'next/link';
import ExpandingBlock from '@/components/UI/ExpandingBlock/ExpandingBlock';
import ArrowLeft from '@p/arrow-left.svg';

const ProjectListItem = forwardRef<HTMLElement, ProjectItemProps>(
    ({ project, className: propsClassName }, ref) => {
        const [toggle, setToggle] = useState(false);
        const [expandFlag, setExpandFlag] = useState(true);
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

        useEffect(() => {
            const mql = window.matchMedia('(max-width: 767.98px)');
            const handleMediaChange = () => {
                if (mql.matches) {
                    setExpandFlag(false);
                } else {
                    setExpandFlag(true);
                }
            };
            handleMediaChange();
            mql.addEventListener('change', handleMediaChange);
            return () => {
                mql.removeEventListener('change', handleMediaChange);
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
                    <ExpandingBlock
                        className={styles.info}
                        button={<ArrowLeft />}
                        expandFlag={expandFlag}
                        blockTitle={
                            <h3
                                ref={titleRef}
                                className={`${styles.title} ${toggle ? styles.show : ''}`}>
                                <TextHoverFrame className={styles.title_hover}>
                                    <Link href={`/projects/${project.href}`}>{project.name}</Link>
                                </TextHoverFrame>
                            </h3>
                        }>
                        <span className={`${styles.divider} ${toggle ? styles.show : ''}`} />
                        <p
                            ref={descrRef}
                            className={`${styles.descr} ${toggle ? styles.show : ''}`}>
                            {project.shortDescr}
                        </p>
                    </ExpandingBlock>
                </div>
            </article>
        );
    }
);

ProjectListItem.displayName = 'ProjectListItem';

export default ProjectListItem;
