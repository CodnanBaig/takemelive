'use client';

import { useEffect, useMemo, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { HOME_SCENES } from '@/content/homeScenes';
import { prefersReducedMotion } from '@/lib/motionPrefs';
import styles from './SceneProgress.module.scss';

/** Focal line in the viewport — scene whose block contains this line is "active". */
const SCENE_FOCUS_RATIO = 0.33;

function resolveActiveSceneId(): string {
  const focusLine = window.innerHeight * SCENE_FOCUS_RATIO;
  let activeId = HOME_SCENES[0].id;

  for (const scene of HOME_SCENES) {
    const element = document.getElementById(scene.id);
    if (!element) {
      continue;
    }

    const { top, bottom } = element.getBoundingClientRect();
    if (top <= focusLine && bottom > focusLine) {
      return scene.id;
    }

    if (top <= focusLine) {
      activeId = scene.id;
    }
  }

  return activeId;
}

export default function SceneProgress() {
  const [progress, setProgress] = useState(0);
  const [activeSceneId, setActiveSceneId] = useState(HOME_SCENES[0].id);

  const activeScene = useMemo(
    () => HOME_SCENES.find((scene) => scene.id === activeSceneId) ?? HOME_SCENES[0],
    [activeSceneId],
  );

  useEffect(() => {
    const syncActiveScene = () => {
      setActiveSceneId(resolveActiveSceneId());
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          setProgress(self.progress);
          syncActiveScene();
        },
      });
    });

    const raf = requestAnimationFrame(syncActiveScene);

    ScrollTrigger.addEventListener('refresh', syncActiveScene);
    window.addEventListener('resize', syncActiveScene);

    return () => {
      cancelAnimationFrame(raf);
      ScrollTrigger.removeEventListener('refresh', syncActiveScene);
      window.removeEventListener('resize', syncActiveScene);
      ctx.revert();
    };
  }, []);

  const scrollToScene = (sceneId: string) => {
    const target = document.getElementById(sceneId);
    if (!target) {
      return;
    }

    target.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    });

    if (typeof window.history.replaceState === 'function') {
      window.history.replaceState(null, '', `#${sceneId}`);
    }
  };

  const progressPercent = Math.round(progress * 100);

  return (
    <nav className={styles.progress} aria-label="Scroll progress">
      <div className={styles.bar}>
        <div
          className={styles.track}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressPercent}
          aria-valuetext={`${progressPercent}% through the page`}
        >
          <div
            className={styles.fill}
            style={{ transform: `scaleX(${progress})` }}
            aria-hidden="true"
          />
        </div>

        <div className={styles.segments}>
          {HOME_SCENES.map((scene) => {
            const isActive = activeSceneId === scene.id;

            return (
              <button
                key={scene.id}
                type="button"
                className={`${styles.segment} ${isActive ? styles.segmentActive : ''}`}
                onClick={() => scrollToScene(scene.id)}
                aria-current={isActive ? 'step' : undefined}
                aria-label={`Scene ${scene.index}: ${scene.label}`}
              >
                <span className={styles.tick} aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>

      <p className={styles.caption} aria-live="polite">
        <span className={styles.captionIndex}>{String(activeScene.index).padStart(2, '0')}</span>
        <span className={styles.captionLabel}>{activeScene.label}</span>
      </p>
    </nav>
  );
}
