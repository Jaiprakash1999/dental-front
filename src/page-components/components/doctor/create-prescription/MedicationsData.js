import React, { memo } from "react";
import Select from "../../../common-components/Select";
import {
  DURATION,
  FREQUENCY_COUNT,
  MEDICATION_MEASUREMENT,
  TIMING,
} from "../../../constants/Constant";
import {
  faAngleDown,
  faAngleUp,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatArray } from "../../../utils/formateArray";
import useGetAllDrug from "./hooks/useGetAllDrug";
import SearchAndSelectDrug from "../../../common-components/SearchAndSelectDrug";
import { useTranslation } from "react-i18next";

const MedicationsData = ({
  rxList = [],
  handleInputChange = () => {},
  removeMedicationField = () => {},
}) => {
  const { t } = useTranslation();
  const { isDrugListLoading, drugList, getAllDrugList } = useGetAllDrug();

  return (
    <div>
      {rxList.map((item, index) => (
        <div className="flex flex-col" key={index}>
          <div className="flex mb-2 gap-5">
            <div className="w-full text-sm">
              <div className="text-[#111928] my-1">
                {t("Medication")} {index + 1}
              </div>

              <SearchAndSelectDrug
                options={formatArray(drugList)}
                isLoading={isDrugListLoading}
                getData={getAllDrugList}
                currentIndex={index}
                defaultOptions={{
                  label: item.drugName,
                  value: item.drugName,
                }}
                // className="focus:outline-none rounded-lg ps-2 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm  w-full focus:border-[#006AF5]"
              />
            </div>

            <div className="w-[50%] text-sm">
              <div className="text-[#111928] my-1">{t("Dosage")}</div>
              <div className="flex w-full">
                <div className="w-[50%]">
                  <input
                    name="dose"
                    onChange={(e) => handleInputChange(e, index)}
                    placeholder={t("Dosage")}
                    value={item.dose || ""}
                    className="border w-full items-center border-[#D1D5DB] py-1.5 px-2 focus:border-[#2D2E33] text-sm text-gray-800 rounded-r-none rounded-lg focus:outline-none"
                  />
                </div>
                <div className="w-[50%]">
                  <Select
                    showIcon={false}
                    options={MEDICATION_MEASUREMENT}
                    name="measurement"
                    onChange={(e) => handleInputChange(e, index)}
                    upIcon={faAngleUp}
                    placeholder="m. unit"
                    downIcon={faAngleDown}
                    className="border w-full items-center border-[#D1D5DB] border-l-0 py-1.5 px-2 focus:border-[#2D2E33] text-sm text-gray-800 rounded-l-none rounded-lg focus:outline-none"
                    defaultOption={{
                      label: item.measurement,
                      value: item.measurement,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="w-[70%] text-sm">
              <div className="text-[#111928] my-1">{t("Timing")}</div>
              <Select
                options={TIMING}
                name="timing"
                onChange={(e) => handleInputChange(e, index)}
                upIcon={faAngleUp}
                downIcon={faAngleDown}
                placeholder={t("Timing")}
                showIcon={false}
                defaultOption={{ label: item.timing, value: item.timing }}
              />
            </div>
            <div className="w-1/2 text-sm">
              <div className="text-[#111928] my-1">{t("Frequency")}</div>
              <Select
                onChange={(e) => handleInputChange(e, index)}
                options={FREQUENCY_COUNT}
                upIcon={faAngleUp}
                downIcon={faAngleDown}
                name="frequency"
                placeholder={t("Frequency")}
                showIcon={false}
                defaultOption={{ label: item.frequency, value: item.frequency }}
              />
            </div>
            <div className="w-[30%] text-sm">
              <div className="text-[#111928] my-1">{t("Duration")}</div>
              <Select
                onChange={(e) => handleInputChange(e, index)}
                options={DURATION}
                upIcon={faAngleUp}
                downIcon={faAngleDown}
                placeholder={t("Duration")}
                showIcon={false}
                name="duration"
                defaultOption={{ label: item.duration, value: item.duration }}
              />
            </div>
            <div className="w-[70%] text-sm">
              <div className="text-[#111928] my-1">{t("Notes")}</div>
              <div>
                <textarea
                  rows={1}
                  name="notes"
                  value={item.notes || ""}
                  placeholder={t("Add medication notes")}
                  onChange={(e) => handleInputChange(e, index)}
                  className="focus:outline-none rounded-lg  min-h-9 px-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm w-full focus:border-[#2D2E33]"
                />
              </div>
            </div>
            {rxList.length > 1 && (
              <div className="flex mt-5 justify-center">
                <button
                  className=" px-1 active:animate-bounce rounded border-[#E7F4FF]"
                  onClick={() => removeMedicationField(index)}
                >
                  <FontAwesomeIcon icon={faTrashCan} color="#E02424" />
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(MedicationsData);
