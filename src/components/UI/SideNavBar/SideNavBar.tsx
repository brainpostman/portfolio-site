'use client';
import TextHoverFrame from '@/components/Layout/TextHoverFrame.tsx/TextHoverFrame';
import { CSSTransition } from 'react-transition-group-react-18';
import styles from './SideNavBar.module.scss';
import { useRef } from 'react';
import ProjectsIcon from '@p/icon-projects.svg';
import InfoIcon from '@p/icon-info.svg';
import UpArrowIcon from '@p/icon-up.svg';
import FramedButton from '../FramedButton/FramedButton';

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
        <div className={styles.container}>
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
                            <FramedButton btnContent={<UpArrowIcon className={styles.icons} />} />
                        </li>
                        <span className={styles.separator} />
                        <li onClick={() => scrollToBlock('projects')} title={'Проекты'}>
                            <FramedButton btnContent={<ProjectsIcon className={styles.icons} />} />
                        </li>
                        <span className={styles.separator} />
                        <li onClick={() => scrollToBlock('about')} title={'О себе/Контакты'}>
                            <FramedButton btnContent={<InfoIcon className={styles.icons} />} />
                        </li>
                    </ul>
                </nav>
            </CSSTransition>
        </div>
    );
};

export default SideNavBar;
