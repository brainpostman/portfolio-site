'use client';
import { useEffect, useRef } from 'react';
import styles from './About.module.scss';

const About = () => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const observer = useRef<IntersectionObserver>();
    const infoRefs = useRef<(HTMLDivElement | null)[]>([]);
    const paragRefs = useRef<(HTMLParagraphElement | null)[]>([]);
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
        if (titleRef.current) {
            observer.current.observe(titleRef.current);
        }
        if (infoRefs.current) {
            infoRefs.current.forEach((el) => {
                if (el) observer.current?.observe(el);
            });
        }
        if (paragRefs.current) {
            paragRefs.current.forEach((el) => {
                if (el) observer.current?.observe(el);
            });
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, []);
    return (
        <section id='about' className={styles.about}>
            <div className={styles.wrapper}>
                <h1 className={styles.title} ref={titleRef}>
                    О себе
                </h1>
                <div className={styles.info}>
                    <div className={styles.info_item} ref={(ref) => infoRefs.current.push(ref)}>
                        <h2 className={styles.info_item_title}>Языки программирования:</h2>
                        <div className={styles.divider} />
                        <ul className={styles.info_item_list}>
                            <li>JavaScript (до ES12)</li>
                            <li>Typescript</li>
                            <li>Java (Collections Framework, Core, Stream API, Java 8)</li>
                        </ul>
                    </div>
                    <div className={styles.info_item} ref={(ref) => infoRefs.current.push(ref)}>
                        <h2 className={styles.info_item_title}>Фреймворки:</h2>
                        <div className={styles.divider} />
                        <ul className={styles.info_item_list}>
                            <li>React JS</li>
                            <li>Next JS</li>
                        </ul>
                    </div>
                    <div className={styles.info_item} ref={(ref) => infoRefs.current.push(ref)}>
                        <h2 className={styles.info_item_title}>Другое:</h2>
                        <div className={styles.divider} />
                        <ul className={styles.info_item_list}>
                            <li>HTML, CSS</li>
                            <li>SCSS</li>
                            <li>PostgreSQL</li>
                            <li>Figma</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.descr}>
                    <p
                        className={styles.descr_paragraph}
                        ref={(ref) => paragRefs.current.push(ref)}>
                        В 2021-2022 году проходил обучение по программе «Java-разработчик», планируя
                        заняться backend-разработкой на основе фреймворка Spring. Однако,
                        ознакомившись с языком JavaScript, решил переключиться на
                        Frontend-разаработку, самостоятельно освоив соответствующий стек технологий.
                    </p>
                    <p
                        className={styles.descr_paragraph}
                        ref={(ref) => paragRefs.current.push(ref)}>
                        С марта по май 2023 года проходил стажировку на позицию
                        Frontend-разработчика в компании Hotels.ru. На текущий момент вместе с рядом
                        участников стажировки занимаемся разработкой платформы для объединения
                        одиночных разработчиков в команды для совместной работы над проектами.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
