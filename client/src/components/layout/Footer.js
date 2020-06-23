import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const loggedIn = useSelector(state => state.user.loggedIn);

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

          {loggedIn ? <Link to="/resumes">My Resumes</Link> : null}

          <Link to="/about">About</Link>
          <Link to="/credits">Credits & Attributions</Link>

          {loggedIn ? <Link to="/account">Your Account</Link> : null}
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
