import React from "react";
import Select from "../../../../../common-components/Select";
import { GENDER } from "../../../../../constants/Constant";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../../../../../common-components/Buttons/PrimaryButton";
import useGetStateAndDistrict from "./hooks/useGetStateAndDistrict";
import {
  formatDistricts,
  formatStates,
} from "../../../../../utils/formateArray";

const DLform = ({
  dlFormInfo = {},
  setDLformInfo = () => {},
  onDLform,
  isDLform,
}) => {
  const handleChange = (e) => {
    const { name, value, type } = e.target || {};
    if (type === "file") {
      const file = e.target.files[0];
      setDLformInfo((prev) => ({ ...prev, [name]: file }));
    } else {
      setDLformInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isFormValid = () => {
    const { middleName, ...rest } = dlFormInfo; // Destructure to exclude middleName
    return Object.values(rest).every((value) => value !== ""); // Check if all remaining values are not empty
  };

  

  const { allDistricts, allStates, isDistrictLoading, isStatesLoading } =
    useGetStateAndDistrict({ statecode: dlFormInfo.state });

  return (
    <div className="text-sm">
      <div className="text-[#7F8185]">Driving Licence Details</div>
      <div>
        <div className="mt-2">
          <div className="text-[#2D2E33] mb-1">Driving Licence ID*</div>
          <input
            placeholder="Enter ID"
            name="dlID"
            onChange={handleChange}
            className="border w-full focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
            value={dlFormInfo.dlID || ""}
          />
        </div>
        <div className="flex mt-2 text-sm text-[#2D2E33] flex-col">
          <label className="mb-1">First Name*</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={dlFormInfo.firstName}
            onChange={handleChange}
            className="border focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
          />
        </div>
        <div className="flex mt-2 text-sm text-[#2D2E33] flex-col">
          <label className="mb-1">Middle Name</label>
          <input
            type="text"
            name="middleName"
            placeholder="Middle Name"
            value={dlFormInfo.middleName}
            onChange={handleChange}
            className="border focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
          />
        </div>
        <div className="flex mt-2 text-sm text-[#2D2E33] flex-col">
          <label className="mb-1">Last Name*</label>
          <input
            type="text"
            name="lastName"
            placeholder="First Name"
            value={dlFormInfo.lastName}
            onChange={handleChange}
            className="border focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-[#2D2E33] w-1/2 py-2 flex flex-col">
            <div className="mb-1">Gender*</div>
            <Select
              options={GENDER}
              name="gender"
              placeholder="gender"
              value={dlFormInfo.gender}
              onChange={handleChange}
              required={false}
              readOnly
              upIcon={faAngleUp}
              openTopPosition="top-2"
              closeTopPosition="top-2"
              downIcon={faAngleDown}
              className="border w-full focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
            />
          </div>
          <div className="text-sm w-1/2 text-[#2D2E33] flex flex-col">
            <label className="mb-1">Date of birth*</label>
            <input
              type="date"
              name="dateOfBirth"
              dateFormat="yyyy-MM-dd"
              value={dlFormInfo.dateOfBirth}
              onChange={handleChange}
              style={{ padding: "7px" }}
              className="border-[#D1D5DB] uppercase w-full  focus:border-[#2D2E33] text-sm text-gray-800 border placeholder:text-[#6B7280] focus:outline-none rounded-lg px-3"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-[#2D2E33] w-1/2 py-2 flex flex-col">
            <div className="mb-1">State*</div>
            <Select
              options={formatStates(allStates)}
              name="state"
              placeholder="State"
              value={dlFormInfo.state}
              onChange={handleChange}
              required={false}
              readOnly={false}
              disabled={isStatesLoading}
              upIcon={faAngleUp}
              openTopPosition="top-2"
              closeTopPosition="top-2"
              downIcon={faAngleDown}
              className="border w-full focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
            />
          </div>
          <div className="text-sm w-1/2 text-[#2D2E33] flex flex-col">
            <label className="mb-1">District*</label>
            <Select
              options={formatDistricts(allDistricts)}
              name="district"
              placeholder="District"
              value={dlFormInfo.district}
              onChange={handleChange}
              required={false}
              readOnly={false}
              upIcon={faAngleUp}
              openTopPosition="top-2"
              disabled={isDistrictLoading}
              closeTopPosition="top-2"
              downIcon={faAngleDown}
              className="border w-full focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
            />
          </div>
        </div>

        <div className="mt-2">
          <div className="text-[#2D2E33] mb-1">Address*</div>
          <textarea
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="border w-full focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
            value={dlFormInfo.address || ""}
          />
        </div>
      </div>
      <div className="flex mt-2 text-sm text-[#2D2E33] flex-col">
        <label className="mb-1">Pin Code*</label>
        <input
          type="text"
          name="pincode"
          placeholder="First Name"
          value={dlFormInfo.pincode}
          onChange={handleChange}
          className="border focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
        />
      </div>
      <div className="flex items-center gap-3">
        <div className="text-sm text-[#2D2E33] w-1/2 py-2 flex flex-col">
          <div className="mb-1">Front Side Photo of DL*</div>
          <input
            type="file"
            name="frontSideOfDL"
            onChange={handleChange}
            placeholder="Front Side Of DL"
            className="border w-full focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
          />
          {dlFormInfo.frontSideOfDL && (
            <p className="text-gray-600">{dlFormInfo.frontSideOfDL.name}</p>
          )}
        </div>
        <div className="text-sm w-1/2 text-[#2D2E33] flex flex-col">
          <label className="mb-1">Back Side Photo of DL*</label>
          <input
            type="file"
            name="backSideOfDL"
            placeholder="Back Side Of DL"
            onChange={handleChange}
            accept=".jpg,.jpeg,.png"
            className="border w-full focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
          />
          {dlFormInfo.backSideOfDL && (
            <p className="text-gray-600">{dlFormInfo.backSideOfDL.name}</p>
          )}
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <PrimaryButton
          buttonName="Submit"
          onClick={onDLform}
          disabled={isDLform || !isFormValid()}
          width="w-full"
        />
      </div>
    </div>
  );
};

export default DLform;
