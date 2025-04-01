import React, { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { startCase } from "../utils/startCase";
import useDebounceQuery from "./dobounce/useDebounceQuery";
import { useDispatch, useSelector } from "react-redux";
import { setPrescriptionData } from "../../redux-store/slice/prescriptionDataSlice";
import { useTranslation } from "react-i18next";

const SearchAndSelectDrug = ({
  width = "w-full",
  className = "",
  placeholder = "Type to search ...",
  isLoading,
  options = [],
  // onChange = () => {},
  // name = "",
  defaultOptions = {},
  currentIndex = "",
  allowPressEnter = true,
  getData = () => {},
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const prescriptionData = useSelector((state) => state.prescriptionData);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(defaultOptions.label);
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

  const handleOptionClick = async (item) => {
    const { label } = item || {};
    const newValue = startCase(label);
    // lingo === null || lingo === "" ? startCase(label) : startCase(lingo);
    setInputValue(newValue);
    // onChange({ target: { name: name, value: startCase(label) } });
    const updatedMedication = [...prescriptionData.rxList];

    updatedMedication[currentIndex] = {
      ...updatedMedication[currentIndex],
      drugName: label,
    };

    dispatch(
      setPrescriptionData({
        ...prescriptionData,
        rxList: updatedMedication,
      })
    );

    setIsOpen(false);
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
        const value = startCase(e.target.value);
        setInputValue(value);

        // onChange({ target: { name: name, value: startCase(label) } });
        const updatedMedication = [...prescriptionData.rxList];

        updatedMedication[currentIndex] = {
          ...updatedMedication[currentIndex],
          drugName: value,
        };
        dispatch(
          setPrescriptionData({
            ...prescriptionData,
            rxList: updatedMedication,
          })
        );

        setIsOpen(false);
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
    if (
      defaultOptions.label !== undefined ||
      defaultOptions.lingo !== undefined
    ) {
      const newValue =
        defaultOptions.lingo === null ||
        defaultOptions.lingo === "" ||
        defaultOptions.lingo === undefined
          ? startCase(defaultOptions.label)
          : startCase(defaultOptions.lingo);
      setInputValue(newValue);

      // onChange({
      //   target: { name: name, value: startCase(defaultOptions.label) },
      // });

      const updatedMedication = [...prescriptionData.rxList];

      updatedMedication[currentIndex] = {
        ...updatedMedication[currentIndex],
        drugName: defaultOptions.label,
      };

      dispatch(
        setPrescriptionData({
          ...prescriptionData,
          rxList: updatedMedication,
        })
      );
    }
    // eslint-disable-next-line
  }, [defaultOptions.label]);

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
    <div className="relative w-full" ref={dropDownRef}>
      <div onClick={() => setIsOpen((prev) => !prev)}>
        <input
          type="text"
          onChange={handleChange}
          placeholder={t(placeholder)}
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
              {[1, 2, 3, 4, 5].map((_, index) => {
                return (
                  <div key={index} className="border-b py-2">
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
                    // if (label === null) return null;
                    return (
                      <div
                        key={index}
                        style={{ boxShadow: "0 0 2px rgb(44 62 80 / 20%)" }}
                        onClick={() => handleOptionClick(item)}
                        ref={(el) => (optionRefs.current[index] = el)} // Assign ref to each option
                        className={`px-4 py-2 border-b overflow-y-scroll text-gray-600 last:border-none cursor-pointer hover:bg-blue-100 text-sm ${
                          selectedIndex === index ? "bg-blue-100" : ""
                        }`}
                        // className="px-4 py-2 border-b overflow-y-auto text-gray-600 last:border-none cursor-pointer hover:bg-blue-100 text-sm"
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
    </div>
  );
};

export default SearchAndSelectDrug;
