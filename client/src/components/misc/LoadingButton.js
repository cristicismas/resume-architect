import React from 'react';
import './LoadingButton.css';
import Spinner from './Spinner';

const LoadingButton = ({ loading, children, download, ...otherProps }) => {
  if (download) {
    return (
      <a download className={`loading-btn ${loading ? 'is-loading' : 'undefined'}`} {...otherProps}>
        {children}

        {loading && <Spinner />}
      </a>
    );
  } else {
    return (
      <button className={`loading-btn ${loading ? 'is-loading' : 'undefined'}`} {...otherProps}>
        {children}

        {loading && <Spinner />}
      </button>
    );
  }
};

export default LoadingButton;
