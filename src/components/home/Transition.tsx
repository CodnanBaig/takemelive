'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import ScrollOrnament from './ScrollOrnament';
import styles from './Transition.module.scss';

const SUBHEADING_LINES = [
  'We create experiences designed to be seen, felt, and remembered.',
  'Moments that stop people.',
  'Spaces that pull them in.',
  'Stories that stay with them.',
  'Because when something happens live, it matters more.',
];

export default function Transition() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gateLeftRef = useRef<HTMLDivElement | null>(null);
  const gateRightRef = useRef<HTMLDivElement | null>(null);
  const scopeRef = useRef<HTMLDivElement | null>(null);
  const scopeCoordRef = useRef<HTMLDivElement | null>(null);
  const timecodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const gateLeft = gateLeftRef.current;
    const gateRight = gateRightRef.current;
    const timecode = timecodeRef.current;

    if (!section || !gateLeft || !gateRight) {
      return;
    }

    const getPinDistance = () => {
      const revealDistance = window.innerHeight * 0.9;
      const manifestoDistance = window.innerHeight * 1.25;
      const sublineDistance = window.innerHeight * 0.65;
      const holdDistance = window.innerHeight * 0.5;
      const exitDistance = window.innerHeight * 0.85;
      return Math.round(
        revealDistance +
          manifestoDistance +
          sublineDistance +
          holdDistance +
          exitDistance,
      );
    };

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(gateLeft, { xPercent: -101 });
        gsap.set(gateRight, { xPercent: 101 });
        const gridLines = section.querySelectorAll('[data-grid-line]');
        const brackets = section.querySelectorAll('[data-hud-bracket]');
        const telemetries = section.querySelectorAll('[data-telemetry]');
        const manifestoRows = section.querySelectorAll('[data-manifesto-row]');
        const subLines = section.querySelectorAll('[data-subline]');

        gsap.set(gridLines, { scaleX: 1, scaleY: 1 });
        gsap.set(brackets, { opacity: 1, scale: 1 });
        gsap.set(telemetries, { opacity: 1, y: 0 });
        gsap.set(manifestoRows, { opacity: 1, y: 0, filter: 'none' });
        gsap.set(subLines, { opacity: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const gridLines = section.querySelectorAll('[data-grid-line]');
        const brackets = section.querySelectorAll('[data-hud-bracket]');
        const telemetries = section.querySelectorAll('[data-telemetry]');
        const manifestoRows = section.querySelectorAll('[data-manifesto-row]');
        const subLines = section.querySelectorAll('[data-subline]');

        // Setup start state
        gsap.set(gateLeft, { xPercent: 0 });
        gsap.set(gateRight, { xPercent: 0 });
        gsap.set(gridLines, { scaleX: 0, scaleY: 0 });
        gsap.set(brackets, { opacity: 0, scale: 1.3 });
        gsap.set(telemetries, { opacity: 0, y: 10 });
        gsap.set(manifestoRows, { opacity: 0, y: 30, filter: 'blur(8px)' });
        gsap.set(subLines, { opacity: 0, y: 15 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getPinDistance()}`,
            pin: true,
            scrub: 0.95,
            anticipatePin: 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (timecode) {
                const totalFrames = Math.floor(self.progress * 240);
                const sec = Math.floor(totalFrames / 60);
                const frame = totalFrames % 60;
                timecode.innerText = `TC: 00:00:0${sec}:${frame.toString().padStart(2, '0')}`;
              }
            },
          },
        });

        timeline
          // 1. Gates slide open
          .to(gateLeft, { xPercent: -101, duration: 0.25, ease: 'power2.inOut' }, 0)
          .to(gateRight, { xPercent: 101, duration: 0.25, ease: 'power2.inOut' }, 0)
          
          // 2. HUD grid and borders draw in
          .to(gridLines, { scaleX: 1, scaleY: 1, duration: 0.2, ease: 'power2.out', stagger: 0.05 }, 0.1)
          .to(brackets, { opacity: 1, scale: 1, duration: 0.15, ease: 'back.out(1.5)', stagger: 0.03 }, 0.15)
          .to(telemetries, { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out', stagger: 0.03 }, 0.18)

          // 3. Kinetic typography animation
          .to(manifestoRows[0], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.15, ease: 'power3.out' }, 0.28)
          .to(manifestoRows[1], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.15, ease: 'power3.out' }, 0.36)
          .to(manifestoRows[2], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.15, ease: 'power3.out' }, 0.44)
          .to(manifestoRows[3], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.18, ease: 'back.out(1.7)' }, 0.52)

          // 4. Subheadings reveal
          .to(subLines, { opacity: 1, y: 0, duration: 0.2, ease: 'power3.out', stagger: 0.06 }, 0.62)

          // 5. Exit - collapse elements
          .to(manifestoRows, { opacity: 0, y: -40, filter: 'blur(8px)', duration: 0.15, ease: 'power2.in', stagger: 0.03 }, 0.9)
          .to(subLines, { opacity: 0, y: -20, duration: 0.15, ease: 'power2.in', stagger: 0.02 }, 0.92)
          .to(brackets, { opacity: 0, scale: 0.8, duration: 0.15, ease: 'power2.in' }, 0.94)
          .to(telemetries, { opacity: 0, y: -10, duration: 0.15, ease: 'power2.in' }, 0.94)
          .to(gridLines, { scaleX: 0, scaleY: 0, duration: 0.15, ease: 'power2.in' }, 0.95);
      });

      mm.add('(pointer:fine) and (prefers-reduced-motion: no-preference)', () => {
        const scope = scopeRef.current;
        const coordText = scopeCoordRef.current;
        if (!scope || !coordText) return;

        const xTo = gsap.quickTo(scope, '--scope-x', { duration: 0.15, ease: 'power2.out' });
        const yTo = gsap.quickTo(scope, '--scope-y', { duration: 0.15, ease: 'power2.out' });
        const opacityTo = gsap.quickTo(scope, 'opacity', { duration: 0.3, ease: 'power2.out' });

        gsap.set(scope, { opacity: 0 });

        const handlePointerMove = (e: PointerEvent) => {
          const rect = section.getBoundingClientRect();
          const xPct = ((e.clientX - rect.left) / rect.width) * 100;
          const yPct = ((e.clientY - rect.top) / rect.height) * 100;
          xTo(xPct);
          yTo(yPct);
          coordText.innerText = `X: ${xPct.toFixed(1)}% | Y: ${yPct.toFixed(1)}%`;
        };

        const handlePointerEnter = () => {
          opacityTo(1);
        };

        const handlePointerLeave = () => {
          opacityTo(0);
        };

        section.addEventListener('pointermove', handlePointerMove);
        section.addEventListener('pointerenter', handlePointerEnter);
        section.addEventListener('pointerleave', handlePointerLeave);

        return () => {
          section.removeEventListener('pointermove', handlePointerMove);
          section.removeEventListener('pointerenter', handlePointerEnter);
          section.removeEventListener('pointerleave', handlePointerLeave);
        };
      });

      return () => {
        mm.revert();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="chapter-transition"
      data-chapter="transition"
      data-scene="manifesto"
      ref={sectionRef}
      className={styles.transition}
      aria-label="Manifesto"
    >
      <ScrollOrnament variant="glyph-light" position="tl" />
      <div className={styles.stage} data-logo-invert="0">
        
        {/* Stark Black-and-White Split Gates */}
        <div ref={gateLeftRef} className={styles.gateLeft} aria-hidden>
          <div className={styles.splitTextInner}>TAKE ME LIVE</div>
        </div>
        <div ref={gateRightRef} className={styles.gateRight} aria-hidden>
          <div className={styles.splitTextInner}>TAKE ME LIVE</div>
        </div>

        {/* HUD Grid Overlay */}
        <div className={styles.hudGridLines}>
          <div data-grid-line className={`${styles.gridLine} ${styles.gridLineH1}`} />
          <div data-grid-line className={`${styles.gridLine} ${styles.gridLineH2}`} />
          <div data-grid-line className={`${styles.gridLine} ${styles.gridLineV1}`} />
          <div data-grid-line className={`${styles.gridLine} ${styles.gridLineV2}`} />
        </div>

        {/* HUD Corner Brackets */}
        <div data-hud-bracket className={`${styles.bracket} ${styles.tl}`} />
        <div data-hud-bracket className={`${styles.bracket} ${styles.tr}`} />
        <div data-hud-bracket className={`${styles.bracket} ${styles.bl}`} />
        <div data-hud-bracket className={`${styles.bracket} ${styles.br}`} />

        {/* HUD Center Crosshair */}
        <div className={styles.centerCrosshair}>+</div>

        {/* Telemetry Corner Readouts */}
        <div data-telemetry className={styles.telemetryTL}>
          <span>LIVE PRODUCTION FLOW // CAM_02</span>
        </div>

        <div data-telemetry className={styles.telemetryTR}>
          <span className={styles.recDot}>●</span>
          <span>REC [60FPS]</span>
        </div>

        <div data-telemetry className={styles.telemetryBL}>
          <div className={styles.audioFeed}>
            <span className={styles.audioLabel}>AUDIO FEED</span>
            <div className={styles.audioBars}>
              <div className={`${styles.bar} ${styles.bar1}`} />
              <div className={`${styles.bar} ${styles.bar2}`} />
              <div className={`${styles.bar} ${styles.bar3}`} />
              <div className={`${styles.bar} ${styles.bar4}`} />
              <div className={`${styles.bar} ${styles.bar5}`} />
              <div className={`${styles.bar} ${styles.bar6}`} />
              <div className={`${styles.bar} ${styles.bar7}`} />
              <div className={`${styles.bar} ${styles.bar8}`} />
            </div>
          </div>
        </div>

        <div data-telemetry className={styles.telemetryBR} ref={timecodeRef}>
          TC: 00:00:00:00
        </div>

        {/* Interactive Scope Reticle */}
        <div ref={scopeRef} className={styles.cursorScope} aria-hidden>
          <div className={styles.scopeReticle} />
          <div className={styles.scopeHLine} />
          <div className={styles.scopeVLine} />
          <div className={styles.scopeCoords} ref={scopeCoordRef}>
            X: 00.0% | Y: 00.0%
          </div>
        </div>

        {/* Kinetic Manifesto Text */}
        <div className={styles.headlineStack}>
          <div className={styles.textRail} aria-label="NOT EVERYTHING NEEDS ATTENTION. YOUR BRAND DOES.">
            <div data-manifesto-row className={`${styles.manifestoRow} ${styles.stencil}`}>
              NOT EVERYTHING
            </div>
            <div data-manifesto-row className={`${styles.manifestoRow} ${styles.solid}`}>
              NEEDS ATTENTION.
            </div>
            <div data-manifesto-row className={`${styles.manifestoRow} ${styles.stencil}`}>
              YOUR BRAND
            </div>
            <div data-manifesto-row className={`${styles.manifestoRow} ${styles.inverted}`}>
              <span className={styles.invertedText}>DOES.</span>
            </div>
          </div>
        </div>

        {/* Subheadings */}
        <div className={styles.subheading}>
          {SUBHEADING_LINES.map((line) => (
            <p key={line} className={styles.subLine} data-subline>
              {line}
            </p>
          ))}
        </div>

      </div>
    </section>
  );
}
