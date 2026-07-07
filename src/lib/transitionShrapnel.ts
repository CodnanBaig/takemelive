export type MarkPathKey = 'leftWing' | 'center' | 'rightWing';
export type ShardTone = 'light' | 'dark';
export type ShardClip = 'none' | 'left' | 'right';

export type BurstPiece = {
  id: string;
  path: MarkPathKey;
  tone: ShardTone;
  clip: ShardClip;
  end: { x: number; y: number; scale: number; rotate: number; opacity: number };
  duration: number;
};

const MIRRORED_PATH: Record<MarkPathKey, MarkPathKey> = {
  leftWing: 'rightWing',
  rightWing: 'leftWing',
  center: 'center',
};

const MIRRORED_CLIP: Record<ShardClip, ShardClip> = {
  none: 'none',
  left: 'right',
  right: 'left',
};

type DebrisHalf = {
  id: string;
  path: MarkPathKey;
  clip: ShardClip;
  end: BurstPiece['end'];
  duration: number;
};

function mirrorDebris(half: DebrisHalf): [BurstPiece, BurstPiece] {
  return [
    {
      id: `${half.id}-l`,
      path: half.path,
      tone: 'light',
      clip: half.clip,
      end: half.end,
      duration: half.duration,
    },
    {
      id: `${half.id}-r`,
      path: MIRRORED_PATH[half.path],
      tone: 'dark',
      clip: MIRRORED_CLIP[half.clip],
      end: {
        x: -half.end.x,
        y: half.end.y,
        scale: half.end.scale,
        rotate: -half.end.rotate,
        opacity: half.end.opacity,
      },
      duration: half.duration,
    },
  ];
}

/** Locked assembly: four core paths form the full mark at rest. */
const CORE_PIECES: BurstPiece[] = [
  {
    id: 'core-wing-l',
    path: 'leftWing',
    tone: 'light',
    clip: 'none',
    end: { x: -74, y: -6, scale: 0.9, rotate: -16, opacity: 0 },
    duration: 0.22,
  },
  {
    id: 'core-center-l',
    path: 'center',
    tone: 'light',
    clip: 'left',
    end: { x: -50, y: 8, scale: 0.86, rotate: -6, opacity: 0 },
    duration: 0.3,
  },
  {
    id: 'core-center-r',
    path: 'center',
    tone: 'dark',
    clip: 'right',
    end: { x: 50, y: 8, scale: 0.86, rotate: 6, opacity: 0 },
    duration: 0.3,
  },
  {
    id: 'core-wing-r',
    path: 'rightWing',
    tone: 'dark',
    clip: 'none',
    end: { x: 74, y: -6, scale: 0.9, rotate: 16, opacity: 0 },
    duration: 0.22,
  },
];

/** Debris duplicates sit on the same paths at rest, then peel off symmetrically. */
const DEBRIS_HALVES: DebrisHalf[] = [
  {
    id: 'burst-wing-up',
    path: 'leftWing',
    clip: 'none',
    end: { x: -86, y: -36, scale: 0.52, rotate: -32, opacity: 0 },
    duration: 0.24,
  },
  {
    id: 'burst-wing-down',
    path: 'leftWing',
    clip: 'none',
    end: { x: -84, y: 40, scale: 0.5, rotate: 26, opacity: 0 },
    duration: 0.27,
  },
  {
    id: 'burst-center-up',
    path: 'center',
    clip: 'left',
    end: { x: -56, y: -44, scale: 0.4, rotate: -20, opacity: 0 },
    duration: 0.31,
  },
  {
    id: 'burst-center-down',
    path: 'center',
    clip: 'left',
    end: { x: -54, y: 48, scale: 0.36, rotate: 14, opacity: 0 },
    duration: 0.28,
  },
  {
    id: 'burst-outer-up',
    path: 'leftWing',
    clip: 'none',
    end: { x: -94, y: -52, scale: 0.28, rotate: -40, opacity: 0 },
    duration: 0.19,
  },
  {
    id: 'burst-outer-down',
    path: 'leftWing',
    clip: 'none',
    end: { x: -92, y: 56, scale: 0.26, rotate: 36, opacity: 0 },
    duration: 0.2,
  },
  {
    id: 'burst-fleck-up',
    path: 'leftWing',
    clip: 'none',
    end: { x: -76, y: -60, scale: 0.2, rotate: 46, opacity: 0 },
    duration: 0.17,
  },
  {
    id: 'burst-fleck-down',
    path: 'leftWing',
    clip: 'none',
    end: { x: -78, y: 58, scale: 0.2, rotate: -40, opacity: 0 },
    duration: 0.18,
  },
];

export const TRANSITION_BURST: BurstPiece[] = [
  ...CORE_PIECES,
  ...DEBRIS_HALVES.flatMap((half) => mirrorDebris(half)),
];
