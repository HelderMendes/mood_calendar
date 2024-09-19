'use client';
import React from 'react';
import Button from './Button';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

export default function ResetPassword() {
  const { resetPassword, currentUser } = useAuth() || {}; // Fallback to handle potential null from useAuth
  const pathName = usePathname();
  console.log(pathName);

  if (!currentUser) {
    return null; // Return null if there's no user logged in
  }

  if (currentUser && pathName === '/') {
    return (
      <Button
        text='Reset Password'
        clickHandler={() => resetPassword?.(currentUser.email)}
      />
    );
  }

  return null; // Explicitly return null if none of the conditions are met
}
