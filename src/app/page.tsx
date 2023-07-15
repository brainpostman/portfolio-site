import Welcome from '@/page_blocks/home/welcome/Welcome';
import styles from './page.module.scss';
import Projects from '@/page_blocks/home/projects/Projects';
import About from '@/page_blocks/home/About/About';

export default function Home() {
    return (
        <main className={styles.main}>
            <Welcome />
            <Projects />
            {/* <About /> */}
        </main>
    );
}
