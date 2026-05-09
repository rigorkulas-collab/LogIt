import React from 'react';

/**
 * Log Card Component for displaying individual log entries
 */
const LogCard = ({ log }) => {
  const { day, month, title, time, hours, status } = log;

  return (
    <div className="log-card">
      <div className="log-date-badge">
        <span className="date-day">{day}</span>
        <span className="date-month">{month}</span>
      </div>
      
      <div className="log-details">
        <h3 className="log-title">{title}</h3>
        <p className="log-time-info">{time} • {hours} hrs</p>
      </div>

      <div className={`log-status-badge status-${status.toLowerCase()}`}>
        {status}
      </div>
    </div>
  );
};

export default LogCard;
