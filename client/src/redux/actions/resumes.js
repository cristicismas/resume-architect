import {
  GET_RESUME_DOCX,
  GET_RESUME_PDF,
  RESET_DOWNLOAD_LINKS,
  GET_USER_RESUMES,
  SAVE_USER_RESUME,
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
    console.log(err);
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
    console.log(err);
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
    console.log(err);
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
        timeout: 3000,
        type: MESSAGE_TYPES.SUCCESS
      })
    );
  } catch (err) {
    console.log(err);
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
        timeout: 3000,
        type: MESSAGE_TYPES.SUCCESS
      })
    );
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
        timeout: 3000,
        type: MESSAGE_TYPES.SUCCESS
      })
    );
  } catch (err) {
    console.log(err);
  }
};