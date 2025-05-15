'use client';

import { FormEvent, useState } from 'react';

interface SyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SyncModal({ isOpen, onClose }: SyncModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Here you would typically handle the form submission to your backend
    console.log('Form submitted:', { name, email });
    
    // Show success message
    setSubmitted(true);
    
    // Reset form
    setName('');
    setEmail('');
    
    // Close modal after delay
    setTimeout(() => {
      onClose();
      // Reset submitted state after modal closes
      setTimeout(() => setSubmitted(false), 300);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay active"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
        opacity: 1,
        transition: 'opacity 0.3s ease',
        padding: '1rem',
      }}
    >
      <div 
        className="sync-modal"
        style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          width: '90%',
          maxWidth: '450px',
          padding: '2rem',
          position: 'relative',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
          transform: 'translateY(0)',
          transition: 'transform 0.4s ease',
        }}
      >
        <button 
          className="close-btn"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '20px',
            fontSize: '2.4rem',
            color: '#aaa',
            background: 'none',
            border: 'none',
            fontWeight: 700,
            transition: 'color 0.2s',
            zIndex: 2100,
            cursor: 'pointer',
          }}
        >
          &times;
        </button>
        <h2 style={{ 
          fontSize: '2.4rem', 
          marginBottom: '1.75rem', 
          color: 'black', 
          fontWeight: 700 
        }}>
          Stay In Sync
        </h2>
        
        {submitted ? (
          <div className="form-message" style={{ 
            marginTop: '1.75rem', 
            textAlign: 'center', 
            fontSize: '1.2rem', 
            lineHeight: 1.5, 
            color: 'black', 
            fontWeight: 700 
          }}>
            Thank you!<br />
            <span style={{ color: '#ed2939', fontWeight: 700 }}>Your subscription was successful.</span>
          </div>
        ) : (
          <form id="syncForm" onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input 
                type="text" 
                id="name" 
                className="form-control" 
                placeholder="Name" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '15px 22px',
                  border: '1px solid #ddd',
                  borderRadius: '100px',
                  fontFamily: 'inherit',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
              />
            </div>
            <div className="form-group mb-3">
              <input 
                type="email" 
                id="email" 
                className="form-control" 
                placeholder="Email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '15px 22px',
                  border: '1px solid #ddd',
                  borderRadius: '100px',
                  fontFamily: 'inherit',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
              />
            </div>
            <button 
              type="submit" 
              className="submit-btn"
              style={{
                backgroundColor: 'black',
                color: 'white',
                border: 'none',
                padding: '15px 25px',
                borderRadius: '100px',
                fontFamily: 'inherit',
                fontSize: '1.2rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'background-color 0.2s, transform 0.2s',
                width: '100%',
                marginTop: '0.75rem',
              }}
            >
              Submit
            </button>
          </form>
        )}
        
        <div className="form-message" style={{ 
          marginTop: '1.75rem', 
          textAlign: 'center', 
          fontSize: '1.2rem', 
          lineHeight: 1.5, 
          color: 'black', 
          fontWeight: 700 
        }}>
          You'll be the first to know.<br />
          <span style={{ color: '#ed2939', fontWeight: 700 }}>No noise. Just the signal.</span>
        </div>
      </div>
    </div>
  );
} 