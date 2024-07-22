import React from "react";
import '../styles/main.scss';
import logo from '../media/png/miller_carter_logo.png'; // Убедитесь, что путь правильный

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__logo-container">
          <img src={logo} alt="Company Logo" className="footer__logo" />
        </div>
        <div className="footer__column">
          <h4 className="footer__title">Legal</h4>
          <a href="/terms" className="footer__link">Terms</a>
          <a href="/privacy" className="footer__link">Privacy</a>
          <a href="/cookies" className="footer__link">Policy</a>
        </div>
        <div className="footer__column">
          <h4 className="footer__title">Stay Connected</h4>
          <a href="/facebook" className="footer__link">Facebook</a>
          <a href="/social" className="footer__link">Instagram</a>
          <a href="/linkedIn" className="footer__link">LinkedIn</a>
        </div>
        <div className="footer__column">
          <h4 className="footer__title">Company</h4>
          <a href="/about" className="footer__link">About</a>
          <a href="/сareer" className="footer__link">Career</a>
          <a href="/locations" className="footer__link">Locations</a>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© 2024 Miller&Carter Steakhouse. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
