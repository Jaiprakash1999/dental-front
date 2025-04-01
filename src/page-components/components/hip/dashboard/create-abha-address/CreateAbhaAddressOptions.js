import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setDashboardDrawer } from "../../../../../redux-store/slice/checkInDrawerSlice";
import CreateAbhaAddressUsingMobile from "./using-mobile-number/CreateAbhaAddressUsingMobile";
import CreateAbhaAddressUsingAbhaNumber from "./using-abha-number/CreateAbhaAddressUsingAbhaNumber";
import NationalHealthAuthority from "../../../../../images/national-health-authority.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import closeCross from "../../../../../images/close_cross.svg";

const CreateAbhaAddressOptions = ({
  setActiveState = () => {},
  setAbhaOrMobile = () => {},
}) => {
  const [inputMobileNumber, setInputMobileNumber] = useState("");
  const [inputABHAnumber, setInputABHAnumber] = useState("");
  const dispatch = useDispatch();

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
    dispatch(
      setDashboardDrawer({
        userDrawer: true,
        skipABHA: false,
        createABHAbyAadhaar: false,
        checkInDrawer: false,
        createABHAaddress: false,
      })
    );
  };

  const continueWithMobileNumber = () => {
    setAbhaOrMobile("mobileNumber");
  };

  const continueWithABHAnumber = () => {
    setAbhaOrMobile("abhaNumber");
  };

  const onContinue = () => {
    setActiveState("otp_field");
    if (inputMobileNumber === "") {
      continueWithABHAnumber();
    } else {
      continueWithMobileNumber();
    }
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
      <CreateAbhaAddressUsingMobile
        inputMobileNumber={inputMobileNumber}
        inputABHAnumber={inputABHAnumber}
        setInputMobileNumber={setInputMobileNumber}
      />
      <div className="flex text-[#D1D5DB] w-full justify-center items-center text-center flex-row">
        <span className="mx-2 text-[#374151] text-sm">Or</span>
      </div>
      <CreateAbhaAddressUsingAbhaNumber
        inputABHAnumber={inputABHAnumber}
        inputMobileNumber={inputMobileNumber}
        setInputABHAnumber={setInputABHAnumber}
      />

      <div className="flex pt-5 pb-2.5 justify-end gap-2 w-full">
        <button
          disabled={
            inputMobileNumber === ""
              ? inputABHAnumber.length < 12
              : inputMobileNumber.length < 10
          }
          className="bg-[#1A56DB] disabled:bg-[#F9FAFB] disabled:border-[#D1D5DB] disabled:text-[#9CA3AF] flex justify-center border border-[#1A56DB] item-center px-6 py-2 rounded-lg text-sm text-[#FFFFFF]"
          // disabled={!isMobileOtpComplete}
          // onClick={() => setIsMobileOTPinput(true)}
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
      <div className="text-sm mt-80 gap-2 py-5 flex items-center justify-center">
        <span className="text-[#6B7280]">APPROVED BY</span>
        <img src={NationalHealthAuthority} alt="NationalHealthAuthority" />
      </div>
    </div>
  );
};

export default CreateAbhaAddressOptions;
