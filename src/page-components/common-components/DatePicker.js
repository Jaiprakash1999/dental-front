import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const DatePicker = ({
  value = "",
  onChange = () => {},
  required = false,
  name = "",
  onPreviousDate = () => {},
  onNextDate = () => {},
}) => {
  return (
    <div className="relative text-[#2D2E33] hover:border-[#2D2E33] rounded-lg border placeholder:text-[#A2A3A7] border-[#D1D5DB] text-smborder me-4 px-8 flex items-center">
      <div className="absolute left-3">
        <button onClick={onPreviousDate} className=" active:animate-bounce">
          <FontAwesomeIcon icon={faAngleLeft} color="#1F2A37" />
        </button>
      </div>
      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className=" focus:outline-none focus:border-[#2D2E33]"
        style={{ padding: "7px" }}
      />
      <div className=" absolute  left-48">
        <button onClick={onNextDate} className=" active:animate-bounce">
          <FontAwesomeIcon icon={faAngleRight} color="#1F2A37" />
        </button>
      </div>
    </div>
  );
};

export default DatePicker;
