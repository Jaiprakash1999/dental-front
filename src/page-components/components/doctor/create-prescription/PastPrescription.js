import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Eye from "../../../../images/grayEye.svg";
import Duplicate from "../../../../images/duplicate.svg";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveDoctorTab } from "../../../../redux-store/slice/activeDoctorTab";
import { setPrescriptionData } from "../../../../redux-store/slice/prescriptionDataSlice";
import { useNavigate } from "react-router-dom";
import useSavePrescription from "./hooks/useSavePrescription";
import { ToastContainer } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import { formatDateTime, formatTime } from "../../../utils/formatDateTime";
import { useTranslation } from "react-i18next";

const PastPrescription = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const patientData = useSelector((state) => state.patientDetails);
  const dispatch = useDispatch();

  const { patientId } = patientData || {};

  const { isPrescriptionSaving, pastPrescription, onSavePrescription } =
    useSavePrescription({
      method: "get",
    });

  useEffect(() => {
    if (patientId !== undefined) {
      onSavePrescription(patientId);
    }
  }, [patientId, onSavePrescription]);

  return (
    <div
      style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)" }}
      className="bg-white text-sm h-screen overflow-y-scroll border border-t-0 border-r-0 mr-0.5"
    >
      <ToastContainer />
      <div className="flex border-b fixed w-[25%] py-2 ps-3 pe-5 justify-between items-center bg-white">
        <div className="text-[#6B7280] uppercase text-sm">
          {t("Past Prescription")}
        </div>
        <button
          onClick={() => {
            dispatch(setActiveDoctorTab(null));
          }}
        >
          <FontAwesomeIcon icon={faXmark} color="#1F2A37" />
        </button>
      </div>

      <div className="pt-10 pb-32">
        {isPrescriptionSaving ? (
          [1, 2, 3, 4, 5].map((_, index) => (
            <Skeleton className="m-2 w-fit" height={32} key={index} />
          ))
        ) : (
          <>
            {pastPrescription.length === 0 ? (
              <div className="m-4">{t("No records found")} !</div>
            ) : (
              pastPrescription.map((prescription, index) => {
                const { dateCreated } = prescription || {};
                return (
                  <div
                    key={index}
                    className="m-3 shadow-sm p-2 rounded-md border"
                  >
                    <div className="flex justify-between">
                      <div>
                        {formatDateTime(dateCreated)} |{" "}
                        {formatTime(dateCreated)}
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            dispatch(setPrescriptionData(prescription));
                            navigate("/templatePreview");
                          }}
                        >
                          <img src={Eye} alt="eye" />
                        </button>
                        <button
                          onClick={() =>
                            dispatch(setPrescriptionData(prescription))
                          }
                        >
                          <img src={Duplicate} alt="Duplicate" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center flex-shrink-0 flex-wrap">
                        <span className="font-light flex items-center justify-center">
                          {t("Chief Complaints")} :
                        </span>
                        <span className="ms-1">
                          {prescription.chiefComplaint}
                        </span>
                      </div>
                      {/* <div className="text-[#4B5563] text-sm">
                        {prescription.prescribeDate}
                      </div> */}
                    </div>
                    <div className="text-[#1F2A37] mt-2 text-sm">
                      {prescription.diagnosis.map((item, index) => {
                        return (
                          <span key={index}>
                            <span className="font-light">
                              {t("Diagnosis")} :
                            </span>
                            <span> {item} </span>
                          </span>
                        );
                      })}
                    </div>
                    <div className="font-light mt-2 text-[#374151]">
                      {t("Lab Investigations")} :
                    </div>
                    <div className="text-sm  text-[#374151]">
                      {prescription.labInvestigations.map((item, index) => {
                        return (
                          <span key={index}>
                            {item}
                            <span className="px-2">|</span>
                          </span>
                        );
                      })}
                    </div>
                    <div className="font-light mt-2 text-[#374151]">
                      {t("Medications")} :
                    </div>
                    <div>
                      {prescription.rxList.map((item, index) => {
                        const {
                          drugName,
                          dose,
                          measurement,
                          frequency,
                          duration,
                          timing,
                        } = item || {};
                        return (
                          <div key={index}>
                            <div className="text-[#1F2A37]">
                              {drugName} ({dose} {measurement})
                            </div>
                            <div className="text-sm font-light text-[#374151]">
                              {frequency} | {timing} | {duration}
                            </div>
                          </div>
                        );
                      })}
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

export default memo(PastPrescription);
