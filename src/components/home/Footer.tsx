'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { FEATURED_PROJECTS } from '@/content/featuredProjects';
import styles from './Footer.module.scss';

const MARQUEE_ITEMS = Array.from({ length: 18 }, (_, index) => `item-${index}`);
const SITE_LINKS = [
  { label: 'Home', href: '#chapter-hero' },
  { label: 'Services', href: '#chapter-services' },
  { label: 'Industries', href: '#chapter-industries' },
  { label: 'Team', href: '#chapter-team' },
  { label: 'Contact', href: '#chapter-cta' },
] as const;

export default function Footer() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lightTrackRef = useRef<HTMLDivElement | null>(null);
  const darkTrackRef = useRef<HTMLDivElement | null>(null);

  const repeatedItems = useMemo(() => [...MARQUEE_ITEMS, ...MARQUEE_ITEMS], []);

  useEffect(() => {
    const section = sectionRef.current;
    const lightTrack = lightTrackRef.current;
    const darkTrack = darkTrackRef.current;
    if (!section || !lightTrack || !darkTrack) {
      return;
    }

    let lightX = 0;
    let darkX = 0;
    let velocityBoost = 0;
    let scrollDirection = 1;
    let tickerAttached = false;

    const getLoopWidth = (track: HTMLDivElement) => track.scrollWidth * 0.5;

    const ticker = () => {
      const lightLoopWidth = getLoopWidth(lightTrack);
      const darkLoopWidth = getLoopWidth(darkTrack);
      if (!lightLoopWidth || !darkLoopWidth) {
        return;
      }

      const boost = Math.abs(velocityBoost);
      lightX += scrollDirection * (-0.28 - boost * 0.085);
      darkX += scrollDirection * (0.6 + boost * 0.085);

      lightX = gsap.utils.wrap(-lightLoopWidth, 0, lightX);
      darkX = gsap.utils.wrap(-darkLoopWidth, 0, darkX);

      gsap.set(lightTrack, { x: lightX });
      gsap.set(darkTrack, { x: darkX });

      velocityBoost *= 0.9;
    };

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate(self) {
        const raw = self.getVelocity() / 170;
        velocityBoost = gsap.utils.clamp(-10, 10, raw);
        if (Math.abs(raw) > 0.01) {
          scrollDirection = raw > 0 ? 1 : -1;
        } else {
          scrollDirection = self.direction >= 0 ? 1 : -1;
        }
      },
    });

    gsap.ticker.add(ticker);
    tickerAttached = true;

    return () => {
      st.kill();
      if (tickerAttached) {
        gsap.ticker.remove(ticker);
      }
    };
  }, []);

  return (
    <footer
      id="chapter-footer"
      data-chapter="footer"
      data-logo-invert="1"
      ref={sectionRef}
      className={styles.footer}
      aria-label="Footer"
    >
      <div className={styles.marqueeStack}>
        <div className={`${styles.strip} ${styles.stripLight}`} aria-hidden="true">
          <div className={styles.track} ref={lightTrackRef}>
            {repeatedItems.map((item, index) => (
              <span key={`light-${item}-${index}`} className={styles.marqueeItem}>
                <Image
                  src="/assets/ImageToStl.com_TML-primary-logo.png"
                  alt=""
                  width={94}
                  height={28}
                  className={styles.logoLight}
                />
                <span>TakeMeLive</span>
              </span>
            ))}
          </div>
        </div>

        <div className={`${styles.strip} ${styles.stripDark}`} aria-hidden="true">
          <div className={styles.track} ref={darkTrackRef}>
            {repeatedItems.map((item, index) => (
              <span key={`dark-${item}-${index}`} className={styles.marqueeItem}>
                <Image
                  src="/assets/ImageToStl.com_TML-primary-logo.png"
                  alt=""
                  width={94}
                  height={28}
                  className={styles.logoDark}
                />
                <span>TakeMeLive</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.addressGrid}>
          <article className={styles.linkColumn}>
            <h3>Featured Projects</h3>
            <ul>
              {FEATURED_PROJECTS.map((project) => (
                <li key={project.slug}>
                  <Link href={`/projects/${project.slug}`} data-cursor="link">
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </article>
          <article className={styles.linkColumn}>
            <h3>Site</h3>
            <ul>
              {SITE_LINKS.map((item) => (
                <li key={item.label}>
                  <a href={item.href} data-cursor="link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className={styles.bottomNav}>
          {FEATURED_PROJECTS.map((project) => (
            <a key={project.slug} href={`/projects/${project.slug}`} data-cursor="link">
              {project.client}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
