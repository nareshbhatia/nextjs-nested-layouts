'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
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
    route: '/fake-child',
    title: 'Fake Child',
  },
  {
    route: '/query-params',
    title: 'Query Params',
  },
];

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-lg items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <nav className="items-center gap-6 text-sm flex">
            {links.map((link) => {
              const isSelected =
                link.route === '/'
                  ? pathname === '/'
                  : pathname.includes(link.route);
              return (
                <Link
                  className={cn(
                    'transition-colors hover:text-foreground/80',
                    isSelected ? 'text-foreground' : 'text-foreground/60',
                  )}
                  href={link.route}
                  key={link.route}
                  prefetch={false}
                >
                  {link.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
