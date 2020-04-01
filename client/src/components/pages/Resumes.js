import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPreviewsForEachResume } from '../../store/actions/previews';
import { getUserResumes } from '../../store/actions/resumes';
import { whiteSpaceToSnakeCase } from '../../utils/misc';
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
    const templateName = resume.meta.template_name;
    const resumeName = resume.meta.isAutoSaved ? 'Latest Auto Saved Resume' : resume.meta.resumeName;

    const templateForResume = previews.find(preview => preview.name === templateName);

    return (
      <TemplatePreview
        key={resumeDate}
        caption={resumeName}
        template={templateForResume}
        linkTo={{
          pathname: `/draft/${templateName}/${whiteSpaceToSnakeCase(resumeName)}`,
          state: { resumeData: resume.data }
        }}
      />
    );
  });

  return (
    <section id="resumes">
      <h1 className="title">My Resumes</h1>

      {previews.length > 0 && <div className="resume-previews">{resumePreviewsList}</div>}
    </section>
  );
};

export default Resumes;
