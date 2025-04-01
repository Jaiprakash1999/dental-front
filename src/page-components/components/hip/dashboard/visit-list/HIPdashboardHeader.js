import React, { useContext } from "react";
import SearchInput from "../../../../common-components/SearchInput";
import TertiaryButton from "../../../../common-components/Buttons/TertiaryButton";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { filterListContext } from "./HIPdashboard";
import AppliedFilters from "./AppliedFilters";
import FilterModal from "./FilterModal";
import PrimaryButton from "../../../../common-components/Buttons/PrimaryButton";
import { setDashboardDrawer } from "../../../../../redux-store/slice/checkInDrawerSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const HIPdashboardHeader = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const filterState = useContext(filterListContext);

  const {
    selectedFilters,
    setIsFilterModalOpen,
    isFilterModalOpen,
    searchInput,
    handleInputChange,
    modalRef,
  } = filterState || {};

  const { visitStatus = [], tags = [], gender = [] } = selectedFilters || {};

  const onAddPatient = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      setDashboardDrawer({
        checkInDrawer: false,
        userDrawer: true,
        skipABHA: false,
        createABHAbyAadhaar: false,
        createABHAaddress: false,
      })
    );
  };

  const onBookAppointment = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      setDashboardDrawer({
        checkInDrawer: true,
        userDrawer: false,
        skipABHA: false,
        createABHAbyAadhaar: false,
        createABHAaddress: false,
      })
    );
  };

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex w-1/2 items-center">
        <div className="w-[50%] me-3">
          <SearchInput inputValue={searchInput} onChange={handleInputChange} />
        </div>
        {visitStatus.length > 0 || tags.length > 0 || gender.length > 0 ? (
          <div className="flex items-center w-[73%]">
            <div className="text-[#6B7280] flex-shrink-0 font-medium">
              {t("Applied Filters")}:
            </div>
            <div className="w-[93%] overflow-x-auto">
              <AppliedFilters />
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex w-1/2 gap-3 justify-end ">
        <div>
          <TertiaryButton
            buttonName={t("Filters")}
            icon={faFilter}
            showIcon
            onClick={() => setIsFilterModalOpen((prev) => !prev)}
          />
          {isFilterModalOpen && (
            <div className="" ref={modalRef}>
              <FilterModal />
            </div>
          )}
        </div>
        <PrimaryButton
          onClick={(e) => {
            onBookAppointment(e);
          }}
          showIcon={true}
          buttonName={t("Book Appointment")}
        />
        <PrimaryButton
          onClick={(e) => {
            onAddPatient(e);
          }}
          showIcon={true}
          buttonName={t("Add Patient")}
        />
      </div>
    </div>
  );
};

export default HIPdashboardHeader;
