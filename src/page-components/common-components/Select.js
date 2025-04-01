import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { startCase } from "../utils/startCase";
import { useTranslation } from "react-i18next";

const Select = ({
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
  downIcon = faSortDown,
  upIcon = faSortUp,
  openTopPosition = "top-2",
  closeTopPosition = "top-1",
  allowPressEnter = true,
  isOnClear = false,
  setIsOnClear = () => {},
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropDownRef = useRef(null);
  const optionRefs = useRef([]); // To store refs for each option

  const formatedOptions = options.map((option) => ({
    label: option[labelKey],
    value: option[valueKey],
  }));

  const [filteredOptions, setFilteredOptions] = useState(formatedOptions);

  const handleOptionClick = (option) => {
    const selctedValue =
      name === "measurement" ? t(option?.label) : startCase(t(option?.label));
    setInputValue(selctedValue);
    onSelect(option);
    onChange({
      target: {
        name: name,
        value:
          name === "measurement"
            ? t(option?.value)
            : startCase(t(option.value)),
      },
    });
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // onChange({ target: { name: name, value: e.target.value } });
    setIsOpen(true);
    setSelectedIndex(-1);
  };

  const handleClickOutside = (event) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter" && allowPressEnter) {
  //     const value = startCase(e.target.value);
  //     const newOption = { label: value, value: value };
  //     setInputValue(value);
  //     onSelect(newOption);
  //     onChange({ target: { name: name, value: newOption.value } });
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
        const value =
          name === "measurement" ? e.target.value : startCase(e.target.value);
        const newOption = { label: value, value: value };
        setInputValue(value);
        onSelect(newOption);
        onChange({ target: { name: name, value: newOption.value } });
        setIsOpen(false);
      }
    } else if (e.key === "Tab") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (selectedIndex >= 0 && optionRefs.current[selectedIndex]) {
      optionRefs.current[selectedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  // useEffect(() => {
  //   setFilteredOptions(formatedOptions);
  //   setInputValue(defaultOption?.label || "");
  //   onSelect(defaultOption);
  // }, [options]);

  useEffect(() => {
    if (defaultOption && Object.keys(defaultOption).length > 0) {
      setInputValue(defaultOption?.label || "");
      onSelect(defaultOption);
    }
    // eslint-disable-next-line
  }, [defaultOption]);
  useEffect(() => {
    if (isOnClear) {
      setInputValue("");
    }
  }, [isOnClear]);

  useEffect(() => {
    setFilteredOptions(formatedOptions);
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
      <div
        onClick={() => {
          setIsOpen((prev) => !prev);
          setIsOnClear(false);
        }}
      >
        <input
          type="text"
          readOnly={readOnly}
          value={inputValue}
          placeholder={t(placeholder)}
          disabled={disabled}
          required={required}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={
            className === ""
              ? `border ${width} focus:border-[#2D2E33] border-[#D1D5DB] text-sm text-gray-800 py-1.5 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-2`
              : className
          }
        />
        {showIcon && (
          <div
            className={`px-2 absolute ${
              isOpen ? openTopPosition : closeTopPosition
            } right-0`}
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
                  ref={(el) => (optionRefs.current[index] = el)} // Assign ref to each option
                  onClick={() => handleOptionClick(option)}
                  className={`px-4 py-2 border-b overflow-y-scroll text-gray-600 last:border-none cursor-pointer hover:bg-blue-100 text-sm ${
                    selectedIndex === index ? "bg-blue-100" : ""
                  }`}
                  // className="px-4 py-2 border-b overflow-y-auto text-gray-600 last:border-none cursor-pointer hover:bg-blue-100 text-sm"
                >
                  {name === "measurement"
                    ? t(option?.label)
                    : startCase(t(option?.label))}
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
    </div>
  );
};

export default Select;
