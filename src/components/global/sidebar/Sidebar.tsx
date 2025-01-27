'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Search } from 'lucide-react';
import { useSidebar } from '@/components/global/sidebar/context/SidebarContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen } = useSidebar();

  const isActive = (path: string) => {
    return pathname === path ? 'bg-primary text-white' : 'text-secondary hover:bg-gray-100';
  };

  return (
    <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-slate-300 flex flex-col items-center py-4 transition-all duration-300 ${isOpen ? 'w-16' : 'w-0 overflow-hidden'}`}>
      <div className="flex-1 space-y-4">
        <Link
          href="/drawing-register"
          className={`w-12 h-12 flex items-center justify-center rounded-lg ${isActive('/drawing-register')}`}
        >
          <FileText size={24} />
        </Link>
        <Link
          href="/drawing-search"
          className={`w-12 h-12 flex items-center justify-center rounded-lg ${isActive('/drawing-search')}`}
        >
          <Search size={24} />
        </Link>
      </div>
    </div>
  );
}