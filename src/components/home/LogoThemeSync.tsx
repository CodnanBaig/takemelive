'use client';

import { useEffect } from 'react';
import { gsap } from '@/lib/gsap';

const DEFAULT_INVERT = '1';

const CHROME_SELECTORS = [
  '[data-logo-anchor]',
  'nav[aria-label="Primary"]',
  '[data-scene-progress]',
].join(', ');

function getLogoSamplePoint(): { x: number; y: number } {
  const anchor = document.querySelector<HTMLElement>('[data-logo-anchor]');
  if (!anchor) {
    return { x: 48, y: 72 };
  }

  const rect = anchor.getBoundingClientRect();
  return {
    x: rect.left + rect.width * 0.35,
    y: rect.top + rect.height * 0.72,
  };
}

function isLogoChrome(element: Element): boolean {
  return element.closest(CHROME_SELECTORS) !== null;
}

function findSectionAtPoint(x: number, y: number): HTMLElement | null {
  const stack = document.elementsFromPoint(x, y);

  for (const element of stack) {
    if (!(element instanceof HTMLElement) || isLogoChrome(element)) {
      continue;
    }

    let node: HTMLElement | null = element;
    while (node) {
      if (node.dataset.logoInvert !== undefined) {
        return node;
      }
      node = node.parentElement;
    }
  }

  return null;
}

export default function LogoThemeSync() {
  useEffect(() => {
    const root = document.documentElement;
    root.style.removeProperty('--logo-invert');

    let activeInvert = DEFAULT_INVERT;

    const applyTheme = () => {
      const { x, y } = getLogoSamplePoint();
      const section = findSectionAtPoint(x, y);
      const nextInvert = section?.dataset.logoInvert ?? DEFAULT_INVERT;

      if (nextInvert === activeInvert) {
        return;
      }

      activeInvert = nextInvert;
      root.style.setProperty('--logo-invert', nextInvert);
    };

    const onTick = () => {
      applyTheme();
    };

    gsap.ticker.add(onTick);
    window.addEventListener('resize', applyTheme);
    applyTheme();

    return () => {
      gsap.ticker.remove(onTick);
      window.removeEventListener('resize', applyTheme);
      root.style.removeProperty('--logo-invert');
    };
  }, []);

  return null;
}
