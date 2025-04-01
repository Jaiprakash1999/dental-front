import React, { useState } from "react";
import NationalHealthAuthority from "../../../../../../images/national-health-authority.svg";
import MobileOTPfield from "./MobileOTPfield";
import DLform from "./DLform";
import useDrivingLicense from "./hooks/useDrivingLicense";

const CreateABHAnumberbyDL = () => {
  const [inputNumber, setInputNumber] = useState("");
  const [mobileOTP, setMobileOTP] = useState(["", "", "", "", "", ""]);
  const [dlFormInfo, setDLformInfo] = useState({
    dlID: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    firstName: "",
    middleName: "",
    lastName: "",
    state: "",
    district: "",
    pincode: "",
    frontSideOfDL: "",
    backSideOfDL: "",
  });
  const [activeState, setActiveState] = useState("via_driving_licence");

  const handleChange = (e) => {
    const { name, value } = e.target || {};
    if (name === "mobileNumber") {
      const numericValue = value.replace(/\D/g, "");
      const maxLengthValue = numericValue.slice(0, 10);
      setInputNumber(maxLengthValue);
    } else {
      setInputNumber(value);
    }
  };

  const {
    onDLmobileContinue,
    isDLmobileContinue,
    // dlMobileData,
    isDLmobileOTPverifiy,
    onDLmobileOTPverify,
    onDLform,
    isDLform,
  } = useDrivingLicense({
    inputNumber,
    setActiveState,
    mobileOTP,
    dlFormInfo,
  });

  return (
    <div>
      {activeState === "via_driving_licence" && (
        <div className="flex flex-col mt-5">
          <div className="text-sm mb-1 text-[#111928]">Enter Mobile Number</div>
          <div className="text-[#A2A3A7] mb-2 text-sm">
            This mobile number will be used in the creation of new ABHA Number.
            Enter mobile number to receive OTP
          </div>
          <div className="flex mt-1">
            <input
              type="text"
              disabled
              value={"+ 91"}
              className="focus:outline-none text-[#2D2E33] font-normal bg-[#F9FAFB] placeholder:font-normal rounded-lg px-4 border border-r-0 rounded-r-none placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2.5 w-16 focus:border-[#2D2E33]"
            />
            <input
              name="mobileNumber"
              onChange={handleChange}
              value={inputNumber}
              placeholder="Enter Mobile Number"
              className="focus:outline-none text-[#2D2E33] font-normal bg-[#F9FAFB] placeholder:font-normal rounded-lg px-4 border placeholder:text-[#9CA3AF] rounded-l-none border-[#D1D5DB] text-sm py-2.5 w-full focus:border-[#2D2E33]"
            />
          </div>

          <div className="flex justify-end mt-5">
            <button
              disabled={inputNumber.length < 10 || isDLmobileContinue}
              onClick={onDLmobileContinue}
              className="bg-[#4C6AF7] w-1/3 hover:border-[#D8E3FF] disabled:bg-[#F9FAFB] disabled:border-[#C6C7C9] disabled:text-[#A2A3A7] flex justify-center border border-[#1A56DB] item-center px-3.5 py-2 rounded-lg text-sm text-[#FFFFFF]"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {activeState === "mobile_otp_field" && (
        <MobileOTPfield
          mobileOTP={mobileOTP}
          inputNumber={inputNumber}
          setMobileOTP={setMobileOTP}
          onDLmobileOTPverify={onDLmobileOTPverify}
          isDLmobileOTPverifiy={isDLmobileOTPverifiy}
          onDLmobileContinue={onDLmobileContinue}
        />
      )}
      {activeState === "dl_form" && (
        <DLform
          dlFormInfo={dlFormInfo}
          setDLformInfo={setDLformInfo}
          onDLform={onDLform}
          isDLform={isDLform}
        />
      )}
      <div className="mt-96">
        <div className="text-sm gap-2 py-5 flex items-center justify-center">
          <span className="text-[#6B7280]">APPROVED BY</span>
          <img src={NationalHealthAuthority} alt="NationalHealthAuthority" />
        </div>
      </div>
    </div>
  );
};

export default CreateABHAnumberbyDL;
