import { LOGGED_IN } from '../actionTypes';
import { apiCall } from '../../utils/api';

export const login = credentials => async dispatch => {
  const response = await apiCall('POST', `auth/login`, credentials);

  localStorage.setItem('token', response.token);

  dispatch({
    type: LOGGED_IN,
    payload: response
  });
};

export const signup = credentials => async dispatch => {
  const response = await apiCall('POST', `auth/signup`, credentials);

  localStorage.setItem('token', response.token);

  dispatch({
    type: LOGGED_IN,
    payload: response
  });
};
