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
      className="p-1.5 rounded-md border bg-gray-300 text-gray-900 w-[80%] ml-5 md:w-[55%] md:ml-10"
    />
  );
};

export default CustomDatePicker;
