import React, { useRef, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../lib/firebase';
import { Camera } from 'lucide-react';
import ProfileRow from '../../components/Profile/ProfileRow';
import BottomNav from '../../components/Dashboard/BottomNav';
import './Profile.css';

const Profile = ({ user, profileData, onLogout, onTabChange, onFabClick, onEdit, onUpdate }) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const getInitials = (name) => {
    if (!name) return "JD";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file && user) {
      setIsUploading(true);
      try {
        const storageRef = ref(storage, `avatars/${user.uid}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        onUpdate({ ...profileData, avatarUrl: url });
      } catch (error) {
        console.error("Error uploading avatar:", error);
        alert("Failed to upload image.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "---";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="profile-page">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleAvatarChange} 
        accept="image/*" 
        style={{ display: 'none' }} 
      />

      {/* Hero Header */}
      <header className="profile-header">
        <div className={`profile-avatar-container ${isUploading ? 'uploading' : ''}`} onClick={!isUploading ? handleAvatarClick : undefined}>
          <div className="profile-avatar-large">
            {isUploading ? (
              <div className="avatar-loading">...</div>
            ) : profileData?.avatarUrl ? (
              <img src={profileData.avatarUrl} alt="Avatar" className="avatar-img" />
            ) : (
              getInitials(profileData?.name || profileData?.fullName)
            )}
          </div>
          {!isUploading && (
            <div className="avatar-edit-overlay">
              <Camera size={16} color="white" />
            </div>
          )}
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
