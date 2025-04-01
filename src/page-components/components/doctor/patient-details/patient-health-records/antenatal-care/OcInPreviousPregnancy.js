import React from "react";
import { useTranslation } from "react-i18next";

const OcInPreviousPregnancy = ({
  antenatalCare = {},
  handleAntenatalCare = () => {},
}) => {
  const { t } = useTranslation();
  return (
    <div className="mb-2 mt-5">
      <h1 className="text-base mt-2 mb-1">
        {t("OBSTETRIC COMPLICATION IN PREVIOUS PREGNANCY")}
      </h1>

      <div className="mb-1">{t("Please tick (✔) the relevant history")}</div>
      <div className="grid grid-cols-3">
        <label className="flex items-center gap-2">
          <input
            name="apH"
            type="checkbox"
            value={true}
            checked={antenatalCare.apH === true}
            onChange={handleAntenatalCare}
          />
          {t("APH")}
        </label>
        <label className="flex items-center mt-1 gap-2">
          <input
            name="eclampsia"
            type="checkbox"
            value={true}
            checked={antenatalCare.eclampsia === true}
            onChange={handleAntenatalCare}
          />
          {t("Eclampsia")}
        </label>
        <label className="flex items-center mt-1 gap-2">
          <input
            type="checkbox"
            value={true}
            checked={antenatalCare.piH === true}
            name="piH"
            onChange={handleAntenatalCare}
          />
          {t("PIH")}
        </label>
        <label className="flex items-center mt-1 gap-2">
          <input
            type="checkbox"
            name="anaemia"
            value={true}
            checked={antenatalCare.anaemia === true}
            onChange={handleAntenatalCare}
          />
          {t("Anaemia")}
        </label>
        <label className="flex items-center mt-1 gap-2">
          <input
            type="checkbox"
            name="obstructedLabor"
            value={true}
            checked={antenatalCare.obstructedLabor === true}
            onChange={handleAntenatalCare}
          />
          {t("Obstructed Labor")}
        </label>
        <label className="flex items-center mt-1 gap-2">
          <input
            type="checkbox"
            name="pPH"
            value={true}
            checked={antenatalCare.pPH === true}
            onChange={handleAntenatalCare}
          />
          {t("PPH")}
        </label>
        <label className="flex items-center mt-1 gap-2">
          <input
            type="checkbox"
            name="lSCS"
            value={true}
            checked={antenatalCare.lSCS === true}
            onChange={handleAntenatalCare}
          />
          {t("LSCS")}
        </label>
        <label className="flex items-center mt-1 gap-2">
          <input
            type="checkbox"
            name="congenitalAnomaly"
            checked={antenatalCare.congenitalAnomaly === true}
            value={true}
            onChange={handleAntenatalCare}
          />
          {t("Congential anomaly in baby")}
        </label>
        <label className="flex items-center mt-1 gap-2">
          <input
            type="checkbox"
            name="otherComplications"
            checked={antenatalCare.otherComplications === true}
            onChange={handleAntenatalCare}
            value={true}
          />
          {t("Others")}
        </label>
      </div>
    </div>
  );
};

export default OcInPreviousPregnancy;
