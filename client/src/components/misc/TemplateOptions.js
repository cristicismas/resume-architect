import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteResume } from '../../store/actions/resumes';
import ICONS from '../../constants/icons';
import './TemplateOptions.css';

import Icon from './Icon';

const TemplateOptions = ({ resumeId }) => {
  const dispatch = useDispatch();

  const dispatchDelete = useCallback(() => {
    dispatch(deleteResume(resumeId));
  }, [dispatch, resumeId]);

  const handleDelete = e => {
    e.preventDefault();
    e.stopPropagation();

    dispatchDelete();
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
