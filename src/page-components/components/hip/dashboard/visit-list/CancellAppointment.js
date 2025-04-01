import React, { useState } from "react";
import Modal from "../../../../common-components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../../../../common-components/Buttons/PrimaryButton";
import SecondaryButton from "../../../../common-components/Buttons/SecondaryButton";
import useEndVisit from "../../../doctor/create-prescription/hooks/useEndVisit";
import useCheckIn from "../create-appointment/hooks/useCheckIn";
import useGetAllVisit from "./hooks/useGetAllVisit";
import { CiWarning } from "react-icons/ci";
import { useSelector } from "react-redux";
const CancelAppointment = ({
  showModal = false,
  onClose = () => {},
  currentItem = {},
}) => {
  const { t } = useTranslation();
  const [selectedField, setSelectedField] = useState("modifyAppointment");
  const [selectedDate, setSelectedDate] = useState("");
  const { onEndVisit, isEndVisitLoading } = useEndVisit({ onClose });
  const { getAllPatientVisit } = useGetAllVisit();
  const { isCheckInLoading, onCheckIn } = useCheckIn({
    appointmentData: currentItem,
  });

  const { id } = currentItem || {};
  const currentCoordinate = useSelector((state) => state.currentCoordinate);

  const onChangeField = (e) => {
    setSelectedField(e.target.value);
  };

  const handleDateChange = (e) => {
    const { value } = e.target || {};
    console.log(value, "value");
    setSelectedDate(value);
  };

  const onModify = async (e) => {
    await onEndVisit(e, "MODIFIED", id);
    await onCheckIn(e, selectedDate);
  };
  const onCancell = async (e) => {
    await onEndVisit(e, "CANCELLED", id);
    getAllPatientVisit();
  };

  return (
    <Modal
      showModal={showModal}
      onClose={onClose}
      modalHeight="min-h-1/4"
      modalWidth="min-w-1/2"
    >
      <div className="p-5 mt-5">
        <div className="flex items-center">
          <div className="me-10 flex items-center">
            <input
              type="radio"
              id="modifyAppointment"
              name="selectedField"
              value="modifyAppointment"
              checked={selectedField === "modifyAppointment"}
              onChange={onChangeField}
            />
            <label htmlFor="modifyAppointment" className="ms-2">
              {t("Modify Appointment")}
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="cancelVisit"
              name="selectedField"
              value="cancelVisit"
              checked={selectedField === "cancelVisit"}
              onChange={onChangeField}
            />
            <label htmlFor="cancelVisit" className="ms-2">
              {t("Cancel Appointment")}
            </label>
          </div>
        </div>

        {selectedField === "modifyAppointment" ? (
          <div className="mt-2">
            {currentCoordinate.latitude === undefined ? (
              <div className="flex my-2 items-center text-red-400 font-light">
                <CiWarning className="text-red-500" />
                <div className="text-sm ms-1">
                  {t("Either connect your device or fetch the location")}
                </div>
              </div>
            ) : null}
            <div className="text-secondary">
              {t("Please select a date to modify")}
            </div>
            <div className="mt-2">
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                min={new Date().toISOString().split("T")[0]}
                className="border-[#D1D5DB] bg-[#F9FAFB] uppercase  focus:border-[#2D2E33] text-sm text-gray-800 border placeholder:text-[#6B7280] focus:outline-none rounded px-3 py-1"
              />
            </div>
            <div className="mt-5 gap-4 flex justify-end">
              <SecondaryButton onClick={onClose} buttonName={t("Cancel")} />

              <PrimaryButton
                onClick={(e) => onModify(e)}
                buttonName={t("Modify")}
                disabled={
                  isCheckInLoading ||
                  isEndVisitLoading ||
                  selectedDate === "" ||
                  currentCoordinate.latitude === undefined
                }
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center h-full justify-center flex-col">
            <div className="my-2">
              <FontAwesomeIcon
                icon={faCircleExclamation}
                size="2x"
                color="#9CA3AF"
              />
            </div>
            <div className="text-[#6B7280] text-center">
              {t("Are you sure you want")}
            </div>
            <div className="text-[#6B7280] text-center">
              {t("to cancel the appointment?")}
            </div>
            <div className="mt-5 gap-4 flex">
              <button
                onClick={(e) => onCancell(e)}
                disabled={isEndVisitLoading}
                className="bg-[#C81E1E] px-2 py-1 disabled:bg-[#E5E7EB] disabled:border-[#E5E7EA] disabled:text-[#1F2A37] flex justify-center border border-[#C81E1E] items-center rounded-lg text-sm text-[#FFFFFF]"
              >
                {t("Yes, I'm sure")}
              </button>
              <button
                onClick={onClose}
                className="flex border px-5 py-1 items-center justify-center bg-white border-[#E5E7EB] rounded-lg text-sm text-[#1F2A37]"
              >
                {t("No")}
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CancelAppointment;
