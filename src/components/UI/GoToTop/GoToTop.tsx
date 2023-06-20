'use client';
import TextHoverFrame from '@/components/Layout/TextHoverFrame.tsx/TextHoverFrame';
import { BsArrowUpCircle } from 'react-icons/bs';
import { CSSTransition } from 'react-transition-group-react-18';
import styles from './GoToTop.module.scss';
import { useEffect, useRef, useState } from 'react';

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
                console.log('true');
            } else {
                setToggle(false);
                console.log('false');
            }
        };
        window.addEventListener('scroll', checkCurrentScroll);
        return () => {
            window.removeEventListener('scroll', checkCurrentScroll);
        };
    }, [window.scrollY]);

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
                        <BsArrowUpCircle className={styles.icons} />
                    </TextHoverFrame>
                </span>
            </nav>
        </CSSTransition>
    );
};

export default GoToTop;
