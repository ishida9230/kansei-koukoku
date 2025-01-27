'use client';
import React from 'react';
import Image from 'next/image';
import companyLogo from '../../../../public/会社ロゴ.jpg';
import { Menu } from 'lucide-react';
import { useSidebar } from '@/components/global/sidebar/context/SidebarContext';

export function LogoWithMenuToggle() {
    const { toggle } = useSidebar();
  return (
    <div className="flex items-center gap-6">
        <button
            onClick={toggle}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
        >
        <Menu className="text-secondary w-6 h-6" />
        </button>
         <div className="flex items-center">
            <Image src={companyLogo} alt="Company Logo" className="h-10 w-4/5" />
        </div>
    </div>
  );
}