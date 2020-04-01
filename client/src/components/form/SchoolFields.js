import React, { Fragment } from 'react';
import { Field, ErrorMessage } from 'formik';
import useAddToPathname from '../../hooks/useAddToPathname';

import DatePickerField from './DatePickerField';
import FormLabel from './FormLabel';

const SchoolFields = ({ values, setFieldValue, arrayHelpers }) => {
  const schoolTipPath = useAddToPathname('school');
  const degreeTipPath = useAddToPathname('schoolDegree');
  const dateTipPath = useAddToPathname('schoolDate');

  return (
    <Fragment>
      {values.schools.map((school, index) => (
        <Fragment key={index}>
          <button className="remove-field" type="button" onClick={() => arrayHelpers.remove(index)}>
            &#215; Remove this school &#8595;
          </button>

          <div className="group">
            <FormLabel linkTo={schoolTipPath} htmlFor={`schools[${index}].school`}>
              School
            </FormLabel>
            <Field type="text" placeholder="Your university / school / college" name={`schools[${index}].school`} />
            <ErrorMessage className="field-error" name={`schools[${index}].school`} component="div" />
          </div>

          <div className="group">
            <FormLabel linkTo={degreeTipPath} htmlFor={`schools[${index}].degree`}>
              Degree
            </FormLabel>
            <Field type="text" placeholder="Your diploma / degree" name={`schools[${index}].degree`} />
            <ErrorMessage className="field-error" name={`schools[${index}].degree`} component="div" />
          </div>

          <div className="group">
            <FormLabel linkTo={dateTipPath} htmlFor="school-date">
              Date
            </FormLabel>
            <DatePickerField
              onChange={setFieldValue}
              monthYearPicker={true}
              startDate={values.schools[index].schoolStartDate}
              endDate={values.schools[index].schoolEndDate}
              namePrefix={`schools[${index}].school`}
            />
            <ErrorMessage className="field-error" name={`schools[${index}].schoolStartDate`} component="div" />
            <ErrorMessage className="field-error" name={`schools[${index}].schoolEndDate`} component="div" />
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
  );
};

export default SchoolFields;
