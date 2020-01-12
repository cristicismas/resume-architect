import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="left-side">
        <h1 className="title">
          <a href="/">ResumeArchitect</a>
        </h1>
      </div>

      <div className="right-side">
        <nav>
          <a href="/">Templates</a>
          <a href="/">Build Your Template</a>
          <a href="/">About Us</a>
          <a href="/">Privacy Policy</a>
          <a href="/">Terms of Use</a>
        </nav>
      </div>

      <p className="copyright-notice">
        Copyright 2020 | ResumeArchitect - built by{' '}
        <a target="_blank" href="https://cristicismas.github.io">
          Cristi Cismas
        </a>
      </p>
    </footer>
  );
};

export default Footer;
