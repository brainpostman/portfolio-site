import Image, { ImageProps } from 'next/image';
import styles from './ImageFrame.module.scss';

interface ImageFrameProps extends ImageProps {
    containerClassName?: string;
}

const ImageFramed = ({ containerClassName = '', className = '', ...props }: ImageFrameProps) => {
    return (
        <div className={`${styles.img_wrapper} ${containerClassName}`}>
            <Image className={`${styles.img_image} ${className}`} {...props} />
            <div className={styles.borders}>
                <div className={`${styles.border} ${styles.border_left} ${styles.border_up}`} />
                <div className={`${styles.border} ${styles.border_right} ${styles.border_up}`} />
                <div className={`${styles.border} ${styles.border_left} ${styles.border_down}`} />
                <div className={`${styles.border} ${styles.border_right} ${styles.border_down}`} />
            </div>
        </div>
    );
};

export default ImageFramed;
