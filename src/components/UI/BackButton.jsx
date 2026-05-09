import React from 'react';
import { ArrowLeft } from 'lucide-react';
import './UI.css';

/**
 * Reusable Circular Back Button Component
 */
const BackButton = ({ onClick, className = "" }) => {
  return (
    <button 
      type="button"
      className={`back-btn-circle ${className}`} 
      onClick={onClick}
      aria-label="Go back"
    >
      <ArrowLeft size={20} />
    </button>
  );
};

export default BackButton;
