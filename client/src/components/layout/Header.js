import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className={pathname === '/' ? 'light' : 'dark'}>
      <h1 className="title">
        <a href="/">ResumeArchitect</a>
      </h1>

      <nav>
        <Link to="/templates">Templates</Link>
        <Link to="/">Build Your Own</Link>
        <Link to="/">About</Link>
        <Link to="/">Sign Up</Link>
        <Link to="/">Log In</Link>
      </nav>
    </header>
  );
};

export default Header;
