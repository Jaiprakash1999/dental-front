import React, { memo } from "react";
import { setDashboardDrawer } from "../../../../../../redux-store/slice/checkInDrawerSlice";
import { useDispatch } from "react-redux";

const CreateAbhaAddressUsingAbhaNumber = ({
  inputABHAnumber,
  setInputABHAnumber,
  inputMobileNumber,
}) => {
  const dispatch = useDispatch();
  const handleABHAnumber = (e) => {
    const { value } = e.target || {};
    const maxLength = value.replace(/\D/g, "");
    const maxLengthValue = maxLength.slice(0, 12);
    setInputABHAnumber(maxLengthValue);
  };

  const onCreateAbhaNumberByAadhaar = () => {
    dispatch(
      setDashboardDrawer({
        userDrawer: false,
        checkInDrawer: false,
        skipABHA: false,
        createABHAbyAadhaar: true,
        createABHAaddress: false,
      })
    );
  };

  return (
    <div className="flex w-full text-sm text-[#111928] flex-col">
      <label className="mb-1" htmlFor="abhaAddress">
        Using ABHA Number
      </label>
      <div className="flex w-full">
        <input
          type="text" // Use type="text" for desktop users
          id="abhaAddress"
          className="focus:outline-none text-[#374151] font-normal bg-[#F9FAFB] placeholder:font-normal rounded-lg px-4 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2.5 w-full focus:border-[#2D2E33]"
          name="abhaAddress"
          value={inputABHAnumber}
          onChange={handleABHAnumber}
          placeholder="Enter ABHA Number"
          disabled={inputMobileNumber.length > 0}
          maxLength={12} // Set maximum length to 10 characters
          required
        />
      </div>
      <div className="flex items-center mt-1 gap-1">
        <h1 className="text-sm text-[#9CA3AF]">Don't have ABHA ? Create by</h1>
        <button
          onClick={onCreateAbhaNumberByAadhaar}
          className="text-sm text-[#4C6AF7] hover:underline"
        >
          clicking here
        </button>
      </div>
    </div>
  );
};

export default memo(CreateAbhaAddressUsingAbhaNumber);
