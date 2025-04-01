import React from "react";
import { useTranslation } from "react-i18next";
import { CiCirclePlus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const OptionalInvestigation = ({
  antenatalCare = {},
  handleAntenatalCare = () => {},
  addOptionalInvestColumn = () => {},
  deleteOptionalInvestColumn = () => {},
}) => {
  const { t } = useTranslation();
  const { optionalInvestigations = [] } = antenatalCare || {};

  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 w-full gap-x-5 gap-y-2">
        <div>
          <div className="mb-1">{t("Urine Pregnancy Test")}</div>
          <input
            name="urinePregnancyTest"
            onChange={handleAntenatalCare}
            value={antenatalCare.urinePregnancyTest}
            type="text"
            className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
          />
        </div>
        <div>
          <div className="mb-1">{t("Date")}</div>
          <input
            type="date"
            name="urinePregnancyTestDate"
            value={antenatalCare.urinePregnancyTestDate}
            onChange={handleAntenatalCare}
            placeholder={t("Date")}
            className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
          />
        </div>
        <div>
          <div className="mb-1">{t("Blood Group & Rh Typing")}</div>
          <input
            type="text"
            name="bloodGroupRhTyping"
            value={antenatalCare.bloodGroupRhTyping}
            onChange={handleAntenatalCare}
            placeholder={t("Blood Group & Rh Typing")}
            className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
          />
        </div>

        <div>
          <div className="mb-1">{t("Date")}</div>
          <input
            type="date"
            name="bloodGroupRhTypingDate"
            value={antenatalCare.bloodGroupRhTypingDate}
            onChange={handleAntenatalCare}
            placeholder={t("Date")}
            className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
          />
        </div>
      </div>
      <div className="flex items-center mt-5 justify-between">
        <h1 className="text-base uppercase">{t("Optional Investigation")}</h1>
        <button onClick={addOptionalInvestColumn}>
          <CiCirclePlus color="#616C7C" size={24} />
        </button>
      </div>

      {optionalInvestigations.map((optionalInvestigation, index) => (
        <div key={index} className="grid grid-cols-3 w-full gap-x-5 gap-y-2">
          <div>
            <div className="mb-1">{t("Investigation Name")}</div>
            <input
              type="text"
              name="title"
              value={optionalInvestigation.title}
              onChange={(e) =>
                handleAntenatalCare(e, index, "optionalInvestigations")
              }
              placeholder={t("Investigation Name")}
              className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
            />
          </div>
          <div>
            <div className="mb-1">{t("Investigation Value")}</div>
            <input
              type="text"
              name="value"
              value={optionalInvestigation.value}
              onChange={(e) =>
                handleAntenatalCare(e, index, "optionalInvestigations")
              }
              placeholder={t("Investigation Value")}
              className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
            />
          </div>

          <div className="w-full">
            <div className="mb-1">{t("Date")}</div>
            <div className="flex gap-x-5">
              <input
                type="date"
                name="date"
                value={optionalInvestigation.date}
                onChange={(e) =>
                  handleAntenatalCare(e, index, "optionalInvestigations")
                }
                placeholder={t("Date")}
                className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
              />
              {optionalInvestigations.length === 1 ? null : (
                <button onClick={() => deleteOptionalInvestColumn(index)}>
                  <MdDelete size={20} color="#C81E1E" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="my-2">
        <div className="mb-2">{t("Notes")}</div>
        <textarea
          name="notes"
          value={antenatalCare.notes}
          onChange={handleAntenatalCare}
          placeholder={t("Notes")}
          className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
        />
      </div>
    </div>
  );
};

export default OptionalInvestigation;
