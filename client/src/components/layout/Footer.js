import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="left-side">
        <h1 className="title">
          <Link to="/">ResumeArchitect</Link>
        </h1>
      </div>

      <div className="right-side">
        <nav>
          <Link to="/templates">Templates</Link>
          <Link to="/about">About Us</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Use</Link>
          <Link to="/credits">Credits & Attributions</Link>
        </nav>
      </div>

      <p className="copyright-notice">
        Copyright 2020 | ResumeArchitect - built by{' '}
        <a target="_blank" rel="noopener noreferrer" href="https://cristicismas.github.io">
          Cristi Cismas
        </a>
      </p>
    </footer>
  );
};

export default Footer;
