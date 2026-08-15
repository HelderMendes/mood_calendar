import { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

export default function Main(props: MainProps) {
  const { children } = props;
  return <main className='flex flex-1 flex-col p-4 sm:p-8'>{children}</main>;
}
