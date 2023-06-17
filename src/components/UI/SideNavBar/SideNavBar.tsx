import TextHoverFrame from '@/components/Layout/TextHoverFrame.tsx/TextHoverFrame';
import { BsArrowUpCircle, BsCodeSlash, BsPersonCircle, BsTelephoneInbound } from 'react-icons/bs';
import { CSSTransition } from 'react-transition-group-react-18';
import styles from './SideNavBar.module.scss';
import { useRef } from 'react';

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
    );
};

export default SideNavBar;
