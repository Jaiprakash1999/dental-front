import React, { memo, useEffect, useState } from "react";
import OtpInput from "../../../../common-components/input-field/OTPinput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setDashboardDrawer } from "../../../../../redux-store/slice/checkInDrawerSlice";
import NationalHealthAuthority from "../../../../../images/national-health-authority.svg";
import closeCross from "../../../../../images/close_cross.svg";

const OTPinputField = ({ setActiveState = () => {}, abahOrMobile = "" }) => {
  const dispatch = useDispatch();
  const [timeRemaining, setTimeRemaining] = useState(60);

  const onCloseDrawer = () => {
    dispatch(
      setDashboardDrawer({
        userDrawer: false,
        skipABHA: false,
        createABHAbyAadhaar: false,
        checkInDrawer: false,
        createABHAaddress: false,
      })
    );
  };

  const onBack = () => {
    setActiveState("continue");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeRemaining > 0) {
        setTimeRemaining((prev) => prev - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  });

  const [userOTP, setUserOTP] = useState(["", "", "", "", "", ""]);

  const isUserOtpComplete = userOTP.every((digit) => digit !== "");

  const onNext = () => {
    setActiveState("patient_details_form");
  };

  return (
    <div className="mx-3 my-2">
      <div className="flex justify-between mb-5">
        <button
          onClick={() => onBack()}
          className="text-[#6B7280] text-base uppercase font-medium"
        >
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </button>
        <h1 className="text-[#6B7280] text-base uppercase font-medium">
          CREATE Address
        </h1>
        <button onClick={() => onCloseDrawer()} className="text-[#6B7280]">
          <img src={closeCross} alt="closeCross" />
        </button>
      </div>

      <div className="flex flex-col mt-5">
        <div className="text-sm mb-1 text-[#111928]">Enter OTP*</div>
        <div className="text-sm mb-1 text-[#9CA3AF]">
          OTP Sent to Mobile Number ending with ******2227
        </div>
        <div className="mt-1">
          <OtpInput otp={userOTP} setOtp={setUserOTP} />
        </div>
      </div>

      <div className="flex mt-2 text-sm justify-between">
        <span>Didn't receive the OTP?</span>
        <div className="text-sm">
          <span className="me-2">
            00:
            {timeRemaining.toString().length === 2
              ? timeRemaining
              : `0${timeRemaining}`}
          </span>
          <button
            type="button"
            // onClick={onCreateABHAbyAadhaar}
            disabled={timeRemaining > 0}
            className="hover:underline disabled:no-underline disabled:text-[#C6C7C9] text-[#4C6AF7]"
          >
            Resend OTP
          </button>
        </div>
      </div>

      <div className="flex justify-end mt-5">
        <button
          disabled={!isUserOtpComplete}
          onClick={onNext}
          className="bg-[#4C6AF7] w-1/3 hover:border-[#D8E3FF] hover:bg-[#4C6AF7] disabled:bg-[#F9FAFB] disabled:border-[#D1D5DB] disabled:text-[#9CA3AF] flex justify-center border border-[#1A56DB] item-center px-6 py-2 rounded-lg text-sm text-[#FFFFFF]"
        >
          Next
        </button>
      </div>
      <div className="text-sm mt-96 gap-2 py-5 flex items-center justify-center">
        <span className="text-[#6B7280]">APPROVED BY</span>
        <img src={NationalHealthAuthority} alt="NationalHealthAuthority" />
      </div>
    </div>
  );
};

export default memo(OTPinputField);
