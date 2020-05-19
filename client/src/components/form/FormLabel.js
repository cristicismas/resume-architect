import React from 'react';
import { Link } from 'react-router-dom';
import ICONS from '../../constants/icons';
import './FormLabel.css';

import Icon from '../misc/Icon';

const FormLabel = ({ htmlFor, linkTo, children }) => {
  return (
    <div className="label">
      <Link to={linkTo} tabIndex="-1">
        <Icon icon={ICONS.INFO} size={20} />
      </Link>

      <label htmlFor={htmlFor}>{children}</label>
    </div>
  );
};

export default FormLabel;
