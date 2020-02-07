import { GET_RESUME_DOCX, GET_RESUME_PDF, RESET_DOWNLOAD_LINKS } from '../actionTypes';
import { apiCall } from '../../utils/api';

export const buildResume = (data, resumeType, resumeName) => async dispatch => {
  const response = await apiCall('POST', `resume/build/${resumeType}/${resumeName}`, data);
  const payload = URL.createObjectURL(response);

  if (resumeType.toLowerCase() === 'pdf') {
    dispatch({
      type: GET_RESUME_PDF,
      payload
    });
  } else {
    dispatch({
      type: GET_RESUME_DOCX,
      payload
    });
  }

  return payload;
};

export const resetDownloadLinks = () => async (dispatch, getState) => {
  const { docx, pdf } = getState().resume;

  URL.revokeObjectURL(docx);
  URL.revokeObjectURL(pdf);

  dispatch({
    type: RESET_DOWNLOAD_LINKS
  });

  return;
};
