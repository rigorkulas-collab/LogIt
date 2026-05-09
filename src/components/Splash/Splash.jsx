import React, { useEffect, useState } from 'react';
import LogoIcon from '../Icons/Logo';
import './Splash.css';

/**
 * Splash Screen Component
 * Simulates a loading process before transitioning to the app.
 */
const Splash = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Faster loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 25;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Shorter delays for faster exit
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 500);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <div className={`splash-screen ${isExiting ? 'splash-exit' : ''}`}>
      <div className="splash-content">
        <div className="logo-container">
          <LogoIcon size={140} />
        </div>
        
        <div className="brand-section">
          <h1 className="brand-title">LogIt</h1>
          <p className="brand-subtitle">Your OJT Journey, Digitized</p>
        </div>
      </div>

      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Splash;
