import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage, useFormikContext } from 'formik';
import { Route, Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveResumeData, formatResumeToSave } from '../../utils/buildResumeForm';
import { getSinglePreview } from '../../store/actions/previews';
import { buildResume, resetDownloadLinks } from '../../store/actions/resumes';
import { buildResumeSchema } from '../../schemas/buildResume';
import INITIAL_VALUES from '../../constants/initialValues';
import ICONS from '../../constants/icons';
import './ResumeForm.css';

import TemplatePreview from '../misc/TemplatePreview';
import FormLabel from './FormLabel';
import JobFields from './JobFields';
import SchoolFields from './SchoolFields';
import LoadingButton from '../misc/LoadingButton';
import SaveResume from '../misc/SaveResume';
import Overlay from '../misc/Overlay';
import Icon from '../misc/Icon';

const ResumeForm = () => {
  const { template_name } = useParams();
  const location = useLocation();
  const history = useHistory();

  const locationState = location.state;
  const resumeData = locationState ? locationState.resumeData : null;

  const currentPathname = location.pathname;

  const [showDownloadButtons, setShowDownloadButtons] = useState(false);
  const { templateToBuild } = useSelector(state => state.previews);
  const { docx, pdf } = useSelector(state => state.resume);

  const dispatch = useDispatch();

  const handleGetSinglePreview = useCallback(() => {
    dispatch(getSinglePreview(template_name));
  }, [dispatch, template_name]);

  useEffect(() => {
    if (template_name !== 'change_template') handleGetSinglePreview();
  }, [handleGetSinglePreview, template_name]);

  const handleBuildResume = useCallback(
    (data, actions) => {
      setShowDownloadButtons(true);

      saveResumeData(data, template_name);

      dispatch(resetDownloadLinks())
        .then(() => dispatch(buildResume(data, 'docx', template_name)))
        .then(() => dispatch(buildResume(data, 'pdf', template_name)))
        .then(() => {
          actions.setSubmitting(false);
        });
    },
    [dispatch, template_name]
  );

  const ConfirmSaveModal = () => {
    const formData = useFormikContext().values;

    return (
      <Route exact path={['/draft/:template_name/:draft_date/save', '/build/:template_name/save']}>
        <Overlay closeOverlay={history.goBack}>
          <SaveResume resume={formatResumeToSave(formData, template_name)} />
        </Overlay>
      </Route>
    );
  };

  return (
    <section id="resume-form">
      <Formik
        initialValues={resumeData ? resumeData : INITIAL_VALUES.RESUME_FORM}
        validationSchema={buildResumeSchema}
        onSubmit={handleBuildResume}>
        {({ values, errors, setFieldValue, isSubmitting, submitCount }) => (
          <Fragment>
            <Form>
              <section id="template">
                <h2 className="sub-title">Template</h2>

                <TemplatePreview
                  template={templateToBuild}
                  linkTo="/build/change_template"
                  caption="(click to change)"
                />
              </section>

              <section id="contact">
                <h2 className="sub-title">Contact</h2>

                <div className="group">
                  <FormLabel linkTo={`/build/${template_name}/name`} htmlFor="name">
                    Full Name
                  </FormLabel>
                  <Field type="text" placeholder="Your Name" name="name" />
                  <ErrorMessage className="field-error" name="name" component="div" />
                </div>

                <div className="group">
                  <FormLabel linkTo={`/build/${template_name}/address`} htmlFor="address">
                    Address
                  </FormLabel>
                  <Field type="text" placeholder="Your Address" name="address" />
                  <ErrorMessage className="field-error" name="address" component="div" />
                </div>

                <div className="group">
                  <FormLabel linkTo={`/build/${template_name}/phone`} htmlFor="phoneNumber">
                    Phone Number
                  </FormLabel>
                  <Field type="tel" placeholder="555-555-5555" name="phoneNumber" />
                  <ErrorMessage className="field-error" name="phoneNumber" component="div" />
                </div>

                <div className="group">
                  <FormLabel linkTo={`/build/${template_name}/email`} htmlFor="email">
                    Email
                  </FormLabel>
                  <Field type="email" placeholder="youremail@example.com" name="email" />
                  <ErrorMessage className="field-error" name="email" component="div" />
                </div>
              </section>

              <section id="description">
                <h2 className="sub-title">Description</h2>

                <div className="group">
                  <FormLabel linkTo={`/build/${template_name}/about`} htmlFor="about">
                    About
                  </FormLabel>
                  <Field
                    as="textarea"
                    placeholder="A few words about yourself, what you can do, what you're passionate about, what special skills you have..."
                    type="text"
                    name="about"
                  />
                  <ErrorMessage className="field-error" name="about" component="div" />
                </div>
              </section>

              <section id="experience">
                <h2 className="sub-title">Experience</h2>

                <FieldArray name="jobs">
                  {arrayHelpers => (
                    <JobFields
                      templateName={template_name}
                      values={values}
                      setFieldValue={setFieldValue}
                      arrayHelpers={arrayHelpers}
                    />
                  )}
                </FieldArray>
              </section>

              <section id="education">
                <h2 className="sub-title">Education</h2>

                <FieldArray name="schools">
                  {arrayHelpers => (
                    <SchoolFields
                      templateName={template_name}
                      values={values}
                      setFieldValue={setFieldValue}
                      arrayHelpers={arrayHelpers}
                    />
                  )}
                </FieldArray>
              </section>

              <section id="extra">
                <h2 className="sub-title">Extra</h2>

                <div className="group">
                  <FormLabel linkTo={`/build/${template_name}/extra`} htmlFor="extra">
                    Special Awards / Ending Note
                  </FormLabel>
                  <Field
                    as="textarea"
                    placeholder="Any left-out special awards, diplomas, volunteering experience, etc..."
                    type="text"
                    name="extra"
                  />
                  <ErrorMessage className="field-error" name="extra" component="div" />
                </div>
              </section>

              <LoadingButton id="submit-btn" type="submit" staleIcon={ICONS.SUBMIT} loading={isSubmitting}>
                Submit
              </LoadingButton>

              {showDownloadButtons && (
                <div className="download-group">
                  <LoadingButton download staleIcon={ICONS.DOWNLOAD} loading={!docx} href={docx} id="docx-btn">
                    DOCX
                  </LoadingButton>

                  <LoadingButton download staleIcon={ICONS.DOWNLOAD} loading={!pdf} href={pdf} id="pdf-btn">
                    PDF
                  </LoadingButton>
                </div>
              )}

              <Link to={`${currentPathname}/save`} id="save-btn">
                Save Resume <Icon icon={ICONS.SAVE} size={26} fill="#fff" />
              </Link>

              {Object.keys(errors).length > 0 && submitCount > 0 && (
                <div className="errors-warning">
                  You have one or more errors above.
                  <br />
                  Please correct them, and then submit the form again.
                </div>
              )}
            </Form>

            <ConfirmSaveModal />
          </Fragment>
        )}
      </Formik>
    </section>
  );
};

export default ResumeForm;
