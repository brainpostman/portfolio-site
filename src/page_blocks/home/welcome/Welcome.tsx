'use client';
import ImageFramed from '@/components/Layout/ImageFramed/ImageFramed';
import styles from './Welcome.module.scss';
import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group-react-18';
import TextHoverFrame from '@/components/Layout/TextHoverFrame.tsx/TextHoverFrame';
import SideNavBar from '@/components/UI/SideNavBar/SideNavBar';
import ProjectsIcon from '@p/icon-projects.svg';
import InfoIcon from '@p/icon-info.svg';

const transitionStylesPerson = {
    enter: styles.transitionLeft_enter,
    enterActive: styles.transitionLeft_enterActive,
    enterDone: styles.transitionLeft_enterDone,
    exit: styles.transitionLeft_exit,
    exitActive: styles.transitionLeft_exitActive,
    exitDone: styles.transitionLeft_exitDone,
};
let transitionStylesNavMain = {
    enter: styles.transitionRight_enter,
    enterActive: styles.transitionRight_enterActive,
    enterDone: styles.transitionRight_enterDone,
    exit: styles.transitionRight_exit,
    exitActive: styles.transitionRight_exitActive,
    exitDone: styles.transitionRight_exitDone,
};

const Welcome = () => {
    const [navBarToggle, setNavBarToggle] = useState(false);
    const [navMainToggle, setNavMainToggle] = useState(false);
    const [titleToggle, setTitleToggle] = useState(false);
    const [scroll, setScroll] = useState(false);
    const scrollTrigger = useRef<HTMLDivElement>(null);
    const observer = useRef<IntersectionObserver>();
    const titleRef = useRef<HTMLDivElement>(null);
    const navMainRef = useRef<HTMLElement>(null);
    let myPic = '';
    const timeoutRef = useRef<number>(-1);

    const scrollToBlock = (id: string) => {
        const el = document.getElementById(id);
        el?.scrollIntoView();
    };

    useEffect(() => {
        setTitleToggle(true);
        setNavMainToggle(true);
    }, []);

    useEffect(() => {
        function scrollFunc() {
            window.clearTimeout(timeoutRef.current);
            setScroll(true);
            timeoutRef.current = window.setTimeout(() => {
                setScroll(false);
            }, 750);
        }
        window.addEventListener('scroll', scrollFunc);
        return () => {
            window.removeEventListener('scroll', scrollFunc);
        };
    }, []);

    useEffect(() => {
        const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            if (!titleToggle) return;
            if (entries[0].isIntersecting) {
                setNavBarToggle(false);
                setNavMainToggle(true);
            } else {
                setNavBarToggle(true);
                setNavMainToggle(false);
            }
        };
        observer.current = new IntersectionObserver(callback);
        if (scrollTrigger.current) {
            observer.current.observe(scrollTrigger.current);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [titleToggle]);

    return (
        <section className={styles.welcome}>
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <CSSTransition
                        in={titleToggle}
                        timeout={1000}
                        classNames={transitionStylesPerson}
                        mountOnEnter
                        unmountOnExit
                        nodeRef={titleRef}>
                        <div ref={titleRef} className={styles.title}>
                            <ImageFramed
                                containerClassName={styles.img_container}
                                className={styles.img_image}
                                src={'/me.png'}
                                alt={'A handsome young man :D'}
                                fill
                                placeholder='blur'
                                blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCABhAGEDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAIDAQX/xAAYEAEBAQEBAAAAAAAAAAAAAAAAAQIREv/EABcBAQEBAQAAAAAAAAAAAAAAAAEAAgP/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEQH/2gAMAwEAAhEDEQA/AIRTKcUy26rYWyjhbLIVjSwwApNGpNFlPSO1dJaKR0nVNEpbwoaDU2KZTiuWUthbKOFsspSNLGgC0mqap6pBNJaU0nopPRLD0vFWi8BuAVCRTMEyfMSPlXKeYpGUeNZAkyp6PSUpPRKpSUhOs4axnGaWcDQKlvJplTyPLYZIaDjWdLQAkWlp6WwpOwlithLEE7GHsKzqKGgJ0PI8q+WXLqkuM4ewtGkrQAmcZYfg4WU7CWK2E1CkbC1TSdZhYAFE7HC2K2EraS1E6rpOglAEAbG8EaWSWE1FanopHSdU0nQSgBF26WgNJLSegGSUQADTRoBZZU9AEI6ToCaKAAX/2Q=='
                            />
                            <div className={styles.title_description}>
                                <h1 className={styles.title_me}>Марат Саттаров</h1>
                                <h1 className={styles.title_job}>
                                    <span className='hl_darkest'>Frontend-разработчик</span>
                                </h1>
                                <span className={styles.title_divider} />
                                <h2 className={styles.title_stack}>
                                    JavaScript, <span className='hl_darkest'>TypeScript</span>
                                </h2>
                                <h2 className={styles.title_stack}>
                                    React JS, <span className='hl_dark'>Next JS</span>
                                </h2>
                                <h2 className={styles.title_stack}>
                                    HTML, CSS, <span className='hl_dark'>SCSS</span>,{' '}
                                    <span className='hl_darkest'>PSQL</span>
                                </h2>
                            </div>
                        </div>
                    </CSSTransition>
                    <CSSTransition
                        in={navMainToggle}
                        timeout={1000}
                        classNames={transitionStylesNavMain}
                        nodeRef={navMainRef}
                        mountOnEnter>
                        <nav ref={navMainRef} className={styles.navigation}>
                            <ul className={styles.navigation_list}>
                                <li onClick={() => scrollToBlock('projects')}>
                                    <TextHoverFrame>
                                        <span>
                                            <ProjectsIcon className={styles.icons} /> Проекты
                                        </span>
                                    </TextHoverFrame>
                                </li>
                                <span className={styles.separator} />
                                <li onClick={() => scrollToBlock('about')}>
                                    <TextHoverFrame>
                                        <span>
                                            <InfoIcon className={styles.icons} /> О себе/Контакты
                                        </span>
                                    </TextHoverFrame>
                                </li>
                            </ul>
                            <div ref={scrollTrigger} className={styles.navigation_boundary}></div>
                        </nav>
                    </CSSTransition>
                </header>
            </div>
            <SideNavBar inCSSBoolean={navBarToggle && !scroll} />
        </section>
    );
};

export default Welcome;
