'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './page.module.scss';

const HERO_LINES = ['MORE THAN', 'MOVERS', 'SHOW MAKERS!'];

export default function Home() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const brightLayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const brightLayer = brightLayerRef.current;

    if (!hero || !brightLayer) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [hero, brightLayer],
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.08 },
      );

      const mm = gsap.matchMedia();

      mm.add('(pointer:fine)', () => {
        const spotXTo = gsap.quickTo(brightLayer, '--spot-x', {
          duration: 0.24,
          ease: 'power3.out',
        });
        const spotYTo = gsap.quickTo(brightLayer, '--spot-y', {
          duration: 0.24,
          ease: 'power3.out',
        });
        const spotRadiusTo = gsap.quickTo(brightLayer, '--spot-radius', {
          duration: 0.2,
          ease: 'power2.out',
        });

        const handlePointerMove = (event: PointerEvent) => {
          const bounds = hero.getBoundingClientRect();
          spotXTo(event.clientX - bounds.left);
          spotYTo(event.clientY - bounds.top);
        };

        const handlePointerEnter = (event: PointerEvent) => {
          const bounds = hero.getBoundingClientRect();
          spotXTo(event.clientX - bounds.left);
          spotYTo(event.clientY - bounds.top);
          spotRadiusTo(180);
          gsap.to(brightLayer, {
            opacity: 1,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        };

        const handlePointerLeave = () => {
          spotRadiusTo(0);
          gsap.to(brightLayer, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        };

        hero.addEventListener('pointermove', handlePointerMove);
        hero.addEventListener('pointerenter', handlePointerEnter);
        hero.addEventListener('pointerleave', handlePointerLeave);

        return () => {
          hero.removeEventListener('pointermove', handlePointerMove);
          hero.removeEventListener('pointerenter', handlePointerEnter);
          hero.removeEventListener('pointerleave', handlePointerLeave);
        };
      });

      return () => {
        mm.revert();
      };
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.logoContainer}>
        <img
          src="/assets/ImageToStl.com_TML-primary-logo.png"
          alt="Take Me Live Logo"
          className={styles.logo}
        />
      </div>

      <section ref={heroRef} className={styles.hero} aria-label="Take Me Live hero">
        <div className={styles.typeLayer} aria-hidden="true">
          {HERO_LINES.map((line) => (
            <span key={`base-${line}`}>{line}</span>
          ))}
        </div>

        <div ref={brightLayerRef} className={styles.typeLayerBright} aria-hidden="true">
          {HERO_LINES.map((line) => (
            <span key={`bright-${line}`}>{line}</span>
          ))}
        </div>
      </section>
    </main>
  );
}