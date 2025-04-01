import React from "react";
import { useTranslation } from "react-i18next";

const ShortCutInfo = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-white text-sm p-3 pt-1 border rounded-lg">
      <p className="font-medium mb-0.5">{t("Quick Access Shortcuts")}</p>

      <div className="flex">
        <div className="me-1">{t("control + t")} : </div>
        <div className="ms-1"> {t("Open Template")}</div>
      </div>
      <div className="flex">
        <div className="me-1"> {t("control + m")} : </div>
        <div className="ms-1">{t("Add Medication Field")}</div>
      </div>
      <div className="flex">
        <div className="me-1">{t("control + s")} : </div>
        <div className="ms-1">{t("Save Template")} </div>
      </div>
      <div className="flex">
        <div className="me-1">{t("control + p")} : </div>
        <div className="ms-1">{t("Preview with Header")}</div>
      </div>
      <div className="flex">
        <div className="me-1">{t("control + c")} : </div>
        <div className="ms-1">{t("Clear All")}</div>
      </div>
    </div>
  );
};

export default ShortCutInfo;
