'use client';

import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import {
  animateMaskReveal,
  setMaskHidden,
  setMaskVisible,
} from '@/lib/maskReveal';
import { sectionRevealScroll, sectionSpanScroll } from '@/lib/scrollScene';
import { scrollToTop } from '@/lib/smoothScroll';
import type { FeaturedProject } from '@/content/featuredProjects';
import CinematicAtmosphere from '@/components/cinematic/CinematicAtmosphere';
import HomeScrollScenes from '@/components/home/HomeScrollScenes';
import LogoThemeSync from '@/components/home/LogoThemeSync';
import Footer from '@/components/home/Footer';
import ScrollOrnament from '@/components/home/ScrollOrnament';
import styles from './ContactContent.module.scss';

const HERO_LINES = [
  ['GET', 'IN'],
  ['TOUCH'],
] as const;

const HERO_SUBLINES = [
  'Share your project in a few steps.',
  'Our producers review every brief and respond within two business days.',
] as const;

const MANIFESTO_LINES = [
  'If you are planning a live moment that needs to land with audiences, we want to hear the full picture.',
  'Large-scale production, immersive environment, brand activation, or ceremonial opening: scope, timeline, and location all help us respond with clarity.',
  'Start the brief below, or reach us directly.',
] as const;

const PROJECT_TYPES = [
  'Large-scale production',
  'Immersive environment',
  'Brand activation',
  'Festival or concert',
  'Ceremony or opening',
  'Other',
] as const;

type StepKind = 'text' | 'email' | 'select' | 'textarea';

type FormStep = {
  id: keyof FormState;
  label: string;
  placeholder: string;
  kind: StepKind;
  required: boolean;
};

const FORM_STEPS: FormStep[] = [
  {
    id: 'firstName',
    label: 'First name',
    placeholder: 'Type your first name',
    kind: 'text',
    required: true,
  },
  {
    id: 'lastName',
    label: 'Last name',
    placeholder: 'Type your last name',
    kind: 'text',
    required: true,
  },
  {
    id: 'email',
    label: 'Email',
    placeholder: 'you@company.com',
    kind: 'email',
    required: true,
  },
  {
    id: 'company',
    label: 'Company',
    placeholder: 'Organization or brand',
    kind: 'text',
    required: false,
  },
  {
    id: 'projectType',
    label: 'Project type',
    placeholder: 'Select a project type',
    kind: 'select',
    required: true,
  },
  {
    id: 'message',
    label: 'Project details',
    placeholder: 'Scope, timeline, location, audience size…',
    kind: 'textarea',
    required: true,
  },
];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
};

const EMPTY_FORM: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  projectType: '',
  message: '',
};

type ContactContentProps = {
  projects: FeaturedProject[];
};

export default function ContactContent({ projects }: ContactContentProps) {
  const pageRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const formSectionRef = useRef<HTMLElement | null>(null);
  const stepRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);

  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentStep = FORM_STEPS[stepIndex];

  const progressDots = useMemo(() => FORM_STEPS.length, []);

  useEffect(() => {
    const previousRestoration = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    scrollToTop();

    return () => {
      history.scrollRestoration = previousRestoration;
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) {
      return;
    }

    const words = hero.querySelectorAll<HTMLElement>('[data-hero-word]');
    const sublines = hero.querySelectorAll<HTMLElement>('[data-hero-subline]');
    const rail = hero.querySelector<HTMLElement>('[data-contact-rail]');
    const indicator = indicatorRef.current;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        setMaskVisible([...words, ...sublines]);
        gsap.set([rail, indicator].filter(Boolean), { autoAlpha: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        setMaskHidden(words, 'bottom');
        setMaskHidden(sublines, 'bottom');
        gsap.set(rail, { autoAlpha: 0, y: 24 });
        gsap.set(indicator, { clipPath: 'inset(0% 0% 100% 0%)' });

        const loadTimeline = gsap.timeline({ defaults: { ease: 'power4.out' } });

        loadTimeline
          .add(
            animateMaskReveal(words, 'bottom', {
              duration: 0.92,
              stagger: 0.08,
            }),
            0,
          )
          .add(
            animateMaskReveal(sublines, 'bottom', {
              duration: 0.72,
              stagger: 0.1,
            }),
            0.28,
          )
          .to(
            rail,
            { autoAlpha: 1, y: 0, duration: 0.58 },
            0.48,
          )
          .to(
            indicator,
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.62 },
            0.62,
          );

        gsap.to(indicator, {
          y: 10,
          repeat: -1,
          yoyo: true,
          duration: 0.85,
          ease: 'sine.inOut',
          delay: 1,
        });

        gsap
          .timeline({
            scrollTrigger: sectionSpanScroll(hero, 0.5),
          })
          .to(
            words,
            {
              yPercent: (index) => -8 - index * 3,
              ease: 'none',
              stagger: 0.04,
              duration: 1,
            },
            0,
          )
          .to(
            sublines,
            {
              yPercent: -110,
              ease: 'none',
              stagger: 0.05,
              duration: 1,
            },
            0,
          )
          .to(
            rail,
            {
              autoAlpha: 0,
              y: 18,
              ease: 'none',
              duration: 0.55,
            },
            0.1,
          )
          .to(
            indicator,
            {
              clipPath: 'inset(0% 0% 100% 0%)',
              y: 24,
              ease: 'none',
              duration: 0.5,
            },
            0,
          );
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = formSectionRef.current;
    if (!section) {
      return;
    }

    const left = section.querySelector<HTMLElement>('[data-contact-manifesto]');
    const heading = section.querySelector<HTMLElement>('[data-contact-form-heading]');
    const paragraphs = Array.from(
      section.querySelectorAll<HTMLElement>('[data-contact-manifesto-line]'),
    );
    const card = section.querySelector<HTMLElement>('[data-contact-card]');
    const bubble = section.querySelector<HTMLElement>('[data-contact-bubble]');
    const stepField = section.querySelector<HTMLElement>('[data-contact-step]');
    const progress = section.querySelector<HTMLElement>('[data-contact-progress]');
    const orb = section.querySelector<HTMLElement>('[data-contact-orb]');

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([left, heading, ...paragraphs, card, bubble, stepField, progress, orb], {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
        });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const isCompact = window.matchMedia('(max-width: 900px)').matches;

        gsap
          .timeline({
            scrollTrigger: sectionRevealScroll(section, 0.76),
          })
          .fromTo(
            left,
            { autoAlpha: 0, x: isCompact ? 0 : -64, y: 20 },
            { autoAlpha: 1, x: 0, y: 0, ease: 'none', duration: 0.48 },
            0,
          )
          .fromTo(
            heading,
            { autoAlpha: 0, yPercent: 110, skewY: 6 },
            { autoAlpha: 1, yPercent: 0, skewY: 0, ease: 'none', duration: 0.5 },
            0.08,
          )
          .fromTo(
            paragraphs,
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, stagger: 0.08, ease: 'none', duration: 0.46 },
            0.2,
          )
          .fromTo(
            card,
            {
              autoAlpha: 0,
              x: isCompact ? 0 : 88,
              y: 32,
              scale: 0.94,
            },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              ease: 'none',
              duration: 0.54,
            },
            0.16,
          )
          .fromTo(
            bubble,
            { autoAlpha: 0, y: 18, scale: 0.92 },
            { autoAlpha: 1, y: 0, scale: 1, ease: 'none', duration: 0.4 },
            0.3,
          )
          .fromTo(
            stepField,
            { autoAlpha: 0, y: 26, x: 18 },
            { autoAlpha: 1, y: 0, x: 0, ease: 'none', duration: 0.38 },
            0.36,
          )
          .fromTo(
            progress,
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, ease: 'none', duration: 0.34 },
            0.42,
          );

        gsap.fromTo(
          orb,
          { xPercent: -36, yPercent: -18 },
          {
            xPercent: 36,
            yPercent: 18,
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
      { autoAlpha: 0, y: 18, x: 14, scale: 0.98 },
      { autoAlpha: 1, y: 0, x: 0, scale: 1, duration: 0.36, ease: 'power3.out' },
    );
  }, [stepIndex, isComplete]);

  const updateField = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex((value) => value - 1);
    }
  };

  const handleReset = () => {
    setStepIndex(0);
    setForm(EMPTY_FORM);
    setIsComplete(false);
  };

  const handleNext = async (event: FormEvent) => {
    event.preventDefault();

    if (isComplete) {
      handleReset();
      return;
    }

    const value = form[currentStep.id].trim();
    if (currentStep.required && !value) {
      return;
    }

    if (stepIndex >= FORM_STEPS.length - 1) {
      setIsSubmitting(true);
      await new Promise((resolve) => {
        window.setTimeout(resolve, 720);
      });
      setIsSubmitting(false);
      setIsComplete(true);
      return;
    }

    setStepIndex((value) => value + 1);
  };

  const renderStepInput = (step: FormStep) => {
    const shared = {
      id: `contact-${step.id}`,
      name: step.id,
      value: form[step.id],
      required: step.required,
      'aria-required': step.required,
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
        updateField(step.id, event.target.value),
    };

    if (step.kind === 'select') {
      return (
        <select {...shared} className={styles.stepSelect} autoFocus>
          <option value="" disabled>
            {step.placeholder}
          </option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      );
    }

    if (step.kind === 'textarea') {
      return (
        <textarea
          {...shared}
          className={styles.stepTextarea}
          placeholder={step.placeholder}
          autoFocus
        />
      );
    }

    return (
      <input
        {...shared}
        className={styles.stepInput}
        type={step.kind === 'email' ? 'email' : 'text'}
        placeholder={step.placeholder}
        autoComplete={
          step.id === 'firstName'
            ? 'given-name'
            : step.id === 'lastName'
              ? 'family-name'
              : step.id === 'email'
                ? 'email'
                : step.id === 'company'
                  ? 'organization'
                  : 'off'
        }
        autoFocus
      />
    );
  };

  const nextLabel = isComplete
    ? 'Start over'
    : stepIndex >= FORM_STEPS.length - 1
      ? isSubmitting
        ? 'Sending…'
        : 'Submit brief'
      : 'Continue';

  return (
    <main id="main-content" className={styles.page} ref={pageRef} tabIndex={-1}>
      <HomeScrollScenes />
      <CinematicAtmosphere />
      <LogoThemeSync />

      <section
        id="chapter-contact-hero"
        data-chapter="contact-hero"
        data-logo-invert="1"
        ref={heroRef}
        className={styles.heroScene}
        aria-label="Contact introduction"
      >
        <ScrollOrnament variant="glyph-light" position="tr" />
        <ScrollOrnament variant="glyph-light" position="bl" />

        <div className={styles.heroInner}>
          <h1 className={styles.heroHeading}>
            {HERO_LINES.map((line) => (
              <span key={line.join(' ')} className={styles.heroLine}>
                {line.map((word) => (
                  <span key={word} className={styles.heroWordWrap}>
                    <span data-hero-word className={styles.heroWord}>
                      {word}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <div className={styles.heroSubcopy}>
            {HERO_SUBLINES.map((line) => (
              <p key={line} data-hero-subline className={styles.heroSubline} data-scroll-shift>
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.contactRail} data-contact-rail aria-label="Direct contact">
          <div className={styles.railItem}>
            <span className={styles.railLabel}>Email</span>
            <a className={styles.railLink} href="mailto:mg@takemelive.com">
              mg@takemelive.com
            </a>
          </div>
          <span className={styles.railDivider} aria-hidden="true" />
          <div className={styles.railItem}>
            <span className={styles.railLabel}>Social</span>
            <a
              className={styles.railLink}
              href="https://www.instagram.com/takemelive"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
          <span className={styles.railDivider} aria-hidden="true" />
          <div className={styles.railItem}>
            <span className={styles.railLabel}>Based in</span>
            <span className={styles.railValue}>Dubai | Riyadh | Los Angeles</span>
          </div>
        </div>

        <div ref={indicatorRef} className={styles.scrollIndicator} aria-hidden="true">
          <span>Scroll</span>
          <span className={styles.scrollArrow}>↓</span>
        </div>
      </section>

      <section
        id="chapter-contact-form"
        data-chapter="contact-form"
        data-logo-invert="0"
        ref={formSectionRef}
        className={styles.formScene}
        aria-label="Contact form"
      >
        <ScrollOrnament variant="glyph-dark" position="br" />

        <div className={styles.formGrid}>
          <div className={styles.manifesto} data-contact-manifesto>
            <h2 className={styles.manifestoHeading} data-contact-form-heading>
              Let&apos;s create something people remember.
            </h2>
            {MANIFESTO_LINES.map((line) => (
              <p key={line} className={styles.manifestoLine} data-contact-manifesto-line data-scroll-shift>
                {line}
              </p>
            ))}
          </div>

          <div className={styles.formColumn}>
            <div className={styles.formCard} data-contact-card>
              <span className={styles.orb} data-contact-orb aria-hidden="true" />

              {isComplete ? (
                <div className={styles.successPanel} role="status" aria-live="polite" data-contact-step>
                  <p className={styles.successEyebrow}>Brief received</p>
                  <h3 className={styles.successTitle}>Thank you</h3>
                  <p className={styles.successCopy}>
                    Your brief is with our team. We&apos;ll be in touch shortly to discuss next steps.
                  </p>
                  <button type="button" className={styles.resetBtn} onClick={handleReset}>
                    Send another brief
                  </button>
                </div>
              ) : (
                <>
                  <div className={styles.chatTop}>
                    <div className={styles.bubble} data-contact-bubble>
                      A few quick questions so our producers can respond with the right team and timeline.
                    </div>
                  </div>

                  <form className={styles.formStage} onSubmit={handleNext}>
                    <div
                      key={currentStep.id}
                      className={styles.stepStage}
                      data-contact-step
                      ref={stepRef}
                    >
                      <div className={styles.stepField}>
                        <label className={styles.stepLabel} htmlFor={`contact-${currentStep.id}`}>
                          {currentStep.label}
                        </label>
                        {renderStepInput(currentStep)}
                      </div>

                      <div className={styles.stepActions}>
                        <button
                          type="button"
                          className={styles.backBtn}
                          onClick={handleBack}
                          disabled={stepIndex === 0}
                          aria-label="Previous question"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className={styles.nextBtn}
                          disabled={isSubmitting}
                          aria-label={nextLabel}
                        >
                          {nextLabel}
                          {!isSubmitting && stepIndex < FORM_STEPS.length - 1 ? (
                            <span className={styles.nextIcon} aria-hidden="true">
                              →
                            </span>
                          ) : null}
                        </button>
                      </div>
                    </div>
                  </form>

                  <div className={styles.progressDots} data-contact-progress aria-hidden="true">
                    {Array.from({ length: progressDots }).map((_, index) => (
                      <span
                        key={`dot-${index}`}
                        className={index <= stepIndex ? styles.progressActive : undefined}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer projects={projects} />
    </main>
  );
}
