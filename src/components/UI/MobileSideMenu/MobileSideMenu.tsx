'use client';
import { DetailedHTMLProps, HTMLAttributes, createContext, forwardRef, useState } from 'react';
import styles from './MobileSideMenu.module.scss';
import ArrowLeft from '@p/arrow-left.svg';
import useTouchControls from '@/hooks/useTouchControls';

interface MobileSideMenuProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const CloseMenuContext = createContext<() => void>(() => {});

const MobileSideMenu = forwardRef<HTMLDivElement, MobileSideMenuProps>(
    ({ children, className: propsClassName }: MobileSideMenuProps, ref) => {
        const [active, setActive] = useState(false);

        const { onTouchStart, onTouchMove } = useTouchControls(
            () => setActive(false),
            () => setActive(true)
        );

        return (
            <div
                className={`${styles.container} ${propsClassName} ${
                    active ? styles.container_active : ''
                }`}
                ref={ref}>
                {!active && (
                    <div
                        className={styles.touchBox}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                    />
                )}
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
                    className={styles.navbar_container}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}>
                    <div className={styles.navbar_panel}>
                        <CloseMenuContext.Provider value={() => setActive(false)}>
                            {children}
                        </CloseMenuContext.Provider>
                    </div>
                </div>
            </div>
        );
    }
);

MobileSideMenu.displayName = 'MobileSideMenu';

export default MobileSideMenu;
