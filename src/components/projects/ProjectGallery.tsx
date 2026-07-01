'use client';

import { useCallback, useMemo, useState } from 'react';
import { computeGalleryLayout, type GalleryItemLayout } from '@/lib/galleryLayout';
import styles from './ProjectDetail.module.scss';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1800&q=80';

type ProjectGalleryProps = {
  images: string[];
  projectTitle: string;
};

type MeasuredImage = {
  width: number;
  height: number;
};

const DEFAULT_LAYOUT: GalleryItemLayout = {
  span: 12,
  orientation: 'landscape',
  aspectRatio: 16 / 9,
};

export default function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [measured, setMeasured] = useState<MeasuredImage[]>(() =>
    images.map(() => ({ width: 0, height: 0 })),
  );

  const recordSize = useCallback((index: number, width: number, height: number) => {
    if (!width || !height) {
      return;
    }

    setMeasured((current) => {
      if (current[index]?.width === width && current[index]?.height === height) {
        return current;
      }

      const next = [...current];
      next[index] = { width, height };
      return next;
    });
  }, []);

  const handleLoad = useCallback(
    (index: number, event: React.SyntheticEvent<HTMLImageElement>) => {
      const img = event.currentTarget;
      recordSize(index, img.naturalWidth, img.naturalHeight);
    },
    [recordSize],
  );

  const bindImageRef = useCallback(
    (index: number) => (node: HTMLImageElement | null) => {
      if (node?.complete && node.naturalWidth > 0) {
        recordSize(index, node.naturalWidth, node.naturalHeight);
      }
    },
    [recordSize],
  );

  const layouts = useMemo(() => {
    const ready = measured.every((size) => size.width > 0 && size.height > 0);
    if (!ready) {
      return images.map(() => DEFAULT_LAYOUT);
    }
    return computeGalleryLayout(measured);
  }, [images, measured]);

  if (images.length === 0) {
    return null;
  }

  return (
    <section className={styles.galleryShell} aria-label={`${projectTitle} gallery`}>
      <div className={styles.gallery}>
        {images.map((image, index) => {
          const layout = layouts[index] ?? DEFAULT_LAYOUT;

          return (
            <figure
              key={`${image}-${index}`}
              className={styles.figure}
              data-detail-figure
              data-orientation={layout.orientation}
              data-span={layout.span}
              style={{ '--figure-aspect': layout.aspectRatio } as React.CSSProperties}
            >
              <img
                ref={bindImageRef(index)}
                src={image}
                alt={`${projectTitle} production still ${index + 1}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                onLoad={(event) => handleLoad(index, event)}
                onError={(event) => {
                  const target = event.currentTarget;
                  if (target.src !== FALLBACK_IMAGE) {
                    target.src = FALLBACK_IMAGE;
                  }
                }}
              />
            </figure>
          );
        })}
      </div>
    </section>
  );
}
