'use client';

import React from 'react';
import UserMenu from './UserMenu';
import { LogoWithMenuToggle } from './LogoWithMenuToggle';

export default function GlobalHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-300 flex items-center justify-between px-6 z-50">
      <div className="flex items-center gap-6">
        <LogoWithMenuToggle />
      </div>
      <UserMenu />
    </header>
  );
}