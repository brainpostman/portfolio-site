'use client';
import ImageFramed from '@/components/Layout/ImageFramed/ImageFramed';
import styles from './ProjectPage.module.scss';
import { HiOutlineServer } from 'react-icons/hi';
import { VscGithub } from 'react-icons/vsc';
import TextHoverFrame from '@/components/Layout/TextHoverFrame.tsx/TextHoverFrame';
import { CSSTransition } from 'react-transition-group-react-18';
import { useEffect, useRef, useState } from 'react';
import { IProjectItem } from '@/types/IProjectItem';
import FramedButton from '@/components/UI/FramedButton/FramedButton';
import ExpandingBlock from '@/components/UI/ExpandingBlock/ExpandingBlock';
import ArrowLeft from '@p/arrow-left.svg';

interface ProjectPageProps {
    project: IProjectItem;
}

const transitionStylesTop = {
    enter: styles.transitionTop_enter,
    enterActive: styles.transitionTop_enterActive,
    enterDone: styles.transitionTop_enterDone,
    exit: styles.transitionTop_exit,
    exitActive: styles.transitionTop_exitActive,
    exitDone: styles.transitionTop_exitDone,
};

const transitionStylesLeft = {
    enter: styles.transitionLeft_enter,
    enterActive: styles.transitionLeft_enterActive,
    enterDone: styles.transitionLeft_enterDone,
    exit: styles.transitionLeft_exit,
    exitActive: styles.transitionLeft_exitActive,
    exitDone: styles.transitionLeft_exitDone,
};
const transitionStylesRight = {
    enter: styles.transitionRight_enter,
    enterActive: styles.transitionRight_enterActive,
    enterDone: styles.transitionRight_enterDone,
    exit: styles.transitionRight_exit,
    exitActive: styles.transitionRight_exitActive,
    exitDone: styles.transitionRight_exitDone,
};
const transitionStylesBottom = {
    enter: styles.transitionBottom_enter,
    enterActive: styles.transitionBottom_enterActive,
    enterDone: styles.transitionBottom_enterDone,
    exit: styles.transitionBottom_exit,
    exitActive: styles.transitionBottom_exitActive,
    exitDone: styles.transitionBottom_exitDone,
};

const ProjectPage = ({ project }: ProjectPageProps) => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(true);
    }, []);

    const linksRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const otherinfoRef = useRef<HTMLDivElement>(null);
    const descrRef = useRef<HTMLParagraphElement>(null);
    const delay = 900;

    const [expandFlag, setExpandFlag] = useState(true);

    useEffect(() => {
        const mql = window.matchMedia('(max-width: 666.98px)');
        const handleMediaChange = () => {
            if (mql.matches) {
                setExpandFlag(false);
            } else {
                setExpandFlag(true);
            }
        };
        handleMediaChange();
        mql.addEventListener('change', handleMediaChange);
        return () => {
            mql.removeEventListener('change', handleMediaChange);
        };
    }, []);

    return (
        <section className={styles.info}>
            <CSSTransition
                in={show}
                timeout={delay}
                classNames={transitionStylesTop}
                nodeRef={titleRef}>
                <h1 className={styles.title} ref={titleRef}>
                    {project.name}
                </h1>
            </CSSTransition>
            <div className={styles.info_main}>
                <CSSTransition
                    in={show}
                    timeout={delay + 100}
                    classNames={transitionStylesLeft}
                    nodeRef={imageRef}>
                    <ImageFramed
                        src={project.img}
                        alt={project.name}
                        containerClassName={styles.img_container}
                        className={styles.img_image}
                        fill
                        ref={imageRef}
                        placeholder='blur'
                        blurDataURL={project.blurImg}
                    />
                </CSSTransition>
                <CSSTransition
                    in={show}
                    timeout={delay + 300}
                    classNames={transitionStylesRight}
                    nodeRef={descrRef}>
                    <p className={styles.descr} ref={descrRef}>
                        {project.descr}
                    </p>
                </CSSTransition>
                <CSSTransition
                    in={show}
                    timeout={delay + 300}
                    classNames={transitionStylesRight}
                    nodeRef={otherinfoRef}>
                    <div className={styles.otherinfo} ref={otherinfoRef}>
                        {project.proglangs !== '-' && (
                            <ExpandingBlock
                                className={styles.otherinfo_item}
                                button={<ArrowLeft />}
                                expandFlag={expandFlag}
                                blockTitle={
                                    <span className={styles.otherinfo_title}>
                                        Языки программирования:
                                    </span>
                                }>
                                <ul className={styles.otherinfo_list}>
                                    {project.proglangs.split(', ').map((item) => {
                                        return <li key={item}>{item}</li>;
                                    })}
                                </ul>
                            </ExpandingBlock>
                        )}
                        {project.frameworks !== '-' && (
                            <ExpandingBlock
                                className={styles.otherinfo_item}
                                button={<ArrowLeft />}
                                expandFlag={expandFlag}
                                blockTitle={
                                    <span className={styles.otherinfo_title}>Фреймворки:</span>
                                }>
                                <ul className={styles.otherinfo_list}>
                                    {project.frameworks.split(', ').map((item) => {
                                        return <li key={item}>{item}</li>;
                                    })}
                                </ul>
                            </ExpandingBlock>
                        )}
                        {project.libraries !== '-' && (
                            <ExpandingBlock
                                className={styles.otherinfo_item}
                                button={<ArrowLeft />}
                                expandFlag={expandFlag}
                                blockTitle={
                                    <span className={styles.otherinfo_title}>Библиотеки:</span>
                                }>
                                <ul className={styles.otherinfo_list}>
                                    {project.libraries.split(', ').map((item) => {
                                        return <li key={item}>{item}</li>;
                                    })}
                                </ul>
                            </ExpandingBlock>
                        )}
                        {project.otherTech !== '-' && (
                            <ExpandingBlock
                                className={styles.otherinfo_item}
                                button={<ArrowLeft />}
                                expandFlag={expandFlag}
                                blockTitle={
                                    <span className={styles.otherinfo_title}>Другое:</span>
                                }>
                                <ul className={styles.otherinfo_list}>
                                    {project.otherTech.split(', ').map((item) => {
                                        return <li key={item}>{item}</li>;
                                    })}
                                </ul>
                            </ExpandingBlock>
                        )}
                    </div>
                </CSSTransition>
            </div>
            <CSSTransition
                in={show}
                timeout={delay + 500}
                classNames={transitionStylesBottom}
                nodeRef={linksRef}>
                <div className={styles.links} ref={linksRef}>
                    <a
                        href={project.hostLink}
                        target='_blank'
                        rel='noreferrer'
                        title={'Ссылка на хостинг'}>
                        <TextHoverFrame>
                            <HiOutlineServer className={styles.icon} />
                        </TextHoverFrame>
                    </a>
                    <a
                        href={project.repoLink}
                        target='_blank'
                        rel='noreferrer'
                        title={'Ссылка на репозиторий'}>
                        <FramedButton>
                            <VscGithub className={`${styles.icon} ${styles.icon_2}`} />
                        </FramedButton>
                    </a>
                </div>
            </CSSTransition>
        </section>
    );
};

export default ProjectPage;
