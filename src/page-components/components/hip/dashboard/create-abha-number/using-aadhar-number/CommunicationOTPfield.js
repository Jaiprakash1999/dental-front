import { useState, useEffect } from "react";
import OtpInput from "../../../../../common-components/input-field/OTPinput";
import NationalHealthAuthority from "../../../../../../images/national-health-authority.svg";

const CommunicationOTPfield = ({
  onCommunicationOTPverify,
  isCommunicationOTPverify,
  aadhaarData,
  onAadhaarOTPverify,
  communicationNumber,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [communicationOTP, setCommunicationOTP] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const isOtpComplete = communicationOTP.every((digit) => digit !== "");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeRemaining > 0) {
        setTimeRemaining((prev) => prev - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeRemaining]);

  return (
    <div>
      <div className="flex flex-col mt-5">
        <div className="text-sm mb-1 text-[#111928]">Enter OTP*</div>
        <div className="text-sm mb-1 text-[#9CA3AF]">
          OTP Sent to given Communication Number ending with
          <span className="ms-1">
            {" "}
            {communicationNumber.split("").slice(6).join("")}
          </span>
        </div>
        <div className="mt-1">
          <OtpInput otp={communicationOTP} setOtp={setCommunicationOTP} />
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
          onClick={onAadhaarOTPverify}
          disabled={timeRemaining > 0}
          className="hover:underline disabled:no-underline disabled:text-[#C6C7C9] text-[#4C6AF7]"
        >
          Resend OTP
        </button>
      </div>

      <div className="flex justify-end mt-5">
        <button
          onClick={() =>
            onCommunicationOTPverify(aadhaarData.id, communicationOTP)
          }
          disabled={!isOtpComplete || isCommunicationOTPverify}
          className="bg-[#4C6AF7] w-1/3 hover:border-[#D8E3FF] disabled:bg-[#F9FAFB] disabled:border-[#C6C7C9] disabled:text-[#A2A3A7] flex justify-center border border-[#1A56DB] item-center px-6 py-2 rounded-lg text-sm text-[#FFFFFF]"
        >
          Next
        </button>
      </div>
      <div className="mt-64">
        <div className="text-sm gap-2 py-5 flex items-center justify-center">
          <span className="text-[#6B7280]">APPROVED BY</span>
          <img src={NationalHealthAuthority} alt="NationalHealthAuthority" />
        </div>
      </div>
    </div>
  );
};

export default CommunicationOTPfield;
