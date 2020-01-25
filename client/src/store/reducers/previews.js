import { GET_PREVIEWS, GET_SINGLE_PREVIEW } from '../actionTypes';

const initialState = {
  shouldFetchMore: true,
  lastIndex: 0,
  templateToBuild: null,
  previewsList: []
};

const MAX_RESULTS = 6;

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PREVIEWS:
      return handleGetPreviews(state, action);
    case GET_SINGLE_PREVIEW:
      return { ...state, templateToBuild: action.payload };
    default:
      return state;
  }
};

const handleGetPreviews = (state, action) => {
  const updatedState = {
    ...state,
    previewsList: [...state.previewsList, ...action.payload],
    lastIndex: state.previewsList.length + action.payload.length
  };

  if (action.payload.length < MAX_RESULTS) {
    return {
      ...updatedState,
      shouldFetchMore: false
    };
  } else {
    return updatedState;
  }
};
