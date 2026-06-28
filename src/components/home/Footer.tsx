'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import type { FeaturedProject } from '@/content/featuredProjects';
import styles from './Footer.module.scss';

const MARQUEE_ITEMS = Array.from({ length: 18 }, (_, index) => `item-${index}`);
const SITE_LINKS = [
  { label: 'Home', href: '#chapter-hero' },
  { label: 'Our Projects', href: '/our-projects' },
  { label: 'Services', href: '#chapter-services' },
  { label: 'Industries', href: '#chapter-industries' },
  { label: 'Team', href: '#chapter-team' },
  { label: 'Contact', href: '/contact' },
] as const;

const CONTACT_LINKS = [
  { label: 'mg@takemelive.com', href: 'mailto:mg@takemelive.com' },
  { label: 'Instagram', href: 'https://www.instagram.com/takemelive' },
] as const;

type FooterProps = {
  projects: FeaturedProject[];
};

export default function Footer({ projects }: FooterProps) {
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
      lightX += scrollDirection * (-0.22 - boost * 0.065);
      darkX += scrollDirection * (0.48 + boost * 0.065);

      lightX = gsap.utils.wrap(-lightLoopWidth, 0, lightX);
      darkX = gsap.utils.wrap(-darkLoopWidth, 0, darkX);

      gsap.set(lightTrack, { x: lightX });
      gsap.set(darkTrack, { x: darkX });

      velocityBoost *= 0.9;
    };

    const startTicker = () => {
      if (!tickerAttached) {
        gsap.ticker.add(ticker);
        tickerAttached = true;
      }
    };

    const stopTicker = () => {
      if (tickerAttached) {
        gsap.ticker.remove(ticker);
        tickerAttached = false;
      }
    };

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([lightTrack, darkTrack], { x: 0 });
        stopTicker();
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const visibilitySt = ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          onEnter: startTicker,
          onEnterBack: startTicker,
          onLeave: stopTicker,
          onLeaveBack: stopTicker,
        });

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

        return () => {
          st.kill();
          visibilitySt.kill();
          stopTicker();
        };
      });
    }, section);

    return () => {
      ctx.revert();
      stopTicker();
    };
  }, []);

  const year = new Date().getFullYear();

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
                <span>Take Me Live</span>
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
                <span>Take Me Live</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.bodyGrid}>
          <div className={styles.brandBlock}>
            <Image
              src="/assets/ImageToStl.com_TML-primary-logo.png"
              alt="Take Me Live"
              width={140}
              height={42}
              className={styles.brandLogo}
            />
            <p className={styles.brandTagline}>
              Live experience studio designing immersive environments from concept through show call.
            </p>
          </div>

          <nav className={styles.linkColumn} aria-label="Featured projects">
            <h3>Featured Projects</h3>
            <ul className={styles.projectList}>
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link href={`/projects/${project.slug}`} data-cursor="link">
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.linkColumn} aria-label="Site navigation">
            <h3>Site</h3>
            <ul>
              {SITE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} data-cursor="link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.linkColumn} aria-label="Contact">
            <h3>Contact</h3>
            <ul>
              {CONTACT_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    data-cursor="link"
                    {...(item.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.bottomBar}>
          <p>© {year} Take Me Live. All rights reserved.</p>
          <Link href="/contact" className={styles.bottomCta} data-cursor="link">
            Start a project
          </Link>
        </div>
      </div>
    </footer>
  );
}
