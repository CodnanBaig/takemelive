'use client';

import Link from 'next/link';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, type CSSProperties } from 'react';
import { useGesture } from '@use-gesture/react';
import './DomeGallery.css';

type DomeImage = string | { src: string; alt?: string; href?: string };

export type DomeGalleryApi = {
  setRotation: (rotation: { x: number; y: number }) => void;
  getRotation: () => { x: number; y: number };
  setTileStretch: (stretch: { x: number; y: number }) => void;
  getRootElement: () => HTMLDivElement | null;
};

type GridItem = {
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
  src: string;
  alt: string;
  href?: string;
};

type PointItem = {
  rx: number;
  ry: number;
  sizeX: number;
  sizeY: number;
  src: string;
  alt: string;
  href?: string;
};

type DomeItem = GridItem | PointItem;

const DEFAULT_IMAGES: Array<{ src: string; alt: string }> = [
  {
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80',
    alt: 'Live event stage',
  },
  {
    src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80',
    alt: 'Audience lighting',
  },
  {
    src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1400&q=80',
    alt: 'Concert crowd',
  },
  {
    src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1400&q=80',
    alt: 'Production visuals',
  },
  {
    src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1400&q=80',
    alt: 'Performer spotlight',
  },
  {
    src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1400&q=80',
    alt: 'Large-scale show setup',
  },
  {
    src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80',
    alt: 'Immersive brand event',
  },
];

type DomeGalleryProps = {
  images?: DomeImage[];
  fit?: number;
  fitBasis?: 'min' | 'max' | 'width' | 'height' | 'auto';
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  segments?: number;
  dragDampening?: number;
  openedImageWidth?: string;
  openedImageHeight?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  grayscale?: boolean;
  autoRotateSpeed?: number;
  enableDrag?: boolean;
  enableAutoRotate?: boolean;
  layout?: 'grid' | 'points';
  onDragVelocity?: (velocity: { x: number; y: number; magnitude: number; active: boolean }) => void;
};

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};
const getPointerPosition = (event: MouseEvent | PointerEvent | TouchEvent | KeyboardEvent) => {
  if ('clientX' in event && 'clientY' in event) {
    return { x: event.clientX, y: event.clientY };
  }
  if ('touches' in event && event.touches.length > 0) {
    const touch = event.touches[0];
    return { x: touch.clientX, y: touch.clientY };
  }
  return null;
};

function buildItems(pool: DomeImage[], segments: number): GridItem[] {
  const xCols = Array.from({ length: segments }, (_, i) => i * 2 - (segments - 1));
  const yBandCountBase = Math.max(9, Math.floor(segments * 0.52));
  const yBandCount = yBandCountBase % 2 === 0 ? yBandCountBase + 1 : yBandCountBase;
  const yOffsets = Array.from({ length: yBandCount }, (_, i) => i * 2 - (yBandCount - 1));

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? yOffsets : yOffsets.map((value) => value + 1);
    return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const normalized = (pool.length ? pool : DEFAULT_IMAGES).map((image) =>
    typeof image === 'string'
      ? { src: image, alt: '', href: undefined }
      : {
          src: image.src || '',
          alt: image.alt || '',
          href: 'href' in image ? image.href : undefined,
        },
  );

  return coords.map((coord, index) => {
    const item = normalized[index % normalized.length];
    return { ...coord, src: item.src, alt: item.alt, href: item.href };
  });
}

function buildPointItems(pool: DomeImage[]): PointItem[] {
  const normalized = (pool.length ? pool : DEFAULT_IMAGES).map((image) =>
    typeof image === 'string'
      ? { src: image, alt: '', href: undefined }
      : {
          src: image.src || '',
          alt: image.alt || '',
          href: 'href' in image ? image.href : undefined,
        },
  );

  // Fibonacci sphere: even distribution, no overlap (given reasonable tile size).
  const n = normalized.length;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  return normalized.map((item, i) => {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const y = 1 - 2 * t;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;

    const ry = Math.atan2(x, z) * (180 / Math.PI);
    const rx = -Math.asin(y) * (180 / Math.PI);

    return {
      src: item.src,
      alt: item.alt,
      href: item.href,
      rx,
      ry,
      sizeX: 2,
      sizeY: 2,
    };
  });
}

const DomeGallery = forwardRef<DomeGalleryApi, DomeGalleryProps>(function DomeGallery(
  {
  images = DEFAULT_IMAGES,
  fit = 0.5,
  fitBasis = 'min',
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = '#120F17',
  maxVerticalRotationDeg = 5,
  dragSensitivity = 20,
  segments = 35,
  dragDampening = 0.92,
  openedImageWidth = '400px',
  openedImageHeight = '400px',
  imageBorderRadius = '0px',
  openedImageBorderRadius = '0px',
  grayscale = true,
  autoRotateSpeed = 0.22,
  enableDrag = true,
  enableAutoRotate = true,
  layout = 'grid',
  onDragVelocity,
}: DomeGalleryProps,
  ref,
) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);
  const sphereRef = useRef<HTMLDivElement | null>(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const dragActiveRef = useRef(false);
  const autoRotateRef = useRef<number | null>(null);

  const items: DomeItem[] = useMemo(() => {
    if (layout === 'points') {
      return buildPointItems(images);
    }
    return buildItems(images, segments);
  }, [images, layout, segments]);

  const applyTransform = useCallback((xDeg: number, yDeg: number) => {
    const el = sphereRef.current;
    if (!el) {
      return;
    }
    el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      setRotation: (rotation) => {
        rotationRef.current = {
          x: rotation.x,
          y: wrapAngleSigned(rotation.y),
        };
        applyTransform(rotationRef.current.x, rotationRef.current.y);
      },
      getRotation: () => ({ ...rotationRef.current }),
      setTileStretch: (stretch) => {
        const root = rootRef.current;
        if (!root) {
          return;
        }
        root.style.setProperty('--tile-stretch-x', `${stretch.x}`);
        root.style.setProperty('--tile-stretch-y', `${stretch.y}`);
      },
      getRootElement: () => rootRef.current,
    }),
    [applyTransform],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const ro = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      const minDim = Math.min(w, h);
      const maxDim = Math.max(w, h);

      let basis = minDim;
      if (fitBasis === 'max') basis = maxDim;
      if (fitBasis === 'width') basis = w;
      if (fitBasis === 'height') basis = h;
      if (fitBasis === 'auto') basis = w / h >= 1.2 ? w : minDim;

      const desired = basis * fit;
      // Never let minRadius exceed what fits the viewport; otherwise phones get a huge off-canvas dome.
      const minRadiusFeasible = Math.min(minRadius, minDim * 0.52);
      const radius = clamp(desired, minRadiusFeasible, maxRadius);
      const viewerPad = Math.max(8, Math.round(minDim * padFactor));

      root.style.setProperty('--radius', `${Math.round(radius)}px`);
      root.style.setProperty('--viewer-pad', `${viewerPad}px`);
      root.style.setProperty('--overlay-blur-color', overlayBlurColor);
      root.style.setProperty('--tile-radius', imageBorderRadius);
      root.style.setProperty('--enlarge-radius', openedImageBorderRadius);
      root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');
      root.style.setProperty('--tile-stretch-x', '1');
      root.style.setProperty('--tile-stretch-y', '1');
      root.style.setProperty('--opened-image-width', openedImageWidth);
      root.style.setProperty('--opened-image-height', openedImageHeight);
      applyTransform(rotationRef.current.x, rotationRef.current.y);
    });

    ro.observe(root);
    return () => ro.disconnect();
  }, [
    applyTransform,
    fit,
    fitBasis,
    grayscale,
    imageBorderRadius,
    maxRadius,
    minRadius,
    openedImageBorderRadius,
    openedImageHeight,
    openedImageWidth,
    overlayBlurColor,
    padFactor,
  ]);

  useEffect(() => {
    if (!enableAutoRotate) {
      return;
    }
    const root = rootRef.current;
    if (!root) {
      return;
    }

    let rafId = 0;
    let stretchX = 1;
    let stretchY = 1;

    const tick = () => {
      if (!dragActiveRef.current) {
        rotationRef.current = {
          x: rotationRef.current.x,
          y: wrapAngleSigned(rotationRef.current.y + autoRotateSpeed),
        };
        applyTransform(rotationRef.current.x, rotationRef.current.y);

        stretchX += (1.018 - stretchX) * 0.06;
        stretchY += (0.982 - stretchY) * 0.06;
      } else {
        stretchX += (1 - stretchX) * 0.15;
        stretchY += (1 - stretchY) * 0.15;
      }

      root.style.setProperty('--tile-stretch-x', stretchX.toFixed(4));
      root.style.setProperty('--tile-stretch-y', stretchY.toFixed(4));
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    autoRotateRef.current = rafId;

    return () => {
      if (autoRotateRef.current) {
        window.cancelAnimationFrame(autoRotateRef.current);
      }
    };
  }, [applyTransform, autoRotateSpeed, enableAutoRotate]);

  useGesture(
    enableDrag
      ? {
          onDragStart: ({ event }) => {
            const pointer = getPointerPosition(event);
            if (!pointer) {
              return;
            }
            dragActiveRef.current = true;
            onDragVelocity?.({ x: 0, y: 0, magnitude: 0, active: true });
            startRotRef.current = { ...rotationRef.current };
            startPosRef.current = pointer;
          },
          onDrag: ({ event, last, velocity = [0, 0], direction = [0, 0] }) => {
            if (!startPosRef.current) {
              return;
            }
            const pointer = getPointerPosition(event);
            if (!pointer) {
              return;
            }
            const dx = pointer.x - startPosRef.current.x;
            const dy = pointer.y - startPosRef.current.y;

            const nextX = clamp(
              startRotRef.current.x - dy / dragSensitivity,
              -maxVerticalRotationDeg,
              maxVerticalRotationDeg,
            );
            const nextY = wrapAngleSigned(startRotRef.current.y + dx / dragSensitivity);
            const stretchAmp = clamp(Math.abs(dx) / 220, 0, 0.12);
            const root = rootRef.current;
            if (root) {
              root.style.setProperty('--tile-stretch-x', `${1 + stretchAmp}`);
              root.style.setProperty('--tile-stretch-y', `${1 - stretchAmp * 0.55}`);
            }
            rotationRef.current = { x: nextX, y: nextY };
            applyTransform(nextX, nextY);

            if (last) {
              dragActiveRef.current = false;
              onDragVelocity?.({ x: 0, y: 0, magnitude: 0, active: false });
              const vx = velocity[0] * direction[0];
              const vy = velocity[1] * direction[1];
              rotationRef.current = {
                x: clamp(nextX - vy * dragDampening, -maxVerticalRotationDeg, maxVerticalRotationDeg),
                y: wrapAngleSigned(nextY + vx * dragDampening),
              };
              applyTransform(rotationRef.current.x, rotationRef.current.y);
            } else {
              const vx = velocity[0] * direction[0];
              const vy = velocity[1] * direction[1];
              const magnitude = Math.hypot(vx, vy);
              onDragVelocity?.({ x: vx, y: vy, magnitude, active: true });
            }
          },
        }
      : {},
    { target: mainRef, eventOptions: { passive: true } },
  );

  return (
    <div
      ref={rootRef}
      className="sphere-root"
      style={{ ['--segments-x' as string]: segments, ['--segments-y' as string]: segments }}
    >
      <main ref={mainRef} className="sphere-main">
        <div className="stage">
          <div ref={sphereRef} className="sphere">
            {items.map((item, i) => (
              <div
                key={`${item.src}-${i}`}
                className="item"
                style={
                  {
                    ['--offset-x' as string]: 'x' in item ? item.x : 0,
                    ['--offset-y' as string]: 'y' in item ? item.y : 0,
                    ['--item-size-x' as string]: item.sizeX,
                    ['--item-size-y' as string]: item.sizeY,
                    ['--item-rx' as string]: 'rx' in item ? `${item.rx}deg` : undefined,
                    ['--item-ry' as string]: 'ry' in item ? `${item.ry}deg` : undefined,
                  } as CSSProperties
                }
              >
                <div className="item__image">
                  {item.href ? (
                    <Link href={item.href} className="item__link" aria-label={item.alt || 'View project'}>
                      <img src={item.src} draggable={false} alt={item.alt || 'Project image'} />
                    </Link>
                  ) : (
                    <img src={item.src} draggable={false} alt={item.alt || 'Project image'} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="overlay" />
        <div className="overlay overlay--blur" />
        <div className="edge-fade edge-fade--top" />
        <div className="edge-fade edge-fade--bottom" />
      </main>
    </div>
  );
});

export default DomeGallery;
