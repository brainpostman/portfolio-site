'use client';
import { DetailedHTMLProps, HTMLAttributes, forwardRef, useState } from 'react';
import styles from './MobileSideMenu.module.scss';
import ArrowLeft from '@p/arrow-left.svg';
import useTouchControls from '@/hooks/useTouchControls';

interface MobileSideMenuProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const MobileSideMenu = forwardRef<HTMLDivElement, MobileSideMenuProps>(
    ({ children, className: propsClassName }: MobileSideMenuProps, ref) => {
        const [active, setActive] = useState(false);
        const { onTouchStart, onTouchMove } = useTouchControls(
            () => setActive(false),
            () => setActive(true)
        );

        return (
            <div className={`${styles.container} ${propsClassName}`} ref={ref}>
                <div
                    className={styles.touchBox}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                />
                <button
                    className={`${styles.navbar_button} ${
                        active ? styles.navbar_button_active : ''
                    }`}
                    onClick={() => setActive((prev) => !prev)}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}>
                    <ArrowLeft />
                </button>
                <div
                    className={`${styles.navbar_container} ${
                        active ? styles.navbar_container_active : ''
                    }`}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}>
                    <div className={styles.navbar_panel}>{children}</div>
                </div>
            </div>
        );
    }
);

MobileSideMenu.displayName = 'MobileSideMenu';

export default MobileSideMenu;
