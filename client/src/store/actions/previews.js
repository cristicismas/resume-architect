import { GET_PREVIEWS } from '../actionTypes';
import { apiCall } from '../../utils/api';

export const getPreviews = () => (dispatch, getState) => {
  const { shouldFetchMore, lastIndex } = getState().previews;

  if (shouldFetchMore) {
    return apiCall('GET', `templates/previews/${lastIndex}`).then(newTemplates => {
      dispatch({
        type: GET_PREVIEWS,
        payload: newTemplates
      });

      return newTemplates;
    });
  } else return null;
};
