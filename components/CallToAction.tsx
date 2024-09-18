'use client';
import Link from 'next/link';
import React from 'react';
import Button from './Button';
import { Fugaz_One } from 'next/font/google';
import { useAuth } from '@/context/AuthContext';

const fugaz = Fugaz_One({ subsets: ['latin'], weight: '400' });

export default function CallToAction() {
  const { currentUser } = useAuth();

  return (
    <>
      <h1
        className={
          'text-balance text-5xl leading-tight sm:text-6xl md:text-7xl ' +
          fugaz.className
        }
      >
        <span className='textGradient'>Broodl</span> helps you to track your{' '}
        <span className='textGradient'>daily</span> m👀d!
      </h1>
      <p className='mx-auto w-full max-w-[700px] text-lg sm:text-xl md:text-2xl'>
        Create yoor m👀d record and see how you feel on{' '}
        <span className='font-semibold'>every day of every year.</span>
      </p>
      {currentUser ? (
        <div className='mx-auto grid w-full max-w-[450px]'>
          <Link href={'/dashboard'}>
            <Button
              className='text-xl'
              full
              dark
              text='Go to the Dashboard'
            ></Button>
          </Link>
        </div>
      ) : (
        <div className='mx-auto grid w-fit grid-cols-2 gap-4'>
          <Link href={'/dashboard'}>
            <Button text='Sign Up' />
          </Link>
          <Link href={'/dashboard'}>
            <Button text='Login' dark />
          </Link>
        </div>
      )}
    </>
  );
}
