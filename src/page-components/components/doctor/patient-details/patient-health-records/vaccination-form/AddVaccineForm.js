import React, { useState } from "react";
import TertiaryButton from "../../../../../common-components/Buttons/TertiaryButton";
import PrimaryButton from "../../../../../common-components/Buttons/PrimaryButton";
import Modal from "../../../../../common-components/Modal";
import { useTranslation } from "react-i18next";
import useAddVaccination from "./hooks/useAddVaccination";

const AddVaccineForm = ({
  activeHealthTab = "",
  setActiveHealthTab = () => {},
  getAllPatientRecord = () => {},
  selectedRecord = {},
  setSelectedRecord = () => {},
  isEditable = true,
  setIsEditable = () => {},
}) => {
  const { t } = useTranslation();

  const [vaccinationInfo, setVaccinationInfo] = useState(
    selectedRecord.birth === undefined
      ? {
          notes: null,
          dateOfBirth: null,
          birth: {
            bcg: false,
            opv0: false,
            hepatitisB: false,
          },
          sixWeeks: {
            opv1: false,
            pentavalent1: false,
            rvv1: false,
            fipv1: false,
            pcv1: false,
          },
          tenWeeks: {
            opv2: false,
            pentavalent2: false,
            rvv2: false,
          },
          fourteenWeeks: {
            opv3: false,
            pentavalent3: false,
            fipv2: false,
            rvv3: false,
            pcv2: false,
          },
          nineToTwelveMonths: {
            mr1: false,
            je1: false,
            pcvBooster: false,
          },
          sixteenToTwentyFourMonths: {
            mr2: false,
            je2: false,
            diphtheria: false,
            dptBooster1: false,
            opvBooster: false,
          },
          fiveToSixYears: {
            dptBooster2: false,
          },
        }
      : selectedRecord
  );

  const handleVaccinationChange = (e, category) => {
    const { name, checked, value } = e.target || {};

    if (name === "dateOfBirth" || name === "notes") {
      setVaccinationInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setVaccinationInfo((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [name]: checked,
        },
      }));
    }
  };

  const onReset = () => {
    setVaccinationInfo(
      selectedRecord.birth === undefined
        ? {
            dateOfBirth: null,
            birth: {
              bcg: false,
              opv0: false,
              hepatitisB: false,
            },
            sixWeeks: {
              opv1: false,
              pentavalent1: false,
              rvv1: false,
              fipv1: false,
              pcv1: false,
            },
            tenWeeks: {
              opv2: false,
              pentavalent2: false,
              rvv2: false,
            },
            fourteenWeeks: {
              opv3: false,
              pentavalent3: false,
              fipv2: false,
              rvv3: false,
              pcv2: false,
            },
            nineToTwelveMonths: {
              mr1: false,
              je1: false,
              pcvBooster: false,
            },
            sixteenToTwentyFourMonths: {
              mr2: false,
              je2: false,
              diphtheria: false,
              dptBooster1: false,
              opvBooster: false,
            },
            fiveToSixYears: {
              dptBooster2: false,
            },
          }
        : selectedRecord
    );
  };

  const { isAddVaccination, onSubmitVaccineForm, onUpdateVaccineForm } =
    useAddVaccination({
      vaccinationInfo,
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
        showModal={activeHealthTab === "vaccination_form" ? true : false}
        onClose={handleClose}
        modalHeight="h-[97%]"
        modalWidth="w-1/2"
      >
        <div className="py-4 px-6">
          <h1 className="text-[#2D2E33 text-base fle text-center  font-medium">
            {t("Vaccination Form")}
          </h1>
          <div className="flex py-4">
            <div className="w-full">
              <div className="mb-2">
                <div className="text-base my-1">{t("Date of birth")}*</div>
                <label className="flex items-center gap-2">
                  <input
                    type="date"
                    name="dateOfBirth"
                    max={new Date().toISOString().split("T")[0]}
                    className="border w-1/2 disabled:bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                    value={vaccinationInfo.dateOfBirth || ""}
                    onChange={(e) => handleVaccinationChange(e, "birth")}
                  />
                </label>
              </div>
              <div>
                <div className="text-base my-1">{t("Birth")}</div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="bcg"
                    checked={vaccinationInfo.birth.bcg}
                    onChange={(e) => handleVaccinationChange(e, "birth")}
                  />
                  {t("Bacillus Calmette Guerin (BCG)")}
                </label>
                <label className="flex items-center mt-1 gap-2">
                  <input
                    type="checkbox"
                    name="opv0"
                    checked={vaccinationInfo.birth.opv0}
                    onChange={(e) => handleVaccinationChange(e, "birth")}
                  />
                  {t("Oral Polio Vaccine (OPV) - 0")}
                </label>
                <label className="flex items-center mt-1 gap-2">
                  <input
                    type="checkbox"
                    name="hepatitisB"
                    checked={vaccinationInfo.birth.hepatitisB}
                    onChange={(e) => handleVaccinationChange(e, "birth")}
                  />
                  {t("Hepatitis B Birth Dose")}
                </label>
              </div>

              <div className="mt-3">
                <div className="text-base my-1">{t("After 6 Weeks")}</div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="opv1"
                    checked={vaccinationInfo.sixWeeks.opv1}
                    onChange={(e) => handleVaccinationChange(e, "sixWeeks")}
                  />
                  {t("Oral Polio Vaccine (OPV) - 1")}
                </label>
                <label className="flex items-center mt-1 gap-2">
                  <input
                    type="checkbox"
                    name="pentavalent1"
                    checked={vaccinationInfo.sixWeeks.pentavalent1}
                    onChange={(e) => handleVaccinationChange(e, "sixWeeks")}
                  />
                  {t("Pentavalent - 1")}
                </label>
                <label className="flex items-center mt-1 gap-2">
                  <input
                    type="checkbox"
                    name="rvv1"
                    checked={vaccinationInfo.sixWeeks.rvv1}
                    onChange={(e) => handleVaccinationChange(e, "sixWeeks")}
                  />
                  {t("Rotavirus Vaccine (RVV) - 1")}
                </label>
                <label className="flex items-center mt-1 gap-2">
                  <input
                    type="checkbox"
                    name="fipv1"
                    checked={vaccinationInfo.sixWeeks.fipv1}
                    onChange={(e) => handleVaccinationChange(e, "sixWeeks")}
                  />
                  {t("Fractional Dose of Inactivated Polio Vaccine (fIPV) - 1")}
                </label>
                <label className="flex items-center mt-1 gap-2">
                  <input
                    type="checkbox"
                    name="pcv1"
                    checked={vaccinationInfo.sixWeeks.pcv1}
                    onChange={(e) => handleVaccinationChange(e, "sixWeeks")}
                  />
                  {t("Pneumococcal Conjugate Vaccine (PCV) - 1")}
                </label>
              </div>

              <div className="mt-3">
                <div className="text-base my-1">{t("After 10 Weeks")}</div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="opv2"
                    checked={vaccinationInfo.tenWeeks.opv2}
                    onChange={(e) => handleVaccinationChange(e, "tenWeeks")}
                  />
                  {t("Oral Polio Vaccine (OPV) - 2")}
                </label>
                <label className="flex items-center mt-1 gap-2">
                  <input
                    type="checkbox"
                    name="pentavalent2"
                    checked={vaccinationInfo.tenWeeks.pentavalent2}
                    onChange={(e) => handleVaccinationChange(e, "tenWeeks")}
                  />
                  {t("Pentavalent - 2")}
                </label>
                <label className="flex items-center mt-1 gap-2">
                  <input
                    name="rvv2"
                    checked={vaccinationInfo.tenWeeks.rvv2}
                    type="checkbox"
                    onChange={(e) => handleVaccinationChange(e, "tenWeeks")}
                  />
                  {t("Rotavirus Vaccine (RVV) - 2")}
                </label>
              </div>

              <div className="mt-3">
                <div className="text-base my-1">{t("After 14 Weeks")}</div>
                <label className="flex items-center gap-2">
                  <input
                    name="opv3"
                    type="checkbox"
                    checked={vaccinationInfo.fourteenWeeks.opv3}
                    onChange={(e) =>
                      handleVaccinationChange(e, "fourteenWeeks")
                    }
                  />
                  {t("Oral Polio Vaccine (OPV) - 3")}
                </label>
                <label className="flex items-center mt-1 gap-2">
                  <input
                    name="pentavalent3"
                    type="checkbox"
                    checked={vaccinationInfo.fourteenWeeks.pentavalent3}
                    onChange={(e) =>
                      handleVaccinationChange(e, "fourteenWeeks")
                    }
                  />
                  {t("Pentavalent - 3")}
                </label>
                <label className="flex items-center mt-1 gap-2">
                  <input
                    type="checkbox"
                    checked={vaccinationInfo.fourteenWeeks.rvv3}
                    name="rvv3"
                    onChange={(e) =>
                      handleVaccinationChange(e, "fourteenWeeks")
                    }
                  />
                  {t("Rotavirus Vaccine (RVV) - 3")}
                </label>
                <label className="flex items-center mt-1 gap-2">
                  <input
                    type="checkbox"
                    name="fipv2"
                    checked={vaccinationInfo.fourteenWeeks.fipv2}
                    onChange={(e) =>
                      handleVaccinationChange(e, "fourteenWeeks")
                    }
                  />
                  {t("Fractional Dose of Inactivated Polio Vaccine (fIPV) - 2")}
                </label>
                <label className="flex items-center mt-1 gap-2">
                  <input
                    type="checkbox"
                    name="pcv2"
                    checked={vaccinationInfo.fourteenWeeks.pcv2}
                    onChange={(e) =>
                      handleVaccinationChange(e, "fourteenWeeks")
                    }
                  />
                  {t("Pneumococcal Conjugate Vaccine (PCV) - 2")}
                </label>
              </div>

              <div className="mt-3">
                <div className="text-base my-1">{t("After 9-12 Months")}</div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="mr1"
                    checked={vaccinationInfo.nineToTwelveMonths.mr1}
                    onChange={(e) =>
                      handleVaccinationChange(e, "nineToTwelveMonths")
                    }
                  />
                  {t("Measles & Rubella (MR) - 1")}
                </label>
                <label className="flex items-center mt-1 gap-2">
                  <input
                    name="je1"
                    type="checkbox"
                    checked={vaccinationInfo.nineToTwelveMonths.je1}
                    onChange={(e) =>
                      handleVaccinationChange(e, "nineToTwelveMonths")
                    }
                  />
                  {t("JE - 1")}
                </label>
                <label className="flex items-center mt-1 gap-2">
                  <input
                    name="pcvBooster"
                    checked={vaccinationInfo.nineToTwelveMonths.pcvBooster}
                    type="checkbox"
                    onChange={(e) =>
                      handleVaccinationChange(e, "nineToTwelveMonths")
                    }
                  />
                  {t("PCV-Booster")}
                </label>
              </div>

              <div className="mt-3">
                <div className="text-base my-1">{t("After 16-24 Months")}</div>
                <label className="flex items-center gap-2">
                  <input
                    name="mr2"
                    type="checkbox"
                    checked={vaccinationInfo.sixteenToTwentyFourMonths.mr2}
                    onChange={(e) =>
                      handleVaccinationChange(e, "sixteenToTwentyFourMonths")
                    }
                  />
                  {t("Measles & Rubella (MR) - 2")}
                </label>
                <label className="flex items-center mt-1 gap-2">
                  <input
                    name="je2"
                    type="checkbox"
                    checked={vaccinationInfo.sixteenToTwentyFourMonths.je2}
                    onChange={(e) =>
                      handleVaccinationChange(e, "sixteenToTwentyFourMonths")
                    }
                  />
                  {t("JE - 2")}
                </label>
                <label className="flex items-center mt-1 gap-2">
                  <input
                    name="diphtheria"
                    type="checkbox"
                    checked={
                      vaccinationInfo.sixteenToTwentyFourMonths.diphtheria
                    }
                    onChange={(e) =>
                      handleVaccinationChange(e, "sixteenToTwentyFourMonths")
                    }
                  />
                  {t("Diphtheria")}
                </label>
                <label className="flex items-center mt-1 gap-2">
                  <input
                    name="dptBooster1"
                    type="checkbox"
                    checked={
                      vaccinationInfo.sixteenToTwentyFourMonths.dptBooster1
                    }
                    onChange={(e) =>
                      handleVaccinationChange(e, "sixteenToTwentyFourMonths")
                    }
                  />
                  {t("Pertussis & Tetanus (DPT) - Booster - 1")}
                </label>
                <label className="flex items-center mt-1 gap-2">
                  <input
                    name="opvBooster"
                    type="checkbox"
                    checked={
                      vaccinationInfo.sixteenToTwentyFourMonths.opvBooster
                    }
                    onChange={(e) =>
                      handleVaccinationChange(e, "sixteenToTwentyFourMonths")
                    }
                  />
                  {t("OPV - Booster")}
                </label>
              </div>

              <div className="mt-3">
                <div className="text-base my-1">{t("After 5-6 years ")}</div>
                <label className="flex items-center gap-2">
                  <input
                    name="dptBooster2"
                    type="checkbox"
                    checked={vaccinationInfo.fiveToSixYears.dptBooster2}
                    onChange={(e) =>
                      handleVaccinationChange(e, "fiveToSixYears")
                    }
                  />
                  {t("DPT - Booster - 2")}
                </label>
              </div>
              <div className="my-2">
                <div className="mb-2">{t("Notes")}</div>
                <textarea
                  name="notes"
                  value={vaccinationInfo.notes}
                  onChange={handleVaccinationChange}
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
                      ? () => onSubmitVaccineForm()
                      : () => onUpdateVaccineForm(selectedRecord?.id)
                  }
                  disabled={
                    isAddVaccination || vaccinationInfo.dateOfBirth === null
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddVaccineForm;
