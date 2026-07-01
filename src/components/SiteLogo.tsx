'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { smoothScrollToElement } from '@/lib/smoothScroll';
import styles from './SiteLogo.module.scss';

const HOME_HERO_ID = 'chapter-hero';

function scrollToHomeHero() {
  const target = document.getElementById(HOME_HERO_ID);
  if (!target) {
    return;
  }

  smoothScrollToElement(target, `#${HOME_HERO_ID}`);
}

export default function SiteLogo() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const isHome = pathname === '/';

  const logo = (
    <Image
      src="/assets/ImageToStl.com_TML-primary-logo.png"
      alt=""
      className={styles.logo}
      width={220}
      height={64}
      style={{ height: 'auto' }}
      priority
    />
  );

  return (
    <div className={styles.logoContainer} data-logo-anchor>
      {isHome ? (
        <button
          type="button"
          className={styles.logoControl}
          onClick={scrollToHomeHero}
          aria-label="Back to top"
        >
          {logo}
        </button>
      ) : (
        <Link href="/" className={styles.logoControl} aria-label="Take Me Live home">
          {logo}
        </Link>
      )}
    </div>
  );
}
