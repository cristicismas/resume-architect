import {
  GET_RESUME_DOCX,
  GET_RESUME_PDF,
  RESET_DOWNLOAD_LINKS,
  GET_USER_RESUMES,
  SAVE_USER_RESUME,
  UPDATE_RESUME,
  RENAME_RESUME,
  DELETE_RESUME,
  DELETE_LOCAL_RESUME
} from '../actionTypes';
import MESSAGE_TYPES from '../../constants/messageTypes';
import { pushMessage } from './messages';
import { apiCall } from '../../utils/api';

export const buildResume = (data, resumeType, templateName) => async dispatch => {
  try {
    const response = await apiCall('POST', `resume/build/${resumeType}/${templateName}`, data);
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
  } catch (err) {
    const errorBody = await err;

    dispatch(
      pushMessage({
        text: errorBody.message,
        timeout: 4000,
        type: MESSAGE_TYPES.ERROR
      })
    );
  }
};

export const resetDownloadLinks = () => async (dispatch, getState) => {
  try {
    const { docx, pdf } = getState().resume;

    URL.revokeObjectURL(docx);
    URL.revokeObjectURL(pdf);

    dispatch({
      type: RESET_DOWNLOAD_LINKS
    });

    return;
  } catch (err) {
    await err;
  }
};

export const getUserResumes = () => async dispatch => {
  try {
    const resumes = await apiCall('GET', 'resumes', null);

    dispatch({
      type: GET_USER_RESUMES,
      payload: resumes
    });

    return resumes;
  } catch (err) {
    const errorBody = await err;

    dispatch(
      pushMessage({
        text: errorBody.message,
        timeout: 4000,
        type: MESSAGE_TYPES.ERROR
      })
    );
  }
};

export const saveUserResume = (resume, resumeName) => async dispatch => {
  try {
    const resumeToSave = {
      ...resume,
      meta: {
        ...resume.meta,
        resumeName
      }
    };

    const savedResume = await apiCall('POST', 'resume/save', resumeToSave);

    dispatch({
      type: SAVE_USER_RESUME,
      payload: savedResume
    });

    dispatch(
      pushMessage({
        text: 'Your resume has been saved.',
        timeout: 4000,
        type: MESSAGE_TYPES.SUCCESS
      })
    );
  } catch (err) {
    const errorBody = await err;

    dispatch(
      pushMessage({
        text: errorBody.message,
        timeout: 4000,
        type: MESSAGE_TYPES.ERROR
      })
    );
  }
};

export const updateResume = (id, updatedResume) => async dispatch => {
  try {
    if (id === 'Auto_Saved_Resume') {
      let resume = JSON.parse(localStorage.getItem('autoSavedResume'));
      resume.data = updatedResume.data;

      localStorage.setItem('autoSavedResume', JSON.stringify(resume));
    } else {
      await apiCall('PATCH', `resume/${id}/update`, updatedResume);
    }

    dispatch({
      type: UPDATE_RESUME,
      payload: {
        id,
        updatedResume
      }
    });

    dispatch(
      pushMessage({
        text: 'Your resume has been updated.',
        timeout: 4000,
        type: MESSAGE_TYPES.SUCCESS
      })
    );
  } catch (err) {
    const errorBody = await err;

    dispatch(
      pushMessage({
        text: errorBody.message,
        timeout: 4000,
        type: MESSAGE_TYPES.ERROR
      })
    );
  }
};

export const renameResume = (id, newName) => async dispatch => {
  try {
    await apiCall('PATCH', `resume/${id}/rename`, newName);

    dispatch({
      type: RENAME_RESUME,
      payload: {
        id,
        newName
      }
    });

    dispatch(
      pushMessage({
        text: 'Resume renamed successfully.',
        timeout: 4000,
        type: MESSAGE_TYPES.SUCCESS
      })
    );
  } catch (err) {
    const errorBody = await err;

    dispatch(
      pushMessage({
        text: errorBody.message,
        timeout: 4000,
        type: MESSAGE_TYPES.ERROR
      })
    );
  }
};

export const deleteResume = id => async dispatch => {
  try {
    if (id) {
      await apiCall('DELETE', `resume/${id}`);

      dispatch({
        type: DELETE_RESUME,
        payload: id
      });
    } else {
      // If there is no id, it means the resume is only saved in local storage.
      localStorage.removeItem('autoSavedResume');

      dispatch({
        type: DELETE_LOCAL_RESUME
      });
    }

    dispatch(
      pushMessage({
        text: 'Your resume has been removed.',
        timeout: 4000,
        type: MESSAGE_TYPES.SUCCESS
      })
    );
  } catch (err) {
    const errorBody = await err;

    dispatch(
      pushMessage({
        text: errorBody.message,
        timeout: 4000,
        type: MESSAGE_TYPES.ERROR
      })
    );
  }
};
