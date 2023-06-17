import Welcome from '@/page_blocks/home/Welcome/Welcome';
import styles from './page.module.scss';
import Projects from '@/page_blocks/home/Projects/Projects';

export default function Home() {
    return (
        <main className={styles.main}>
            <Welcome />
            <Projects />
        </main>
    );
}
