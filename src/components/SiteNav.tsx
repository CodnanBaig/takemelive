import Link from 'next/link';
import styles from './SiteNav.module.scss';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Our Projects', href: '/our-projects' },
  { label: 'Our Culture', href: '/our-culture' },
] as const;

export default function SiteNav() {
  return (
    <nav className={styles.nav} aria-label="Primary">
      {NAV_ITEMS.map((item) => (
        <Link key={item.href} href={item.href} className={styles.link}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
