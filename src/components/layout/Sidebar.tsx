'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiFileText, FiSearch } from 'react-icons/fi';

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      href: '/drawing-register',
      icon: FiFileText,
      label: '図面登録'
    },
    {
      href: '/drawing-search',
      icon: FiSearch,
      label: '図面検索'
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg
                    transition-colors duration-200
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
} 