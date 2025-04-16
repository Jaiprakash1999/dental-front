import React, { useState } from "react";
import AddWellnessRecord from "./wellness-record/AddWellnessRecord";
import WellnessRecords from "./wellness-record/WellnessRecords";
import PrescriptionRecord from "./prescription/PrescriptionRecord";
import Skeleton from "react-loading-skeleton";
import HealthRecordButton from "./HealthRecordButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import SelectedPrescription from "../../patient-details/patient-health-records/prescription/SelectedPrescription";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import ScreeningRecord from "./screening-form/ScreeningRecord";
import VaccinationRecord from "./vaccination-form/VaccinationRecord";
import BaseLinePergnancy from "../../patient-details/patient-health-records/base-line-and-pregnancy-overview/BaseLinePergnancy";
import AddScreeningForm from "./screening-form/AddScreeningForm";
import AddVaccineForm from "./vaccination-form/AddVaccineForm";
import useGetSelectedVital from "./wellness-record/hooks/useGetSelectedVital";
import useGetSelectedPresciption from "./prescription/hooks/useGetSelectedPresciption";
import useGetSelectedScreening from "./screening-form/hooks/useGetSelectedScreening";
import useGetSelectedVaccination from "./vaccination-form/hooks/useGetSelectedVaccination";
import useGetSelectedDentalRecord from "./dental-form/hooks/useGetSelectedDentalRecord";
import useGetSelectedBaseLine from "./base-line-and-pregnancy-overview/hooks/useGetSelectedBaseLine";
import AddBaseLinePergnancy from "./base-line-and-pregnancy-overview/AddBaseLinePergnancy";
import AddAntenatalPeriodicCare from "./antenatal-care/AddAntenatalPeriodicCare";
import AntenatalCare from "./antenatal-care/AntenatalCare";
import useGetSelectedAntenatalCare from "./antenatal-care/hooks/useGetSelectedAntenatalCare";
import AddPostNatalCareRecord from "./post-natal-care/AddPostNatalCareRecord";
import useGetSelectedPostNatalCare from "./post-natal-care/hooks/useGetSelectedPostNatalCare";
import useGetSelectedBabyCare from "./care-of-baby/hooks/useGetSelectedBabyCare";
import useGetUploadedRecord from "./upload-files/hooks/useGetUploadedRecord";
import AddBabyCareInfo from "./care-of-baby/AddBabyCareInfo";
import PostNatalCare from "./post-natal-care/PostNatalCare";
import CareOfBaby from "./care-of-baby/CareOfBaby";
import AddDentalForm from "./dental-form/AddDentalForm";
import DentalRecord from "./dental-form/DentalRecord";
import AddUploadRecord from "./upload-files/AddUploadRecord";
import UploadRecord from "./upload-files/UploadRecord";

const PatientHealthRecord = ({
  patientRecord = {},
  getAllPatientRecord = () => {},
  isRecordLoading = false,
}) => {
  const { t } = useTranslation();
  const [isCareDropDown, setIsCareDropDown] = useState(false);
  const [activeHealthTab, setActiveHealthTab] = useState("");
  const [selectedRecord, setSelectedRecord] = useState({});
  const [isEditable, setIsEditable] = useState(true);

  const { getSelectedVital } = useGetSelectedVital();
  const { getSelectedPrescription } = useGetSelectedPresciption();
  const { getSelectedScreening } = useGetSelectedScreening();
  const { getSelectedVaccine } = useGetSelectedVaccination();
  const { getSelectedBaseLine } = useGetSelectedBaseLine();
  const { getSelectedAntenatal } = useGetSelectedAntenatalCare();
  const { getSelectedPostNatalCare } = useGetSelectedPostNatalCare();
  const { getSelectedBabyCare } = useGetSelectedBabyCare();
  const { getSelectedDental } = useGetSelectedDentalRecord();
  const { getSelectedDocument } = useGetUploadedRecord();

  const {
    vaccinationForms = {},
    screeningForms = {},
    prescriptions = {},
    vitalForms = {},
    pregnancyOverviews = {},
    antenatalCares = {},
    postNatalCares = {},
    careOfBabyForms = {},
    dentalForms = {},
    uploadDocument = {},
  } = patientRecord || {};

  const MODAL_COMPONENT_MAPPING = {
    vitals_record: AddWellnessRecord,
    screening_form: AddScreeningForm,
    vaccination_form: AddVaccineForm,
    prescription: SelectedPrescription,
    pergnancy_overview: AddBaseLinePergnancy,
    antenatal_periodic_care: AddAntenatalPeriodicCare,
    post_natal_care: AddPostNatalCareRecord,
    baby_care: AddBabyCareInfo,
    dental_form: AddDentalForm,
    upload_document: AddUploadRecord,
  };

  const GET_SELECTED_DATA_FUNCTION = {
    vitals_record: getSelectedVital,
    screening_form: getSelectedScreening,
    vaccination_form: getSelectedVaccine,
    prescription: getSelectedPrescription,
    pergnancy_overview: getSelectedBaseLine,
    antenatal_periodic_care: getSelectedAntenatal,
    post_natal_care: getSelectedPostNatalCare,
    baby_care: getSelectedBabyCare,
    dental_form: getSelectedDental,
    upload_document: getSelectedDocument,
  };

  const MODAL_COMPONENT_PROPS_MAPPING = {
    vitals_record: { getAllPatientRecord },
    screening_form: { getAllPatientRecord },
    vaccination_form: { getAllPatientRecord },
    pergnancy_overview: { getAllPatientRecord },
    antenatal_periodic_care: { getAllPatientRecord },
    post_natal_care: { getAllPatientRecord },
    baby_care: { getAllPatientRecord },
    dental_form: { getAllPatientRecord },
    upload_document: { getAllPatientRecord },
  };

  const SubmitRecordComponent =
    MODAL_COMPONENT_MAPPING[activeHealthTab] || null;

  const submitRecordComponentProps =
    MODAL_COMPONENT_PROPS_MAPPING[activeHealthTab] || null;

  const handleSelectedData = async (id, recordName) => {
    const data = await GET_SELECTED_DATA_FUNCTION[recordName](id);
    setSelectedRecord(data);
    setActiveHealthTab(recordName);
    setIsEditable(false);
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex mb-3 justify-between items-center">
        <div className="text-[#2D2E33] font-medium">{t("Health Records")}</div>
        <div className="flex gap-5 items-center">
          <div>
            <button
              onClick={() => setIsCareDropDown((prev) => !prev)}
              className="active:bg-[#1C64F2] px-4 w-fit gap-3 h-10 disabled:border-[#C6C7C9] flex items-center hover:border-2 hover:border-[#4C6AF7] border justify-center disabled:border disabled:bg-[#F9FAFB] disabled:text-[#A2A3A7]  border-[#4C6AF7] item-center py-2 rounded-lg text-sm text-[#4C6AF7]"
            >
              <span>{t("Add New Document")}</span>
              <span>
                <FontAwesomeIcon
                  icon={isCareDropDown ? faAngleUp : faAngleDown}
                />
              </span>
            </button>

            {isCareDropDown && (
              <div className="absolute">
                <HealthRecordButton setActiveHealthTab={setActiveHealthTab} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-[#F9FAFB] text-[#697789] py-3 rounded px-5 grid grid-cols-5">
        <div>{t("Record Type")}</div>
        <div>{t("S.NO.")}</div>
        <div>{t("Record Name")}</div>
        <div>{t("Created BY")}</div>
        <div>{t("Created ON")}</div>
      </div>
      <div className="text-sm">
        <div>
          {isRecordLoading ? (
            <Skeleton width={100} />
          ) : (
            <div>
              {vitalForms.forms?.length > 0 && (
                <WellnessRecords
                  vitalForms={vitalForms}
                  isRecordLoading={isRecordLoading}
                  handleSelectedData={handleSelectedData}
                />
              )}
              {prescriptions.forms?.length > 0 && (
                <PrescriptionRecord
                  prescriptions={prescriptions}
                  isRecordLoading={isRecordLoading}
                  handleSelectedData={handleSelectedData}
                />
              )}
              {screeningForms.forms?.length > 0 && (
                <ScreeningRecord
                  screeningForms={screeningForms}
                  isScreeningDataLoading={isRecordLoading}
                  handleSelectedData={handleSelectedData}
                />
              )}
              {vaccinationForms.forms?.length > 0 && (
                <VaccinationRecord
                  vaccinationForms={vaccinationForms}
                  isRecordLoading={isRecordLoading}
                  handleSelectedData={handleSelectedData}
                />
              )}

              {pregnancyOverviews.forms?.length > 0 && (
                <BaseLinePergnancy
                  pregnancyOverviews={pregnancyOverviews}
                  isRecordLoading={isRecordLoading}
                  handleSelectedData={handleSelectedData}
                />
              )}
              {antenatalCares.forms?.length > 0 && (
                <AntenatalCare
                  antenatalCares={antenatalCares}
                  isRecordLoading={isRecordLoading}
                  handleSelectedData={handleSelectedData}
                />
              )}

              {postNatalCares.forms?.length > 0 && (
                <PostNatalCare
                  postNatalCares={postNatalCares}
                  isRecordLoading={isRecordLoading}
                  handleSelectedData={handleSelectedData}
                />
              )}

              {careOfBabyForms.forms?.length > 0 && (
                <CareOfBaby
                  careOfBabyForms={careOfBabyForms}
                  isRecordLoading={isRecordLoading}
                  handleSelectedData={handleSelectedData}
                />
              )}
              {dentalForms.forms?.length > 0 && (
                <DentalRecord
                  dentalForms={dentalForms}
                  isDentaFormLoading={isRecordLoading}
                  handleSelectedData={handleSelectedData}
                />
              )}
              {uploadDocument.forms?.length > 0 && (
                <UploadRecord
                  uploadDocument={uploadDocument}
                  isDentaFormLoading={isRecordLoading}
                  handleSelectedData={handleSelectedData}
                />
              )}
            </div>
          )}
        </div>

        {SubmitRecordComponent ? (
          <SubmitRecordComponent
            activeHealthTab={activeHealthTab}
            setActiveHealthTab={setActiveHealthTab}
            selectedRecord={selectedRecord}
            setSelectedRecord={setSelectedRecord}
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            {...submitRecordComponentProps}
          />
        ) : null}
      </div>
    </div>
  );
};

export default PatientHealthRecord;
