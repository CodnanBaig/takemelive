'use client';

import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DomeGallery, { type DomeGalleryApi } from '@/components/dome-gallery/DomeGallery';
import { FEATURED_PROJECTS } from '@/content/featuredProjects';
import styles from './ProjectsGlobe.module.scss';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default function ProjectsGlobe() {
  const domeRef = useRef<DomeGalleryApi | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const jiggleStateRef = useRef({
    amp: 0,
    targetAmp: 0,
    phase: 0,
  });

  const globeItems = useMemo(() => {
    const ten = Array.from({ length: 10 }, (_, i) => FEATURED_PROJECTS[i % FEATURED_PROJECTS.length]);
    return ten.map((project) => ({
      src: project.coverImage,
      alt: project.title,
      href: `/projects/${project.slug}`,
    }));
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const api = domeRef.current;
    const root = api?.getRootElement();
    if (!section || !api || !root) {
      return;
    }

    const imageEls = Array.from(root.querySelectorAll<HTMLElement>('.item__image'));
    const setTileX = imageEls.map((el) => gsap.quickSetter(el, 'x', 'px'));
    const setTileY = imageEls.map((el) => gsap.quickSetter(el, 'y', 'px'));
    const setTileRot = imageEls.map((el) => gsap.quickSetter(el, 'rotation', 'deg'));

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=2400',
      scrub: 0.8,
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const current = api.getRotation();
        const deltaY = (self.getVelocity() / 2200) * 10; // velocity-based inertia
        const nextY = current.y + deltaY;
        const nextX = Math.sin(progress * Math.PI * 2) * 14;
        api.setRotation({ x: nextX, y: nextY });

        const velocity = Math.abs(self.getVelocity());
        jiggleStateRef.current.targetAmp = clamp(velocity / 2600, 0, 1);
      },
    });

    const tick = () => {
      const state = jiggleStateRef.current;
      state.amp += (state.targetAmp - state.amp) * 0.16;
      state.phase += 0.018 + state.amp * 0.05;

      const ampPx = 20 * state.amp;
      const rotDeg = 10 * state.amp;

      for (let i = 0; i < imageEls.length; i += 1) {
        const t = state.phase + i * 0.85;
        setTileX[i](Math.sin(t * 1.6) * ampPx);
        setTileY[i](Math.cos(t * 1.35) * ampPx);
        setTileRot[i](Math.sin(t * 1.25) * rotDeg);
      }
    };

    gsap.ticker.add(tick);

    return () => {
      trigger.kill();
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Projects globe">
      <div className={styles.stage}>
        <DomeGallery
          ref={(api) => {
            domeRef.current = api;
          }}
          images={globeItems}
          layout="points"
          fit={0.82}
          fitBasis="max"
          minRadius={720}
          maxRadius={2000}
          segments={28}
          maxVerticalRotationDeg={22}
          dragSensitivity={26}
          dragDampening={0.9}
          autoRotateSpeed={0}
          enableAutoRotate={false}
          enableDrag={true}
          onDragVelocity={({ magnitude, active }) => {
            jiggleStateRef.current.targetAmp = active ? clamp(magnitude / 1.2, 0, 1) : 0;
          }}
          openedImageWidth="360px"
          openedImageHeight="360px"
          imageBorderRadius="50%"
          openedImageBorderRadius="50%"
          grayscale={false}
        />
      </div>

      <div className={styles.hint} aria-hidden="true">
        Scroll to explore. Click a tile to open.
      </div>
    </section>
  );
}
