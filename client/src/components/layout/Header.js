import React from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className={pathname === '/' ? 'light' : 'dark'}>
      <h1 className="title">
        <a href="/">ResumeArchitect</a>
      </h1>

      <nav>
        <a href="/#templates">Templates</a>
        <a href="/">Build Your Own</a>
        <a href="/">About</a>
        <a href="/">Sign Up</a>
        <a href="/">Log In</a>
      </nav>
    </header>
  );
};

export default Header;
