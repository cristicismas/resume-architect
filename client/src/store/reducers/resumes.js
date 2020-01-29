import { BUILD_RESUME } from '../actionTypes';

const initialState = {
  resumeURL: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BUILD_RESUME:
      return action.payload;
    default:
      return state;
  }
};
