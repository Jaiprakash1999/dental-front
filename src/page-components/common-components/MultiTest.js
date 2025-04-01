import React, { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { startCase } from "../utils/startCase";
import useDebounceQuery from "./dobounce/useDebounceQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { isEqual } from "lodash";
import { useTranslation } from "react-i18next";

const MultiTest = ({
  width = "w-full",
  className = "",
  placeholder = "Type to search ...",
  isLoading,
  options = [],
  onChange = () => {},
  name = "",
  defaultOptions = [],
  allowPressEnter = true,
  getData = () => {},
  buttonColor = "",
  textColor = "",
  multiple = true,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1); // To track highlighted option

  const dropDownRef = useRef(null);
  const optionRefs = useRef([]); // To store refs for each option

  const handleChange = (e) => {
    const { value } = e.target || {};
    setInputValue(value);
    setIsOpen(true);
    setSelectedIndex(-1);
  };

  const { query = "", debounceQuery } = useDebounceQuery();

  useEffect(() => {
    debounceQuery(inputValue);
  }, [debounceQuery, inputValue]);

  const handleClickOutside = (event) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOptions([option, ...selectedOptions]);
    setInputValue("");
    setIsOpen(false);
  };

  const handleRemoveOption = (optionToRemove) => {
    const updatedOptions = selectedOptions.filter(
      (option) => option.value !== optionToRemove.value
    );
    setSelectedOptions(updatedOptions);
  };

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
      } else {
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
    onChange({
      target: {
        name: name,
        value: selectedOptions.map((item) => item.value),
      },
    });
    // eslint-disable-next-line
  }, [selectedOptions]);

  useEffect(() => {
    if (!isEqual(selectedOptions, defaultOptions)) {
      setSelectedOptions(defaultOptions);
    }
    // eslint-disable-next-line
  }, [defaultOptions]);

  useEffect(() => {
    getData(query);
  }, [query, getData]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (selectedIndex >= 0 && optionRefs.current[selectedIndex]) {
      optionRefs.current[selectedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  return (
    <div className="relative w-full" ref={dropDownRef} tabIndex={0}>
      <div onClick={() => setIsOpen((prev) => !prev)}>
        <input
          type="text"
          onChange={handleChange}
          placeholder={placeholder}
          value={inputValue}
          onKeyDown={handleKeyDown}
          className={
            className === ""
              ? `border ${width} focus:border-[#2D2E33] border-[#D1D5DB] text-sm text-gray-800 py-1.5 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-2`
              : className
          }
        />
      </div>
      {isOpen && (
        <div
          className={`absolute w-full max-h-96 overflow-y-auto bg-white border border-gray-300 z-50 rounded-md shadow-md`}
        >
          {isLoading ? (
            <div className="flex flex-col justify-center items-center">
              {[1, 2, 3, 4, 5].map(() => {
                return (
                  <div className="border-b py-2">
                    {" "}
                    <Skeleton width={260} height={16} />
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              {options.length > 0 ? (
                <div>
                  {options.map((item, index) => {
                    const { label } = item || {};
                    return (
                      <div
                        ref={(el) => (optionRefs.current[index] = el)} // Assign ref to each option
                        key={index}
                        style={{ boxShadow: "0 0 2px rgb(44 62 80 / 20%)" }}
                        onClick={() => handleOptionClick(item)}
                        className={`px-4 py-2 border-b overflow-y-scroll text-gray-600 last:border-none cursor-pointer hover:bg-blue-100 text-sm ${
                          selectedIndex === index ? "bg-blue-100" : ""
                        }`}
                      >
                        <div>{startCase(label)}</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex justify-center p-2">
                  {t("No matching data found !")}
                </div>
              )}
            </>
          )}
        </div>
      )}
      {multiple && (
        <div className="mt-3">
          {selectedOptions.map((option, index) => (
            <div
              key={index}
              className="flex mb-3 rounded-md justify-between border p-2 w-full"
            >
              <div style={{ color: textColor === "" ? "#006AF5" : textColor }}>
                {startCase(option?.label)}
              </div>
              <button
                className="border px-1 rounded border-[#E7F4FF]"
                onClick={() => handleRemoveOption(option)}
              >
                <FontAwesomeIcon
                  icon={faTrashCan}
                  color={buttonColor === "" ? "#6B7280" : buttonColor}
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiTest;
