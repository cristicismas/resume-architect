import React from 'react';
import { useHistory } from 'react-router-dom';
import ICONS from '../../constants/icons';
import './TemplateOptions.css';

import Icon from './Icon';

const TemplateOptions = ({ resumeId }) => {
  const history = useHistory();

  const handleDelete = e => {
    e.preventDefault();
    e.stopPropagation();

    history.push(`/resumes/${resumeId}/delete`);
  };

  const handleEdit = e => {
    e.preventDefault();
    e.stopPropagation();

    history.push(`/resumes/${resumeId}/rename`);
  };

  return (
    <div className="template-options">
      <button type="button" onClick={handleEdit}>
        <Icon icon={ICONS.EDIT} size={30} fill="rgb(100, 100, 100)" />
      </button>

      <button type="button" onClick={handleDelete}>
        <Icon icon={ICONS.DELETE} size={30} fill="rgb(185, 0, 0)" />
      </button>
    </div>
  );
};

export default TemplateOptions;
