'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { animateMaskReveal, setMaskHidden } from '@/lib/maskReveal';
import { pickShowreelVideo, SHOWREEL_LOCAL_SRC } from '@/content/showreel';
import type { ShowreelConfig } from '@/lib/content/types';
import { prefersReducedMotion } from '@/lib/motionPrefs';
import { resolveMediaUrl } from '@/lib/projectMedia';
import styles from './Showreel.module.scss';

type ShowreelProps = {
  showreelConfig: ShowreelConfig;
};

export default function Showreel({ showreelConfig }: ShowreelProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const posterSrc = resolveMediaUrl(showreelConfig.poster.trim());

  const playVideo = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      void video.play().catch(() => undefined);
    }
  }, []);

  const pauseVideo = useCallback(() => {
    videoRef.current?.pause();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const loadVideo = () => {
      setVideoSrc((current) =>
        current ?? resolveMediaUrl(showreelConfig.localSrc || SHOWREEL_LOCAL_SRC),
      );
    };

    if (!('IntersectionObserver' in window)) {
      loadVideo();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadVideo();
          observer.disconnect();
        }
      },
      { rootMargin: '700px 0px', threshold: 0 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [showreelConfig.localSrc]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !videoSrc || prefersReducedMotion()) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          playVideo();
        } else {
          pauseVideo();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [pauseVideo, playVideo, videoSrc]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const titleLines = section.querySelectorAll<HTMLElement>('[data-title-line]');

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(max-width: 959px), (prefers-reduced-motion: reduce)', () => {
        if (titleLines.length) {
          gsap.set(titleLines, { clearProps: 'clip-path,opacity,transform' });
        }
      });

      mm.add('(min-width: 960px) and (prefers-reduced-motion: no-preference)', () => {
        if (titleLines.length) {
          setMaskHidden(titleLines);
        }

        ScrollTrigger.create({
          trigger: section,
          start: 'top 72%',
          once: true,
          onEnter: () => {
            if (titleLines.length) {
              animateMaskReveal(titleLines, 'bottom', {
                duration: 0.78,
                stagger: 0.07,
              });
            }
          },
        });
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  const onVideoReady = () => {
    if (prefersReducedMotion()) {
      pauseVideo();
      setVideoReady(false);
      return;
    }

    setVideoReady(true);
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const rect = section.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      playVideo();
    }
  };

  const onVideoError = () => {
    if (!videoSrc) {
      return;
    }

    const fallback = resolveMediaUrl(pickShowreelVideo(showreelConfig, videoSrc));
    if (fallback && fallback !== videoSrc) {
      setVideoReady(false);
      setVideoSrc(fallback);
      return;
    }

    setVideoReady(false);
    setVideoSrc(null);
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
    if (!nextMuted) {
      playVideo();
    }
  };

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
      <div className={styles.stage}>
        <div className={styles.copyPanel}>
          <div className={styles.copyInner}>
            <h2 className={styles.title}>
              <span className={styles.titleLine} data-title-line>
                In motion
              </span>
            </h2>
            <p className={styles.lead}>
              <span className={styles.leadLine} data-title-line>
                The live moment starts long before the audience arrives.
              </span>
            </p>
            <p className={styles.body}>
              <span className={styles.bodyLine} data-title-line>
                On site, every build, cue, camera, and crew member moves together—turning plans into a
                show-ready reality.
              </span>
            </p>
            <p className={styles.body}>
              <span className={styles.bodyLine} data-title-line>
                From stadium productions to brand activations and live broadcasts, this is where the work
                comes alive.
              </span>
            </p>
            <ul className={styles.details} aria-label="Showreel highlights">
              <li className={styles.detailItem} data-title-line>
                Stadium and arena productions
              </li>
              <li className={styles.detailItem} data-title-line>
                Brand activations and festival builds
              </li>
              <li className={styles.detailItem} data-title-line>
                IMAG, live cameras, lighting, and show systems
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.videoColumn}>
          <div className={styles.frame}>
            <div className={styles.videoViewport}>
              {videoSrc ? (
                <video
                  key={videoSrc}
                  ref={videoRef}
                  className={styles.video}
                  src={videoSrc}
                  poster={posterSrc || undefined}
                  muted={isMuted}
                  playsInline
                  loop
                  preload="metadata"
                  onLoadedMetadata={onVideoReady}
                  onError={onVideoError}
                  aria-hidden="true"
                />
              ) : null}
            </div>
            {posterSrc ? (
              <img
                src={posterSrc}
                alt=""
                loading="lazy"
                decoding="async"
                className={`${styles.poster} ${!videoReady ? styles.posterVisible : ''}`}
                aria-hidden="true"
              />
            ) : null}

            {videoSrc ? (
              <div className={styles.controls}>
                <div className={styles.controlsStack}>
                  {isMuted ? <span className={styles.experienceTag}>Tap for sound</span> : null}
                  <button
                    type="button"
                    className={styles.controlBtn}
                    onClick={toggleMute}
                    aria-pressed={!isMuted}
                    aria-label={isMuted ? 'Unmute showreel' : 'Mute showreel'}
                  >
                    {isMuted ? 'Unmute' : 'Mute'}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
