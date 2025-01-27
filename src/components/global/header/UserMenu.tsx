'use client';

import React, { useState, useRef } from 'react';
import { CircleUserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useClickAway } from '../../../hooks/useClickAway';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useClickAway(menuRef, () => setIsOpen(false));

  const handleLogout = () => {
    router.push('/login');
    setIsOpen(false);
  };

  return (
    <div className="relative flex items-center" ref={menuRef}>
      <div className="flex items-center mr-2">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium text-gray-900">admin123</span>
          <span className="text-sm text-gray-500">山田 太郎</span>
        </div>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
        aria-label="ユーザーメニュー"
      >
        <CircleUserRound className="text-secondary w-10 h-10" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-slate-300 z-50">
          <a 
            href="#" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
            }}
          >
            利用方法
          </a>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            ログアウト
          </button>
        </div>
      )}
    </div>
  );
}