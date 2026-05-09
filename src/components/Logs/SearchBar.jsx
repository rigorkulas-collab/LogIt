import React from 'react';
import { Search } from 'lucide-react';

/**
 * Search Bar component for the Log History page
 */
const SearchBar = ({ value, onChange, placeholder = "Search logs..." }) => {
  return (
    <div className="search-bar-wrapper">
      <Search className="search-icon" size={18} />
      <input
        type="text"
        className="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
