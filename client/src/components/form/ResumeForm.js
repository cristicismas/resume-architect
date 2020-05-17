import React, { Fragment, useEffect, useCallback } from 'react';
import { Form, Field, FieldArray, ErrorMessage, useFormikContext } from 'formik';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { formatResumeToSave } from '../../utils/buildResumeForm';
import { getSinglePreview } from '../../redux/actions/previews';
import { updateResume } from '../../redux/actions/resumes';
import useAddToPathname from '../../hooks/useAddToPathname';
import ICONS from '../../constants/icons';
import './ResumeForm.css';

import TemplatePreview from '../misc/TemplatePreview';
import FormLabel from './FormLabel';
import JobFields from './JobFields';
import SchoolFields from './SchoolFields';
import LoadingButton from '../misc/LoadingButton';
import SaveResume from '../modals/SaveResume';
import Icon from '../misc/Icon';
import PrivateRoute from '../routes/PrivateRoute';

const ResumeForm = ({ values, errors, setFieldValue, isSubmitting, submitCount, showDownloadButtons }) => {
  const { templateName, resumeId } = useParams();
  const location = useLocation();
  const formData = useFormikContext().values;

  const saveResumePathname = useAddToPathname('save');

  const { loggedIn } = useSelector(state => state.user);
  const { templateToBuild } = useSelector(state => state.previews);
  const { docx, pdf } = useSelector(state => state.resume);

  const TIP_PATHS = {
    NAME: useAddToPathname('name'),
    ADDRESS: useAddToPathname('address'),
    PHONE: useAddToPathname('phone'),
    EMAIL: useAddToPathname('email'),
    ABOUT: useAddToPathname('about'),
    EXTRA: useAddToPathname('extra')
  };

  const dispatch = useDispatch();

  const dispatchGetSinglePreview = useCallback(() => {
    dispatch(getSinglePreview(templateName));
  }, [dispatch, templateName]);

  useEffect(() => {
    if (templateName !== 'change_template') dispatchGetSinglePreview();
  }, [dispatchGetSinglePreview, templateName]);

  const handleUpdate = () => {
    dispatch(updateResume(resumeId, formatResumeToSave(formData)));
  };

  const changeTemplatePath = useAddToPathname('change_template');

  return (
    <Fragment>
      <Form>
        <section id="template">
          <h2 className="sub-title">Template</h2>

          <TemplatePreview template={templateToBuild} linkTo={changeTemplatePath} caption="(click to change)" />
        </section>

        <section id="contact">
          <h2 className="sub-title">Contact</h2>

          <div className="group">
            <FormLabel linkTo={TIP_PATHS.NAME} htmlFor="name">
              Full Name
            </FormLabel>
            <Field type="text" placeholder="Your Name" name="name" />
            <ErrorMessage className="field-error" name="name" component="div" />
          </div>

          <div className="group">
            <FormLabel linkTo={TIP_PATHS.ADDRESS} htmlFor="address">
              Address
            </FormLabel>
            <Field type="text" placeholder="Your Address" name="address" />
            <ErrorMessage className="field-error" name="address" component="div" />
          </div>

          <div className="group">
            <FormLabel linkTo={TIP_PATHS.PHONE} htmlFor="phoneNumber">
              Phone Number
            </FormLabel>
            <Field type="tel" placeholder="555-555-5555" name="phoneNumber" />
            <ErrorMessage className="field-error" name="phoneNumber" component="div" />
          </div>

          <div className="group">
            <FormLabel linkTo={TIP_PATHS.EMAIL} htmlFor="email">
              Email
            </FormLabel>
            <Field type="email" placeholder="youremail@example.com" name="email" />
            <ErrorMessage className="field-error" name="email" component="div" />
          </div>
        </section>

        <section id="description">
          <h2 className="sub-title">Description</h2>

          <div className="group">
            <FormLabel linkTo={TIP_PATHS.ABOUT} htmlFor="about">
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
            {arrayHelpers => <JobFields values={values} setFieldValue={setFieldValue} arrayHelpers={arrayHelpers} />}
          </FieldArray>
        </section>

        <section id="education">
          <h2 className="sub-title">Education</h2>

          <FieldArray name="schools">
            {arrayHelpers => <SchoolFields values={values} setFieldValue={setFieldValue} arrayHelpers={arrayHelpers} />}
          </FieldArray>
        </section>

        <section id="extra">
          <h2 className="sub-title">Extra</h2>

          <div className="group">
            <FormLabel linkTo={TIP_PATHS.EXTRA} htmlFor="extra">
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

        <LoadingButton
          id="submit-btn"
          type="submit"
          staleIcon={ICONS.SUBMIT}
          iconColor="#00a2ff"
          loading={isSubmitting}>
          Submit
        </LoadingButton>

        {location.pathname.includes('/draft') ? (
          <LoadingButton
            id="update-btn"
            type="button"
            onClick={handleUpdate}
            staleIcon={ICONS.UPDATE}
            iconColor="rgb(9, 170, 17)"
            loading={false}>
            Update Resume
          </LoadingButton>
        ) : loggedIn ? (
          <Link to={saveResumePathname} id="save-btn">
            Save Resume <Icon icon={ICONS.SAVE} size={26} fill="rgb(9, 170, 17)" />
          </Link>
        ) : null}

        {Object.keys(errors).length > 0 && submitCount > 0 && (
          <div className="errors-warning">
            You have one or more errors above.
            <br />
            Please correct them, and then submit the form again.
          </div>
        )}

        {showDownloadButtons && (
          <Fragment>
            <h3 className="downloads-title">Your downloads:</h3>

            <div className="download-group">
              <LoadingButton
                download
                staleIcon={ICONS.DOWNLOAD}
                iconColor="#00a2ff"
                loading={!docx}
                href={docx}
                id="docx-btn">
                DOCX
              </LoadingButton>

              <LoadingButton
                download
                staleIcon={ICONS.DOWNLOAD}
                iconColor="#ff4d4d"
                loading={!pdf}
                href={pdf}
                id="pdf-btn">
                PDF
              </LoadingButton>
            </div>
          </Fragment>
        )}
      </Form>

      <PrivateRoute exact path={['/draft/:templateName/:resumeId/save', '/build/:templateName/save']}>
        <SaveResume resume={formatResumeToSave(formData, templateName)} />
      </PrivateRoute>
    </Fragment>
  );
};

export default ResumeForm;
