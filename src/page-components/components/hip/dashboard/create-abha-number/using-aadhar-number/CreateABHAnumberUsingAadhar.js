import React from "react";
import CircleInfo from "../../../../../../images/CircleInfo.svg";
import NationalHealthAuthority from "../../../../../../images/national-health-authority.svg";

const CreateABHAnumberUsingAadhar = ({
  onCreateABHAbyAadhaar,
  isCreateABHAbyAadharloading,
  inputNumber,
  setInputNumber,
}) => {
  // const [aadhaarNumber, setAadharNumber] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target || {};
    if (name === "aadhaarNumber") {
      const numericValue = value.replace(/\D/g, "");
      const maxLengthValue = numericValue.slice(0, 12);
      setInputNumber(maxLengthValue);
    }
  };

  return (
    <div>
      <div className="flex flex-col mt-5">
        <div className="text-sm mb-1 text-[#111928]">Enter Aadhaar Number</div>
        <div>
          <input
            name="aadhaarNumber"
            onChange={handleChange}
            value={inputNumber}
            placeholder="Enter Aadhaar Number"
            className="focus:outline-none text-[#2D2E33] font-normal bg-[#F9FAFB] placeholder:font-normal rounded-lg px-4 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2.5 w-full focus:border-[#2D2E33]"
          />
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <button
          disabled={inputNumber.length < 12 || isCreateABHAbyAadharloading}
          onClick={() => onCreateABHAbyAadhaar()}
          className="bg-[#4C6AF7] w-1/3 hover:border-[#D8E3FF] disabled:bg-[#F9FAFB] disabled:border-[#C6C7C9] disabled:text-[#A2A3A7] flex justify-center border border-[#1A56DB] item-center px-3.5 py-2 rounded-lg text-sm text-[#FFFFFF]"
        >
          Next
        </button>
      </div>
      <div className="w-full mt-4">
        <div className="flex items-start text-[#9CA3AF] text-sm">
          <img src={CircleInfo} alt="CircleInfo" className="m-1" />
          <h1>
            Please ensure that mobile number is linked with Aadhaar as it will
            be required for OTP authentication.
          </h1>
        </div>
        <div className="text-[#9CA3AF] mt-3 flex items-start text-sm ">
          <img src={CircleInfo} alt="CircleInfo" className="m-1" />
          <h1>
            In case of not having a linked mobile number, visit the nearest ABDM
            participating facility and seek assistance.
          </h1>
        </div>
      </div>
      <div className="mt-80">
        <div className="text-sm gap-2 py-5 flex items-center justify-center">
          <span className="text-[#6B7280]">APPROVED BY</span>
          <img src={NationalHealthAuthority} alt="NationalHealthAuthority" />
        </div>
      </div>
    </div>
  );
};

export default CreateABHAnumberUsingAadhar;
