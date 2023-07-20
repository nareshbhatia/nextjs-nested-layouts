'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  {
    route: '/',
    title: 'Home',
  },
  {
    route: '/movies',
    title: 'Movies',
  },
  {
    route: '/movies-query-param',
    title: 'Movies (query param)',
  },
];

export function NavBar() {
  let pathname = usePathname();

  // Truncate movie id from pathname if it exists for match below to succeed
  if (pathname.startsWith('/movies/')) {
    pathname = '/movies';
  }

  return (
    <nav className="space-x-4">
      {links.map((link) => (
        <Link
          className={pathname === link.route ? 'underline' : ''}
          href={link.route}
          key={link.route}
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
}
