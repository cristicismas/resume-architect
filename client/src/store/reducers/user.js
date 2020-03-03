import { LOGGED_IN } from '../actionTypes';

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
    default:
      return state;
  }
};
