import Welcome from '@/page_blocks/home/Welcome/Welcome.tsx';
import styles from './page.module.scss';
import Projects from '@/page_blocks/home/Projects/Projects.tsx';
import About from '@/page_blocks/home/About/About.tsx';

export default function Home() {
    return (
        <main className={styles.main}>
            <Welcome />
            <Projects />
            <About />
        </main>
    );
}
