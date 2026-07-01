import type { ShowreelConfig } from '@/lib/content/types';

export const SHOWREEL_LOCAL_SRC = '/IMG_1003_optimized.mp4';

export function pickShowreelVideo(config: ShowreelConfig, exclude?: string): string {
  if (config.primaryVideo.trim()) {
    return config.primaryVideo.trim();
  }

  const pool = config.useRandomFallback
    ? config.fallbackVideos.filter((src) => src !== exclude)
    : [];

  if (!pool.length) {
    return config.fallbackVideos[0] ?? '';
  }

  return pool[Math.floor(Math.random() * pool.length)] ?? config.fallbackVideos[0] ?? '';
}

/** @deprecated Use pickShowreelVideo(config) */
export function pickRandomShowreelVideo(exclude?: string): string {
  return pickShowreelVideo(
    {
      localSrc: SHOWREEL_LOCAL_SRC,
      primaryVideo: '',
      fallbackVideos: [
        'https://assets.mixkit.co/videos/preview/mixkit-crowd-at-a-concert-4052-large.mp4',
      ],
      poster:
        'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1920&q=80',
      useRandomFallback: true,
    },
    exclude,
  );
}
