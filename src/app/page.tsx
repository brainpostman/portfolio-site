import Welcome from '@/page_blocks/home/welcome/Welcome';
import styles from './page.module.scss';
import Projects from '@/page_blocks/home/projects/Projects';

export default function Home() {
    return (
        <main className={styles.main}>
            <Welcome />
            <Projects />
        </main>
    );
}
