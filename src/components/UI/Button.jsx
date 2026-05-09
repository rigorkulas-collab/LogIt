import React from 'react';
import './UI.css';

/**
 * Reusable Button Component
 */
const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled = false, className = "", loading = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn btn-${variant} ${className} ${loading ? 'btn-loading' : ''}`}
    >
      {loading ? (
        <span className="button-spinner"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
