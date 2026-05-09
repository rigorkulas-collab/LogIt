import React, { useState, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import BackButton from '../../components/UI/BackButton';
import SearchBar from '../../components/Logs/SearchBar';
import HistoryLogCard from '../../components/Logs/HistoryLogCard';
import BottomNav from '../../components/Dashboard/BottomNav';
import Modal from '../../components/UI/Modal';
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filters = ['All', 'Pending', 'Approved', 'Rejected'];

  useEffect(() => {
    const fetchLogs = async () => {
      const data = await logService.getAllLogs();
      setLogs(data);
    };
    fetchLogs();
  }, []);

  const handleFilterSelect = (filter) => {
    setActiveFilter(filter);
    setIsFilterOpen(false);
  };

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
          <div className="title-dropdown-trigger" onClick={() => setIsFilterOpen(true)}>
            <h1 className="history-page-title">{activeFilter} Logs</h1>
            <ChevronDown size={20} className="dropdown-chevron" />
          </div>
        </div>

        {/* Search */}
        <div className="search-section">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </header>

      {/* Filter Bottom Sheet */}
      <Modal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        title="Filter Logs"
      >
        <div className="filter-options-list">
          {filters.map(filter => (
            <button
              key={filter}
              className={`filter-option-item ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => handleFilterSelect(filter)}
            >
              <span className="filter-option-label">{filter} Logs</span>
              {activeFilter === filter && <Check size={20} className="check-icon" />}
            </button>
          ))}
        </div>
      </Modal>

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
