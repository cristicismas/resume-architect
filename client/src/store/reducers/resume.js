import { GET_RESUME_DOCX, GET_RESUME_PDF, RESET_DOWNLOAD_LINKS } from '../actionTypes';

const initialState = {
  docx: '',
  pdf: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RESUME_DOCX:
      return { ...state, docx: action.payload };
    case GET_RESUME_PDF:
      return { ...state, pdf: action.payload };
    case RESET_DOWNLOAD_LINKS:
      return { ...state, docx: '', pdf: '' };
    default:
      return state;
  }
};
