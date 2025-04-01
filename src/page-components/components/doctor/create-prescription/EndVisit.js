import React from "react";
import Modal from "../../../common-components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import useEndVisit from "./hooks/useEndVisit";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const EndVisit = ({ showModal, onClose }) => {
  const { t } = useTranslation();
  const { onEndVisit, isEndVisitLoading } = useEndVisit({ onClose });
  const id = useSelector((state) => state.patientDetails.id);
  return (
    <div>
      <ToastContainer />
      <Modal showModal={showModal} onClose={onClose} modalHeight="h-1/4">
        <div className="flex items-center h-full justify-center flex-col">
          <div className="my-2">
            <FontAwesomeIcon
              icon={faCircleExclamation}
              size="2x"
              color="#9CA3AF"
            />
          </div>
          <div className="my-2 text-[#6B7280]">
            {t("Are you sure you want to end this visit")}?
          </div>
          <div className="my-2 gap-4 flex">
            <button
              onClick={(e) => {
                onEndVisit(e, "COMPLETED", id);
              }}
              disabled={isEndVisitLoading}
              className="bg-[#C81E1E] px-2 py-1 disabled:bg-[#E5E7EB] disabled:border-[#E5E7EA] disabled:text-[#1F2A37] flex justify-center border border-[#C81E1E] item-center rounded-lg text-sm text-[#FFFFFF]"
            >
              {t("Yes, I'm sure")}
            </button>
            <button
              onClick={() => onClose()}
              className="flex border px-5 py-1 items-center justify-center bg-white border-[#E5E7EB] item-center rounded-lg text-sm text-[#1F2A37]"
            >
              {t("No")}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EndVisit;
