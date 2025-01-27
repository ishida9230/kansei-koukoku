import React from 'react';
import NavigationWrapper from './NavigationWrapper';
import { useSidebar } from '../sidebar/context/SidebarContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { isOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationWrapper />
      <main className={`pt-16 pb-4 transition-all duration-300 ${isOpen ? 'ml-16' : 'ml-0'}`}>
        {children}
      </main>
    </div>
  );
}