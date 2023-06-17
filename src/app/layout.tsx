import PageFrame from '@/components/Layout/PageFrame/PageFrame';
import '../styles/globals.scss';
import { Comfortaa } from 'next/font/google';

const comfortaa = Comfortaa({ subsets: ['latin', 'cyrillic'] });

export const metadata = {
    title: 'Саттаров Марат, Frontend-разработчик',
    description: 'Веб-страница портфолио Саттарова Марата, Frontend-разработчика',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={comfortaa.className}>
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
            </body>
        </html>
    );
}
