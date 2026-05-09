import React from 'react';

/**
 * Log Card Component for displaying individual log entries
 */
const LogCard = ({ log }) => {
  const { day, month, title, startTime, endTime, hours, status } = log;

  const formatTime = (timeStr) => {
    if (!timeStr) return "---";
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  return (
    <div className="log-card">
      <div className="log-date-badge">
        <span className="date-day">{day}</span>
        <span className="date-month">{month}</span>
      </div>
      
      <div className="log-details">
        <h3 className="log-title">{title}</h3>
        <p className="log-time-info">
          {formatTime(startTime)} – {formatTime(endTime)} • {hours} hrs
        </p>
      </div>

      <div className={`log-status-badge status-${status.toLowerCase()}`}>
        {status}
      </div>
    </div>
  );
};

export default LogCard;
