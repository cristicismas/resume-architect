import {
  GET_RESUME_DOCX,
  GET_RESUME_PDF,
  RESET_DOWNLOAD_LINKS,
  GET_USER_RESUMES,
  SAVE_USER_RESUME,
  RENAME_RESUME,
  DELETE_RESUME,
  DELETE_LOCAL_RESUME,
} from '../actionTypes';

const initialResumes = localStorage.getItem('latestResumeDraft')
  ? [JSON.parse(localStorage.getItem('latestResumeDraft'))]
  : [];

const initialState = {
  docx: '',
  pdf: '',
  resumes: initialResumes,
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
      return { ...state, resumes: [...initialResumes, ...action.payload] };
    case SAVE_USER_RESUME:
      return { ...state, resumes: [...state.resumes, action.payload] };
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
