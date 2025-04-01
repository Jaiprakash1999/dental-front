import React from "react";
import { useTranslation } from "react-i18next";
import Tooltip from "../../../../../common-components/Tooltip";
import info from "../../../../../../images/info.svg";
import Select from "../../../../../common-components/Select";
import { formatArray } from "../../../../../utils/formateArray";
import { DELIVERY_DETAILS } from "../../../../../constants/Constant";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { CiCirclePlus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const Examination = ({
  antenatalCare = {},
  handleAntenatalCare = () => {},
  addPreviousChildColumn = () => {},
  deletePreviousChildColumn = () => {},
}) => {
  const { t } = useTranslation();
  return (
    <div className="w-full mt-4">
      <div className="grid grid-cols-2 gap-x-5 mt-3">
        <div>
          <div className="mb-2 flex items-center gap-2 ">
            {t("GPLAD")}
            <Tooltip
              placement="right"
              maxWidth={500}
              content={
                <ul className="ps-2 list-disc">
                  <li>
                    {t(
                      "G (Gravida) - Total number of pregnancies, including current."
                    )}
                  </li>
                  <li>
                    {t(
                      "P (Para) - Number of past deliveries after 20 weeks (live or stillborn)."
                    )}
                  </li>
                  <li>
                    {t(
                      "L (Live Births) - Number of children born alive and survived."
                    )}
                  </li>
                  <li>
                    {t(
                      "A (Abortions) - Number of pregnancies lost before 20 weeks (spontaneous or induced)."
                    )}
                  </li>
                  <li>
                    {t("D (Deaths) - Number of children who died after birth")}
                  </li>
                </ul>
              }
            >
              <img src={info} alt="info" />
            </Tooltip>
          </div>
          <input
            type="text"
            name="gplad"
            value={antenatalCare.gplad}
            onChange={handleAntenatalCare}
            placeholder={t("GPLAD")}
            className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
          />
        </div>
        <div>
          <div className="mb-2">{t("Previous Delivery Details")}</div>
          <Select
            options={formatArray(DELIVERY_DETAILS)}
            name="previousDelivery"
            onChange={handleAntenatalCare}
            upIcon={faAngleUp}
            downIcon={faAngleDown}
            readOnly
            closeTopPosition="top-2"
            defaultOption={{
              label: antenatalCare.previousDelivery,
              value: antenatalCare.previousDelivery,
            }}
            className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
          />
        </div>
      </div>
      <div className="mt-4">
        <div className="flex mb-1 gap-x-5 items-center">
          <div className="">{t("Previous Children")}</div>
          <button onClick={addPreviousChildColumn}>
            <CiCirclePlus color="#616C7C" size={24} />
          </button>
        </div>
        <div className="grid grid-cols-3 items-center gap-5">
          {antenatalCare?.previousChildren.map((child, index) => {
            return (
              <div key={index} className="flex items-center gap-x-5">
                <input
                  type="text"
                  value={child}
                  onChange={(e) =>
                    handleAntenatalCare(e, index, "previousChildren")
                  }
                  placeholder={t("Name, Gender, Age etc.")}
                  className="border w-full  bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
                {antenatalCare?.previousChildren.length === 1 ? null : (
                  <button onClick={() => deletePreviousChildColumn(index)}>
                    <MdDelete size={20} color="#C81E1E" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <h1 className="text-base uppercase mt-4 mb-2">{t("Examination")}</h1>
      <div className="grid w-1/2 grid-cols-1 border">
        <div className="grid grid-cols-2 border">
          <div className="py-2.5 text-center border-r-2">{t("Heart")}</div>
          <div className="w-full">
            <input
              name="heart"
              onChange={handleAntenatalCare}
              value={antenatalCare.heart}
              type="text"
              // placeholder={t("Type")}
              className="w-full p-2.5 focus:border-none outline-none border-[#D1D5DB] disabled:bg-[#F9FAFB] focus:bg-[#ffff]"
            />
          </div>
        </div>
        <div className="border grid grid-cols-2">
          <div className=" py-2.5 border-r-2 text-center">{t("Lungs")}</div>
          <div>
            <input
              name="lungs"
              onChange={handleAntenatalCare}
              value={antenatalCare.lungs}
              type="text"
              // placeholder={t("Type")}
              className="w-full p-2.5 focus:border-none outline-none border-[#D1D5DB] disabled:bg-[#F9FAFB] focus:bg-[#ffff]"
            />
          </div>
        </div>
        <div className="border grid grid-cols-2">
          <div className="text-center border-r-2">
            <div> {t("Breasts")}</div>
            <div>({t("check for inverted nipple")})</div>
          </div>
          <div>
            <input
              name="breasts"
              onChange={handleAntenatalCare}
              value={antenatalCare.breasts}
              type="text"
              // placeholder={t("Type")}
              className="w-full p-2.5 focus:border-none outline-none border-[#D1D5DB] disabled:bg-[#F9FAFB] focus:bg-[#ffff]"
            />
          </div>
        </div>
        <div className="border grid grid-cols-2">
          <div className=" py-2.5 border-r-2 text-center">{t("Thyroid")}</div>
          <div>
            <input
              name="thyroid"
              onChange={handleAntenatalCare}
              value={antenatalCare.thyroid}
              type="text"
              // placeholder={t("Type")}
              className="w-full p-2.5 focus:border-none outline-none border-[#D1D5DB] disabled:bg-[#F9FAFB] focus:bg-[#ffff]"
            />
          </div>
        </div>
        <div className="border grid grid-cols-2">
          <div className=" py-2.5 border-r-2 text-center">{t("Spine")}</div>
          <div>
            <input
              name="spine"
              onChange={handleAntenatalCare}
              value={antenatalCare.spine}
              type="text"
              // placeholder={t("Type")}
              className="w-full p-2.5 focus:border-none outline-none border-[#D1D5DB] disabled:bg-[#F9FAFB] focus:bg-[#ffff]"
            />
          </div>
        </div>
        <div className="border grid grid-cols-2">
          <div className=" py-2.5 border-r-2 text-center">{t("Gait")}</div>
          <div>
            <input
              name="gait"
              onChange={handleAntenatalCare}
              value={antenatalCare.gait}
              type="text"
              // placeholder={t("Type")}
              className="w-full p-2.5 focus:border-none outline-none border-[#D1D5DB] disabled:bg-[#F9FAFB] focus:bg-[#ffff]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Examination;
