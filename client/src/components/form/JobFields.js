import React, { Fragment } from 'react';
import { Field, ErrorMessage } from 'formik';
import DatePickerField from './DatePickerField';

const SchoolFields = ({ values, setFieldValue, arrayHelpers }) => {
  return (
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
  );
};

export default SchoolFields;
