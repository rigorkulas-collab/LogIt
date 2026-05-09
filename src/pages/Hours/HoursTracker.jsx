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
  const [weeklyStats, setWeeklyStats] = useState([
    { label: 'Mon', value: 0 },
    { label: 'Tue', value: 0 },
    { label: 'Wed', value: 0 },
    { label: 'Thu', value: 0 },
    { label: 'Fri', value: 0 },
    { label: 'Sat', value: 0 },
    { label: 'Sun', value: 0 }
  ]);

  const calculateWeeklyData = (logs) => {
    const now = new Date();
    const currentDay = now.getDay();
    const diff = now.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
    const monday = new Date(now.setDate(diff));
    monday.setHours(0, 0, 0, 0);

    const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const stats = weekLabels.map(label => ({ label, value: 0 }));

    logs.forEach(log => {
      const logDate = new Date(log.date);
      if (logDate >= monday) {
        const dayIdx = logDate.getDay();
        const targetIdx = dayIdx === 0 ? 6 : dayIdx - 1;
        if (targetIdx >= 0 && targetIdx < 7) {
          stats[targetIdx].value += Number(log.hours) || 0;
        }
      }
    });
    return stats;
  };

  useEffect(() => {
    const fetchData = async () => {
      const pData = await logService.getProgressData(profileData?.requiredHrs || 300);
      setProgress(pData);
      
      const allLogs = await logService.getAllLogs();
      const uniqueDates = new Set(allLogs.map(log => log.date));
      setDaysLogged(uniqueDates.size);
      
      const stats = calculateWeeklyData(allLogs);
      setWeeklyStats(stats);
    };
    fetchData();
  }, [profileData]);

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
          <BarChart data={weeklyStats} />
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
