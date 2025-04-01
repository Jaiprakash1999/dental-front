import React, { useState } from "react";
import TertiaryButton from "../../../../../common-components/Buttons/TertiaryButton";
import PrimaryButton from "../../../../../common-components/Buttons/PrimaryButton";
import Modal from "../../../../../common-components/Modal";
import useAddWellnessRecord from "../hooks/useAddWellnessRecord";
import { useTranslation } from "react-i18next";

const AddWellnessRecord = ({
  activeHealthTab = "",
  setActiveHealthTab = () => {},
  getAllPatientRecord = () => {},
  selectedRecord = {},
  setSelectedRecord = () => {},
  isEditable = true,
  setIsEditable = () => {},
}) => {
  const { t } = useTranslation();
  const {
    bloodPressure,
    heart,
    heightInCm,
    lungs,
    pulseRateInBpm,
    respiratoryRateInBpm,
    spo2InPercent,
    tempInCelsius,
    weightInKg,
    hemoglobinInPercent,
    notes,
  } = selectedRecord || {};

  const [wellnessRecordInfo, setWellnessRecordInfo] = useState({
    height: heightInCm,
    weight: weightInKg,
    temperature: tempInCelsius,
    pulseRate: pulseRateInBpm,
    bloodPressure: bloodPressure,
    lungs: lungs,
    respiratoryRate: respiratoryRateInBpm,
    spo2: spo2InPercent,
    heart: heart,
    hemoglobinInPercent: hemoglobinInPercent,
    notes: notes,
  });

  const isValidForm = () => {
    return Object.values(wellnessRecordInfo).some((item) => item);
  };

  const handleWellnessChange = (e) => {
    const { name, value, type } = e.target || {};
    setWellnessRecordInfo((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const onReset = () => {
    setWellnessRecordInfo({
      height: "",
      weight: "",
      temperature: "",
      pulseRate: "",
      bloodPressure: "",
      lungs: "",
      respiratoryRate: "",
      spo2: "",
      heart: "",
    });
  };

  const { isAddingWellness, onSubmittingWellness } = useAddWellnessRecord({
    wellnessRecordInfo,
    getAllPatientRecord,
    setActiveHealthTab,
  });

  const handleClose = () => {
    setActiveHealthTab("");
    setSelectedRecord({});
    setIsEditable(true);
  };

  return (
    <div className="text-sm text-[#2D2E33">
      <Modal
        showModal={activeHealthTab === "vitals_record" ? true : false}
        onClose={handleClose}
        modalHeight="min-h-1/2"
        modalWidth="w-[80%]"
      >
        <div className="py-4 px-6">
          <h1 className="text-[#2D2E33 text-base fle text-center  font-medium">
            {t("Vitals Form")}
          </h1>
          <div className="flex py-4">
            <div className="w-full">
              <div className="mb-5">
                <div className="grid grid-cols-3 gap-x-5 mt-2 justify-between flex-wrap">
                  <div className="my-2">
                    <div className="text-[#5E6066] mb-2.5">{t("Height")}</div>
                    <div className="flex">
                      <input
                        disabled={!isEditable}
                        type="number"
                        name="height"
                        min={0}
                        value={wellnessRecordInfo.height}
                        onChange={handleWellnessChange}
                        placeholder={t("Height")}
                        className="border border-r-0 rounded-r-none w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                      />
                      <input
                        className="border w-12 border-l-0 rounded-l-none bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                        type="text"
                        disabled
                        value={t("cm")}
                      />
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="text-[#5E6066] mb-2.5">{t("Weight")}</div>
                    <div className="flex">
                      <input
                        disabled={!isEditable}
                        name="weight"
                        value={wellnessRecordInfo.weight}
                        onChange={handleWellnessChange}
                        type="number"
                        min={0}
                        placeholder={t("Weight")}
                        className="border border-r-0 rounded-r-none w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                      />
                      <input
                        className="border w-12 border-l-0 rounded-l-none bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                        type="text"
                        value={t("Kg")}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="text-[#5E6066] mb-2.5">
                      {t("Temperature")}
                    </div>
                    <div className="flex">
                      <input
                        disabled={!isEditable}
                        type="number"
                        min={0}
                        name="temperature"
                        placeholder={t("Temperature")}
                        onChange={handleWellnessChange}
                        value={wellnessRecordInfo.temperature}
                        className="border border-r-0 rounded-r-none w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                      />
                      <input
                        className="border w-10 border-l-0 rounded-l-none bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                        type="text"
                        disabled
                        value={t("C")}
                      />
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="text-[#5E6066] mb-2.5">{t("Heart")}</div>
                    <div className="flex">
                      <input
                        disabled={!isEditable}
                        type="text"
                        name="heart"
                        value={wellnessRecordInfo.heart}
                        onChange={handleWellnessChange}
                        placeholder={t("Heart")}
                        className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                      />
                      {/* <input
                        className="border w-14 border-l-0 rounded-l-none bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                        type="text"
                        disabled
                        value={t("bpm")}
                      /> */}
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="text-[#5E6066] mb-2.5">
                      {t("Pulse Rate")}
                    </div>
                    <div className="flex">
                      <input
                        disabled={!isEditable}
                        type="number"
                        name="pulseRate"
                        value={wellnessRecordInfo.pulseRate}
                        onChange={handleWellnessChange}
                        placeholder={t("Pulse Rate")}
                        className="border border-r-0 rounded-r-none w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                      />
                      <input
                        className="border w-14 border-l-0 rounded-l-none bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                        type="text"
                        disabled
                        value={t("bpm")}
                      />
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="text-[#5E6066] mb-2.5">
                      {t("Respiratory Rate")}
                    </div>
                    <div className="flex">
                      <input
                        disabled={!isEditable}
                        type="number"
                        name="respiratoryRate"
                        value={wellnessRecordInfo.respiratoryRate}
                        onChange={handleWellnessChange}
                        placeholder={t("Respiratory Rate")}
                        className="border border-r-0 rounded-r-none w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                      />
                      <input
                        className="border w-14 border-l-0 rounded-l-none bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                        type="text"
                        disabled
                        value={t("bpm")}
                      />
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="text-[#5E6066] mb-2.5">
                      {t("Blood Pressure")}
                    </div>
                    <div className="flex">
                      <input
                        disabled={!isEditable}
                        type="text"
                        name="bloodPressure"
                        value={wellnessRecordInfo.bloodPressure}
                        onChange={handleWellnessChange}
                        placeholder={t("Blood Pressure")}
                        className="border border-r-0 rounded-r-none w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                      />
                      <input
                        className="border w-20 border-l-0 rounded-l-none bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                        type="text"
                        disabled
                        value={t("mmHg")}
                      />
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="text-[#5E6066] mb-2.5">{t("SPO2")}</div>
                    <div className="flex">
                      <input
                        disabled={!isEditable}
                        type="number"
                        name="spo2"
                        value={wellnessRecordInfo.spo2}
                        onChange={handleWellnessChange}
                        placeholder={t("SPO2")}
                        className="border border-r-0 rounded-r-none w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                      />
                      <input
                        className="border w-10 border-l-0 rounded-l-none bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                        type="text"
                        disabled
                        value={t("%")}
                      />
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="text-[#5E6066] mb-2.5">{t("Lungs")}</div>

                    <div className="flex">
                      <input
                        disabled={!isEditable}
                        type="text"
                        name="lungs"
                        value={wellnessRecordInfo?.lungs}
                        onChange={handleWellnessChange}
                        placeholder={t("Lungs")}
                        className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                      />
                      {/* <Select
                        options={formatArray(LUNGS_OPTION)}
                        name="lungs"
                        disabled={!isEditable}
                        openTopPosition="top-2"
                        closeTopPosition="top-2"
                        onChange={handleWellnessChange}
                        placeholder={t("Lungs")}
                        upIcon={faAngleUp}
                        readOnly
                        defaultOption={{
                          label: wellnessRecordInfo?.lungs,
                          value: wellnessRecordInfo?.lungs,
                        }}
                        downIcon={faAngleDown}
                        className="border  w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                      /> */}
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="text-[#5E6066] mb-2.5">
                      {t("Hemoglobin Percentage (Hb %)")}
                    </div>
                    <div className="flex">
                      <input
                        disabled={!isEditable}
                        type="number"
                        name="hemoglobinInPercent"
                        value={wellnessRecordInfo.hemoglobinInPercent}
                        onChange={handleWellnessChange}
                        placeholder={t("Hemoglobin Percentage (Hb %)")}
                        className="border border-r-0 rounded-r-none w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                      />
                      <input
                        className="border w-10 border-l-0 rounded-l-none bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                        type="text"
                        disabled
                        value={t("%")}
                      />
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="text-[#5E6066] mb-2.5">{t("Notes")}</div>
                    <div className="flex">
                      <textarea
                        disabled={!isEditable}
                        name="notes"
                        value={wellnessRecordInfo.notes}
                        onChange={handleWellnessChange}
                        placeholder={t("Notes")}
                        className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {isEditable ? (
                <div className="flex gap-5 justify-end">
                  <TertiaryButton
                    buttonName={t("Reset")}
                    width="w-fit"
                    onClick={onReset}
                  />
                  <PrimaryButton
                    buttonName={t("Submit")}
                    width="w-fit"
                    onClick={onSubmittingWellness}
                    disabled={isAddingWellness || !isValidForm()}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddWellnessRecord;
