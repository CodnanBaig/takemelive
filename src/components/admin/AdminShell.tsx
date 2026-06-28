'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import styles from './admin.module.scss';

type AdminShellProps = {
  title: string;
  lead?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/showreel', label: 'Showreel' },
];

export default function AdminShell({ title, lead, children, actions }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className={styles.adminRoot}>
      <div className={styles.shell}>
        <aside className={styles.sidebar}>
          <div className={styles.brand}>
            <span className={styles.brandTitle}>Take Me Live</span>
            <span className={styles.brandName}>Content admin</span>
          </div>

          <nav className={styles.nav} aria-label="Admin">
            {NAV_ITEMS.map((item) => {
              const active = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={styles.navLink}
                  data-active={active ? 'true' : 'false'}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className={styles.sidebarFooter}>
            <Link href="/" className={styles.navLink}>
              View site
            </Link>
            <button type="button" className={styles.buttonGhost} onClick={() => void handleLogout()}>
              Sign out
            </button>
          </div>
        </aside>

        <main className={styles.main}>
          <header className={styles.header}>
            <div>
              <h1 className={styles.pageTitle}>{title}</h1>
              {lead ? <p className={styles.pageLead}>{lead}</p> : null}
            </div>
            {actions ? <div className={styles.actions}>{actions}</div> : null}
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}

export function AdminPanel({ className, children }: { className?: string; children: React.ReactNode }) {
  return <section className={clsx(styles.panel, className)}>{children}</section>;
}
