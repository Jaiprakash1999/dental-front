import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../../../../../common-components/Modal";
import PrimaryButton from "../../../../../common-components/Buttons/PrimaryButton";
import TertiaryButton from "../../../../../common-components/Buttons/TertiaryButton";
import NewBornCare from "./NewBornCare";
import GeneralExamination from "./GeneralExamination";
import useAddCareOfBaby from "./hooks/useAddCareOfBaby";

const AddBabyCareInfo = ({
  activeHealthTab = "",
  setActiveHealthTab = () => {},
  getAllPatientRecord = () => {},
  selectedRecord = {},
  setSelectedRecord = () => {},
  isEditable = true,
  setIsEditable = () => {},
}) => {
  const { t } = useTranslation();

  const [careOfBabyInfo, setCareOfBabyInfo] = useState(
    selectedRecord.babyCares === undefined
      ? {
          firstExaminationDateTime: null,
          firstFeedAfterBirth: null,
          firstBreastfeedTime: null,
          howFeed: null,
          weakSuckReason: null,
          dryBaby: null,
          keptWarm: null,
          dontBath: null,
          wrappedCloseToMother: null,
          exclusivelyBreastfed: null,
          cordCare: null,
          unusualFindings: null,
          referredToHigherCentre: null,
          referralReason: null,
          notes: null,
          babyCares: [
            {
              day: "0 day",
              date: null,
              weightInKg: null,
              temperatureInCelsius: null,
              urineOutput: null,
              stoolPattern: null,
              eyesCondition: [],
              skinCondition: null,
              skinFoldCondition: [],
              yellowEyes: null,
              yellowSkin: null,
              umbilicalCordBleed: null,
              cleanThreadUsed: null,
              feedingCondition: null,
              cryCondition: null,
              abdomenCondition: null,
              coldToTouch: null,
              chestIndrawn: null,
              pusOnUmbilicus: null,
              respiratoryRate: null,
            },
            {
              day: "3 Day",
              date: null,
              weightInKg: null,
              temperatureInCelsius: null,
              urineOutput: null,
              stoolPattern: null,
              eyesCondition: [],
              skinCondition: null,
              skinFoldCondition: [],
              yellowEyes: null,
              yellowSkin: null,
              umbilicalCordBleed: null,
              cleanThreadUsed: null,
              feedingCondition: null,
              cryCondition: null,
              abdomenCondition: null,
              coldToTouch: null,
              chestIndrawn: null,
              pusOnUmbilicus: null,
              respiratoryRate: null,
            },
            {
              day: "7 Day",
              date: null,
              weightInKg: null,
              temperatureInCelsius: null,
              urineOutput: null,
              stoolPattern: null,
              eyesCondition: [],
              skinCondition: null,
              skinFoldCondition: [],
              yellowEyes: null,
              yellowSkin: null,
              umbilicalCordBleed: null,
              cleanThreadUsed: null,
              feedingCondition: null,
              cryCondition: null,
              abdomenCondition: null,
              coldToTouch: null,
              chestIndrawn: null,
              pusOnUmbilicus: null,
              respiratoryRate: null,
            },
            {
              day: "14 Day",
              date: null,
              weightInKg: null,
              temperatureInCelsius: null,
              urineOutput: null,
              stoolPattern: null,
              eyesCondition: [],
              skinCondition: null,
              skinFoldCondition: [],
              yellowEyes: null,
              yellowSkin: null,
              umbilicalCordBleed: null,
              cleanThreadUsed: null,
              feedingCondition: null,
              cryCondition: null,
              abdomenCondition: null,
              coldToTouch: null,
              chestIndrawn: null,
              pusOnUmbilicus: null,
              respiratoryRate: null,
            },
            {
              day: "21 Day",
              date: null,
              weightInKg: null,
              temperatureInCelsius: null,
              urineOutput: null,
              stoolPattern: null,
              eyesCondition: [],
              skinCondition: null,
              skinFoldCondition: [],
              yellowEyes: null,
              yellowSkin: null,
              umbilicalCordBleed: null,
              cleanThreadUsed: null,
              feedingCondition: null,
              cryCondition: null,
              abdomenCondition: null,
              coldToTouch: null,
              chestIndrawn: null,
              pusOnUmbilicus: null,
              respiratoryRate: null,
            },
            {
              day: "28 Day",
              date: null,
              weightInKg: null,
              temperatureInCelsius: null,
              urineOutput: null,
              stoolPattern: null,
              eyesCondition: [],
              skinCondition: null,
              skinFoldCondition: [],
              yellowEyes: null,
              yellowSkin: null,
              umbilicalCordBleed: null,
              cleanThreadUsed: null,
              feedingCondition: null,
              cryCondition: null,
              abdomenCondition: null,
              coldToTouch: null,
              chestIndrawn: null,
              pusOnUmbilicus: null,
              respiratoryRate: null,
            },
            {
              day: "42 Day",
              date: null,
              weightInKg: null,
              temperatureInCelsius: null,
              urineOutput: null,
              stoolPattern: null,
              eyesCondition: [],
              skinCondition: null,
              skinFoldCondition: [],
              yellowEyes: null,
              yellowSkin: null,
              umbilicalCordBleed: null,
              cleanThreadUsed: null,
              feedingCondition: null,
              cryCondition: null,
              abdomenCondition: null,
              coldToTouch: null,
              chestIndrawn: null,
              pusOnUmbilicus: null,
              respiratoryRate: null,
            },
          ],
        }
      : selectedRecord
  );

  const handleBabyCare = (e, index) => {
    const { name, checked, value, type } = e.target || {};
    const parsedValue =
      value === "true"
        ? true
        : value === "false"
        ? false
        : type === "number"
        ? parseFloat(value)
        : value;

    setCareOfBabyInfo((prev) => {
      if (index !== undefined) {
        return {
          ...prev,
          babyCares: prev.babyCares.map((item, i) => {
            if (i !== index) {
              return item;
            }
            if (type === "checkbox") {
              if (Array.isArray(item[name])) {
                return {
                  ...item,
                  [name]: checked
                    ? [...item[name], parsedValue]
                    : item[name].filter((v) => v !== parsedValue),
                };
              } else {
                return {
                  ...item,
                  [name]: item[name] === parsedValue ? null : parsedValue,
                };
              }
            }
            return {
              ...item,
              [name]: parsedValue,
            };
          }),
        };
      }
      if (type === "checkbox") {
        if (Array.isArray(prev[name])) {
          return {
            ...prev,
            [name]: checked
              ? [...prev[name], parsedValue]
              : prev[name].filter((v) => v !== parsedValue),
          };
        } else {
          return {
            ...prev,
            [name]: prev[name] === parsedValue ? null : parsedValue,
          };
        }
      }
      return {
        ...prev,
        [name]: parsedValue,
      };
    });
  };

  const addVisitColumn = () => {
    setCareOfBabyInfo((prev) => ({
      ...prev,
      babyCares: [
        ...prev.babyCares,
        {
          day: null,
          date: null,
          weightInKg: null,
          temperatureInCelsius: null,
          urineOutput: null,
          stoolPattern: null,
          eyesCondition: [],
          skinCondition: null,
          skinFoldCondition: [null],
          yellowEyes: null,
          yellowSkin: null,
          umbilicalCordBleed: null,
          cleanThreadUsed: null,
          feedingCondition: null,
          cryCondition: null,
          abdomenCondition: null,
          coldToTouch: null,
          chestIndrawn: null,
          pusOnUmbilicus: null,
          respiratoryRate: null,
          bcgVaccination: null,
          hepatitisBVaccination: null,
          opvVaccination: null,
          referredToHigherCentre: null,
          referralReason: null,
        },
      ],
    }));
  };

  // Delete Visit Column
  const deleteVisitColumn = (index) => {
    setCareOfBabyInfo((prev) => ({
      ...prev,
      babyCares: prev.babyCares.filter((_, i) => i !== index),
    }));
  };

  const onReset = () => {
    setCareOfBabyInfo(
      selectedRecord.babyCares === undefined
        ? {
            firstExaminationDateTime: null,
            firstFeedAfterBirth: null,
            firstBreastfeedTime: null,
            howFeed: null,
            weakSuckReason: null,
            dryBaby: null,
            keptWarm: null,
            dontBath: null,
            wrappedCloseToMother: null,
            exclusivelyBreastfed: null,
            cordCare: null,
            unusualFindings: null,
            babyCares: [
              {
                day: "0 day",
                date: null,
                weightInKg: null,
                temperatureInCelsius: null,
                urineOutput: null,
                stoolPattern: null,
                eyesCondition: [],
                skinCondition: null,
                skinFoldCondition: [],
                yellowEyes: null,
                yellowSkin: null,
                umbilicalCordBleed: null,
                cleanThreadUsed: null,
                feedingCondition: null,
                cryCondition: null,
                abdomenCondition: null,
                coldToTouch: null,
                chestIndrawn: null,
                pusOnUmbilicus: null,
                respiratoryRate: null,
                bcgVaccination: null,
                hepatitisBVaccination: null,
                opvVaccination: null,
                referredToHigherCentre: null,
                referralReason: null,
              },
              {
                day: "3 Day",
                date: null,
                weightInKg: null,
                temperatureInCelsius: null,
                urineOutput: null,
                stoolPattern: null,
                eyesCondition: [],
                skinCondition: null,
                skinFoldCondition: [],
                yellowEyes: null,
                yellowSkin: null,
                umbilicalCordBleed: null,
                cleanThreadUsed: null,
                feedingCondition: null,
                cryCondition: null,
                abdomenCondition: null,
                coldToTouch: null,
                chestIndrawn: null,
                pusOnUmbilicus: null,
                respiratoryRate: null,
                bcgVaccination: null,
                hepatitisBVaccination: null,
                opvVaccination: null,
                referredToHigherCentre: null,
                referralReason: null,
              },
              {
                day: "7 Day",
                date: null,
                weightInKg: null,
                temperatureInCelsius: null,
                urineOutput: null,
                stoolPattern: null,
                eyesCondition: [],
                skinCondition: null,
                skinFoldCondition: [],
                yellowEyes: null,
                yellowSkin: null,
                umbilicalCordBleed: null,
                cleanThreadUsed: null,
                feedingCondition: null,
                cryCondition: null,
                abdomenCondition: null,
                coldToTouch: null,
                chestIndrawn: null,
                pusOnUmbilicus: null,
                respiratoryRate: null,
                bcgVaccination: null,
                hepatitisBVaccination: null,
                opvVaccination: null,
                referredToHigherCentre: null,
                referralReason: null,
              },
              {
                day: "14 Day",
                date: null,
                weightInKg: null,
                temperatureInCelsius: null,
                urineOutput: null,
                stoolPattern: null,
                eyesCondition: [],
                skinCondition: null,
                skinFoldCondition: [],
                yellowEyes: null,
                yellowSkin: null,
                umbilicalCordBleed: null,
                cleanThreadUsed: null,
                feedingCondition: null,
                cryCondition: null,
                abdomenCondition: null,
                coldToTouch: null,
                chestIndrawn: null,
                pusOnUmbilicus: null,
                respiratoryRate: null,
                bcgVaccination: null,
                hepatitisBVaccination: null,
                opvVaccination: null,
                referredToHigherCentre: null,
                referralReason: null,
              },
              {
                day: "21 Day",
                date: null,
                weightInKg: null,
                temperatureInCelsius: null,
                urineOutput: null,
                stoolPattern: null,
                eyesCondition: [],
                skinCondition: null,
                skinFoldCondition: [],
                yellowEyes: null,
                yellowSkin: null,
                umbilicalCordBleed: null,
                cleanThreadUsed: null,
                feedingCondition: null,
                cryCondition: null,
                abdomenCondition: null,
                coldToTouch: null,
                chestIndrawn: null,
                pusOnUmbilicus: null,
                respiratoryRate: null,
                bcgVaccination: null,
                hepatitisBVaccination: null,
                opvVaccination: null,
                referredToHigherCentre: null,
                referralReason: null,
              },
              {
                day: "28 Day",
                date: null,
                weightInKg: null,
                temperatureInCelsius: null,
                urineOutput: null,
                stoolPattern: null,
                eyesCondition: [],
                skinCondition: null,
                skinFoldCondition: [],
                yellowEyes: null,
                yellowSkin: null,
                umbilicalCordBleed: null,
                cleanThreadUsed: null,
                feedingCondition: null,
                cryCondition: null,
                abdomenCondition: null,
                coldToTouch: null,
                chestIndrawn: null,
                pusOnUmbilicus: null,
                respiratoryRate: null,
                bcgVaccination: null,
                hepatitisBVaccination: null,
                opvVaccination: null,
                referredToHigherCentre: null,
                referralReason: null,
              },
              {
                day: "42 Day",
                date: null,
                weightInKg: null,
                temperatureInCelsius: null,
                urineOutput: null,
                stoolPattern: null,
                eyesCondition: [],
                skinCondition: null,
                skinFoldCondition: [],
                yellowEyes: null,
                yellowSkin: null,
                umbilicalCordBleed: null,
                cleanThreadUsed: null,
                feedingCondition: null,
                cryCondition: null,
                abdomenCondition: null,
                coldToTouch: null,
                chestIndrawn: null,
                pusOnUmbilicus: null,
                respiratoryRate: null,
                bcgVaccination: null,
                hepatitisBVaccination: null,
                opvVaccination: null,
                referredToHigherCentre: null,
                referralReason: null,
              },
            ],
          }
        : selectedRecord
    );
  };

  const { isBabyCareLoading, onSubmitBabyCare, onUpdateBabyCare } =
    useAddCareOfBaby({
      careOfBabyInfo,
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
        showModal={activeHealthTab === "baby_care" ? true : false}
        onClose={handleClose}
        modalHeight="h-[97%]"
        modalWidth="w-[88%]"
      >
        <div className="py-4 px-6">
          <h1 className="text-primary text-base fle text-center  font-medium">
            {t("Care of Baby")}
          </h1>

          <div className="w-full">
            <NewBornCare
              careOfBabyInfo={careOfBabyInfo}
              handleBabyCare={handleBabyCare}
            />
            <GeneralExamination
              careOfBabyInfo={careOfBabyInfo}
              handleBabyCare={handleBabyCare}
              addVisitColumn={addVisitColumn}
              deleteVisitColumn={deleteVisitColumn}
            />
            <div className="">
              <div className="mb-2">{t("Notes")}</div>
              <textarea
                name="notes"
                value={careOfBabyInfo.notes}
                onChange={handleBabyCare}
                placeholder={t("Notes")}
                className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
              />
            </div>
          </div>

          <div className="flex gap-5 mt-5 justify-end">
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
                  ? () => onSubmitBabyCare()
                  : () => onUpdateBabyCare(selectedRecord?.id)
              }
              disabled={isBabyCareLoading}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddBabyCareInfo;
