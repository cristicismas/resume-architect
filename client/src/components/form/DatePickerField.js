import React from 'react';
import DatePicker from 'react-datepicker';
import './DatePickerField.css';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerField = ({ namePrefix, startDate, endDate, onChange, monthYearPicker = false }) => {
  return (
    <div className="dates-group">
      <DatePicker
        withPortal
        selected={startDate ? new Date(startDate) : null}
        onChange={date => onChange(`${namePrefix}StartDate`, date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        maxDate={endDate ? endDate : new Date()}
        dateFormat={monthYearPicker ? 'MM/yyyy' : 'dd/MM/yyyy'}
        showMonthYearPicker={monthYearPicker}
        placeholderText="Start Date"
      />

      <span className="date-separator" />

      <DatePicker
        withPortal
        todayButton="Present"
        selected={endDate ? new Date(endDate) : null}
        onChange={date => onChange(`${namePrefix}EndDate`, date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        maxDate={new Date()}
        dateFormat={monthYearPicker ? 'MM/yyyy' : 'dd/MM/yyyy'}
        showMonthYearPicker={monthYearPicker}
        placeholderText="End Date"
      />
    </div>
  );
};

export default DatePickerField;
