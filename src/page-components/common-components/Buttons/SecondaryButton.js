import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SecondaryButton = ({
  buttonName = "Button Add",
  onClick = () => {},
  showIcon = false,
  icon = faPlus,
  disabled = false,
  width = "w-fit",
  paddingX = "px-4",
  className = "active:bg-[#1C64F2] h-10 disabled:border-[#C6C7C9] flex items-center hover:border-2 hover:border-[#4C6AF7] border justify-center disabled:border disabled:bg-[#F9FAFB] disabled:text-[#A2A3A7]  border-[#4C6AF7] item-center py-2 rounded-lg text-sm text-[#4C6AF7]",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${width} ${paddingX}`}
    >
      {showIcon && (
        <span className="me-2">
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
      {buttonName}
    </button>
  );
};

export default SecondaryButton;
