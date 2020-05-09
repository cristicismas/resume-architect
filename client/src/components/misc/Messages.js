import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeMessage } from '../../store/actions/messages';
import ICONS from '../../constants/icons';
import './Messages.css';

import Icon from './Icon';

const Messages = () => {
  const { messages } = useSelector(state => state.messages);

  return (
    <ul className="message-list">
      {messages.map(message => (
        <Message key={message.id} message={message} />
      ))}
    </ul>
  );
};

const Message = ({ message }) => {
  const { text, type, timeout, id } = message;

  const [messageClassName, setClassName] = useState(`message ${type}`);
  const dispatch = useDispatch();

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setClassName(currentClassName => currentClassName + ' to-remove');
    }, timeout - 200);

    return () => {
      clearTimeout(animationTimeout);
    };
  }, [dispatch, timeout]);

  useEffect(() => {
    const removeTimeout = setTimeout(() => {
      dispatch(removeMessage(id));
    }, timeout);

    return () => {
      clearTimeout(removeTimeout);
    };
  }, [dispatch, timeout, id]);

  const onRemoveClick = () => {
    setClassName(currentClassName => currentClassName + ' to-remove');

    setTimeout(() => {
      dispatch(removeMessage(id));
    }, 200);
  };

  return (
    <div className="message-container">
      <div className={messageClassName}>
        <div className="text">{text}</div>

        <button className="dismiss-btn" onClick={onRemoveClick}>
          <Icon icon={ICONS.CROSS} size={20} fill="#000" />
        </button>
      </div>
    </div>
  );
};

export default Messages;
