import React, { useState } from 'react';
import '../styles/main.scss';
import MenuIcon from '../media/svg/menu-svgrepo-com.svg';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="Header">
      <div className="Header-menu">
        <a href="#home" onClick={toggleMenu}>
          <img src={MenuIcon} alt="Menu Icon" />
        </a>
      </div>
      <div className="Header-registration">
        <a href="#registration">Sign In</a>
        <a href="#registration">Sign Up</a>
      </div>
      <div className={`Header-menu-options ${isMenuOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={closeMenu}>X</button>
        <a href="#home">Home</a>
        <a href="#book">Book</a>
        <a href="#menus">Menus</a>
        <a href="#offers">Offers</a>
      </div>
    </nav>
  );
}

export default Header;
