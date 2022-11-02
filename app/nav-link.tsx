'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  let pathname = usePathname();
  let active = href === pathname;
  return (
    <Link className={active ? 'underline' : ''} href={href}>
      {children}
    </Link>
  );
}
