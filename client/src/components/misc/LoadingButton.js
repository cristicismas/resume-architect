import React from 'react';
import './LoadingButton.css';

import Spinner from './Spinner';
import Icon from './Icon';

const ButtonWrapper = ({ children, download, ...otherProps }) => {
  if (download) {
    return (
      <a download {...otherProps}>
        {children}
      </a>
    );
  } else {
    return <button {...otherProps}>{children}</button>;
  }
};

const LoadingButton = ({ loading, children, download, staleIcon, className, ...otherProps }) => {
  return (
    <ButtonWrapper
      download={download}
      className={`loading-btn ${className} ${loading ? 'is-loading' : ''}`}
      {...otherProps}>
      {children}

      {loading ? <Spinner /> : <Icon icon={staleIcon} size={26} fill="#fff" />}
    </ButtonWrapper>
  );
};

export default LoadingButton;
