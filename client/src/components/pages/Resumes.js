import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPreviewsForEachResume } from '../../redux/actions/previews';
import { getUserResumes } from '../../redux/actions/resumes';
import { whiteSpaceToSnakeCase } from '../../utils/misc';
import './Resumes.css';

import TemplatePreview from '../misc/TemplatePreview';
import RenameResume from '../modals/RenameResume';
import DeleteResume from '../modals/DeleteResume';
import PrivateRoute from '../routes/PrivateRoute';

const Resumes = () => {
  const previews = useSelector(state => state.previews.previewsForEachResume);
  const resumes = useSelector(state => state.resume.resumes);
  const dispatch = useDispatch();

  const dispatchGetResumesAndPreviews = useCallback(() => {
    dispatch(getUserResumes()).then(() => dispatch(getPreviewsForEachResume()));
  }, [dispatch]);

  useEffect(() => {
    dispatchGetResumesAndPreviews();
  }, [dispatchGetResumesAndPreviews, resumes.length]);

  const resumePreviewsList = resumes.map(resume => {
    const resumeDate = new Date(resume.meta.draftDate).toLocaleString();
    const resumeId = resume._id;
    const templateName = resume.meta.templateName;
    const resumeName = resume.meta.isAutoSaved ? 'Auto Saved Resume' : resume.meta.resumeName;

    const templateForResume = previews.find(preview => preview.name === templateName);

    return (
      <TemplatePreview
        key={resumeDate}
        caption={resumeName}
        template={templateForResume}
        resumeId={resumeId}
        showOptions={resume.meta.isAutoSaved ? false : true}
        linkTo={{
          pathname: `/draft/${templateName}/${resume._id ? resume._id : whiteSpaceToSnakeCase(resumeName)}`,
          state: { resumeData: resume.data }
        }}
      />
    );
  });

  return (
    <section id="resumes">
      <h1 className="title">My Resumes</h1>

      <PrivateRoute exact path="/resumes/:id/rename">
        <RenameResume />
      </PrivateRoute>

      <PrivateRoute exact path="/resumes/:id/delete">
        <DeleteResume />
      </PrivateRoute>

      {previews.length > 0 ? (
        <div className="resume-previews">{resumePreviewsList}</div>
      ) : (
        <p className="no-resumes">
          Sorry, you don't seem to have any saved resumes.
          <br />
          <br />
          To save a resume,
          <Link className="intermediary" to="/templates">
            select a template
          </Link>
          , fill in your data, and click on the 'Save Resume' button at the bottom of the page.
        </p>
      )}
    </section>
  );
};

export default Resumes;
