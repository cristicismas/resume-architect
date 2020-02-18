import React, { Children, cloneElement, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon';
import ICONS from '../../constants/icons';
import './Overlay.css';

const useOutsideClickDetector = (ref, closeOverlay) => {
  const handleOutsideClick = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      closeOverlay();
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

const Overlay = ({ hideCloseOverlayButton, closeOverlay, children }) => {
  const modalRoot = document.getElementById('modal-root');

  const overlayRef = useRef(null);
  useOutsideClickDetector(overlayRef, closeOverlay);

  useOwnScrollbar();

  const childrenWithCloseOverlay = Children.map(children, child => cloneElement(child, { closeOverlay }));

  return createPortal(
    <div className="overlay-container" style={{ height: window.innerHeight }}>
      <div className="overlay" ref={hideCloseOverlayButton ? null : overlayRef}>
        {!hideCloseOverlayButton && (
          <button type="button" className="close-overlay-btn" onClick={() => closeOverlay()}>
            <Icon className="close-overlay-icon" icon={ICONS.CROSS} size={30} fill="#222" />
          </button>
        )}
        {childrenWithCloseOverlay}
      </div>
    </div>,
    modalRoot
  );
};

export default Overlay;