import { GET_PREVIEWS, GET_SINGLE_PREVIEW } from '../actionTypes';
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

export const getSinglePreview = previewName => dispatch => {
  return apiCall('GET', `templates/single_preview/${previewName}`).then(template => {
    dispatch({
      type: GET_SINGLE_PREVIEW,
      payload: template
    });
  });
};
