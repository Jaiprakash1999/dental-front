import React, { useState } from "react";
import languageSelection from "../../../images/languageSelection.svg";
import { useTranslation } from "react-i18next";
import SyncData from "./SyncData";
import UploadDataList from "./UploadDataList";

const Settings = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("selectedLanguage", language);
  };

  const [activeSetting, setActiveSetting] = useState(null);

  return (
    <div className="text-primary px-5">
      <div className="py-5 text-base">{t("Settings")}</div>
      <hr className=" border-[#C0CBFF]"></hr>
      {activeSetting === "sync_data" ? (
        <UploadDataList setActiveSetting={setActiveSetting} />
      ) : (
        <>
          <SyncData setActiveSetting={setActiveSetting} />
          <hr className=" border-[#C0CBFF]"></hr>
          <div className="my-5 flex items-center">
            <img src={languageSelection} alt="languageSelection" />
            <h1 className="ms-5">{t("Switch Language")}</h1>
          </div>
          <div>
            <form className="flex items-center">
              <div className="me-10">
                <input
                  type="radio"
                  id="english"
                  name="language"
                  value="en"
                  checked={i18n.language === "en"}
                  onChange={() => changeLanguage("en")}
                />
                <label htmlFor="english" className="ms-2">
                  English
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="telugu"
                  name="language"
                  value="te"
                  checked={i18n.language === "te"}
                  onChange={() => changeLanguage("te")}
                />
                <label htmlFor="telugu" className="ms-2">
                  {t("Telugu")}
                </label>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Settings;
