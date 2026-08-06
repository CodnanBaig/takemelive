'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import type { FeaturedProject } from '@/content/featuredProjects';
import { getPosterTitle } from '@/content/featuredProjects';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { resolveProjectCover } from '@/lib/projectMedia';
import styles from './HomeExperienceV2.module.scss';

type HomeExperienceV2Props = {
  projects: FeaturedProject[];
};

const SERVICES = [
  {
    number: '01',
    title: 'Creative strategy & experience design',
    copy: 'Concept development, spatial narratives, visual systems, and experience architecture built around how the audience should feel.',
    meta: 'Strategy · Art direction · Spatial design',
  },
  {
    number: '02',
    title: 'Interactive technology & innovation',
    copy: 'Responsive installations, AI moments, AR/VR, projection, and show-control systems that amplify the story without stealing focus.',
    meta: 'Interactive · AI · Immersive media',
  },
  {
    number: '03',
    title: 'Production, build & live delivery',
    copy: 'Scenic fabrication, technical production, lighting, audio, video, and on-ground execution managed as one connected production system.',
    meta: 'Build · Technical · Show call',
  },
  {
    number: '04',
    title: 'Project management & amplification',
    copy: 'Timelines, budgets, vendors, crews, content capture, live streams, and post-event media coordinated under one accountable team.',
    meta: 'Operations · Content · Measurement',
  },
] as const;

const PROCESS = [
  ['Discover', 'Define the audience, objective, and emotional outcome.'],
  ['Design', 'Shape the story, space, interaction, and visual language.'],
  ['Build', 'Produce every physical, digital, and technical layer.'],
  ['Go live', 'Operate the room, call the show, and protect the experience.'],
] as const;

const INDUSTRIES = [
  'Culture',
  'Luxury',
  'Sports',
  'Entertainment',
  'Media',
  'Automotive',
  'Tourism',
  'Technology',
  'Government',
  'Fashion',
  'Music',
  'Esports',
] as const;

function ProjectImage({ project, priority = false }: { project: FeaturedProject; priority?: boolean }) {
  return (
    <Image
      src={resolveProjectCover(project)}
      alt={`${project.title} live experience by Take Me Live`}
      fill
      priority={priority}
      sizes="(max-width: 900px) 100vw, 58vw"
      className={styles.projectImage}
    />
  );
}

export default function HomeExperienceV2({ projects }: HomeExperienceV2Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroVisualRef = useRef<HTMLDivElement | null>(null);
  const [activeProject, setActiveProject] = useState(0);
  const featured = projects.slice(0, 9);
  const heroProjects = featured.slice(0, 3);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const context = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!reducedMotion) {
        const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
        intro
          .fromTo(
            '[data-hero-kicker]',
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.75 },
          )
          .fromTo(
            '[data-hero-line]',
            { yPercent: 115, rotate: 1.5 },
            { yPercent: 0, rotate: 0, duration: 1.05, stagger: 0.1 },
            '-=0.45',
          )
          .fromTo(
            '[data-hero-copy], [data-hero-meta]',
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.75, stagger: 0.08 },
            '-=0.6',
          )
          .fromTo(
            '[data-hero-card]',
            { opacity: 0, y: 80, rotate: 6, scale: 0.92 },
            { opacity: 1, y: 0, rotate: 0, scale: 1, duration: 1.15, stagger: 0.12 },
            '-=0.9',
          );

        const revealElements = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
        revealElements.forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0, y: 56 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 84%',
                once: true,
              },
            },
          );
        });

        const parallaxItems = Array.from(root.querySelectorAll<HTMLElement>('[data-parallax]'));
        parallaxItems.forEach((element) => {
          gsap.fromTo(
            element,
            { yPercent: -6 },
            {
              yPercent: 8,
              ease: 'none',
              scrollTrigger: {
                trigger: element.closest('section') ?? element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            },
          );
        });

        const projectRows = Array.from(root.querySelectorAll<HTMLElement>('[data-project-row]'));
        projectRows.forEach((row) => {
          gsap.fromTo(
            row,
            { opacity: 0.32, x: 32 },
            {
              opacity: 1,
              x: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: row,
                start: 'top 86%',
                end: 'top 48%',
                scrub: true,
              },
            },
          );
        });

        gsap.to('[data-hero-orbit="one"]', {
          yPercent: 14,
          rotation: -3,
          ease: 'none',
          scrollTrigger: {
            trigger: '#chapter-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });

        gsap.to('[data-hero-orbit="two"]', {
          yPercent: -18,
          rotation: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: '#chapter-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      ScrollTrigger.refresh();
    }, root);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || featured.length === 0) return undefined;

    const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-project-row]'));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.projectIndex ?? 0);
        setActiveProject(index);
      },
      {
        rootMargin: '-38% 0px -42% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [featured.length]);

  const handleHeroPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = heroVisualRef.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    element.style.setProperty('--hero-rotate-x', `${y * -5}deg`);
    element.style.setProperty('--hero-rotate-y', `${x * 7}deg`);
    element.style.setProperty('--hero-shift-x', `${x * 16}px`);
    element.style.setProperty('--hero-shift-y', `${y * 16}px`);
  };

  const resetHeroPointer = () => {
    const element = heroVisualRef.current;
    if (!element) return;
    element.style.setProperty('--hero-rotate-x', '0deg');
    element.style.setProperty('--hero-rotate-y', '0deg');
    element.style.setProperty('--hero-shift-x', '0px');
    element.style.setProperty('--hero-shift-y', '0px');
  };

  if (featured.length === 0) return null;

  return (
    <div ref={rootRef} className={styles.experience}>
      <section id="chapter-hero" className={styles.hero} aria-labelledby="home-hero-title">
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className={styles.heroCopy}>
          <div className={styles.eyebrow} data-hero-kicker>
            <span className={styles.liveDot} aria-hidden="true" />
            Creative experience studio
            <span>Dubai · Mumbai · Global</span>
          </div>

          <h1 id="home-hero-title" className={styles.heroTitle}>
            <span className={styles.titleMask}>
              <span data-hero-line>Experiences</span>
            </span>
            <span className={styles.titleMask}>
              <span data-hero-line>that move</span>
            </span>
            <span className={`${styles.titleMask} ${styles.titleAccent}`}>
              <span data-hero-line>people.</span>
            </span>
          </h1>

          <div className={styles.heroBottom}>
            <p data-hero-copy>
              We design live moments, immersive environments, and cultural experiences that turn attention into memory.
            </p>
            <div className={styles.heroActions} data-hero-copy>
              <Link href="/our-projects" className={styles.primaryAction}>
                Explore the work
                <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/contact" className={styles.secondaryAction}>
                Start a project
              </Link>
            </div>
          </div>

          <div className={styles.heroStats} data-hero-meta>
            <div><strong>{String(featured.length).padStart(2, '0')}</strong><span>Featured experiences</span></div>
            <div><strong>04</strong><span>Connected disciplines</span></div>
            <div><strong>01</strong><span>Accountable team</span></div>
          </div>
        </div>

        <div
          ref={heroVisualRef}
          className={styles.heroVisual}
          onPointerMove={handleHeroPointerMove}
          onPointerLeave={resetHeroPointer}
        >
          {heroProjects.map((project, index) => (
            <Link
              href={`/projects/${project.slug}`}
              key={project.slug}
              className={`${styles.heroCard} ${styles[`heroCard${index + 1}`]}`}
              data-hero-card
              data-hero-orbit={index === 0 ? 'one' : index === 1 ? 'two' : undefined}
              aria-label={`View ${project.title}`}
            >
              <div className={styles.heroCardMedia}>
                <ProjectImage project={project} priority={index === 0} />
              </div>
              <div className={styles.heroCardMeta}>
                <span>0{index + 1}</span>
                <span>{project.client}</span>
                <span>{project.year}</span>
              </div>
            </Link>
          ))}
          <div className={styles.visualReticle} aria-hidden="true">
            <span>LIVE FRAME</span>
            <span>REC ●</span>
          </div>
        </div>

        <div className={styles.scrollCue} data-hero-meta aria-hidden="true">
          <span>Scroll to enter</span>
          <i />
        </div>
      </section>

      <div className={styles.signalRail} aria-hidden="true">
        <div>
          {Array.from({ length: 2 }).map((_, railIndex) => (
            <span key={railIndex}>
              Live production · Immersive environments · Cultural impact · Creative technology ·
            </span>
          ))}
        </div>
      </div>

      <section className={styles.manifesto} aria-labelledby="manifesto-title">
        <div className={styles.sectionIndex} data-reveal>01 — Point of view</div>
        <div className={styles.manifestoStatement}>
          <h2 id="manifesto-title" data-reveal>
            Not everything needs attention.
            <span>Your brand does.</span>
          </h2>
          <p data-reveal>
            We create experiences designed to be seen, felt, and remembered. Every environment is built as a sequence of emotional cues — from the first glimpse to the final recall.
          </p>
        </div>
        <div className={styles.manifestoPillars}>
          <article data-reveal>
            <span>01</span>
            <h3>Stop people</h3>
            <p>A clear visual idea earns attention before a single word is read.</p>
          </article>
          <article data-reveal>
            <span>02</span>
            <h3>Pull them in</h3>
            <p>Space, sound, interaction, and story turn spectators into participants.</p>
          </article>
          <article data-reveal>
            <span>03</span>
            <h3>Stay with them</h3>
            <p>The strongest live moments keep working after the lights go down.</p>
          </article>
        </div>
      </section>

      <section className={styles.projects} aria-labelledby="featured-projects-title">
        <div className={styles.projectsHeading}>
          <div className={styles.sectionIndex} data-reveal>02 — Selected work</div>
          <h2 id="featured-projects-title" data-reveal>
            Built live.<br />Remembered later.
          </h2>
          <p data-reveal>
            A selection of arenas, brand worlds, cultural landmarks, and high-pressure live environments delivered across the region.
          </p>
        </div>

        <div className={styles.projectExperience}>
          <div className={styles.projectStage} aria-live="polite">
            <div className={styles.projectStageFrame}>
              {featured.map((project, index) => (
                <div
                  key={project.slug}
                  className={styles.projectStageImage}
                  data-active={index === activeProject || undefined}
                  aria-hidden={index !== activeProject}
                >
                  <ProjectImage project={project} priority={index === 0} />
                </div>
              ))}
              <div className={styles.projectStageOverlay} />
              <div className={styles.projectStageTopline}>
                <span>Project feed</span>
                <span>{String(activeProject + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}</span>
              </div>
              <div className={styles.projectStageCaption}>
                <span>{featured[activeProject]?.client}</span>
                <strong>{featured[activeProject]?.title}</strong>
                <small>{featured[activeProject]?.location}</small>
              </div>
            </div>
          </div>

          <div className={styles.projectList}>
            {featured.map((project, index) => (
              <Link
                href={`/projects/${project.slug}`}
                key={project.slug}
                className={styles.projectRow}
                data-project-row
                data-project-index={index}
                data-active={index === activeProject || undefined}
                onPointerEnter={() => setActiveProject(index)}
                onFocus={() => setActiveProject(index)}
              >
                <span className={styles.projectNumber}>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{getPosterTitle(project)}</h3>
                  <p>{project.tagline}</p>
                </div>
                <div className={styles.projectDetails}>
                  <span>{project.client}</span>
                  <span>{project.year}</span>
                </div>
                <span className={styles.projectArrow} aria-hidden="true">↗</span>
              </Link>
            ))}
            <Link href="/our-projects" className={styles.allProjectsLink}>
              View the complete project archive <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.scale} aria-labelledby="scale-title">
        <div className={styles.scaleMedia} data-reveal>
          <Image
            src={featured[3]?.gallery?.[1] ?? resolveProjectCover(featured[3] ?? featured[0])}
            alt="Large-scale Take Me Live production"
            fill
            sizes="100vw"
            className={styles.scaleImage}
            data-parallax
          />
          <div className={styles.scaleOverlay} />
          <div className={styles.scaleCounter}>
            <span>Live at scale</span>
            <strong>One room.<br />One pulse.</strong>
          </div>
        </div>
        <div className={styles.scaleCopy}>
          <div className={styles.sectionIndex} data-reveal>03 — The system</div>
          <h2 id="scale-title" data-reveal>More than a vendor.<br /><span>A live system.</span></h2>
          <p data-reveal>
            Strategy, design, production, technology, and show execution stay connected from first sketch to final cue. Fewer handoffs. Sharper intent. Better live moments.
          </p>
          <div className={styles.systemStats}>
            <div data-reveal><strong>360°</strong><span>Experience ownership</span></div>
            <div data-reveal><strong>24/7</strong><span>Production mindset</span></div>
            <div data-reveal><strong>01</strong><span>Creative through-line</span></div>
          </div>
        </div>
      </section>

      <section className={styles.services} id="services" aria-labelledby="services-title">
        <div className={styles.servicesIntro}>
          <div className={styles.sectionIndex} data-reveal>04 — Capabilities</div>
          <h2 id="services-title" data-reveal>End-to-end experience creation.</h2>
          <p data-reveal>
            The creative idea and the practical reality are developed together, so ambition survives contact with the venue, the timeline, and the audience.
          </p>
        </div>
        <div className={styles.servicesList}>
          {SERVICES.map((service) => (
            <article key={service.number} className={styles.serviceItem} data-reveal>
              <span>{service.number}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <small>{service.meta}</small>
              </div>
              <i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.process} aria-labelledby="process-title">
        <div className={styles.processHeader}>
          <div className={styles.sectionIndex} data-reveal>05 — Method</div>
          <h2 id="process-title" data-reveal>Discover to go live.<br />One continuous system.</h2>
        </div>
        <div className={styles.processTrack}>
          {PROCESS.map(([title, copy], index) => (
            <article key={title} data-reveal>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.industries} id="industries" aria-label="Industries">
        <div className={styles.industriesLabel} data-reveal>
          <span>Industries</span>
          <p>Different rooms. Different rules. The same obsession with impact.</p>
        </div>
        <div className={styles.industryMarquee} aria-hidden="true">
          <div>
            {[...INDUSTRIES, ...INDUSTRIES].map((industry, index) => (
              <span key={`${industry}-${index}`}>{industry}<i>✦</i></span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
