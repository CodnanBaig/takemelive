'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import styles from './WhyUs.module.scss';

type Pillar = {
  number: string;
  label: string;
  title: string;
  description: string;
  meta: string;
};

const PILLARS: Pillar[] = [
  {
    number: '01',
    label: 'Concepting',
    title: 'Culture-Led Concepting',
    description:
      'Ideas are built from audience behavior, not trend-chasing decks. We start where the room already is and design forward from there.',
    meta: 'Audience · Insight · Intent',
  },
  {
    number: '02',
    label: 'Execution',
    title: 'One Team, Full Execution',
    description:
      'Strategy, creative, production, and on-ground delivery stay under one roof. No handoffs, no broken telephone, no slipping intent.',
    meta: 'Strategy · Build · Show call',
  },
  {
    number: '03',
    label: 'Technology',
    title: 'Technology That Serves Story',
    description:
      'Interactive systems are designed to amplify emotion, not distract from it. Tech is invisible until the moment it matters.',
    meta: 'Interactive · AI · Show control',
  },
  {
    number: '04',
    label: 'Impact',
    title: 'Measured Impact',
    description:
      'Every scene is engineered for lasting recall and trackable engagement — the experience keeps working after the lights go down.',
    meta: 'Recall · Engagement · Lift',
  },
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const eyebrow = section.querySelector<HTMLElement>('[data-eyebrow]');
    const headlineWords = section.querySelectorAll<HTMLElement>('[data-headline-word]');
    const lead = section.querySelector<HTMLElement>('[data-lead]');
    const tickerCurrent = section.querySelector<HTMLElement>('[data-ticker-current]');
    const tickerLabel = section.querySelector<HTMLElement>('[data-ticker-label]');
    const progressBar = section.querySelector<HTMLElement>('[data-progress-bar]');
    const panels = Array.from(section.querySelectorAll<HTMLElement>('[data-panel]'));
    const stage = section.querySelector<HTMLElement>('[data-stage]');

    if (!stage || panels.length === 0) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(
          [eyebrow, ...Array.from(headlineWords), lead, tickerCurrent, tickerLabel, ...panels],
          { autoAlpha: 1, x: 0, y: 0, yPercent: 0, clearProps: 'all' },
        );
        gsap.set(panels, { autoAlpha: 1, position: 'relative' });
        if (progressBar) gsap.set(progressBar, { scaleX: 1 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const isCompact = window.matchMedia('(max-width: 900px)').matches;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
              end: 'top 28%',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(eyebrow, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'none' }, 0)
          .fromTo(
            headlineWords,
            { yPercent: 110, autoAlpha: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 0.55,
              stagger: 0.08,
              ease: 'none',
            },
            0.05,
          )
          .fromTo(lead, { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'none' }, 0.3);

        if (isCompact) {
          panels.forEach((panel) => {
            const number = panel.querySelector<HTMLElement>('[data-panel-number]');
            const titleLines = panel.querySelectorAll<HTMLElement>('[data-panel-title-line]');
            const body = panel.querySelector<HTMLElement>('[data-panel-body]');
            const meta = panel.querySelector<HTMLElement>('[data-panel-meta]');
            const rule = panel.querySelector<HTMLElement>('[data-panel-rule]');

            gsap.set(panel, { position: 'relative', autoAlpha: 1 });
            gsap.set([number, titleLines, body, meta], { autoAlpha: 0, y: 28 });
            if (rule) gsap.set(rule, { scaleX: 0, transformOrigin: 'left center' });

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: panel,
                  start: 'top 82%',
                  end: 'top 50%',
                  scrub: 0.5,
                  invalidateOnRefresh: true,
                },
              })
              .to(number, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'none' }, 0)
              .to(titleLines, { autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.5, ease: 'none' }, 0.05)
              .to(body, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'none' }, 0.2)
              .to(meta, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'none' }, 0.28)
              .to(rule, { scaleX: 1, duration: 0.6, ease: 'none' }, 0.05);
          });

          if (progressBar) {
            gsap.fromTo(
              progressBar,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: 'top 60%',
                  end: 'bottom 70%',
                  scrub: 0.5,
                  invalidateOnRefresh: true,
                },
              },
            );
          }

          return;
        }

        gsap.set(panels, {
          position: 'absolute',
          inset: 0,
          autoAlpha: 0,
        });
        gsap.set(panels[0], { autoAlpha: 1 });

        const panelSegments = panels.length;
        const pinDistance = () => window.innerHeight * (panelSegments * 0.9 + 0.4);

        const master = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${pinDistance()}`,
            pin: stage,
            pinSpacing: true,
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              if (progressBar) {
                gsap.set(progressBar, { scaleX: progress });
              }
              const activeIndex = Math.min(
                panels.length - 1,
                Math.max(0, Math.floor(progress * panels.length - 1e-6)),
              );
              const active = PILLARS[activeIndex];
              if (tickerCurrent && tickerCurrent.dataset.value !== active.number) {
                tickerCurrent.dataset.value = active.number;
                tickerCurrent.textContent = active.number;
                gsap.fromTo(
                  tickerCurrent,
                  { yPercent: 60, autoAlpha: 0 },
                  { yPercent: 0, autoAlpha: 1, duration: 0.45, ease: 'power3.out', overwrite: true },
                );
              }
              if (tickerLabel && tickerLabel.dataset.value !== active.label) {
                tickerLabel.dataset.value = active.label;
                tickerLabel.textContent = active.label;
                gsap.fromTo(
                  tickerLabel,
                  { autoAlpha: 0, x: 12 },
                  { autoAlpha: 1, x: 0, duration: 0.45, ease: 'power3.out', overwrite: true },
                );
              }
            },
          },
        });

        const segmentLength = 1;
        panels.forEach((panel, index) => {
          const number = panel.querySelector<HTMLElement>('[data-panel-number]');
          const titleLines = panel.querySelectorAll<HTMLElement>('[data-panel-title-line]');
          const body = panel.querySelector<HTMLElement>('[data-panel-body]');
          const meta = panel.querySelector<HTMLElement>('[data-panel-meta]');
          const rule = panel.querySelector<HTMLElement>('[data-panel-rule]');

          gsap.set([number, body, meta], { autoAlpha: 0, y: 40 });
          gsap.set(titleLines, {
            autoAlpha: 0,
            yPercent: 110,
            clipPath: 'inset(0% 0% 100% 0%)',
          });
          if (rule) gsap.set(rule, { scaleX: 0, transformOrigin: 'left center' });

          const start = index * segmentLength;

          if (index > 0) {
            master.to(
              panels[index - 1],
              { autoAlpha: 0, yPercent: -10, duration: 0.4, ease: 'none' },
              start - 0.2,
            );
            master.fromTo(
              panel,
              { autoAlpha: 0, yPercent: 18 },
              { autoAlpha: 1, yPercent: 0, duration: 0.5, ease: 'none' },
              start - 0.1,
            );
          }

          master
            .to(number, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'none' }, start + 0.05)
            .to(
              titleLines,
              {
                autoAlpha: 1,
                yPercent: 0,
                clipPath: 'inset(0% 0% 0% 0%)',
                stagger: 0.05,
                duration: 0.5,
                ease: 'none',
              },
              start + 0.1,
            )
            .to(body, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'none' }, start + 0.25)
            .to(meta, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'none' }, start + 0.32);

          if (rule) {
            master.to(rule, { scaleX: 1, duration: 0.55, ease: 'none' }, start + 0.05);
          }
        });

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          const st = master.scrollTrigger;
          if (st) {
            master.progress(st.progress);
          }
        });
      });

      return () => {
        mm.revert();
      };
    }, section);

    return () => {
      ScrollTrigger.refresh();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="chapter-why-us"
      data-chapter="why-us"
      data-logo-invert="1"
      ref={sectionRef}
      className={styles.section}
      aria-label="Why Take Me Live"
    >
      <div className={styles.stage} data-stage>
        <div className={styles.grid}>
          <header className={styles.intro}>
            <p className={styles.kicker} data-eyebrow>
              Why us
            </p>
            <h2 className={styles.headline}>
              {['More', 'than', 'a vendor.', 'A live', 'system.'].map((word) => (
                <span key={word} className={styles.headlineWrap}>
                  <span data-headline-word>{word}</span>
                </span>
              ))}
            </h2>
            <p className={styles.lead} data-lead>
              We combine strategy, production, and live execution into one cohesive system, so the experience
              lands hard and feels intentional from first contact to final recall.
            </p>

            <div className={styles.ticker} aria-hidden="true">
              <div className={styles.tickerNum}>
                <span data-ticker-current data-value="01">
                  01
                </span>
                <span className={styles.tickerTotal}>/ 04</span>
              </div>
              <span className={styles.tickerLabel} data-ticker-label data-value="Concepting">
                Concepting
              </span>
            </div>
          </header>

          <div className={styles.panelArea}>
            {PILLARS.map((pillar) => (
              <article key={pillar.number} data-panel className={styles.panel} aria-label={pillar.title}>
                <div className={styles.panelBody}>
                  <p className={styles.panelTag}>
                    <span data-panel-number>{pillar.number}</span>
                    <span className={styles.panelDivider} aria-hidden="true" />
                    <span>{pillar.label}</span>
                  </p>
                  <h3 className={styles.panelTitle}>
                    {pillar.title.split(' ').map((word, i) => (
                      <span key={`${pillar.number}-${i}`} className={styles.panelTitleWrap}>
                        <span data-panel-title-line>{word}</span>
                      </span>
                    ))}
                  </h3>
                  <span className={styles.panelRule} data-panel-rule aria-hidden="true" />
                  <p className={styles.panelText} data-panel-body>
                    {pillar.description}
                  </p>
                  <p className={styles.panelMeta} data-panel-meta>
                    {pillar.meta}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.progressTrack} aria-hidden="true">
          <span className={styles.progressBar} data-progress-bar />
        </div>
      </div>
    </section>
  );
}
