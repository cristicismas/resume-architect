import { combineReducers } from 'redux';

import previews from './previews';
import resumes from './resumes';

export default combineReducers({
  previews,
  resumes
});
