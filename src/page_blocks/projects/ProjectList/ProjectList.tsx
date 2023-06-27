'use client';
import ProjectListItem from '@/components/Projects/ProjectListItem/ProjectListItem';
import styles from './ProjectList.module.scss';
import { useEffect, useRef } from 'react';
import { IProjectItem } from '@/types/IProjectItem';

interface ProjectListProps {
    title: string;
    projects: IProjectItem[];
}

const ProjectList = ({ title, projects }: ProjectListProps) => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const itemRefs = useRef<(HTMLElement | null)[]>([]);
    const observer = useRef<IntersectionObserver>();

    useEffect(() => {
        const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.show);
                }
            });
        };
        observer.current = new IntersectionObserver(callback);
        if (observer.current) {
            if (titleRef.current && itemRefs.current) {
                observer.current.observe(titleRef.current);
                itemRefs.current.forEach((item) => {
                    if (item) {
                        observer.current?.observe(item);
                    }
                });
            }
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, []);

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title} ref={titleRef}>
                {title}
            </h1>
            <div className={styles.items}>
                {projects.map((project) => {
                    return (
                        <ProjectListItem
                            project={project}
                            key={project.name}
                            ref={(ref: HTMLElement) => {
                                itemRefs.current.push(ref);
                            }}
                            className={styles.item}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ProjectList;
