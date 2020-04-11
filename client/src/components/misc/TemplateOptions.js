import React from 'react';
import ICONS from '../../constants/icons';
import './TemplateOptions.css';

import Icon from './Icon';

const TemplateOptions = () => {
  const handleDelete = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log('delete');
  };

  const handleEdit = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log('edit');
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
