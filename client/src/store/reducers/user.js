import { LOGGED_IN, LOGGED_OUT, ACCOUNT_DELETED } from '../actionTypes';

const initialState = {
  loggedIn: false,
  information: {
    token: localStorage.getItem('token'),
    username: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return { ...state, loggedIn: true, information: { ...action.payload } };
    case LOGGED_OUT:
      return { ...state, loggedIn: false, information: { token: null, username: null } };
    case ACCOUNT_DELETED:
      return { ...initialState };
    default:
      return state;
  }
};
