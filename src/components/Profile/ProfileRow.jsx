import React from 'react';

/**
 * Reusable Row for the Profile info cards
 */
const ProfileRow = ({ label, value }) => {
  return (
    <div className="profile-row">
      <span className="profile-row-label">{label}</span>
      <span className="profile-row-value">{value}</span>
    </div>
  );
};

export default ProfileRow;
