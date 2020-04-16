import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/user';
import { useHistory } from 'react-router-dom';
import './ConfirmLogout.css';

import Modal from './Modal';

const ConfirmLogout = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const dispatchLogout = useCallback(() => {
    dispatch(logout());
    history.push('/logout');
  }, [dispatch, history]);

  return (
    <Modal closeModal={history.goBack}>
      <section id="confirm-logout">
        <h2>Are you sure you want to log out?</h2>

        <div className="buttons">
          <button className="secondary" onClick={history.goBack}>
            Cancel
          </button>

          <button className="primary" onClick={dispatchLogout}>
            Log out
          </button>
        </div>
      </section>
    </Modal>
  );
};

export default ConfirmLogout;
