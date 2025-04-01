import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import NationalHealthAuthority from "../../../../../../../images/national-health-authority.svg";
import closeCross from "../../../../../../../images/close_cross.svg";

const OTPonAadhaarOrMobile = ({
  setAbhaAddress = () => {},
  setActiveRegisterState = () => {},
  onClose = () => {},
  veriFiedAbhaAddressData = [],
  isContinueWithNumberLoading = false,
  onAadharMobileContinue = () => {},
  setMobileOrAadhaar = () => {},
}) => {
  const onBack = () => {
    setAbhaAddress("");
    setActiveRegisterState("choose_options");
  };

  const handleClick = (selctedMethod = "") => {
    if (selctedMethod === "mobile") {
      setMobileOrAadhaar("mobile");
    } else if (selctedMethod === "aadhaar") {
      setMobileOrAadhaar("aadhaar");
    }
  };

  return (
    <div>
      <div className="flex mb-4 justify-between">
        <button
          onClick={() => onBack()}
          className="text-[#6B7280] text-base uppercase font-medium"
        >
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </button>
        <h1 className="text-[#6B7280] text-base uppercase font-medium">
          Login with abha address
        </h1>
        <button onClick={() => onClose()} className="text-[#6B7280]">
          <img src={closeCross} alt="closeCross" />
        </button>
      </div>
      <div className="text-sm text-[#111928] mb-3">
        Receive OTP on Mobile Number linked with
      </div>
      {veriFiedAbhaAddressData.includes("MOBILE_OTP") && (
        <button
          onClick={() => handleClick("mobile")}
          disabled={isContinueWithNumberLoading}
          className="active:bg-[#1C64F2] w-full disabled:border-[#C6C7C9] flex items-center hover:border-2 hover:border-[#4C6AF7] border justify-center disabled:border disabled:bg-[#F9FAFB] disabled:text-[#A2A3A7]  border-[#4C6AF7] item-center px-4 py-2 rounded-lg text-sm text-[#4C6AF7]"
        >
          ABHA
        </button>
      )}
      {veriFiedAbhaAddressData.includes("AADHAAR_OTP") && (
        <button
          onClick={() => handleClick("aadhaar")}
          disabled={isContinueWithNumberLoading}
          className="active:bg-[#1C64F2] mt-3 w-full disabled:border-[#C6C7C9] flex items-center hover:border-2 hover:border-[#4C6AF7] border justify-center disabled:border disabled:bg-[#F9FAFB] disabled:text-[#A2A3A7]  border-[#4C6AF7] item-center px-4 py-2 rounded-lg text-sm text-[#4C6AF7]"
        >
          Aadhaar
        </button>
      )}
      <div className="text-sm mt-72 gap-2 py-5 flex items-center justify-center">
        <span className="text-[#6B7280]">APPROVED BY</span>
        <img src={NationalHealthAuthority} alt="NationalHealthAuthority" />
      </div>
    </div>
  );
};

export default OTPonAadhaarOrMobile;
