import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { saveUserResume } from '../../store/actions/resumes';
import ICONS from '../../constants/icons';
import './SaveResume.css';

import Icon from './Icon';

const SaveResume = ({ resume }) => {
  const [resumeName, setResumeName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementById('save-resume-name-input').focus();
  }, []);

  const handleSave = useCallback(() => {
    dispatch(saveUserResume(resume));
  }, [dispatch, resume]);

  const handleSubmit = e => {
    e.preventDefault();
    handleSave();
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
          id="save-resume-name-input"
          name="resume-name"
          className="resume-name"
          type="text"
        />

        <button type="submit" className="submit-btn">
          Save
          <Icon icon={ICONS.SAVE} size={26} fill="#fff" />
        </button>
      </form>
    </section>
  );
};

export default SaveResume;
