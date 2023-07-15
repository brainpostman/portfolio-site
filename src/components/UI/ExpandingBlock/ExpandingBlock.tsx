'use client';
import {
    DetailedHTMLProps,
    HTMLAttributes,
    ReactNode,
    forwardRef,
    useEffect,
    useState,
} from 'react';
import styles from './ExpandingBlock.module.scss';

interface ExpandingBlockProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    blockTitle: ReactNode;
    divider?: ReactNode;
    button: ReactNode;
    expandFlag?: boolean;
}

const ExpandingBlock = forwardRef<HTMLDivElement, ExpandingBlockProps>(
    (
        {
            blockTitle,
            divider,
            button,
            expandFlag = false,
            children,
            className: propsClassName,
        }: ExpandingBlockProps,
        ref
    ) => {
        const [expand, setExpand] = useState(expandFlag);

        useEffect(() => {
            setExpand(expandFlag);
        }, [expandFlag]);

        return (
            <div className={`${styles.container} ${propsClassName}`} ref={ref}>
                <div
                    className={styles.title}
                    onClick={() => {
                        setExpand((prev) => !prev);
                    }}>
                    {blockTitle}
                    <button className={`${styles.button} ${expand ? styles.button_expanded : ''}`}>
                        {button}
                    </button>
                </div>
                {divider ? divider : <div className={styles.divider} />}
                <div className={`${styles.wrapper} ${expand ? styles.wrapper_expand : ''}`}>
                    <div className={styles.expandable}>{children}</div>
                </div>
            </div>
        );
    }
);

ExpandingBlock.displayName = 'ExpandingBlock';

export default ExpandingBlock;
