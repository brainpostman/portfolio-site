import TextHoverFrame from '@/components/Layout/TextHoverFrame.tsx/TextHoverFrame';
import styles from './FramedButton.module.scss';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

interface ButtonProps
    extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    btnContent?: ReactNode;
}

const FramedButton = ({ children, btnContent, ...props }: ButtonProps) => {
    return (
        <TextHoverFrame containsImg>
            <button className={styles.button} {...props}>
                {btnContent ?? <></>}
                {children}
            </button>
        </TextHoverFrame>
    );
};

export default FramedButton;
