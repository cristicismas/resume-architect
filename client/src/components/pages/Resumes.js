import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPreviewsForEachResume } from '../../store/actions/previews';
import { getUserResumes } from '../../store/actions/resumes';
import './Resumes.css';

import TemplatePreview from '../misc/TemplatePreview';

const Resumes = () => {
  const previews = useSelector(state => state.previews.previewsForEachResume);
  const resumes = useSelector(state => state.resume.resumes);
  const dispatch = useDispatch();

  const fetchPreviews = useCallback(() => {
    dispatch(getPreviewsForEachResume());
  }, [dispatch]);

  useEffect(() => {
    fetchPreviews();
  }, [fetchPreviews]);

  const fetchResumes = useCallback(() => {
    dispatch(getUserResumes());
  }, [dispatch]);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const resumePreviewsList = resumes.map(resume => {
    const resumeDate = new Date(resume.meta.draft_date).toLocaleString();
    const resumeName = resume.meta.template_name;
    const resumeCaption = resume.meta.isAutoSaved ? 'Latest Auto Saved Resume' : resumeDate;

    const templateForResume = previews.find(preview => preview.name === resumeName);

    return <TemplatePreview key={resumeDate} caption={resumeCaption} template={templateForResume} linkTo="/" />;
  });

  return (
    <section id="resumes">
      <h1 className="title">My Resumes</h1>
      {previews.length > 0 && <div className="resume-previews">{resumePreviewsList}</div>}
    </section>
  );
};

export default Resumes;
