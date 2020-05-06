import { LOGGED_IN, LOGGED_OUT } from '../actionTypes';
import { apiCall } from '../../utils/api';

export const login = credentials => async dispatch => {
  try {
    const response = await apiCall('POST', `auth/login`, credentials);

    localStorage.setItem('token', response.token);

    dispatch({
      type: LOGGED_IN,
      payload: response
    });
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
  } catch (err) {
    console.log(err);
  }
};

export const checkToken = () => async disptach => {
  try {
    const response = await apiCall('POST', 'auth/check', null);

    if (!response.error) {
      disptach({
        type: LOGGED_IN,
        payload: response
      });
    }
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
  } catch (err) {
    console.log(err);
  }
};
