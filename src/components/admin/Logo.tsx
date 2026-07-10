import React from 'react';

export const Logo = () => {
  return (
    <div className="admin-logo" style={{ 
      background: 'white', 
      padding: '8px 16px', 
      borderRadius: '8px', 
      display: 'inline-block' 
    }}>
      <img
        src="/logoseffaf.webp"
        alt="Özensan Logo"
        style={{ maxWidth: '100%', height: 'auto', maxHeight: '40px' }}
      />
    </div>
  );
};
