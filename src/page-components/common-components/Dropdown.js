import { faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import TertiaryButton from "./Buttons/TertiaryButton";

const Dropdown = ({
  options = [],
  onSelect = () => {},
  icon = "",
  width = "w-56",
  buttonName = "",
  showCheckbox = false,
  id = null,
}) => {
  const dropDownRef = useRef(null);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const handleOptionClick = (option) => {
    setIsPopoverOpen(false);
    onSelect(option, id);
  };

  const handleClickOutside = (event) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setIsPopoverOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopoverOpen]);

  return (
    <div className="relative" ref={dropDownRef}>
      <div onClick={() => setIsPopoverOpen((prev) => !prev)}>
        {icon !== "" ? <FontAwesomeIcon icon={icon} /> : null}
        {buttonName !== "" ? (
          <TertiaryButton buttonName="Tags" icon={faTag} showIcon />
        ) : null}
      </div>
      {isPopoverOpen ? (
        <div
          style={{ boxShadow: "0 0 8px rgb(44 62 80 / 20%)" }}
          className={`absolute py-1 ${width} overflow-y-auto bg-white z-50 right-0  rounded-md shadow-md`}
        >
          {options.map((option) => {
            return (
              <div
                onClick={() => {
                  handleOptionClick(option);
                }}
                key={option.value}
                className={`px-4 ${
                  option.value === "cancel_appointment"
                    ? "text-[#F05252]"
                    : "text-[#111928]"
                } py-1.5 border-b overflow-y-auto flex items-center last:border-none cursor-pointer hover:bg-blue-100 text-sm
              `}
              >
                {showCheckbox ? (
                  <input type="checkbox" className="me-2" />
                ) : null}
                <button>{option.label}</button>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
