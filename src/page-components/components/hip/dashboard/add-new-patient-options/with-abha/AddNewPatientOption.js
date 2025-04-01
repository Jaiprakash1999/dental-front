import React from "react";
import NationalHealthAuthority from "../../../../../../images/national-health-authority.svg";
import { useDispatch } from "react-redux";
import { setDashboardDrawer } from "../../../../../../redux-store/slice/checkInDrawerSlice";
import closeCross from "../../../../../../images/close_cross.svg";
const { REACT_APP_ABHA_ADDRESS_SUFFIX } = process.env;

const AddNewPatientOption = ({
  onClose = () => {},
  inputNumber = "",
  abhaAddress = "",
  onAadharMobileContinue = () => {},
  setActiveRegisterState = () => {},
  setInputNumber = () => {},
  isContinueWithNumberLoading = false,
  setAbhaAddress = () => {},
  onVerifyABHAaddress = () => {},
  isVerifingAbhaAddress = false,
}) => {
  const handleChange = (e) => {
    const { value } = e.target;
    // Remove any non-numeric characters
    const numericValue = value.replace(/\D/g, "");
    // Limit to maximum 10 characters
    const maxLengthValue = numericValue.slice(0, 14);
    setInputNumber(maxLengthValue);
  };
  const dispatch = useDispatch();

  const handleSkipAbha = () => {
    dispatch(
      setDashboardDrawer({
        userDrawer: false,
        checkInDrawer: false,
        skipABHA: true,
        createABHAbyAadhaar: false,
      })
    );
  };

  const onCreateAbhaNumberByAadhaar = () => {
    dispatch(
      setDashboardDrawer({
        userDrawer: false,
        checkInDrawer: false,
        skipABHA: false,
        createABHAbyAadhaar: true,
      })
    );
  };

  const onCreateAbhaAddress = () => {
    dispatch(
      setDashboardDrawer({
        userDrawer: false,
        checkInDrawer: false,
        skipABHA: false,
        createABHAbyAadhaar: false,
        createABHAaddress: true,
      })
    );
  };
  const handleAbhaAddress = (e) => {
    const { value } = e.target;
    setAbhaAddress(value);
  };

  const onContinue = () => {
    if (inputNumber.length === 14 && abhaAddress.length === 0) {
      setActiveRegisterState("abha_number_otp_option");
    } else if (inputNumber.length === 0 && abhaAddress.length > 0) {
      onVerifyABHAaddress();
    } else {
      onAadharMobileContinue();
    }
  };

  return (
    <div>
      <div className="flex mb-4 justify-between">
        <h1 className="text-[#6B7280] text-base uppercase font-medium">
          Add Patient
        </h1>
        <button onClick={() => onClose()} className="text-[#6B7280]">
          <img src={closeCross} alt="closeCross" />
        </button>
      </div>
      <div className="flex flex-col my-2">
        <div className="text-sm mb-1 text-[#111928]">
          Aadhaar/ Mobile/ ABHA Number
        </div>
        <div>
          <input
            name="inputNumber"
            type="text"
            onChange={handleChange}
            value={inputNumber}
            maxLength={14}
            disabled={abhaAddress.length > 0}
            placeholder="Enter Aadhaar/ Mobile/ ABHA Number"
            className="focus:outline-none text-[#374151] font-normal bg-[#F9FAFB] placeholder:font-normal rounded-lg px-4 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2.5 w-full focus:border-[#2D2E33]"
          />
        </div>
      </div>

      <div className="flex text-[#D1D5DB] w-full justify-center items-center text-center flex-row">
        <span className="mx-2 text-[#374151] text-sm">Or</span>
      </div>

      <div className="flex w-full text-sm text-[#111928] flex-col">
        <label className="mb-1" htmlFor="abhaAddress">
          ABHA Address
        </label>
        <div className="flex w-full">
          <input
            type="text" // Use type="text" for desktop users
            id="abhaAddress"
            className="focus:outline-none text-[#374151] rounded-r-none font-normal bg-[#F9FAFB] placeholder:font-normal rounded-lg px-4 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2.5 w-full focus:border-[#2D2E33]"
            name="abhaAddress"
            value={abhaAddress}
            disabled={inputNumber.length > 0}
            onChange={handleAbhaAddress}
            placeholder="Enter ABHA Address"
            // maxLength={12} // Set maximum length to 10 characters
            required
          />
          <input
            type="text"
            disabled
            value={REACT_APP_ABHA_ADDRESS_SUFFIX}
            className="focus:outline-none w-14 text-[#6B7280]  border-l-0 font-normal bg-[#F9FAFB] placeholder:font-normal rounded-lg rounded-l-none px-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2.5 focus:border-[#2D2E33]"
          />
        </div>
      </div>

      <div className="flex pt-5 pb-2.5 justify-between gap-2 w-full">
        <button
          className="active:bg-[#1C64F2] h-10 disabled:border-[#C6C7C9] flex items-center hover:border-2 hover:border-[#4C6AF7] border justify-center disabled:border disabled:bg-[#F9FAFB] disabled:text-[#A2A3A7]  border-[#4C6AF7] item-center px-6 py-2 rounded-lg text-sm text-[#4C6AF7]"
          onClick={handleSkipAbha}
        >
          Skip ABHA
        </button>
        <button
          onClick={onContinue}
          disabled={
            isContinueWithNumberLoading ||
            isVerifingAbhaAddress ||
            (abhaAddress.length === 0 &&
              (inputNumber.length < 10 ||
                inputNumber.length === 11 ||
                inputNumber.length === 13)) ||
            (inputNumber.length === 0 && abhaAddress.length === 0)
          }
          className="bg-[#4C6AF7] h-10 hover:border-[#D8E3FF] disabled:bg-[#F9FAFB] disabled:border-[#C6C7C9] disabled:text-[#A2A3A7] flex justify-center border border-[#1A56DB] item-center px-6 py-2 rounded-lg text-sm text-[#FFFFFF]"
        >
          Continue
        </button>
      </div>

      <div className="mt-80">
        <div className="pb-3">
          <h1 className="text-sm text-[#9CA3AF] my-1">
            Don't have ABHA ? Create
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => onCreateAbhaNumberByAadhaar()}
              className="active:bg-[#1C64F2] w-1/2 h-10 disabled:border-[#C6C7C9] flex items-center hover:border-2 hover:border-[#4C6AF7] border justify-center disabled:border disabled:bg-[#F9FAFB] disabled:text-[#A2A3A7]  border-[#4C6AF7] item-center px-4 py-2 rounded-lg text-sm text-[#4C6AF7]"
            >
              ABHA Number
            </button>
            <button
              onClick={() => onCreateAbhaAddress()}
              className="active:bg-[#1C64F2] h-10 w-1/2 disabled:border-[#C6C7C9] flex items-center hover:border-2 hover:border-[#4C6AF7] border justify-center disabled:border disabled:bg-[#F9FAFB] disabled:text-[#A2A3A7]  border-[#4C6AF7] item-center px-4 py-2 rounded-lg text-sm text-[#4C6AF7]"
            >
              ABHA Address
            </button>
          </div>
        </div>
        <div className="text-sm gap-2 py-5 flex items-center justify-center">
          <span className="text-[#6B7280]">APPROVED BY</span>
          <img src={NationalHealthAuthority} alt="NationalHealthAuthority" />
        </div>
      </div>
    </div>
  );
};

export default AddNewPatientOption;
