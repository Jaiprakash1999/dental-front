import React, { useEffect, useState } from "react";
import PatientDetailsHeader from "./PatientDetailsHeader";
import PrescriptionDetails from "./PrescriptionDetails";
import SelectPrescriptionTemplate from "../../doctor/create-prescription/SelectPrescriptionTemplate";
import Eye from "../../../../images/eye.svg";
import ClipboardList from "../../../../images/clipboard-list.svg";
import { useNavigate } from "react-router-dom";
import SaveTemplate from "./SaveTemplate";
import EndVisit from "./EndVisit";
import { useDispatch, useSelector } from "react-redux";
import {
  initialState,
  setPrescriptionData,
} from "../../../../redux-store/slice/prescriptionDataSlice";
import { setIsSaveTemplate } from "../../../../redux-store/slice/saveTemplateModal";
import DoctorSideBar from "../side-bar/DoctorSideBar";
import { useTranslation } from "react-i18next";

const CreatePrescription = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [prescriptionTemplate, setPrescriptionTemplate] = useState(false);
  const [isEndVisit, setIsEndVisit] = useState(false);
  const isSaveTemplate = useSelector((state) => state.isSaveTemplate);
  const dispatch = useDispatch();

  // const activeTab = useSelector((state) => state.activeDoctorTab.activeTab);
  const prescriptionData = useSelector((state) => state.prescriptionData);
  const { rxList = [] } = prescriptionData || {};

  const onClear = () => {
    dispatch(setPrescriptionData(initialState));
  };

  useEffect(() => {
    const onSaveTemplate = (event) => {
      if (event.ctrlKey && (event.key === "s" || event.key === "S")) {
        dispatch(setIsSaveTemplate(true));
      } else if (event.ctrlKey && (event.key === "c" || event.key === "C")) {
        dispatch(setPrescriptionData(initialState));
      } else if (event.ctrlKey && (event.key === "p" || event.key === "P")) {
        navigate("/templatePreview", { state: { withHeader: true } });
      }
    };
    document.addEventListener("keydown", onSaveTemplate);
    return () => {
      document.removeEventListener("keydown", onSaveTemplate);
    };
  }, [dispatch, navigate]);

  return (
    <div className="relative">
      <div className="fixed z-50 w-full">
        <PatientDetailsHeader
          prescriptionTemplate={prescriptionTemplate}
          setPrescriptionTemplate={setPrescriptionTemplate}
          setIsEndVisit={setIsEndVisit}
        />
      </div>
      <div className="flex pt-20 w-full">
        <div
          // className={`${activeTab !== null ? "w-[71%]" : "w-[96%]"} mr-auto"`}
          className={`w-[96%] mr-auto"`}
        >
          <PrescriptionDetails />
        </div>
        {/* {activeTab === "Rx" ? (
          <div className="w-[25%] fixed right-14">
            <PastPrescription />
          </div>
        ) : null} */}

        <div className="fixed ml-auto -mt-4 z-40 h-full right-0">
          <DoctorSideBar />
        </div>
      </div>
      {prescriptionTemplate ? (
        <div className="fixed w-1/2 z-50 top-16 right-14 bg-white">
          <SelectPrescriptionTemplate
            prescriptionTemplate={prescriptionTemplate}
            setPrescriptionTemplate={setPrescriptionTemplate}
          />
        </div>
      ) : null}
      <div
        style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)" }}
        className={`flex bottom-0 text-sm mr-auto justify-between py-2 px-4 items-center bg-white fixed w-[96%]
        `}
      >
        <button
          onClick={onClear}
          className="flex border items-center justify-center bg-white border-[#E5E7EB] item-center px-4 py-2 rounded-lg text-sm text-[#1F2A37]"
        >
          {t("Clear All")}
        </button>

        <button
          onClick={() => dispatch(setIsSaveTemplate(true))}
          className="flex text-[#111928] border rounded-md px-4 py-2 items-center gap-2 disabled:bg-[#E5E7EB] disabled:border-[#E5E7EB] disabled:text-[#1F2A37] "
          disabled={rxList[0]?.drugName === ""}
        >
          <img src={ClipboardList} alt="ClipboardList" />
          {t("Save Template")}
        </button>

        <button
          onClick={() => {
            navigate("/templatePreview");
          }}
          className="flex text-[#111928] border rounded-md px-4 py-2 items-center gap-2 disabled:bg-[#E5E7EB] disabled:border-[#E5E7EB] disabled:text-[#1F2A37] "
        >
          <img src={Eye} alt="Eye" />
          {t("Preview Prescription")}
        </button>
      </div>
      {isSaveTemplate ? <SaveTemplate /> : null}

      {isEndVisit ? (
        <EndVisit showModal={isEndVisit} onClose={() => setIsEndVisit(false)} />
      ) : null}
    </div>
  );
};

export default CreatePrescription;
