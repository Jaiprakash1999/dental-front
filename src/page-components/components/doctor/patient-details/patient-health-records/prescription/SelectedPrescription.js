import React from "react";
import Modal from "../../../../../common-components/Modal";
import moment from "moment";
import { startCase } from "../../../../../utils/startCase";
import {
  formatDateTime,
  formatTime,
} from "../../../../../utils/formatDateTime";
import backArrow from "../../../../../../images/back_arrow.svg";
import { firstLetterCapital } from "../../../../../utils/firstLetterCapital";
import { useTranslation } from "react-i18next";

const SelectedPrescription = ({
  activeHealthTab = "",
  setActiveHealthTab = () => {},
  selectedRecord = {},
  setSelectedRecord = () => {},
  setIsEditable = () => {},
}) => {
  const { t } = useTranslation();
  const {
    chiefComplaint,
    cretedAt,
    diagnosis,
    followUp,
    instructions,
    labInvestigations,
    lifeStyleRecommendations,
    rxList = [],
  } = selectedRecord || {};

  const handleClose = () => {
    setActiveHealthTab("");
    setSelectedRecord({});
    setIsEditable(true);
  };

  return (
    <div>
      <Modal
        showModal={activeHealthTab === "prescription" ? true : false}
        onClose={handleClose}
        modalHeight="h-[90%]"
        modalWidth="w-[70%]"
      >
        <div className="bg-white mt-4  mb-20 px-6">
          <div className="flex justify-between w-[58%]">
            <img src={backArrow} alt="backArrow" />
            <div>{`${t("prescription")}.${moment(cretedAt).format(
              "DD.MM.YYYY"
            )}`}</div>
          </div>
          <div className="p-2  mt-5 flex bg-[#ECECED] rounded">
            <div className="w-1/2">{t("Prescription")}</div>
            <span>
              {formatDateTime(cretedAt)} | {formatTime(cretedAt)}
            </span>
          </div>
          <div className="flex my-2">
            <div className="font-semibold">{t("Chief Complaint")}:</div>
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
          {rxList?.[0]?.drugName !== "" && (
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
                            {drugName}
                          </span>
                          <span>{dose}</span>
                          <span>{measurement}</span>
                        </div>
                      </div>
                      <div className="w-[20%] pe-4">{startCase(timing)}</div>
                      <div className="w-[20%] pe-4">{frequency}</div>
                      <div className="w-[10%]">{duration}</div>
                    </div>

                    <div>
                      <span className="w-[10%]"> {t("Composition")}</span>:{" "}
                      {drugName}
                      {dose} {measurement}
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
          {instructions !== "" && (
            <div className="my-2">
              <div className="font-semibold">{t("Instructions")}:</div>
              <div className="font-light ">
                {(instructions || []).map((item, index) => (
                  <div className="flex items-center" key={index}>
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
          {followUp !== "" && (
            <div className="my-2 gap-2">
              <div className="font-semibold">{t("Follow Up")}:</div>
              <div className="font-light ">
                {moment(followUp).format("DD-MM-yyyy")}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default SelectedPrescription;
