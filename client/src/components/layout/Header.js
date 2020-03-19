import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, Route } from 'react-router-dom';
import ICONS from '../../constants/icons';
import './Header.css';

import ConfirmLogout from '../misc/ConfirmLogout';
import HeaderLink from './HeaderLink';

const Header = () => {
  const { pathname } = useLocation();

  const loggedIn = useSelector(state => state.user.loggedIn);

  // Render confirm_logout route on every path.
  const confirmLogoutPath = pathname === '/' ? '/confirm_logout' : `${pathname}/confirm_logout`;

  const headerClassName = pathname === '/' || pathname === '/confirm_logout' ? 'light' : 'dark';

  return (
    <header className={headerClassName}>
      <h1 className="title">
        <Link to="/">ResumeArchitect</Link>
      </h1>

      <nav>
        <HeaderLink path="/templates" icon={ICONS.RESUME} text="Templates" />

        <HeaderLink path="/about" icon={ICONS.ABOUT} text="About" />

        {loggedIn ? (
          <Fragment>
            <HeaderLink path="/resumes" icon={ICONS.MANY_RESUMES} text="My Resumes" />

            <HeaderLink path={confirmLogoutPath} icon={ICONS.LOGIN} text="Log Out" />
          </Fragment>
        ) : (
          <Fragment>
            <HeaderLink path="/signup" icon={ICONS.SIGNUP} text="Sign Up" />

            <HeaderLink path="/login" icon={ICONS.LOGIN} text="Log In" />
          </Fragment>
        )}
      </nav>

      <Route path="*/confirm_logout">
        <ConfirmLogout />
      </Route>
    </header>
  );
};

export default Header;
