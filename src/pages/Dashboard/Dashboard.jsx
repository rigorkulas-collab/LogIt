import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import CircularProgress from '../../components/Dashboard/CircularProgress';
import LogCard from '../../components/Dashboard/LogCard';
import BottomNav from '../../components/Dashboard/BottomNav';
import logService from '../../services/logService';
import './Dashboard.css';

/**
 * Dashboard Page Component
 * The main hub of the application showing progress and recent logs.
 */
const Dashboard = ({ user, profileData, onTabChange, onFabClick }) => {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(null);
  const [activeTab, setActiveTab] = useState('home');

  const getInitials = (name) => {
    if (!name) return "JD";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    onTabChange(tabId);
  };

  const fetchData = async () => {
    const logsData = await logService.getRecentLogs();
    const progressData = await logService.getProgressData(profileData?.requiredHrs || 300);
    setLogs(logsData);
    setProgress(progressData);
  };

  useEffect(() => {
    fetchData();
  }, [profileData]);

  if (!profileData) {
    return <div className="dashboard-page loading-screen">Loading your OJT hub...</div>;
  }

  return (
    <div className="dashboard-page">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-top">
          <h1 className="header-brand">LogIt</h1>
          <div className="user-avatar">
            {profileData?.avatarUrl ? (
              <img src={profileData.avatarUrl} alt="Avatar" className="avatar-img-small" />
            ) : (
              <span>{getInitials(profileData?.name || profileData?.fullName)}</span>
            )}
          </div>
        </div>
        
        <div className="welcome-section">
          <p className="greeting">Good morning 👋</p>
          <h2 className="user-name">{profileData?.name || profileData?.fullName || 'OJT Student'}</h2>
        </div>
      </header>

      {/* Progress Card */}
      <section className="stats-container">
        <div className="progress-card">
          <div className="progress-visual">
            <CircularProgress percentage={progress?.percentage || 0} />
          </div>
          <div className="progress-info">
            <h3 className="stats-title">OJT Progress</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Rendered:</span>
                <span className="stat-value">{progress?.rendered || 0} hrs</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Required:</span>
                <span className="stat-value">{progress?.required || 0} hrs</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Remaining:</span>
                <span className="stat-value">{progress?.remaining || 0} hrs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Logs Section */}
      <section className="logs-section">
        <div className="section-header">
          <h3 className="section-title">Recent Logs</h3>
          <button className="text-link" onClick={() => onTabChange('logs')}>See all</button>
        </div>
        
        <div className="logs-list">
          {logs.map(log => (
            <LogCard key={log.id} log={log} />
          ))}
        </div>
      </section>

      {/* Navigation */}
      <BottomNav 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        onFabClick={onFabClick}
      />
    </div>
  );
};

export default Dashboard;
