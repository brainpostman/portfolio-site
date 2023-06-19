'use client';
import Projects from '../Projects/Projects';
import Welcome from '../Welcome/Welcome';
import styles from './WrapperWithIntObs.module.scss';

const WrapperWithIntObs = () => {
    const elMap = new Map<Element, { intersCb: () => void; notintersCb: () => void }>();
    const addToElMap = (
        el: HTMLElement,
        callbacks: { intersCb: () => void; notintersCb: () => void }
    ) => {
        elMap.set(el, callbacks);
    };
    const intObsCallback = (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
    ) => {
        entries.forEach((entry) => {
            const callbacks = elMap.get(entry.target);
            if (entry.isIntersecting) {
                callbacks?.intersCb();
            } else {
                callbacks?.notintersCb();
            }
        });
    };
    const observer = new IntersectionObserver(intObsCallback);

    return (
        <div className={styles.wrapper}>
            <Welcome />
            <Projects />
        </div>
    );
};
