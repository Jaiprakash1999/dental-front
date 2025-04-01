import React, { memo, useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { startCase } from "../utils/startCase";
import useDebounceQuery from "./dobounce/useDebounceQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { isEqual } from "lodash";
import { useTranslation } from "react-i18next";

const MultiSelectLabTestWithAPIsearch = ({
  width = "w-full",
  className = "",
  placeholder = "Type to search ...",
  isLoading,
  options = [],
  isEditable = true,
  onChange = () => {},
  name = "",
  defaultOptions = [],
  allowPressEnter = true,
  getData = () => {},
  buttonColor = "",
  textColor = "",
  multiple = true,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedOptions, setSelectedOptions] = useState(defaultOptions);

  const dropDownRef = useRef(null);
  const optionRefs = useRef([]);

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
    setSelectedOptions((prev) => [
      ...prev,
      { labInvestigation: option, result: null, note: "" },
    ]);
    setInputValue("");
    setIsOpen(false);
  };

  const handleRemoveOption = (optionToRemove, e) => {
    e.preventDefault();
    const updatedOptions = selectedOptions.filter(
      (option) => option.labInvestigation !== optionToRemove
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
      } else if (e.target.value.trim() !== "") {
        const newOption = {
          labInvestigation: e.target.value,
          result: null,
          note: "",
        };
        setSelectedOptions((prev) => [newOption, ...prev]);
        setInputValue("");
        setIsOpen(false);
      }
    } else if (e.key === "Tab") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    onChange({
      target: {
        name: name,
        value: selectedOptions,
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

  const handleCheckboxChange = (index, value) => {
    setSelectedOptions((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, result: item.result === value ? null : value }
          : item
      )
    );
  };

  const handleNoteChange = (index, value) => {
    setSelectedOptions((prev) =>
      prev.map((item, i) => (i === index ? { ...item, note: value } : item))
    );
  };

  return (
    <div className="relative w-full" ref={dropDownRef}>
      <div onClick={() => setIsOpen((prev) => !prev)}>
        <input
          type="text"
          onChange={handleChange}
          placeholder={t(placeholder)}
          value={inputValue}
          disabled={disabled}
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
                    const { labInvestigation } = item || {};

                    return (
                      <div
                        key={index}
                        ref={(el) => (optionRefs.current[index] = el)} // Assign ref to each option
                        style={{ boxShadow: "0 0 2px rgb(44 62 80 / 20%)" }}
                        onClick={() => handleOptionClick(labInvestigation)}
                        className={`px-4 py-2 border-b overflow-y-scroll text-gray-600 last:border-none cursor-pointer hover:bg-blue-100 text-sm ${
                          selectedIndex === index ? "bg-blue-100" : ""
                        }`}
                      >
                        {inputValue === "" ? (
                          startCase(labInvestigation)
                        ) : (
                          <div>
                            {labInvestigation
                              .toLowerCase()
                              .includes(inputValue.toLowerCase())
                              ? labInvestigation
                                  .split(new RegExp(`(${inputValue})`, "gi"))
                                  .map((part, index) =>
                                    part.toLowerCase() ===
                                    inputValue.toLowerCase() ? (
                                      <span
                                        key={index}
                                        className="text-[#006AF5]"
                                      >
                                        {part}
                                      </span>
                                    ) : (
                                      part
                                    )
                                  )
                              : startCase(labInvestigation)}
                          </div>
                        )}
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
          {selectedOptions.map((option, index) => {
            if (option.labInvestigation === "") {
              return null;
            }
            return (
              <div
                key={index}
                className="flex mb-3 items-center rounded-md justify-between border p-2 w-full"
              >
                <div
                  style={{ color: textColor === "" ? "#006AF5" : textColor }}
                >
                  {startCase(option?.labInvestigation)}
                </div>
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={option.result === "Positive"}
                    onChange={() => handleCheckboxChange(index, "Positive")}
                  />
                  +ve
                </label>

                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={option.result === "Negetive"}
                    onChange={() => handleCheckboxChange(index, "Negetive")}
                  />
                  -ve
                </label>

                <input
                  type="text"
                  placeholder={t("Other")}
                  value={option.note}
                  onChange={(e) => handleNoteChange(index, e.target.value)}
                  className="border p-1 outline-none order-[#D1D5DB] text-sm focus:border-[#2D2E33] rounded w-60"
                />
                {isEditable ? (
                  <button
                    className="border px-1 rounded border-[#E7F4FF]"
                    onClick={(e) =>
                      handleRemoveOption(option?.labInvestigation, e)
                    }
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      color={buttonColor === "" ? "#6B7280" : buttonColor}
                    />
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default memo(MultiSelectLabTestWithAPIsearch);
