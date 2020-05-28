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
        timeout: 4000,
        type: MESSAGE_TYPES.SUCCESS
      })
    );

    dispatch({
      type: TOKEN_CHECKED,
      payload: response
    });

    return response;
  } catch (err) {
    const errorBody = await err;

    dispatch(
      pushMessage({
        text: errorBody.message,
        timeout: 4000,
        type: MESSAGE_TYPES.ERROR
      })
    );
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
        timeout: 4000,
        type: MESSAGE_TYPES.SUCCESS
      })
    );

    dispatch({
      type: TOKEN_CHECKED,
      payload: response
    });

    return response;
  } catch (err) {
    const errorBody = await err;

    dispatch(
      pushMessage({
        text: errorBody.message,
        timeout: 4000,
        type: MESSAGE_TYPES.ERROR
      })
    );
  }
};

export const checkToken = () => async dispatch => {
  try {
    const response = await apiCall('POST', 'auth/check');

    dispatch({
      type: LOGGED_IN,
      payload: response
    });
  } catch (err) {
    await err;
  }

  dispatch({
    type: TOKEN_CHECKED
  });
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
        timeout: 4000,
        type: MESSAGE_TYPES.SUCCESS
      })
    );
  } catch (err) {
    const errorBody = await err;

    dispatch(
      pushMessage({
        text: errorBody.message,
        timeout: 4000,
        type: MESSAGE_TYPES.ERROR
      })
    );
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
        timeout: 4000,
        type: MESSAGE_TYPES.SUCCESS
      })
    );
  } catch (err) {
    const errorBody = await err;

    dispatch(
      pushMessage({
        text: errorBody.message,
        timeout: 4000,
        type: MESSAGE_TYPES.ERROR
      })
    );
  }
};
