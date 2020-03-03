import { combineReducers } from 'redux';

import previews from './previews';
import resume from './resume';
import user from './user';

export default combineReducers({
  previews,
  resume,
  user
});
