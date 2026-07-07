import type { RefObject } from 'react';

/** Assembled TML mark paths (from Artboard 3). */
export const TML_MARK_PATHS = {
  rightWing:
    'M1210.65,795.66l-73.03-82.97c-3.08-3.49-7.56-5.48-12.29-5.48h-13.66c-.86,0-1.41-.54-1.41-.91v-18.92c0-3.7-1.37-7.31-3.86-10.17l-97.36-110.6c-5.23-5.94-13.34-8-20.68-5.23-7.56,2.85-12.44,10.02-12.44,18.26v228.84c0,10.73,8.52,19.46,18.99,19.46l201.61.21h.03c7.48,0,14.08-4.31,17.23-11.26,3.26-7.21,2.07-15.34-3.12-21.24Z',
  leftWing:
    'M393.41,560.37l-201.61-.21h-.02c-7.48,0-14.09,4.31-17.23,11.26-3.26,7.2-2.06,15.33,3.12,21.23l73.03,82.97c3.08,3.48,7.56,5.48,12.29,5.48h13.66c.86,0,1.41.54,1.41.9v18.93c0,3.72,1.37,7.32,3.86,10.16l97.36,110.6c3.69,4.19,8.81,6.45,14.07,6.45,2.21,0,4.44-.4,6.6-1.21,7.56-2.85,12.44-10.02,12.44-18.27v-228.85c0-10.72-8.52-19.45-18.98-19.46Z',
  center:
    'M907.62,499.78c-12.75-5.14-27.05-2.2-36.38,7.5l-167.23,173.72c-1.94,2.02-4.81,3.18-7.87,3.19h-.02c-3.05,0-5.93-1.16-7.88-3.17l-171.22-176.92c-9.35-9.66-23.63-12.55-36.37-7.42-12.03,4.87-19.51,15.63-19.51,28.08v338.88c0,16.84,14.43,30.54,32.18,30.54h166.57c6.93,0,13.49-2.53,18.47-7.12l13.94-12.87c.41-.37,1.42-.38,1.83-.01l12.62,11.64c5.84,5.39,13.55,8.36,21.71,8.36h166.56c17.75,0,32.18-13.7,32.18-30.54v-335.75c0-12.47-7.5-23.24-19.56-28.1Z',
} as const;

/** Tight bounds around the assembled three-path mark (Artboard 3). */
export const TML_MARK_BOUNDS = {
  x: 174.55,
  y: 496.68,
  width: 1039.23,
  height: 397.5,
} as const;

export const TML_MARK_SEAM_X = TML_MARK_BOUNDS.x + TML_MARK_BOUNDS.width / 2;

export const TML_MARK_VIEWBOX = `${TML_MARK_BOUNDS.x} ${TML_MARK_BOUNDS.y} ${TML_MARK_BOUNDS.width} ${TML_MARK_BOUNDS.height}`;

/** Per-piece viewBoxes so each shard is optically centered in its box. */
export const TML_PATH_VIEWBOX: Record<keyof typeof TML_MARK_PATHS, string> = {
  leftWing: '285 548 310 245',
  center: '558 478 515 395',
  rightWing: '1058 548 205 275',
};

export const TML_MARK_COLORS = {
  light: '#f3f4f5',
  dark: '#0f0f0e',
} as const;

type TransitionMarkProps = {
  variant: 'left' | 'right';
  leftWingRef?: RefObject<SVGGElement | null>;
  centerLeftRef?: RefObject<SVGGElement | null>;
  centerRightRef?: RefObject<SVGGElement | null>;
  rightWingRef?: RefObject<SVGGElement | null>;
  className?: string;
};

export default function TransitionMark({
  variant,
  leftWingRef,
  centerLeftRef,
  centerRightRef,
  rightWingRef,
  className,
}: TransitionMarkProps) {
  const isLeft = variant === 'left';

  return (
    <svg
      className={className}
      viewBox={TML_MARK_VIEWBOX}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {isLeft ? (
        <>
          <g ref={leftWingRef}>
            <path d={TML_MARK_PATHS.leftWing} fill={TML_MARK_COLORS.light} />
          </g>
          <g ref={centerLeftRef}>
            <path d={TML_MARK_PATHS.center} fill={TML_MARK_COLORS.light} />
          </g>
        </>
      ) : (
        <>
          <g ref={centerRightRef}>
            <path d={TML_MARK_PATHS.center} fill={TML_MARK_COLORS.dark} />
          </g>
          <g ref={rightWingRef}>
            <path d={TML_MARK_PATHS.rightWing} fill={TML_MARK_COLORS.dark} />
          </g>
        </>
      )}
    </svg>
  );
}
