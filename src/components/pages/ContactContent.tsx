'use client';

import Link from 'next/link';
import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import {
  MASK_HIDDEN_BOTTOM,
  MASK_VISIBLE,
  animateMaskReveal,
  setMaskHidden,
} from '@/lib/maskReveal';
import ScrollOrnament from '@/components/home/ScrollOrnament';
import styles from './ContactContent.module.scss';

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

function stepProgress(stepIndex: number, total: number, isComplete: boolean): number {
  if (isComplete) {
    return 100;
  }
  return Math.round(((stepIndex + 1) / total) * 100);
}

export default function ContactContent() {
  const pageRef = useRef<HTMLElement | null>(null);
  const stepRef = useRef<HTMLDivElement | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentStep = FORM_STEPS[stepIndex];
  const progress = useMemo(
    () => stepProgress(stepIndex, FORM_STEPS.length, isComplete),
    [stepIndex, isComplete],
  );

  useEffect(() => {
    const page = pageRef.current;
    if (!page) {
      return;
    }

    const heading = page.querySelector<HTMLElement>('[data-contact-heading]');
    const lead = page.querySelector<HTMLElement>('[data-contact-lead]');
    const aside = page.querySelector<HTMLElement>('[data-contact-aside]');
    const formIntro = page.querySelector<HTMLElement>('[data-contact-form-intro]');

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([heading, lead, aside, formIntro].filter(Boolean), {
          autoAlpha: 1,
          clipPath: MASK_VISIBLE,
          y: 0,
        });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const heroTargets = [heading, lead].filter(Boolean) as HTMLElement[];
        setMaskHidden(heroTargets);
        if (heading) {
          animateMaskReveal(heading, 'bottom', { duration: 0.78, delay: 0.05 });
        }
        if (lead) {
          animateMaskReveal(lead, 'bottom', { duration: 0.62, delay: 0.16 });
        }

        gsap.fromTo(
          aside,
          { autoAlpha: 0, x: 28 },
          { autoAlpha: 1, x: 0, duration: 0.52, ease: 'power3.out', delay: 0.28 },
        );

        gsap.fromTo(
          formIntro,
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.48, ease: 'power3.out', delay: 0.38 },
        );
      });
    }, page);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const step = stepRef.current;
    if (!step || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.fromTo(
      step,
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.38, ease: 'power3.out' },
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
      <section className={styles.heroScene} data-logo-invert="1" aria-label="Contact introduction">
        <ScrollOrnament variant="glyph-light" position="tr" />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <h1 className={styles.heading} data-contact-heading>
              <span className={styles.headingLine}>Get in</span>
              <span className={styles.headingLine}>touch</span>
            </h1>
            <p className={styles.lead} data-contact-lead>
              Share your project in a few steps. Our producers review every brief and respond
              within two business days.
            </p>
          </div>

          <aside className={styles.heroAside} data-contact-aside aria-label="Direct contact">
            <div className={styles.asideRow}>
              <p className={styles.asideLabel}>Email</p>
              <p className={styles.asideValue}>
                <a className={styles.asideLink} href="mailto:mg@takemelive.com">
                  mg@takemelive.com
                </a>
              </p>
            </div>
            <div className={styles.asideRow}>
              <p className={styles.asideLabel}>Social</p>
              <p className={styles.asideValue}>
                <a
                  className={styles.asideLink}
                  href="https://www.instagram.com/takemelive"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </p>
            </div>
            <div className={styles.asideRow}>
              <p className={styles.asideLabel}>Based in</p>
              <p className={styles.asideValue}>Dubai · Global delivery</p>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.formScene} data-logo-invert="0" aria-label="Contact form">
        <div className={styles.formInner}>
          {isComplete ? (
            <div className={styles.successPanel} role="status" aria-live="polite">
              <h2>Thank you</h2>
              <p>
                Your brief is with our team. We&apos;ll be in touch shortly to discuss next steps.
              </p>
              <button type="button" className={styles.resetBtn} onClick={handleReset}>
                Send another brief
              </button>
            </div>
          ) : (
            <>
              <div className={styles.formIntro} data-contact-form-intro>
                <h2>Project brief</h2>
                <p className={styles.stepCounter}>
                  Step {stepIndex + 1} of {FORM_STEPS.length}
                </p>
              </div>

              <div className={styles.progressTrack} aria-hidden="true">
                <span className={styles.progressFill} style={{ width: `${progress}%` }} />
              </div>

              <form onSubmit={handleNext}>
                <div
                  key={currentStep.id}
                  className={styles.stepStage}
                  ref={stepRef}
                >
                  <div className={styles.stepField}>
                    <label className={styles.stepLabel} htmlFor={`contact-${currentStep.id}`}>
                      {currentStep.label}
                    </label>
                    {renderStepInput(currentStep)}
                  </div>
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
              </form>
            </>
          )}
        </div>
      </section>

      <footer className={styles.pageFooter}>
        <p>© {new Date().getFullYear()} Take Me Live</p>
        <Link href="/">Back to home</Link>
      </footer>
    </main>
  );
}
