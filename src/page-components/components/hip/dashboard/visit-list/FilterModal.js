import React, { memo, useContext } from "react";
import MultiSelect from "../../../../common-components/MultiSelect";
import {
  GENDER,
  VISIT_STATUS,
  VISIT_TAGS,
} from "../../../../constants/Constant";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { filterListContext } from "./HIPdashboard";
import { formatArray } from "../../../../utils/formateArray";
const FilterModal = () => {
  const filterState = useContext(filterListContext);
  const {
    setIsFilterModalOpen = () => {},
    selectedFilters,
    handleFilterChange,
  } = filterState || {};

  return (
    <div className="absolute w-[30%] right-24 z-50 bg-white">
      <div
        style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
        className="px-3 text-sm py-2 rounded"
      >
        <div className="flex w-full justify-between">
          <div className="text-[#1F2A37] font-medium">Filters</div>

          <button
            onClick={() => setIsFilterModalOpen(false)}
            className="text-[#1F2A37] cursor-pointer text-base"
          >
            &#10005;
          </button>
        </div>
        <div className="flex items-center py-3 w-full">
          <div className="w-[30%] text-[#000000] font-normal">Gender</div>
          <div className="w-[70%]">
            <MultiSelect
              upIcon={faAngleUp}
              options={GENDER}
              labelKey="label"
              name="gender"
              valueKey="value"
              onChange={handleFilterChange}
              defaultOptions={selectedFilters.gender}
              downIcon={faAngleDown}
              iconTopPositionClose="top-1.5"
              iconTopPositionOpen="top-1.5"
              multiple
            />
          </div>
        </div>

        <div className="flex items-center pb-3 w-full">
          <div className="w-[30%] text-[#000000] font-normal">Visit Status</div>
          <div className="w-[70%]">
            <MultiSelect
              upIcon={faAngleUp}
              options={VISIT_STATUS}
              labelKey="label"
              valueKey="value"
              name="visitStatus"
              onChange={handleFilterChange}
              defaultOptions={selectedFilters.visitStatus}
              downIcon={faAngleDown}
              iconTopPositionClose="top-1.5"
              iconTopPositionOpen="top-1.5"
              multiple
            />
          </div>
        </div>
        <div className="flex items-center w-full">
          <div className="w-[30%] text-[#000000] font-normal">Tags</div>
          <div className="w-[70%]">
            <MultiSelect
              upIcon={faAngleUp}
              options={formatArray(VISIT_TAGS)}
              labelKey="label"
              valueKey="value"
              name="tags"
              onChange={handleFilterChange}
              defaultOptions={selectedFilters.tags}
              downIcon={faAngleDown}
              iconTopPositionClose="top-1.5"
              iconTopPositionOpen="top-1.5"
              multiple
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(FilterModal);
