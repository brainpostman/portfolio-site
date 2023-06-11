import './globals.scss';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Саттаров Марат, Frontend-разработчик',
    description: 'Веб-страница портфолио Саттарова Марата, Frontend-разработчика',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <div className='wrapper'>{children}</div>
                <div className='blobContainer one'>
                    <div className='blob gold' />
                </div>
                <div className='blobContainer many'>
                    <div className='blob magenta' />
                    <div className='blob blue' />
                    <div className='blob lilac' />
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
