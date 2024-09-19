'use client';
import { Fugaz_One } from 'next/font/google';
import Button from './Button';
import React, { ChangeEvent, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const fugaz = Fugaz_One({ subsets: ['latin'], weight: '400' });

export default function Login() {
  const [email, setEmail] = useState<string>(''); // State for email
  const [password, setPassword] = useState<string>(''); // State for password
  const [isRegister, setIsRegister] = useState<boolean>(false); // State to toggle between login and signup
  const [authenticating, setAuthenticating] = useState<boolean>(false); // State to handle loading

  const { signup, login } = useAuth() || {};

  async function handleSubmit() {
    if (!email || !password || password.length < 6) {
      return;
    }
    setAuthenticating(true);
    try {
      if (isRegister) {
        console.log('Signing up a new user');
        await signup?.(email, password);
      } else {
        console.log('Logging as an existing user');
        await login?.(email, password);
      }
    } catch (err: unknown) {
      console.log(err, 'There was one unknown derver error message');
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-4'>
      <h3 className={'text-4xl sm:text-5xl md:text-6xl ' + fugaz.className}>
        {!isRegister ? 'Log In' : 'Register'}
      </h3>
      <p className='pb-4'>You&apos;re one step away!</p>
      {/* Email Input */}
      <input
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        placeholder='Email'
        className='mx-auto w-full max-w-[400px] rounded-full border border-solid border-indigo-400 px-3 outline-none duration-200 hover:border-indigo-600 focus:border-indigo-600 sm:py-3'
      />
      {/* Password Input */}{' '}
      <input
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
        placeholder='password'
        type='password'
        className='mx-auto w-full max-w-[400px] rounded-full border border-solid border-indigo-400 px-3 outline-none duration-200 hover:border-indigo-600 focus:border-indigo-600 sm:py-3'
      />
      <div className='mx-auto w-full max-w-[400px] py-4'>
        <Button
          clickHandler={handleSubmit}
          text={authenticating ? 'Submitting' : 'Submite'}
          full
        />
      </div>
      <p>
        {isRegister ? 'Already have an account! ' : `Don't have an account! `}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className='text-indigo-600'
        >
          <b>{isRegister ? ' Sign in' : ' Sign Up'}</b>
        </button>
      </p>
    </div>
  );
}
