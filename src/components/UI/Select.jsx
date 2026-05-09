import React from 'react';
import { ChevronDown } from 'lucide-react';
import './UI.css';

/**
 * Reusable Select Component
 */
const Select = ({ label, options = [], value, onChange, placeholder, name, required = false, className = "" }) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label className="input-label">{label}</label>}
      <div className="input-wrapper">
        <select
          name={name}
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
