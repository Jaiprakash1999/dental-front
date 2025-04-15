import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const HealthRecordButton = ({ setActiveHealthTab = () => {} }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { state = {} } = location || {};
  const { visit } = state || {};

  return (
    <div
      className="bg-white p-4 rounded-lg text-sm overflow-x-scroll"
      style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="text-[#2D2E33] font-medium mb-5">
        {t("Add New Record")}:
      </div>
      <div className="grid text-[#4C6AF7] grid-cols-1 space-y-5">
        <button
          className="text-left"
          onClick={() => setActiveHealthTab("screening_form")}
        >
          {t("Screening Form")}
        </button>
        {visit ? (
          <button
            className="text-left"
            onClick={() => setActiveHealthTab("vitals_record")}
          >
            {t("Vitals Form")}
          </button>
        ) : null}
        <button
          className="text-left"
          onClick={() => setActiveHealthTab("vaccination_form")}
        >
          {t("Vaccination Form")}
        </button>

        <button
          className="text-left"
          onClick={() => setActiveHealthTab("dental_form")}
        >
          {t("Treatment Plan")}
        </button>

        <button
          className="text-left"
          onClick={() => setActiveHealthTab("pergnancy_overview")}
        >
          {t("Pergnancy overview")}
        </button>

        <button
          className="text-left"
          onClick={() => setActiveHealthTab("antenatal_periodic_care")}
        >
          {t("Antenatal Care")}
        </button>

        <button
          className="text-left"
          onClick={() => setActiveHealthTab("post_natal_care")}
        >
          {t("Post Natal Care")}
        </button>
        <button
          className="text-left"
          onClick={() => setActiveHealthTab("baby_care")}
        >
          {t("Care of Baby")}
        </button>
      </div>
    </div>
  );
};

export default HealthRecordButton;
