import React from 'react';

const UserProfileIcon = ({ profilePhotoUrl, className }) => {
  const defaultPhotoUrl = 'https://picsum.photos/200';
  return (
    <div className="user-profile-icon">
      <img
        src={profilePhotoUrl || defaultPhotoUrl}
        alt="User Profile"
        className={`${className}`}
      />
    </div>
  );
};

export default UserProfileIcon;
