'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SyncModal from './SyncModal';
import LiquidButton from './LiquidButton';
import styles from './HomePage.module.css';

export default function HomePage() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const hiddenContentRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [spotlightSize, setSpotlightSize] = useState(5);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      setCursorPosition({ x, y });
      
      if (hiddenContentRef.current) {
        hiddenContentRef.current.style.setProperty('--x', `${x}px`);
        hiddenContentRef.current.style.setProperty('--y', `${y}px`);
        hiddenContentRef.current.style.setProperty('--size', `${spotlightSize}px`);
      }
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, spotlightSize]);

  const handleTextHover = () => {
    setIsHovering(true);
    setSpotlightSize(250);
    if (hiddenContentRef.current) {
      hiddenContentRef.current.style.opacity = '1';
      hiddenContentRef.current.style.visibility = 'visible';
      hiddenContentRef.current.style.display = 'flex';
    }
  };

  const handleTextLeave = () => {
    setIsHovering(false);
    setSpotlightSize(5);
    if (hiddenContentRef.current) {
      hiddenContentRef.current.style.opacity = '0';
      hiddenContentRef.current.style.visibility = 'hidden';
      hiddenContentRef.current.style.display = 'none';
    }
  };

  const toggleTextReveal = () => {
    setIsRevealed(prev => !prev);
    
    const hiddenContent = hiddenContentRef.current;
    const content = contentRef.current;
    
    if (!hiddenContent || !content) return;
    
    if (window.innerWidth < 768) {
      if (!isRevealed) {
        hiddenContent.style.display = 'block';
        hiddenContent.style.opacity = '1';
        hiddenContent.style.visibility = 'visible';
      } else {
        hiddenContent.style.opacity = '0';
        hiddenContent.style.visibility = 'hidden';
        hiddenContent.style.display = 'none';
      }
    } else {
      if (!isRevealed) {
        hiddenContent.classList.remove("d-none");
        hiddenContent.style.display = 'flex';
        hiddenContent.style.opacity = '1';
        hiddenContent.style.visibility = 'visible';
        content.style.opacity = '0.3';
      } else {
        hiddenContent.style.opacity = '0';
        hiddenContent.style.visibility = 'hidden';
        hiddenContent.classList.add("d-none");
        hiddenContent.style.display = 'none';
        content.style.opacity = '1';
      }
    }
  };

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <div 
        ref={cursorRef} 
        className="cursor" 
        style={{ 
          opacity: isMobile ? '0' : '1', 
          display: isMobile ? 'none' : 'block',
          pointerEvents: 'none',
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
          transition: 'width 0.3s, height 0.3s, transform 0.1s'
        }}
      ></div>
      
      <div 
        className="container-fluid d-flex flex-column min-vh-100"
        style={{
          background: "url('/assets/background.gif')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          cursor: isMobile ? 'auto' : 'none',
        }}
      >
        <div className="row justify-content-center w-md-100 flex-grow-1">
          <div className="col-12 col-md-10 col-lg-8 text-center d-flex flex-column">
            
            <div className="logo-container mt-3 mt-md-4">
              <Image
                src="/assets/ImageToStl.com_TML-primary-logo.png"
                alt="Take Me Live Logo"
                className={`${styles.logo} logo img-fluid`}
                width={200}
                height={60}
                priority
                style={{ cursor: isMobile ? 'auto' : 'none' }}
              />
            </div>
            
            <div ref={contentRef} className={styles.content}>
              <div 
                className="revealed-content" 
                style={{ display: isRevealed && isMobile ? 'none' : 'block' }}
                onMouseEnter={!isMobile ? handleTextHover : undefined}
                onMouseLeave={!isMobile ? handleTextLeave : undefined}
              >
                <h1 className="display-4 fw-bold">COMING SOON</h1>
                <p className={styles.subtitle}>
                  You&apos;ve seen the hype,<br />Now wait till you see the site.
                </p>
              </div>

              <div 
                ref={hiddenContentRef} 
                className={`${styles['hidden-content']} ${isRevealed && isMobile ? 'd-block' : ''}`}
                style={{
                  position: isMobile ? 'relative' : 'fixed',
                  width: isMobile ? '100%' : '100vw',
                  height: isMobile ? 'auto' : '100vh',
                  background: isMobile ? 'transparent' : '#d0df59',
                  color: '#121212',
                  pointerEvents: isMobile ? 'auto' : 'none',
                  zIndex: 100,
                  opacity: (isMobile && isRevealed) ? 1 : 0,
                  visibility: (isMobile && isRevealed) ? 'visible' : 'hidden',
                  display: isRevealed && isMobile ? 'block' : 'none',
                  textAlign: 'center',
                  marginBottom: isMobile ? '2rem' : '0',
                  transition: 'opacity 0.3s ease',
                  ...(isMobile ? {} : {
                    '--x': `${cursorPosition.x}px`,
                    '--y': `${cursorPosition.y}px`,
                    '--size': `${spotlightSize}px`,
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    maskImage: 'radial-gradient(circle at var(--x) var(--y), black var(--size), transparent calc(var(--size) + 50px))',
                    WebkitMaskImage: 'radial-gradient(circle at var(--x) var(--y), black var(--size), transparent calc(var(--size) + 50px))',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                  })
                } as React.CSSProperties}
                onMouseEnter={!isMobile ? handleTextHover : undefined}
                onMouseLeave={!isMobile ? handleTextLeave : undefined}
              >
                <h1 className="display-4 fw-bold" style={{ color: '#121212' }}>ON THE VERGE OF UNFOLDING</h1>
                <p className={styles['hidden-subtitle']} style={{ color: 'white', marginBottom: "4.8rem" }}>
                  The light drew you in. <br /> The truth&apos;s in the shadow.
                </p>
              </div>

              <button 
                className={`${styles['notify-btn']} notify-btn`} 
                onClick={openModal}
                style={{ cursor: isMobile ? 'pointer' : 'none' }}
              >
                Stay In Sync
              </button>
              <div className={styles['social-links']}>
                <Link href="mailto:mg@takemelive.com" aria-label="Email" className="text-decoration-none" style={{ cursor: isMobile ? 'pointer' : 'none' }}>
                  <i className="fas fa-envelope"></i>
                </Link>
                <Link href="https://www.instagram.com/takemelive" aria-label="Instagram" className="text-decoration-none" style={{ cursor: isMobile ? 'pointer' : 'none' }}>
                  <i className="fab fa-instagram"></i>
                </Link>
                <Link
                  href="https://www.linkedin.com/company/take-me-live/?viewAsMember=true"
                  aria-label="LinkedIn"
                  className="text-decoration-none"
                  style={{ cursor: isMobile ? 'pointer' : 'none' }}
                >
                  <i className="fab fa-linkedin-in"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row w-md-100">
          <div className={`col-12 text-center ${styles['city-section']}`}>
            <div className={styles.cities}>
              <CityWithTooltip coords="25.2048° N, 55.2708° E">DUBAI |</CityWithTooltip>
              <CityWithTooltip coords="24.7136° N, 46.6753° E">RIYADH |</CityWithTooltip>
              <CityWithTooltip coords="34.0549° N, 118.2426° W">LOS ANGELES</CityWithTooltip>
            </div>
          </div>
        </div>

        {isMobile && (
          <LiquidButton onClick={toggleTextReveal} text={isRevealed ? "Go Back" : "Click Me"} />
        )}

        <SyncModal isOpen={modalOpen} onClose={closeModal} />
      </div>
    </>
  );
}

function CityWithTooltip({ children, coords }: { children: React.ReactNode, coords: string }) {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  
  return (
    <span 
      className="city" 
      data-coords={coords}
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
      style={{ position: 'relative', cursor: 'pointer', transition: 'color 0.3s', padding: '0.25rem 0', whiteSpace: 'nowrap' }}
    >
      {children}
      <div 
        className="city-tooltip" 
        style={{
          position: 'absolute',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '0.6rem 1.2rem',
          borderRadius: '4px',
          fontSize: '0.95rem',
          fontWeight: 700,
          letterSpacing: 'normal',
          whiteSpace: 'nowrap',
          opacity: tooltipVisible ? 1 : 0,
          visibility: tooltipVisible ? 'visible' : 'hidden',
          transform: `translateX(-50%) translateY(${tooltipVisible ? -10 : 10}px)`,
          transition: 'opacity 0.3s, visibility 0.3s, transform 0.3s',
          zIndex: 1000,
          bottom: '100%',
          left: '50%',
        }}
      >
        {coords}
        <div
          style={{
            content: '""',
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            borderWidth: '5px',
            borderStyle: 'solid',
            borderColor: 'rgba(0, 0, 0, 0.8) transparent transparent transparent',
          }}
        ></div>
      </div>
    </span>
  );
}