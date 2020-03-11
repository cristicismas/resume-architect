import { GET_PREVIEWS, GET_SINGLE_PREVIEW } from '../actionTypes';
import { apiCall } from '../../utils/api';

export const getPreviews = () => async (dispatch, getState) => {
  try {
    const { couldFetchMore, lastIndex } = getState().previews;

    if (couldFetchMore) {
      const newTemplates = await apiCall('GET', `templates/previews/${lastIndex}`);

      dispatch({
        type: GET_PREVIEWS,
        payload: newTemplates
      });

      return newTemplates;
    } else return null;
  } catch (err) {
    console.log(err);
  }
};

export const getSinglePreview = previewName => async dispatch => {
  try {
    const template = await apiCall('GET', `templates/single_preview/${previewName}`);

    dispatch({
      type: GET_SINGLE_PREVIEW,
      payload: template
    });

    return template;
  } catch (err) {
    console.log(err);
  }
};
