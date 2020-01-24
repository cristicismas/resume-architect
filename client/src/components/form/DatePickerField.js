import React from 'react';
import DatePicker from 'react-datepicker';
import './DatePickerField.css';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerField = ({ namePrefix, startDate, endDate, onChange }) => {
  return (
    <div className="dates-group">
      <DatePicker
        selected={startDate ? new Date(startDate) : null}
        onChange={date => onChange(`${namePrefix}StartDate`, date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        maxDate={new Date()}
      />

      <span className="date-separator" />

      <DatePicker
        selected={endDate ? new Date(endDate) : null}
        onChange={date => onChange(`${namePrefix}EndDate`, date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        maxDate={new Date()}
      />
    </div>
  );
};

export default DatePickerField;
