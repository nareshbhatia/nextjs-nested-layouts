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
    route: '/server-components',
    title: 'Server Components',
  },
  {
    route: '/client-components',
    title: 'Client Components',
  },
  {
    route: '/query-params',
    title: 'Query Params',
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
