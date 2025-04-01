import React, { createContext, useState } from "react";
import DoctorHeader from "./header/DoctorHeader";
import PatientDetails from "./patient-details/PatientDetails";
import ReferalModal from "./ReferalModal";
import PatientHealthRecord from "./patient-details/patient-health-records/PatientHealthRecord";
import useGetAllRecord from "./patient-details/patient-health-records/hooks/useGetAllRecord";

export const HealthRecordPagination = createContext();
const Doctor = () => {
  const [referalModal, setReferalModal] = useState(false);

  const [vaccinationPage, setVaccinationPage] = useState(1);
  const [screeningPage, setScreeningPage] = useState(1);
  const [vitalPage, setVitalPage] = useState(1);
  const [prescriptionPage, setPrescriptionPage] = useState(1);
  const [pregnancyOverviewPage, setPregnancyOverviewPage] = useState(1);
  const [antenatalCarePage, setAntenatalCarePage] = useState(1);
  const [careOfBabyPage, setCareOfBabyPage] = useState(1);
  const [postNatalCarePage, setPostNatalCarePage] = useState(1);

  const [activePatientDetailsTab, setActivePatientDetailsTab] =
    useState("health_records");

  const { patientRecord, isRecordLoading, getAllPatientRecord } =
    useGetAllRecord({
      vaccinationPage,
      vitalPage,
      screeningPage,
      pregnancyOverviewPage,
      prescriptionPage,
      antenatalCarePage,
      postNatalCarePage,
      careOfBabyPage,
    });
  const { vitalForms = {} } = patientRecord || {};

  return (
    <HealthRecordPagination.Provider
      value={{
        vaccinationPage,
        setVaccinationPage,
        screeningPage,
        setScreeningPage,
        vitalPage,
        setVitalPage,
        prescriptionPage,
        setPrescriptionPage,
        pregnancyOverviewPage,
        setPregnancyOverviewPage,
        antenatalCarePage,
        setAntenatalCarePage,
        careOfBabyPage,
        setCareOfBabyPage,
        postNatalCarePage,
        setPostNatalCarePage,
      }}
    >
      <div className="w-full relative">
        <div className="w-full shadow border-b border-[#D8E3FF] bg-white fixed">
          <DoctorHeader setReferalModal={setReferalModal} />
          <PatientDetails
            activePatientDetailsTab={activePatientDetailsTab}
            setActivePatientDetailsTab={setActivePatientDetailsTab}
            vitalForms={vitalForms}
            isWellDataLoading={isRecordLoading}
          />
        </div>
        <div className="w-full">
          <div style={{ paddingTop: "47px" }} className="flex w-full">
            <div
              className="w-full"
              // className={`${activeTab === null ? "w-[96%]" : "w-[71%]"} mr-auto`}
            >
              <div className="w-full mt-56 p-8">
                {activePatientDetailsTab === "health_records" && (
                  <PatientHealthRecord
                    patientRecord={patientRecord}
                    getAllPatientRecord={getAllPatientRecord}
                    isRecordLoading={isRecordLoading}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {referalModal ? (
          <ReferalModal
            referalModal={referalModal}
            setReferalModal={setReferalModal}
          />
        ) : null}
      </div>
    </HealthRecordPagination.Provider>
  );
};

export default Doctor;
