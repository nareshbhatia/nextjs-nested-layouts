import { NavLink } from './nav-link';
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
        <header className="border-b p-4">
          <nav className="space-x-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/movies">Movies</NavLink>
          </nav>
        </header>
        <div className="p-4">{children}</div>
      </body>
    </html>
  );
}
