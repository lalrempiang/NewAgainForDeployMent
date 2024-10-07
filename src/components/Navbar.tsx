import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: 'white', // Red background
        color: 'black', // White text color
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaIVNG9rLrVCMOx3OcMXGDxKogFNKbmDjbFA&s"
          alt="Logo"
          style={{ width: '50px', height: '50px', marginRight: '10px' }} // Adjusted size
        />
        <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Sae Ma Eul Klang</span>
      </div>
      <div style={{ fontWeight: 'bold', fontSize: '18px' }}>The Landmark</div>
    </nav>
  );
};

export default Navbar;
