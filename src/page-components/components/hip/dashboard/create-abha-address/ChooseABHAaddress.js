import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setDashboardDrawer } from "../../../../../redux-store/slice/checkInDrawerSlice";
import RightArrowUp from "../../../../../images/right-arrow-up.svg";
import NationalHealthAuthority from "../../../../../images/national-health-authority.svg";
import closeCross from "../../../../../images/close_cross.svg";
const { REACT_APP_ABHA_ADDRESS_SUFFIX } = process.env;

const SUGGESTED_ABHA_ADDRESS = ["ibrahim23", "akshat", "goyal", "jaiprakash"];

const ChooseABHAaddress = ({ setActiveState = () => {} }) => {
  const [inputAbhaAddress, setInputAbhaAddress] = useState("");
  const dispatch = useDispatch();

  const onSelectedABHAaddress = (value) => {
    setInputAbhaAddress(value);
  };

  const onBack = () => {
    setActiveState("patient_details_form");
  };

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

  const handleAbhaAddress = (e) => {
    const { value } = e.target || {};
    setInputAbhaAddress(value);
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
      <div className="flex w-full text-sm text-[#111928] flex-col">
        <label className="mb-1" htmlFor="abhaAddress">
          Enter New ABHA Address
        </label>
        <div className="flex w-full">
          <input
            type="text" // Use type="text" for desktop users
            id="abhaAddress"
            className="focus:outline-none text-[#2D2E33] rounded-r-none font-normal bg-[#F9FAFB] placeholder:font-normal rounded-lg px-4 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2.5 w-full focus:border-[#2D2E33]"
            name="abhaAddress"
            value={inputAbhaAddress}
            onChange={handleAbhaAddress}
            placeholder="Enter ABHA Address"
            maxLength={12} // Set maximum length to 10 characters
            required
          />
          <input
            type="text"
            disabled
            value={REACT_APP_ABHA_ADDRESS_SUFFIX}
            className="focus:outline-none w-14 text-[#6B7280]  border-l-0 font-normal bg-[#F9FAFB] placeholder:font-normal rounded-lg rounded-l-none px-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2.5 focus:border-[#006AF5]"
          />
        </div>
      </div>
      <div className="text-[#7F8185] text-sm my-2.5">
        Suggested ABHA Address:
      </div>
      <div className="flex text-sm flex-wrap">
        {SUGGESTED_ABHA_ADDRESS.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => onSelectedABHAaddress(item)}
              className="flex bg-[#F9FAFB] items-center border me-2.5 rounded-lg mb-2.5 border-[#D1D5DB] px-3 py-1 gap-3"
            >
              <img src={RightArrowUp} alt="RightArrowUp" />
              {item}
            </button>
          );
        })}
      </div>
      <div className="flex pt-5 pb-2.5 justify-end gap-2 w-full">
        <button
          // disabled={inputMobileNumber.length < 10}
          className="bg-[#4C6AF7] hover:border-[#D8E3FF] hover:bg-[#4C6AF7] disabled:bg-[#F9FAFB] disabled:border-[#D1D5DB] disabled:text-[#9CA3AF] flex justify-center border border-[#1A56DB] item-center px-6 py-2 rounded-lg text-sm text-[#FFFFFF]"
          disabled={inputAbhaAddress === ""}
          // onClick={() => setIsMobileOTPinput(true)}
        >
          Register
        </button>
      </div>
      <div className="text-sm mt-80 gap-2 py-5 flex items-center justify-center">
        <span className="text-[#6B7280]">APPROVED BY</span>
        <img src={NationalHealthAuthority} alt="NationalHealthAuthority" />
      </div>
    </div>
  );
};

export default ChooseABHAaddress;
