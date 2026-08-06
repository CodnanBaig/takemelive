'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react';
import type { FeaturedProject } from '@/content/featuredProjects';
import { getPosterTitle } from '@/content/featuredProjects';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { resolveProjectCover, resolveProjectGallery } from '@/lib/projectMedia';
import baseStyles from './HomeExperienceV2.module.scss';
import styles from './HomeExperienceV3.module.scss';

type HomeExperienceV3Props = {
  projects: FeaturedProject[];
};

const CAPABILITIES = [
  {
    number: '01',
    phase: 'Imagine',
    title: 'Strategy becomes a feeling.',
    copy: 'We define the audience, the emotional outcome, and the single idea every spatial, visual, and technical decision must serve.',
    scope: 'Creative strategy · Experience architecture · Art direction',
  },
  {
    number: '02',
    phase: 'Design',
    title: 'The feeling becomes a world.',
    copy: 'Narrative, space, content, interaction, light, sound, and technology are shaped as one connected environment—not separate departments.',
    scope: 'Spatial design · Show design · Content systems · Interactive technology',
  },
  {
    number: '03',
    phase: 'Build',
    title: 'The world becomes real.',
    copy: 'Scenic fabrication, technical engineering, vendors, crews, schedules, permits, and rehearsals are coordinated without losing the original creative intent.',
    scope: 'Production management · Custom build · Technical delivery',
  },
  {
    number: '04',
    phase: 'Go live',
    title: 'Every cue lands together.',
    copy: 'From doors opening to the final blackout, one accountable team protects the audience journey and operates the complete live system.',
    scope: 'Show calling · Live operations · Content capture · Amplification',
  },
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

function ProjectImage({
  project,
  priority = false,
  className,
}: {
  project: FeaturedProject;
  priority?: boolean;
  className: string;
}) {
  return (
    <Image
      src={resolveProjectCover(project)}
      alt={`${project.title} live experience by Take Me Live`}
      fill
      priority={priority}
      sizes="(max-width: 900px) 100vw, 78vw"
      className={className}
    />
  );
}

export default function HomeExperienceV3({ projects }: HomeExperienceV3Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroVisualRef = useRef<HTMLDivElement | null>(null);
  const featured = projects.slice(0, 9);
  const heroProjects = featured.slice(0, 3);
  const spotlightProjects = featured.slice(0, 6);
  const archiveProjects = featured.slice(6);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const context = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!reducedMotion) {
        const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
        intro
          .fromTo('[data-hero-kicker]', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.75 })
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

        const reveals = Array.from(root.querySelectorAll<HTMLElement>('[data-v3-reveal]'));
        reveals.forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0, y: 48 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 86%',
                once: true,
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

        const projectScenes = Array.from(root.querySelectorAll<HTMLElement>('[data-project-scene]'));
        projectScenes.forEach((scene) => {
          const visual = scene.querySelector<HTMLElement>('[data-project-visual]');
          const image = scene.querySelector<HTMLElement>('[data-project-image]');
          const copy = scene.querySelector<HTMLElement>('[data-project-copy]');

          if (visual) {
            gsap.fromTo(
              visual,
              { clipPath: 'inset(10% 7% 10% 7%)', scale: 0.96 },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                scale: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: scene,
                  start: 'top 88%',
                  end: 'top 28%',
                  scrub: 1,
                },
              },
            );
          }

          if (image) {
            gsap.fromTo(
              image,
              { yPercent: -7, scale: 1.12 },
              {
                yPercent: 7,
                scale: 1.03,
                ease: 'none',
                scrollTrigger: {
                  trigger: scene,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.2,
                },
              },
            );
          }

          if (copy) {
            gsap.fromTo(
              copy,
              { y: 70, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: scene,
                  start: 'top 66%',
                  once: true,
                },
              },
            );
          }
        });

        const capabilitySection = root.querySelector<HTMLElement>('[data-capability-section]');
        const capabilityLine = root.querySelector<HTMLElement>('[data-capability-line]');
        if (capabilitySection && capabilityLine) {
          gsap.fromTo(
            capabilityLine,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: capabilitySection,
                start: 'top 58%',
                end: 'bottom 42%',
                scrub: true,
              },
            },
          );
        }

        const capabilitySteps = Array.from(root.querySelectorAll<HTMLElement>('[data-capability-step]'));
        capabilitySteps.forEach((step, index) => {
          const image = step.querySelector<HTMLElement>('[data-capability-image]');
          const content = step.querySelector<HTMLElement>('[data-capability-content]');

          gsap.fromTo(
            step,
            { opacity: 0.34 },
            {
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: step,
                start: 'top 78%',
                end: 'center 50%',
                scrub: true,
              },
            },
          );

          if (content) {
            gsap.fromTo(
              content,
              { x: index % 2 === 0 ? -44 : 44, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.85,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: step,
                  start: 'top 68%',
                  once: true,
                },
              },
            );
          }

          if (image) {
            gsap.fromTo(
              image,
              { yPercent: -8, scale: 1.12 },
              {
                yPercent: 8,
                scale: 1.02,
                ease: 'none',
                scrollTrigger: {
                  trigger: step,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1,
                },
              },
            );
          }
        });
      }

      ScrollTrigger.refresh();
    }, root);

    return () => context.revert();
  }, []);

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
    <div ref={rootRef} className={`${baseStyles.experience} ${styles.experience}`}>
      <section id="chapter-hero" className={baseStyles.hero} aria-labelledby="home-hero-title">
        <div className={baseStyles.heroGlow} aria-hidden="true" />
        <div className={baseStyles.heroGrid} aria-hidden="true" />

        <div className={baseStyles.heroCopy}>
          <div className={baseStyles.eyebrow} data-hero-kicker>
            <span className={baseStyles.liveDot} aria-hidden="true" />
            Creative experience studio
            <span>Dubai · Mumbai · Global</span>
          </div>

          <h1 id="home-hero-title" className={baseStyles.heroTitle}>
            <span className={baseStyles.titleMask}><span data-hero-line>Experiences</span></span>
            <span className={baseStyles.titleMask}><span data-hero-line>that move</span></span>
            <span className={`${baseStyles.titleMask} ${baseStyles.titleAccent}`}><span data-hero-line>people.</span></span>
          </h1>

          <div className={baseStyles.heroBottom}>
            <p data-hero-copy>
              We design live moments, immersive environments, and cultural experiences that turn attention into memory.
            </p>
            <div className={baseStyles.heroActions} data-hero-copy>
              <Link href="/our-projects" className={baseStyles.primaryAction}>
                Explore the work <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/contact" className={baseStyles.secondaryAction}>Start a project</Link>
            </div>
          </div>

          <div className={baseStyles.heroStats} data-hero-meta>
            <div><strong>{String(featured.length).padStart(2, '0')}</strong><span>Featured experiences</span></div>
            <div><strong>04</strong><span>Connected disciplines</span></div>
            <div><strong>01</strong><span>Accountable team</span></div>
          </div>
        </div>

        <div
          ref={heroVisualRef}
          className={baseStyles.heroVisual}
          onPointerMove={handleHeroPointerMove}
          onPointerLeave={resetHeroPointer}
        >
          {heroProjects.map((project, index) => (
            <Link
              href={`/projects/${project.slug}`}
              key={project.slug}
              className={`${baseStyles.heroCard} ${baseStyles[`heroCard${index + 1}`]}`}
              data-hero-card
              data-hero-orbit={index === 0 ? 'one' : index === 1 ? 'two' : undefined}
              aria-label={`View ${project.title}`}
            >
              <div className={baseStyles.heroCardMedia}>
                <ProjectImage project={project} priority={index === 0} className={baseStyles.projectImage} />
              </div>
              <div className={baseStyles.heroCardMeta}>
                <span>0{index + 1}</span><span>{project.client}</span><span>{project.year}</span>
              </div>
            </Link>
          ))}
          <div className={baseStyles.visualReticle} aria-hidden="true"><span>LIVE FRAME</span><span>REC ●</span></div>
        </div>

        <div className={baseStyles.scrollCue} data-hero-meta aria-hidden="true"><span>Scroll to enter</span><i /></div>
      </section>

      <div className={baseStyles.signalRail} aria-hidden="true">
        <div>
          {Array.from({ length: 2 }).map((_, railIndex) => (
            <span key={railIndex}>Live production · Immersive environments · Cultural impact · Creative technology ·</span>
          ))}
        </div>
      </div>

      <section className={baseStyles.manifesto} aria-labelledby="manifesto-title">
        <div className={baseStyles.sectionIndex} data-v3-reveal>01 — Point of view</div>
        <div className={baseStyles.manifestoStatement}>
          <h2 id="manifesto-title" data-v3-reveal>Not everything needs attention.<span>Your brand does.</span></h2>
          <p data-v3-reveal>
            We create experiences designed to be seen, felt, and remembered. Every environment is built as a sequence of emotional cues—from the first glimpse to the final recall.
          </p>
        </div>
        <div className={baseStyles.manifestoPillars}>
          <article data-v3-reveal><span>01</span><h3>Stop people</h3><p>A clear visual idea earns attention before a single word is read.</p></article>
          <article data-v3-reveal><span>02</span><h3>Pull them in</h3><p>Space, sound, interaction, and story turn spectators into participants.</p></article>
          <article data-v3-reveal><span>03</span><h3>Stay with them</h3><p>The strongest live moments keep working after the lights go down.</p></article>
        </div>
      </section>

      <section className={styles.projects} aria-labelledby="featured-projects-title">
        <header className={styles.projectsHeader}>
          <div className={styles.sectionLabel} data-v3-reveal>02 — Selected work</div>
          <h2 id="featured-projects-title" data-v3-reveal>
            Every project<br /><span>gets its own world.</span>
          </h2>
          <p data-v3-reveal>
            Not a gallery of thumbnails. A sequence of live environments—each shaped around a different audience, ambition, and moment.
          </p>
        </header>

        <div className={styles.projectSequence}>
          {spotlightProjects.map((project, index) => (
            <article
              key={project.slug}
              className={styles.projectScene}
              data-project-scene
              data-align={index % 2 === 0 ? 'left' : 'right'}
            >
              <Link
                href={`/projects/${project.slug}`}
                className={styles.projectVisual}
                data-project-visual
                aria-label={`View ${project.title} case study`}
              >
                <ProjectImage
                  project={project}
                  priority={index === 0}
                  className={styles.projectImage}
                />
                <div className={styles.projectShade} />
                <div className={styles.projectFrameMeta}>
                  <span>Case study {String(index + 1).padStart(2, '0')}</span>
                  <span>{project.location}</span>
                </div>
              </Link>

              <div className={styles.projectCopy} data-project-copy>
                <span className={styles.projectClient}>{project.client} · {project.year}</span>
                <h3>{getPosterTitle(project)}</h3>
                <p>{project.tagline}</p>
                <Link href={`/projects/${project.slug}`} className={styles.projectLink}>
                  Enter the project <span aria-hidden="true">↗</span>
                </Link>
              </div>

              <span className={styles.projectGhostNumber} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
            </article>
          ))}
        </div>

        {archiveProjects.length > 0 ? (
          <div className={styles.projectArchive}>
            <div className={styles.archiveIntro} data-v3-reveal>
              <span>Also live</span>
              <p>More productions from stadiums, cultural programmes, and symphonic arenas.</p>
            </div>
            <div className={styles.archiveRows}>
              {archiveProjects.map((project, index) => (
                <Link
                  href={`/projects/${project.slug}`}
                  key={project.slug}
                  className={styles.archiveRow}
                  data-v3-reveal
                >
                  <span>{String(spotlightProjects.length + index + 1).padStart(2, '0')}</span>
                  <strong>{getPosterTitle(project)}</strong>
                  <small>{project.client} · {project.year}</small>
                  <i aria-hidden="true">↗</i>
                </Link>
              ))}
            </div>
            <Link href="/our-projects" className={styles.allProjectsLink} data-v3-reveal>
              Explore the complete archive <span aria-hidden="true">→</span>
            </Link>
          </div>
        ) : null}
      </section>

      <section className={baseStyles.scale} aria-labelledby="scale-title">
        <div className={baseStyles.scaleMedia} data-v3-reveal>
          <Image
            src={resolveProjectGallery(featured[3] ?? featured[0])[1] ?? resolveProjectCover(featured[3] ?? featured[0])}
            alt="Large-scale Take Me Live production"
            fill
            sizes="100vw"
            className={baseStyles.scaleImage}
            data-project-image
          />
          <div className={baseStyles.scaleOverlay} />
          <div className={baseStyles.scaleCounter}><span>Live at scale</span><strong>One room.<br />One pulse.</strong></div>
        </div>
        <div className={baseStyles.scaleCopy}>
          <div className={baseStyles.sectionIndex} data-v3-reveal>03 — The system</div>
          <h2 id="scale-title" data-v3-reveal>More than a vendor.<br /><span>A live system.</span></h2>
          <p data-v3-reveal>
            Strategy, design, production, technology, and show execution stay connected from first sketch to final cue. Fewer handoffs. Sharper intent. Better live moments.
          </p>
          <div className={baseStyles.systemStats}>
            <div data-v3-reveal><strong>360°</strong><span>Experience ownership</span></div>
            <div data-v3-reveal><strong>24/7</strong><span>Production mindset</span></div>
            <div data-v3-reveal><strong>01</strong><span>Creative through-line</span></div>
          </div>
        </div>
      </section>

      <section className={styles.capabilities} data-capability-section aria-labelledby="capabilities-title">
        <header className={styles.capabilitiesHeader}>
          <div className={styles.sectionLabel} data-v3-reveal>04 — From idea to live</div>
          <h2 id="capabilities-title" data-v3-reveal>
            One continuous<br /><span>creative system.</span>
          </h2>
          <p data-v3-reveal>
            The idea does not get handed from one supplier to the next. It evolves through four connected acts with the same intent running through every decision.
          </p>
        </header>

        <div className={styles.capabilityJourney}>
          <div className={styles.capabilitySpine} aria-hidden="true">
            <span className={styles.capabilityLineBase} />
            <span className={styles.capabilityLineProgress} data-capability-line />
          </div>

          {CAPABILITIES.map((capability, index) => {
            const visualProject = featured[index % featured.length];
            return (
              <article
                key={capability.number}
                className={styles.capabilityStep}
                data-capability-step
                data-side={index % 2 === 0 ? 'left' : 'right'}
              >
                <div className={styles.capabilityMarker} aria-hidden="true">
                  <span>{capability.number}</span>
                </div>

                <div className={styles.capabilityContent} data-capability-content>
                  <span className={styles.capabilityPhase}>{capability.phase}</span>
                  <h3>{capability.title}</h3>
                  <p>{capability.copy}</p>
                  <small>{capability.scope}</small>
                </div>

                <div className={styles.capabilityVisual}>
                  <ProjectImage
                    project={visualProject}
                    className={styles.capabilityImage}
                  />
                  <div className={styles.capabilityVisualShade} />
                  <span>{visualProject.title}</span>
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.capabilityOutro} data-v3-reveal>
          <span>First thought</span>
          <i aria-hidden="true" />
          <strong>Final cue</strong>
        </div>
      </section>

      <section className={baseStyles.industries} id="industries" aria-label="Industries">
        <div className={baseStyles.industriesLabel} data-v3-reveal>
          <span>Industries</span>
          <p>Different rooms. Different rules. The same obsession with impact.</p>
        </div>
        <div className={baseStyles.industryMarquee} aria-hidden="true">
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
