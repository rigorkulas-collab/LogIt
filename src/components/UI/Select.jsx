import React from 'react';
import { ChevronDown } from 'lucide-react';
import './UI.css';

/**
 * Reusable Select Component
 */
const Select = ({ label, options = [], value, onChange, placeholder, name, id, required = false, className = "" }) => {
  const selectId = id || name || `select-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={`input-group ${className}`}>
      {label && <label htmlFor={selectId} className="input-label">{label}</label>}
      <div className="input-wrapper">
        <select
          id={selectId}
          name={name || selectId}
          value={value}
          onChange={onChange}
          required={required}
          className="form-input custom-select"
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="select-icon">
          <ChevronDown size={20} />
        </div>
      </div>
    </div>
  );
};

export default Select;
