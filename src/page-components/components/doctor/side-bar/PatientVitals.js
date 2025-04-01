import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Bp from "../../../../images/bp.svg";
import React from "react";
import { useDispatch } from "react-redux";
import { setActiveDoctorTab } from "../../../../redux-store/slice/activeDoctorTab";
import useGetWellnessRecord from "../patient-details/patient-health-records/hooks/useGetWellnessRecord";
import Skeleton from "react-loading-skeleton";
import { formatDateTime, formatTime } from "../../../utils/formatDateTime";

const PatientVitals = () => {
  const dispatch = useDispatch();
  const { wellnessData = [], isWellDataLoading } = useGetWellnessRecord();

  return (
    <div
      style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)" }}
      className="bg-white h-screen overflow-y-scroll border border-t-0 border-r-0 mr-0.5"
    >
      <div className="flex border-b fixed w-[25%] py-2 ps-3 pe-5 justify-between items-center bg-white">
        <div className="text-[#6B7280] uppercase text-sm">VITALS</div>
        <button
          onClick={() => {
            dispatch(setActiveDoctorTab(null));
          }}
        >
          <FontAwesomeIcon icon={faXmark} color="#1F2A37" />
        </button>
      </div>

      <div className="pt-10 px-3 pb-36">
        {isWellDataLoading ? (
          [1, 2, 3, 4, 5].map((_, index) => (
            <Skeleton className="m-2" key={index} />
          ))
        ) : (
          <>
            {wellnessData.length === 0 ? (
              <div className="m-4">No record found !</div>
            ) : (
              wellnessData.map((vital, index) => {
                const {
                  dateCreated,
                  diastolicPressure,
                  systolicPressure,
                  breathRate,
                  height,
                  temperature,
                  weight,
                  pulseRate = "--",
                } = vital || {};
                return (
                  <div className="py-2" key={index}>
                    <div className="text-sm">
                      {formatDateTime(dateCreated)} | {formatTime(dateCreated)}
                    </div>
                    <div className="shadow  mt-2 p-2 rounded-md">
                      <div className="flex items-center">
                        <div className="text-[#6B7280] flex items-center text-sm">
                          BP
                        </div>
                        <div className="text-[#E02424] w-full flex justify-center items-center gap-4 font-medium text-xl">
                          {isWellDataLoading ? (
                            <Skeleton />
                          ) : (
                            `${systolicPressure}/${diastolicPressure}`
                          )}
                          <span className="bg-[#FDE8E8] rounded-full flex justify-center px-2 py-1.5 items-center">
                            <img src={Bp} alt="bp" />
                          </span>
                        </div>
                      </div>
                      <div className="flex my-2 w-full">
                        <div className="w-1/2 text-[#6B7280] text-sm font-light">
                          BMI
                        </div>
                        <div className="w-1/2 text-[#111928] text-sm">
                          {(
                            weight?.replace(/\D/g, "") /
                            ((height?.replace(/\D/g, "") / 100) *
                              (height?.replace(/\D/g, "") / 100))
                          ).toFixed(2)}
                        </div>
                      </div>
                      <div className="flex my-2 w-full">
                        <div className="w-1/2 text-[#6B7280] text-sm font-light">
                          Weight
                        </div>
                        <div className="w-1/2 text-[#111928] text-sm">
                          {weight}
                        </div>
                      </div>
                      <div className="flex my-2 w-full">
                        <div className="w-1/2 text-[#6B7280] text-sm font-light">
                          Height
                        </div>
                        <div className="w-1/2 text-[#111928] text-sm">
                          {height}
                        </div>
                      </div>
                      <div className="flex my-2 w-full">
                        <div className="w-1/2 text-[#6B7280] text-sm font-light">
                          Temperature
                        </div>
                        <div className="w-1/2 text-[#111928] text-sm">
                          {temperature}
                        </div>
                      </div>
                      <div className="flex my-2 w-full">
                        <div className="w-1/2 text-[#6B7280] text-sm font-light">
                          Pulse rate
                        </div>
                        <div className="w-1/2 text-[#111928] text-sm">
                          {pulseRate}
                        </div>
                      </div>
                      <div className="flex my-2 w-full">
                        <div className="w-1/2 text-[#6B7280] text-sm font-light">
                          Breath Rate
                        </div>
                        <div className="w-1/2 text-[#111928] text-sm">
                          {breathRate}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PatientVitals;
