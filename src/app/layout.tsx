import { NavBar } from '@/components/NavBar';
import './tailwind.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nested Layouts',
  description: 'Nested Layouts',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className={inter.className} lang="en">
      <body className="bg-gray-900 text-gray-100 antialiased">
        <div className="flex h-screen flex-col">
          <header className="border-b p-4">
            <NavBar />
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
