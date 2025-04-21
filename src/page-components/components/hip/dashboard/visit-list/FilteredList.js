import React, { useEffect, useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import CancellAppointment from "./CancellAppointment";
import { useNavigate } from "react-router-dom";
import ListLoader from "../../../../common-components/ListLoader";
import { startCase } from "../../../../utils/startCase";
import { ToastContainer } from "react-toastify";
import useGetAllVisit from "./hooks/useGetAllVisit";
import { firstLetterCapital } from "../../../../utils/firstLetterCapital";
import { useTranslation } from "react-i18next";
import { FORMAT_VISIT_TAGS } from "../../../../utils/userType";
import moment from "moment";

const STATUS_COLOR_MAPPING = {
  UPCOMING: "bg-[#E1EFFE] text-[#1F5084]",
  COMPLETED: "bg-[#DEF7EC] text-[#03543F]",
  CANCELLED: "bg-[#FDE8E8] text-[#9B1C1C]",
  "No Show": "bg-[#FDE8E8] text-[#9B1C1C]",
  MODIFIED: "bg-[#FDF6B2] text-[#723B13]",
};
const FilteredList = ({ patientVisitList = [] }) => {
  const { t } = useTranslation();
  const [selctedValue, setSelectedValue] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  const navigate = useNavigate();

  const handleRoute = (id) => {
    // navigate("/doctor");
    navigate("/doctor", {
      state: { id: id, visit: true },
    });
  };

  const onElipsis = (item) => {
    setCurrentItem(item);
    setSelectedValue(true);
  };

  const { isPatientVisitLoading, getAllPatientVisit, params } =
    useGetAllVisit();

  useEffect(() => {
    getAllPatientVisit();
  }, [params, getAllPatientVisit]);

  return (
    <div className="w-full h-[78.3vh] overflow-y-scroll">
      <ToastContainer />
      <div className="border border-t-0 border-r-0 border-l-0">
        <div className="flex w-full items-center uppercase bg-[#F9FAFB] text-sm font-medium text-gray-800">
          {/* <div className="w-[10%] ps-2 flex items-center py-3  border-[#B6B6B6] ">
            {t("Patient ID")}
          </div> */}
          <div className="w-[10%] py-3 ps-2  border-[#B6B6B6] ">
            {t("Token NO.")}
          </div>
          <div className="w-[10%] flex items-center py-3  border-[#B6B6B6] ">
            {t("Time Slot")}
          </div>
          <div className="w-[16%] py-3  items-center border-[#B6B6B6] ">
            {t("NAME")}
          </div>
          <div className="w-[8%] py-3  items-center border-[#B6B6B6] ">
            {t("GENDER")}
          </div>
          <div className="w-[7%] py-3  flex items-center border-[#B6B6B6] ">
            {t("AGE")}
          </div>
          <div className="w-[18%] py-3  flex items-center border-[#B6B6B6] ">
            {t("Chief COMPLAINT")}
          </div>
          <div className="w-[16%] py-3  flex items-center border-[#B6B6B6] ">
            {t("TAGS")}
          </div>
          <div className="w-[10%] flex items-center border-[#B6B6B6]  py-3 ">
            {t("VISIT STATUS")}
          </div>
          <div className="w-[5%] py-3 "></div>
        </div>
      </div>
      {isPatientVisitLoading ? (
        <ListLoader />
      ) : (
        <>
          {patientVisitList.length > 0 ? (
            (patientVisitList || []).map((item, index) => {
              const {
                name,
                chiefComplaint = [],
                gender,
                age,
                visitStatus,
                tokenNumber,
                tags,
                id,
                visitTime = [],
                // patientId,
              } = item || {};

              return (
                <div
                  key={index}
                  className="flex  cursor-pointer border-b border-[#E7F4FF]"
                >
                  {/* <button
                    onClick={() => handleRoute(id)}
                    disabled={visitStatus !== "UPCOMING"}
                    className="w-[10%] ps-2 items-center flex flex-shrink-0 flex-wrap py-3  border-[#B6B6B6] "
                  >
                    {patientId}
                  </button> */}
                  <button
                    onClick={() => handleRoute(id)}
                    disabled={visitStatus !== "UPCOMING"}
                    className="w-[10%] ps-2 items-center flex flex-shrink-0 flex-wrap py-3  border-[#B6B6B6] "
                  >
                    {tokenNumber}
                  </button>
                  <button
                    onClick={() => handleRoute(id)}
                    disabled={visitStatus !== "UPCOMING"}
                    className="w-[10%] items-center flex flex-shrink-0 flex-wrap py-3  border-[#B6B6B6] "
                  >
                    {visitTime?.map((item, index) => {
                      return (
                        <button key={index} className="me-1">
                          {moment(item).format("hh:mm A")}
                          {index === visitTime.length - 1 ? null : ","}
                        </button>
                      );
                    })}
                  </button>
                  <button
                    onClick={() => handleRoute(id)}
                    disabled={visitStatus !== "UPCOMING"}
                    className="w-[16%] items-center flex  flex-shrink-0 flex-wrap gap-1  py-3  border-[#B6B6B6] "
                  >
                    {name}
                  </button>
                  <button
                    onClick={() => handleRoute(id)}
                    disabled={visitStatus !== "UPCOMING"}
                    className="w-[8%] items-center flex py-3  border-[#B6B6B6] "
                  >
                    {gender}
                  </button>

                  <button
                    onClick={() => handleRoute(id)}
                    disabled={visitStatus !== "UPCOMING"}
                    className="w-[7%] items-center py-3  flex flex-wrap flex-shrink-0 border-[#B6B6B6] "
                  >
                    {age}
                  </button>
                  <button
                    onClick={() => handleRoute(id)}
                    disabled={visitStatus !== "UPCOMING"}
                    className="w-[18%] items-center flex-wrap flex-shrink-0 flex py-3  border-[#B6B6B6] "
                  >
                    {chiefComplaint.map((item, index) => {
                      return (
                        <button key={index} className="me-1">
                          {firstLetterCapital(item)}
                          {index === chiefComplaint.length - 1 ? null : ","}
                        </button>
                      );
                    })}
                  </button>
                  <button
                    onClick={() => handleRoute(id)}
                    disabled={visitStatus !== "UPCOMING"}
                    className="w-[16%] items-center flex flex-wrap gap-1 py-3  border-[#B6B6B6] "
                  >
                    {tags.map((tagName, index) => {
                      return (
                        <div key={index} className="">
                          {FORMAT_VISIT_TAGS[tagName]}
                          {index === tags.length - 1 ? null : ","}
                        </div>
                      );
                    })}
                  </button>
                  <button
                    onClick={() => handleRoute(id)}
                    disabled={visitStatus !== "UPCOMING"}
                    className="w-[10%] flex flex-shrink-0 items-center py-3  border-[#B6B6B6] "
                  >
                    <span
                      className={`${STATUS_COLOR_MAPPING[visitStatus]} px-2 py-1 rounded-lg`}
                    >
                      {startCase(visitStatus)}
                    </span>
                  </button>
                  <div className="w-[5%] flex justify-center items-center">
                    <button onClick={() => onElipsis(item)}>
                      <FaEllipsisVertical />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-2 text-center  text-gray-600">
              {t("Patient not found !")}
            </div>
          )}
        </>
      )}
      {selctedValue ? (
        <CancellAppointment
          showModal={selctedValue}
          onClose={() => setSelectedValue(false)}
          currentItem={currentItem}
        />
      ) : null}
    </div>
  );
};

export default FilteredList;
