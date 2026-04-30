import DomeGallery from '@/components/dome-gallery/DomeGallery';
import styles from './page.module.scss';

const PROJECT_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=80',
    alt: 'Immersive stage build',
  },
  {
    src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1800&q=80',
    alt: 'Event environment',
  },
  {
    src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1800&q=80',
    alt: 'Large audience moment',
  },
  {
    src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1800&q=80',
    alt: 'Show lighting detail',
  },
  {
    src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1800&q=80',
    alt: 'Performance scene',
  },
  {
    src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1800&q=80',
    alt: 'Production footprint',
  },
  {
    src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1800&q=80',
    alt: 'Brand activation',
  },
];

export default function OurProjectsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.galleryShell} aria-label="Our projects dome gallery">
        <DomeGallery
          images={PROJECT_IMAGES}
          fit={0.74}
          fitBasis="max"
          minRadius={720}
          maxRadius={1600}
          segments={22}
          maxVerticalRotationDeg={8}
          dragSensitivity={26}
          autoRotateSpeed={0.08}
          openedImageWidth="360px"
          openedImageHeight="360px"
          imageBorderRadius="50%"
          openedImageBorderRadius="50%"
          grayscale={false}
        />
      </section>
    </main>
  );
}
