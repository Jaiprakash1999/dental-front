import React from "react";
import PrimaryButton from "../../../../../common-components/Buttons/PrimaryButton";
import rightRotateArrow from "../../../../../../images/right-arrow-up.svg";
import Skeleton from "react-loading-skeleton";
import SecondaryButton from "../../../../../common-components/Buttons/SecondaryButton";
const { REACT_APP_ABHA_ADDRESS_SUFFIX } = process.env;

const CreateABHAaddressByAadhaar = ({
  suggestedABHA,
  isSuggestionABHALoading,
  onCreateCustomABHAaddress,
  isCreatingABHAaddress,
  inputABHAaddress = "",
  setInputABHAaddress,
  setActiveState,
}) => {
  const { suggestions = [] } = suggestedABHA || {};

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target || {};
    if (type === "checkbox") {
      setInputABHAaddress((prev) => ({ ...prev, [name]: checked }));
    } else {
      setInputABHAaddress((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onDefault = () => {
    setActiveState("abha_card");
  };

  return (
    <div className="text-sm text-[#2D2E33">
      <div className="my-2">Proceed with default ABHA Address</div>
      <div>
        <PrimaryButton
          buttonName="Continue"
          width="w-full"
          onClick={onDefault}
        />
      </div>
      <div className="my-2 gap-2 text-[#7F8185] justify-center flex items-center ">
        <hr className="w-1/3"></hr>
        Or
        <hr className="w-1/3"></hr>
      </div>
      <div>
        <div className="mb-1 text-[#7F8185]">Enter New ABHA Address</div>
        <div className="flex w-full">
          <input
            type="text" // Use type="text" for desktop users
            id="selectedABHAaddress"
            className="focus:outline-none text-[#374151] rounded-r-none font-normal bg-[#F9FAFB] placeholder:font-normal rounded-lg px-4 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2.5 w-full focus:border-[#2D2E33]"
            name="selectedABHAaddress"
            value={inputABHAaddress.selectedABHAaddress}
            disabled={isCreatingABHAaddress}
            onChange={handleChange}
            placeholder="Enter ABHA Address"
            // maxLength={12} // Set maximum length to 10 characters
          />
          <input
            type="text"
            disabled
            value={REACT_APP_ABHA_ADDRESS_SUFFIX}
            className="focus:outline-none w-14 text-[#6B7280]  border-l-0 font-normal bg-[#F9FAFB] placeholder:font-normal rounded-lg rounded-l-none px-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2.5 focus:border-[#2D2E33]"
          />
        </div>
        {inputABHAaddress.selectedABHAaddress === "" ? null : (
          <div className="my-2 gap-2 items-center flex">
            <div>
              <input
                type="checkbox"
                name="preferredAbhaAddress"
                checked={inputABHAaddress.preferredAbhaAddress}
                className="mt-1 placeholder:text-[#C6C7C9] text-[#2D2E33] focus:outline-none border-b"
                onChange={handleChange}
              />
            </div>
            <div className="text-[#5E6066]">Make it default ABHA Address</div>
          </div>
        )}
      </div>
      <div>
        <div className="text-[#7F8185] my-2">Suggested ABHA Address:</div>
        {isSuggestionABHALoading ? (
          [1, 2, 3, 4, 5].map(() => <Skeleton width={36} />)
        ) : (
          <div className="flex flex-wrap gap-3">
            {(suggestions || []).map((abha, index) => {
              return (
                <div key={index} className="">
                  <button
                    onClick={() =>
                      setInputABHAaddress((prev) => ({
                        ...prev,
                        selectedABHAaddress: abha,
                      }))
                    }
                    className="bg-[#D8E3FF] flex gap-3 rounded-lg px-4 py-2"
                  >
                    <img src={rightRotateArrow} alt="rightRotateArrow" />
                    {abha}
                  </button>
                </div>
              );
            })}
          </div>
        )}
        <div className="mt-4 flex justify-end">
          <SecondaryButton
            width="w-fit"
            buttonName="Register"
            disabled={inputABHAaddress === ""}
            onClick={onCreateCustomABHAaddress}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateABHAaddressByAadhaar;
