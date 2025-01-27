import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SidebarProvider } from '@/components/global/sidebar/context/SidebarContext';
import NavigationWrapper from '@/components/global/layout/NavigationWrapper';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '設計室システム',
  description: '設計室社内システム',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <SidebarProvider>
          <div className="min-h-screen">
            <NavigationWrapper />
            {children}
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}