import React, { useState } from "react";
import TertiaryButton from "../../../../../common-components/Buttons/TertiaryButton";
import PrimaryButton from "../../../../../common-components/Buttons/PrimaryButton";
import Modal from "../../../../../common-components/Modal";
import { useTranslation } from "react-i18next";
import MultiSelect from "../../../../../common-components/MultiSelect";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { GENDER, PERGNANCY_HIGH_RISK } from "../../../../../constants/Constant";
import useAddBaseLine from "./hooks/useAddBaseLine";
import { formatArray } from "../../../../../utils/formateArray";
import Select from "../../../../../common-components/Select";
import { useSelector } from "react-redux";
import moment from "moment";

const validateField = (name, value) => {
  switch (name) {
    case "motherName":
      return /^[A-Za-z\s]+$/.test(value)
        ? null
        : "Only alphabetic characters allowed";
    case "motherAge":
      return value >= 10 && value <= 150
        ? null
        : "Age must be between 10 and 150";
    case "fatherName":
      return /^[A-Za-z\s]+$/.test(value)
        ? null
        : "Only alphabetic characters allowed";
    case "fatherAge":
      return value >= 10 && value <= 150
        ? null
        : "Age must be between 10 and 150";
    case "fatherMobileNumber":
      return /^[6-9]\d{9}$/.test(value)
        ? null
        : "Mobile number must be 10 digits starting with 6, 7, 8, or 9";
    case "motherMobileNumber":
      return /^[6-9]\d{9}$/.test(value)
        ? null
        : "Mobile number must be 10 digits starting with 6, 7, 8, or 9";
    case "anmContact":
      return /^[6-9]\d{9}$/.test(value)
        ? null
        : "contact number must be 10 digits starting with 6, 7, 8, or 9";

    case "chwContact":
      return /^[6-9]\d{9}$/.test(value)
        ? null
        : "contact number must be 10 digits starting with 6, 7, 8, or 9";

    case "accountNumber":
      return /^\d{11,16}$/.test(value)
        ? null
        : "Account number must be 11-16 digits";
    case "ifscCode":
      return value.length === 11
        ? null
        : "IFSC code must be exactly 11 characters";
    default:
      return null;
  }
};

const AddBaseLinePergnancy = ({
  activeHealthTab = "",
  setActiveHealthTab = () => {},
  getAllPatientRecord = () => {},
  selectedRecord = {},
  setSelectedRecord = () => {},
  isEditable = true,
  setIsEditable = () => {},
}) => {
  const { t } = useTranslation();
  const patientData = useSelector((state) => state.patientDetails);
  const [validationErrors, setValidationErrors] = useState({});

  const { createdAt } = patientData || {};

  const [pregnancyRecord, setPergnancyRecord] = useState(
    selectedRecord.birthRecord === undefined
      ? {
          tubectomyDate: null,
          isTubectomyCompleted: false,
          isPregnancyRiskHigh: [],
          pregnancyOutcomeNote: null,
          notes: null,
          familyIdentification: {
            motherName: null,
            motherAge: null,
            motherMobileNumber: null,
            fatherName: null,
            fatherAge: null,
            fatherMobileNumber: null,
            address: null,
            motherId: null,
            bankName: null,
            accountNumber: null,
            ifscCode: null,
          },

          pregnancyPeriod: {
            dolmp: null,
            edd: null,
            lastDeliveryAt: null,
            currentDeliveryAt: null,
            // gplad: null,
          },

          birthRecord: {
            childName: null,
            dateOfBirth: null,
            gender: null,
            birthRegistrationNumber: null,
            childIdNumber: null,
            birthWeightInKg: null,
          },

          instituteIdentification: {
            anmName: null,
            anmContact: null,
            chwName: null,
            chwContact: null,
            phcName: null,
            phcHospitalName: null,
            referralTo: null,
          },
        }
      : selectedRecord
  );

  const handlePergnancyChange = (e, category) => {
    const { name, type, checked, value } = e.target || {};

    if (category === undefined && name !== "isPregnancyRiskHigh") {
      setPergnancyRecord((prev) => ({
        ...prev,
        [name]:
          type === "checkbox"
            ? checked
            : type === "number"
            ? parseFloat(value)
            : value,
      }));
    } else if (category === undefined && name === "isPregnancyRiskHigh") {
      setPergnancyRecord((prev) => ({
        ...prev,
        [name]: value.map((item) => item.value),
      }));
    } else {
      setPergnancyRecord((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [name]: type === "number" ? parseFloat(value) : value,
        },
      }));
    }
    const error = validateField(name, value);
    setValidationErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const onReset = () => {
    setPergnancyRecord(
      selectedRecord.birthRecord === undefined
        ? {
            tubectomyDate: null,
            isTubectomyCompleted: false,
            isPregnancyRiskHigh: [],
            pregnancyOutcomeNote: null,
            familyIdentification: {
              motherName: null,
              motherAge: null,
              motherMobileNumber: null,
              fatherName: null,
              fatherAge: null,
              fatherMobileNumber: null,
              address: null,
              motherId: null,
              bankName: null,
              accountNumber: null,
              ifscCode: null,
            },

            pregnancyPeriod: {
              dolmp: null,
              edd: null,
              lastDeliveryAt: null,
              currentDeliveryAt: null,
              // gplad: null,
            },

            birthRecord: {
              childName: null,
              dateOfBirth: null,
              gender: null,
              birthRegistrationNumber: null,
              childIdNumber: null,
              birthWeightInKg: null,
            },

            instituteIdentification: {
              anmName: null,
              anmContact: null,
              chwName: null,
              chwContact: null,
              phcName: null,
              phcHospitalName: null,
              referralTo: null,
            },
          }
        : selectedRecord
    );
  };

  const { isPergnancyLoading, onSubmitPergnancy, onUpdatePergnancy } =
    useAddBaseLine({
      pregnancyRecord,
      getAllPatientRecord,
      setActiveHealthTab,
    });

  const handleClose = () => {
    setActiveHealthTab("");
    setSelectedRecord({});
    setIsEditable(true);
  };

  return (
    <div className="text-sm text-primary">
      <Modal
        showModal={activeHealthTab === "pergnancy_overview" ? true : false}
        onClose={handleClose}
        modalHeight="h-[97%]"
        modalWidth="w-1/2"
      >
        <div className="py-4 px-6">
          <h1 className="text-[#2D2E33 text-base fle text-center  font-medium">
            {t("Baseline Details and Pregnancy Overview")}
          </h1>

          <div className="w-full">
            <div>
              <div className="mb-1">{t("Date of Registration")}</div>
              <div>
                <input
                  name=""
                  disabled
                  value={moment(createdAt).format("YYYY-MM-DD")}
                  type="date"
                  className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-2 items-center">
              <div>
                <div className="mb-1">
                  {t("Appointment date for tubectomy")}
                </div>
                <div>
                  <input
                    name="tubectomyDate"
                    onChange={handlePergnancyChange}
                    type="date"
                    value={pregnancyRecord.tubectomyDate}
                    className="border uppercase w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                  />
                </div>
              </div>
              <div>
                <div>{t("Mark below if completed")}:</div>
                <label className="flex my-2.5 items-center gap-2">
                  <input
                    type="checkbox"
                    name="isTubectomyCompleted"
                    checked={pregnancyRecord.isTubectomyCompleted}
                    onChange={handlePergnancyChange}
                  />
                  {t("Completed")}
                </label>
              </div>
            </div>
            <div className="my-2">
              <div className="mb-1">{t("Is Pregnancy Risk High")}?</div>
              <div>
                <MultiSelect
                  upIcon={faAngleUp}
                  options={formatArray(PERGNANCY_HIGH_RISK)}
                  labelKey="label"
                  valueKey="value"
                  name="isPregnancyRiskHigh"
                  onChange={handlePergnancyChange}
                  defaultOptions={formatArray(
                    pregnancyRecord.isPregnancyRiskHigh
                  )}
                  downIcon={faAngleDown}
                  iconTopPositionClose="top-1.5"
                  iconTopPositionOpen="top-1.5"
                  multiple
                />
              </div>
            </div>

            <div className="mt-2">
              <div className="mb-1">{t("Pregnancy Outcome Note")}</div>
              <div>
                <input
                  type="text"
                  name="pregnancyOutcomeNote"
                  onChange={handlePergnancyChange}
                  value={pregnancyRecord.pregnancyOutcomeNote}
                  className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
              </div>
            </div>
            <div className="text-base uppercase font-medium mt-3 mb-1">
              {t("Family Identification")}
            </div>
            <div className="grid grid-cols-3 gap-x-5 gap-y-2 items-center">
              <div>
                <div className="mb-1">{t("Mother's Name")}</div>
                <input
                  type="text"
                  name="motherName"
                  value={pregnancyRecord.familyIdentification.motherName}
                  onChange={(e) =>
                    handlePergnancyChange(e, "familyIdentification")
                  }
                  placeholder={t("Mother's Name")}
                  className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
                {validationErrors.motherName && (
                  <div className="text-red-500 text-xs mt-1">
                    {t(validationErrors.motherName)}
                  </div>
                )}
              </div>
              <div>
                <div className="mb-1">{t("Mother's Age")}</div>
                <input
                  type="number"
                  name="motherAge"
                  min={0}
                  value={pregnancyRecord.familyIdentification.motherAge}
                  onChange={(e) =>
                    handlePergnancyChange(e, "familyIdentification")
                  }
                  placeholder={t("Mother's age")}
                  className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
                {validationErrors.motherAge && (
                  <div className="text-red-500 text-xs mt-1">
                    {t(validationErrors.motherAge)}
                  </div>
                )}
              </div>

              <div>
                <div className="mb-1">{t("Mother's Mobile Number")}</div>
                <input
                  type="text"
                  name="motherMobileNumber"
                  min={0}
                  maxLength={10}
                  value={
                    pregnancyRecord.familyIdentification.motherMobileNumber
                  }
                  onChange={(e) =>
                    handlePergnancyChange(e, "familyIdentification")
                  }
                  placeholder={t("Mother's Mobile number")}
                  className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
                {validationErrors.motherMobileNumber && (
                  <div className="text-red-500 text-xs mt-1">
                    {t(validationErrors.motherMobileNumber)}
                  </div>
                )}
              </div>

              <div>
                <div className="mb-1">{t("Father's Name")}</div>
                <input
                  type="text"
                  name="fatherName"
                  value={pregnancyRecord.familyIdentification.fatherName}
                  onChange={(e) =>
                    handlePergnancyChange(e, "familyIdentification")
                  }
                  placeholder="Father's Name"
                  className={`border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3 ${
                    validationErrors.fatherName ? "border-red-500" : ""
                  }`}
                />
                {validationErrors.fatherName && (
                  <div className="text-red-500 text-xs mt-1">
                    {t(validationErrors.fatherName)}
                  </div>
                )}
              </div>

              <div>
                <div className="mb-1">{t("Father's Age")}</div>
                <input
                  type="number"
                  name="fatherAge"
                  min={0}
                  value={pregnancyRecord.familyIdentification.fatherAge}
                  onChange={(e) =>
                    handlePergnancyChange(e, "familyIdentification")
                  }
                  placeholder={t("Father's Name")}
                  className={`border  w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3 ${
                    validationErrors.fatherAge ? "border-red-500" : ""
                  }`}
                />
                {validationErrors.fatherAge && (
                  <div className="text-red-500 text-xs mt-1">
                    {t(validationErrors.fatherAge)}
                  </div>
                )}
              </div>
              <div>
                <div className="mb-1">{t("Father's Mobile Number")}</div>
                <input
                  type="text"
                  name="fatherMobileNumber"
                  min={0}
                  maxLength={10}
                  value={
                    pregnancyRecord.familyIdentification.fatherMobileNumber
                  }
                  onChange={(e) =>
                    handlePergnancyChange(e, "familyIdentification")
                  }
                  placeholder={t("Father's Mobile number")}
                  className={`border  w-[90%] bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3 ${
                    validationErrors.fatherMobileNumber ? "border-red-500" : ""
                  }`}
                />
                {validationErrors.fatherMobileNumber && (
                  <div className="text-red-500 text-xs mt-1">
                    {t(validationErrors.fatherMobileNumber)}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-2">
              <div className="mb-1">{t("Address")}</div>
              <textarea
                type="text"
                name="address"
                value={pregnancyRecord.familyIdentification.address}
                onChange={(e) =>
                  handlePergnancyChange(e, "familyIdentification")
                }
                placeholder={t("address")}
                className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
              />
            </div>
            <div className="mt-1">
              <div className="mb-1">{t("Mother's ID No")}.</div>
              <input
                type="text"
                name="motherId"
                value={pregnancyRecord.familyIdentification.motherId}
                onChange={(e) =>
                  handlePergnancyChange(e, "familyIdentification")
                }
                placeholder={t("Mother's ID No.")}
                className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
              />
            </div>

            <div className="grid grid-cols-3 mt-2 gap-x-5 gap-y-2 items-center">
              <div>
                <div className="mb-1">{t("Bank & Branch Name")}</div>
                <input
                  type="text"
                  name="bankName"
                  value={pregnancyRecord.familyIdentification.bankName}
                  onChange={(e) =>
                    handlePergnancyChange(e, "familyIdentification")
                  }
                  placeholder={t("Bank & Branch Name")}
                  className="border bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
              </div>
              <div>
                <div className="mb-1">{t("Account No.")}</div>
                <input
                  type="text"
                  name="accountNumber"
                  value={pregnancyRecord.familyIdentification.accountNumber}
                  onChange={(e) =>
                    handlePergnancyChange(e, "familyIdentification")
                  }
                  placeholder={t("Please enter your Account Number ")}
                  className={`border  w-[90%] bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3 ${
                    validationErrors.accountNumber ? "border-red-500" : ""
                  }`}
                />
                {validationErrors.accountNumber && (
                  <div className="text-red-500 text-xs mt-1">
                    {t(validationErrors.accountNumber)}
                  </div>
                )}
              </div>
              <div>
                <div className="mb-1">{t("IFSC Code")}</div>
                <input
                  type="text"
                  name="ifscCode"
                  value={pregnancyRecord.familyIdentification.ifscCode}
                  onChange={(e) =>
                    handlePergnancyChange(e, "familyIdentification")
                  }
                  placeholder={t("Please enter your IFSC code")}
                  className={`border bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3 ${
                    validationErrors.ifscCode ? "border-red-500" : ""
                  }`}
                />
                {validationErrors.ifscCode && (
                  <div className="text-red-500 text-xs mt-1">
                    {t(validationErrors.ifscCode)}
                  </div>
                )}
              </div>
            </div>
            <div className="text-base uppercase font-medium mt-3 mb-1">
              {t("Pregnancy Period")}
            </div>
            <div className="grid grid-cols-2 w-full gap-x-5 gap-y-2">
              <div className="w-full">
                <div className="mb-1 ">
                  {t("Date of Last Menstrual Period")}
                </div>
                <input
                  type="date"
                  name="dolmp"
                  value={pregnancyRecord.pregnancyPeriod.dolmp}
                  onChange={(e) => handlePergnancyChange(e, "pregnancyPeriod")}
                  placeholder={t("Date")}
                  className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
              </div>
              <div className="w-full">
                <div className="mb-1 ">{t("Expected Date of Delivery")}</div>
                <input
                  type="date"
                  name="edd"
                  value={pregnancyRecord.pregnancyPeriod.edd}
                  onChange={(e) => handlePergnancyChange(e, "pregnancyPeriod")}
                  placeholder={t("Date")}
                  className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
              </div>

              <div className="w-full">
                <div className="mb-1 ">
                  {t("Current Delivery conducted at")}
                </div>
                <input
                  type="text"
                  name="currentDeliveryAt"
                  value={pregnancyRecord.pregnancyPeriod.currentDeliveryAt}
                  onChange={(e) => handlePergnancyChange(e, "pregnancyPeriod")}
                  placeholder="Current Delivery"
                  className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
              </div>

              <div className="w-full">
                <div className="mb-1 ">{t("Last Delivery conducted at")}</div>
                <input
                  type="text"
                  name="lastDeliveryAt"
                  value={pregnancyRecord.pregnancyPeriod.lastDeliveryAt}
                  onChange={(e) => handlePergnancyChange(e, "pregnancyPeriod")}
                  placeholder="Last Delivery conducted at"
                  className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
              </div>
            </div>

            <div className="text-base uppercase font-medium mt-3 mb-1">
              {t("Birth Record")}
            </div>

            <div className="grid grid-cols-2 w-full gap-x-5 gap-y-2">
              <div className="gap-y-1">
                <div className="mb-1">{t("Child's Name")}</div>
                <input
                  type="text"
                  name="childName"
                  value={pregnancyRecord.birthRecord.childName}
                  onChange={(e) => handlePergnancyChange(e, "birthRecord")}
                  placeholder="Child's Name"
                  className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
              </div>

              <div className="w-full">
                <div className="mb-1">{t("Date of Birth")}</div>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={pregnancyRecord.birthRecord.dateOfBirth}
                  onChange={(e) => handlePergnancyChange(e, "birthRecord")}
                  max={new Date().toISOString().split("T")[0]}
                  placeholder="Date of Birth"
                  className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
              </div>

              <div>
                <div className="mb-1">{t("Birth Weight")}</div>
                <div className="flex">
                  <input
                    name="birthWeightInKg"
                    onChange={(e) => handlePergnancyChange(e, "birthRecord")}
                    type="number"
                    min={0}
                    max={200}
                    value={pregnancyRecord.birthRecord.birthWeightInKg}
                    placeholder={t("Weight")}
                    className="border border-r-0 rounded-r-none w-[90%] bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                  />
                  <input
                    className="border w-10 border-l-0 rounded-l-none bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB]"
                    type="text"
                    value={t("Kg")}
                    readOnly
                  />
                </div>
              </div>
              <div>
                <div className="mb-1">{t("Gender")}</div>
                <Select
                  name="gender"
                  options={GENDER}
                  openTopPosition="top-2"
                  closeTopPosition="top-2"
                  onChange={(e) => handlePergnancyChange(e, "birthRecord")}
                  placeholder={t("Gender")}
                  upIcon={faAngleUp}
                  defaultOption={{
                    label: pregnancyRecord.birthRecord.gender,
                    value: pregnancyRecord.birthRecord.gender,
                  }}
                  readOnly
                  downIcon={faAngleDown}
                  className="border  w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
              </div>

              <div className=" gap-y-1">
                <div className="mb-1">{t("Birth Registration No")}.</div>
                <input
                  type="text"
                  name="birthRegistrationNumber"
                  value={pregnancyRecord.birthRecord.birthRegistrationNumber}
                  onChange={(e) => handlePergnancyChange(e, "birthRecord")}
                  placeholder="Birth Registration No."
                  className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
              </div>
              <div className=" gap-y-1">
                <div className="mb-1">{t("Child I.D. No.")}</div>
                <input
                  type="text"
                  onChange={(e) => handlePergnancyChange(e, "birthRecord")}
                  placeholder={t("Child I.D. No.")}
                  name="childIdNumber"
                  value={pregnancyRecord.birthRecord.childIdNumber}
                  className="border  w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
              </div>
            </div>

            <div className="text-base font-medium mt-3 mb-1">
              {t("INSTITUTIONAL IDENTIFICATION")}
            </div>
            <div className="grid grid-cols-2 w-full gap-x-5 gap-y-2">
              <div>
                <div className="mb-1">{t("ANM")}</div>
                <input
                  type="text"
                  onChange={(e) =>
                    handlePergnancyChange(e, "instituteIdentification")
                  }
                  name="anmName"
                  value={pregnancyRecord.instituteIdentification.anmName}
                  placeholder={t("ANM Name")}
                  className="border  w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
              </div>
              <div>
                <div className="mb-1">{t("ANM Contact")}</div>
                <input
                  type="text"
                  name="anmContact"
                  value={pregnancyRecord.instituteIdentification.anmContact}
                  onChange={(e) =>
                    handlePergnancyChange(e, "instituteIdentification")
                  }
                  placeholder={t("ANM Contact")}
                  className="border  w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
                {validationErrors.anmContact && (
                  <div className="text-red-500 text-xs mt-1">
                    {t(validationErrors.anmContact)}
                  </div>
                )}
              </div>

              <div className="">
                <div className="mb-1">{t("CHW")}</div>
                <input
                  type="text"
                  name="chwName"
                  onChange={(e) =>
                    handlePergnancyChange(e, "instituteIdentification")
                  }
                  value={pregnancyRecord.instituteIdentification.chwName}
                  placeholder={t("CHW Name")}
                  className="border  w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
              </div>
              <div>
                <div className="mb-1">{t("CHW Contact")}</div>
                <input
                  type="text"
                  name="chwContact"
                  value={pregnancyRecord.instituteIdentification.chwContact}
                  onChange={(e) =>
                    handlePergnancyChange(e, "instituteIdentification")
                  }
                  placeholder={t("CHW Contact")}
                  className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
                {validationErrors.chwContact && (
                  <div className="text-red-500 text-xs mt-1">
                    {t(validationErrors.chwContact)}
                  </div>
                )}
              </div>

              <div>
                <div className="mb-1">{t("PHC")}</div>
                <input
                  type="text"
                  name="phcName"
                  value={pregnancyRecord.instituteIdentification.phcName}
                  onChange={(e) =>
                    handlePergnancyChange(e, "instituteIdentification")
                  }
                  placeholder={t("PHC Name")}
                  className="border  w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
              </div>
              <div className="">
                <div className="mb-1">{t("PHC Hospital")}</div>
                <input
                  type="text"
                  name="phcHospitalName"
                  value={
                    pregnancyRecord.instituteIdentification.phcHospitalName
                  }
                  onChange={(e) =>
                    handlePergnancyChange(e, "instituteIdentification")
                  }
                  placeholder={t("PHC Hospital")}
                  className="border  w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
              </div>

              <div className="">
                <div className="mb-1">{t("Referral To")}</div>
                <input
                  type="text"
                  name="referralTo"
                  value={pregnancyRecord.instituteIdentification.referralTo}
                  onChange={(e) =>
                    handlePergnancyChange(e, "instituteIdentification")
                  }
                  placeholder={t("Referral To")}
                  className="border  w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
              </div>
            </div>
          </div>
          <div className="my-2">
            <div className="mb-2">{t("Notes")}</div>
            <textarea
              name="notes"
              value={pregnancyRecord.notes}
              onChange={handlePergnancyChange}
              placeholder={t("Notes")}
              className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
            />
          </div>
          <div className="flex gap-5 justify-end">
            <TertiaryButton
              buttonName={t("Reset")}
              width="w-fit"
              onClick={onReset}
            />
            <PrimaryButton
              buttonName={t("Save")}
              width="w-fit"
              onClick={
                isEditable
                  ? () => onSubmitPergnancy()
                  : () => onUpdatePergnancy(selectedRecord?.id)
              }
              disabled={isPergnancyLoading}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddBaseLinePergnancy;
