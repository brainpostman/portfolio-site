import '../styles/globals.scss';
import { Istok_Web, Oswald, Rubik, Jost, Comfortaa } from 'next/font/google';

const oswald = Comfortaa({ subsets: ['latin', 'cyrillic'] });

export const metadata = {
    title: 'Саттаров Марат, Frontend-разработчик',
    description: 'Веб-страница портфолио Саттарова Марата, Frontend-разработчика',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={oswald.className}>
                <div className='wrapper'>{children}</div>
                <div className='blobContainer one'>
                    <div className='blob gold' />
                </div>
                <div className='blobContainer many'>
                    <div className='blob magenta' />
                    <div className='blob pink' />
                    <div className='blob lilac' />
                </div>
                <div className='frame'>
                    <div className='border border_left border_up' />
                    <div className='border border_right border_up' />
                    <div className='border border_left border_down' />
                    <div className='border border_right border_down' />
                </div>
                <svg>
                    <filter id='noiseFilter'>
                        <feTurbulence type='turbulence' baseFrequency='0.4' stitchTiles='stitch' />
                        <feComposite operator='in' in2='SourceGraphic' result='monoNoise' />
                        <feBlend in='SourceGraphic' in2='monoNoise' mode='screen' />
                    </filter>
                </svg>
            </body>
        </html>
    );
}
