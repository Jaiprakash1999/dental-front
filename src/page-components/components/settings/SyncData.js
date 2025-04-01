import React from "react";
import syncImage from "../../../images/cloud 1.png";
import { useTranslation } from "react-i18next";
const { REACT_APP_IS_ONLINE } = process.env || {};

const SyncData = ({ setActiveSetting = () => {} }) => {
  const { t } = useTranslation();

  return (
    <div
      onClick={() => setActiveSetting("sync_data")}
      className="flex text-sm text-primary my-5 items-center"
    >
      <div>
        <img src={syncImage} alt="syncImage" />
      </div>
      <div className="ms-5">
        {REACT_APP_IS_ONLINE === "true" ? t("Data Sync") : t("Data Upload")}
      </div>
    </div>
  );
};

export default SyncData;
