import React from "react";
import { useTranslation } from "react-i18next";

const PastMedicalHistory = ({
  antenatalCare = {},
  handleAntenatalCare = () => {},
}) => {
  const { t } = useTranslation();
  return (
    <div className="mb-2 mt-4">
      <h1 className="text-base uppercase mt-2 mb-1">{t("Past History")}</h1>

      <div className="mb-1">
        {t("Please tick (✔) the box of the appropriate responses")}
      </div>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input
            name="tuberculosis"
            type="checkbox"
            value={true}
            checked={antenatalCare.tuberculosis === true}
            onChange={handleAntenatalCare}
          />
          {t("Tuberculosis")}
        </label>
        <label className="flex items-center mt-1 gap-2">
          <input
            name="hypertension"
            type="checkbox"
            value={true}
            checked={antenatalCare.hypertension === true}
            onChange={handleAntenatalCare}
          />
          {t("Hypertension")}
        </label>
        <label className="flex items-center mt-1 gap-2">
          <input
            type="checkbox"
            checked={antenatalCare.heartDisease === true}
            value={true}
            name="heartDisease"
            onChange={handleAntenatalCare}
          />
          {t("Heart Disease")}
        </label>
        <label className="flex items-center mt-1 gap-2">
          <input
            type="checkbox"
            name="diabetes"
            checked={antenatalCare.diabetes === true}
            value={true}
            onChange={handleAntenatalCare}
          />
          {t("Diabetes")}
        </label>
        <label className="flex items-center mt-1 gap-2">
          <input
            type="checkbox"
            name="asthma"
            checked={antenatalCare.asthma === true}
            value={true}
            onChange={handleAntenatalCare}
          />
          {t("Asthma")}
        </label>
        <label className="flex items-center mt-1 gap-2">
          <input
            type="checkbox"
            name="otherMedicalHistory"
            checked={antenatalCare.otherMedicalHistory === true}
            value={true}
            onChange={handleAntenatalCare}
          />
          {t("Others")}
        </label>
      </div>
    </div>
  );
};

export default PastMedicalHistory;
