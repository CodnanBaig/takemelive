export const REDUCE_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.matchMedia(REDUCE_MOTION_QUERY).matches;
}

export function applyMotionPreferenceClass(): boolean {
  const reduced = prefersReducedMotion();
  document.documentElement.dataset.reduceMotion = reduced ? 'true' : 'false';
  return reduced;
}

export function subscribeMotionPreference(onChange: (reduced: boolean) => void): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const media = window.matchMedia(REDUCE_MOTION_QUERY);
  const notify = () => {
    const reduced = applyMotionPreferenceClass();
    onChange(reduced);
  };

  notify();
  media.addEventListener('change', notify);

  return () => {
    media.removeEventListener('change', notify);
  };
}
