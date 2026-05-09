import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import BackButton from '../../components/UI/BackButton';
import CircularProgress from '../../components/Dashboard/CircularProgress';
import StatTile from '../../components/Hours/StatTile';
import BarChart from '../../components/Hours/BarChart';
import BottomNav from '../../components/Dashboard/BottomNav';
import logService from '../../services/logService';
import './HoursTracker.css';

const HoursTracker = ({ onBack, onTabChange, onFabClick, profileData }) => {
  const [progress, setProgress] = useState(null);
  const [daysLogged, setDaysLogged] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const pData = await logService.getProgressData(profileData?.requiredHrs || 300);
      setProgress(pData);
      
      const allLogs = await logService.getAllLogs();
      const uniqueDates = new Set(allLogs.map(log => log.date));
      setDaysLogged(uniqueDates.size);
    };
    fetchData();
  }, [profileData]);

  const weeklyData = [
    { label: 'Mon', value: 8 },
    { label: 'Tue', value: 8 },
    { label: 'Wed', value: 8 },
    { label: 'Thu', value: 8 },
    { label: 'Fri', value: 6 },
    { label: 'Sat', value: 0 },
    { label: 'Sun', value: 0 }
  ];

  return (
    <div className="hours-page">
      {/* Header */}
      <header className="hours-header">
        <BackButton onClick={onBack} />
        <h1 className="hours-title">Hours Tracker</h1>
      </header>

      <div className="hours-content">
        {/* ... existing sections ... */}
        <section className="hero-progress-card">
          <CircularProgress 
            percentage={progress?.percentage || 0} 
            size={180} 
            strokeWidth={12} 
            color="var(--primary-deep)"
            bgColor="#F3F4F6"
          />
          <div className="hero-progress-labels">
            <span className="hero-percentage">{progress?.percentage || 0}%</span>
            <span className="hero-label">OJT Completion</span>
          </div>
        </section>

        <section className="stats-tile-grid">
          <StatTile value={progress?.rendered || "0"} label="Hours Rendered" />
          <StatTile value={daysLogged.toString()} label="Days Logged" />
          <StatTile value={progress?.remaining || "0"} label="Hours Left" />
        </section>

        <section className="chart-section-card">
          <div className="chart-header">
            <span className="chart-icon">📊</span>
            <h3 className="chart-title">This Week</h3>
          </div>
          <BarChart data={weeklyData} />
        </section>

        <section className="estimated-card">
          <div className="calendar-icon-bg">
            <Calendar size={24} color="white" />
          </div>
          <div className="estimated-info">
            <span className="estimated-label">Estimated Completion</span>
            <span className="estimated-date">May 15, 2026</span>
          </div>
        </section>
      </div>

      <BottomNav 
        activeTab="hours" 
        onTabChange={onTabChange} 
        onFabClick={onFabClick}
      />
    </div>
  );
};

export default HoursTracker;
