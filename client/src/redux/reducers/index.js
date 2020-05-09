import { combineReducers } from 'redux';
import { LOGGED_OUT } from '../actionTypes';

import messages from './messages';
import previews from './previews';
import resume from './resume';
import user from './user';

const allReducers = combineReducers({
  messages,
  previews,
  resume,
  user
});

export default (state, action) => {
  if (action.type === LOGGED_OUT) {
    state = undefined;
  }

  return allReducers(state, action);
};
