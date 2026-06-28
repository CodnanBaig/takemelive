'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './SiteNav.module.scss';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Our Projects', href: '/our-projects' },
  { label: 'Contact', href: '/contact' },
] as const;

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Primary">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={styles.link}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
