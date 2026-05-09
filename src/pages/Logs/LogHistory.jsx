import React, { useState, useEffect } from 'react';
import BackButton from '../../components/UI/BackButton';
import SearchBar from '../../components/Logs/SearchBar';
import HistoryLogCard from '../../components/Logs/HistoryLogCard';
import BottomNav from '../../components/Dashboard/BottomNav';
import logService from '../../services/logService';
import './LogHistory.css';

/**
 * Log History Page Component
 * Shows a searchable, filterable list of all logged hours.
 */
const LogHistory = ({ onBack, onTabChange, onFabClick }) => {
  const [logs, setLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Pending', 'Approved', 'Rejected'];

  useEffect(() => {
    const fetchLogs = async () => {
      const data = await logService.getAllLogs();
      setLogs(data);
    };
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || log.status.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="history-page">
      {/* Header */}
      <header className="history-header">
        <div className="header-top-row">
          <BackButton onClick={onBack} />
          <h1 className="history-page-title">Log History</h1>
        </div>

        {/* Search */}
        <div className="search-section">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Filters */}
        <div className="filters-tab-bar">
          {filters.map(filter => (
            <button
              key={filter}
              className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      {/* Logs List */}
      <div className="history-list-container">
        {filteredLogs.length > 0 ? (
          <div className="history-list">
            {filteredLogs.map(log => (
              <HistoryLogCard key={log.id} log={log} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-icon">📂</span>
            <p className="empty-text">No logs found matching your criteria</p>
          </div>
        )}
      </div>

      <BottomNav 
        activeTab="logs" 
        onTabChange={onTabChange} 
        onFabClick={onFabClick}
      />
    </div>
  );
};

export default LogHistory;
