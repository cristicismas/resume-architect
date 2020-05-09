import { PUSH_MESSAGE, REMOVE_MESSAGE, REMOVE_ALL_MESSAGES } from '../actionTypes';

const initialState = {
  messages: [],
  lastId: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PUSH_MESSAGE:
      const messages = [...state.messages, action.payload];
      return { ...state, messages };
    case REMOVE_MESSAGE:
      const filteredMessages = state.messages.filter(message => message.id !== action.payload);
      return { ...state, messages: filteredMessages };
    case REMOVE_ALL_MESSAGES:
      return [];
    default:
      return state;
  }
};
