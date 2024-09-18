'use client';
import React from 'react';
import Button from './Button';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

export default function ResetPassword() {
  const { resetPassword, currentUser } = useAuth();
  const pathName = usePathname();
  console.log(pathName);

  if (!currentUser) {
    return null;
  }

  if (currentUser && pathName === '/') {
    return <Button text='reset Password' clickHandler={resetPassword} />;
  }
}
