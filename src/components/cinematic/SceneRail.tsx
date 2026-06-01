'use client';

import { useEffect, useMemo, useState } from 'react';
import { HOME_SCENES } from '@/content/homeScenes';
import styles from './SceneRail.module.scss';

export default function SceneRail() {
  const [activeChapterId, setActiveChapterId] = useState(HOME_SCENES[0].chapterId);
  const chapterIds = useMemo(() => HOME_SCENES.map((scene) => scene.chapterId), []);

  useEffect(() => {
    const elements = chapterIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (mostVisible?.target?.id) {
          setActiveChapterId(mostVisible.target.id);
        }
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: '-18% 0px -42% 0px',
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [chapterIds]);

  const scrollToScene = (chapterId: string) => {
    const target = document.getElementById(chapterId);
    target?.scrollIntoView({ behavior: 'auto', block: 'start' });
  };

  return (
    <nav className={styles.rail} aria-label="Scene navigation">
      {HOME_SCENES.map((scene) => {
        const isActive = activeChapterId === scene.chapterId;

        return (
          <button
            key={scene.id}
            type="button"
            className={`${styles.button} ${isActive ? styles.active : ''}`}
            onClick={() => scrollToScene(scene.chapterId)}
            aria-current={isActive ? 'true' : undefined}
            aria-label={`Scene ${scene.index}: ${scene.label}`}
          >
            <span className={styles.marker} aria-hidden="true" />
            <span className={styles.text}>
              <span className={styles.index}>{String(scene.index).padStart(2, '0')}</span>
              <span className={styles.label}>{scene.label}</span>
            </span>
          </button>
        );
      })}
    </nav>
  );
}
