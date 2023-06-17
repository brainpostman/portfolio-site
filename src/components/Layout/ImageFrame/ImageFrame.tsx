import Image, { ImageProps } from 'next/image';
import styles from './ImageFrame.module.scss';

interface ImageFrameProps extends ImageProps {
    link?: boolean;
    containerClassName?: string;
}

const ImageFramed = ({
    link = false,
    containerClassName = '',
    className = '',
    ...props
}: ImageFrameProps) => {
    return (
        <div
            className={`${styles.img_wrapper} ${containerClassName} ${
                link ? styles.img_wrapper_hover : ''
            }`}>
            <Image className={`${styles.img_image} ${className}`} {...props} />
            <div className={styles.borders}>
                <div className={`${styles.border} ${styles.border_topLeft} ${styles.border_up}`} />
                <div className={`${styles.border} ${styles.border_topRight} ${styles.border_up}`} />
                <div
                    className={`${styles.border} ${styles.border_bottomLeft} ${styles.border_down}`}
                />
                <div
                    className={`${styles.border} ${styles.border_bottomRight} ${styles.border_down}`}
                />
            </div>
        </div>
    );
};

export default ImageFramed;
