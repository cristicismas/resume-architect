import React from 'react';
import DatePicker from 'react-datepicker';
import './DatePickerField.css';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerField = ({ namePrefix, startDate, endDate, onChange, monthYearPicker = false }) => {
  const startDateObject = startDate ? new Date(startDate) : null;
  const endDateObject = endDate ? new Date(endDate) : null;

  return (
    <div className="dates-group">
      <DatePicker
        withPortal
        selected={startDateObject}
        onChange={date => onChange(`${namePrefix}StartDate`, date)}
        selectsStart
        startDate={startDateObject}
        endDate={endDateObject}
        maxDate={endDate ? new Date(endDate) : new Date()}
        dateFormat={monthYearPicker ? 'MM/yyyy' : 'dd/MM/yyyy'}
        showMonthYearPicker={monthYearPicker}
        placeholderText="Start Date"
      />

      <span className="date-separator" />

      <DatePicker
        withPortal
        todayButton="Present"
        selected={endDateObject}
        onChange={date => onChange(`${namePrefix}EndDate`, date)}
        selectsEnd
        startDate={startDateObject}
        endDate={endDateObject}
        minDate={startDateObject}
        maxDate={new Date()}
        dateFormat={monthYearPicker ? 'MM/yyyy' : 'dd/MM/yyyy'}
        showMonthYearPicker={monthYearPicker}
        placeholderText="End Date"
      />
    </div>
  );
};

export default DatePickerField;
