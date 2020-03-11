import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/user';
import { useHistory } from 'react-router-dom';
import './ConfirmLogout.css';

import Overlay from './Overlay';

const ConfirmLogout = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    history.push('/logout');
  }, [dispatch, history]);

  return (
    <Overlay closeOverlay={history.goBack}>
      <section id="confirm-logout">
        <h2>Are you sure you want to log out?</h2>

        <div className="buttons">
          <button className="secondary" onClick={history.goBack}>
            Cancel
          </button>

          <button className="primary" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </section>
    </Overlay>
  );
};

export default ConfirmLogout;
