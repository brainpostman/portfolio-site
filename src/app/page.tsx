import Welcome from '@/page_blocks/home/Welcome/Welcome';
import styles from './page.module.scss';
import Projects from '@/page_blocks/home/Projects/Projects';
import { RefObject } from 'react';

export default function Home() {
    observer.current = new IntersectionObserver(callback);
    return (
        <main className={styles.main}>
            <Welcome />
            <Projects />
        </main>
    );
}
