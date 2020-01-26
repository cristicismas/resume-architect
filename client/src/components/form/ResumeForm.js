import React, { Fragment, useEffect, useCallback } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePreview } from '../../store/actions/previews';
import { buildResumeSchema } from '../../schemas/buildResume';
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

              <FieldArray
                name="jobs"
                render={arrayHelpers => (
                  <Fragment>
                    {values.jobs.map((job, index) => (
                      <Fragment key={index}>
                        <button className="remove-field" type="button" onClick={() => arrayHelpers.remove(index)}>
                          &#215; Remove this job &#8595;
                        </button>

                        <div className="group">
                          <label htmlFor="company">Company</label>
                          <Field type="text" placeholder="Gao Laboratories - Chicago" name={`jobs[${index}].company`} />
                          <ErrorMessage className="field-error" name="company" component="div" />
                        </div>

                        <div className="group">
                          <label htmlFor="job">Job Title</label>
                          <Field type="text" placeholder="Human Resources Intern" name={`jobs[${index}].job`} />
                          <ErrorMessage className="field-error" name="job" component="div" />
                        </div>

                        <div className="group">
                          <label htmlFor="date">Date</label>
                          <DatePickerField
                            onChange={setFieldValue}
                            startDate={values.jobs[index].jobStartDate}
                            endDate={values.jobs[index].jobEndDate}
                            namePrefix={`jobs[${index}].job`}
                          />
                          <ErrorMessage className="field-error" name="jobStartDate" component="div" />
                          <ErrorMessage className="field-error" name="jobEndDate" component="div" />
                        </div>

                        <div className="group">
                          <label htmlFor="responsibilities">Responsibilities / About the job</label>
                          <Field
                            as="textarea"
                            placeholder="Key role you played at the company. Try to keep it short and use bullet-points when you list the responsibilities you've had / important stuff you did while you worked there."
                            type="text"
                            name={`jobs[${index}].responsibilities`}
                          />
                          <ErrorMessage className="field-error" name="responsibilities" component="div" />
                        </div>
                      </Fragment>
                    ))}

                    <button
                      className="add-field"
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          company: '',
                          job: '',
                          jobStartDate: '',
                          jobEndDate: '',
                          responsibilities: ''
                        })
                      }>
                      &#43; {values.jobs.length > 0 ? 'Add another job' : 'Add a job'}
                    </button>
                  </Fragment>
                )}
              />
            </section>

            <section id="education">
              <h2 className="sub-title">Education</h2>

              <FieldArray
                name="schools"
                render={arrayHelpers => (
                  <Fragment>
                    {values.schools.map((school, index) => (
                      <Fragment key={index}>
                        <button className="remove-field" type="button" onClick={() => arrayHelpers.remove(index)}>
                          &#215; Remove this school &#8595;
                        </button>

                        <div className="group">
                          <label htmlFor="school">School</label>
                          <Field type="text" placeholder="Miami University" name={`schools[${index}].school`} />
                          <ErrorMessage className="field-error" name="school" component="div" />
                        </div>

                        <div className="group">
                          <label htmlFor="degree">Degree</label>
                          <Field type="text" placeholder="Bachelor of Science" name={`schools[${index}].degree`} />
                          <ErrorMessage className="field-error" name="degree" component="div" />
                        </div>

                        <div className="group">
                          <label htmlFor="school-date">Date</label>
                          <DatePickerField
                            onChange={setFieldValue}
                            monthYearPicker={true}
                            startDate={values.schools[index].schoolStartDate}
                            endDate={values.schools[index].schoolEndDate}
                            namePrefix={`schools[${index}].school`}
                          />
                          <ErrorMessage className="field-error" name="schoolStartDate" component="div" />
                          <ErrorMessage className="field-error" name="schoolEndDate" component="div" />
                        </div>
                      </Fragment>
                    ))}

                    <button
                      className="add-field"
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          company: '',
                          job: '',
                          jobStartDate: '',
                          jobEndDate: '',
                          responsibilities: ''
                        })
                      }>
                      &#43; {values.schools.length > 0 ? 'Add another school' : 'Add a school'}
                    </button>
                  </Fragment>
                )}
              />
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
