'use client';
import { usePathname } from 'next/navigation';
import styles from './BreadCrumbs.module.scss';
import breadCrumbData from '@/configs/routing';
import Link from 'next/link';
import TextHoverFrame from '@/components/Layout/TextHoverFrame.tsx/TextHoverFrame';
import { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group-react-18';
import { IRoute } from '@/types/IRoute';

const transitionStylesLeft = {
    enter: styles.transitionLeft_enter,
    enterActive: styles.transitionLeft_enterActive,
    enterDone: styles.transitionLeft_enterDone,
    exit: styles.transitionLeft_exit,
    exitActive: styles.transitionLeft_exitActive,
    exitDone: styles.transitionLeft_exitDone,
};

const BreadCrumbs = () => {
    const path = usePathname();
    const pathSlugs = path.split('/');
    const ulRef = useRef<HTMLUListElement>(null);
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(true);
    }, []);

    function GetBreadCrumbObj(data: IRoute, pathSlug: string): IRoute | undefined {
        if (data.path === pathSlug) {
            return data;
        }
        for (const child of data.children) {
            const result = GetBreadCrumbObj(child, pathSlug);
            if (result) {
                return result;
            }
        }

        return undefined;
    }

    return (
        <CSSTransition in={show} timeout={1100} classNames={transitionStylesLeft} nodeRef={ulRef}>
            <ul ref={ulRef} className={styles.breadcrumbs}>
                {pathSlugs.map((path, index, array) => {
                    const routeData = GetBreadCrumbObj(breadCrumbData, path);
                    const lastIndex = array.length - 1 === index;
                    if (lastIndex) {
                        return (
                            <li className={styles.breadcrumbs_last} key={path}>
                                {routeData?.name}
                            </li>
                        );
                    } else {
                        return (
                            <li className={styles.breadcrumbs_container} key={path}>
                                <div className={styles.breadcrumbs_link}>
                                    <TextHoverFrame>
                                        <Link href={routeData?.href || '/'}>{routeData?.name}</Link>
                                    </TextHoverFrame>
                                </div>
                                <span className={styles.separator}></span>
                            </li>
                        );
                    }
                })}
            </ul>
        </CSSTransition>
    );
};

export default BreadCrumbs;
