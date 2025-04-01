import {
  faSortDown,
  faSortUp,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useEffect, useRef, useState } from "react";
import { FORMAT_VISIT_TAGS } from "../utils/userType";
import { startCase } from "../utils/startCase";

const MultiSelect = ({
  placeholder = "Select an option",
  onSelect = () => {},
  readOnly = true,
  width = "w-full",
  options = [],
  required = true,
  labelKey = "label",
  valueKey = "value",
  className = "",
  disabled = false,
  showIcon = true,
  multiple = false,
  onChange = () => {},
  upIcon = faSortUp,
  downIcon = faSortDown,
  iconTopPositionOpen = "top-2",
  iconTopPositionClose = "top-0.5",
  name = "",
  defaultOptions = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(defaultOptions);
  const [inputValue, setInputValue] = useState("");

  const dropDownRef = useRef(null);

  const formatedOptions = options.map((option) => ({
    label: option[labelKey],
    value: option[valueKey],
  }));

  const [filteredOptions, setFilteredOptions] = useState(formatedOptions);

  const handleOptionClick = (option) => {
    const alreadySelected = selectedOptions.find(
      (item) => item.value === option.value
    );
    if (!alreadySelected) {
      setSelectedOptions([...selectedOptions, option]);
      onSelect([...selectedOptions, option]);
      setInputValue("");
    } else {
      setSelectedOptions((prev) =>
        prev.filter((item) => item.value !== option.value)
      );
    }
    setIsOpen(false);
  };

  const handleRemoveOption = (optionToRemove) => {
    const updatedOptions = selectedOptions.filter(
      (option) => option.value !== optionToRemove.value
    );
    setSelectedOptions(updatedOptions);
    onSelect(updatedOptions);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsOpen(true);
    const filtered = formatedOptions.filter((option) =>
      option.label.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleClickOutside = (event) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    onChange({
      target: {
        name: name,
        value: [...selectedOptions],
      },
    });
    // eslint-disable-next-line
  }, [selectedOptions]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative w-full" ref={dropDownRef}>
      <button onClick={() => setIsOpen((prev) => !prev)} className="w-full">
        <div className="relative">
          <input
            type="text"
            readOnly={readOnly}
            value={multiple ? "" : inputValue}
            placeholder={selectedOptions.length !== 0 ? "" : placeholder}
            disabled={disabled}
            required={required}
            onChange={handleInputChange}
            className={
              className === ""
                ? `border ${width} focus:border-[#2D2E33] text-sm text-gray-800 py-1.5 focus:outline-none bg-[#F9FAFB] rounded-lg placeholder:text-[#D1D5DB] px-2 pr-8`
                : className
            }
          />
          {showIcon && (
            <div
              className={`absolute ${
                isOpen ? iconTopPositionOpen : iconTopPositionClose
              } right-2`}
            >
              <FontAwesomeIcon
                color="#6B7280"
                icon={isOpen ? upIcon : downIcon}
              />
            </div>
          )}
        </div>
        {multiple && (
          <div className="absolute left-2 flex w-[85%] overflow-scroll top-1.5">
            {selectedOptions.map((option) => (
              <div
                key={option.value}
                className="bg-[#FDE8E8] text-xs gap-1 text-[#9B1C1C] rounded-md px-1.5  py-0.5 mr-1 mb-1 flex-shrink-0 items-center"
              >
                <span className="mr-1">
                  {name === "tags"
                    ? FORMAT_VISIT_TAGS[option.label]
                    : startCase(option.label)}
                </span>
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={() => handleRemoveOption(option)}
                  className="cursor-pointer"
                  color="#F05252"
                />
              </div>
            ))}
          </div>
        )}
      </button>
      {isOpen && (
        <div
          className={`absolute ${width} max-h-60 overflow-y-auto bg-white border border-gray-300 z-50 rounded-md shadow-md`}
        >
          {filteredOptions.map((option) => {
            const isCompleted = selectedOptions.some(
              (selected) => selected.value === option.value
            );

            return (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className={`px-4 py-2 border-b overflow-y-auto text-gray-600 gap-2 last:border-none cursor-pointer hover:bg-blue-100 text-sm flex items-center`}
              >
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={() => handleOptionClick(option)}
                />{" "}
                <span>
                  {" "}
                  {name === "tags"
                    ? FORMAT_VISIT_TAGS[option.label]
                    : startCase(option.label)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default memo(MultiSelect);
