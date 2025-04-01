import React from "react";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../../common-components/Buttons/PrimaryButton";

const FilterModal = ({
  handleFilterChange = () => {},
  filterName = {},
  getPatientList = () => {},
}) => {
  const { t } = useTranslation();
  return (
    <div className="rounded w-fit bg-white border shadow text-sm py-3 px-5 ">
      <div>
        <div className="font-medium mb-1">{t("Gender")}</div>
        <div className="flex items-center gap-5">
          <button
            onClick={() =>
              handleFilterChange({
                target: { name: "gender", value: "" },
              })
            }
            className={`${
              filterName.gender.includes("")
                ? "bg-[#4C6AF7] text-white"
                : "border-[#DADADA] border"
            } w-16 py-2 rounded-lg`}
          >
            {t("All")}
          </button>
          <button
            onClick={() =>
              handleFilterChange({ target: { name: "gender", value: "Male" } })
            }
            className={`${
              filterName.gender.includes("Male")
                ? "bg-[#4C6AF7] text-white"
                : "border-[#DADADA] border"
            } w-20 py-2 rounded-lg`}
          >
            {t("Male")}
          </button>
          <button
            onClick={() =>
              handleFilterChange({
                target: { name: "gender", value: "Female" },
              })
            }
            className={`${
              filterName.gender.includes("Female")
                ? "bg-[#4C6AF7] text-white"
                : "border-[#DADADA] border"
            } w-20 py-2 rounded-lg`}
          >
            {t("Female")}
          </button>
        </div>
      </div>
      <div className="mt-3">
        <div className="mb-1 font-medium">{t("Age")}</div>
        <div className="flex items-center w-1/2 gap-5">
          <div className="flex items-center gap-5">
            <div>{t("From")}</div>
            <input
              type="number"
              onChange={handleFilterChange}
              name="minAge"
              min={0}
              value={filterName.minAge}
              className="border border-[#DADADA]  w-full  focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
              placeholder="--"
            />
          </div>
          <div className="flex items-center gap-5">
            <div>{t("To")}</div>
            <input
              type="number"
              min={0}
              name="maxAge"
              value={filterName.maxAge}
              onChange={handleFilterChange}
              className="border border-[#DADADA] w-full  focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
              placeholder="--"
            />
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="mb-1 font-medium">{t("Patient Tag")}</div>
        <div className="flex items-center gap-5">
          <button
            onClick={() =>
              handleFilterChange({
                target: { name: "patientTag", value: "" },
              })
            }
            className={`${
              filterName.patientTag.includes("")
                ? "bg-[#4C6AF7] text-white"
                : "border-[#DADADA] border"
            } w-16 py-2 rounded-lg`}
          >
            {t("All")}
          </button>
          <button
            onClick={() =>
              handleFilterChange({
                target: { name: "patientTag", value: "Others" },
              })
            }
            className={`${
              filterName.patientTag.includes("Others")
                ? "bg-[#4C6AF7] text-white"
                : "border-[#DADADA] border"
            } w-20 py-2 rounded-lg`}
          >
            {t("Others")}
          </button>
          <button
            onClick={() =>
              handleFilterChange({
                target: { name: "patientTag", value: "Pregnancy" },
              })
            }
            className={`${
              filterName.patientTag.includes("Pregnancy")
                ? "bg-[#4C6AF7] text-white"
                : "border-[#DADADA] border"
            } w-24 py-2 rounded-lg`}
          >
            {t("Pregnancy")}
          </button>
        </div>
      </div>
      <div className="mt-3">
        <div className="mb-1 font-medium">{t("Registration Date")}</div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-5">
            <div>{t("From")}</div>
            <input
              type="date"
              name="registrationStartDate"
              value={filterName.registrationStartDate}
              onChange={handleFilterChange}
              className="border w-full border-[#DADADA] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
              placeholder="--"
            />
          </div>
          <div className="flex items-center gap-5">
            <div>{t("To")}</div>
            <input
              name="registrationEndDate"
              value={filterName.registrationEndDate}
              onChange={handleFilterChange}
              type="date"
              className="border w-full border-[#DADADA] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
              placeholder="--"
            />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <div className="mb-1 font-medium">{t("Last Visit Date")}</div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-5">
            <div>{t("From")}</div>
            <input
              type="date"
              name="lastVisitStartDate"
              value={filterName.lastVisitStartDate}
              onChange={handleFilterChange}
              className="border w-full border-[#DADADA] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
              placeholder="--"
            />
          </div>
          <div className="flex items-center gap-5">
            <div>{t("To")}</div>
            <input
              name="lastVisitEndDate"
              value={filterName.lastVisitEndDate}
              onChange={handleFilterChange}
              type="date"
              className="border w-full border-[#DADADA] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
              placeholder="--"
            />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <div className="mb-1 font-medium">{t("Chief Complaint")}</div>
        <input
          type="search"
          name="lastChiefComplaint"
          value={filterName.lastChiefComplaint}
          onChange={handleFilterChange}
          placeholder={t("Chief Complaint")}
          className="border w-full border-[#DADADA] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
        />
      </div>

      <div className="flex justify-end mt-5">
        <PrimaryButton buttonName={t("Apply")} onClick={getPatientList} />
      </div>
    </div>
  );
};

export default FilterModal;
