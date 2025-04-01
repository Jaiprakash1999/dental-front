import React from "react";
import { useTranslation } from "react-i18next";

const ActivePatientTab = ({
  setActivePatientDetailsTab = () => {},
  activePatientDetailsTab = "",
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex font-medium text-sm">
      <button
        className={`${
          activePatientDetailsTab === "health_records"
            ? "text-[#4C6AF7] border-b-2 border-[#6C8BFC]"
            : "text-[#7F8185]"
        } text-sm w-[15%] me-3 py-3`}
        onClick={() => setActivePatientDetailsTab("health_records")}
      >
        {t("Health Records")}
      </button>
    </div>
  );
};

export default ActivePatientTab;
