import React, { memo } from "react";
import Modal from "../../../common-components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { startCase } from "../../../utils/startCase";
import { formatDateTime } from "../../../utils/formatDateTime";
import Eye from "../../../../images/gray-eye.svg";
import { useNavigate } from "react-router-dom";
import useSaveTemplate from "./hooks/useSaveTemplate";
import { setPrescriptionData } from "../../../../redux-store/slice/prescriptionDataSlice";
import { ToastContainer } from "react-toastify";
import { setIsSaveTemplate } from "../../../../redux-store/slice/saveTemplateModal";
import Tooltip from "../../../common-components/Tooltip";
import { firstLetterCapital } from "../../../utils/firstLetterCapital";
import { useTranslation } from "react-i18next";

const SaveTemplate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const prescriptionData = useSelector((state) => state.prescriptionData);
  const isSaveTemplate = useSelector((state) => state.isSaveTemplate);
  const dispatch = useDispatch();
  const {
    chiefComplaint = [],
    templateName = "",
    diagnosis = [],
    labInvestigations = [],
    rxList = [],
  } = prescriptionData;

  const handleInputChange = (e) => {
    const { name, value } = e.target || {};
    dispatch(setPrescriptionData({ ...prescriptionData, [name]: value }));
  };

  const { onSaveTemplate, isSaveTemplateLoading } = useSaveTemplate();

  return (
    <div>
      <Modal
        showModal={isSaveTemplate}
        modalWidth="w-1/2"
        modalHeight="h-min-[60%]"
        onClose={() => dispatch(setIsSaveTemplate(false))}
      >
        <ToastContainer />
        <div className="py-3 px-4">
          <div className="text-[#111928] text-lg font-semibold">
            {t("Prescription Template")}
          </div>
          <hr className="my-2.5"></hr>
          <div className="">
            <label className="text-[#111928] text-sm">{t("Name")}</label>
            <div className="mt-1">
              <input
                type="text"
                name="templateName"
                placeholder={t("Template name ...")}
                value={templateName}
                onChange={handleInputChange}
                required
                className="border focus:border-[#2D2E33] w-full text-sm text-gray-800 py-1.5 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-2"
              />
            </div>
          </div>
          <div className="my-4 border rounded-lg p-4">
            <div className="flex items-center justify-between">
              {/* <span className="gap-2 flex flex-wrap">{chiefComplaint}</span> */}

              <div className="items-center flex-wrap flex-shrink-0 flex  border-[#B6B6B6] ">
                {chiefComplaint.map((item, index) => {
                  return (
                    <div key={index} className="me-1">
                      {firstLetterCapital(item)}
                      {index === chiefComplaint.length - 1 ? null : ","}
                    </div>
                  );
                })}
              </div>

              <div className="text-[#4B5563] text-sm">
                {formatDateTime(new Date())}
              </div>
              <button
                onClick={() => {
                  navigate("/templatePreview");
                }}
              >
                <img src={Eye} alt="eye" />
              </button>
            </div>
            <div className="my-4">
              <span className="text-sm flex-wrap gap-2 flex">
                <span className="font-medium">{t("Diagnosis")} :</span>{" "}
                {(diagnosis || []).map((item, index) => (
                  <div className="flex font-light flex-wrap" key={index}>
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
            <div className="mb-4">
              <span className="flex flex-wrap text-sm gap-2">
                <span className="font-medium">
                  {t("Lab Investigations")} :{" "}
                </span>
                {(labInvestigations || []).map((item, index) => (
                  <div className="flex font-light" key={index}>
                    {startCase(item)}
                    <span
                      className={`${
                        labInvestigations.length - 1 === index ? "hidden" : ""
                      }`}
                    >
                      ,
                    </span>
                  </div>
                ))}
              </span>
            </div>
            <div>
              {rxList[0].drugName !== "" && (
                <div className="my-4 text-sm">
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
                      companyLingo,
                    } = item || {};
                    return (
                      <div
                        key={index}
                        className="flex last:border-none gap-2 px-4 py-2 border-b items-center justify-start font-light"
                      >
                        <div className="w-[50%] pe-4">
                          <div
                            className={`gap-1  ${
                              drugName.length < 30 ? "flex flex-wrap" : ""
                            } items-center`}
                          >
                            <span className="font-medium flex flex-wrap">
                              {companyLingo === "" || companyLingo === null ? (
                                drugName
                              ) : (
                                <Tooltip content={drugName}>
                                  {companyLingo}
                                </Tooltip>
                              )}
                            </span>
                            <span>{dose}</span>
                            <span>{measurement}</span>
                          </div>
                        </div>
                        <div className="w-[20%] pe-4">{startCase(timing)}</div>
                        <div className="w-[20%] pe-4">{frequency}</div>
                        <div className="w-[10%]">{duration}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => dispatch(setIsSaveTemplate(false))}
              className="flex border items-center justify-center bg-white border-[#E5E7EB] item-center px-4 py-2 rounded-lg text-sm text-[#1F2A37]"
            >
              {t("Cancel")}
            </button>
            <button
              onClick={(e) => onSaveTemplate(e)}
              disabled={templateName.trim() === "" || isSaveTemplateLoading}
              className="bg-[#1A56DB] disabled:bg-[#E5E7EB] disabled:border-[#E5E7EB] disabled:text-[#1F2A37] flex justify-center items-center border border-[#1A56DB] px-4 py-2 rounded-lg text-sm text-[#FFFFFF]"
            >
              {isSaveTemplateLoading
                ? "Loading ..."
                : `${t("Save as Template")}`}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default memo(SaveTemplate);
