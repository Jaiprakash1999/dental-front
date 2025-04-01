import React, { useState } from "react";
// import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "leaflet/dist/leaflet.css";
import Filter from "./Filter";
import AddressMapView from "./AddressMapView";
import PatientStats from "./PatientStats";
import PatientUpcomingAppointment from "./PatientUpcomingAppointment";
import useGetVisitKPI from "./hooks/useGetVisitKPI";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../../common-components/Buttons/PrimaryButton";

const MmuAdmin = () => {
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState({
    state: "",
    district: "",
    tehshil: "",
    startDate: "",
    endDate: "",
    mandalName: "",
    gramPanchayatName: "",
    habitatName: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target || {};
    setSelectedFilter((prev) => ({ ...prev, [name]: value }));
  };
  const {
    isVisitKPIloading,
    visitKPIdata = {},
    getVisitKPI,
  } = useGetVisitKPI({
    selectedFilter,
  });
  const { coOrdinates = [], pregnantLadies = {} } = visitKPIdata || {};

  // const onClearAll = () => {
  //   setSelectedFilter({
  //     state: "",
  //     district: "",
  //     tehshil: "",
  //     startDate: "",
  //     endDate: "",
  //     mandalName: "",
  //     gramPanchyatName: "",
  //     habitatName: "",
  //   });
  // };

  return (
    <div className="text-sm py-3 px-5 text-primary">
      <ToastContainer />
      <Filter
        handleFilterChange={handleFilterChange}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <div className="flex justify-end my-2">
        <div className="flex items-center gap-5">
          {/* <AlertButton
            buttonName={t("Clear all filter")}
            onClick={onClearAll}
          /> */}
          <PrimaryButton
            buttonName={t("Apply")}
            onClick={() => getVisitKPI()}
            disabled={isVisitKPIloading}
          />
        </div>
      </div>
      <hr></hr>
      {/* <div className="text-primary gap-2 mt-4 flex items-center">
        {selectedFilter.state === "" ? null : (
          <span>{selectedFilter.state}</span>
        )}
        {selectedFilter.district === "" ? null : (
          <span className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faAngleRight} /> {selectedFilter.district}
          </span>
        )}
        {selectedFilter.tehshil === "" ? null : (
          <span className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faAngleRight} /> {selectedFilter.tehshil}
          </span>
        )}

        {selectedFilter.timePeriod === "" ? null : (
          <span className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faAngleRight} /> {selectedFilter.timePeriod}
          </span>
        )}
      </div> */}
      <div className="grid grid-cols-2 gap-5 my-5">
        <AddressMapView
          visitKPIdata={coOrdinates}
          isVisitKPIloading={isVisitKPIloading}
        />
        <PatientStats
          visitKPIdata={visitKPIdata}
          isVisitKPIloading={isVisitKPIloading}
        />
      </div>
      <div className="mb-5 text-base">{t("Pregnant Women Follow Up List")}</div>
      <PatientUpcomingAppointment
        pregnantLadies={pregnantLadies}
        isVisitKPIloading={isVisitKPIloading}
      />
    </div>
  );
};

export default MmuAdmin;
