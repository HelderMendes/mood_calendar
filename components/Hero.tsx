import React from 'react';
import { Fugaz_One } from 'next/font/google';
import Button from './Button';
import Calendar from '@/components/Calendar';
import Link from 'next/link';

const fugaz = Fugaz_One({ subsets: ['latin'], weight: '400' });

export default function Hero() {
    return (
        <div className="py-4 md:py-10 text-center flex flex-col gap-8 sm:gap-10">
            <h1
                className={
                    'text-5xl sm:text-6xl md:text-7xl leading-tight text-balance ' +
                    fugaz.className
                }
            >
                <span className="textGradient">Broodl</span> helps you to track
                your <span className="textGradient">daily</span> m👀d!
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl w-full mx-auto max-w-[700px]">
                Create yoor m👀d record and see how you feel on{' '}
                <span className="font-semibold">every day of every year.</span>
            </p>
            <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
                <Link href={'/dashboard'}>
                    <Button text="Sing Up"></Button>
                </Link>
                <Link href={'/dashboard'}>
                    <Button text="Login" dark></Button>
                </Link>
            </div>
            <Calendar />
        </div>
    );
}
