import React, { useEffect, useState } from "react";
import OtpInput from "../../../../../common-components/input-field/OTPinput";

const MobileOTPfield = ({
  inputNumber,
  mobileOTP,
  setMobileOTP,
  onDLmobileOTPverify,
  isDLmobileOTPverifiy,
  onDLmobileContinue,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(60);
  const isOtpComplete = mobileOTP.every((digit) => digit !== "");

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
          Enter the OTP sent on {inputNumber}
        </div>
        <div className="mt-1">
          <OtpInput otp={mobileOTP} setOtp={setMobileOTP} />
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
          onClick={onDLmobileContinue}
          disabled={timeRemaining > 0}
          className="hover:underline disabled:no-underline disabled:text-[#C6C7C9] text-[#4C6AF7]"
        >
          Resend OTP
        </button>
      </div>

      <div className="flex justify-end mt-5">
        <button
          onClick={onDLmobileOTPverify}
          disabled={isDLmobileOTPverifiy || !isOtpComplete}
          className="bg-[#4C6AF7] w-1/3 hover:border-[#D8E3FF] disabled:bg-[#F9FAFB] disabled:border-[#C6C7C9] disabled:text-[#A2A3A7] flex justify-center border border-[#1A56DB] item-center px-6 py-2 rounded-lg text-sm text-[#FFFFFF]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MobileOTPfield;
