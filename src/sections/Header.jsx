import React, { useState, useEffect, useRef } from 'react';
import '../styles/main.scss';
import MenuIcon from '../media/svg/menu-svgrepo-com.svg';

function Header({ user, status, onLogout, onDeleteAccount, onSignUpClick, onLoginClick, onReviewClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const dropdownRef = useRef(null);
  const userRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleUserClick = () => {
    setShowOptions(!showOptions);
  };

  const handleDeleteAccountClick = () => {
    setShowConfirmation(true);
  };

  const confirmDeleteAccount = () => {
    onDeleteAccount();
    setShowConfirmation(false);
    onLogout();
  };

  const cancelDeleteAccount = () => {
    setShowConfirmation(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !userRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className={`Header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="Header-menu">
        <a href="#home" onClick={toggleMenu}>
          <img src={MenuIcon} alt="Menu Icon" />
        </a>
      </div>
      <div className="Header-registration">
        {user ? (
          <div className="user-section">
            <span className={`username ${showOptions ? 'active' : ''}`} onClick={handleUserClick} ref={userRef}>
              {user}
              <span className="status">({status})</span>
            </span>
            <div className={`dropdown-menu ${showOptions ? 'show' : ''}`} ref={dropdownRef}>
              <button onClick={() => alert('Profile Clicked!')}>Profile</button>
              <button onClick={onLogout}>Sign Out</button>
              <button onClick={handleDeleteAccountClick}>Delete Account</button>
              <button onClick={onReviewClick}>Submit Review</button>
            </div>
          </div>
        ) : (
          <>
            <a href="#sign-in" onClick={onLoginClick}>Sign In</a>
            <button className="button sign-up" onClick={onSignUpClick}>Sign Up</button>
          </>
        )}
      </div>
      {showConfirmation && (
        <div className="confirmation-dialog">
          <div className="confirmation-content">
            <p>Are you sure you want to delete your account?</p>
            <button onClick={confirmDeleteAccount}>Yes</button>
            <button onClick={cancelDeleteAccount}>Cancel</button>
          </div>
        </div>
      )}
      <div className={`Header-menu-options ${isMenuOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={closeMenu}>X</button>
        <a href="#home" onClick={closeMenu}>Home</a>
        <a href="#book" onClick={closeMenu}>Book</a>
        <a href="#menus" onClick={closeMenu}>Menus</a>
        <a href="#offers" onClick={closeMenu}>Offers</a>
      </div>
    </nav>
  );
}

export default Header;
