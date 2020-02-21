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
        <Link to="/templates">
          Templates
          <Icon size={24} fill="#eee" icon={ICONS.RESUME} />
        </Link>

        <Link to="/">
          Tips
          <Icon size={24} fill="#eee" icon={ICONS.TIP} />
        </Link>

        <Link to="/">
          About
          <Icon size={24} fill="#eee" icon={ICONS.ABOUT} />
        </Link>

        <Link to="/">
          Sign Up
          <Icon size={24} fill="#eee" icon={ICONS.SIGNUP} />
        </Link>

        <Link to="/">
          Log In
          <Icon size={24} fill="#eee" icon={ICONS.LOGIN} />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
