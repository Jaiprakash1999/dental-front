import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const CustomDatePicker = ({
  allowPastDates = false,
  allowFutureDates = true,
  setDate,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getMonthData = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const startingDay = firstDay.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const totalDays = daysInMonth(year, month);
    const monthData = [];

    let day = 1;
    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startingDay) {
          week.push(null);
        } else if (day > totalDays) {
          break;
        } else {
          week.push(day);
          day++;
        }
      }
      monthData.push(week);
    }
    return monthData;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1)
    );
  };

  const handleDateClick = (day) => {
    setSelectedDate(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    );
    setDate &&
      setDate(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      );
  };

  const renderCalendar = () => {
    const monthData = getMonthData(
      currentMonth.getFullYear(),
      currentMonth.getMonth()
    );
    const today = new Date();

    return monthData.map((week, index) => (
      <div key={index} className="flex">
        {week.map((day, index) => {
          const isToday =
            day &&
            day === today.getDate() &&
            currentMonth.getMonth() === today.getMonth() &&
            currentMonth.getFullYear() === today.getFullYear();
          const isPastDate =
            !allowPastDates &&
            new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              day + 1
            ) < today;
          const isFutureDate =
            !allowFutureDates &&
            new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day) >
              today;

          return (
            <div
              key={index}
              className={`flex cursor-pointer items-center justify-center m-1 w-10 text-sm h-10 ${
                day ? "" : "bg-[]"
              } ${
                selectedDate && day === selectedDate.getDate()
                  ? "bg-[#007bff] rounded-lg text-white"
                  : ""
              } ${isToday ? "border rounded-lg border-blue-500" : ""} ${
                isPastDate || isFutureDate ? "opacity-50" : ""
              }`}
              onClick={() =>
                day && !isPastDate && !isFutureDate && handleDateClick(day)
              }
            >
              {day}
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <div className="px-3 w-full rounded">
      <div className="flex justify-between items-center">
        <button onClick={handlePrevMonth}>
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </button>
        <div className="text-sm my-4 font-medium">
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </div>
        <button onClick={handleNextMonth}>
          <FontAwesomeIcon icon={faArrowRightLong} />
        </button>
      </div>
      <div className="flex text-[#6B7280]">
        <div className="flex items-center mx-1 w-10 h-10 justify-center ">
          Sun
        </div>
        <div className="flex mx-1 items-center w-10 h-10 justify-center ">
          Mon
        </div>
        <div className="flex mx-1 items-center w-10 h-10 justify-center ">
          Tue
        </div>
        <div className="flex mx-1 items-center w-10 h-10 justify-center ">
          Wed
        </div>
        <div className="flex mx-1 items-center w-10 h-10 justify-center ">
          Thu
        </div>
        <div className="flex mx-1 items-center w-10 h-10 justify-center ">
          Fri
        </div>
        <div className="flex mx-1 items-center w-10 h-10 justify-center ">
          Sat
        </div>
      </div>
      {renderCalendar()}
    </div>
  );
};

export default CustomDatePicker;
