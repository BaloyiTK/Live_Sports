import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ selectedDate, handleDateChange }) => {
  return (
    <DatePicker
      id="datePicker"
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="EEE, dd/MM/yyyy"
      className="p-1.5 border bg-gray-300 text-gray-900"
    />
  );
};

export default CustomDatePicker;
