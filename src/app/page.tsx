'use client'

import styles from './page.module.scss'
import { useState, useEffect } from 'react';  
import { motion } from 'framer-motion';
import useMousePosition from './utils/useMousePosition';

export default function Home() {

  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTextRevealed, setIsTextRevealed] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 100;

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Debug logging
  useEffect(() => {
    console.log('Mouse position:', { x, y, size, isHovered, isMobile });
  }, [x, y, size, isHovered, isMobile]);

  return (
    <main className={styles.main} style={{
      backgroundColor: isMobile && isTextRevealed ? 'white' : 'black',
      transition: 'background-color 0.8s ease'
    }}>
      <div className={styles.logoContainer}>
        <img 
          src="/assets/ImageToStl.com_TML-primary-logo.png" 
          alt="Take Me Live Logo" 
          className={styles.logo}
          style={{
            filter: isMobile && isTextRevealed ? 'brightness(1) invert(0)' : 'brightness(0) invert(1)',
            transition: 'filter 0.8s ease'
          }}
        />
      </div>
      
      {!isMobile ? (
        // Desktop version with cursor mask
        <motion.div 
          className={styles.mask}
          style={{
            maskPosition: `${(x || 0) - (size/2)}px ${(y || 0) - (size/2)}px`,
            maskSize: `${size}px`,
            WebkitMaskPosition: `${(x || 0) - (size/2)}px ${(y || 0) - (size/2)}px`,
            WebkitMaskSize: `${size}px`,
          }}
          animate={{
            maskPosition: `${(x || 0) - (size/2)}px ${(y || 0) - (size/2)}px`,
            maskSize: `${size}px`,
            WebkitMaskPosition: `${(x || 0) - (size/2)}px ${(y || 0) - (size/2)}px`,
            WebkitMaskSize: `${size}px`,
          } as any}
          transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        >
            <h1 className='text-center' onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}} style={{fontSize: '8rem', lineHeight: '0.9', color: 'black'}}>
              STAY <br />TUNED <br /><p className='text-center' style={{fontSize: '60px', color: 'black'}}>THE <br /> TRUTH'S IN <br />THE SHADOWS</p>
            </h1>
        </motion.div>
      ) : (
        // Mobile version with touch animation
        <motion.div 
          className={styles.mobileMask}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className='text-center' 
            style={{fontSize: '8rem', lineHeight: '0.9', color: isTextRevealed ? 'black' : 'white'}}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ 
              opacity: isTextRevealed ? 1 : 0, 
              y: isTextRevealed ? 0 : 30, 
              scale: isTextRevealed ? 1 : 0.9 
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            STAY <br />TUNED <br />
            <p className='text-center' style={{fontSize: '60px', color: isTextRevealed ? 'black' : 'white'}}>
              THE <br /> TRUTH'S IN <br />THE SHADOWS
            </p>
          </motion.h1>
        </motion.div>
      )}

      {isMobile && (
        <motion.div 
          className={styles.clickMePill}
        >
          <motion.button
            className={styles.clickMePillButton}
            onClick={() => setIsTextRevealed(!isTextRevealed)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              color: isTextRevealed ? 'black' : 'white',
              transition: 'all 0.8s ease'
            }}
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <span>Tap</span>
          </motion.button>
        </motion.div>
      )}

      <div className={styles.body}>
        <h1 style={{fontSize: '8rem', lineHeight: '0.9'}} className='text-center'>COMING <br />SOON <br /><p className='text-center' style={{fontSize: '60px', lineHeight: '0.9', color: 'white'}}>THE LIGHT <br /> DREW YOU <br />IN</p></h1>
      </div>

      <div className={styles.connectSection}>
        <button 
          className={styles.connectButton}
          onClick={() => setIsModalOpen(true)}
          style={{
            borderColor: isMobile && isTextRevealed ? 'black' : 'white',
            color: isMobile && isTextRevealed ? 'black' : 'white',
            transition: 'all 0.8s ease'
          }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLButtonElement;
            if (isMobile && isTextRevealed) {
              target.style.background = 'black';
              target.style.color = 'white';
            } else {
              target.style.background = 'white';
              target.style.color = 'black';
            }
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLButtonElement;
            if (isMobile && isTextRevealed) {
              target.style.background = 'transparent';
              target.style.color = 'black';
            } else {
              target.style.background = 'transparent';
              target.style.color = 'white';
            }
          }}
        >
          Let's Connect
        </button>
      </div>

      <div className={styles.cities}>
        <span style={{
          color: isMobile && isTextRevealed ? 'black' : 'white',
          transition: 'color 0.8s ease'
        }}>DUBAI</span>
        <span className={styles.separator} style={{
          color: isMobile && isTextRevealed ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
          transition: 'color 0.8s ease'
        }}>|</span>
        <span style={{
          color: isMobile && isTextRevealed ? 'black' : 'white',
          transition: 'color 0.8s ease'
        }}>RIYADH</span>
        <span className={styles.separator} style={{
          color: isMobile && isTextRevealed ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
          transition: 'color 0.8s ease'
        }}>|</span>
        <span style={{
          color: isMobile && isTextRevealed ? 'black' : 'white',
          transition: 'color 0.8s ease'
        }}>LOS ANGELES</span>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.closeButton}
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <h2>Let's Connect</h2>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

    </main>
  )
} 