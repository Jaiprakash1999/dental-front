import React, { useRef, useState } from "react";
import TertiaryButton from "../../../../../common-components/Buttons/TertiaryButton";
import PrimaryButton from "../../../../../common-components/Buttons/PrimaryButton";
import Modal from "../../../../../common-components/Modal";
import { formatArray, formatLabTest } from "../../../../../utils/formateArray";
import { useTranslation } from "react-i18next";
import useAddScreeingForm from "../hooks/useAddScreeingForm";
import useGetAllDiagnosis from "../../../create-prescription/hooks/useGetAllDiagnosis";
import SearchSelectFromAPI from "../../../../../common-components/SearchSelectFromAPI";
import useGetLabTest from "../screening-form/hooks/useGetLabTest";
import TeethMap from "./TeethMap";
import SecondaryButton from "../../../../../common-components/Buttons/SecondaryButton";
import FileUpload from "../../../../../../images/file_upload.svg";
import { BsFiletypeXls } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { CiCirclePlus } from "react-icons/ci";
import useAddDentalForm from "./hooks/useAddDentalForm";

const AddDentalForm = ({
  activeHealthTab = "",
  setActiveHealthTab = () => {},
  getAllPatientRecord = () => {},
  selectedRecord = {},
  setSelectedRecord = () => {},
  isEditable = true,
  setIsEditable = () => {},
}) => {
  const { t } = useTranslation();

  const inputFileRef = useRef(null);

  const handleClick = () => {
    inputFileRef.current.click();
  };

  const { differentialDiagnosis, isdiagnosisLoading, getAllDiagnosis } =
    useGetAllDiagnosis();

  // const {
  //   diagnosis: selectedDiagnosis = "",
  //   notes = "",
  //   typeOfTeeth,
  //   labInvestigations: selectedLabInvestigation = [],
  // } = selectedRecord || {};

  const [dentalFormInfo, setDentalFormInfo] = useState(
    selectedRecord.id === undefined
      ? {
          diagnosis: "",
          typeOfTeeth: "",
          teethData: [
            {
              treatmentProcedure: "",
              teethsInvolved: [],
              document: [],
              recordSteps: [
                { stepName: "", preStepInstructions: "", postStepCarePlan: "" },
              ],
            },
          ],
        }
      : selectedRecord
  );

  const addRecordSteps = () => {
    setDentalFormInfo((prev) => ({
      ...prev,
      teethData: prev.teethData.map((teeth) => ({
        ...teeth,
        recordSteps: [
          ...teeth.recordSteps,
          { stepName: "", preStepInstructions: "", postStepCarePlan: "" },
        ],
      })),
    }));
  };

  const addProcedure = () => {
    setDentalFormInfo((prev) => ({
      ...prev,
      teethData: [
        ...prev.teethData,
        {
          treatmentProcedure: "",
          teethsInvolved: [],
          document: [],
          recordSteps: [
            { stepName: "", preStepInstructions: "", postStepCarePlan: "" },
          ],
        },
      ],
    }));
  };
  const [isTeethMapOpen, setIsTeethMapOpen] = useState(false);

  const handleChange1 = (e) => {
    const { name, value, type, files } = e.target || {};
    if (type === "file" && name === "document") {
      setDentalFormInfo((prev) => ({
        ...prev,
        document: [...prev.document, ...Array.from(files)],
      }));
    } else if (Array.isArray(dentalFormInfo[name]) && name === "teethMapData") {
      if (dentalFormInfo[name].includes(value)) {
        const filterId = dentalFormInfo[name].filter(
          (filterValue) => filterValue !== value
        );
        setDentalFormInfo((prev) => ({ ...prev, [name]: filterId }));
      } else {
        setDentalFormInfo((prev) => ({
          ...prev,
          [name]: [...prev[name], value],
        }));
      }
    } else {
      setDentalFormInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleChange = (e, index, subIndex, field, subField) => {
    const { name, value, type, checked, files } = e.target || {};

    setDentalFormInfo((prev) => {
      if (name === "teethsInvolved") {
        const updatedTeethData = [...prev.teethData]; // Copy array
        const selectedTeeth = updatedTeethData[index].teethsInvolved; // Get correct `teethsInvolved` array

        if (selectedTeeth.includes(value)) {
          // Remove tooth if already selected
          updatedTeethData[index].teethsInvolved = selectedTeeth.filter(
            (tooth) => tooth !== value
          );
        } else {
          // Add tooth if not selected
          updatedTeethData[index].teethsInvolved = [...selectedTeeth, value];
        }

        return { ...prev, teethData: updatedTeethData };
      }
      if (name === "document") {
        const updatedTeethData = [...prev.teethData];
        const selectedDocument = updatedTeethData[index].document;
        updatedTeethData[index].document = [
          ...selectedDocument,
          ...Array.from(files),
        ];
        return { ...prev, teethData: updatedTeethData };
      }
      if (name === "treatmentProcedure") {
        const updatedTeethData = [...prev.teethData];
        updatedTeethData[index] = {
          ...updatedTeethData[index],
          treatmentProcedure: value,
        };
        return { ...prev, teethData: updatedTeethData };
      }

      if (field === "teethData" && subField === "recordSteps") {
        const updatedTeethData = [...prev.teethData];

        // Ensure the index and subIndex exist
        if (
          !updatedTeethData[index] ||
          !updatedTeethData[index].recordSteps[subIndex]
        ) {
          return prev;
        }

        const updatedRecordSteps = [...updatedTeethData[index].recordSteps];

        updatedRecordSteps[subIndex] = {
          ...updatedRecordSteps[subIndex],
          [name]: value,
        };

        updatedTeethData[index] = {
          ...updatedTeethData[index],
          recordSteps: updatedRecordSteps,
        };

        return { ...prev, teethData: updatedTeethData };
      }

      if (type === "checkbox") {
        if (Array.isArray(prev[name])) {
          return {
            ...prev,
            [name]: checked
              ? [...prev[name], value]
              : prev[name].filter((v) => v !== value),
          };
        } else {
          return {
            ...prev,
            [name]: prev[name] === value ? null : value,
          };
        }
      }
      if (name in prev) {
        return { ...prev, [name]: value };
      }

      return prev; //
    });
  };

  const dentalReset = (index) => {
    setDentalFormInfo((prev) => {
      const updatedTeethData = [...prev.teethData];
      updatedTeethData[index] = {
        ...updatedTeethData[index],
        teethsInvolved: [],
      };
      return { ...prev, teethData: updatedTeethData };
    });
  };

  const handleRemoveTeeth = (teethDataIndex, selectedIndex) => {
    setDentalFormInfo((prev) => {
      const updatedTeethData = [...prev.teethData];
      updatedTeethData[teethDataIndex] = {
        ...updatedTeethData[teethDataIndex],
        teethsInvolved: updatedTeethData[teethDataIndex].teethsInvolved.filter(
          (_, index) => index !== selectedIndex
        ),
      };
      return { ...prev, teethData: updatedTeethData };
    });
  };

  const handleRemoveFile = (teethDataIndex, selectedIndex) => {
    setDentalFormInfo((prev) => {
      const updatedTeethData = [...dentalFormInfo.teethData];
      updatedTeethData[teethDataIndex] = {
        ...updatedTeethData[teethDataIndex],
        document: updatedTeethData[teethDataIndex].document.filter(
          (_, index) => index !== selectedIndex
        ),
      };
      return { ...prev, teethData: updatedTeethData };
    });
  };

  const { diagnosis } = dentalFormInfo || {};

  const { labInvestigations, isLabInvestigationLoading, getAllInvestigations } =
    useGetLabTest({ diagnosis });

  const onReset = () => {
    setDentalFormInfo(
      selectedRecord.id === undefined
        ? {
            diagnosis: "",
            typeOfTeeth: "",
            teethData: [
              {
                treatmentProcedure: "",
                teethsInvolved: [],
                document: [],
                recordSteps: [
                  {
                    stepName: "",
                    preStepInstructions: "",
                    postStepCarePlan: "",
                  },
                ],
              },
            ],
          }
        : selectedRecord
    );
  };

  const { isAddingDentalForm, onSubmittingDentalForm, onUpdateDentalForm } =
    useAddDentalForm({
      dentalFormInfo,
      getAllPatientRecord,
      setActiveHealthTab,
    });

  const handleClose = () => {
    setActiveHealthTab("");
    setSelectedRecord({});
    setIsEditable(true);
  };

  console.log(dentalFormInfo, "dentalFormInfo");

  return (
    <div className="text-sm text-[#2D2E33">
      <Modal
        showModal={activeHealthTab === "dental_form" ? true : false}
        onClose={handleClose}
        modalHeight="min-h-1/2 max-h-[80%]"
        modalWidth="w-[70%]"
      >
        <div className="py-4 px-6">
          <h1 className="text-[#2D2E33 text-base fle text-center  font-medium">
            {t("Treatment Plan")}
          </h1>
          <div className="flex py-4">
            <div className="w-full">
              <div className="mb-5">
                <div className="grid items-center mb-5 gap-5 grid-cols-2">
                  <div className="my-2">
                    <div className="text-[#5E6066] mb-2.5">
                      {t("Diagnosis")}*
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
                  <div className="my-2">
                    <div className="text-[#5E6066] mb-2.5">
                      {t("Type of Teeth")}*
                    </div>
                    <div className="flex items-center gap-10 mt-1 border-[#D1D5DB]">
                      <label className="flex items-center gap-2">
                        <input
                          name="typeOfTeeth"
                          type="checkbox"
                          onChange={handleChange}
                          value="Permanent"
                          checked={dentalFormInfo.typeOfTeeth === "Permanent"}
                        />
                        {t("Permanent")}
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          name="typeOfTeeth"
                          type="checkbox"
                          onChange={handleChange}
                          value="Primary"
                          checked={dentalFormInfo.typeOfTeeth === "Primary"}
                        />
                        {t("Primary")}
                      </label>
                    </div>
                  </div>
                </div>
                <hr></hr>
                {dentalFormInfo.teethData.map((procedure, index) => {
                  return (
                    <div className="border-b pb-5 last:border-none">
                      <div className="grid mt-5 grid-cols-3 gap-5">
                        <div>
                          <div className="mb-1">
                            {t("Treatment/ Procedure")}
                          </div>
                          <input
                            type="text"
                            name="treatmentProcedure"
                            value={procedure.treatmentProcedure}
                            onChange={(e) =>
                              handleChange(
                                e,
                                index,
                                undefined,
                                "teethData",
                                "treatmentProcedure"
                              )
                            }
                            placeholder={t("Treatment/ Procedure")}
                            className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                          />
                        </div>

                        <div>
                          <div>
                            <div className="mb-1">{t("Teeths Involved")}</div>
                            <input
                              type="text"
                              readOnly
                              onClick={() => setIsTeethMapOpen(true)}
                              placeholder={t("Select Teeth (s)")}
                              className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                            />
                          </div>
                          {procedure.teethsInvolved.map((teeth, subIndex) => {
                            return (
                              <div
                                key={subIndex}
                                className="border mt-2 flex justify-between items-center w-full focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                              >
                                <div>{teeth}</div>
                                <button
                                  onClick={() =>
                                    handleRemoveTeeth(index, subIndex)
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    color="#C81E1E"
                                  />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                        <div>
                          <div className="">
                            <input
                              type="file"
                              name="document"
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  index,
                                  undefined,
                                  "teethData",
                                  "document"
                                )
                              }
                              ref={inputFileRef}
                              className=" hidden"
                            />

                            <div className="border-dashed h-fit  bottom-0 border gap-3 flex flex-col rounded-lg py-3 px-6 bg-[#F9FAFB] border-[#C6C7C9] justify-center items-center">
                              <div className="flex gap-2 justify-center flex-col">
                                <img
                                  src={FileUpload}
                                  alt="FileUpload"
                                  className="h-12 w-12 mx-auto"
                                />
                              </div>
                              <SecondaryButton
                                onClick={handleClick}
                                buttonName={t("Browse Files")}
                              />
                            </div>

                            <div className="mt-4">
                              <div className="flex flex-wrap gap-4">
                                {procedure.document.map(
                                  (item, selectedIndex) => {
                                    return (
                                      <div
                                        key={selectedIndex}
                                        className="bg-[#F3F4F6] gap-5 flex items-center px-5 py-3 text-[#6B7280]"
                                      >
                                        <BsFiletypeXls /> {item.name}
                                        <button
                                          onClick={() =>
                                            handleRemoveFile(
                                              index,
                                              selectedIndex
                                            )
                                          }
                                        >
                                          <FontAwesomeIcon icon={faXmark} />
                                        </button>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="mb-2 text-secondary">
                          {t("Record Steps")}
                        </div>
                        <div className="flex items-end">
                          <div className="w-10 ">
                            <button>
                              <CiCirclePlus
                                color="#616C7C"
                                size={24}
                                onClick={addRecordSteps}
                              />
                            </button>
                          </div>
                          <div className="w-full">
                            {procedure.recordSteps.map((steps, subIndex) => {
                              return (
                                <div className="grid w-full grid-cols-3 mt-3 gap-5 items-center">
                                  <div>
                                    <div className="mb-1">{t("Step Name")}</div>
                                    <input
                                      type="text"
                                      name="stepName"
                                      value={steps.stepName}
                                      onChange={(e) =>
                                        handleChange(
                                          e,
                                          index,
                                          subIndex,
                                          "teethData",
                                          "recordSteps"
                                        )
                                      }
                                      placeholder={t("Step Name")}
                                      className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                                    />
                                  </div>
                                  <div>
                                    <div className="mb-1">
                                      {t("Pre Step Instructions")}
                                    </div>
                                    <input
                                      type="text"
                                      name="preStepInstructions"
                                      value={steps.preStepInstructions}
                                      onChange={(e) =>
                                        handleChange(
                                          e,
                                          index,
                                          subIndex,
                                          "teethData",
                                          "recordSteps"
                                        )
                                      }
                                      placeholder={t("Pre Step Instructions")}
                                      className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                                    />
                                  </div>
                                  <div>
                                    <div className="mb-1">
                                      {t("Post Step Care Plan")}
                                    </div>
                                    <input
                                      type="text"
                                      name="postStepCarePlan"
                                      value={steps.postStepCarePlan}
                                      onChange={(e) =>
                                        handleChange(
                                          e,
                                          index,
                                          subIndex,
                                          "teethData",
                                          "recordSteps"
                                        )
                                      }
                                      placeholder={t("Post Step Care Plan")}
                                      className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      {isTeethMapOpen ? (
                        <TeethMap
                          isTeethMapOpen={isTeethMapOpen}
                          setIsTeethMapOpen={setIsTeethMapOpen}
                          dentalFormInfo={dentalFormInfo}
                          handleChange={handleChange}
                          dentalReset={dentalReset}
                          teethDataIndex={index}
                        />
                      ) : null}
                    </div>
                  );
                })}

                {/* <div className="grid mt-4 grid-cols-3 gap-5">
                  <div>
                    <div className="mb-1">{t("Treatment/ Procedure")}</div>
                    <input
                      type="text"
                      name="treatmentProcedure"
                      value={dentalFormInfo.treatmentProcedure}
                      onChange={handleChange}
                      placeholder={t("Treatment/ Procedure")}
                      className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                    />
                  </div>

                  <div>
                    <div>
                      <div className="mb-1">{t("Teeths Involved")}</div>
                      <input
                        type="text"
                        readOnly
                        onClick={() => setIsTeethMapOpen(true)}
                        placeholder={t("Select Teeth (s)")}
                        className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                      />
                    </div>
                    {dentalFormInfo.teethMapData.map((teeth, index) => {
                      return (
                        <div
                          key={index}
                          className="border mt-2 flex justify-between items-center w-full focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                        >
                          <div>{teeth}</div>

                          <button onClick={() => handleRemoveTeeth(index)}>
                            <FontAwesomeIcon icon={faTrash} color="#C81E1E" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <div className="">
                      <input
                        type="file"
                        name="document"
                        onChange={handleChange}
                        ref={inputFileRef}
                        className=" hidden"
                      />

                      <div className="border-dashed h-fit  bottom-0 border gap-3 flex flex-col rounded-lg py-3 px-6 bg-[#F9FAFB] border-[#C6C7C9] justify-center items-center">
                        <div className="flex gap-2 justify-center flex-col">
                          <img
                            src={FileUpload}
                            alt="FileUpload"
                            className="h-12 w-12 mx-auto"
                          />
                        </div>
                        <SecondaryButton
                          onClick={handleClick}
                          buttonName={t("Browse Files")}
                        />
                      </div>

                      <div className="mt-4">
                        <div className="flex flex-wrap gap-4">
                          {dentalFormInfo.document.map(
                            (item, selectedIndex) => {
                              return (
                                <div
                                  key={selectedIndex}
                                  className="bg-[#F3F4F6] gap-5 flex items-center px-5 py-3 text-[#6B7280]"
                                >
                                  <BsFiletypeXls /> {item.name}
                                  <button
                                    onClick={() =>
                                      handleRemoveFile(selectedIndex)
                                    }
                                  >
                                    <FontAwesomeIcon icon={faXmark} />
                                  </button>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="mb-2 text-secondary">{t("Record Steps")}</div>
                  <div className="flex">
                    <div className="w-10 mt-7">
                      <button>
                        <CiCirclePlus
                          color="#616C7C"
                          size={24}
                          onClick={addRecordSteps}
                        />
                      </button>
                    </div>
                    <div className="grid w-full grid-cols-3 gap-5 items-center">
                      <div>
                        <div className="mb-1">{t("Step Name")}</div>
                        <input
                          type="text"
                          name="preTreatment"
                          value={dentalFormInfo.preTreatment}
                          onChange={handleChange}
                          placeholder={t("Step Name")}
                          className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                        />
                      </div>
                      <div>
                        <div className="mb-1">{t("Pre Step Instructions")}</div>
                        <input
                          type="text"
                          name="preTreatment"
                          value={dentalFormInfo.preTreatment}
                          onChange={handleChange}
                          placeholder={t("Pre Step Instructions")}
                          className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                        />
                      </div>
                      <div>
                        <div className="mb-1">{t("Post Step Care Plan")}</div>
                        <input
                          type="text"
                          name="postTreatment"
                          value={dentalFormInfo.postTreatment}
                          onChange={handleChange}
                          placeholder={t("Post Step Care Plan")}
                          className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                        />
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>

              <div className="mt-7 mb-5">
                <PrimaryButton
                  showIcon
                  buttonName="Add Procedure"
                  onClick={addProcedure}
                />
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
                      ? () => onUpdateDentalForm(selectedRecord?.id)
                      : () => onSubmittingDentalForm()
                  }
                  disabled={
                    isAddingDentalForm || dentalFormInfo.diagnosis === ""
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

export default AddDentalForm;
