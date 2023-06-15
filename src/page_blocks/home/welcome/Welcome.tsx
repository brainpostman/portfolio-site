'use client';
import ImageFramed from '@/components/ImageFrame/ImageFrame';
import styles from './Welcome.module.scss';
import { BsArrowUpCircle, BsPersonCircle, BsTelephoneInbound, BsCodeSlash } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group-react-18';
import TextHoverFrame from '@/components/TextHoverFrame.tsx/TextHoverFrame';

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
const transitionStylesNavBar = {
    enter: styles.transitionBar_enter,
    enterActive: styles.transitionBar_enterActive,
    enterDone: styles.transitionBar_enterDone,
    exit: styles.transitionBar_exit,
    exitActive: styles.transitionBar_exitActive,
    exitDone: styles.transitionBar_exitDone,
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
    const navBarRef = useRef<HTMLElement>(null);
    const timeoutRef = useRef<number>(-1);
    let navDelay = 800;

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

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
        if (titleToggle) {
            transitionStylesNavMain = {
                enter: styles.transitionTop_enter,
                enterActive: styles.transitionTop_enterActive,
                enterDone: styles.transitionTop_enterDone,
                exit: styles.transitionTop_exit,
                exitActive: styles.transitionTop_exitActive,
                exitDone: styles.transitionTop_exitDone,
            };
        }
        navDelay = 500;
    }, [titleToggle]);

    useEffect(() => {
        const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            if (titleToggle) {
                if (entries[0].isIntersecting) {
                    setNavBarToggle(false);
                    setNavMainToggle(true);
                    console.log('in sight');
                } else {
                    setNavBarToggle(true);
                    setNavMainToggle(false);
                    console.log('out of sight');
                }
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
                        timeout={650}
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
                            />
                            <div className={styles.title_description}>
                                <h1 className={styles.title_me}>Саттаров Марат</h1>
                                <h1 className={styles.title_me}>
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
                        timeout={navDelay}
                        classNames={transitionStylesNavMain}
                        nodeRef={navMainRef}
                        mountOnEnter>
                        <nav ref={navMainRef} className={styles.navigation}>
                            <ul className={styles.navigation_list}>
                                <li onClick={() => scrollToBlock('projects')}>
                                    <TextHoverFrame>
                                        <span>
                                            Проекты <BsCodeSlash className={styles.icons} />
                                        </span>
                                    </TextHoverFrame>
                                </li>
                                <span className={styles.separator} />
                                <li onClick={() => scrollToBlock('about')}>
                                    <TextHoverFrame>
                                        <span>
                                            О себе <BsPersonCircle className={styles.icons} />
                                        </span>
                                    </TextHoverFrame>
                                </li>
                                <span className={styles.separator} />
                                <li onClick={() => scrollToBlock('contacts')}>
                                    <TextHoverFrame>
                                        <span>
                                            Контакты <BsTelephoneInbound className={styles.icons} />
                                        </span>
                                    </TextHoverFrame>
                                </li>
                            </ul>
                            <div ref={scrollTrigger} className={styles.navigation_boundary}></div>
                        </nav>
                    </CSSTransition>
                </header>
            </div>
            <CSSTransition
                in={navBarToggle && !scroll}
                timeout={200}
                classNames={transitionStylesNavBar}
                mountOnEnter
                unmountOnExit
                nodeRef={navBarRef}>
                <nav ref={navBarRef} className={styles.navbar}>
                    <ul className={styles.navbar_list}>
                        <li onClick={scrollToTop} title={'К началу'}>
                            <TextHoverFrame>
                                <BsArrowUpCircle className={styles.icons} />
                            </TextHoverFrame>
                        </li>
                        <span className={styles.separator} />
                        <li onClick={() => scrollToBlock('projects')} title={'Проекты'}>
                            <TextHoverFrame>
                                <BsCodeSlash className={styles.icons} />
                            </TextHoverFrame>
                        </li>
                        <span className={styles.separator} />
                        <li onClick={() => scrollToBlock('about')} title={'О себе'}>
                            <TextHoverFrame>
                                <BsPersonCircle className={styles.icons} />{' '}
                            </TextHoverFrame>
                        </li>
                        <span className={styles.separator} />
                        <li onClick={() => scrollToBlock('contacts')} title={'Контакты'}>
                            <TextHoverFrame>
                                <BsTelephoneInbound className={styles.icons} />{' '}
                            </TextHoverFrame>
                        </li>
                    </ul>
                </nav>
            </CSSTransition>
        </section>
    );
};

export default Welcome;
