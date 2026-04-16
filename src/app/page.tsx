'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './page.module.scss';

const HERO_LINES = ['MORE THAN', 'MOVERS', 'SHOW MAKERS!'];

export default function Home() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const typeLayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const typeLayer = typeLayerRef.current;

    if (!hero || !typeLayer) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [hero, typeLayer],
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.08 },
      );

      const mm = gsap.matchMedia();

      mm.add('(pointer:fine)', () => {
        const spotXTo = gsap.quickTo(typeLayer, '--spot-x', {
          duration: 0.5,
          ease: 'power2.out',
        });
        const spotYTo = gsap.quickTo(typeLayer, '--spot-y', {
          duration: 0.5,
          ease: 'power2.out',
        });
        const spotSizeTo = gsap.quickTo(typeLayer, '--spot-size', {
          duration: 0.58,
          ease: 'power2.out',
        });
        const spotOpacityTo = gsap.quickTo(typeLayer, '--spot-opacity', {
          duration: 0.36,
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
          spotSizeTo(340);
          spotOpacityTo(1);
        };

        const handlePointerLeave = () => {
          spotSizeTo(0);
          spotOpacityTo(0);
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
        <div ref={typeLayerRef} className={styles.typeLayer} aria-hidden="true">
          {HERO_LINES.map((line) => (
            <span key={`base-${line}`}>{line}</span>
          ))}
        </div>
      </section>
    </main>
  );
}