import React, { memo, useEffect, useRef, useState } from "react";
import SearchInput from "../../../common-components/SearchInput";
import Avatar from "react-avatar";
import { startCase } from "../../../utils/startCase";
import { useDispatch } from "react-redux";
import { setPrescriptionData } from "../../../../redux-store/slice/prescriptionDataSlice";
import useGetAllTemplate from "./hooks/useGetAllTemplate";
import { useTranslation } from "react-i18next";

const SelectPrescriptionTemplate = ({
  prescriptionTemplate,
  setPrescriptionTemplate,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const templateRef = useRef(null);
  const optionRefs = useRef([]); // To store refs for each option
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const handleClickOutside = (event) => {
    if (templateRef.current && !templateRef.current.contains(event.target)) {
      setTimeout(() => {
        setPrescriptionTemplate(false);
      }, 50);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line
  }, [prescriptionTemplate]);

  const handleSelect = (data) => {
    dispatch(setPrescriptionData(data));
    setPrescriptionTemplate(false);
  };

  const {
    allTemplate = [],
    isTemplateLoading,
    getAllTemplate,
  } = useGetAllTemplate();

  const [searchTerm, setSearchTerm] = useState("");
  // const [filteredTemplate, setFilteredTemplate] = useState(allTemplate);

  const onChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    getAllTemplate(searchTerm);
    // const filtered = allTemplate.filter((option) => {
    //   const chiefComplaint = option.chiefComplaint?.toLowerCase() || "";
    //   const templateName = option.templateName?.toLowerCase() || "";
    //   const search = searchTerm?.toLowerCase() || "";

    //   return chiefComplaint.includes(search) || templateName.includes(search);
    // });

    // setFilteredTemplate(filtered);
    // eslint-disable-next-line
  }, [searchTerm]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault(); // Prevent default scrolling behavior
      setPrescriptionTemplate(true);
      setSelectedIndex((prevIndex) =>
        prevIndex < allTemplate.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault(); // Prevent default scrolling behavior
      setPrescriptionTemplate(true);
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : allTemplate.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) {
        handleSelect(allTemplate[selectedIndex]);
      }
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

  return (
    <div
      ref={templateRef}
      className="bg-white relative w-full max-h-96 overflow-y-scroll rounded-lg"
      style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="fixed bg-white p-4 w-1/2">
        <SearchInput
          inputValue={searchTerm}
          onChange={onChange}
          placeholder={t("search template")}
          autoFocus={true}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="mt-14 p-4">
        {isTemplateLoading ? (
          <div className="flex justify-center">Loading... </div>
        ) : (
          <>
            {allTemplate.length > 0 ? (
              allTemplate.map((item, index) => {
                const { templateName, chiefComplaint, diagnosis } = item || {};
                return (
                  <div
                    key={index}
                    // onClick={() => handleSelect(prescriptionData)}
                    onClick={() => handleSelect(item)}
                    ref={(el) => (optionRefs.current[index] = el)}
                    className={`flex gap-3 cursor-pointer border-b last:border-none  hover:bg-yellow-200 p-2 ${
                      selectedIndex === index ? "bg-yellow-200" : ""
                    }`}
                  >
                    <Avatar name={templateName} size="30" round={true} />
                    <div>
                      <div className="text-[#1F2A37]">
                        {startCase(templateName)}
                      </div>
                      <div className="text-[#6B7280] hover:text-[#1F2A37] font-light text-sm">
                        <span className="gap-2 flex flex-wrap">
                          {chiefComplaint}
                        </span>
                      </div>
                      <div className="text-[#6B7280] hover:text-[#1F2A37] font-light text-sm">
                        <span className="text-sm flex-wrap gap-2 flex">
                          {(diagnosis || []).map((item, index) => (
                            <div className="flex flex-wrap" key={index}>
                              {startCase(item)}
                              <span
                                className={`${
                                  diagnosis.length - 1 === index ? "hidden" : ""
                                }`}
                              >
                                ,
                              </span>
                            </div>
                          ))}
                        </span>
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
          </>
        )}
      </div>
    </div>
  );
};

export default memo(SelectPrescriptionTemplate);
