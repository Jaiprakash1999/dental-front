import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../../../../../common-components/Modal";
import PrimaryButton from "../../../../../common-components/Buttons/PrimaryButton";
import TertiaryButton from "../../../../../common-components/Buttons/TertiaryButton";
import useAddPostNatalCare from "./hooks/useAddPostNatalCare";
import DeliveryInfo from "./DeliveryInfo";
import PostPartumCare from "./PostPartumCare";
import FamilyPlaning from "./FamilyPlaning";

const AddPostNatalCareRecord = ({
  activeHealthTab = "",
  setActiveHealthTab = () => {},
  getAllPatientRecord = () => {},
  selectedRecord = {},
  setSelectedRecord = () => {},
  isEditable = true,
  setIsEditable = () => {},
}) => {
  const { t } = useTranslation();

  const [postNatalCare, setPostNatalCare] = useState(
    selectedRecord.postpartumCareRecords === undefined
      ? {
          deliveryDate: null,
          deliveryPlace: null,
          pregnancyOutcome: null,
          deliveryDetails: null,
          deliveryType: null,
          babySex: null,
          babyWeightInKg: null,
          criedImmediatelyAfterBirth: null,
          initiatedBreastfeeding: null,
          vitaminKInjection: null,
          notes: null,
          familyPlanningCounselling: [],
          postpartumCareRecords: [
            {
              day: "0 Day",
              date: null,
              anyComplaints: null,
              pallor: null,
              pulseRate: null,
              bloodPressure: null,
              temperature: null,
              breasts: null,
              nipples: null,
              uterusTenderness: null,
              bleedingPV: null,
              lochia: null,
              episiotomyTear: null,
              pedalEdema: null,
              familyPlanningCounselling: null,
              otherComplications: null,
            },
            {
              day: "3 Day",
              date: null,
              anyComplaints: null,
              pallor: null,
              pulseRate: null,
              bloodPressure: null,
              temperature: null,
              breasts: null,
              nipples: null,
              uterusTenderness: null,
              bleedingPV: null,
              lochia: null,
              episiotomyTear: null,
              pedalEdema: null,
              familyPlanningCounselling: null,
              otherComplications: null,
            },
            {
              day: "7 Day",
              date: null,
              anyComplaints: null,
              pallor: null,
              pulseRate: null,
              bloodPressure: null,
              temperature: null,
              breasts: null,
              nipples: null,
              uterusTenderness: null,
              bleedingPV: null,
              lochia: null,
              episiotomyTear: null,
              pedalEdema: null,
              familyPlanningCounselling: null,
              otherComplications: null,
            },
            {
              day: "14 Day",
              date: null,
              anyComplaints: null,
              pallor: null,
              pulseRate: null,
              bloodPressure: null,
              temperature: null,
              breasts: null,
              nipples: null,
              uterusTenderness: null,
              bleedingPV: null,
              lochia: null,
              episiotomyTear: null,
              pedalEdema: null,
              familyPlanningCounselling: null,
              otherComplications: null,
            },
            {
              day: "21 Day",
              date: null,
              anyComplaints: null,
              pallor: null,
              pulseRate: null,
              bloodPressure: null,
              temperature: null,
              breasts: null,
              nipples: null,
              uterusTenderness: null,
              bleedingPV: null,
              lochia: null,
              episiotomyTear: null,
              pedalEdema: null,
              familyPlanningCounselling: null,
              otherComplications: null,
            },
            {
              day: "28 Day",
              date: null,
              anyComplaints: null,
              pallor: null,
              pulseRate: null,
              bloodPressure: null,
              temperature: null,
              breasts: null,
              nipples: null,
              uterusTenderness: null,
              bleedingPV: null,
              lochia: null,
              episiotomyTear: null,
              pedalEdema: null,
              familyPlanningCounselling: null,
              otherComplications: null,
            },
            {
              day: "42 Day",
              date: null,
              anyComplaints: null,
              pallor: null,
              pulseRate: null,
              bloodPressure: null,
              temperature: null,
              breasts: null,
              nipples: null,
              uterusTenderness: null,
              bleedingPV: null,
              lochia: null,
              episiotomyTear: null,
              pedalEdema: null,
              familyPlanningCounselling: null,
              otherComplications: null,
            },
          ],
        }
      : selectedRecord
  );

  // const handlePostNatalCare1 = (e, index) => {
  //   const { name, checked, value, type } = e.target || {};
  //   const parsedValue =
  //     value === "true"
  //       ? true
  //       : value === "false"
  //       ? false
  //       : type === "number"
  //       ? parseFloat(value)
  //       : value;

  //   if (type === "checkbox") {
  //     setPostNatalCare((prev) => ({ ...prev, [name]: checked }));
  //   } else if (
  //     type === "radio" &&
  //     (value === "true" || value === "false") &&
  //     index === undefined
  //   ) {
  //     setPostNatalCare((prev) => ({ ...prev, [name]: value === "true" }));
  //   } else if (index !== undefined) {
  //     setPostNatalCare((prev) => {
  //       const updatedVisits = [...prev.postpartumCareRecords];
  //       updatedVisits[index] = {
  //         ...updatedVisits[index],
  //         [name]: parsedValue,
  //       };
  //       return { ...prev, postpartumCareRecords: updatedVisits };
  //     });
  //   } else {
  //     setPostNatalCare((prev) => ({
  //       ...prev,
  //       [name]: parsedValue,
  //     }));
  //   }
  // };

  const handlePostNatalCare = (e, index) => {
    const { name, checked, value, type } = e.target || {};
    const parsedValue =
      value === "true"
        ? true
        : value === "false"
        ? false
        : type === "number"
        ? parseFloat(value)
        : value;

    setPostNatalCare((prev) => {
      if (index !== undefined) {
        return {
          ...prev,
          postpartumCareRecords: prev.postpartumCareRecords.map((item, i) => {
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
      } else if (name === "familyPlanningCounselling") {
        return {
          ...prev,
          [name]: value.map((item) => item.value),
        };
      }
      return {
        ...prev,
        [name]: parsedValue,
      };
    });
  };

  const addVisitColumn = () => {
    setPostNatalCare((prev) => ({
      ...prev,
      postpartumCareRecords: [
        ...prev.postpartumCareRecords,
        {
          day: null,
          date: null,
          anyComplaints: null,
          pallor: null,
          pulseRate: null,
          bloodPressure: null,
          temperature: null,
          breasts: null,
          nipples: null,
          uterusTenderness: null,
          bleedingPV: null,
          lochia: null,
          episiotomyTear: null,
          pedalEdema: null,
          familyPlanningCounselling: null,
          otherComplications: null,
        },
      ],
    }));
  };

  // Delete Visit Column
  const deleteVisitColumn = (index) => {
    setPostNatalCare((prev) => ({
      ...prev,
      postpartumCareRecords: prev.postpartumCareRecords.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const onReset = () => {
    setPostNatalCare(
      selectedRecord.postpartumCareRecords === undefined
        ? {
            deliveryDate: null,
            deliveryPlace: null,
            pregnancyOutcome: null,
            deliveryDetails: null,
            deliveryType: null,
            babySex: null,
            babyWeightInKg: null,
            criedImmediatelyAfterBirth: null,
            initiatedBreastfeeding: null,
            vitaminKInjection: null,
            notes: null,
            familyPlanningCounselling: [],
            postpartumCareRecords: [
              {
                day: "0 Day",
                date: null,
                anyComplaints: null,
                pallor: null,
                pulseRate: null,
                bloodPressure: null,
                temperature: null,
                breasts: null,
                nipples: null,
                uterusTenderness: null,
                bleedingPV: null,
                lochia: null,
                episiotomyTear: null,
                pedalEdema: null,
                familyPlanningCounselling: null,
                otherComplications: null,
              },
              {
                day: "3 Day",
                date: null,
                anyComplaints: null,
                pallor: null,
                pulseRate: null,
                bloodPressure: null,
                temperature: null,
                breasts: null,
                nipples: null,
                uterusTenderness: null,
                bleedingPV: null,
                lochia: null,
                episiotomyTear: null,
                pedalEdema: null,
                familyPlanningCounselling: null,
                otherComplications: null,
              },
              {
                day: "7 Day",
                date: null,
                anyComplaints: null,
                pallor: null,
                pulseRate: null,
                bloodPressure: null,
                temperature: null,
                breasts: null,
                nipples: null,
                uterusTenderness: null,
                bleedingPV: null,
                lochia: null,
                episiotomyTear: null,
                pedalEdema: null,
                familyPlanningCounselling: null,
                otherComplications: null,
              },
              {
                day: "14 Day",
                date: null,
                anyComplaints: null,
                pallor: null,
                pulseRate: null,
                bloodPressure: null,
                temperature: null,
                breasts: null,
                nipples: null,
                uterusTenderness: null,
                bleedingPV: null,
                lochia: null,
                episiotomyTear: null,
                pedalEdema: null,
                familyPlanningCounselling: null,
                otherComplications: null,
              },
              {
                day: "21 Day",
                date: null,
                anyComplaints: null,
                pallor: null,
                pulseRate: null,
                bloodPressure: null,
                temperature: null,
                breasts: null,
                nipples: null,
                uterusTenderness: null,
                bleedingPV: null,
                lochia: null,
                episiotomyTear: null,
                pedalEdema: null,
                familyPlanningCounselling: null,
                otherComplications: null,
              },
              {
                day: "28 Day",
                date: null,
                anyComplaints: null,
                pallor: null,
                pulseRate: null,
                bloodPressure: null,
                temperature: null,
                breasts: null,
                nipples: null,
                uterusTenderness: null,
                bleedingPV: null,
                lochia: null,
                episiotomyTear: null,
                pedalEdema: null,
                familyPlanningCounselling: null,
                otherComplications: null,
              },
              {
                day: "42 Day",
                date: null,
                anyComplaints: null,
                pallor: null,
                pulseRate: null,
                bloodPressure: null,
                temperature: null,
                breasts: null,
                nipples: null,
                uterusTenderness: null,
                bleedingPV: null,
                lochia: null,
                episiotomyTear: null,
                pedalEdema: null,
                familyPlanningCounselling: null,
                otherComplications: null,
              },
            ],
          }
        : selectedRecord
    );
  };

  const { isPostNatalLoading, onSubmitPostNatal, onUpdatePostNatal } =
    useAddPostNatalCare({
      postNatalCare,
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
        showModal={activeHealthTab === "post_natal_care" ? true : false}
        onClose={handleClose}
        modalHeight="h-[97%]"
        modalWidth="w-[80%]"
      >
        <div className="py-4 px-6">
          <h1 className="text-primary text-base fle text-center  font-medium">
            {t("Post Natal Care")}
          </h1>

          <div className="w-full">
            <DeliveryInfo
              postNatalCare={postNatalCare}
              handlePostNatalCare={handlePostNatalCare}
            />
            <PostPartumCare
              postNatalCare={postNatalCare}
              handlePostNatalCare={handlePostNatalCare}
              addVisitColumn={addVisitColumn}
              deleteVisitColumn={deleteVisitColumn}
            />
            <FamilyPlaning
              postNatalCare={postNatalCare}
              handlePostNatalCare={handlePostNatalCare}
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
                  ? () => onSubmitPostNatal()
                  : () => onUpdatePostNatal(selectedRecord?.id)
              }
              disabled={isPostNatalLoading}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddPostNatalCareRecord;
