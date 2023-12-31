import React, { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiCalendar } from "react-icons/bi";

const CustomDatePicker = ({ selectedDate, handleDateChange }) => {
  const datePickerRef = useRef(null);

  const handleCalendarIconClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  return (
    <div className="relative flex justify-center items-center  ">
      <DatePicker
        id="datePicker"
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="EEE, dd/MM/yyyy"
        className="p-1.5 border bg-gray-300 text-gray-900 w-full"
        ref={datePickerRef}
      />
      <div className="absolute right-[2%] md:right-[12%] ">
        <BiCalendar size={25} onClick={handleCalendarIconClick} />
      </div>
    </div>
  );
};

export default CustomDatePicker;
