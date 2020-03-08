import { LOGGED_IN, LOGGED_OUT } from '../actionTypes';
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

export const checkToken = () => async (disptach, getState) => {
  const token = getState().user.information.token;
  const response = await apiCall('POST', 'auth/check', null, token);

  if (!response.error) {
    disptach({
      type: LOGGED_IN,
      payload: response
    });
  }
};

export const logout = () => async dispatch => {
  localStorage.removeItem('token');

  dispatch({
    type: LOGGED_OUT
  });
};
