import React from 'react';
import HeaderLink from './HeaderLink';
import { useLocation } from 'react-router-dom'
import './Header.css';

import ICONS from '../../constants/icons';

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className={pathname === '/' ? 'light' : 'dark'}>
      <h1 className="title">
        <a href="/">ResumeArchitect</a>
      </h1>

      <nav>
        <HeaderLink path="/templates" icon={ICONS.RESUME} text="Templates" />

        <HeaderLink path="/tips" icon={ICONS.TIP} text="Tips" />

        <HeaderLink path="/about" icon={ICONS.ABOUT} text="About" />

        <HeaderLink path="/signup" icon={ICONS.SIGNUP} text="Sign Up" />

        <HeaderLink path="/login" icon={ICONS.LOGIN} text="Log In" />
      </nav>
    </header>
  );
};

export default Header;
