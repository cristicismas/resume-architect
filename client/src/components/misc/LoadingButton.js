import React from 'react';
import './LoadingButton.css';

import Spinner from './Spinner';
import Icon from './Icon';

const LoadingButton = ({ loading, children, download, staleIcon, ...otherProps }) => {
  if (download) {
    return (
      <a download className={`loading-btn ${loading ? 'is-loading' : 'undefined'}`} {...otherProps}>
        {children}

        {loading ? <Spinner /> : <Icon icon={staleIcon} size={26} fill="#fff" />}
      </a>
    );
  } else {
    return (
      <button className={`loading-btn ${loading ? 'is-loading' : 'undefined'}`} {...otherProps}>
        {children}

        {loading ? <Spinner /> : <Icon icon={staleIcon} size={26} fill="#fff" />}
      </button>
    );
  }
};

export default LoadingButton;
