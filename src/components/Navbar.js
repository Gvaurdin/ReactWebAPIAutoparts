import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css'; // Подключаем App.css, чтобы использовать стили

const Navbar = () => {
  return (
    <nav className="navbar"> {/* Используем класс navbar */}
      <ul className="nav-list"> {/* Используем класс nav-list */}
        <li><Link to="/" className="link">Home</Link></li> {/* Используем класс link */}
        <li><Link to="/cart" className="link">Cart</Link></li>
        <li><Link to="/contact" className="link">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
