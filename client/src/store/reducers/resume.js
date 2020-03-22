import { GET_RESUME_DOCX, GET_RESUME_PDF, RESET_DOWNLOAD_LINKS, GET_USER_RESUMES } from '../actionTypes';

const initialResumes = localStorage.getItem('latestResumeDraft')
  ? [JSON.parse(localStorage.getItem('latestResumeDraft'))]
  : [];

const initialState = {
  docx: '',
  pdf: '',
  resumes: initialResumes
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
      return { ...state, resumes: [...state.resumes, ...action.payload] };
    default:
      return state;
  }
};
