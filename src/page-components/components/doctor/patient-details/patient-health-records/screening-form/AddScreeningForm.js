import React, { useState } from "react";
import TertiaryButton from "../../../../../common-components/Buttons/TertiaryButton";
import PrimaryButton from "../../../../../common-components/Buttons/PrimaryButton";
import Modal from "../../../../../common-components/Modal";
import { formatArray, formatLabTest } from "../../../../../utils/formateArray";
import { useTranslation } from "react-i18next";
import useAddScreeingForm from "../hooks/useAddScreeingForm";
import useGetAllDiagnosis from "../../../create-prescription/hooks/useGetAllDiagnosis";
import SearchSelectFromAPI from "../../../../../common-components/SearchSelectFromAPI";
import useGetLabTest from "./hooks/useGetLabTest";
import MultiSelectLabTestWithAPIsearch from "../../../../../common-components/MultiSelectLabTestWithAPIsearch";

const AddScreeningForm = ({
  activeHealthTab = "",
  setActiveHealthTab = () => {},
  getAllPatientRecord = () => {},
  selectedRecord = {},
  setSelectedRecord = () => {},
  isEditable = true,
  setIsEditable = () => {},
}) => {
  const { t } = useTranslation();

  const { differentialDiagnosis, isdiagnosisLoading, getAllDiagnosis } =
    useGetAllDiagnosis();

  const {
    diagnosis: selectedDiagnosis = "",
    notes = "",
    labInvestigations: selectedLabInvestigation = [],
  } = selectedRecord || {};

  const [screeningFormInfo, setScreeningFormInfo] = useState({
    notes: notes,
    labTest: selectedLabInvestigation,
    diagnosis: selectedDiagnosis,
  });

  const handleChange = (e) => {
    const { name, value } = e.target || {};
    setScreeningFormInfo((prev) => ({ ...prev, [name]: value }));
  };

  const { diagnosis } = screeningFormInfo || {};

  const { labInvestigations, isLabInvestigationLoading, getAllInvestigations } =
    useGetLabTest({ diagnosis });

  const onReset = () => {
    setScreeningFormInfo({
      diagnosis: selectedDiagnosis,
      labTest: selectedLabInvestigation,
    });
  };

  const { isAddingScreeing, onSubmitScreeningForm, onUpdateScreeningForm } =
    useAddScreeingForm({
      screeningFormInfo,
      getAllPatientRecord,
      setActiveHealthTab,
    });

  const handleClose = () => {
    setActiveHealthTab("");
    setSelectedRecord({});
    setIsEditable(true);
  };

  return (
    <div className="text-sm text-[#2D2E33">
      <Modal
        showModal={activeHealthTab === "screening_form" ? true : false}
        onClose={handleClose}
        modalHeight="min-h-1/2"
        modalWidth="w-[70%]"
      >
        <div className="py-4 px-6">
          <h1 className="text-[#2D2E33 text-base fle text-center  font-medium">
            {t("Screening Form")}
          </h1>
          <div className="flex py-4">
            <div className="w-full">
              <div className="mb-5">
                <div className=" mt-2 justify-between flex-wrap">
                  <div className="my-2">
                    <div className="text-[#5E6066] mb-2.5">
                      {t("Suspected Diagnosis")}*
                    </div>
                    <div className="flex">
                      <SearchSelectFromAPI
                        disabled={!isEditable}
                        getData={getAllDiagnosis}
                        options={formatArray(differentialDiagnosis)}
                        isLoading={isdiagnosisLoading}
                        name="diagnosis"
                        onChange={handleChange}
                        defaultOptions={{ label: diagnosis, value: diagnosis }}
                        allowPressEnter={true}
                        placeholder={t("Type")}
                        className="focus:outline-none disabled:text-secondary text-[#2D2E33] font-normal disabled:bg-[#F9FAFB] placeholder:font-normal rounded-lg ps-4 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2 w-full focus:border-[#2D2E33]"
                      />
                    </div>
                  </div>
                  <div className="my-5">
                    <div className="text-[#5E6066] mb-2.5">
                      {t("Add Lab Investigation")}
                    </div>
                    <div className="">
                      <MultiSelectLabTestWithAPIsearch
                        getData={getAllInvestigations}
                        options={formatLabTest(labInvestigations)}
                        isLoading={isLabInvestigationLoading}
                        name="labTest"
                        isEditable={isEditable}
                        onChange={handleChange}
                        textColor="primary"
                        disabled={!isEditable}
                        buttonColor="#C81E1E"
                        multiple
                        defaultOptions={screeningFormInfo?.labTest}
                        className="focus:outline-none rounded-lg ps-2 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2 w-full focus:border-[#2D2E33]"
                      />
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="mb-2">{t("Notes")}</div>
                    <textarea
                      name="notes"
                      value={screeningFormInfo.notes}
                      onChange={handleChange}
                      placeholder={t("Notes")}
                      className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-5 justify-end">
                <TertiaryButton
                  buttonName={t("Reset")}
                  width="w-fit"
                  onClick={onReset}
                />
                <PrimaryButton
                  buttonName={t("Submit")}
                  width="w-fit"
                  onClick={
                    !isEditable
                      ? () => onUpdateScreeningForm(selectedRecord?.id)
                      : () => onSubmitScreeningForm()
                  }
                  disabled={
                    isAddingScreeing || screeningFormInfo.diagnosis === ""
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddScreeningForm;
