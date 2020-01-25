import React, { useEffect, useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePreview } from '../../store/actions/previews';
import './ResumeForm.css';

import DatePickerField from './DatePickerField';
import TemplatePreview from '../misc/TemplatePreview';

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
    jobStartDate: '',
    jobEndDate: '',
    schoolStartDate: '',
    schoolEndDate: ''
  };

  const validate = () => {};
  const handleSubmit = () => {};

  return (
    <section id="resume-form">
      <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
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
                <ErrorMessage name="name" component="div" />
              </div>

              <div className="group">
                <label htmlFor="address">Address</label>
                <Field type="text" placeholder="55 Main Street, Azusa, New York 39531" name="address" />
                <ErrorMessage name="address" component="div" />
              </div>

              <div className="group">
                <label htmlFor="phone-number">Phone Number</label>
                <Field type="tel" placeholder="555-555-5555" pattern="^\+?\d{0,13}" name="phone-number" />
                <ErrorMessage name="phone-number" component="div" />
              </div>

              <div className="group">
                <label htmlFor="email">Email</label>
                <Field type="email" placeholder="johndoe@example.com" name="email" />
                <ErrorMessage name="email" component="div" />
              </div>
            </section>

            <section id="description">
              <h2 className="sub-title">Description</h2>

              <div className="group">
                <label htmlFor="about">About</label>
                <Field as="textarea" placeholder="A few words about yourself, what you can do, what you're passionate about, what special skills you have..." type="text" name="about" />
                <ErrorMessage name="about" component="div" />
              </div>
            </section>

            <section id="experience">
              <h2 className="sub-title">Experience</h2>

              <div className="group">
                <label htmlFor="company">Company</label>
                <Field type="text" placeholder="Gao Laboratories - Chicago" name="company" />
                <ErrorMessage name="company" component="div" />
              </div>

              <div className="group">
                <label htmlFor="job">Job Title</label>
                <Field type="text" placeholder="Human Resources Intern" name="job" />
                <ErrorMessage name="job" component="div" />
              </div>

              <div className="group">
                <label htmlFor="date">Date</label>
                <DatePickerField
                  onChange={setFieldValue}
                  startDate={values.jobStartDate}
                  endDate={values.jobEndDate}
                  namePrefix="job"
                />
                <ErrorMessage name="job-date" component="div" />
              </div>

              <div className="group">
                <label htmlFor="responsibilities">Responsibilities / About the job</label>
                <Field as="textarea" placeholder="Key role you played at the company. Try to keep it short and use bullet-points when you list the responsibilities you've had / important stuff you did while you worked there." type="text" name="responsibilities" />
                <ErrorMessage name="responsibilities" component="div" />
              </div>
            </section>

            <section id="education">
              <h2 className="sub-title">Education</h2>

              <div className="group">
                <label htmlFor="school">School</label>
                <Field type="text" placeholder="Miami University" name="school" />
                <ErrorMessage name="school" component="div" />
              </div>

              <div className="group">
                <label htmlFor="degree">Degree</label>
                <Field type="text" placeholder="Bachelor of Science" name="degree" />
                <ErrorMessage name="degree" component="div" />
              </div>

              <div className="group">
                <label htmlFor="school-date">Date</label>
                <DatePickerField
                  onChange={setFieldValue}
                  startDate={values.schoolStartDate}
                  endDate={values.schoolEndDate}
                  namePrefix="school"
                />
                <ErrorMessage name="school-date" component="div" />
              </div>
            </section>

            <section id="extra">
              <h2 className="sub-title">Extra</h2>

              <div className="group">
                <label htmlFor="extra">Special Awards / Ending Note</label>
                <Field as="textarea" placeholder="Any left-out special awards, diplomas, volunteering experience, etc..." type="text" name="extra" />
                <ErrorMessage name="extra" component="div" />
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
