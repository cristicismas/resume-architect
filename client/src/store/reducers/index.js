import { combineReducers } from 'redux';

import previews from './previews';
import resume from './resume';

export default combineReducers({
  previews,
  resume
});
