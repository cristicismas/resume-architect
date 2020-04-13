import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import { getPreviewsForEachResume } from '../../store/actions/previews';
import { getUserResumes } from '../../store/actions/resumes';
import { whiteSpaceToSnakeCase } from '../../utils/misc';
import './Resumes.css';

import Overlay from '../misc/Overlay';
import TemplatePreview from '../misc/TemplatePreview';
import RenameResume from '../misc/RenameResume';

const Resumes = () => {
  const previews = useSelector(state => state.previews.previewsForEachResume);
  const resumes = useSelector(state => state.resume.resumes);
  const dispatch = useDispatch();
  const history = useHistory();

  const fetchPreviews = useCallback(() => {
    dispatch(getPreviewsForEachResume());
  }, [dispatch]);

  useEffect(() => {
    fetchPreviews();
  }, [fetchPreviews, resumes.length]);

  const fetchResumes = useCallback(() => {
    dispatch(getUserResumes());
  }, [dispatch]);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const resumePreviewsList = resumes.map(resume => {
    const resumeDate = new Date(resume.meta.draftDate).toLocaleString();
    const resumeId = resume._id;
    const templateName = resume.meta.templateName;
    const resumeName = resume.meta.isAutoSaved ? 'Latest Auto Saved Resume' : resume.meta.resumeName;

    const templateForResume = previews.find(preview => preview.name === templateName);

    return (
      <TemplatePreview
        key={resumeDate}
        caption={resumeName}
        template={templateForResume}
        resumeId={resumeId}
        showOptions={true}
        linkTo={{
          pathname: `/draft/${templateName}/${whiteSpaceToSnakeCase(resumeName)}`,
          state: { resumeData: resume.data },
        }}
      />
    );
  });

  return (
    <section id="resumes">
      <h1 className="title">My Resumes</h1>

      <Route exact path="/resumes/:id/rename">
        <Overlay closeOverlay={history.goBack}>
          <RenameResume />
        </Overlay>
      </Route>

      {previews.length > 0 && <div className="resume-previews">{resumePreviewsList}</div>}
    </section>
  );
};

export default Resumes;
