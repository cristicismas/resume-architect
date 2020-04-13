import {
  GET_RESUME_DOCX,
  GET_RESUME_PDF,
  RESET_DOWNLOAD_LINKS,
  GET_USER_RESUMES,
  SAVE_USER_RESUME,
  DELETE_RESUME,
  DELETE_LOCAL_RESUME,
} from '../actionTypes';

import { apiCall } from '../../utils/api';

export const buildResume = (data, resumeType, resumeName) => async dispatch => {
  try {
    const response = await apiCall('POST', `resume/build/${resumeType}/${resumeName}`, data);
    const payload = URL.createObjectURL(response);

    if (resumeType.toLowerCase() === 'pdf') {
      dispatch({
        type: GET_RESUME_PDF,
        payload,
      });
    } else {
      dispatch({
        type: GET_RESUME_DOCX,
        payload,
      });
    }

    return payload;
  } catch (err) {
    console.log(err);
  }
};

export const resetDownloadLinks = () => async (dispatch, getState) => {
  try {
    const { docx, pdf } = getState().resume;

    URL.revokeObjectURL(docx);
    URL.revokeObjectURL(pdf);

    dispatch({
      type: RESET_DOWNLOAD_LINKS,
    });

    return;
  } catch (err) {
    console.log(err);
  }
};

export const getUserResumes = () => async dispatch => {
  try {
    const resumes = await apiCall('GET', 'resumes');

    dispatch({
      type: GET_USER_RESUMES,
      payload: resumes,
    });

    return resumes;
  } catch (err) {
    console.log(err);
  }
};

export const saveUserResume = (resume, resumeName) => async dispatch => {
  try {
    const resumeToSave = {
      ...resume,
      meta: {
        ...resume.meta,
        resumeName,
      },
    };

    const savedResume = await apiCall('POST', 'resume/save', resumeToSave);

    dispatch({
      type: SAVE_USER_RESUME,
      payload: savedResume,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteResume = id => async dispatch => {
  try {
    if (id) {
      await apiCall('DELETE', `resume/${id}`);

      dispatch({
        type: DELETE_RESUME,
        payload: id,
      });
    } else {
      // If there is no id, it means the resume is only saved in local storage.
      localStorage.removeItem('latestResumeDraft');

      dispatch({
        type: DELETE_LOCAL_RESUME,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
