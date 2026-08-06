import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import CinematicAtmosphere from '@/components/cinematic/CinematicAtmosphere';
import HomeExperienceV2 from '@/components/home/HomeExperienceV2';
import Showreel from '@/components/home/Showreel';
import Team from '@/components/home/Team';
import CTA from '@/components/home/CTA';
import Footer from '@/components/home/Footer';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/seo/config';
import { websiteJsonLd } from '@/lib/seo/jsonld';
import { createPageMetadata } from '@/lib/seo/metadata';
import { getFeaturedProjects, getShowreelConfig } from '@/lib/content/store';
import styles from './page.module.scss';

export const revalidate = 60;

export const metadata: Metadata = {
  ...createPageMetadata({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    path: '/',
  }),
  title: {
    absolute: SITE_NAME,
  },
};

export default function Home() {
  const projects = getFeaturedProjects();
  const showreel = getShowreelConfig();

  return (
    <main id="main-content" className={styles.main} tabIndex={-1}>
      <JsonLd data={websiteJsonLd()} />
      <CinematicAtmosphere />

      <div className={styles.sceneGroup} data-scene="arrival" id="scene-arrival">
        <HomeExperienceV2 projects={projects} />
      </div>

      <div className={styles.sceneGroup} data-scene="showreel" id="scene-showreel">
        <Showreel showreelConfig={showreel} />
        <Team />
      </div>

      <div className={styles.sceneGroup} data-scene="contact" id="scene-contact">
        <CTA />
        <Footer projects={projects} />
      </div>
    </main>
  );
}
