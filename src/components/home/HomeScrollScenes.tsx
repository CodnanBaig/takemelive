'use client';

import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { sectionPassageScroll, setSectionProgress } from '@/lib/scrollScene';

const ORNAMENT_OFFSET: Record<string, { y: number; rotate: number; x: number }> = {
  tl: { y: -48, rotate: -28, x: -36 },
  tr: { y: -40, rotate: 22, x: 40 },
  bl: { y: 52, rotate: 18, x: -32 },
  br: { y: 44, rotate: -20, x: 36 },
};

export default function HomeScrollScenes() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('main [data-chapter]'),
    ).filter((section) => section.dataset.chapter !== 'featured-projects');

    if (!sections.length) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        sections.forEach((section) => {
          setSectionProgress(section, 0);
          const ornaments = section.querySelectorAll<HTMLElement>('[data-scroll-ornament]');
          gsap.set(ornaments, { clearProps: 'all' });
        });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        sections.forEach((section) => {
          const ornaments = Array.from(
            section.querySelectorAll<HTMLElement>('[data-scroll-ornament]'),
          );
          const shifts = Array.from(
            section.querySelectorAll<HTMLElement>('[data-scroll-shift]'),
          );
          const depthLayers = Array.from(
            section.querySelectorAll<HTMLElement>('[data-scroll-depth]'),
          );

          ScrollTrigger.create({
            ...sectionPassageScroll(section, 0.9),
            onUpdate: (self) => {
              setSectionProgress(section, self.progress);

              ornaments.forEach((ornament) => {
                const position =
                  ornament.dataset.ornamentPosition ?? 'tr';
                const offset = ORNAMENT_OFFSET[position] ?? ORNAMENT_OFFSET.tr;
                const wave = Math.sin(self.progress * Math.PI);
                gsap.set(ornament, {
                  y: gsap.utils.interpolate(offset.y, -offset.y, self.progress),
                  x: gsap.utils.interpolate(offset.x * 0.35, offset.x, wave),
                  rotate: gsap.utils.interpolate(
                    offset.rotate * 0.4,
                    offset.rotate,
                    self.progress,
                  ),
                  scale: 0.82 + wave * 0.22,
                  opacity: 0.08 + wave * 0.2,
                });
              });

              shifts.forEach((el, index) => {
                const direction = index % 2 === 0 ? 1 : -1;
                gsap.set(el, {
                  y: (self.progress - 0.5) * 36 * direction,
                  x: (self.progress - 0.5) * 18 * -direction,
                });
              });

              depthLayers.forEach((el, index) => {
                const depth = 0.12 + index * 0.06;
                gsap.set(el, {
                  yPercent: (self.progress - 0.5) * depth * 100,
                  scale: 1 + (self.progress - 0.5) * depth * 0.12,
                });
              });
            },
          });
        });

        ScrollTrigger.refresh();
      });

      return () => {
        mm.revert();
      };
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      ctx.revert();
    };
  }, []);

  return null;
}
