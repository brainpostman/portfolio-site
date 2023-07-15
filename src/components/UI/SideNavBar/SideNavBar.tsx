'use client';
import TextHoverFrame from '@/components/Layout/TextHoverFrame.tsx/TextHoverFrame';
import { CSSTransition } from 'react-transition-group-react-18';
import styles from './SideNavBar.module.scss';
import { forwardRef, useContext, useRef } from 'react';
import ProjectsIcon from '@p/icon-projects.svg';
import InfoIcon from '@p/icon-info.svg';
import UpArrowIcon from '@p/icon-up.svg';
import FramedButton from '../FramedButton/FramedButton';
import { CloseMenuContext } from '../MobileSideMenu/MobileSideMenu';

interface SideNavBarProps {}

const SideNavBar = forwardRef<HTMLElement, SideNavBarProps>((props: SideNavBarProps, ref) => {
    const closeMobileSideMenu = useContext(CloseMenuContext);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        closeMobileSideMenu();
    };

    const scrollToBlock = (id: string) => {
        const el = document.getElementById(id);
        el?.scrollIntoView();
        closeMobileSideMenu();
    };

    return (
        <nav ref={ref} className={styles.navbar}>
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
    );
});

SideNavBar.displayName = 'SideNavBar';

export default SideNavBar;
