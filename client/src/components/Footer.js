import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Lavendro</h3>
          <p>Creating memorable events since 2015. Your trusted partner in making every celebration special and unforgettable.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/about">About Us</Link>
          <Link to="/services">Services</Link>
          <Link to="/menus">Menus</Link>
          <Link to="/venues">Venues</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>Email: info@lavendro.com</p>
          <p>Phone: +94 123 456 789</p>
          <p>Address: Negombo, Western Province, LK</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Lavendro Event Planning. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
