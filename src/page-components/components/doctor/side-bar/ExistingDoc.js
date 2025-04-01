import React from "react";
import SearchInput from "../../../common-components/SearchInput";

const ExistingDoc = () => {
  return (
    <div>
      <div className="w-full my-3 text-sm">
        <div className="mb-2 text-[#111928]">Search</div>
        <SearchInput placeholder="search nots and documents" />
      </div>
    </div>
  );
};

export default ExistingDoc;
