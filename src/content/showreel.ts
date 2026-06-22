/** Drop `public/assets/showreel.mp4` to override the random remote pool. */
export const SHOWREEL_LOCAL_SRC = '/assets/showreel.mp4';

/** Mixkit previews — live / concert footage for scroll-scrub showreel. */
export const SHOWREEL_VIDEOS = [
  'https://assets.mixkit.co/videos/preview/mixkit-crowd-at-a-concert-4052-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-people-at-a-concert-4048-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-dj-playing-music-at-a-concert-4338-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-stadium-lights-at-a-concert-4175-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-concert-lights-and-smoke-4173-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-audience-watching-a-concert-4380-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-rock-band-performing-on-stage-4379-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-singer-performing-on-stage-4378-large.mp4',
] as const;

export const SHOWREEL_POSTER =
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1920&q=80';

export function pickRandomShowreelVideo(exclude?: string): string {
  const pool = exclude ? SHOWREEL_VIDEOS.filter((src) => src !== exclude) : [...SHOWREEL_VIDEOS];
  if (!pool.length) {
    return SHOWREEL_VIDEOS[0];
  }
  return pool[Math.floor(Math.random() * pool.length)] ?? SHOWREEL_VIDEOS[0];
}

/** @deprecated Use pickRandomShowreelVideo() */
export const SHOWREEL_FALLBACK_MP4 = SHOWREEL_VIDEOS[0];
