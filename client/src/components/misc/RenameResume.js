import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { renameResume } from '../../store/actions/resumes';
import ICONS from '../../constants/icons';
import './RenameResume.css';

import LoadingButton from './LoadingButton';

const RenameResume = () => {
  const history = useHistory();
  const { id } = useParams();

  const [resumeName, setResumeName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementById('rename-resume-name-input').focus();
  }, []);

  const handleRename = useCallback(() => {
    dispatch(renameResume(id, resumeName));
  }, [dispatch, id, resumeName]);

  const handleSubmit = e => {
    e.preventDefault();
    handleRename();
    history.goBack();
  };

  return (
    <div id="rename-resume">
      <h1 className="title">Rename Resume</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="resume-name">New Name:</label>
        <input
          value={resumeName}
          onChange={e => setResumeName(e.target.value)}
          required
          id="rename-resume-name-input"
          name="resume-name"
          className="resume-name"
          type="text"
        />

        <LoadingButton loading={false} staleIcon={ICONS.EDIT} type="submit" className="submit-btn">
          Rename
        </LoadingButton>
      </form>
    </div>
  );
};

export default RenameResume;
