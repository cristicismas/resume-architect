import { GET_PREVIEWS, GET_SINGLE_PREVIEW } from '../actionTypes';
import { apiCall } from '../../utils/api';

export const getPreviews = () => async (dispatch, getState) => {
  const { shouldFetchMore, lastIndex } = getState().previews;

  if (shouldFetchMore) {
    const newTemplates = await apiCall('GET', `templates/previews/${lastIndex}`);

    dispatch({
      type: GET_PREVIEWS,
      payload: newTemplates
    });

    return newTemplates;
  } else return null;
};

export const getSinglePreview = previewName => async dispatch => {
  const template = await apiCall('GET', `templates/single_preview/${previewName}`);

  dispatch({
    type: GET_SINGLE_PREVIEW,
    payload: template
  });

  return template;
};
