/** Scrub band while a section enters the viewport (copy reveals tied to scroll). */
export function sectionRevealScroll(
  trigger: Element,
  scrub = 0.75,
) {
  return {
    trigger,
    start: 'top 90%',
    end: 'top 32%',
    scrub,
    invalidateOnRefresh: true,
  };
}

/** Full passage — section progress 0→1 as it crosses the viewport. */
export function sectionPassageScroll(
  trigger: Element,
  scrub: boolean | number = 0.85,
) {
  return {
    trigger,
    start: 'top bottom',
    end: 'bottom top',
    scrub,
    invalidateOnRefresh: true,
  };
}

/** Hero / pinned scenes — progress while element spans the viewport. */
export function sectionSpanScroll(
  trigger: Element,
  scrub: boolean | number = 0.55,
) {
  return {
    trigger,
    start: 'top top',
    end: 'bottom top',
    scrub,
    invalidateOnRefresh: true,
  };
}

export function setSectionProgress(section: HTMLElement, progress: number) {
  section.style.setProperty('--section-progress', progress.toFixed(4));
}
