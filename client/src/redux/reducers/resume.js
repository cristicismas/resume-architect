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

const getAutoSavedResumeArray = () => {
  return localStorage.getItem('autoSavedResume') ? [JSON.parse(localStorage.getItem('autoSavedResume'))] : [];
};

const initialState = {
  docx: '',
  pdf: '',
  resumes: getAutoSavedResumeArray()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RESUME_DOCX:
      return { ...state, docx: action.payload };
    case GET_RESUME_PDF:
      return { ...state, pdf: action.payload };
    case RESET_DOWNLOAD_LINKS:
      return { ...state, docx: '', pdf: '' };
    case GET_USER_RESUMES:
      return {
        ...state,
        resumes: [...getAutoSavedResumeArray(), ...action.payload]
      };
    case SAVE_USER_RESUME:
      return { ...state, resumes: [...state.resumes, action.payload] };
    case UPDATE_RESUME:
      const resumes = [...state.resumes];

      if (action.payload._id === 'Auto_Saved_Resume') {
        resumes[0] = action.payload;
      } else {
        const resumeIndex = resumes.find(resume => resume._id === action.payload._id);
        resumes[resumeIndex] = action.payload;
      }

      return { ...state, resumes };
    case RENAME_RESUME:
      const resumesCopy = [...state.resumes];

      const resumeToRenameIndex = state.resumes.findIndex(resume => resume._id === action.payload.id);
      resumesCopy[resumeToRenameIndex].meta.resumeName = action.payload.newName;

      return { ...state, resumes: resumesCopy };
    case DELETE_RESUME:
      const filteredResumes = state.resumes.filter(resume => resume._id !== action.payload);
      return { ...state, resumes: filteredResumes };
    case DELETE_LOCAL_RESUME:
      const resumesSavedRemotely = state.resumes.filter(resume => resume._id);
      return { ...state, resumes: resumesSavedRemotely };
    default:
      return state;
  }
};
