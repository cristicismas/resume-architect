import React, { Children, cloneElement, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../misc/Icon';
import ICONS from '../../constants/icons';
import './Modal.css';

const useOutsideClickDetector = (ref, closeModal) => {
  const handleOutsideClick = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });
};

const useOwnScrollbar = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
};

const Modal = ({ hideCloseModalButton, closeModal, isFullscreen, children }) => {
  const modalRoot = document.getElementById('modal-root');

  const modalRef = useRef(null);
  useOutsideClickDetector(modalRef, closeModal);

  useOwnScrollbar();

  const childrenWithCloseModal = Children.map(children, child => {
    // If typeof child.type is a string, then the element is an html element,
    // not a React element, in which case the closeModal prop shouldn't be passed.
    if (typeof child.type === 'string') {
      return cloneElement(child);
    } else {
      return cloneElement(child, { closeModal });
    }
  });

  return createPortal(
    <div className={`modal-container ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="modal" ref={hideCloseModalButton ? null : modalRef}>
        {!hideCloseModalButton && (
          <button type="button" className="close-modal-btn" onClick={() => closeModal()}>
            <Icon className="close-modal-icon" icon={ICONS.CROSS} size={30} fill="#222" />
          </button>
        )}
        {childrenWithCloseModal}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
