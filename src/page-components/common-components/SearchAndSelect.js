import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import Avatar from "react-avatar";
import { useDispatch } from "react-redux";
import useDebounceQuery from "./dobounce/useDebounceQuery";
import { startCase } from "../utils/startCase";
import { setDashboardDrawer } from "../../redux-store/slice/checkInDrawerSlice";
import RenderTooltipComponent from "./RenderTooltipComponent";
import { useTranslation } from "react-i18next";

const SearchAndSelect = ({
  placeholder = "Select an option",
  onSelect = () => {},
  width = "w-full",
  className = "",
  disabled = false,
  onChange = () => {},
  name = "",
  patientList,
  getPatientList,
  isPatientListLoading,
  isOnClear = false,
  prefixIcon = faMagnifyingGlass,
  setIsOnClear = () => {},
  defaultOptions = {},
  allowPressEnter = true,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropDownRef = useRef(null);
  const optionRefs = useRef([]);
  const dispatch = useDispatch();
  const { query = "", debounceQuery } = useDebounceQuery();

  const handleOptionClick = (item) => {
    setInputValue(item?.name);
    onSelect(item);
    onChange({ target: { name: name, value: item } });
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // onChange({ target: { name: name, value: e.target.value } });
    setIsOpen(true);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault(); // Prevent default scrolling behavior
      setIsOpen(true);
      setSelectedIndex((prevIndex) =>
        prevIndex < patientList.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault(); // Prevent default scrolling behavior
      setIsOpen(true);
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : patientList.length - 1
      );
    } else if (e.key === "Enter" && allowPressEnter) {
      e.preventDefault();
      if (selectedIndex >= 0) {
        handleOptionClick(patientList[selectedIndex]);
      }
    } else if (e.key === "Tab") {
      setIsOpen(false);
    }
  };

  const handleClickOutside = (event) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    debounceQuery(inputValue);
  }, [debounceQuery, inputValue]);

  useEffect(() => {
    if (isOnClear) {
      setInputValue("");
    }
    getPatientList(query);
  }, [query, getPatientList, isOnClear]);

  useEffect(() => {
    onChange({ target: { name: name, value: defaultOptions } });
    setInputValue(defaultOptions.name);
    // eslint-disable-next-line
  }, [defaultOptions]);

  useEffect(() => {
    if (selectedIndex >= 0 && optionRefs.current[selectedIndex]) {
      optionRefs.current[selectedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  return (
    <div className="relative w-full" ref={dropDownRef}>
      <div
        onClick={() => {
          setIsOpen((prev) => !prev);
          setIsOnClear(false);
        }}
        className="relative"
      >
        <div className="absolute left-4 top-2">
          <FontAwesomeIcon icon={prefixIcon} size="sm" color="#6B7280" />
        </div>
        <input
          type="search"
          value={inputValue || ""}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleInputChange}
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
          className={`absolute ${width} max-h-96 px-4 overflow-y-auto bg-white border border-gray-300 z-50 rounded-md shadow-md`}
        >
          {isPatientListLoading ? (
            <div className="flex p-2  justify-center items-center">
              Loading...{" "}
            </div>
          ) : patientList?.length > 0 ? (
            patientList.reverse().map((item, index) => {
              const { name, age, thumbnail, address, gender } = item || {};
              return (
                <div
                  key={index}
                  style={{ boxShadow: "0 0 2px rgb(44 62 80 / 20%)" }}
                  onClick={() => handleOptionClick(item)}
                  ref={(el) => (optionRefs.current[index] = el)} // Assign ref to each option
                  className={`
                     hover:bg-[#E4FFFB] bg-[#F9FAFB]
                   flex items-center gap-4 overflow-y-hidden rounded-lg my-2 cursor-pointer p-2 ${
                     selectedIndex === index ? "bg-[#E4FFFB]" : ""
                   }`}
                >
                  {thumbnail === undefined ||
                  thumbnail === "" ||
                  thumbnail === null ? (
                    <Avatar name={name} size="30" round={true} />
                  ) : (
                    <img
                      src={`data:image/jpeg;base64,${thumbnail}`}
                      alt="thumbnail"
                      className="h-10 w-10 rounded-full"
                    />
                  )}
                  <div>
                    <div className="text-[#192739F0] flex hover:text-[#233876] text-xs">
                      <span className="me-1 flex-shrink-0">
                        <RenderTooltipComponent content={name} maxLength={32} />
                      </span>
                      | <span className="mx-1">{startCase(gender)} </span> |{" "}
                      <span className="ms-1"> {age}</span>
                    </div>
                    <div className="text-[#1B2B41B0] hover:text[#006AF5] text-xs">
                      {address}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex justify-center p-2">
              {t("No matching data found !")}
            </div>
          )}
          <div className="-mx-4">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(
                  setDashboardDrawer({
                    userDrawer: true,
                    checkInDrawer: false,
                    skipABHA: false,
                    createABHAbyAadhaar: false,
                    createABHAaddress: false,
                  })
                );
              }}
              className="flex shadow border rounded-b-md w-full justify-center disabled:border-[#E5E7EA] disabled:bg-[#E5E7EB] disabled:text-[#1F2A37]  border-[#006AF5] item-center py-2 text-sm text-[#006AF5]"
            >
              <span className="me-4">
                <FontAwesomeIcon icon={faPlus} />
              </span>
              Add New Patient
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndSelect;
