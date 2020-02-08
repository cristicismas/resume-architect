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
            <label htmlFor={`jobs[${index}].company`}>Company</label>
            <Field type="text" placeholder="Company Name" name={`jobs[${index}].company`} />
            <ErrorMessage className="field-error" name={`jobs[${index}].company`} component="div" />
          </div>

          <div className="group">
            <label htmlFor={`jobs[${index}].job`}>Job Title</label>
            <Field type="text" placeholder="Job Title / Position" name={`jobs[${index}].job`} />
            <ErrorMessage className="field-error" name={`jobs[${index}].job`} component="div" />
          </div>

          <div className="group">
            <label htmlFor="date">Date</label>
            <DatePickerField
              onChange={setFieldValue}
              startDate={values.jobs[index].jobStartDate}
              endDate={values.jobs[index].jobEndDate}
              namePrefix={`jobs[${index}].job`}
            />
            <ErrorMessage className="field-error" name={`jobs[${index}].jobStartDate`} component="div" />
            <ErrorMessage className="field-error" name={`jobs[${index}].jobEndDate`} component="div" />
          </div>

          <div className="group">
            <label htmlFor={`jobs[${index}].responsibilities`}>Responsibilities / About the job</label>
            <Field
              as="textarea"
              placeholder="Key role you played at the company. Try to keep it short. Use bullet-points to list the responsibilities you've had / the important stuff you did while you worked there."
              type="text"
              name={`jobs[${index}].responsibilities`}
            />
            <ErrorMessage className="field-error" name={`jobs[${index}].responsibilities`} component="div" />
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
