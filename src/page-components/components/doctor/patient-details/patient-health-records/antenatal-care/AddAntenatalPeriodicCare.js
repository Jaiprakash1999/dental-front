import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useAddAntenatalCare from "./hooks/useAddAntenatalCare";
import Modal from "../../../../../common-components/Modal";
import PrimaryButton from "../../../../../common-components/Buttons/PrimaryButton";
import TertiaryButton from "../../../../../common-components/Buttons/TertiaryButton";
import OcInPreviousPregnancy from "./OcInPreviousPregnancy";
import PastMedicalHistory from "./PastMedicalHistory";
import OptionalInvestigation from "./OptionalInvestigation";
import Examination from "./Examination";
import AntenatalVisits from "./AntenatalVisits";
import PastSurgicalHistory from "./PastSurgicalHistory";

const AddAntenatalPeriodicCare = ({
  activeHealthTab = "",
  setActiveHealthTab = () => {},
  getAllPatientRecord = () => {},
  selectedRecord = {},
  setSelectedRecord = () => {},
  isEditable = true,
  setIsEditable = () => {},
}) => {
  const { t } = useTranslation();

  const [antenatalCare, setAntenatalCare] = useState(
    selectedRecord.antenatalVisits === undefined
      ? {
          previousChildren: [""],
          previousDelivery: null,
          treatmentHistory: null,
          pastSurgicalHistory: null,
          pastMedicalHistory: null,
          apH: null,
          thyroid: null,
          spine: null,
          gait: null,
          gplad: null,
          eclampsia: null,
          piH: null,
          anaemia: null,
          obstructedLabor: null,
          pPH: null,
          lSCS: null,
          congenitalAnomaly: null,
          otherComplications: null,
          tuberculosis: null,
          hypertension: null,
          heartDisease: null,
          diabetes: null,
          asthma: null,
          otherMedicalHistory: null,
          heart: null,
          lungs: null,
          breasts: null,
          urinePregnancyTest: null,
          urinePregnancyTestDate: null,
          bloodGroupRhTyping: null,
          bloodGroupRhTypingDate: null,
          optionalInvestigations: [
            {
              date: null,
              title: null,
              value: null,
            },
          ],
          notes: null,
          antenatalVisits: [
            {
              day: "0 - 3 Months",
              date: null,
              complaints: null,
              pogWeeks: null,
              weightInKg: null,
              pulseRateInBpm: null,
              bloodPressure: null,
              pallor: null,
              oedema: null,
              jaundice: null,
              fundalHeight: null,
              liePresentation: null,
              fetalMovements: null,
              fetalHeartRatePerMin: null,
              pvIfDone: null,
              haemoglobin: null,
              urineAlbumin: null,
              urineSugar: null,
              hivScreening: null,
              vdrl: null,
              hbsAg: null,
              bloodSugar: null,
              ultraSonography: null,
            },
            {
              day: "3 - 6 Months",
              date: null,
              complaints: null,
              pogWeeks: null,
              weightInKg: null,
              pulseRateInBpm: null,
              bloodPressure: null,
              pallor: null,
              oedema: null,
              jaundice: null,
              fundalHeight: null,
              liePresentation: null,
              fetalMovements: null,
              fetalHeartRatePerMin: null,
              pvIfDone: null,
              haemoglobin: null,
              urineAlbumin: null,
              urineSugar: null,
              hivScreening: null,
              vdrl: null,
              hbsAg: null,
              bloodSugar: null,
              ultraSonography: null,
            },
            {
              day: "6 - 8 Months",
              date: null,
              complaints: null,
              pogWeeks: null,
              weightInKg: null,
              pulseRateInBpm: null,
              bloodPressure: null,
              pallor: null,
              oedema: null,
              jaundice: null,
              fundalHeight: null,
              liePresentation: null,
              fetalMovements: null,
              fetalHeartRatePerMin: null,
              pvIfDone: null,
              // urinePregnancyTest: null,
              haemoglobin: null,
              urineAlbumin: null,
              urineSugar: null,
              hivScreening: null,
              vdrl: null,
              hbsAg: null,
              bloodSugar: null,
              ultraSonography: null,
            },
            {
              day: "8 - 9 Months",
              date: null,
              complaints: null,
              pogWeeks: null,
              weightInKg: null,
              pulseRateInBpm: null,
              bloodPressure: null,
              pallor: null,
              oedema: null,
              jaundice: null,
              fundalHeight: null,
              liePresentation: null,
              fetalMovements: null,
              fetalHeartRatePerMin: null,
              pvIfDone: null,
              // urinePregnancyTest: null,
              haemoglobin: null,
              urineAlbumin: null,
              urineSugar: null,
              hivScreening: null,
              vdrl: null,
              hbsAg: null,
              bloodSugar: null,
              ultraSonography: null,
            },
          ],
        }
      : selectedRecord
  );

  const handleAntenatalCare = (e, index, field) => {
    const { name, checked, value, type } = e.target || {};
    const parsedValue =
      value === "true"
        ? true
        : value === "false"
        ? false
        : type === "number"
        ? parseFloat(value)
        : value;

    setAntenatalCare((prev) => {
      if (index !== undefined) {
        return {
          ...prev,
          [field]: prev[field].map((item, i) => {
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
            } else if (field === "previousChildren") {
              return i === index ? parsedValue : item;
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
    setAntenatalCare((prev) => ({
      ...prev,
      antenatalVisits: [
        ...prev.antenatalVisits,
        {
          day: null,
          date: null,
          complaints: null,
          pogWeeks: null,
          weightInKg: null,
          pulseRateInBpm: null,
          bloodPressure: null,
          pallor: null,
          oedema: null,
          jaundice: null,
          fundalHeight: null,
          liePresentation: null,
          fetalMovements: null,
          fetalHeartRatePerMin: null,
          pvIfDone: null,
          // urinePregnancyTest: null,
          haemoglobin: null,
          urineAlbumin: null,
          urineSugar: null,
          hivScreening: null,
          vdrl: null,
          hbsAg: null,
          bloodSugar: null,
          ultraSonography: null,
        },
      ],
    }));
  };

  const addOptionalInvestColumn = () => {
    setAntenatalCare((prev) => ({
      ...prev,
      optionalInvestigations: [
        ...prev.optionalInvestigations,
        {
          title: null,
          value: null,
          date: null,
        },
      ],
    }));
  };

  const addPreviousChildColumn = () => {
    setAntenatalCare((prev) => ({
      ...prev,
      previousChildren: [...prev.previousChildren, ""],
    }));
  };

  const deletePreviousChildColumn = (index) => {
    setAntenatalCare((prev) => ({
      ...prev,
      previousChildren: prev.previousChildren.filter((_, i) => i !== index),
    }));
  };

  const deleteOptionalInvestColumn = (index) => {
    setAntenatalCare((prev) => ({
      ...prev,
      optionalInvestigations: prev.optionalInvestigations.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // Delete Visit Column
  const deleteVisitColumn = (index) => {
    setAntenatalCare((prev) => ({
      ...prev,
      antenatalVisits: prev.antenatalVisits.filter((_, i) => i !== index),
    }));
  };

  const onReset = () => {
    setAntenatalCare(
      selectedRecord.antenatalVisits === undefined
        ? {
            previousChildren: [""],
            previousDelivery: null,
            treatmentHistory: null,
            pastSurgicalHistory: null,
            pastMedicalHistory: null,
            apH: null,
            thyroid: null,
            spine: null,
            gait: null,
            gplad: null,
            eclampsia: null,
            piH: null,
            anaemia: null,
            obstructedLabor: null,
            pPH: null,
            lSCS: null,
            congenitalAnomaly: null,
            otherComplications: null,
            tuberculosis: null,
            hypertension: null,
            heartDisease: null,
            diabetes: null,
            asthma: null,
            otherMedicalHistory: null,
            heart: null,
            lungs: null,
            breasts: null,
            urinePregnancyTest: null,
            urinePregnancyTestDate: null,
            bloodGroupRhTyping: null,
            bloodGroupRhTypingDate: null,
            investigationName: null,
            thyroidStimulatingHormoneDate: null,
            antenatalVisits: [
              {
                day: "0 - 3 Months",
                date: null,
                complaints: null,
                pogWeeks: null,
                weightInKg: null,
                pulseRateInBpm: null,
                bloodPressure: null,
                pallor: null,
                oedema: null,
                jaundice: null,
                fundalHeight: null,
                liePresentation: null,
                fetalMovements: null,
                fetalHeartRatePerMin: null,
                pvIfDone: null,
                // urinePregnancyTest: null,
                haemoglobin: null,
                urineAlbumin: null,
                urineSugar: null,
                hivScreening: null,
                vdrl: null,
                hbsAg: null,
                bloodSugar: null,
                ultraSonography: null,
              },
              {
                day: "3 - 6 Months",
                date: null,
                complaints: null,
                pogWeeks: null,
                weightInKg: null,
                pulseRateInBpm: null,
                bloodPressure: null,
                pallor: null,
                oedema: null,
                jaundice: null,
                fundalHeight: null,
                liePresentation: null,
                fetalMovements: null,
                fetalHeartRatePerMin: null,
                pvIfDone: null,
                // urinePregnancyTest: null,
                haemoglobin: null,
                urineAlbumin: null,
                urineSugar: null,
                hivScreening: null,
                vdrl: null,
                hbsAg: null,
                bloodSugar: null,
                ultraSonography: null,
              },
              {
                day: "6 - 8 Months",
                date: null,
                complaints: null,
                pogWeeks: null,
                weightInKg: null,
                pulseRateInBpm: null,
                bloodPressure: null,
                pallor: null,
                oedema: null,
                jaundice: null,
                fundalHeight: null,
                liePresentation: null,
                fetalMovements: null,
                fetalHeartRatePerMin: null,
                pvIfDone: null,
                // urinePregnancyTest: null,
                haemoglobin: null,
                urineAlbumin: null,
                urineSugar: null,
                hivScreening: null,
                vdrl: null,
                hbsAg: null,
                bloodSugar: null,
                ultraSonography: null,
              },
              {
                day: "8 - 9 Months",
                date: null,
                complaints: null,
                pogWeeks: null,
                weightInKg: null,
                pulseRateInBpm: null,
                bloodPressure: null,
                pallor: null,
                oedema: null,
                jaundice: null,
                fundalHeight: null,
                liePresentation: null,
                fetalMovements: null,
                fetalHeartRatePerMin: null,
                pvIfDone: null,
                // urinePregnancyTest: null,
                haemoglobin: null,
                urineAlbumin: null,
                urineSugar: null,
                hivScreening: null,
                vdrl: null,
                hbsAg: null,
                bloodSugar: null,
                ultraSonography: null,
              },
            ],
          }
        : selectedRecord
    );
  };

  const { isAntenatalLoading, onSubmitAntenatal, onUpdateAntenatal } =
    useAddAntenatalCare({
      antenatalCare,
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
        showModal={activeHealthTab === "antenatal_periodic_care" ? true : false}
        onClose={handleClose}
        modalHeight="h-[97%]"
        modalWidth="w-[80%]"
      >
        <div className="py-4 px-6">
          <h1 className="text-primary text-base fle text-center  font-medium">
            {t("Antenatal Care (Periodic Care)")}
          </h1>

          <div className="w-full">
            <PastSurgicalHistory
              antenatalCare={antenatalCare}
              handleAntenatalCare={handleAntenatalCare}
            />
            <OcInPreviousPregnancy
              antenatalCare={antenatalCare}
              handleAntenatalCare={handleAntenatalCare}
            />
            <PastMedicalHistory
              antenatalCare={antenatalCare}
              handleAntenatalCare={handleAntenatalCare}
            />
            <Examination
              antenatalCare={antenatalCare}
              handleAntenatalCare={handleAntenatalCare}
              addPreviousChildColumn={addPreviousChildColumn}
              deletePreviousChildColumn={deletePreviousChildColumn}
            />
            <AntenatalVisits
              antenatalCare={antenatalCare}
              handleAntenatalCare={handleAntenatalCare}
              addVisitColumn={addVisitColumn}
              deleteVisitColumn={deleteVisitColumn}
            />
            <OptionalInvestigation
              antenatalCare={antenatalCare}
              handleAntenatalCare={handleAntenatalCare}
              addOptionalInvestColumn={addOptionalInvestColumn}
              deleteOptionalInvestColumn={deleteOptionalInvestColumn}
            />
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
                  ? () => onSubmitAntenatal()
                  : () => onUpdateAntenatal(selectedRecord?.id)
              }
              disabled={isAntenatalLoading}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddAntenatalPeriodicCare;
