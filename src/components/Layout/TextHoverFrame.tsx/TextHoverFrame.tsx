import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './TextHoverFrame.module.scss';

interface TextHoverFrameProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const TextHoverFrame = ({ children }: TextHoverFrameProps) => {
    return (
        <div className={styles.wrapper}>
            {children}

            <div className={`${styles.border} ${styles.border_topLeft} ${styles.border_up}`} />
            <div className={`${styles.border} ${styles.border_topRight} ${styles.border_up}`} />
            <div className={`${styles.border} ${styles.border_bottomLeft} ${styles.border_down}`} />
            <div
                className={`${styles.border} ${styles.border_bottomRight} ${styles.border_down}`}
            />
        </div>
    );
};

export default TextHoverFrame;