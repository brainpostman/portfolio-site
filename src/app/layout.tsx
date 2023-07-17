import PageFrame from '@/components/Layout/PageFrame/PageFrame';
import '../styles/globals.scss';
import { Play, Rubik } from 'next/font/google';
import { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
    title: 'Марат Саттаров, Frontend-разработчик',
    description: 'Веб-страница портфолио Саттарова Марата, Frontend-разработчика',
    viewport: 'width=device-width, initial-scale=1.0',
};

const play = Play({
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '700'],
    variable: '--font-play',
    display: 'swap',
});

const rubik = Rubik({
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '700'],
    variable: '--font-rubik',
    display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang='en'
            className={`${play.className} ${rubik.className} ${play.variable} ${rubik.variable}`}>
            <body>
                <NextTopLoader color='#e8a0bf' shadow={false} />
                <div className='container'>
                    <div className='wrapper'>{children}</div>
                    <div className='blobContainer one'>
                        <div className='blob gold' />
                    </div>
                    <div className='blobContainer many'>
                        <div className='blob magenta' />
                        <div className='blob pink' />
                        <div className='blob lilac' />
                    </div>
                    <PageFrame />
                    <svg>
                        <filter id='noiseFilter'>
                            <feTurbulence
                                type='fractalNoise'
                                baseFrequency='0.6'
                                stitchTiles='stitch'
                            />
                            <feComposite operator='in' in2='SourceGraphic' result='monoNoise' />
                            <feBlend in='SourceGraphic' in2='monoNoise' mode='screen' />
                        </filter>
                    </svg>
                </div>
            </body>
        </html>
    );
}
