import React, { memo } from "react";

const CreateAbhaAddressUsingMobile = ({
  inputMobileNumber,
  setInputMobileNumber,
  inputABHAnumber,
}) => {
  const handleMobileNumber = (e) => {
    const { value } = e.target || {};
    const maxLength = value.replace(/\D/g, "");
    const maxLengthValue = maxLength.slice(0, 10);
    setInputMobileNumber(maxLengthValue);
  };

  return (
    <div className="flex flex-col mb-2">
      <div className="text-sm mb-1 text-[#111928]">Using Mobile Number</div>
      <div className="flex w-full">
        <input
          type="text"
          disabled
          value="+91"
          className="focus:outline-none w-14 text-[#374151]  border-r-0 font-normal bg-[#F9FAFB] placeholder:font-normal rounded-lg rounded-r-none ps-4 flex justify-center items-center border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2.5 focus:border-[#2D2E33]"
        />
        <input
          type="text" // Use type="text" for desktop users
          id="mobileNumber"
          disabled={inputABHAnumber.length > 0}
          className="focus:outline-none text-[#374151] rounded-l-none font-normal bg-[#F9FAFB] placeholder:font-normal rounded-lg px-4 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2.5 w-full focus:border-[#2D2E33]"
          name="mobileNumber"
          value={inputMobileNumber}
          onChange={handleMobileNumber}
          placeholder="Enter Mobile Number"
          maxLength={10} // Set maximum length to 10 characters
          required
        />
      </div>
    </div>
  );
};

export default memo(CreateAbhaAddressUsingMobile);
