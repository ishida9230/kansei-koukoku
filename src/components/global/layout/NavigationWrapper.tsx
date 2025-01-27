'use client';

import { usePathname } from 'next/navigation';
import GlobalHeader from '../header/Header';
import Sidebar from '../sidebar/Sidebar';

export default function NavigationWrapper() {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return null;
  }

  return (
    <>
      <GlobalHeader />
      <Sidebar />
    </>
  );
} 