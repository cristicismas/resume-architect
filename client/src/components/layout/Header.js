import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

import Icon from '../misc/Icon';
import ICONS from '../../constants/icons';

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className={pathname === '/' ? 'light' : 'dark'}>
      <h1 className="title">
        <a href="/">ResumeArchitect</a>
      </h1>

      <nav>
        <Link className={pathname.includes('templates') ? 'active' : ''} to="/templates">
          Templates
          <Icon size={24} fill="#eee" icon={ICONS.RESUME} />
        </Link>

        <Link className={pathname.includes('tips') ? 'active' : ''} to="/tips">
          Tips
          <Icon size={24} fill="#eee" icon={ICONS.TIP} />
        </Link>

        <Link className={pathname.includes('about') ? 'active' : ''} to="/about">
          About
          <Icon size={24} fill="#eee" icon={ICONS.ABOUT} />
        </Link>

        <Link className={pathname.includes('signup') ? 'active' : ''} to="/signup">
          Sign Up
          <Icon size={24} fill="#eee" icon={ICONS.SIGNUP} />
        </Link>

        <Link className={pathname.includes('login') ? 'active' : ''} to="/login">
          Log In
          <Icon size={24} fill="#eee" icon={ICONS.LOGIN} />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
