import React from 'react';
import { Clock } from 'lucide-react';

/**
 * Enhanced Log Card for the History Page
 */
const HistoryLogCard = ({ log }) => {
  const statusColors = {
    APPROVED: { bg: '#ECFDF5', text: '#059669' },
    PENDING: { bg: '#FFF7ED', text: '#D97706' },
    REJECTED: { bg: '#FEF2F2', text: '#DC2626' }
  };

  const style = statusColors[log.status] || statusColors.PENDING;

  return (
    <div className="history-log-card">
      <div className="history-log-header">
        <div className="history-log-info">
          <h4 className="history-log-title">{log.title}</h4>
          <span className="history-log-date">{log.date}</span>
        </div>
        <div 
          className="status-badge"
          style={{ backgroundColor: style.bg, color: style.text }}
        >
          {log.status}
        </div>
      </div>

      <div className="history-log-footer">
        <div className="tag mood-tag">
          <span className="tag-icon">{log.moodEmoji}</span>
          <span className="tag-label">{log.mood}</span>
        </div>
        <div className="tag duration-tag">
          <Clock size={14} className="tag-icon-svg" />
          <span className="tag-label">{log.hours} hrs</span>
        </div>
      </div>
    </div>
  );
};

export default HistoryLogCard;
