import React from 'react';
import './LoadingButton.css';

import Spinner from './Spinner';
import Icon from './Icon';
import { ICONS } from '../../constants';

const LoadingButton = ({ loading, children, download, ...otherProps }) => {
  if (download) {
    return (
      <a download className={`loading-btn ${loading ? 'is-loading' : 'undefined'}`} {...otherProps}>
        {children}

        {loading ? <Spinner /> : <Icon icon={ICONS.DOWNLOAD} size={26} fill="#fff" />}
      </a>
    );
  } else {
    return (
      <button className={`loading-btn ${loading ? 'is-loading' : 'undefined'}`} {...otherProps}>
        {children}

        {loading ? <Spinner /> : <Icon icon={ICONS.SUBMIT} size={26} fill="#fff" />}
      </button>
    );
  }
};

export default LoadingButton;
