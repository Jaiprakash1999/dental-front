import React, { memo, useContext } from "react";
import { filterListContext } from "./HIPdashboard";
import { FORMAT_VISIT_TAGS } from "../../../../utils/userType";

const AppliedFilters = () => {
  const filterState = useContext(filterListContext);
  const { selectedFilters, handleRemoveFilter } = filterState || {};
  const { visitStatus = [], tags = [], gender = [] } = selectedFilters || {};
  return (
    <div className="flex ">
      {visitStatus.map((item, index) => {
        return (
          <div
            key={item.value}
            className="px-3 mx-2 flex-shrink-0 gap-2 py-2 rounded-lg text-[#000000] bg-[#E5E7EB]"
          >
            {item.label}{" "}
            <button
              className="text-sm font-semibold ms-2"
              onClick={() => handleRemoveFilter("visitStatus", index)}
            >
              &#10005;
            </button>
          </div>
        );
      })}

      {gender.map((item, index) => {
        return (
          <div
            key={item.value}
            className="px-3 flex-shrink-0 mx-2 gap-2 py-2 rounded-lg text-[#000000] bg-[#E5E7EB]"
          >
            {item.label}{" "}
            <button
              onClick={() => handleRemoveFilter("gender", index)}
              className="text-sm font-semibold ms-2"
            >
              &#10005;
            </button>
          </div>
        );
      })}
      {tags.map((item, index) => {
        return (
          <div
            key={item.value}
            className="px-3 flex-shrink-0 mx-2 gap-2 py-2 rounded-lg text-[#000000] bg-[#E5E7EB]"
          >
            {FORMAT_VISIT_TAGS[item.label]}
            <button
              onClick={() => handleRemoveFilter("tags", index)}
              className="text-sm font-semibold ms-2"
            >
              &#10005;
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default memo(AppliedFilters);
