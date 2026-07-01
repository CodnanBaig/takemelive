import { getLenis } from '@/lib/lenis';
import { prefersReducedMotion } from '@/lib/motionPrefs';

const HOME_SCROLL_DURATION = 2.8;

export function scrollToTop() {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
  }
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

export function smoothScrollToElement(target: HTMLElement, hash?: string) {
  if (prefersReducedMotion()) {
    target.scrollIntoView({ behavior: 'auto', block: 'start' });
    if (hash && typeof window.history.replaceState === 'function') {
      window.history.replaceState(null, '', hash);
    }
    return;
  }

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, {
      duration: HOME_SCROLL_DURATION,
      easing: easeOutQuart,
    });
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (hash && typeof window.history.replaceState === 'function') {
    window.history.replaceState(null, '', hash);
  }
}
