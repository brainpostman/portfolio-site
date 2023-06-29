'use client';
import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group-react-18';
import styles from './Footer.module.scss';
import TextHoverFrame from '../TextHoverFrame.tsx/TextHoverFrame';

const transitionStylesBottom = {
    enter: styles.transitionBottom_enter,
    enterActive: styles.transitionBottom_enterActive,
    enterDone: styles.transitionBottom_enterDone,
    exit: styles.transitionBottom_exit,
    exitActive: styles.transitionBottom_exitActive,
    exitDone: styles.transitionBottom_exitDone,
};

const Footer = () => {
    const paragRef = useRef<HTMLElement>(null);
    const [toggle, setToggle] = useState(false);
    useEffect(() => {
        const checkCurrentScroll = () => {
            console.log(window.innerHeight + Math.ceil(window.scrollY), document.body.scrollHeight);
            if (
                window.innerHeight + Math.ceil(window.scrollY) >=
                document.body.scrollHeight * 0.8
            ) {
                console.log(window.innerHeight + window.scrollY, document.body.scrollHeight);
                setToggle(true);
                console.log('true');
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
    return (
        <CSSTransition
            in={toggle}
            timeout={800}
            classNames={transitionStylesBottom}
            mountOnEnter
            unmountOnExit
            nodeRef={paragRef}>
            <footer ref={paragRef} className={styles.footer}>
                © 2023, Саттаров Марат
            </footer>
        </CSSTransition>
    );
};

export default Footer;
