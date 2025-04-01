import React, { useEffect, useState } from "react";
import OtpInput from "../../../../common-components/input-field/OTPinput";
import NationalHealthAuthority from "../../../../../images/national-health-authority.svg";

const AadharOTPfield = ({
  aadhaarData,
  onAadhaarOTPverify,
  isAadhaarOTPverify,
  onCreateABHAbyAadhaar,
  setCommunicationNumber,
  communicationNumber,
  aadhaarOTP,
  setAadhaarOTP,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(60);
  const isOtpComplete = aadhaarOTP.every((digit) => digit !== "");

  const handleCommunicationNumber = (e) => {
    const { value } = e.target || {};
    const maxLength = value.replace(/\D/g, "");
    const maxLengthValue = maxLength.slice(0, 10);
    setCommunicationNumber(maxLengthValue);
  };

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
          {aadhaarData.message || "OTP Sent to Your Aadhaar Mobile Number"}
        </div>
        <div className="mt-1">
          <OtpInput otp={aadhaarOTP} setOtp={setAadhaarOTP} />
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
          onClick={onCreateABHAbyAadhaar}
          disabled={timeRemaining > 0}
          className="hover:underline disabled:no-underline disabled:text-[#C6C7C9] text-[#4C6AF7]"
        >
          Resend OTP
        </button>
      </div>
      <div className="flex flex-col mt-5">
        <div className="text-sm mb-1 text-[#111928]">Communication Number</div>
        <div className="text-sm text-[#9CA3AF]">
          This Mobile Number will be used for all the communications related to
          ABHA
        </div>
        <div className="flex mt-2 w-full">
          <input
            type="text"
            disabled
            value="+91"
            className="focus:outline-none w-14 text-[#6B7280]  border-r-0 font-normal bg-[#F9FAFB] placeholder:font-normal rounded-lg rounded-r-none ps-4 flex justify-center items-center border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2.5 focus:border-[#006AF5]"
          />
          <input
            type="text" // Use type="text" for desktop users
            id="communicationNumber"
            className="focus:outline-none text-[#2D2E33] rounded-l-none font-normal bg-[#F9FAFB] placeholder:font-normal rounded-lg px-4 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2.5 w-full focus:border-[#2D2E33]"
            name="communicationNumber"
            value={communicationNumber}
            onChange={handleCommunicationNumber}
            placeholder="Mobile Number"
            maxLength={10} // Set maximum length to 10 characters
            required
          />
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <button
          onClick={() =>
            onAadhaarOTPverify(aadhaarData.id, communicationNumber, aadhaarOTP)
          }
          disabled={
            !isOtpComplete ||
            communicationNumber.length < 10 ||
            isAadhaarOTPverify
          }
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

export default AadharOTPfield;
