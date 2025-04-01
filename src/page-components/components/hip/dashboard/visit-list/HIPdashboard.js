import React, { createContext, useEffect, useRef, useState } from "react";
import HIPdashboardHeader from "./HIPdashboardHeader";
import Pagination from "../../../../common-components/Pagination";
import { useSelector } from "react-redux";
import FilteredList from "./FilteredList";
export const filterListContext = createContext();

const HIPdashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const modalRef = useRef();
  const [selectedFilters, setSelectedFilters] = useState({
    visitType: [],
    gender: [],
    serviceType: [],
    department: [],
    visitStatus: [],
    tags: [],
  });

  const allPatientVisit = useSelector((state) => state.patientVisitList);
  const { visits = [], total = 0 } = allPatientVisit || {};

  const handleInputChange = (e) => {
    const { value } = e.target || {};
    setSearchInput(value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target || {};
    setSelectedFilters((prev) => ({ ...prev, [name]: value }));
  };
  const handleRemoveFilter = (name, index) => {
    const newOption = selectedFilters[name].filter((_, idx) => index !== idx);
    setSelectedFilters((prev) => ({ ...prev, [name]: newOption }));
  };

  const handleClickOutSide = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsFilterModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [isFilterModalOpen]);

  return (
    <filterListContext.Provider
      value={{
        searchInput,
        handleInputChange,
        currentPage,
        setIsFilterModalOpen,
        isFilterModalOpen,
        selectedFilters,
        handleFilterChange,
        handleRemoveFilter,
        modalRef,
      }}
    >
      <div className="text-sm h-[93vh] overflow-y-scroll relative w-full">
        <div className="w-full border-b px-3 py-2">
          <HIPdashboardHeader />
        </div>
        <div className="w-full">
          <FilteredList patientVisitList={visits} />
        </div>
        <div className="py-3 px-3 shadow border-t absolute  w-full bg-white">
          <Pagination
            totalRecords={total}
            countsPerPage={10}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </filterListContext.Provider>
  );
};

export default HIPdashboard;
