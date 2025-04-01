import {
  faPlus,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setAddNewPatientByAbha } from "../../redux-store/slice/addPatientByAbhaSlice";
import { useTranslation } from "react-i18next";

const SelectOrAddNew = ({
  placeholder = "Select an option",
  onSelect = () => {},
  readOnly = false,
  width = "w-full",
  options = [],
  required = true,
  labelKey = "label",
  valueKey = "value",
  defaultOption = {},
  className = "",
  disabled = false,
  showIcon = true,
  onChange = () => {},
  name = "",
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const dropDownRef = useRef(null);
  const dispatch = useDispatch();

  const formatedOptions = options.map((option) => ({
    label: option[labelKey],
    value: option[valueKey],
  }));

  const [filteredOptions, setFilteredOptions] = useState(formatedOptions);

  const handleOptionClick = (option) => {
    setInputValue(option?.label);
    onSelect(option);
    onChange({ target: { name: name, value: option.value } });
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onChange({ target: { name: name, value: e.target.value } });
    setIsOpen(true);
  };

  const handleClickOutside = (event) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setFilteredOptions(formatedOptions);
    setInputValue(defaultOption?.label || "");
    onSelect(defaultOption);
    // eslint-disable-next-line
  }, [options]);

  useEffect(() => {
    if (!readOnly) {
      const filtered = formatedOptions.filter((option) =>
        option?.label?.toLowerCase()?.includes(inputValue?.toLowerCase())
      );

      setFilteredOptions(filtered);
    }
    // eslint-disable-next-line
  }, [inputValue, readOnly]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative w-full" ref={dropDownRef}>
      <div onClick={() => setIsOpen((prev) => !prev)}>
        <input
          type="text"
          readOnly={readOnly}
          value={inputValue}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onChange={handleInputChange}
          className={
            className === ""
              ? `border ${width} focus:border-[#2D2E33] border-[#D1D5DB] text-sm text-gray-800 py-1.5 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-2`
              : className
          }
        />
        {showIcon && (
          <div
            className={`px-2 absolute ${isOpen ? "top-2" : "top-0.5"} right-0`}
          >
            <FontAwesomeIcon
              color="#6B7280"
              icon={isOpen ? faSortUp : faSortDown}
            />
          </div>
        )}
      </div>
      {isOpen && (
        <div
          className={`absolute z-50 ${width} max-h-60 overflow-y-auto bg-white border border-gray-300 z-50 rounded-md shadow-md`}
        >
          {filteredOptions?.length > 0 ? (
            filteredOptions.map((option) => {
              return (
                <div
                  key={option.value}
                  onClick={() => handleOptionClick(option)}
                  className="px-4 py-2 border-b overflow-y-auto text-gray-600 last:border-none cursor-pointer hover:bg-blue-100 text-sm"
                >
                  {option.label}
                </div>
              );
            })
          ) : (
            <div className="flex justify-center p-2">
              {t("No matching data found !")}
            </div>
          )}
          <div>
            <button
              onClick={() => {
                dispatch(setAddNewPatientByAbha(true));
              }}
              className="flex shadow border rounded-b-md w-full justify-center disabled:border-[#E5E7EA] disabled:bg-[#E5E7EB] disabled:text-[#1F2A37]  border-[#006AF5] item-center px-4 py-2 text-sm text-[#006AF5]"
            >
              {showIcon && (
                <span className="me-4">
                  <FontAwesomeIcon icon={faPlus} />
                </span>
              )}
              {t("Add New Patient")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectOrAddNew;
