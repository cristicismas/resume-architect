import { BUILD_RESUME } from '../actionTypes';
import { apiCall } from '../../utils/api';

export const buildResume = (data, resumeName) => async dispatch => {
  const resume = await apiCall('POST', `resume/build/${resumeName}`, data);
  const url = URL.createObjectURL(resume);

  dispatch({
    type: BUILD_RESUME,
    payload: url
  });
  
  return url;
};
