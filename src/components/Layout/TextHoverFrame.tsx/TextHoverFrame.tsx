import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './TextHoverFrame.module.scss';

interface TextHoverFrameProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    containsImg?: boolean;
    disabled?: boolean;
}

const TextHoverFrame = ({
    children,
    containsImg = false,
    disabled = false,
}: TextHoverFrameProps) => {
    return disabled ? (
        <div className={styles.wrapper} style={containsImg ? { lineHeight: 0 } : {}}>
            {children}
        </div>
    ) : (
        <div className={styles.wrapper} style={containsImg ? { lineHeight: 0 } : {}}>
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
