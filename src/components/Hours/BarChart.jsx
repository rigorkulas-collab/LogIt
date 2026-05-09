import React from 'react';

/**
 * Weekly Bar Chart component for displaying daily activity
 */
const BarChart = ({ data = [] }) => {
  // Assume max hours in a day is 8 for scaling, unless data exceeds it
  const maxVal = Math.max(...data.map(d => d.value), 8);

  return (
    <div className="bar-chart">
      {data.map((day, index) => (
        <div key={index} className="bar-column">
          <div className="bar-wrapper">
            <div 
              className="bar-fill" 
              style={{ 
                height: day.value > 0 ? `${(day.value / maxVal) * 100}%` : '0%',
                opacity: day.value > 0 ? 1 : 0.1
              }}
            />
          </div>
          <span className="bar-label">{day.label}</span>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
