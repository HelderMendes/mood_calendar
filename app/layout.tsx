import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Fugaz_One, Open_Sans } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { AuthProvider } from '@/context/AuthContext';
import Head from './Head';

const opensans = Open_Sans({ subsets: ['latin'] });
const fugaz = Fugaz_One({ subsets: ['latin'], weight: '400' });

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'Next Broodl App',
    description: 'Track your daily mood every day of the year!',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const header = (
        <header className="p-4 sm:p-8 flex items-center justify-between gap-4 ">
            <h1
                className={
                    fugaz.className + ' textGradient text-base sm:text-xl'
                }
            >
                <Link href={'/'}>
                    Boodly and M<span className="text-gray-800">👀</span>dy
                </Link>
            </h1>
        </header>
    );
    const footer = (
        <footer className="p-4 sm:p-8">
            <p className={'text-indigo-400 text-center ' + fugaz.className}>
                Created with 💙 by{' '}
                <Link href="https://helderdesign.nl" target="new">
                    HelderDesign
                </Link>
            </p>
        </footer>
    );

    return (
        <html lang="en">
            <Head />
            <AuthProvider>
                <body
                    className={`${opensans.className} text-slate-1
                    500 w-full max-w-[1200px] mx-auto text-sm sm:text-base min-h-screen flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    {header}
                    {children}
                    {footer}
                </body>
            </AuthProvider>
        </html>
    );
}
