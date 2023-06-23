'use client';
import Image, { ImageProps } from 'next/image';
import styles from './ImageFramed.module.scss';
import { forwardRef } from 'react';

interface ImageFrameProps extends ImageProps {
    link?: boolean;
    containerClassName?: string;
}

const ImageFramed = forwardRef<HTMLDivElement, ImageFrameProps>(
    ({ link = false, containerClassName = '', className = '', ...props }: ImageFrameProps, ref) => {
        return (
            <div
                className={`${styles.img_wrapper} ${containerClassName} ${
                    link ? styles.img_wrapper_hover : ''
                }`}
                ref={ref}>
                <Image className={`${styles.img_image} ${className}`} {...props} />
                <div className={styles.borders}>
                    <div
                        className={`${styles.border} ${styles.border_topLeft} ${styles.border_up}`}
                    />
                    <div
                        className={`${styles.border} ${styles.border_topRight} ${styles.border_up}`}
                    />
                    <div
                        className={`${styles.border} ${styles.border_bottomLeft} ${styles.border_down}`}
                    />
                    <div
                        className={`${styles.border} ${styles.border_bottomRight} ${styles.border_down}`}
                    />
                </div>
            </div>
        );
    }
);

ImageFramed.displayName = 'ImageFramed';

export default ImageFramed;
