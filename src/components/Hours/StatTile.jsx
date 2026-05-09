import React from 'react';

/**
 * Reusable Stat Tile for the Hours Tracker grid
 */
const StatTile = ({ value, label, className = "" }) => {
  return (
    <div className={`stat-tile ${className}`}>
      <span className="stat-tile-value">{value}</span>
      <span className="stat-tile-label">{label}</span>
    </div>
  );
};

export default StatTile;
