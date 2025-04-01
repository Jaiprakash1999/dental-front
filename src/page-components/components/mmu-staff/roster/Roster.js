import React, { useState } from "react";
import MMUstaffList from "./MMUstaffList";
import PatientListOfMMUhead from "./PatientListOfMMUhead";
import useGetPatientListOfMMUhead from "./hooks/useGetPatientListOfMMUhead";
import useDownLoadCSVfile from "./hooks/useDownLoadCSVfile";

const Roster = () => {
  const [activeComponent, setActiveComponent] = useState("staff");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedHeadID, setSelectedHeadID] = useState(null);
  const { patientList, isPatientListLoading } = useGetPatientListOfMMUhead({
    currentPage,
    selectedHeadID,
  });
  const { isCSVloading, onDownloadCSVfileOfPatient } = useDownLoadCSVfile({
    selectedHeadID,
    currentPage,
  });

  const [selectedItem, setSelectedItem] = useState({});

  return (
    <div>
      {activeComponent === "staff" && (
        <MMUstaffList
          setActiveComponent={setActiveComponent}
          setSelectedHeadID={setSelectedHeadID}
          setSelectedItem={setSelectedItem}
        />
      )}
      {activeComponent === "patient_list" && (
        <PatientListOfMMUhead
          setActiveComponent={setActiveComponent}
          patientList={patientList}
          isPatientListLoading={isPatientListLoading}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isCSVloading={isCSVloading}
          onDownloadCSVfileOfPatient={onDownloadCSVfileOfPatient}
        />
      )}
    </div>
  );
};

export default Roster;
