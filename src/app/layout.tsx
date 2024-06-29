import { AppProvider } from '@/providers';
import { NavBar } from '@/components/NavBar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './tailwind.css';

/*
 * Load the fonts using next/font/google. For details, see
 * https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#with-tailwind-css
 */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Nested Layouts',
  description: 'Nested Layouts',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className={inter.variable} lang="en" suppressHydrationWarning>
      <head />
      <body>
        <AppProvider>
          <div className="relative flex min-h-screen flex-col">
            <header className="border-b p-4">
              <NavBar />
            </header>
            <main className="flex-1">{children}</main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
