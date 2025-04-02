import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/" className="link">Home</Link></li> 
        <li><Link to="/cart" className="link">Cart</Link></li>
        <li><Link to="/contact" className="link">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
