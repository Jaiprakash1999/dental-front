import React from "react";
import { useTranslation } from "react-i18next";

const PastSurgicalHistory = ({
  antenatalCare = {},
  handleAntenatalCare = () => {},
}) => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 gap-y-4">
      <div>
        <div className="mb-1">{t("Past Surgical History")}</div>
        <input
          type="text"
          name="pastSurgicalHistory"
          value={antenatalCare.pastSurgicalHistory}
          onChange={handleAntenatalCare}
          placeholder={t("Past Surgical History")}
          className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
        />
      </div>
      <div>
        <div className="mb-1">{t("Past Medical History")}</div>
        <input
          type="text"
          name="pastMedicalHistory"
          value={antenatalCare.pastMedicalHistory}
          onChange={handleAntenatalCare}
          placeholder={t("Past Medical History")}
          className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
        />
      </div>
      <div>
        <div className="mb-1">{t("Treatment History")}</div>
        <input
          type="text"
          name="treatmentHistory"
          value={antenatalCare.treatmentHistory}
          onChange={handleAntenatalCare}
          placeholder={t("Treatment History")}
          className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
        />
      </div>
    </div>
  );
};

export default PastSurgicalHistory;
