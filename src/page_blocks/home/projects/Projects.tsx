'use client';
import ProjectHomeItem from '@/components/Projects/ProjectHomeItem/ProjectItem';
import styles from './Projects.module.scss';
import projects from '@/data/projects.json';
import Link from 'next/link';
import TextHoverFrame from '@/components/Layout/TextHoverFrame.tsx/TextHoverFrame';
import { useEffect, useRef } from 'react';

const Projects = () => {
    let shownProjects = projects.mainProjects;
    if (shownProjects.length < 3) {
        shownProjects = shownProjects.concat(projects.miniProjects.slice(0, 1));
    }

    const observer = useRef<IntersectionObserver>();
    const titleRef = useRef<HTMLHeadingElement>(null);
    const seeAllRef = useRef<HTMLHeadingElement>(null);
    const itemRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.show);
                }
            });
        };
        observer.current = new IntersectionObserver(callback);
        if (!observer.current) return;
        if (titleRef.current && seeAllRef.current && itemRefs.current) {
            observer.current.observe(titleRef.current);
            observer.current.observe(seeAllRef.current);
            itemRefs.current.forEach((el) => {
                if (el) {
                    observer.current?.observe(el);
                }
            });
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, []);

    return (
        <section id='projects' className={styles.projects}>
            <div className={styles.wrapper}>
                <h1 className={styles.title} ref={titleRef}>
                    Проекты
                </h1>
                <div className={styles.items}>
                    {shownProjects.map((project) => (
                        <ProjectHomeItem
                            key={project.name}
                            project={project}
                            ref={(ref: HTMLElement) => {
                                itemRefs.current.push(ref);
                            }}
                            className={styles.item}
                        />
                    ))}
                </div>
                <h2 className={styles.seeAll} ref={seeAllRef}>
                    <Link href={'/projects'}>
                        <TextHoverFrame>Смотреть все →</TextHoverFrame>
                    </Link>
                </h2>
            </div>
        </section>
    );
};

export default Projects;
