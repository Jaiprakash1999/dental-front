import React, { useRef } from "react";
import Modal from "../../../../../common-components/Modal";
import PrimaryButton from "../../../../../common-components/Buttons/PrimaryButton";
import { useTranslation } from "react-i18next";
import Avatar from "react-avatar";
import { startCase } from "../../../../../utils/startCase";
import { setDashboardDrawer } from "../../../../../../redux-store/slice/checkInDrawerSlice";
import { useDispatch } from "react-redux";

const ExistingPatient = ({
  existingPatientList = {},
  showExistingPatientModal = false,
  setExistingPatientModal = () => {},
  setPatient = () => {},
  onAddNew = () => {},
}) => {
  const { existingPatients } = existingPatientList || {};
  const optionRefs = useRef([]);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleOptionClick = (item) => {
    setPatient(item);
    setTimeout(() => {
      dispatch(
        setDashboardDrawer({
          skipABHA: false,
          checkInDrawer: true,
          userDrawer: false,
        })
      );
    }, 1000);
  };

  return (
    <div className="text-sm p-5">
      <Modal
        modalWidth="w-1/3"
        modalHeight="h-fit"
        showModal={showExistingPatientModal}
        onClose={() => setExistingPatientModal(false)}
      >
        <div className="p-5">
          <div className="text-center">
            Patient with same details already exists
          </div>
          <div className="text-xs text-center my-2">
            Select to continue with existing patient
          </div>
          <div className="mt-3">
            {existingPatients.reverse().map((item, index) => {
              const { name, age, thumbnail, address, gender } = item || {};
              return (
                <div
                  key={index}
                  style={{ boxShadow: "0 0 2px rgb(44 62 80 / 20%)" }}
                  onClick={() => handleOptionClick(item)}
                  ref={(el) => (optionRefs.current[index] = el)} // Assign ref to each option
                  className={`
                     hover:bg-[#E4FFFB] bg-[#F9FAFB]
                   flex items-center gap-4 overflow-y-hidden rounded-lg my-2 cursor-pointer p-2 
                   }`}
                >
                  {thumbnail === undefined ||
                  thumbnail === "" ||
                  thumbnail === null ? (
                    <Avatar name={name} size="30" round={true} />
                  ) : (
                    <img
                      src={`data:image/jpeg;base64,${thumbnail}`}
                      alt="thumbnail"
                      className="h-10 w-10 rounded-full"
                    />
                  )}
                  <div>
                    <div className="text-[#192739F0] flex hover:text-[#233876] text-xs">
                      <span className="me-1 flex-shrink-0">{name}</span>|{" "}
                      <span className="mx-1">{startCase(gender)} </span> |{" "}
                      <span className="ms-1"> {age}</span>
                    </div>
                    <div className="text-[#1B2B41B0] hover:text[#006AF5] text-xs">
                      {address}
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex bg-white py-2 mt-5  gap-3 justify-center">
              <PrimaryButton
                onClick={(e) => onAddNew(e, true)}
                type="submit"
                buttonName={t("Add as a New Patient")}
                className="bg-[#4C6AF7] hover:border-[#D8E3FF] disabled:bg-[#F9FAFB] disabled:border-[#C6C7C9] disabled:text-[#A2A3A7] flex justify-center border border-[#1A56DB] item-center px-6 py-2 rounded-lg text-sm text-[#FFFFFF]"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ExistingPatient;
