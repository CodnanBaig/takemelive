'use client';

import { useEffect } from 'react';

const THRESHOLDS = [0.2, 0.35, 0.5, 0.65, 0.8];

export default function LogoThemeSync() {
  useEffect(() => {
    const root = document.documentElement;
    const themedSections = Array.from(document.querySelectorAll<HTMLElement>('[data-logo-invert]'));
    const manualSections = Array.from(document.querySelectorAll<HTMLElement>('[data-logo-control="manual"]'));

    if (!themedSections.length) {
      return;
    }

    const ratios = new Map<HTMLElement, number>();
    const manualRatios = new Map<HTMLElement, number>();

    const applyTheme = () => {
      const hasManualControl = Array.from(manualRatios.values()).some((ratio) => ratio > 0.35);
      if (hasManualControl) {
        return;
      }

      const activeSection = themedSections
        .map((section) => ({ section, ratio: ratios.get(section) ?? 0 }))
        .sort((a, b) => b.ratio - a.ratio)[0]?.section;

      root.style.setProperty('--logo-invert', activeSection?.dataset.logoInvert ?? '1');
    };

    const themedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target as HTMLElement, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        applyTheme();
      },
      {
        threshold: THRESHOLDS,
        rootMargin: '-12% 0px -18% 0px',
      },
    );

    const manualObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          manualRatios.set(entry.target as HTMLElement, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        applyTheme();
      },
      {
        threshold: THRESHOLDS,
        rootMargin: '-10% 0px -10% 0px',
      },
    );

    themedSections.forEach((section) => {
      ratios.set(section, 0);
      themedObserver.observe(section);
    });

    manualSections.forEach((section) => {
      manualRatios.set(section, 0);
      manualObserver.observe(section);
    });

    applyTheme();

    return () => {
      themedObserver.disconnect();
      manualObserver.disconnect();
    };
  }, []);

  return null;
}
