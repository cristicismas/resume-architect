import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveUserResume } from '../../store/actions/resumes';
import ICONS from '../../constants/icons';
import './SaveResume.css';

import LoadingButton from './LoadingButton';

const SaveResume = ({ resume }) => {
  const history = useHistory();

  const [resumeName, setResumeName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementById('save-resume-name-input').focus();
  }, []);

  const dispatchSave = useCallback(() => {
    dispatch(saveUserResume(resume, resumeName));
  }, [dispatch, resume, resumeName]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatchSave();
    history.goBack();
  };

  return (
    <section id="save-resume">
      <h1 className="title">Save Your Resume</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="resume-name">Resume Name:</label>
        <input
          value={resumeName}
          onChange={e => setResumeName(e.target.value)}
          required
          maxLength="55"
          id="save-resume-name-input"
          name="resume-name"
          className="resume-name"
          type="text"
        />

        <LoadingButton loading={false} staleIcon={ICONS.SAVE} type="submit" className="submit-btn">
          Save
        </LoadingButton>
      </form>
    </section>
  );
};

export default SaveResume;
