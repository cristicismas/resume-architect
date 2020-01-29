import { BUILD_RESUME } from '../actionTypes';
import { apiCall } from '../../utils/api';

export const buildResume = (data, resumeName) => dispatch => {
  return apiCall('POST', `resume/build/${resumeName}`, data).then(resume => {
    const url = URL.createObjectURL(resume);

    dispatch({
      type: BUILD_RESUME,
      payload: url
    });

    return url;
  });
};
