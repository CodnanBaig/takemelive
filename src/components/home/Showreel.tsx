'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import {
  animateMaskReveal,
  setMaskHidden,
} from '@/lib/maskReveal';
import {
  SHOWREEL_LOCAL_SRC,
  SHOWREEL_POSTER,
  pickRandomShowreelVideo,
} from '@/content/showreel';
import { prefersReducedMotion } from '@/lib/motionPrefs';
import styles from './Showreel.module.scss';

function formatTimecode(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '00:00';
  }
  const whole = Math.floor(seconds);
  const mins = Math.floor(whole / 60);
  const secs = whole % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default function Showreel() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressBarRef = useRef<HTMLSpanElement | null>(null);
  const timecodeRef = useRef<HTMLParagraphElement | null>(null);
  const [posterVisible, setPosterVisible] = useState(true);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const resolveSource = async () => {
      try {
        const response = await fetch(SHOWREEL_LOCAL_SRC, { method: 'HEAD' });
        if (!cancelled && response.ok) {
          setVideoSrc(SHOWREEL_LOCAL_SRC);
          return;
        }
      } catch {
        // Use random remote clip when local file is missing.
      }

      if (!cancelled) {
        setVideoSrc(pickRandomShowreelVideo());
      }
    };

    void resolveSource();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const progressBar = progressBarRef.current;
    const timecode = timecodeRef.current;
    if (!section || !video) {
      return;
    }

    const titleLines = section.querySelectorAll<HTMLElement>('[data-title-line]');
    let scrollTrigger: ScrollTrigger | null = null;

    const bindScrollScrub = () => {
      if (!video.duration || Number.isNaN(video.duration)) {
        return;
      }

      scrollTrigger?.kill();
      scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.max(window.innerHeight * 2.2, 1400)}`,
        pin: section.querySelector<HTMLElement>('[data-showreel-pin]') ?? section,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          video.currentTime = video.duration * progress;
          if (progressBar) {
            progressBar.style.width = `${progress * 100}%`;
          }
          if (timecode) {
            timecode.textContent = formatTimecode(video.duration * progress);
          }
        },
      });
    };

    const onReady = () => {
      if (prefersReducedMotion()) {
        setPosterVisible(true);
        video.pause();
        if (progressBar) {
          progressBar.style.width = '0%';
        }
        if (timecode) {
          timecode.textContent = 'Static';
        }
        return;
      }

      setPosterVisible(false);
      video.pause();
      bindScrollScrub();
    };

    const onError = () => {
      if (!videoSrc) {
        setPosterVisible(true);
        return;
      }

      const fallback = pickRandomShowreelVideo(videoSrc);
      if (fallback !== videoSrc) {
        setVideoSrc(fallback);
        return;
      }

      setPosterVisible(true);
    };

    video.addEventListener('loadedmetadata', onReady);
    video.addEventListener('error', onError);
    if (video.readyState >= 1) {
      onReady();
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        scrollTrigger?.kill();
        scrollTrigger = null;
        video.pause();
        setPosterVisible(true);
        if (progressBar) {
          progressBar.style.width = '0%';
        }
        if (timecode) {
          timecode.textContent = 'Static';
        }
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (titleLines.length) {
          setMaskHidden(titleLines);
        }
        ScrollTrigger.create({
          trigger: section,
          start: 'top 70%',
          once: true,
          onEnter: () => {
            if (titleLines.length) {
              animateMaskReveal(titleLines, 'bottom', {
                duration: 0.78,
                stagger: 0.08,
              });
            }
          },
        });
      });
    }, section);

    return () => {
      video.removeEventListener('loadedmetadata', onReady);
      video.removeEventListener('error', onError);
      scrollTrigger?.kill();
      ctx.revert();
    };
  }, [videoSrc]);

  return (
    <section
      id="chapter-showreel"
      data-chapter="showreel"
      data-scene="showreel"
      data-logo-invert="1"
      ref={sectionRef}
      className={styles.section}
      aria-label="Showreel"
    >
      <div className={styles.pin} data-showreel-pin>
        <div className={styles.frame}>
          {videoSrc ? (
            <video
              key={videoSrc}
              ref={videoRef}
              className={`${styles.video} showreelVideo`}
              src={videoSrc}
              poster={SHOWREEL_POSTER}
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          ) : null}
          <img
            src={SHOWREEL_POSTER}
            alt=""
            className={`${styles.poster} showreelPoster ${posterVisible ? styles.posterVisible : ''}`}
            aria-hidden="true"
          />
        </div>

        <div className={styles.overlay}>
          <div>
            <h2 className={styles.title}>
              <span className={styles.titleLine} data-title-line>
                In motion
              </span>
            </h2>
          </div>
          <div className={styles.footer}>
            <p className={styles.timecode} ref={timecodeRef} aria-live="polite">
              00:00
            </p>
            <p className={styles.hint}>
              <span className={styles.hintScrub}>Scroll to scrub the cut</span>
              <span className={styles.hintStatic}>Showreel still</span>
            </p>
          </div>
        </div>

        <div className={styles.progress} aria-hidden="true">
          <span className={styles.progressBar} ref={progressBarRef} />
        </div>
      </div>
    </section>
  );
}
