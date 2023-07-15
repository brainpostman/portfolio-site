import { DetailedHTMLProps, HTMLAttributes, forwardRef } from 'react';
import styles from './SideMenu.module.scss';

interface SideMenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const SideMenu = forwardRef<HTMLDivElement, SideMenuProps>(
    ({ children, className: propsClassName }: SideMenuProps, ref) => {
        return (
            <div className={`${styles.container} ${propsClassName}`} ref={ref}>
                {children}
            </div>
        );
    }
);

SideMenu.displayName = 'SideMenu';

export default SideMenu;
