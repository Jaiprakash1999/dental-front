import React, { memo, useRef } from "react";
// import html2pdf from "html2pdf.js";
import { useSelector } from "react-redux";
import telananaLogo from "../../../../images/telanagana.svg";
import { useNavigate } from "react-router-dom";
import { startCase } from "../../../utils/startCase";

import {
  formatDateTime,
  formatTime,
  formatTimeWithDay,
} from "../../../utils/formatDateTime";
import { firstLetterCapital } from "../../../utils/firstLetterCapital";
import moment from "moment";
import useSavePrescription from "./hooks/useSavePrescription";
import { ToastContainer } from "react-toastify";
import useGetAllHandoubt from "./hooks/useGetAllHandoubt";
import stampIcon from "../../../../images/stamp.svg";
import signatureIcon from "../../../../images/doctor_signature.svg";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";
import { USER_TYPE } from "../../../utils/userType";

const TemplatePreview = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const prescriptionData = useSelector((state) => state.prescriptionData);
  const contentRef = useRef(null);

  const {
    chiefComplaint = "",
    diagnosis = [],
    rxList = [],
    labInvestigations = [],
    instructions = [],
    lifeStyleRecommendations = [],
    followUp = "",
    followUpDate,
    stamp = false,
    signature = false,
    medicalHandoubts = [],
  } = prescriptionData || {};

  const patientData = useSelector((state) => state.patientDetails);

  const { age, patientId, gender, name, id } = patientData || {};

  const { allHandoubts, isAllHandoubtsLoading } = useGetAllHandoubt();

  const { onSavePrescription, isPrescriptionSaving } = useSavePrescription({
    method: "post",
    contentRef,
  });

  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));

  return (
    <div className="bg-[#111928] w-full overflow-y-scroll flex flex-col items-center justify-center">
      <ToastContainer />
      <div
        className="bg-white mt-10 mb-8 px-6 py-10"
        style={{
          width: "210mm", // A4 width
          minHeight: "297mm", // A4 height
        }}
      >
        <div ref={contentRef} className="text-[#1F2A37] relative text-sm">
          <div className="h-20">
            <div className="grid grid-cols-2 w-full">
              <div className="grid items-center grid-cols-2 gap-x-5">
                <img src={telananaLogo} alt="telananaLogo" />
                <div className="">
                  <div className="font-semibold">{userDetails?.name}</div>
                  <div className="font-light">
                    <div>{USER_TYPE[userDetails?.userType]}</div>
                    {/* <div>Reg.No: PSI2001144</div> */}
                    {t("Reg.No")}: {userDetails?.registrationNo || "-"}
                  </div>
                </div>
              </div>
              <div className="">
                <div className="font-semibold">IDO Health Centre</div>
                <div className="font-light flex text-sm">
                  6-194, Gattumalla village, Laxmidevipally Mandal,
                </div>
                <div className="font-light flex text-sm">
                  Bhadradri Kothagudem district, Telangana
                </div>
              </div>
            </div>
          </div>
          <hr className="my-5"></hr>
          <div className="font-semibold">{t("Patient Details")}: </div>
          <div className=" flex justify-between">
            <div>
              <div>
                <span>{t("Patient Name")}:</span>
                <span className="font-light ms-1">
                  {firstLetterCapital(name)}
                </span>
              </div>
              <div>
                <span>{t("Age")}:</span>
                <span className="font-light ms-1">
                  {age} {t("Years")}
                </span>
              </div>
              <div>
                <span>{t("Gender")}:</span>
                <span className="font-light ms-1">
                  {firstLetterCapital(gender)}
                </span>
              </div>
            </div>
            <div>
              <div>
                <span>{t("Date")}:</span>
                <span className="font-light ms-1">
                  {formatTimeWithDay(new Date())}, {formatDateTime(new Date())}
                </span>
              </div>
              <div>
                <span>{t("Time")}:</span>
                <span className="font-light ms-1">
                  {formatTime(new Date())}
                </span>
              </div>

              <div>
                <span>{t("Patient ID")}:</span>
                <span className="font-light ms-1">{patientId || "-"}</span>
              </div>
            </div>
          </div>

          <div className="flex my-2">
            <div className="font-semibold">{t("Chief Complaints")}:</div>

            <div className="items-center ms-1 font-light flex-wrap flex-shrink-0 flex  border-[#B6B6B6] ">
              {chiefComplaint.map((item, index) => {
                return (
                  <div key={index} className="me-1">
                    {firstLetterCapital(item)}
                    {index === chiefComplaint.length - 1 ? null : ","}
                  </div>
                );
              })}
            </div>
          </div>
          {diagnosis?.length > 0 && (
            <div className="flex my-2">
              <div className="font-semibold">{t("Diagnosis")}:</div>
              <span className="font-light flex-wrap gap-2 flex ms-1">
                {(diagnosis || []).map((compliants, index) => (
                  <span className="flex flex-wrap" key={index}>
                    {startCase(compliants)}
                    <span
                      className={`${
                        diagnosis.length - 1 === index ? "hidden" : ""
                      }`}
                    >
                      ,
                    </span>
                  </span>
                ))}
              </span>
            </div>
          )}
          {rxList[0].drugName !== "" && (
            <div className="my-4">
              <div className="flex w-full bg-[#F3F4F6] py-2 px-4">
                <div className="w-[50%]">{t("Medicine")}</div>
                <div className="w-[20%]">{t("Timing")}</div>
                <div className="w-[20%]">{t("Frequency")}</div>
                <div className="w-[10%]">{t("Duration")}</div>
              </div>
              {rxList.map((item, index) => {
                const {
                  drugName,
                  dose,
                  duration,
                  frequency,
                  measurement,
                  timing,
                  notes,
                } = item || {};
                return (
                  <div
                    className="border-b w-full text-sm px-4 py-2  justify-start font-light"
                    key={index}
                  >
                    <div className="flex w-full gap-2">
                      <div className="w-[50%] pe-4">
                        <div
                          className={`gap-1  ${
                            drugName.length < 30 ? "flex flex-wrap" : ""
                          } items-center`}
                        >
                          <span className="font-medium flex flex-wrap">
                            {firstLetterCapital(drugName)}
                          </span>
                          <span>{dose}</span>
                          <span>{measurement}</span>
                        </div>
                      </div>
                      <div className="w-[20%] pe-4">{startCase(timing)}</div>
                      <div className="w-[20%] pe-4">{frequency}</div>
                      <div className="w-[10%]">{duration}</div>
                    </div>

                    {notes === "" || notes === null ? null : (
                      <div className="w-full">
                        <span>{t("Note")}</span>: {notes}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {labInvestigations?.length > 0 && (
            <div className="my-2 gap-2">
              <div className="font-semibold">{t("Lab Investigations")}: </div>
              <div className="font-light">
                {(labInvestigations || []).map((item, index) => (
                  <div className="" key={index}>
                    {startCase(item)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {lifeStyleRecommendations !== "" && (
            <div className="my-2">
              <div className="font-semibold">
                {t("Lifestyle Recommendations")}:
              </div>
              <div className="font-light ">
                {(lifeStyleRecommendations || []).map((item, index) => (
                  <div className="flex items-center" key={index}>
                    {startCase(item)}
                  </div>
                ))}
              </div>
            </div>
          )}
          {instructions !== "" && (
            <div className="my-2">
              <div className="font-semibold">{t("Admission Advice")}:</div>

              <div className="font-light ">
                {(instructions || []).map((item, index) => (
                  <div className="flex items-center" key={index}>
                    {startCase(item)}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="my-2 gap-2">
            <div className="font-semibold">{t("Follow Up")}:</div>
            <div className="font-light ">
              {moment(followUpDate).format("DD-MM-yyyy")} ({followUp})
            </div>
          </div>

          <div className=" flex justify-end">
            {stamp ? (
              <div className="flex relative justify-end">
                <img src={stampIcon} alt="stamp" height={100} width={100} />
              </div>
            ) : null}
            {signature ? (
              <div className="flex absolute bottom-0 justify-end">
                <img src={signatureIcon} alt="signature" />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {medicalHandoubts.length > 0 ? (
        <div className="w-full pb-24 flex justify-center items-center">
          {isAllHandoubtsLoading ? (
            <Skeleton height={300} width={700} />
          ) : (
            <div>
              {allHandoubts.map((item, index) => {
                return (
                  <iframe
                    key={index}
                    src={item}
                    title="item"
                    width={800}
                    height={1000}
                  />
                );
              })}
            </div>
          )}
        </div>
      ) : null}
      <div
        style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)" }}
        className="flex py-4 bg-white w-full justify-between px-4 fixed bottom-0"
      >
        <button
          onClick={() =>
            navigate("/doctor/createPrescription", {
              state: { id: id },
            })
          }
          className="flex border items-center justify-center bg-white
        border-[#E5E7EB] item-center px-4 py-2 rounded-lg text-sm
        text-[#1F2A37]"
        >
          {t("Cancel")}
        </button>
        <button
          disabled={isPrescriptionSaving}
          className="bg-[#1A56DB] disabled:bg-[#E5E7EB] disabled:border-[#E5E7EA] disabled:text-[#1F2A37] flex justify-center border border-[#1A56DB] item-center px-4 py-2 rounded-lg text-sm text-[#FFFFFF]"
          onClick={() => onSavePrescription(id)}
          // onClick={handleDownload}

          // onClick={onSaveIntoFHIR}
          // disabled={isSaving}
        >
          {t("Generate PDF")}
        </button>
      </div>
    </div>
  );
};

export default memo(TemplatePreview);
