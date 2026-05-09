import React from 'react';
import ProfileRow from '../../components/Profile/ProfileRow';
import BottomNav from '../../components/Dashboard/BottomNav';
import './Profile.css';

/**
 * Profile Page Component
 * Shows user details, school/company info, and account actions.
 */
const Profile = ({ user, onLogout, onTabChange, onFabClick }) => {
  // Mock data for the OJT specific details
  const ojtDetails = {
    school: "Far Eastern University",
    company: "Acme Corp Philippines",
    position: "UI/UX Design Intern",
    requiredHrs: "300 hours",
    supervisor: "Ms. Maria Santos",
    startDate: "Feb 1, 2026",
    batch: "2026"
  };

  const getInitials = (name) => {
    if (!name) return "JD";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="profile-page">
      {/* Hero Header */}
      <header className="profile-header">
        <div className="profile-avatar-large">
          {getInitials(user?.name)}
        </div>
        <h1 className="profile-user-name">{user?.name || "Juan dela Cruz"}</h1>
        <p className="profile-user-subtitle">OJT Student • Batch {ojtDetails.batch}</p>
      </header>

      <div className="profile-content">
        {/* Institutional Info Card */}
        <div className="profile-info-card">
          <ProfileRow label="School" value={ojtDetails.school} />
          <ProfileRow label="Company" value={ojtDetails.company} />
          <ProfileRow label="Position" value={ojtDetails.position} />
          <ProfileRow label="Email" value={user?.email || "juan@email.com"} />
        </div>

        {/* OJT Progress Card */}
        <div className="profile-info-card">
          <ProfileRow label="Required Hrs" value={ojtDetails.requiredHrs} />
          <ProfileRow label="Supervisor" value={ojtDetails.supervisor} />
          <ProfileRow label="Start Date" value={ojtDetails.startDate} />
        </div>

        {/* Actions */}
        <div className="profile-actions">
          <button className="btn btn-primary profile-btn">
            Edit Profile
          </button>
          <button 
            className="btn btn-outline-danger profile-btn"
            onClick={onLogout}
          >
            Log Out
          </button>
        </div>
      </div>

      <BottomNav 
        activeTab="profile" 
        onTabChange={onTabChange} 
        onFabClick={onFabClick}
      />
    </div>
  );
};

export default Profile;
