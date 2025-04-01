import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const AlertButton = ({
  buttonName = "Button",
  onClick = () => {},
  showIcon = false,
  icon = faPlus,
  disabled = false,
  type = "button",
  width = "w-fit",
  paddingX = "px-4",
  paddingY = "py-2",
  className = "bg-[#C81E1E] flex-shrink-0 flex-nowrap  disabled:bg-[#F9FAFB] disabled:border-[#C6C7C9] disabled:text-[#A2A3A7] flex justify-center item-center rounded-lg text-sm text-[#FFFFFF]",
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${className} ${width} ${paddingX} ${paddingY}`}
      onClick={onClick}
    >
      {showIcon && (
        <span className="me-4">
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
      {buttonName}
    </button>
  );
};

export default AlertButton;
