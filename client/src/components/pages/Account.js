import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteAccount } from '../../store/actions/user';
import ICONS from '../../constants/icons';
import './Account.css';

import LoadingButton from '../misc/LoadingButton';

const Account = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const dispatchDelete = useCallback(() => {
    dispatch(deleteAccount());
  }, dispatch);

  const handleDelete = e => {
    e.preventDefault();
    dispatchDelete();
    history.push('/');
  };

  return (
    <section id="account">
      <h1 className="title">My Account</h1>

      <p className="description">
        Well, there really isn't much here. All we do when you sign up is get your username and password, encrypt the
        password, and store both in our database.
      </p>
      <p className="description">
        If you want to delete your account, all you have to do is press the delete button below. That will delete all of
        the data we've stored about you.
      </p>

      <p className="description">
        This action is irreversible, and if you choose to delete the account, you won't be able to recover it.
      </p>

      <LoadingButton
        loading={false}
        staleIcon={ICONS.DELETE}
        onClick={handleDelete}
        type="button"
        className="delete-btn">
        Delete Account
      </LoadingButton>
    </section>
  );
};

export default Account;
