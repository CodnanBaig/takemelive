'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import styles from './admin.module.scss';
import { IconDashboard, IconExternal, IconProjects, IconShowreel } from './AdminIcons';

type AdminShellProps = {
  title: string;
  lead?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', exact: true, Icon: IconDashboard },
  { href: '/admin/projects', label: 'Projects', Icon: IconProjects },
  { href: '/admin/showreel', label: 'Showreel', Icon: IconShowreel },
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
            <Image
              className={styles.brandLogo}
              src="/assets/ImageToStl.com_TML-primary-logo.png"
              alt=""
              width={36}
              height={36}
            />
            <div className={styles.brandText}>
              <span className={styles.brandTitle}>Take Me Live</span>
              <span className={styles.brandName}>Content admin</span>
            </div>
          </div>

          <nav className={styles.nav} aria-label="Admin">
            {NAV_ITEMS.map((item) => {
              const active = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
              const { Icon } = item;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={styles.navLink}
                  data-active={active ? 'true' : 'false'}
                >
                  <Icon className={styles.navIcon} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className={styles.sidebarFooter}>
            <Link href="/" className={styles.navLink}>
              <IconExternal className={styles.navIcon} />
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

type AdminPanelProps = {
  className?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
};

export function AdminPanel({ className, title, description, children }: AdminPanelProps) {
  return (
    <section className={clsx(styles.panel, className)}>
      {title ? (
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>{title}</h2>
          {description ? <p className={styles.panelDesc}>{description}</p> : null}
        </div>
      ) : null}
      <div className={styles.panelInner}>{children}</div>
    </section>
  );
}
