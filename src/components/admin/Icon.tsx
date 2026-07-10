import React from 'react';

export const Icon = () => {
  return (
    <div className="admin-icon" style={{
      background: 'white',
      padding: '4px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px'
    }}>
      <img
        src="/faviconseffaf.webp"
        alt="Özensan Icon"
        style={{ width: '24px', height: '24px', objectFit: 'contain' }}
      />
    </div>
  );
};
