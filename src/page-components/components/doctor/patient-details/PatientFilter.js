import React, { memo } from "react";
import SearchInput from "../../../common-components/SearchInput";
import ReferUser from "../../../../images/refer-arrow1.svg";
import Bell from "../../../../images/bell.svg";
import Setting from "../../../../images/cog.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPrescriptionData } from "../../../../redux-store/slice/prescriptionDataSlice";
import { useTranslation } from "react-i18next";

const PatientFilter = ({
  setReferalModal = () => {},
  setNotifications = () => {},
  setSettingModal = () => {},
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const patientData = useSelector((state) => state.patientDetails);

  const dispatch = useDispatch();

  const handleNavigate = () => {
    dispatch(
      setPrescriptionData({
        ...patientData,
        chiefComplaint: patientData.chiefComplaint,
      })
    );
    navigate("/doctor/createPrescription", {
      state: { id: patientData.id },
    });
  };

  return (
    <div className="ms-5 pt-5 pb-6 flex w-full justify-between items-center">
      <div className="flex gap-4 w-[90%]">
        <div className="w-[40%]">
          <SearchInput />
        </div>
        <button
          onClick={handleNavigate}
          className="bg-[#1A56DB] disabled:bg-[#E5E7EB] disabled:border-[#E5E7EB] disabled:text-[#1F2A37] flex justify-center items-center border border-[#1A56DB] px-4 py-2 rounded-lg text-sm text-[#FFFFFF]"
        >
          {t("Create Prescription")}
        </button>
      </div>

      <div className="items-center w-[10%] flex gap-5">
        <button
          onClick={() => setReferalModal(true)}
          className="flex justify-center"
        >
          <img src={ReferUser} alt="ReferUser" />
        </button>
        <button
          onClick={() => setSettingModal(true)}
          className="flex justify-center"
        >
          <img src={Setting} alt="Setting" />
        </button>
        <button
          onClick={() => setNotifications((prev) => !prev)}
          className="flex justify-center"
        >
          <img src={Bell} alt="Bell" />
        </button>
      </div>
    </div>
  );
};

export default memo(PatientFilter);
