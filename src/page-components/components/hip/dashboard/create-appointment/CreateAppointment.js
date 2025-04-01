import React, { memo, useState } from "react";
import PrimaryButton from "../../../../common-components/Buttons/PrimaryButton";
import { VISIT_TAGS } from "../../../../constants/Constant";
import useCheckIn from "./hooks/useCheckIn";
import useGetPatientList from "./hooks/useGetPatientList";
import useGetAllCompliants from "../../../doctor/create-prescription/hooks/useGetAllCompliants";
import { formatArray } from "../../../../utils/formateArray";
import SearchAndSelect from "../../../../common-components/SearchAndSelect";
import { useDispatch, useSelector } from "react-redux";
import { setDashboardDrawer } from "../../../../../redux-store/slice/checkInDrawerSlice";
import { CiWarning } from "react-icons/ci";
import MultiSelectWithSearch from "../../../../common-components/MultiSelectWithSearch";
import {
  faAngleDown,
  faAngleUp,
  faCircleUser,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import closeCross from "../../../../../images/close_cross.svg";
import { useTranslation } from "react-i18next";
import MultiSelectWithAPIsearch from "../../../../common-components/MultiSelectWithAPIsearch";

const { REACT_APP_MMU_UNIT } = process.env || {};

const CreateAppointment = ({ patient = {} }) => {
  const { t } = useTranslation();
  const dashboardDrawer = useSelector((state) => state.dashboardDrawer);
  const currentCoordinate = useSelector((state) => state.currentCoordinate);

  const dispatch = useDispatch();
  const [appointmentData, setAppointmentData] = useState({
    currentDate: new Date().toISOString().split("T")[0], // Defaults to today
    photo: patient.photo,
    patientId: patient.id,
    tags: [],
    chiefComplaint: [],
    bloodGroup: patient.bloodGroup,
    mmuUnit: REACT_APP_MMU_UNIT,
    visitType: "INPERSON",
  });

  console.log(appointmentData, "appointmentData");

  const [isOnClear, setIsOnClear] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "patientId") {
      setAppointmentData((prev) => ({
        ...prev,
        patientId: value.id,
        photo: value.photo || value.thumbnail,
      }));
    } else {
      setAppointmentData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const { chiefComplaints, isChiefComplaintsLoading, getAllChiefComplaints } =
    useGetAllCompliants();

  const { isCheckInLoading, onCheckIn } = useCheckIn({
    appointmentData,
    setAppointmentData,
    setIsOnClear,
  });
  const { patientList, getPatientList, isPatientListLoading } =
    useGetPatientList();

  const { patients } = patientList || {};

  const onCloseDrawer = () => {
    dispatch(
      setDashboardDrawer({
        userDrawer: false,
        skipABHA: false,
        checkInDrawer: !dashboardDrawer.checkInDrawer,
      })
    );
  };

  return (
    <div className="mx-3 my-2">
      <div className="flex justify-between">
        <h1 className="text-[#6B7280] text-base uppercase font-medium">
          {t("New Appointment")}
        </h1>
        <button onClick={() => onCloseDrawer()} className="text-[#6B7280]">
          <img src={closeCross} alt="closeCross" />
        </button>
      </div>
      <div className="w-20 h-20 mx-auto mt-5 rounded-full flex items-center justify-center overflow-hidden">
        {appointmentData.photo === "" ||
        appointmentData.photo === undefined ||
        appointmentData.photo === null ? (
          <FontAwesomeIcon icon={faCircleUser} size="5x" color="#999999" />
        ) : (
          <img
            src={`data:image/jpeg;base64,${appointmentData.photo}`}
            alt="Profile Preview"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div>
        <form className="pb-4">
          {currentCoordinate.latitude === undefined ? (
            <div className="flex my-2 items-center text-red-400 font-light">
              <CiWarning className="text-red-500" />
              <div className="text-sm ms-1">
                {t("Either connect your device or fetch the location")}
              </div>
            </div>
          ) : null}

          <div className="flex flex-col my-2">
            <label className="text-sm mb-1 text-[#111928]">
              {t("Appointment Date")}*
            </label>
            <input
              onChange={handleChange}
              name="currentDate"
              type="date"
              min={new Date().toISOString().split("T")[0]} // Set min date to today
              value={appointmentData.currentDate}
              className="focus:outline-none uppercase text-[#2D2E33] font-normal bg-[#F9FAFB] placeholder:font-normal rounded-lg ps-10 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2.5 w-full focus:border-[#2D2E33]"
            />
          </div>

          <div className="flex flex-col my-2">
            <label className="text-sm mb-1 text-[#111928]">
              {t("Patient")}*
            </label>
            <SearchAndSelect
              prefixIcon={faUser}
              name="patientId"
              onChange={handleChange}
              patientList={patients}
              getPatientList={getPatientList}
              isOnClear={isOnClear}
              setIsOnClear={setIsOnClear}
              isPatientListLoading={isPatientListLoading}
              defaultOptions={patient}
              placeholder={t("Select Patient")}
              className="focus:outline-none text-[#2D2E33] font-normal bg-[#F9FAFB] placeholder:font-normal rounded-lg ps-10 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2.5 w-full focus:border-[#2D2E33]"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label className="text-sm mb-1 text-[#111928]">
              {t("Chief Complaints")}*
            </label>

            <MultiSelectWithAPIsearch
              getData={getAllChiefComplaints}
              options={formatArray(chiefComplaints)}
              isLoading={isChiefComplaintsLoading}
              name="chiefComplaint"
              onChange={handleChange}
              multiple
              textColor="#5E6066"
              defaultOptions={formatArray(appointmentData.chiefComplaint)}
              className="focus:outline-none text-[#2D2E33] font-normal bg-[#F9FAFB] placeholder:font-normal rounded-lg ps-4 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2 w-full focus:border-[#2D2E33]"
            />
          </div>
          <div className="flex mb-10 flex-col">
            <label className="text-sm mb-0.5 text-[#111928]">{t("Tags")}</label>
            <MultiSelectWithSearch
              options={formatArray(VISIT_TAGS)}
              multiple={true}
              showIcon={true}
              readOnly={true}
              required={false}
              onChange={handleChange}
              placeholder={t("Select")}
              name="tags"
              labelKey="label"
              valueKey="value"
              isOnClear={isOnClear}
              setIsOnClear={setIsOnClear}
              showPrefixIcon={false}
              upIcon={faAngleUp}
              downIcon={faAngleDown}
              deleteIcon={faXmark}
              defaultOptions={[]}
              openTopPosition="top-2"
              closeTopPosition="top-2"
              className="focus:outline-none text-[#2D2E33] bg-[#F9FAFB] font-normal rounded-lg ps-4 border placeholder:text-[#9CA3AF] placeholder:font-normal  border-[#D1D5DB] text-sm py-2 w-full focus:border-[#2D2E33]"
            />
          </div>
          <PrimaryButton
            disabled={
              appointmentData?.patientId === "" ||
              appointmentData?.chiefComplaint.length === 0 ||
              currentCoordinate.latitude === undefined ||
              isCheckInLoading
            }
            buttonName={t("Check-In")}
            width="w-full"
            type="button"
            onClick={(e) => onCheckIn(e, appointmentData?.currentDate)}
          />
        </form>
      </div>
    </div>
  );
};

export default memo(CreateAppointment);
