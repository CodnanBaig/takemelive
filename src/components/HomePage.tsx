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

  // Check if we're on the client-side before using window
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Add a useEffect to log state changes for debugging
  useEffect(() => {
    console.log('isRevealed:', isRevealed);
    console.log('isMobile:', isMobile);
  }, [isRevealed, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      if (hiddenContentRef.current) {
        hiddenContentRef.current.style.setProperty('--x', `${e.clientX}px`);
        hiddenContentRef.current.style.setProperty('--y', `${e.clientY}px`);
      }
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  const toggleTextReveal = () => {
    setIsRevealed(prev => !prev);
    
    const hiddenContent = hiddenContentRef.current;
    const content = contentRef.current;
    
    if (!hiddenContent || !content) return;
    
    // The animation will differ based on screen size
    if (window.innerWidth < 768) {
      // Mobile: Simple toggle between the two content blocks with animation
      if (!isRevealed) { // Note: using !isRevealed because state hasn't updated yet
        // Instead of hiding the main content completely, just hide specific elements
        hiddenContent.style.display = 'block';
        hiddenContent.style.opacity = '1';
        hiddenContent.style.visibility = 'visible';
      } else {
        // Animate out hidden content
        hiddenContent.style.opacity = '0';
        hiddenContent.style.visibility = 'hidden';
        hiddenContent.style.display = 'none';
      }
    } else {
      // Desktop: Show/hide approach with cross-fade
      if (!isRevealed) { // Note: using !isRevealed because state hasn't updated yet
        // Fade in the hidden content while keeping main content visible but faded
        hiddenContent.classList.remove("d-none");
        hiddenContent.style.display = 'flex';
        hiddenContent.style.opacity = '1';
        hiddenContent.style.visibility = 'visible';
        
        // Fade the main content but keep it visible
        content.style.opacity = '0.3';
      } else {
        // Fade out hidden content
        hiddenContent.style.opacity = '0';
        hiddenContent.style.visibility = 'hidden';
        hiddenContent.classList.add("d-none");
        hiddenContent.style.display = 'none';
        
        // Restore main content
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

  const handleTextHover = () => {
    setIsHovering(true);
    if (hiddenContentRef.current) {
      hiddenContentRef.current.style.opacity = '1';
      hiddenContentRef.current.style.visibility = 'visible';
    }
  };

  const handleTextLeave = () => {
    setIsHovering(false);
    if (hiddenContentRef.current) {
      hiddenContentRef.current.style.opacity = '0';
      hiddenContentRef.current.style.visibility = 'hidden';
    }
  };

  return (
    <>
      {/* Cursor element - placed outside any container at root level */}
      <div 
        ref={cursorRef} 
        className="cursor" 
        style={{ 
          opacity: isMobile ? '0' : '1', 
          display: isMobile ? 'none' : 'block',
          pointerEvents: 'none',
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`
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
            
            {/* Logo */}
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
            
            {/* Visible Content */}
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

              {/* Hidden Content (for desktop, mask reveal) */}
              <div 
                ref={hiddenContentRef} 
                className={`${styles['hidden-content']} ${isRevealed && isMobile ? 'd-block' : 'd-none'}`}
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
                  ...(isMobile ? {} : {
                    '--x': `${cursorPosition.x}px`,
                    '--y': `${cursorPosition.y}px`,
                    '--size': isHovering ? '250px' : '5px',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    maskImage: 'radial-gradient(circle at var(--x) var(--y), black var(--size), transparent 0)',
                    WebkitMaskImage: 'radial-gradient(circle at var(--x) var(--y), black var(--size), transparent 0)',
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
                <p className={styles['hidden-subtitle']} style={{ color: 'white' }}>
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
        
        {/* Cities Footer */}
        <div className="row w-md-100">
          <div className={`col-12 text-center ${styles['city-section']}`}>
            <div className={styles.cities}>
              <CityWithTooltip coords="25.2048° N, 55.2708° E">DUBAI |</CityWithTooltip>
              <CityWithTooltip coords="24.7136° N, 46.6753° E">RIYADH |</CityWithTooltip>
              <CityWithTooltip coords="34.0549° N, 118.2426° W">LOS ANGELES</CityWithTooltip>
            </div>
          </div>
        </div>

        {/* Liquid Button (only on mobile) */}
        {isMobile && (
          <LiquidButton onClick={toggleTextReveal} text={isRevealed ? "Go Back" : "Click Me"} />
        )}

        {/* Stay In Sync Modal */}
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