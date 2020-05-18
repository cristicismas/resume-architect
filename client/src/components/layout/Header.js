import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAddToPathname from '../../hooks/useAddToPathname';
import ICONS from '../../constants/icons';
import './Header.css';

import ConfirmLogout from '../modals/ConfirmLogout';
import HeaderLink from './HeaderLink';
import PrivateRoute from '../routes/PrivateRoute';

const Header = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  history.listen(() => {
    document.getElementById('nav-toggle').checked = false;
    document.body.style.overflow = 'auto';
  });

  const loggedIn = useSelector(state => state.user.loggedIn);

  // Render confirm_logout route on every path.
  const confirmLogoutPath = useAddToPathname('confirm_logout');

  const headerClassName = pathname === '/' || pathname === '/confirm_logout' ? 'light' : 'dark';

  const handleCheckboxChange = e => {
    if (e.target.checked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <header className={headerClassName}>
      <h1 className="title">
        <Link to="/">
          <img src="/favicon.png" className="logo" alt="Logo" />
          ResumeArchitect
        </Link>
      </h1>

      <nav id="big-nav">
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

      <nav id="small-nav">
        <input type="checkbox" className="nav-checkbox" id="nav-toggle" onChange={handleCheckboxChange} />

        <label htmlFor="nav-toggle" className="checkbox-label">
          <span className="hamburger-menu">&nbsp;</span>
        </label>

        <div className="nav-background">&nbsp;</div>

        <div className="list-wrapper">
          <ul className="nav-list">
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
          </ul>
        </div>
      </nav>

      <PrivateRoute path="*/confirm_logout">
        <ConfirmLogout />
      </PrivateRoute>
    </header>
  );
};

export default Header;
