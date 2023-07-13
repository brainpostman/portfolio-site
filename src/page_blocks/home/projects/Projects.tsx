'use client';
import ProjectHomeItem from '@/components/Projects/ProjectHomeItem/ProjectHomeItem';
import styles from './Projects.module.scss';
import projects from '@/data/projects.json';
import Link from 'next/link';
import TextHoverFrame from '@/components/Layout/TextHoverFrame.tsx/TextHoverFrame';
import { useEffect, useRef } from 'react';
import SimpleCarousel, { AdaptiveSettings } from '@/components/UI/SimpleCarousel/SimpleCarousel';

const Projects = () => {
    let shownProjects = projects.mainProjects.concat(projects.miniProjects);
    const observer = useRef<IntersectionObserver>();
    const titleRef = useRef<HTMLHeadingElement>(null);
    const seeAllRef = useRef<HTMLHeadingElement>(null);
    const itemsRef = useRef<HTMLDivElement>(null);

    const carouselSettings: AdaptiveSettings[] = [
        {
            numOfEls: 1,
            numOfMovedEls: 1,
            gap: 48,
            windowWidth: 100,
            maxScreenWidth: 532.98,
        },
        {
            numOfEls: 1,
            numOfMovedEls: 1,
            gap: 48,
            windowWidth: 90,
            maxScreenWidth: 666.98,
        },
        {
            numOfEls: 1,
            numOfMovedEls: 1,
            gap: 48,
            windowWidth: 80,
            maxScreenWidth: 954.98,
        },
        {
            numOfEls: 2,
            numOfMovedEls: 2,
            gap: 48,
            windowWidth: 100,
            maxScreenWidth: 1134.98,
        },
        {
            numOfEls: 3,
            numOfMovedEls: 2,
            gap: 24,
            windowWidth: 100,
            maxScreenWidth: 1368,
        },
    ];

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
        if (titleRef.current && seeAllRef.current && itemsRef.current) {
            observer.current.observe(titleRef.current);
            observer.current.observe(seeAllRef.current);
            observer.current.observe(itemsRef.current);
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
                <SimpleCarousel
                    className={styles.items}
                    ref={itemsRef}
                    adaptiveSettings={carouselSettings}>
                    {shownProjects.map((project) => (
                        <ProjectHomeItem key={project.name} project={project} />
                    ))}
                </SimpleCarousel>
                {/* <div className={styles.items}>
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
                </div> */}
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
