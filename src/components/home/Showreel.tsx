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

const SLICE_KEYS = ['top', 'middle', 'bottom'] as const;
const EXIT_SHARE = 0.12;

function formatTimecode(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '00:00';
  }
  const whole = Math.floor(seconds);
  const mins = Math.floor(whole / 60);
  const secs = whole % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function resolveSliceAssembly(
  approachProgress: number,
  pinActive: boolean,
  pinProgress: number,
): number {
  if (pinActive) {
    if (pinProgress >= 1 - EXIT_SHARE) {
      return gsap.parseEase('power3.in')((1 - pinProgress) / EXIT_SHARE);
    }
    return 1;
  }
  return gsap.parseEase('power3.out')(approachProgress);
}

function scrubProgress(scrollProgress: number): number {
  if (scrollProgress >= 1 - EXIT_SHARE) {
    return 1;
  }
  return scrollProgress / (1 - EXIT_SHARE);
}

type ShowreelProps = {
  showreelConfig: ShowreelConfig;
};

export default function Showreel({ showreelConfig }: ShowreelProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressBarRef = useRef<HTMLSpanElement | null>(null);
  const timecodeRef = useRef<HTMLParagraphElement | null>(null);
  const scrollScrubEnabledRef = useRef(true);
  const isPlayingRef = useRef(false);
  const isMutedRef = useRef(true);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  const assembleSlicesRef = useRef<(assembly: number) => void>(() => {});

  const [posterVisible, setPosterVisible] = useState(true);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [scrollScrubEnabled, setScrollScrubEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const posterSrc = showreelConfig.poster.trim();

  useEffect(() => {
    scrollScrubEnabledRef.current = scrollScrubEnabled;
  }, [scrollScrubEnabled]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

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
    const section = sectionRef.current;
    const primary = videoRef.current;
    if (!section) {
      return;
    }
    section.querySelectorAll<HTMLVideoElement>('.showreelVideo').forEach((clip) => {
      clip.muted = clip !== primary ? true : muted;
    });
  }, []);

  const syncVideos = useCallback((time: number) => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }
    section.querySelectorAll<HTMLVideoElement>('.showreelVideo').forEach((clip) => {
      if (Math.abs(clip.currentTime - time) > 0.04) {
        clip.currentTime = time;
      }
    });
  }, []);

  const updateTimecode = useCallback((seconds: number) => {
    if (timecodeRef.current) {
      timecodeRef.current.textContent = formatTimecode(seconds);
    }
  }, []);

  const updateProgressBar = useCallback((ratio: number) => {
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${ratio * 100}%`;
    }
  }, []);

  useEffect(() => {
    if (!videoSrc) {
      return;
    }

    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const getPrimaryVideo = () =>
      section.querySelector<HTMLVideoElement>('[data-showreel-primary]');

    const titleLines = section.querySelectorAll<HTMLElement>('[data-title-line]');
    const slicePanels = {
      top: section.querySelector<HTMLElement>('[data-slice-panel="top"]'),
      middle: section.querySelector<HTMLElement>('[data-slice-panel="middle"]'),
      bottom: section.querySelector<HTMLElement>('[data-slice-panel="bottom"]'),
    };

    const setSliceOffsets = (assembly: number) => {
      const top = slicePanels.top;
      const middle = slicePanels.middle;
      const bottom = slicePanels.bottom;
      if (!top || !middle || !bottom) {
        return;
      }

      const disperse = 1 - assembly;
      gsap.set(top, { x: 0, yPercent: -108 * disperse, xPercent: 0 });
      gsap.set(middle, { xPercent: -108 * disperse, yPercent: 0, x: 0, y: 0 });
      gsap.set(bottom, { x: 0, yPercent: 108 * disperse, xPercent: 0 });
    };

    assembleSlicesRef.current = setSliceOffsets;
    setSliceOffsets(1);

    let scrollTriggersRefLocal: ScrollTrigger[] = [];
    let scrollTimelineMm: ReturnType<typeof gsap.matchMedia> | null = null;
    let video: HTMLVideoElement | null = null;
    let disposed = false;

    const killScrollTriggers = () => {
      scrollTimelineMm?.revert();
      scrollTimelineMm = null;
      scrollTriggersRefLocal.forEach((trigger) => trigger.kill());
      scrollTriggersRefLocal = [];
      scrollTriggersRef.current = [];
    };

    const bindScrollTimeline = (primary: HTMLVideoElement) => {
      if (!primary.duration || Number.isNaN(primary.duration)) {
        return;
      }

      killScrollTriggers();

      const pinEl = section.querySelector<HTMLElement>('[data-showreel-pin]') ?? section;
      const getPinDistance = () => {
        const scrub = Math.max(window.innerHeight * 2.8, primary.duration * 18, 1600);
        const exit = window.innerHeight * 0.55;
        return Math.round(scrub + exit);
      };

      const bindDesktopTimeline = () => {
        const pinTrigger = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: () => `+=${getPinDistance()}`,
          pin: pinEl,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (!scrollScrubEnabledRef.current || isPlayingRef.current) {
              return;
            }

            let assembly = 1;
            if (self.progress >= 1 - EXIT_SHARE) {
              assembly = resolveSliceAssembly(1, true, self.progress);
            }
            setSliceOffsets(assembly);

            const scrub = scrubProgress(self.progress);
            syncVideos(primary.duration * scrub);
            updateProgressBar(scrub);
            updateTimecode(primary.duration * scrub);
          },
        });

        const approachTrigger = ScrollTrigger.create({
          trigger: section,
          start: 'top 95%',
          end: 'top top',
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (!scrollScrubEnabledRef.current || isPlayingRef.current || pinTrigger.isActive) {
              return;
            }
            setSliceOffsets(resolveSliceAssembly(self.progress, false, 0));
          },
        });

        scrollTriggersRefLocal = [approachTrigger, pinTrigger];
        scrollTriggersRef.current = scrollTriggersRefLocal;
        setSliceOffsets(
          resolveSliceAssembly(approachTrigger.progress, pinTrigger.isActive, pinTrigger.progress),
        );
      };

      const bindMobileTimeline = () => {
        setSliceOffsets(1);

        const scrubTrigger = ScrollTrigger.create({
          trigger: section,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: 0.45,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (!scrollScrubEnabledRef.current || isPlayingRef.current) {
              return;
            }
            setSliceOffsets(1);
            syncVideos(primary.duration * self.progress);
            updateProgressBar(self.progress);
            updateTimecode(primary.duration * self.progress);
          },
        });

        scrollTriggersRefLocal = [scrubTrigger];
        scrollTriggersRef.current = scrollTriggersRefLocal;
      };

      scrollTimelineMm = gsap.matchMedia();
      scrollTimelineMm.add('(max-width: 959px)', bindMobileTimeline);
      scrollTimelineMm.add('(min-width: 960px)', bindDesktopTimeline);

      ScrollTrigger.refresh();
    };

    const onReady = (primary: HTMLVideoElement) => {
      if (disposed) {
        return;
      }

      video = primary;
      applyMuted(isMutedRef.current);

      if (prefersReducedMotion()) {
        setPosterVisible(true);
        primary.pause();
        setSliceOffsets(1);
        updateProgressBar(0);
        updateTimecode(0);
        return;
      }

      setPosterVisible(false);
      primary.pause();
      syncVideos(0);
      bindScrollTimeline(primary);
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

    const onPlayTimeUpdate = () => {
      if (!isPlayingRef.current || !video) {
        return;
      }
      syncVideos(video.currentTime);
      updateTimecode(video.currentTime);
      if (video.duration) {
        updateProgressBar(video.currentTime / video.duration);
      }
    };

    const onPlayEnded = () => {
      if (!isPlayingRef.current) {
        return;
      }
      setIsPlaying(false);
      isPlayingRef.current = false;
      video?.pause();
    };

    const attachVideo = (primary: HTMLVideoElement) => {
      videoRef.current = primary;

      const onMetadata = () => onReady(primary);
      primary.addEventListener('loadedmetadata', onMetadata);
      primary.addEventListener('error', onError);
      primary.addEventListener('timeupdate', onPlayTimeUpdate);
      primary.addEventListener('ended', onPlayEnded);

      if (primary.readyState >= 1) {
        onReady(primary);
      }

      return () => {
        primary.removeEventListener('loadedmetadata', onMetadata);
        primary.removeEventListener('error', onError);
        primary.removeEventListener('timeupdate', onPlayTimeUpdate);
        primary.removeEventListener('ended', onPlayEnded);
      };
    };

    let detachVideo: (() => void) | undefined;

    const waitForVideo = () => {
      if (disposed) {
        return;
      }
      const primary = getPrimaryVideo();
      if (primary) {
        detachVideo = attachVideo(primary);
        return;
      }
      requestAnimationFrame(waitForVideo);
    };

    waitForVideo();

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        killScrollTriggers();
        scrollTimelineMm?.revert();
        scrollTimelineMm = null;
        video?.pause();
        setPosterVisible(true);
        setSliceOffsets(1);
        updateProgressBar(0);
        updateTimecode(0);
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
      killScrollTriggers();
      scrollTimelineMm?.revert();
      ctx.revert();
    };
  }, [
    applyMuted,
    showreelConfig,
    syncVideos,
    updateProgressBar,
    updateTimecode,
    videoSrc,
  ]);

  const assembleSlices = (assembly: number) => {
    assembleSlicesRef.current(assembly);
  };

  const resetSlicePanels = () => {
    const section = sectionRef.current;
    section?.querySelectorAll<HTMLElement>('[data-slice-panel]').forEach((panel) => {
      gsap.set(panel, { x: 0, y: 0 });
    });
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    isMutedRef.current = next;
    applyMuted(next);
  };

  const toggleScrollScrub = () => {
    const next = !scrollScrubEnabled;
    setScrollScrubEnabled(next);
    scrollScrubEnabledRef.current = next;

    if (next) {
      setIsPlaying(false);
      isPlayingRef.current = false;
      const video = videoRef.current;
      if (video) {
        video.pause();
        const activeTrigger =
          scrollTriggersRef.current.find((trigger) => trigger.isActive) ??
          scrollTriggersRef.current[scrollTriggersRef.current.length - 1];
        if (activeTrigger && video.duration) {
          const scrub = activeTrigger.progress >= 1 - EXIT_SHARE
            ? scrubProgress(activeTrigger.progress)
            : activeTrigger.progress;
          syncVideos(video.duration * scrub);
          updateTimecode(video.duration * scrub);
          updateProgressBar(scrub);
        }
      }
      ScrollTrigger.refresh();
      return;
    }

    const video = videoRef.current;
    if (video) {
      video.pause();
    }
    setIsPlaying(false);
    isPlayingRef.current = false;
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (isPlaying) {
      sectionRef.current?.querySelectorAll<HTMLVideoElement>('.showreelVideo').forEach((clip) => {
        clip.pause();
      });
      setIsPlaying(false);
      isPlayingRef.current = false;
      return;
    }

    setScrollScrubEnabled(false);
    scrollScrubEnabledRef.current = false;
    setIsPlaying(true);
    isPlayingRef.current = true;
    assembleSlices(1);
    resetSlicePanels();

    applyMuted(isMutedRef.current);
    const section = sectionRef.current;
    section?.querySelectorAll<HTMLVideoElement>('.showreelVideo').forEach((clip) => {
      void clip.play().catch(() => undefined);
    });
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
      <div className={styles.pin} data-showreel-pin>
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
                  This reel is scroll-scrubbed so you can move through the edit at your own pace.
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

            <div className={styles.meta}>
              <p className={styles.timecode} ref={timecodeRef} aria-live="polite">
                00:00
              </p>
              <p className={styles.hint}>
                <span className={styles.hintScrub}>
                  {scrollScrubEnabled
                    ? 'Scroll to assemble and scrub the cut'
                    : 'Playback mode: scroll scrub is off'}
                </span>
                <span className={styles.hintStatic}>Showreel still</span>
              </p>
            </div>
          </div>

          <div className={styles.videoColumn}>
            <div className={styles.frame} ref={frameRef}>
              <div className={styles.sliceStack}>
                {SLICE_KEYS.map((slice) => (
                  <div
                    key={slice}
                    className={styles.slice}
                    data-slice={slice}
                    data-slice-panel={slice}
                  >
                    <div className={styles.sliceMover}>
                      {videoSrc ? (
                        <video
                          key={`${videoSrc}-${slice}`}
                          ref={slice === 'top' ? videoRef : undefined}
                          data-showreel-primary={slice === 'top' ? '' : undefined}
                          className={`${styles.video} showreelVideo`}
                          src={videoSrc}
                          poster={slice === 'top' && posterSrc ? posterSrc : undefined}
                          muted
                          playsInline
                          preload="auto"
                          aria-hidden="true"
                        />
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
              {posterSrc ? (
                <img
                  src={posterSrc}
                  alt=""
                  className={`${styles.poster} showreelPoster ${posterVisible ? styles.posterVisible : ''}`}
                  aria-hidden="true"
                />
              ) : null}

              <div className={styles.controls}>
                <button
                  type="button"
                  className={styles.controlBtn}
                  onClick={togglePlay}
                  aria-pressed={isPlaying}
                  aria-label={isPlaying ? 'Pause showreel' : 'Play showreel'}
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button
                  type="button"
                  className={styles.controlBtn}
                  onClick={toggleMute}
                  aria-pressed={!isMuted}
                  aria-label={isMuted ? 'Unmute showreel' : 'Mute showreel'}
                >
                  {isMuted ? 'Unmute' : 'Mute'}
                </button>
                <button
                  type="button"
                  className={`${styles.controlBtn} ${scrollScrubEnabled ? styles.controlBtnActive : ''}`}
                  onClick={toggleScrollScrub}
                  aria-pressed={scrollScrubEnabled}
                  aria-label={
                    scrollScrubEnabled
                      ? 'Turn off scroll scrub'
                      : 'Turn on scroll scrub'
                  }
                >
                  {scrollScrubEnabled ? 'Scroll scrub on' : 'Scroll scrub off'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.progress} aria-hidden="true">
          <span className={styles.progressBar} ref={progressBarRef} />
        </div>
      </div>
    </section>
  );
}
