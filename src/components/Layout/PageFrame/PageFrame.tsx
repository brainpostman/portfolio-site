'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './PageFrame.module.scss';
import { CSSTransition } from 'react-transition-group-react-18';

const transitionStylesTopLeft = {
    enter: styles.transitionTopLeft_enter,
    enterActive: styles.transitionTopLeft_enterActive,
    enterDone: styles.transitionTopLeft_enterDone,
    exit: styles.transitionTopLeft_exit,
    exitActive: styles.transitionTopLeft_exitActive,
    exitDone: styles.transitionTopLeft_exitDone,
};

const transitionStylesTopRight = {
    enter: styles.transitionTopRight_enter,
    enterActive: styles.transitionTopRight_enterActive,
    enterDone: styles.transitioTopRightt_enterDone,
    exit: styles.transitionTopRight_exit,
    exitActive: styles.transitionTopRight_exitActive,
    exitDone: styles.transitionTopRight_exitDone,
};

const transitionStylesBottomLeft = {
    enter: styles.transitionBottomLeft_enter,
    enterActive: styles.transitionBottomLeft_enterActive,
    enterDone: styles.transitionBottomLeft_enterDone,
    exit: styles.transitionBottomLeft_exit,
    exitActive: styles.transitionBottomLeft_exitActive,
    exitDone: styles.transitionBottomLeft_exitDone,
};

const transitionStylesBottomRight = {
    enter: styles.transitionBottomRight_enter,
    enterActive: styles.transitionBottomRight_enterActive,
    enterDone: styles.transitionBottomRight_enterDone,
    exit: styles.transitionBottomRight_exit,
    exitActive: styles.transitionBottomRight_exitActive,
    exitDone: styles.transitionBottomRight_exitDone,
};

const PageFrame = () => {
    const topLeftRef = useRef<HTMLDivElement>(null);
    const topRightRef = useRef<HTMLDivElement>(null);
    const bottomLeftRef = useRef<HTMLDivElement>(null);
    const bottomRightRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<number>(-1);
    const delay = 800;
    const [inBool, setInBool] = useState(false);

    useEffect(() => {
        setInBool(true);
        function scrollFunc() {
            window.clearTimeout(timeoutRef.current);
            setInBool(false);
            timeoutRef.current = window.setTimeout(() => {
                setInBool(true);
            }, 300);
        }
        window.addEventListener('scroll', scrollFunc);
        return () => {
            window.removeEventListener('scroll', scrollFunc);
        };
    }, []);

    return (
        <div className={styles.frame}>
            <CSSTransition
                in={inBool}
                timeout={delay}
                classNames={transitionStylesTopLeft}
                mountOnEnter
                unmountOnExit
                nodeRef={topLeftRef}>
                <div
                    ref={topLeftRef}
                    className={`${styles.border} ${styles.border_left} ${styles.border_up}`}
                />
            </CSSTransition>
            <CSSTransition
                in={inBool}
                timeout={delay}
                classNames={transitionStylesTopRight}
                mountOnEnter
                unmountOnExit
                nodeRef={topRightRef}>
                <div
                    ref={topRightRef}
                    className={`${styles.border} ${styles.border_right} ${styles.border_up}`}
                />
            </CSSTransition>
            <CSSTransition
                in={inBool}
                timeout={delay}
                classNames={transitionStylesBottomLeft}
                mountOnEnter
                unmountOnExit
                nodeRef={bottomLeftRef}>
                <div
                    ref={bottomLeftRef}
                    className={`${styles.border} ${styles.border_left} ${styles.border_down}`}
                />
            </CSSTransition>
            <CSSTransition
                in={inBool}
                timeout={delay}
                classNames={transitionStylesBottomRight}
                mountOnEnter
                unmountOnExit
                nodeRef={bottomRightRef}>
                <div
                    ref={bottomRightRef}
                    className={`${styles.border} ${styles.border_right} ${styles.border_down}`}
                />
            </CSSTransition>
        </div>
    );
};

export default PageFrame;
