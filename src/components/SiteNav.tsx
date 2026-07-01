'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useState } from 'react';
import styles from './SiteNav.module.scss';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Our Projects', href: '/our-projects' },
  { label: 'Contact', href: '/contact' },
] as const;

export default function SiteNav() {
  const pathname = usePathname();
  const [menuOpenPath, setMenuOpenPath] = useState<string | null>(null);
  const menuId = useId();
  const open = menuOpenPath === pathname;

  const closeMenu = useCallback(() => setMenuOpenPath(null), []);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, closeMenu]);

  return (
    <>
      <nav className={styles.nav} aria-label="Primary">
        <div className={styles.desktopLinks}>
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
        </div>

        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() =>
            setMenuOpenPath((current) => (current === pathname ? null : pathname))
          }
        >
          <span className={styles.menuIcon} aria-hidden="true" data-open={open || undefined} />
          <span className="srOnly">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </nav>

      <div
        className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ''}`}
        id={menuId}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Close menu"
          tabIndex={open ? 0 : -1}
          onClick={closeMenu}
        />
        <div className={styles.mobilePanel} role="dialog" aria-modal="true" aria-label="Site menu">
          <ul className={styles.mobileList}>
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={closeMenu}
                    tabIndex={open ? 0 : -1}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
