import React, { useEffect, useCallback } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePreview } from '../../store/actions/previews';
import { buildResumeSchema } from '../../schemas/buildResume';
import './ResumeForm.css';

import TemplatePreview from '../misc/TemplatePreview';
import JobFields from './JobFields';
import SchoolFields from './SchoolFields';

const ResumeForm = () => {
  const { template_name } = useParams();
  const { templateToBuild } = useSelector(state => state.previews);
  const dispatch = useDispatch();

  const handleGetSinglePreview = useCallback(() => {
    dispatch(getSinglePreview(template_name));
  }, [dispatch, template_name]);

  useEffect(() => {
    handleGetSinglePreview();
  }, [handleGetSinglePreview]);

  const initialValues = {
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    about: '',
    jobs: [
      {
        company: '',
        job: '',
        jobStartDate: null,
        jobEndDate: null,
        responsibilities: ''
      }
    ],
    schools: [
      {
        school: '',
        degree: '',
        schoolStartDate: null,
        schoolEndDate: null
      }
    ],
    extra: ''
  };

  const handleSubmit = () => {};

  return (
    <section id="resume-form">
      <Formik initialValues={initialValues} validationSchema={buildResumeSchema} onSubmit={handleSubmit}>
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <section id="template">
              <h2 className="sub-title">Template</h2>

              <TemplatePreview template={templateToBuild} />
            </section>

            <section id="contact">
              <h2 className="sub-title">Contact</h2>

              <div className="group">
                <label htmlFor="name">Full Name</label>
                <Field type="text" placeholder="John Doe" name="name" />
                <ErrorMessage className="field-error" name="name" component="div" />
              </div>

              <div className="group">
                <label htmlFor="address">Address</label>
                <Field type="text" placeholder="55 Main Street, Azusa, New York 39531" name="address" />
                <ErrorMessage className="field-error" name="address" component="div" />
              </div>

              <div className="group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <Field type="tel" placeholder="555-555-5555" name="phone-number" />
                <ErrorMessage className="field-error" name="phone-number" component="div" />
              </div>

              <div className="group">
                <label htmlFor="email">Email</label>
                <Field type="email" placeholder="johndoe@example.com" name="email" />
                <ErrorMessage className="field-error" name="email" component="div" />
              </div>
            </section>

            <section id="description">
              <h2 className="sub-title">Description</h2>

              <div className="group">
                <label htmlFor="about">About</label>
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
                  <JobFields values={values} setFieldValue={setFieldValue} arrayHelpers={arrayHelpers} />
                )}
              </FieldArray>
            </section>

            <section id="education">
              <h2 className="sub-title">Education</h2>

              <FieldArray name="schools">
                {arrayHelpers => (
                  <SchoolFields values={values} setFieldValue={setFieldValue} arrayHelpers={arrayHelpers} />
                )}
              </FieldArray>
            </section>

            <section id="extra">
              <h2 className="sub-title">Extra</h2>

              <div className="group">
                <label htmlFor="extra">Special Awards / Ending Note</label>
                <Field
                  as="textarea"
                  placeholder="Any left-out special awards, diplomas, volunteering experience, etc..."
                  type="text"
                  name="extra"
                />
                <ErrorMessage className="field-error" name="extra" component="div" />
              </div>
            </section>

            <button id="submit-btn" type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default ResumeForm;
