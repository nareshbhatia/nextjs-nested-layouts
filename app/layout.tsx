import * as React from 'react';
import { NavLink } from './nav-link';
import './globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className="bg-gray-900 text-gray-100 antialiased" lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="description" content="Nested Layouts" />
        <title>Nested Layouts</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
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
