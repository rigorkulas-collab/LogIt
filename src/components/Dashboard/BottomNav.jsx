import React from 'react';
import { Home, ClipboardList, Clock, User, Plus } from 'lucide-react';

/**
 * Bottom Navigation and Floating Action Button component
 */
const BottomNav = ({ activeTab = 'home', onTabChange, onFabClick }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'logs', icon: ClipboardList, label: 'Logs' },
    { id: 'hours', icon: Clock, label: 'Hours' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <>
      {/* Floating Action Button */}
      <button 
        className="fab-button" 
        aria-label="Add new log"
        onClick={onFabClick}
      >
        <Plus size={32} />
      </button>

      {/* Bottom Navigation Bar */}
      <nav className="bottom-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <tab.icon size={24} />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default BottomNav;
