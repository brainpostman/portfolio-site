import {
    Children,
    DetailedHTMLProps,
    HTMLAttributes,
    forwardRef,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import styles from './SimpleCarousel.module.scss';
import FramedButton from '../FramedButton/FramedButton';
import ArrowLeft from '@p/arrow_left.svg';
import ArrowRight from '@p/arrow_right.svg';

interface SimpleCarouselProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    numOfEls?: number;
    numOfMovedEls?: number;
    gap?: number;
}

const SimpleCarousel = forwardRef<HTMLDivElement, SimpleCarouselProps>(
    (
        {
            children,
            className: propsClassName = '',
            numOfEls = 1,
            numOfMovedEls = 1,
            gap = 0,
            ...props
        },
        ref
    ) => {
        const childElements = Children.toArray(children);

        const [itemsWidth, setItemsWidth] = useState(0);
        const [itemWidth, setItemWidth] = useState(0);
        const [maxScroll, setMaxScroll] = useState(0);
        const [currentItem, setCurrentItem] = useState(0);

        const itemsRef = useRef<HTMLDivElement>(null);
        const itemRef = useRef<HTMLDivElement[]>([]);

        const gapPx = gap ? gap + 'px' : 0;
        const halfGapPx = gap ? gap / 2 + 'px' : 0;

        useLayoutEffect(() => {
            if (!itemsRef.current || !itemRef.current) return;
            setItemsWidth(itemsRef.current.offsetWidth);
            setMaxScroll(itemsRef.current.scrollWidth - itemsRef.current.clientWidth);
            setItemWidth(itemRef.current[0].offsetWidth + gap);
        }, []);

        const moveCarousel = (direction: 'left' | 'right') => {
            if (!itemsRef.current) return;
            switch (direction) {
                case 'left': {
                    if (itemsRef.current.scrollLeft === 0) break;
                    let moveAmount = numOfMovedEls * itemWidth;
                    if (moveAmount > itemsRef.current.scrollLeft) {
                        itemsRef.current.scrollLeft = 0;
                        break;
                    }
                    itemsRef.current.scrollLeft -= moveAmount;
                    break;
                }
                case 'right': {
                    if (itemsRef.current.scrollLeft === maxScroll) break;
                    let moveAmount = numOfMovedEls * itemWidth;
                    if (moveAmount > maxScroll - itemsRef.current.scrollLeft) {
                        itemsRef.current.scrollLeft = maxScroll;
                        break;
                    }
                    itemsRef.current.scrollLeft += moveAmount;
                    break;
                }
                default:
                    break;
            }
        };

        return (
            <div
                className={`${styles.window} ${propsClassName}`}
                style={{ gap: halfGapPx }}
                {...props}
                ref={ref}>
                <FramedButton
                    className={`${styles.btn} ${styles.btn_left}`}
                    onClick={() => moveCarousel('left')}>
                    <ArrowLeft className={styles.icon} />
                </FramedButton>
                <div className={styles.items} ref={itemsRef}>
                    {childElements.map((element, index) => (
                        <div
                            key={index}
                            className={styles.element}
                            ref={(ref) => {
                                if (itemRef.current && ref) {
                                    itemRef.current.push(ref);
                                }
                            }}
                            style={{
                                flexBasis: `calc(${100 / numOfEls}% - ${gapPx})`,
                                margin: `0 ${halfGapPx}`,
                            }}>
                            {element}
                        </div>
                    ))}
                </div>
                <FramedButton
                    className={`${styles.btn} ${styles.btn_right}`}
                    onClick={() => moveCarousel('right')}>
                    <ArrowRight className={styles.icon} />
                </FramedButton>
            </div>
        );
    }
);

SimpleCarousel.displayName = 'SimpleCarousel';

export default SimpleCarousel;
