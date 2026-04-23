'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './ChapterRail.module.scss';

type ChapterItem = {
  id: string;
  label: string;
};

const CHAPTERS: ChapterItem[] = [
  { id: 'chapter-hero', label: 'Hero' },
  { id: 'chapter-transition', label: 'Transition' },
  { id: 'chapter-what-we-do', label: 'What We Do' },
  { id: 'chapter-who-we-are', label: 'Who We Are' },
  { id: 'chapter-why-us', label: 'Why Us' },
  { id: 'chapter-how-it-works', label: 'How It Works' },
];

export default function ChapterRail() {
  const [activeId, setActiveId] = useState<string>(CHAPTERS[0].id);
  const chapterIds = useMemo(() => CHAPTERS.map((chapter) => chapter.id), []);

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
          setActiveId(mostVisible.target.id);
        }
      },
      {
        threshold: [0.25, 0.4, 0.6, 0.75],
        rootMargin: '-15% 0px -35% 0px',
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [chapterIds]);

  const scrollToChapter = (id: string) => {
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: 'auto', block: 'start' });
  };

  return (
    <aside className={styles.rail} aria-label="Section chapters">
      <p className={styles.title}>Chapters</p>
      <ol>
        {CHAPTERS.map((chapter, index) => (
          <li key={chapter.id}>
            <button
              type="button"
              onClick={() => scrollToChapter(chapter.id)}
              className={activeId === chapter.id ? styles.active : ''}
              aria-current={activeId === chapter.id ? 'true' : 'false'}
            >
              <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
              <span>{chapter.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </aside>
  );
}
