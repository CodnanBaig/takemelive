import Image from 'next/image';
import Hero from '@/components/home/Hero';
import Transition from '@/components/home/Transition';
import WhatWeDo from '@/components/home/WhatWeDo';
import EventGallery from '@/components/home/EventGallery';
import LogoThemeSync from '@/components/home/LogoThemeSync';
import WhoWeAre from '@/components/home/WhoWeAre';
import WhyUs from '@/components/home/WhyUs';
import HowItWorks from '@/components/home/HowItWorks';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Services from '@/components/home/Services';
import Team from '@/components/home/Team';
import CTA from '@/components/home/CTA';
import Footer from '@/components/home/Footer';
import HomeSplineSection from '@/components/home/HomeSplineSection';
import HomeScrollScenes from '@/components/home/HomeScrollScenes';
import CinematicAtmosphere from '@/components/cinematic/CinematicAtmosphere';
import SceneBridge from '@/components/cinematic/SceneBridge';
import SceneRail from '@/components/cinematic/SceneRail';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <HomeScrollScenes />
      <CinematicAtmosphere />
      <LogoThemeSync />
      <SceneRail />

      <div className={styles.logoContainer}>
        <Image
          src="/assets/ImageToStl.com_TML-primary-logo.png"
          alt="Take Me Live Logo"
          className={styles.logo}
          width={220}
          height={64}
          style={{ height: 'auto' }}
          priority
        />
      </div>

      <div className={styles.sceneGroup} data-scene="arrival" id="scene-arrival">
        <Hero />
      </div>

      <div className={styles.sceneGroup} data-scene="manifesto" id="scene-manifesto">
        <Transition />
        <SceneBridge id="manifesto-bridge" />
        <WhatWeDo />
      </div>

      <div className={styles.sceneGroup} data-scene="projects" id="scene-projects">
        <FeaturedProjects />
      </div>

      <div className={styles.sceneGroup} data-scene="scale" id="scene-scale">
        <EventGallery />
        <SceneBridge id="scale-bridge" />
        <WhoWeAre />
      </div>

      <div className={styles.sceneGroup} data-scene="innovation" id="scene-innovation">
        <WhyUs />
        <HowItWorks />
        <Services />
      </div>

      <div className={styles.sceneGroup} data-scene="showreel" id="scene-showreel">
        <Team />
      </div>

      <div className={styles.sceneGroup} data-scene="contact" id="scene-contact">
        <CTA />
        <Footer />
        <HomeSplineSection />
      </div>
    </main>
  );
}
