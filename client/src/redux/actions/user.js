import { LOGGED_IN, LOGGED_OUT, TOKEN_CHECKED, ACCOUNT_DELETED } from '../actionTypes';
import MESSAGE_TYPES from '../../constants/messageTypes';
import { pushMessage } from './messages';
import { apiCall } from '../../utils/api';

export const login = credentials => async dispatch => {
  try {
    const response = await apiCall('POST', `auth/login`, credentials);

    localStorage.setItem('token', response.token);

    dispatch({
      type: LOGGED_IN,
      payload: response
    });

    dispatch(
      pushMessage({
        text: 'You are now logged in!',
        timeout: 3000,
        type: MESSAGE_TYPES.SUCCESS
      })
    );
  } catch (err) {
    console.log(err);
  }
};

export const signup = credentials => async dispatch => {
  try {
    const response = await apiCall('POST', `auth/signup`, credentials);

    localStorage.setItem('token', response.token);

    dispatch({
      type: LOGGED_IN,
      payload: response
    });

    dispatch(
      pushMessage({
        text: 'Welcome!',
        timeout: 3000,
        type: MESSAGE_TYPES.SUCCESS
      })
    );
  } catch (err) {
    console.log(err);
  }
};

export const checkToken = () => async disptach => {
  try {
    const response = await apiCall('POST', 'auth/check');
    if (!response.error) {
      disptach({
        type: LOGGED_IN,
        payload: response
      });
    }

    disptach({
      type: TOKEN_CHECKED,
      payload: response
    });
  } catch (err) {
    console.log(err);
  }
};

export const logout = () => async dispatch => {
  try {
    localStorage.removeItem('token');

    dispatch({
      type: LOGGED_OUT
    });

    dispatch(
      pushMessage({
        text: 'You are now logged out.',
        timeout: 3000,
        type: MESSAGE_TYPES.SUCCESS
      })
    );
  } catch (err) {
    console.log(err);
  }
};

export const deleteAccount = () => async dispatch => {
  try {
    await apiCall('DELETE', 'user/delete');
    localStorage.removeItem('token');

    dispatch({
      type: ACCOUNT_DELETED
    });

    dispatch(
      pushMessage({
        text: 'Your account has been deleted.',
        timeout: 3000,
        type: MESSAGE_TYPES.SUCCESS
      })
    );
  } catch (err) {
    console.log(err);
  }
};
