import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import HeaderLink from './HeaderLink';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

import ICONS from '../../constants/icons';

const Header = () => {
  const { pathname } = useLocation();

  const loggedIn = useSelector(state => state.user.loggedIn);

  return (
    <header className={pathname === '/' ? 'light' : 'dark'}>
      <h1 className="title">
        <Link to="/">ResumeArchitect</Link>
      </h1>

      <nav>
        <HeaderLink path="/templates" icon={ICONS.RESUME} text="Templates" />

        <HeaderLink path="/tips" icon={ICONS.TIP} text="Tips" />

        <HeaderLink path="/about" icon={ICONS.ABOUT} text="About" />

        {loggedIn ? (
          <HeaderLink path="/logout" icon={ICONS.LOGIN} text="Log Out" />
        ) : (
          <Fragment>
            <HeaderLink path="/signup" icon={ICONS.SIGNUP} text="Sign Up" />

            <HeaderLink path="/login" icon={ICONS.LOGIN} text="Log In" />
          </Fragment>
        )}
      </nav>
    </header>
  );
};

export default Header;
