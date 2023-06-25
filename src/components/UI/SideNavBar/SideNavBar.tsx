'use client';
import TextHoverFrame from '@/components/Layout/TextHoverFrame.tsx/TextHoverFrame';
import { CSSTransition } from 'react-transition-group-react-18';
import styles from './SideNavBar.module.scss';
import { useEffect, useRef } from 'react';
import ProjectsIcon from '@p/icon-projects.svg';
import InfoIcon from '@p/icon-info.svg';
import { MdOutlinePhone } from 'react-icons/md';
import UpArrowIcon from '@p/icon-up.svg';

interface SideNavBarProps {
    inCSSBoolean: boolean;
}

const transitionStylesNavBar = {
    enter: styles.transitionBar_enter,
    enterActive: styles.transitionBar_enterActive,
    enterDone: styles.transitionBar_enterDone,
    exit: styles.transitionBar_exit,
    exitActive: styles.transitionBar_exitActive,
    exitDone: styles.transitionBar_exitDone,
};

const SideNavBar = ({ inCSSBoolean }: SideNavBarProps) => {
    const navBarRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!navBarRef.current) return;
        const height = navBarRef.current.style.height;
        const width = navBarRef.current.style.width;
        navBarRef.current.style.top = `calc(50vh - ${parseInt(height) / 2}px)`;
        navBarRef.current.style.right = `calc(3.75vw + ${parseInt(width) / 2}px)`;
    }, []);

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

    return (
        <CSSTransition
            in={inCSSBoolean}
            timeout={200}
            classNames={transitionStylesNavBar}
            mountOnEnter
            unmountOnExit
            nodeRef={navBarRef}>
            <nav ref={navBarRef} className={styles.navbar}>
                <ul className={styles.navbar_list}>
                    <li onClick={scrollToTop} title={'К началу'}>
                        <TextHoverFrame>
                            <UpArrowIcon className={styles.icons} />
                        </TextHoverFrame>
                    </li>
                    <span className={styles.separator} />
                    <li onClick={() => scrollToBlock('projects')} title={'Проекты'}>
                        <TextHoverFrame>
                            <ProjectsIcon className={styles.icons} />
                        </TextHoverFrame>
                    </li>
                    <span className={styles.separator} />
                    <li onClick={() => scrollToBlock('about')} title={'О себе/Контакты'}>
                        <TextHoverFrame>
                            <InfoIcon className={styles.icons} />{' '}
                        </TextHoverFrame>
                    </li>
                </ul>
            </nav>
        </CSSTransition>
    );
};

export default SideNavBar;
