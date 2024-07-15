import React, { useState } from 'react';
import './Header.scss';
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
    <div className="Header">
      <div className="Header-menu">
        <a href="#home" onClick={toggleMenu}>
          <img src={MenuIcon} alt="Menu Icon" />
        </a>
      </div>
      <div className={'Header-registration'}>
        <a href="#registration">Sign In</a>
        <a href="#registration">Sign Up</a>
      </div>
      <div className={`Header-menu-options ${isMenuOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={closeMenu}>Close</button>
        <a href="#about">About Us</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact Us</a>
      </div>
    </div >
  );
}

export default Header;
