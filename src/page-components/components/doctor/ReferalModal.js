import React, { useRef, useState } from "react";
import Modal from "../../common-components/Modal";
import Select from "../../common-components/Select";
import { DOCTOR_LIST, DOCTOR_SPECIALIZATION } from "../../constants/Constant";
import { formatArray } from "../../utils/formateArray";
import {
  faAngleDown,
  faAngleUp,
  faFilePdf,
  faLocationDot,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";

const DOCTOR_ADDRESS = {
  name: "Dr. B. C. Roy",
  address: [
    {
      hospitalName: "City Hospital, Delhi",
      fullAddress:
        "General Aryan Medical Center, Sector 23, Rohini, New Delhi, 110085, India",
    },
    {
      hospitalName: "Care Clinic, Delhi",
      fullAddress: "Address: 456 Wellness Avenue, Delhi, 110002, India",
    },
  ],
};

const ReferalModal = ({ referalModal, setReferalModal }) => {
  const [referralForm, setReferralForm] = useState({
    specialization: "",
    referredTo: "",
    reasonForReferral: "",
    DetaildReasonForReferral: "",
    document: [],
  });

  const inputFileRef = useRef(null);

  const handleClick = () => {
    inputFileRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target || {};
    if (type === "file" && name === "document") {
      setReferralForm((prev) => ({
        ...prev,
        document: [...prev.document, ...Array.from(e.target.files)],
      }));
    } else {
      setReferralForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveFile = (selectedIndex) => {
    const newDocument = [...referralForm.document];
    const updatedList = newDocument.filter(
      (_, index) => index !== selectedIndex
    );
    setReferralForm((prev) => ({ ...prev, document: updatedList }));
  };

  const showToast = () => {
    toast.success("Referral sent successfully !");
    setTimeout(() => {
      setReferalModal(false);
    }, 2000);
  };

  return (
    <Modal
      modalHeight="min-h-[50%]"
      modalWidth="w-[70%]"
      showModal={referalModal}
      onClose={() => setReferalModal(false)}
    >
      <ToastContainer />
      <div className="py-3 relative text-sm px-5">
        <div className="text-[#111928] font-medium">Create Referral</div>
        <hr className="-mx-5 my-3"></hr>
        <div className="flex justify-between w-full gap-4">
          <div className="w-full">
            <div className="mb-1">Specialization</div>
            <Select
              onChange={handleInputChange}
              name="specialization"
              options={formatArray(DOCTOR_SPECIALIZATION)}
              upIcon={faAngleUp}
              downIcon={faAngleDown}
              allowPressEnter={false}
              openTopPosition="top-1.5"
              closeTopPosition="top-1.5"
            />
          </div>
          <div className="w-full ">
            <div className="mb-1">Referred To</div>
            <Select
              onChange={handleInputChange}
              name="referredTo"
              options={formatArray(DOCTOR_LIST)}
              upIcon={faAngleUp}
              downIcon={faAngleDown}
              allowPressEnter={false}
              openTopPosition="top-1.5"
              closeTopPosition="top-1.5"
            />
          </div>
        </div>
        {referralForm.referredTo !== "" ? (
          <>
            <div className="font-medium text-base mt-3">
              {DOCTOR_ADDRESS.name}
            </div>
            <div className="my-1">
              {DOCTOR_ADDRESS.address.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="mb-3 flex gap-3 items-center text-[#374151]"
                  >
                    <div>
                      <input type="checkbox" />
                    </div>
                    <div>
                      <div>{item.hospitalName}</div>
                      <div className="flex mt-1 gap-2">
                        <FontAwesomeIcon icon={faLocationDot} />
                        {item.fullAddress}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : null}
        <div className="mt-4">
          <div>Reason for Referral</div>
          <div className="mt-1">
            <textarea
              rows={5}
              name="DetaildReasonForReferral"
              value={referralForm.DetaildReasonForReferral}
              onChange={handleInputChange}
              className="focus:outline-none rounded-lg px-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2 w-full focus:border-[#006AF5]"
            />
          </div>
        </div>
        <div className="my-4 pb-12">
          <div className="flex flex-wrap gap-4">
            {referralForm.document.map((item, selectedIndex) => {
              return (
                <div
                  key={selectedIndex}
                  className="bg-[#F3F4F6] gap-5 flex items-center px-5 py-3 text-[#6B7280]"
                >
                  <FontAwesomeIcon icon={faFilePdf} /> {item.name}
                  <button onClick={() => handleRemoveFile(selectedIndex)}>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div>
              );
            })}
          </div>
          <input
            multiple
            name="document"
            type="file"
            className="hidden"
            onChange={handleInputChange}
            ref={inputFileRef}
          />
        </div>
        <div className="flex absolute  bottom-4 w-[96%] justify-between">
          <button
            onClick={handleClick}
            className="flex border items-center justify-center bg-white
            border-[#E5E7EB] item-center px-4 py-2 rounded-lg text-sm
            text-[#1F2A37]"
          >
            Upload Document
          </button>
          <button
            onClick={showToast}
            className="bg-[#1A56DB] disabled:bg-[#E5E7EB]
            disabled:border-[#E5E7EA] disabled:text-[#1F2A37] flex
            justify-center border border-[#1A56DB] item-center px-4 py-2
            rounded-lg text-sm text-[#FFFFFF]"
          >
            Send Referral
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReferalModal;
