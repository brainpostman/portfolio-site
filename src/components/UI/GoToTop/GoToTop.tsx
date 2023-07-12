'use client';
import { CSSTransition } from 'react-transition-group-react-18';
import styles from './GoToTop.module.scss';
import { useEffect, useRef, useState } from 'react';
import ArrowUpIcon from '@p/icon-up.svg';
import FramedButton from '../FramedButton/FramedButton';

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
            if (currentScroll > window.screen.availHeight / 4) {
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
        <div className={styles.container}>
            <CSSTransition
                in={toggle}
                timeout={600}
                classNames={transitionStylesNavBar}
                nodeRef={navBarRef}
                mountOnEnter
                unmountOnExit>
                <nav ref={navBarRef} className={styles.navbar}>
                    <span className={styles.navbar_btn} onClick={scrollToTop} title={'К началу'}>
                        <FramedButton btnContent={<ArrowUpIcon className={styles.icons} />} />
                    </span>
                </nav>
            </CSSTransition>
        </div>
    );
};

export default GoToTop;
