import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const TertiaryButton = ({
  buttonName = "Button Add",
  onClick = () => {},
  showIcon = false,
  icon = faPlus,
  disabled = false,
  width = "w-fit",
  paddingX = "px-4",
  paddingY = "py-2",
  className = "flex border flex-nowrap flex-shrink-0 hover:border-[#1F2A37] disabled:bg-[#F9FAFB] items-center justify-center bg-white border-[#C6C7C9] item-center py-2 rounded-lg text-sm text-[#1F2A37]",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${width} ${paddingX} ${paddingY}`}
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

export default TertiaryButton;
