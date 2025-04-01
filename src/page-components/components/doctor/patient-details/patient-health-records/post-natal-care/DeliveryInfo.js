import React from "react";
import { useTranslation } from "react-i18next";
import Tooltip from "../../../../../common-components/Tooltip";
import info from "../../../../../../images/info.svg";

const DeliveryInfo = ({
  postNatalCare = {},
  handlePostNatalCare = () => {},
}) => {
  const { t } = useTranslation();
  return (
    <div className="mt-5 text-sm text-primary">
      <div className="mb-4">
        <div className="mb-1">{t("Delivery Details (Single, Twin etc.)")}</div>
        <div className="grid-cols-2 gap-x-5 grid">
          <input
            type="text"
            name="deliveryDetails"
            value={postNatalCare.deliveryDetails}
            onChange={handlePostNatalCare}
            placeholder={t("Delivery Details (Single, Twin etc.)")}
            className="border bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
          />
          <div></div>
        </div>
      </div>
      <div className="grid grid-cols-2 w-full gap-x-5 gap-y-2">
        <div className="w-full">
          <div className="mb-1">{t("Date of Delivery")}</div>
          <input
            type="date"
            name="deliveryDate"
            value={postNatalCare.deliveryDate}
            onChange={handlePostNatalCare}
            placeholder={t("Date of Delivery")}
            className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
          />
        </div>
        <div>
          <div className="mb-1">
            {t("Place of Delivery (At Institution/ Home/ Delivery in Transit)")}
          </div>
          <input
            type="text"
            name="deliveryPlace"
            value={postNatalCare.deliveryPlace}
            onChange={handlePostNatalCare}
            placeholder={t(
              "Place of Delivery (At Institution/ Home/ Delivery in Transit)"
            )}
            className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
          />
        </div>
      </div>
      <div className="mt-5">
        <div className="mb-1">{t("Pregnancy Outcome")}</div>
        <div>
          <label className="flex items-center gap-2">
            <input
              name="pregnancyOutcome"
              type="checkbox"
              onChange={handlePostNatalCare}
              value="Live Birth"
              checked={postNatalCare.pregnancyOutcome === "Live Birth"}
            />
            {t("Live Birth")}{" "}
            <Tooltip
              maxWidth={500}
              placement="right"
              content={t("A baby born alive, showing signs of life")}
            >
              <img src={info} alt="info" />
            </Tooltip>
          </label>
          <label className="flex items-center mt-1 gap-2">
            <input
              name="pregnancyOutcome"
              type="checkbox"
              onChange={handlePostNatalCare}
              value="Still Birth"
              checked={postNatalCare.pregnancyOutcome === "Still Birth"}
            />
            {t("Still Birth")}
            <Tooltip
              maxWidth={500}
              placement="right"
              content={t(
                "A baby born with no signs of life after 28 weeks of pregnancy"
              )}
            >
              <img src={info} alt="info" />
            </Tooltip>
          </label>
          <label className="flex items-center mt-1 gap-2">
            <input
              type="checkbox"
              name="pregnancyOutcome"
              onChange={handlePostNatalCare}
              value="Infant Death"
              checked={postNatalCare.pregnancyOutcome === "Infant Death"}
            />
            {t("Infant Death")}{" "}
            <Tooltip
              placement="right"
              maxWidth={500}
              content={t("A baby born alive but dies within the first year")}
            >
              <img src={info} alt="info" />
            </Tooltip>
          </label>
          <label className="flex items-center mt-1 gap-2">
            <input
              type="checkbox"
              name="pregnancyOutcome"
              onChange={handlePostNatalCare}
              value="Maternal Death"
              checked={postNatalCare.pregnancyOutcome === "Maternal Death"}
            />
            {t("Maternal Death")}{" "}
            <Tooltip
              placement="right"
              maxWidth={500}
              content={t(
                "The mother dies during pregnancy, childbirth, or postpartum. ( <42 days )"
              )}
            >
              <img src={info} alt="info" />
            </Tooltip>
          </label>
          <label className="flex items-center mt-1 gap-2">
            <input
              type="checkbox"
              name="pregnancyOutcome"
              onChange={handlePostNatalCare}
              value="Abortion"
              checked={postNatalCare.pregnancyOutcome === "Abortion"}
            />
            {t("Abortion")}{" "}
            <Tooltip
              placement="right"
              maxWidth={500}
              content={t(
                "Pregnancy ends before 20 weeks (spontaneous or induced)"
              )}
            >
              <img src={info} alt="info" />
            </Tooltip>
          </label>
          <label className="flex items-center mt-1 gap-2">
            <input
              type="checkbox"
              name="pregnancyOutcome"
              onChange={handlePostNatalCare}
              value="IUD"
              checked={postNatalCare.pregnancyOutcome === "IUD"}
            />
            {t("IUD")}{" "}
            <Tooltip
              placement="right"
              maxWidth={400}
              content={t(
                "Fetal death inside the uterus after 20 weeks but before birth"
              )}
            >
              <img src={info} alt="info" />
            </Tooltip>
          </label>
        </div>
      </div>
      <div className="mt-3">
        <div>{t("Type of Delivery")}</div>
        <div className="flex items-center gap-10 mt-1 border-[#D1D5DB]">
          <label className="flex items-center gap-2">
            <input
              name="deliveryType"
              type="checkbox"
              onChange={handlePostNatalCare}
              value="Normal"
              checked={postNatalCare.deliveryType === "Normal"}
            />
            {t("Normal")}
          </label>
          <label className="flex items-center gap-2">
            <input
              name="deliveryType"
              type="checkbox"
              onChange={handlePostNatalCare}
              value="CS"
              checked={postNatalCare.deliveryType === "CS"}
            />
            {t("LCSC")}
          </label>
        </div>
      </div>
      <div className="mt-3">
        <div>{t("Sex of baby")}</div>
        <div className="flex items-center gap-10 mt-1 border-[#D1D5DB]">
          <label className="flex items-center gap-2">
            <input
              name="babySex"
              type="checkbox"
              onChange={handlePostNatalCare}
              value="Male"
              checked={postNatalCare.babySex === "Male"}
            />
            {t("Male")}
          </label>
          <label className="flex items-center gap-2">
            <input
              name="babySex"
              type="checkbox"
              onChange={handlePostNatalCare}
              value="Female"
              checked={postNatalCare.babySex === "Female"}
            />
            {t("Female")}
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2 w-1/2 gap-5 my-3 items-center">
        <div>
          <div className="mb-1">{t("Weight of baby (in Kg)")}</div>
          <input
            type="number"
            name="babyWeightInKg"
            min={0}
            value={postNatalCare.babyWeightInKg}
            onChange={handlePostNatalCare}
            placeholder={t("Weight of baby (in Kg)")}
            className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
          />
        </div>
        <div className="">
          <div className="mb-1">{t("Hemoglobin Percentage (Hb %)")}</div>
          <div className="flex">
            <input
              type="number"
              name="hemoglobinInPercent"
              value={postNatalCare.hemoglobinInPercent}
              onChange={handlePostNatalCare}
              placeholder={t("Hemoglobin Percentage (Hb %)")}
              className="border border-r-0 rounded-r-none w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
            />
            <input
              className="border w-10 border-l-0 rounded-l-none bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
              type="text"
              disabled
              value={t("%")}
            />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <div>{t("Cried immediately after birth")}</div>
        <div className="flex items-center gap-10 mt-1 border-[#D1D5DB]">
          <label className="flex items-center gap-2">
            <input
              name="criedImmediatelyAfterBirth"
              type="checkbox"
              onChange={handlePostNatalCare}
              value={true}
              checked={postNatalCare.criedImmediatelyAfterBirth === true}
            />
            {t("Yes")}
          </label>
          <label className="flex items-center gap-2">
            <input
              name="criedImmediatelyAfterBirth"
              type="checkbox"
              onChange={handlePostNatalCare}
              value={false}
              checked={postNatalCare.criedImmediatelyAfterBirth === false}
            />
            {t("No")}
          </label>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-center">
          {t("Initiated exclusive breastfeeding within 1 hour of birth")}
          <span className="text-secondary text-xs ms-1">
            *({t("Three extra visits if birth weight < 2.5kg")})
          </span>
        </div>
        <div className="flex items-center gap-10 mt-1 border-[#D1D5DB]">
          <label className="flex items-center gap-2">
            <input
              name="initiatedBreastfeeding"
              type="checkbox"
              onChange={handlePostNatalCare}
              value={true}
              checked={postNatalCare.initiatedBreastfeeding === true}
            />
            {t("Yes")}
          </label>
          <label className="flex items-center gap-2">
            <input
              name="initiatedBreastfeeding"
              type="checkbox"
              onChange={handlePostNatalCare}
              value={false}
              checked={postNatalCare.initiatedBreastfeeding === false}
            />
            {t("No")}
          </label>
        </div>
      </div>
      <div className="mt-3">
        <div>{t("Injection Vitamin K")}</div>
        <div className="flex items-center gap-10 mt-1 border-[#D1D5DB]">
          <label className="flex items-center gap-2">
            <input
              name="vitaminKInjection"
              type="checkbox"
              onChange={handlePostNatalCare}
              value={true}
              checked={postNatalCare.vitaminKInjection === true}
            />
            {t("Yes")}
          </label>
          <label className="flex items-center gap-2">
            <input
              name="vitaminKInjection"
              type="checkbox"
              onChange={handlePostNatalCare}
              value={false}
              checked={postNatalCare.vitaminKInjection === false}
            />
            {t("No")}
          </label>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
