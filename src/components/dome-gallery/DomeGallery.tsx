'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useGesture } from '@use-gesture/react';
import './DomeGallery.css';

type DomeImage = string | { src: string; alt?: string };

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

function buildItems(pool: DomeImage[], segments: number) {
  const xCols = Array.from({ length: segments }, (_, i) => i * 2 - (segments - 1));
  const yBandCountBase = Math.max(9, Math.floor(segments * 0.52));
  const yBandCount = yBandCountBase % 2 === 0 ? yBandCountBase + 1 : yBandCountBase;
  const yOffsets = Array.from({ length: yBandCount }, (_, i) => i * 2 - (yBandCount - 1));

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? yOffsets : yOffsets.map((value) => value + 1);
    return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const normalized = (pool.length ? pool : DEFAULT_IMAGES).map((image) =>
    typeof image === 'string' ? { src: image, alt: '' } : { src: image.src || '', alt: image.alt || '' },
  );

  return coords.map((coord, index) => {
    const item = normalized[index % normalized.length];
    return { ...coord, src: item.src, alt: item.alt };
  });
}

export default function DomeGallery({
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
}: DomeGalleryProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);
  const sphereRef = useRef<HTMLDivElement | null>(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const dragActiveRef = useRef(false);
  const autoRotateRef = useRef<number | null>(null);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = useCallback((xDeg: number, yDeg: number) => {
    const el = sphereRef.current;
    if (!el) {
      return;
    }
    el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
  }, []);

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

      const radius = clamp(basis * fit, minRadius, maxRadius);
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
  }, [applyTransform, autoRotateSpeed]);

  useGesture(
    {
      onDragStart: ({ event }) => {
        const pointer = getPointerPosition(event);
        if (!pointer) {
          return;
        }
        dragActiveRef.current = true;
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
          const vx = velocity[0] * direction[0];
          const vy = velocity[1] * direction[1];
          rotationRef.current = {
            x: clamp(nextX - vy * dragDampening, -maxVerticalRotationDeg, maxVerticalRotationDeg),
            y: wrapAngleSigned(nextY + vx * dragDampening),
          };
          applyTransform(rotationRef.current.x, rotationRef.current.y);
        }
      },
    },
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
                key={`${item.x}-${item.y}-${i}`}
                className="item"
                style={
                  {
                    ['--offset-x' as string]: item.x,
                    ['--offset-y' as string]: item.y,
                    ['--item-size-x' as string]: item.sizeX,
                    ['--item-size-y' as string]: item.sizeY,
                  } as React.CSSProperties
                }
              >
                <div className="item__image">
                  <img src={item.src} draggable={false} alt={item.alt || 'Project image'} />
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
}
