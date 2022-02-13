import React from 'react';
import './navbar.css'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">SITENSO</div>
      <div className="profile">
        <div>
          <a href="#">Marcos Emmanuel</a>
          <p>Admin</p>
        </div>
        <img src="https://picsum.photos/60/60?random=1" alt="Navbar-Profile-Picture" />
      </div>
    </div>
  )
};

export default Navbar;
