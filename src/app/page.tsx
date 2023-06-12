import Welcome from '@/components/page_blocks/home/Welcome';
import styles from './page.module.scss';

export default function Home() {
    return (
        <main className={styles.main}>
            <Welcome />
        </main>
    );
}
