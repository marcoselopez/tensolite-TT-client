import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">SITENSO</div>
      <div className="profile">
        <div>
          <Link to="/profile" >Marcos Emmanuel</Link>
          <p>Admin</p>
        </div>
        <img src="https://picsum.photos/60/60?random=1" alt="Navbar-Profile" />
      </div>
    </div>
  )
};

export default Navbar;
