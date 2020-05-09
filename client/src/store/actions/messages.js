import { PUSH_MESSAGE, REMOVE_MESSAGE, REMOVE_ALL_MESSAGES } from '../actionTypes';

export const pushMessage = message => async (dispatch, getState) => {
  const { lastId } = getState().messages;

  const newMessageId = lastId + 1;
  const newMessage = { ...message, id: newMessageId };

  dispatch({
    type: PUSH_MESSAGE,
    payload: newMessage
  });

  return newMessageId;
};

export const removeMessage = messageId => async dispatch => {
  dispatch({
    type: REMOVE_MESSAGE,
    payload: messageId
  });
};

export const removeAllMessages = () => async dispatch => {
  dispatch({
    type: REMOVE_ALL_MESSAGES
  });
};
