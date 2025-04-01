import React, { useEffect, useState } from "react";
import NationalHealthAuthority from "../../../../../../images/national-health-authority.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import OtpInput from "../../../../../common-components/input-field/OTPinput";
import closeCross from "../../../../../../images/close_cross.svg";

const AadhaarMobileAbhaOTPinputField = ({
  onAadharMobileContinue,
  isContinueWithNumberLoading,
  onOTPverifyViaAbha,
  isOTPverifyViaAbhaLoading,
  onClose,
  setActiveRegisterState,
  inputNumber,
  continueWithAadhaarMobileData,
}) => {
  const [OTP, setOTP] = useState(["", "", "", "", "", ""]);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const isOtpComplete = OTP.every((digit) => digit !== "");
  const onBack = () => {
    setActiveRegisterState("choose_options");
  };

  let selctedMethod = "ABHA Address";
  if (inputNumber.length === 12) {
    selctedMethod = "Aadhaar";
  } else if (inputNumber.length === 14) {
    selctedMethod = "ABHA Number";
  } else if (inputNumber.length === 10) {
    selctedMethod = "Mobile";
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeRemaining > 0) {
        setTimeRemaining((prev) => prev - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeRemaining]);

  const onResend = () => {
    setTimeRemaining(60);
    onAadharMobileContinue();
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
          Login with {selctedMethod}
        </h1>
        <button onClick={() => onClose()} className="text-[#6B7280]">
          <img src={closeCross} alt="closeCross" />
        </button>
      </div>
      <div className="flex flex-col mt-5">
        <div className="text-sm mb-1 text-[#111928]">Enter OTP*</div>
        <div className="text-sm mb-1 text-[#9CA3AF]">
          {continueWithAadhaarMobileData.message ||
            "OTP Sent to Aadhaar Mobile Number"}
        </div>
        <div className="mt-1">
          <OtpInput otp={OTP} setOtp={setOTP} />
        </div>
      </div>
      <div className="flex text-[#C6C7C9] mt-2 text-sm justify-between">
        Didn't receive the OTP?
      </div>
      <div className="text-sm">
        <span className="me-2">
          00:
          {timeRemaining.toString().length === 2
            ? timeRemaining
            : `0${timeRemaining}`}
        </span>
        <button
          type="button"
          onClick={onResend}
          disabled={isContinueWithNumberLoading || timeRemaining > 0}
          className="hover:underline disabled:no-underline disabled:text-[#C6C7C9] text-[#4C6AF7]"
        >
          Resend OTP
        </button>
      </div>

      <div className="flex justify-end mt-5">
        <button
          onClick={() => onOTPverifyViaAbha(OTP)}
          disabled={!isOtpComplete || isOTPverifyViaAbhaLoading}
          className="bg-[#4C6AF7] w-1/3 hover:border-[#D8E3FF] disabled:bg-[#F9FAFB] disabled:border-[#C6C7C9] disabled:text-[#A2A3A7] flex justify-center border border-[#1A56DB] item-center px-6 py-2 rounded-lg text-sm text-[#FFFFFF]"
        >
          Next
        </button>
      </div>
      <div className="mt-96">
        <div className="text-sm gap-2 py-5 flex items-center justify-center">
          <span className="text-[#6B7280]">APPROVED BY</span>
          <img src={NationalHealthAuthority} alt="NationalHealthAuthority" />
        </div>
      </div>
    </div>
  );
};

export default AadhaarMobileAbhaOTPinputField;
