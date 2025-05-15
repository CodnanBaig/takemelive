'use client';

import {  useRef } from 'react';

interface LiquidButtonProps {
  onClick: () => void;
  text: string;
}

export default function LiquidButton({ onClick, text }: LiquidButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  
  return (
    <div 
      className="liquid-btn-container"
      style={{
        position: 'fixed',
        bottom: '3rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
      }}
    >
      <button 
        ref={btnRef}
        id="case-btn" 
        className="btn button button--4"
        onClick={onClick}
        style={{
          zIndex: 20,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          transition: 'all 0.35s',
          animation: 'btn-pulse 1.5s infinite cubic-bezier(0.66, 0, 0, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          id="svg-filter"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="svg-filters"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
          }}
        >
          <defs>
            <filter id="filter-goo-4">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="7"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="goo"
              />
            </filter>
          </defs>
        </svg>
        <div 
          className="btn-text"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            position: 'relative',
            zIndex: 30,
          }}
        >
          <p style={{
            color: 'white',
            fontFamily: 'inherit',
            fontSize: '0.85rem',
            fontWeight: 700,
            margin: 0,
            transition: 'color 0.3s, transform 0.2s',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
          }}>
            {text}
          </p>
        </div>
        <span 
          className="button__bg" 
          style={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '70px',
            height: '70px',
            padding: 0,
            borderRadius: '50%',
            transform: 'translateX(-50%) translateY(-50%) translateZ(0)',
            background: 'none',
            zIndex: -2,
            transition: 'all 0.1s ease-out',
            filter: 'url(#filter-goo-4)',
          }}
        >
          <span 
            className="blob"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: 'auto',
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: '#ed2939',
              transition: 'background 1s ease-out',
              zIndex: -1,
              pointerEvents: 'none',
              transform: 'translate(0, 0)',
            }}
          ></span>
        </span>
      </button>
      <style jsx>{`
        @keyframes btn-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(237, 41, 57, 0.7);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(237, 41, 57, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(237, 41, 57, 0);
          }
        }
        
        .btn:hover .btn-text p {
          color: white;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
} 