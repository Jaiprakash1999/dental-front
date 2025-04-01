import React from "react";
import MultiSelect from "../../../../../common-components/MultiSelect";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { formatArray } from "../../../../../utils/formateArray";
import { FAMILY_PLANNING_COUNSLING } from "../../../../../constants/Constant";

const FamilyPlaning = ({
  postNatalCare = {},
  handlePostNatalCare = () => {},
}) => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="mt-2">
        <div className="mb-1">{t("Family Planning Counselling")}?</div>
        <div>
          <MultiSelect
            upIcon={faAngleUp}
            options={formatArray(FAMILY_PLANNING_COUNSLING)}
            labelKey="label"
            valueKey="value"
            name="familyPlanningCounselling"
            onChange={handlePostNatalCare}
            defaultOptions={formatArray(
              postNatalCare.familyPlanningCounselling
            )}
            downIcon={faAngleDown}
            iconTopPositionClose="top-1.5"
            iconTopPositionOpen="top-1.5"
            multiple
          />
        </div>
      </div>
      <div className="my-2">
        <div className="mb-1">{t("Notes")}</div>
        <textarea
          name="notes"
          value={postNatalCare.notes}
          onChange={handlePostNatalCare}
          placeholder={t("Notes")}
          className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
        />
      </div>
    </div>
  );
};

export default FamilyPlaning;
