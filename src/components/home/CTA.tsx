'use client';

import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { sectionRevealScroll } from '@/lib/scrollScene';
import ScrollOrnament from './ScrollOrnament';
import styles from './CTA.module.scss';

const FORM_FIELDS = ['First Name*', 'Email*', 'Company', 'Project Type', 'Tell us about your idea'] as const;

function fieldLabel(field: (typeof FORM_FIELDS)[number]): string {
  return field.replace(/\*$/, '').trim();
}

function submitLabel(stepIndex: number, isComplete: boolean): string {
  if (isComplete) {
    return 'Start over';
  }
  if (stepIndex >= FORM_FIELDS.length - 1) {
    return 'Submit';
  }
  return 'Next question';
}

export default function CTA() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stepRef = useRef<HTMLDivElement | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [responses, setResponses] = useState<string[]>(() => Array(FORM_FIELDS.length).fill(''));
  const [isComplete, setIsComplete] = useState(false);

  const progressCount = useMemo(() => FORM_FIELDS.length, []);
  const currentField = FORM_FIELDS[stepIndex];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const left = section.querySelector<HTMLElement>('[data-cta-left]');
    const heading = section.querySelector<HTMLElement>('[data-cta-heading]');
    const paragraphs = Array.from(section.querySelectorAll<HTMLElement>('[data-cta-copy]'));
    const card = section.querySelector<HTMLElement>('[data-cta-card]');
    const bubble = section.querySelector<HTMLElement>('[data-cta-bubble]');
    const stepField = section.querySelector<HTMLElement>('[data-cta-step-field]');
    const progress = section.querySelector<HTMLElement>('[data-cta-progress]');
    const orb = section.querySelector<HTMLElement>('[data-cta-orb]');

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([left, heading, ...paragraphs, card, bubble, stepField, progress, orb], {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
        });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const isCompact = window.matchMedia('(max-width: 900px)').matches;

        gsap.set(card, { transformPerspective: 1200, transformOrigin: '50% 50%' });

        gsap
          .timeline({
            scrollTrigger: sectionRevealScroll(section, 0.76),
          })
          .fromTo(
            left,
            { autoAlpha: 0, x: isCompact ? 0 : -70, y: 22 },
            { autoAlpha: 1, x: 0, y: 0, ease: 'none', duration: 0.48 },
            0,
          )
          .fromTo(
            heading,
            { autoAlpha: 0, yPercent: 120, skewY: 7 },
            { autoAlpha: 1, yPercent: 0, skewY: 0, ease: 'none', duration: 0.5 },
            0.1,
          )
          .fromTo(
            paragraphs,
            { autoAlpha: 0, y: 28 },
            { autoAlpha: 1, y: 0, stagger: 0.08, ease: 'none', duration: 0.48 },
            0.22,
          )
          .fromTo(
            card,
            { autoAlpha: 0, x: isCompact ? 0 : 100, y: 36, rotateY: isCompact ? 0 : -10, rotateX: isCompact ? 0 : 7, scale: 0.92 },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              rotateY: 0,
              rotateX: 0,
              scale: 1,
              ease: 'none',
              duration: 0.55,
            },
            0.18,
          )
          .fromTo(
            bubble,
            { autoAlpha: 0, y: 20, scale: 0.9 },
            { autoAlpha: 1, y: 0, scale: 1, ease: 'none', duration: 0.42 },
            0.32,
          )
          .fromTo(
            stepField,
            { autoAlpha: 0, y: 30, x: 24 },
            { autoAlpha: 1, y: 0, x: 0, ease: 'none', duration: 0.4 },
            0.38,
          )
          .fromTo(
            progress,
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, ease: 'none', duration: 0.35 },
            0.44,
          );

        gsap.fromTo(
          orb,
          { xPercent: -40, yPercent: -20 },
          {
            xPercent: 40,
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.9,
              invalidateOnRefresh: true,
            },
          },
        );

        if (!reduceMotion) {
          gsap.fromTo(
            card,
            { yPercent: 2 },
            {
              yPercent: -2,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.1,
                invalidateOnRefresh: true,
              },
            },
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const step = stepRef.current;
    if (!step || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.fromTo(
      step,
      { autoAlpha: 0, y: 18, x: 16, scale: 0.98 },
      { autoAlpha: 1, y: 0, x: 0, scale: 1, duration: 0.36, ease: 'power3.out' },
    );
  }, [stepIndex, isComplete]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = [...responses];
    next[stepIndex] = event.target.value;
    setResponses(next);
  };

  const handleNext = (event: FormEvent) => {
    event.preventDefault();
    if (isComplete) {
      setStepIndex(0);
      setResponses(Array(FORM_FIELDS.length).fill(''));
      setIsComplete(false);
      return;
    }
    if (stepIndex >= FORM_FIELDS.length - 1) {
      setIsComplete(true);
      return;
    }
    setStepIndex((value) => value + 1);
  };

  return (
    <section
      id="chapter-cta"
      data-chapter="cta"
      data-logo-invert="0"
      ref={sectionRef}
      className={styles.section}
      aria-label="Contact us call to action"
    >
      <ScrollOrnament variant="glyph-dark" position="br" />
      <div className={styles.inner}>
        <div className={styles.left} data-cta-left>
          <h2 className={styles.heading} data-cta-heading>
            LET&apos;S CREATE SOMETHING PEOPLE REMEMBER.
          </h2>
          <p data-cta-copy>
            If you&apos;re looking to create an experience that connects with audiences in a meaningful way,
            we&apos;d love to hear from you.
          </p>
          <p data-cta-copy>
            Whether it&apos;s a large-scale production, immersive environment, or brand activation - we
            approach every project with creativity, precision, and purpose.
          </p>
          <p data-cta-copy>Let&apos;s start the conversation.</p>
        </div>

        <div className={styles.right}>
          <div className={styles.formCard} data-cta-card>
            <span className={styles.orb} data-cta-orb aria-hidden="true" />
            <div className={styles.chatTop}>
              <div className={styles.bubble} data-cta-bubble>
                Hey 👋 Please fill out the following quick questions so our team can get in touch with
                you.
              </div>
            </div>

            <form className={styles.formStage} onSubmit={handleNext}>
              <div
                key={isComplete ? 'complete' : currentField}
                className={styles.stepField}
                data-cta-step-field
                ref={stepRef}
              >
                {isComplete ? (
                  <p className={styles.thankYou}>Perfect - our team will reach out shortly.</p>
                ) : (
                  <div className={styles.fieldMain}>
                    <label className={styles.fieldLabel} htmlFor="cta-input">
                      {fieldLabel(currentField)}
                    </label>
                    <input
                      id="cta-input"
                      name="cta-input"
                      type={currentField.includes('Email') ? 'email' : 'text'}
                      value={responses[stepIndex]}
                      onChange={handleChange}
                      autoComplete="off"
                      required={currentField.includes('*')}
                      aria-required={currentField.includes('*')}
                      placeholder={`Enter ${fieldLabel(currentField).toLowerCase()}`}
                    />
                  </div>
                )}
                <button
                  type="submit"
                  className={styles.nextBtn}
                  aria-label={submitLabel(stepIndex, isComplete)}
                >
                  <span aria-hidden="true">
                    {isComplete ? '↺' : stepIndex === FORM_FIELDS.length - 1 ? '✓' : '→'}
                  </span>
                </button>
              </div>
            </form>

            <div className={styles.progress} data-cta-progress aria-hidden="true">
              {Array.from({ length: progressCount }).map((_, index) => (
                <span
                  key={`dot-${index}`}
                  className={index <= stepIndex && !isComplete ? styles.progressActive : ''}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
