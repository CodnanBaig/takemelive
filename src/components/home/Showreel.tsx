'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import {
  animateMaskReveal,
  setMaskHidden,
} from '@/lib/maskReveal';
import {
  pickShowreelVideo,
  SHOWREEL_LOCAL_SRC,
} from '@/content/showreel';
import type { ShowreelConfig } from '@/lib/content/types';
import { prefersReducedMotion } from '@/lib/motionPrefs';
import styles from './Showreel.module.scss';

type ShowreelProps = {
  showreelConfig: ShowreelConfig;
};

export default function Showreel({ showreelConfig }: ShowreelProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isMutedRef = useRef(true);

  const [posterVisible, setPosterVisible] = useState(true);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const posterSrc = showreelConfig.poster.trim();

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    let cancelled = false;

    const resolveSource = async () => {
      const localSrc = showreelConfig.localSrc || SHOWREEL_LOCAL_SRC;
      if (!cancelled) {
        setVideoSrc(localSrc);
      }

      try {
        const response = await fetch(localSrc, { method: 'HEAD' });
        if (!cancelled && response.ok) {
          return;
        }
      } catch {
        // Fall through to remote clip when local file is missing.
      }

      if (!cancelled) {
        setVideoSrc(pickShowreelVideo(showreelConfig));
      }
    };

    void resolveSource();

    return () => {
      cancelled = true;
    };
  }, [showreelConfig]);

  const applyMuted = useCallback((muted: boolean) => {
    const video = videoRef.current;
    if (video) {
      video.muted = muted;
    }
  }, []);

  const playVideo = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      void video.play().catch(() => undefined);
    }
  }, []);

  const pauseVideo = useCallback(() => {
    videoRef.current?.pause();
  }, []);

  const setMutedState = useCallback((muted: boolean) => {
    setIsMuted(muted);
    isMutedRef.current = muted;
    applyMuted(muted);
  }, [applyMuted]);

  const activatePlayback = useCallback(() => {
    setMutedState(false);
    playVideo();
  }, [playVideo, setMutedState]);

  useEffect(() => {
    if (!videoSrc) {
      return;
    }

    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const titleLines = section.querySelectorAll<HTMLElement>('[data-title-line]');
    let playbackTrigger: ScrollTrigger | null = null;
    let disposed = false;

    const bindPlayback = () => {
      playbackTrigger?.kill();

      playbackTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 85%',
        end: 'bottom 15%',
        onEnter: () => activatePlayback(),
        onLeave: () => pauseVideo(),
        onEnterBack: () => activatePlayback(),
        onLeaveBack: () => pauseVideo(),
      });
    };

    const onReady = (video: HTMLVideoElement) => {
      if (disposed) {
        return;
      }

      videoRef.current = video;
      applyMuted(isMutedRef.current);
      video.loop = true;

      if (prefersReducedMotion()) {
        setPosterVisible(true);
        video.pause();
        return;
      }

      setPosterVisible(false);
      bindPlayback();

      if (ScrollTrigger.isInViewport(section, 0.2)) {
        activatePlayback();
      }
    };

    const onError = () => {
      if (!videoSrc) {
        setPosterVisible(true);
        return;
      }

      const fallback = pickShowreelVideo(showreelConfig, videoSrc);
      if (fallback !== videoSrc) {
        setVideoSrc(fallback);
        return;
      }

      setPosterVisible(true);
    };

    const attachVideo = (video: HTMLVideoElement) => {
      const onMetadata = () => onReady(video);
      video.addEventListener('loadedmetadata', onMetadata);
      video.addEventListener('error', onError);

      if (video.readyState >= 1) {
        onReady(video);
      }

      return () => {
        video.removeEventListener('loadedmetadata', onMetadata);
        video.removeEventListener('error', onError);
        playbackTrigger?.kill();
      };
    };

    let detachVideo: (() => void) | undefined;

    const waitForVideo = () => {
      if (disposed) {
        return;
      }
      const video = videoRef.current;
      if (video) {
        detachVideo = attachVideo(video);
        return;
      }
      requestAnimationFrame(waitForVideo);
    };

    waitForVideo();

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        pauseVideo();
        setPosterVisible(true);
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const titleMm = gsap.matchMedia();

        titleMm.add('(max-width: 959px)', () => {
          if (titleLines.length) {
            gsap.set(titleLines, { clearProps: 'clip-path,opacity,transform' });
          }
        });

        titleMm.add('(min-width: 960px)', () => {
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
      });
    }, section);

    return () => {
      disposed = true;
      detachVideo?.();
      pauseVideo();
      ctx.revert();
    };
  }, [activatePlayback, applyMuted, pauseVideo, showreelConfig, videoSrc]);

  const toggleMute = () => {
    setMutedState(!isMuted);
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
                A vertical cut from the floor: crowds building, cues landing, and the seconds
                before the house opens.
              </span>
            </p>
            <p className={styles.body}>
              <span className={styles.bodyLine} data-title-line>
                Stadium builds, festival stages, and broadcast packages, captured where the work
                actually happens.
              </span>
            </p>
            <ul className={styles.details} aria-label="Showreel highlights">
              <li className={styles.detailItem} data-title-line>
                Arena tours and opening ceremonies
              </li>
              <li className={styles.detailItem} data-title-line>
                Brand activations and festival production
              </li>
              <li className={styles.detailItem} data-title-line>
                IMAG, lighting, and live camera packages
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
                  muted
                  playsInline
                  loop
                  preload="auto"
                  aria-hidden="true"
                />
              ) : null}
            </div>
            {posterSrc ? (
              <img
                src={posterSrc}
                alt=""
                className={`${styles.poster} ${posterVisible ? styles.posterVisible : ''}`}
                aria-hidden="true"
              />
            ) : null}

            <div className={styles.controls}>
              {isMuted ? (
                <span className={styles.experienceTag}>Click for better experience</span>
              ) : null}
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
        </div>
      </div>
    </section>
  );
}
