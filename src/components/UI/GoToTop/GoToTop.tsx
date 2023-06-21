'use client';
import TextHoverFrame from '@/components/Layout/TextHoverFrame.tsx/TextHoverFrame';
import { CSSTransition } from 'react-transition-group-react-18';
import styles from './GoToTop.module.scss';
import { useEffect, useRef, useState } from 'react';
import ArrowUpIcon from '@p/icon-up.svg';

const transitionStylesNavBar = {
    enter: styles.transitionBar_enter,
    enterActive: styles.transitionBar_enterActive,
    enterDone: styles.transitionBar_enterDone,
    exit: styles.transitionBar_exit,
    exitActive: styles.transitionBar_exitActive,
    exitDone: styles.transitionBar_exitDone,
};

const GoToTop = () => {
    const navBarRef = useRef<HTMLElement>(null);
    const [toggle, setToggle] = useState(false);
    useEffect(() => {
        const checkCurrentScroll = () => {
            const currentScroll = window.scrollY;
            const fullHeight = document.documentElement.scrollHeight;
            if (currentScroll / fullHeight > 0.075) {
                setToggle(true);
            } else {
                setToggle(false);
            }
        };
        checkCurrentScroll();
        window.addEventListener('scroll', checkCurrentScroll);
        return () => {
            window.removeEventListener('scroll', checkCurrentScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <CSSTransition
            in={toggle}
            timeout={200}
            classNames={transitionStylesNavBar}
            mountOnEnter
            unmountOnExit
            nodeRef={navBarRef}>
            <nav ref={navBarRef} className={styles.navbar}>
                <span className={styles.navbar_btn} onClick={scrollToTop} title={'К началу'}>
                    <TextHoverFrame>
                        <ArrowUpIcon className={styles.icons} />
                    </TextHoverFrame>
                </span>
            </nav>
        </CSSTransition>
    );
};

export default GoToTop;
