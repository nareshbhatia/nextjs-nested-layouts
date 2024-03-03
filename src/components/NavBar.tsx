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
    route: '/movies-server-components',
    title: 'Movies (server components)',
  },
  {
    route: '/movies-client-components',
    title: 'Movies (client components)',
  },
  {
    route: '/movies-query-param',
    title: 'Movies (query parameters)',
  },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="space-x-4">
      {links.map((link) => {
        const isSelected =
          link.route === '/' ? pathname === '/' : pathname.includes(link.route);
        return (
          <Link
            className={isSelected ? 'underline' : ''}
            href={link.route}
            key={link.route}
          >
            {link.title}
          </Link>
        );
      })}
    </nav>
  );
}
