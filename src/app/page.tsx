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
import Industries from '@/components/home/Industries';
import Team from '@/components/home/Team';
import CTA from '@/components/home/CTA';
import Footer from '@/components/home/Footer';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <LogoThemeSync />
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
      <Hero />
      <Transition />
      <WhatWeDo />
      <EventGallery />
      <WhoWeAre />
      <WhyUs />
      <HowItWorks />
      <FeaturedProjects />
      <Services />
      <Industries />
      <Team />
      <CTA />
      <Footer />
    </main>
  );
}
