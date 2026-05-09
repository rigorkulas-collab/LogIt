import React from 'react';
import logoUrl from '../../assets/logo.svg';

/**
 * LogIt Brand Logo Component
 * Using the SVG file directly as requested.
 */
export const LogoIcon = ({ size = 120, className = "" }) => {
  return (
    <div className={`flex-center ${className}`} style={{ width: size, height: size }}>
      <img 
        src={logoUrl} 
        alt="LogIt Logo" 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'contain'
        }} 
      />
    </div>
  );
};

export default LogoIcon;
