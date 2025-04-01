import React from "react";
import { useTranslation } from "react-i18next";
import { formatDateAndTime } from "../../../../../utils/formatDateTime";

const NewBornCare = ({ careOfBabyInfo = {}, handleBabyCare = () => {} }) => {
  const { t } = useTranslation();

  return (
    <div className="mt-5 text-sm text-primary">
      <h1 className="mb-2 font-medium">{t("New Born Care")}</h1>
      <div className="grid grid-cols-3 w-full gap-x-5 gap-y-2">
        <div className="w-full">
          <div className="mb-1">{t("Date & time of first examination")}</div>
          <input
            type="datetime-local"
            name="firstExaminationDateTime"
            value={formatDateAndTime(careOfBabyInfo.firstExaminationDateTime)}
            onChange={handleBabyCare}
            placeholder={t("Date & time of first examination")}
            className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
          />
        </div>
        <div>
          <div className="mb-1">{t("First feed to baby after birth")}</div>
          <input
            type="text"
            name="firstFeedAfterBirth"
            value={careOfBabyInfo.firstFeedAfterBirth}
            onChange={handleBabyCare}
            placeholder={t("First feed to baby after birth")}
            className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
          />
        </div>
        <div>
          <div className="mb-1">{t("First breastfeed date & time")}</div>
          <input
            type="datetime-local"
            name="firstBreastfeedTime"
            value={formatDateAndTime(careOfBabyInfo.firstBreastfeedTime)}
            onChange={handleBabyCare}
            placeholder={t("First breastfeed date & time")}
            className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
          />
        </div>
      </div>
      <div className="mt-3">
        <div>{t("How the baby got fed")}</div>
        <div className="flex items-center gap-10 mt-1 border-[#D1D5DB]">
          <label className="flex items-center gap-2">
            <input
              name="howFeed"
              type="checkbox"
              onChange={handleBabyCare}
              value="Good Suck"
              checked={careOfBabyInfo.howFeed === "Good Suck"}
            />
            {t("Good Suck")}
          </label>
          <label className="flex items-center gap-2">
            <input
              name="howFeed"
              type="checkbox"
              onChange={handleBabyCare}
              value="Weak Suck"
              checked={careOfBabyInfo.howFeed === "Weak Suck"}
            />
            {t("Weak Suck")}
          </label>
          <label className="flex items-center gap-2">
            <input
              name="howFeed"
              type="checkbox"
              onChange={handleBabyCare}
              value="Spoon Feed"
              checked={careOfBabyInfo.howFeed === "Spoon Feed"}
            />
            {t("Spoon Feed")}
          </label>
        </div>
      </div>

      <div className="mt-3">
        <div className="mb-1">
          {t("If Weak Suck/ Spoon Feed, What's the Reason")}
        </div>
        <input
          type="text"
          name="weakSuckReason"
          value={careOfBabyInfo.weakSuckReason}
          onChange={handleBabyCare}
          placeholder={t("If Weak Suck/ Spoon Feed, What's the Reason")}
          className="border w-1/4 bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
        />
      </div>
      <div className="mt-3 grid grid-cols-3">
        <div>
          <div>{t("Baby was Dried?")}</div>
          <div className="flex items-center gap-10 mt-1 border-[#D1D5DB]">
            <label className="flex items-center gap-2">
              <input
                name="dryBaby"
                type="checkbox"
                onChange={handleBabyCare}
                value={true}
                checked={careOfBabyInfo.dryBaby === true}
              />
              {t("Yes")}
            </label>
            <label className="flex items-center gap-2">
              <input
                name="dryBaby"
                type="checkbox"
                onChange={handleBabyCare}
                value={false}
                checked={careOfBabyInfo.dryBaby === false}
              />
              {t("No")}
            </label>
          </div>
        </div>
        <div>
          <div>{t("Baby was kept warm?")}</div>
          <div className="flex items-center gap-10 mt-1 border-[#D1D5DB]">
            <label className="flex items-center gap-2">
              <input
                name="keptWarm"
                type="checkbox"
                onChange={handleBabyCare}
                value={true}
                checked={careOfBabyInfo.keptWarm === true}
              />
              {t("Yes")}
            </label>
            <label className="flex items-center gap-2">
              <input
                name="keptWarm"
                type="checkbox"
                onChange={handleBabyCare}
                value={false}
                checked={careOfBabyInfo.keptWarm === false}
              />
              {t("No")}
            </label>
          </div>
        </div>
        <div>
          <div>{t("Bath after Delivery?")}</div>
          <div className="flex items-center gap-10 mt-1 border-[#D1D5DB]">
            <label className="flex items-center gap-2">
              <input
                name="dontBath"
                type="checkbox"
                onChange={handleBabyCare}
                value={true}
                checked={careOfBabyInfo.dontBath === true}
              />
              {t("Yes")}
            </label>
            <label className="flex items-center gap-2">
              <input
                name="dontBath"
                type="checkbox"
                onChange={handleBabyCare}
                value={false}
                checked={careOfBabyInfo.dontBath === false}
              />
              {t("No")}
            </label>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3">
        <div>
          <div>{t("Wrapped into a cloth closer to the mother?")}</div>
          <div className="flex items-center gap-10 mt-1 border-[#D1D5DB]">
            <label className="flex items-center gap-2">
              <input
                name="wrappedCloseToMother"
                type="checkbox"
                onChange={handleBabyCare}
                value={true}
                checked={careOfBabyInfo.wrappedCloseToMother === true}
              />
              {t("Yes")}
            </label>
            <label className="flex items-center gap-2">
              <input
                name="wrappedCloseToMother"
                type="checkbox"
                onChange={handleBabyCare}
                value={false}
                checked={careOfBabyInfo.wrappedCloseToMother === false}
              />
              {t("No")}
            </label>
          </div>
        </div>
        <div>
          <div>{t("Was exclusively breastfeed given?")}</div>
          <div className="flex items-center gap-10 mt-1 border-[#D1D5DB]">
            <label className="flex items-center gap-2">
              <input
                name="exclusivelyBreastfed"
                type="checkbox"
                onChange={handleBabyCare}
                value={true}
                checked={careOfBabyInfo.exclusivelyBreastfed === true}
              />
              {t("Yes")}
            </label>
            <label className="flex items-center gap-2">
              <input
                name="exclusivelyBreastfed"
                type="checkbox"
                onChange={handleBabyCare}
                value={false}
                checked={careOfBabyInfo.exclusivelyBreastfed === false}
              />
              {t("No")}
            </label>
          </div>
        </div>
        <div>
          <div>{t("Cord Kept cleaned or dried?")}</div>
          <div className="flex items-center gap-10 mt-1 border-[#D1D5DB]">
            <label className="flex items-center gap-2">
              <input
                name="cordCare"
                type="checkbox"
                onChange={handleBabyCare}
                value={true}
                checked={careOfBabyInfo.cordCare === true}
              />
              {t("Yes")}
            </label>
            <label className="flex items-center gap-2">
              <input
                name="cordCare"
                type="checkbox"
                onChange={handleBabyCare}
                value={false}
                checked={careOfBabyInfo.cordCare === false}
              />
              {t("No")}
            </label>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div>{t("Unusual Findings")}</div>
        <div className="flex items-center gap-10 mt-1 border-[#D1D5DB]">
          <label className="flex items-center gap-2">
            <input
              name="unusualFindings"
              type="checkbox"
              onChange={handleBabyCare}
              value="Curved limbs"
              checked={careOfBabyInfo.unusualFindings === "Curved limbs"}
            />
            {t("Curved limbs")}
          </label>
          <label className="flex items-center gap-2">
            <input
              name="unusualFindings"
              type="checkbox"
              onChange={handleBabyCare}
              value="Cleft lip"
              checked={careOfBabyInfo.unusualFindings === "Cleft lip"}
            />
            {t("Cleft lip")}
          </label>
          <label className="flex items-center gap-2">
            {t("Others")}:
            <input
              name="unusualFindings"
              type="text"
              onChange={handleBabyCare}
              value={careOfBabyInfo.unusualFindings}
              className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-1.5 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default NewBornCare;
