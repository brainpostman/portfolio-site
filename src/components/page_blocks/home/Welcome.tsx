import ImageFramed from '@/components/ImageFrame/ImageFrame';
import styles from './Welcome.module.scss';

const Welcome = () => {
    return (
        <section className={styles.welcome}>
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <div className={styles.title}>
                        <ImageFramed
                            containerClassName={styles.img_container}
                            className={styles.img_image}
                            src={'/me.png'}
                            alt={'A handsome young man :D'}
                            fill
                        />
                        <div className={styles.title_description}>
                            <h1 className={styles.title_me}>Саттаров Марат</h1>
                            <h1 className={styles.title_me}>Frontend-разработчик</h1>
                            <div className={styles.title_divider} />
                            <h2 className={styles.title_stack}>JavaScript, TypeScript, Java</h2>
                            <h2 className={styles.title_stack}>React JS, Next JS</h2>
                            <h2 className={styles.title_stack}>HTML, CSS, SCSS, PSQL</h2>
                        </div>
                    </div>
                    <nav className={styles.navigation}>
                        <ul className={styles.navigation_list}>
                            <li>Проекты</li>
                            <div className={styles.navigation_separator} />
                            <li>О себе</li>
                            <div className={styles.navigation_separator} />
                            <li>Контакты</li>
                        </ul>
                    </nav>
                </header>
            </div>
        </section>
    );
};

export default Welcome;
