import React, { useState, useEffect, useCallback } from 'react';
import { Formik } from 'formik';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveResumeData } from '../../utils/buildResumeForm';
import { getSinglePreview } from '../../redux/actions/previews';
import { buildResume, resetDownloadLinks } from '../../redux/actions/resumes';
import { buildResumeSchema } from '../../schemas/buildResume';
import INITIAL_VALUES from '../../constants/initialValues';
import './ResumeForm.css';

import ResumeForm from './ResumeForm';

const FormikContainer = () => {
  const { templateName } = useParams();
  const location = useLocation();

  const [showDownloadButtons, setShowDownloadButtons] = useState(false);

  const locationState = location.state;
  const resumeData = locationState ? locationState.resumeData : null;

  const dispatch = useDispatch();

  const dispatchGetSinglePreview = useCallback(() => {
    dispatch(getSinglePreview(templateName));
  }, [dispatch, templateName]);

  useEffect(() => {
    if (templateName !== 'change_template') dispatchGetSinglePreview();
  }, [dispatchGetSinglePreview, templateName]);

  const handleBuildResume = useCallback(
    (data, actions) => {
      setShowDownloadButtons(true);

      saveResumeData(data, templateName);

      dispatch(resetDownloadLinks())
        .then(() => dispatch(buildResume(data, 'docx', templateName)))
        .then(() => dispatch(buildResume(data, 'pdf', templateName)))
        .then(() => {
          actions.setSubmitting(false);
        });
    },
    [dispatch, templateName]
  );

  return (
    <section id="resume-form">
      <Formik
        initialValues={resumeData ? resumeData : INITIAL_VALUES.RESUME_FORM}
        validationSchema={buildResumeSchema}
        onSubmit={handleBuildResume}>
        {formikProps => <ResumeForm {...formikProps} showDownloadButtons={showDownloadButtons} />}
      </Formik>
    </section>
  );
};

export default FormikContainer;
