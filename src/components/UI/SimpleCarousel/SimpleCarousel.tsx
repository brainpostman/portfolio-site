'use client';
import {
    Children,
    DetailedHTMLProps,
    HTMLAttributes,
    forwardRef,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import styles from './SimpleCarousel.module.scss';
import FramedButton from '../FramedButton/FramedButton';
import ArrowLeft from '@p/arrow-left.svg';
import ArrowRight from '@p/arrow-right.svg';

export type AdaptiveSettings = {
    numOfEls: number;
    numOfMovedEls: number;
    gap: number;
    windowWidth: number;
    maxScreenWidth: number;
};

type CarouselSettings = Omit<AdaptiveSettings, 'maxScreenWidth'>;

interface SimpleCarouselProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    adaptiveSettings: AdaptiveSettings[];
    speed?: number;
}

const SimpleCarousel = forwardRef<HTMLDivElement, SimpleCarouselProps>(
    (
        { children, className: propsClassName = '', adaptiveSettings, speed = 800, ...props },
        ref
    ) => {
        const childElements = Children.toArray(children);

        const [maxScroll, setMaxScroll] = useState(0);
        const [moveAmount, setMoveAmount] = useState(0);
        const [translation, setTranslation] = useState(0);
        const [{ numOfEls, gap, windowWidth }, setCarouselSettings] = useState<CarouselSettings>({
            numOfEls: adaptiveSettings[adaptiveSettings.length - 1].numOfEls,
            numOfMovedEls: adaptiveSettings[adaptiveSettings.length - 1].numOfMovedEls,
            gap: adaptiveSettings[adaptiveSettings.length - 1].gap,
            windowWidth: adaptiveSettings[adaptiveSettings.length - 1].windowWidth,
        });

        const singleItemRef = useRef<HTMLDivElement>(null);

        const handleWindowResize = () => {
            if (!singleItemRef.current) return;
            let settingIndex = adaptiveSettings.length - 1;
            for (let i = 0; i < adaptiveSettings.length - 1; i++) {
                if (window.innerWidth <= adaptiveSettings[i].maxScreenWidth) {
                    settingIndex = i;
                    break;
                } else {
                    continue;
                }
            }
            const { maxScreenWidth, ...rest } = adaptiveSettings[settingIndex];
            const itemWidth = singleItemRef.current.offsetWidth + rest.gap;
            setMoveAmount(Math.ceil(itemWidth * rest.numOfMovedEls));
            setMaxScroll(Math.ceil(itemWidth * (childElements.length - rest.numOfEls)));
            setCarouselSettings({ ...rest });
            setTranslation(0);
        };

        useLayoutEffect(() => {
            handleWindowResize();
            window.addEventListener('resize', handleWindowResize);
            return () => {
                window.removeEventListener('resize', handleWindowResize);
            };
        }, []);

        const moveCarousel = (direction: 'left' | 'right') => {
            switch (direction) {
                case 'left': {
                    if (translation <= 0) break;
                    if (moveAmount + 0.01 * moveAmount > translation) {
                        setTranslation(0);
                        break;
                    }
                    setTranslation((prev) => prev - moveAmount);
                    break;
                }
                case 'right': {
                    if (translation >= maxScroll) break;
                    if (moveAmount + 0.01 * moveAmount > maxScroll - translation) {
                        setTranslation(maxScroll);
                        break;
                    }
                    setTranslation((prev) => prev + moveAmount);
                    break;
                }
                default:
                    break;
            }
        };

        return (
            <div
                className={`${styles.container} ${propsClassName}`}
                style={{ gap: `${gap / 4}px`, width: windowWidth + '%' }}
                {...props}
                ref={ref}>
                <FramedButton
                    className={`${styles.btn} ${styles.btn_left}`}
                    onClick={() => moveCarousel('left')}
                    disabled={translation <= 0}>
                    <ArrowLeft className={styles.icon} />
                </FramedButton>
                <div className={styles.window}>
                    <div
                        className={styles.items}
                        style={{
                            translate: `-${translation}px 0 0`,
                            transitionDuration: `${speed}ms`,
                        }}>
                        {childElements.map((element, index) => (
                            <div
                                key={index}
                                className={styles.element}
                                style={{
                                    flexBasis: `calc(100% / ${numOfEls} - ${gap}px)`,
                                    marginLeft: gap / 2 + 'px',
                                    marginRight: gap / 2 + 'px',
                                }}
                                ref={index === 0 ? singleItemRef : undefined}>
                                {element}
                            </div>
                        ))}
                    </div>
                </div>
                <FramedButton
                    className={`${styles.btn} ${styles.btn_right}`}
                    onClick={() => moveCarousel('right')}
                    disabled={translation >= maxScroll}>
                    <ArrowRight />
                </FramedButton>
            </div>
        );
    }
);

SimpleCarousel.displayName = 'SimpleCarousel';

export default SimpleCarousel;
