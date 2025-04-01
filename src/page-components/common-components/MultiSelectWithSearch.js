import {
  faSearch,
  faSortDown,
  faSortUp,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useEffect, useRef, useState } from "react";
// import isEqual from "lodash/isEqual";
import { startCase } from "../utils/startCase";
import tagCross from "../../images/tag_cross.svg";
import { FORMAT_VISIT_TAGS } from "../utils/userType";
import { useTranslation } from "react-i18next";

const MultiSelectWithSearch = ({
  placeholder = "Select an option",
  onSelect = () => {},
  readOnly = false,
  width = "w-full",
  options = [],
  required = true,
  labelKey = "",
  valueKey = "",
  className = "",
  disabled = false,
  showIcon = true,
  multiple = false,
  onChange = () => {},
  defaultOptions = [],
  name = "",
  textColor = "",
  buttonColor = "",
  showPrefixIcon = true,
  isOnClear = false,
  setIsOnClear = () => {},
  deleteIcon = faTrashCan,
  upIcon = faSortUp,
  downIcon = faSortDown,
  openTopPosition = "top-2",
  closeTopPosition = "top-0.5",
  allowPressEnter = true,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(defaultOptions);
  const [inputValue, setInputValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const dropDownRef = useRef(null);

  const formatedOptions = options.map((option) => ({
    label: option[labelKey],
    value: option[valueKey],
  }));

  const [filteredOptions, setFilteredOptions] = useState(formatedOptions);

  const handleOptionClick = (option) => {
    setSelectedIndex(-1);
    const alreadySelected = selectedOptions.find(
      (item) => item.value === option.value
    );
    if (!alreadySelected) {
      setSelectedOptions((prev) => [option, ...prev]);
      onSelect([...selectedOptions, option]);
      setInputValue("");
      setIsOpen(false);
    }
  };

  const handleRemoveOption = (optionToRemove, e) => {
    e.preventDefault();
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
    setSelectedIndex(-1);
  };

  const handleClickOutside = (event) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     const value = startCase(e.target.value);
  //     const newOption = { label: value, value: value };
  //     setSelectedOptions([newOption, ...selectedOptions]);
  //     setInputValue("");
  //     setIsOpen(false);
  //   }
  // };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault(); // Prevent default scrolling behavior
      setIsOpen(true);
      setSelectedIndex((prevIndex) =>
        prevIndex < options.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault(); // Prevent default scrolling behavior
      setIsOpen(true);
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : options.length - 1
      );
    } else if (e.key === "Enter" && allowPressEnter) {
      e.preventDefault();
      if (selectedIndex >= 0) {
        handleOptionClick(options[selectedIndex]);
      } else if (e.target.value.trim() !== "") {
        const newOption = {
          label: startCase(e.target.value),
          value: startCase(e.target.value),
        };
        setSelectedOptions([newOption, ...selectedOptions]);
        setInputValue("");
        setIsOpen(false);
      }
    }
  };

  useEffect(() => {
    setFilteredOptions(
      formatedOptions.filter(
        (option) =>
          !selectedOptions.some((selected) => selected.value === option.value)
      )
    );
    onChange({
      target: {
        name: name,
        value: selectedOptions.map((item) => item.value),
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

  // useEffect(() => {
  //   if (!isEqual(selectedOptions, defaultOptions)) {
  //     setSelectedOptions(defaultOptions);
  //   }
  //   // eslint-disable-next-line
  // }, [defaultOptions]);

  useEffect(() => {
    setFilteredOptions(formatedOptions);
    // eslint-disable-next-line
  }, [options]);

  useEffect(() => {
    if (isOnClear) {
      setSelectedOptions([]);
    }
  }, [isOnClear]);

  return (
    <div className="relative w-full text-primary text-sm" ref={dropDownRef}>
      <div
        onClick={() => {
          setIsOpen((prev) => !prev);
          setIsOnClear(false);
        }}
        className="relative"
      >
        <div className="flex items-center relative">
          {showPrefixIcon && (
            <div className="absolute left-4">
              <FontAwesomeIcon icon={faSearch} color="#9CA3AF" />
            </div>
          )}
          <input
            type="text"
            readOnly={readOnly}
            value={inputValue}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={
              className === ""
                ? `border ${width} focus:border-[#2D2E33] text-sm text-gray-800 py-1.5 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-2 pr-8`
                : className
            }
          />
        </div>
        {showIcon && (
          <div
            className={`absolute ${
              isOpen ? openTopPosition : closeTopPosition
            } right-2`}
          >
            <FontAwesomeIcon
              color="#6B7280"
              icon={isOpen ? upIcon : downIcon}
            />
          </div>
        )}
      </div>
      {isOpen && (
        <div
          className={`absolute ${width} max-h-60 overflow-y-auto bg-white border border-gray-300 z-50 rounded-md shadow-md`}
        >
          {filteredOptions?.length > 0 ? (
            filteredOptions.map((option, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`px-4 py-2 border-b overflow-y-scroll text-gray-600 last:border-none cursor-pointer hover:bg-blue-100 text-sm ${
                    selectedIndex === index ? "bg-blue-100" : ""
                  }`}
                >
                  <span>
                    {name === "tags"
                      ? FORMAT_VISIT_TAGS[option?.label]
                      : startCase(option?.label)}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="flex justify-center p-2">
              {t("No matching data found !")}
            </div>
          )}
        </div>
      )}
      {multiple && (
        <div className="mt-3">
          {selectedOptions.map((option, index) => (
            <div
              key={index}
              className="flex mb-3 bg-[#E5E7EB] text-[#000000] gap-2 rounded-xl justify-between border px-4 py-2 w-fit "
            >
              <div
                className={`${
                  textColor === "" ? "text-[#000000]" : `text-[${textColor}]`
                }`}
              >
                {name === "tags"
                  ? FORMAT_VISIT_TAGS[option?.label]
                  : startCase(option?.label)}
              </div>
              <button
                className="px-1 rounded border-[#E7F4FF]"
                onClick={(e) => handleRemoveOption(option, e)}
              >
                <img src={tagCross} alt="tagCross" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(MultiSelectWithSearch);
