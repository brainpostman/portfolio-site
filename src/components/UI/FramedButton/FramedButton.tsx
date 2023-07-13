import TextHoverFrame from '@/components/Layout/TextHoverFrame.tsx/TextHoverFrame';
import styles from './FramedButton.module.scss';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

interface ButtonProps
    extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    btnContent?: ReactNode;
}

const FramedButton = ({
    children,
    className: propsClassName,
    btnContent,
    disabled,
    ...props
}: ButtonProps) => {
    return (
        <TextHoverFrame containsImg disabled={disabled}>
            <button className={`${styles.button} ${propsClassName}`} disabled={disabled} {...props}>
                {btnContent ?? <></>}
                {children}
            </button>
        </TextHoverFrame>
    );
};

export default FramedButton;
