import React from 'react';
import ProfileRow from '../../components/Profile/ProfileRow';
import BottomNav from '../../components/Dashboard/BottomNav';
import './Profile.css';

/**
 * Profile Page Component
 * Shows user details, school/company info, and account actions.
 */
const Profile = ({ user, profileData, onLogout, onTabChange, onFabClick, onEdit }) => {
  const getInitials = (name) => {
    if (!name) return "JD";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "---";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="profile-page">
      {/* Hero Header */}
      <header className="profile-header">
        <div className="profile-avatar-large">
          {getInitials(user?.name)}
        </div>
        <h1 className="profile-user-name">{user?.name || "Juan dela Cruz"}</h1>
        <p className="profile-user-subtitle">OJT Student • Batch {profileData.batch}</p>
      </header>

      <div className="profile-content">
        {/* Institutional Info Card */}
        <div className="profile-info-card">
          <ProfileRow label="School" value={profileData.school} />
          <ProfileRow label="Company" value={profileData.company} />
          <ProfileRow label="Position" value={profileData.position} />
          <ProfileRow label="Email" value={user?.email || "juan@email.com"} />
        </div>

        {/* OJT Progress Card */}
        <div className="profile-info-card">
          <ProfileRow label="Required Hrs" value={`${profileData.requiredHrs} hours`} />
          <ProfileRow label="Supervisor" value={profileData.supervisor} />
          <ProfileRow label="Start Date" value={formatDate(profileData.startDate)} />
        </div>

        {/* Actions */}
        <div className="profile-actions">
          <button 
            className="btn btn-primary profile-btn"
            onClick={onEdit}
          >
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
