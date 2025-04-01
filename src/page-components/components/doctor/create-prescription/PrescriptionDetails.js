import React, { memo, useCallback, useEffect } from "react";
import ChiefComplaints from "../../../../images/complaint-round-svgrepo-com.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPlus } from "@fortawesome/free-solid-svg-icons";
import Pill from "../../../../images/pill.svg";
import Lab from "../../../../images/Lab.svg";
import Notes from "../../../../images/file-circle-plus.svg";
import FileCheck from "../../../../images/file-check.svg";
import Rotate from "../../../../images/rotate.svg";
import { formatArray } from "../../../utils/formateArray";
import MedicationsData from "./MedicationsData";
import { useDispatch, useSelector } from "react-redux";
import { setPrescriptionData } from "../../../../redux-store/slice/prescriptionDataSlice";
import { calculateDaysDifference } from "../../../utils/countDays";
import useGetAllCompliants from "./hooks/useGetAllCompliants";
import useGetAllDiagnosis from "./hooks/useGetAllDiagnosis";
import useGetAllInvestigations from "./hooks/useGetAllInvestigtions";
import { findDate } from "../../../utils/findDate";
import moment from "moment/moment";
import { startCase } from "../../../utils/startCase";
import MultiSelectWithAPIsearch from "../../../common-components/MultiSelectWithAPIsearch";
import useGetLifeStyle from "./hooks/useGetLifeStyle";
import useGetMedicalHandoubts from "./hooks/useGetMedicalHandoubts";
import SecondaryButton from "../../../common-components/Buttons/SecondaryButton";
import pdfIcon from "../../../../images/pdfIcon.svg";
import Skeleton from "react-loading-skeleton";
import signatureViewIcon from "../../../../images/signatureViewIcon.svg";
import pdfViewIcon from "../../../../images/pdfShowIcon.svg";
import useGetUserDetails from "./hooks/useGetUserDetails";
import { useTranslation } from "react-i18next";

const PrescriptionDetails = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const prescriptionData = useSelector((state) => state.prescriptionData);

  const addMedicationField = useCallback(() => {
    dispatch(
      setPrescriptionData({
        ...prescriptionData,
        rxList: [
          ...prescriptionData.rxList,
          {
            drugName: "",
            dose: "",
            measurement: "",
            timing: "",
            frequency: "",
            duration: "",
            notes: "",
          },
        ],
      })
    );
  }, [dispatch, prescriptionData]);

  const removeMedicationField = useCallback(
    (index) => {
      const updatedMedication = prescriptionData.rxList.filter(
        (_, i) => i !== index
      );
      dispatch(
        setPrescriptionData({
          ...prescriptionData,
          rxList: updatedMedication,
        })
      );
    },
    [dispatch, prescriptionData]
  );

  const handleInputChange = useCallback(
    (e, index) => {
      const { name, value } = e.target || {};
      if (index !== undefined) {
        const updatedMedication = [...prescriptionData.rxList];
        updatedMedication[index] = {
          ...updatedMedication[index],
          [name]: value,
        };
        dispatch(
          setPrescriptionData({
            ...prescriptionData,
            rxList: updatedMedication,
          })
        );
      } else if (name === "followUp") {
        const daysToAdd = parseInt(value.split(" ")[0]);
        const futureDate = findDate(daysToAdd);
        dispatch(
          setPrescriptionData({
            ...prescriptionData,
            [name]: value,
            followUpDate: moment(futureDate).format("yyyy-MM-DD"),
          })
        );
      } else if (name === "followUpDate") {
        const noOfDays = calculateDaysDifference(value);
        dispatch(
          setPrescriptionData({
            ...prescriptionData,
            [name]: value,
            followUp: `${noOfDays} days`,
          })
        );
      } else if (name === "instructions") {
        const linesArray = value.split("\n");
        dispatch(
          setPrescriptionData({
            ...prescriptionData,
            [name]: linesArray,
          })
        );
      } else {
        console.log(value, name, "js");
        dispatch(
          setPrescriptionData({
            ...prescriptionData,
            [name]: value,
          })
        );
      }
    },
    [dispatch, prescriptionData]
  );
  const { chiefComplaints, isChiefComplaintsLoading, getAllChiefComplaints } =
    useGetAllCompliants();

  const { differentialDiagnosis, isdiagnosisLoading, getAllDiagnosis } =
    useGetAllDiagnosis();
  const { labInvestigations, isLabInvestigationLoading, getAllInvestigations } =
    useGetAllInvestigations();

  const { getLifeStyleData, isLifeStyleLoading, lifestyleData } =
    useGetLifeStyle();
  const { isUserLoading, userDetails } = useGetUserDetails();
  const { signature, stamp } = userDetails || {};

  const {
    getMedicalTags,
    medicalHandoubts,
    isMedicalHandobts,
    diagnosisTag,
    isDiagnosisTagLaoding,
    getHandoutsById,
    addHandoubtsToPrint,
    onAddSignatureToPrint,
    onAddStampToPrint,
    removeHandobutsToPrint,
  } = useGetMedicalHandoubts();

  useEffect(() => {
    if (prescriptionData.followUp !== "") {
      const daysToAdd = parseInt(prescriptionData.followUp.split(" ")[0]);
      const futureDate = findDate(daysToAdd);
      dispatch(
        setPrescriptionData({
          ...prescriptionData,
          followUpDate: moment(futureDate).format("yyyy-MM-DD"),
        })
      );
    }
    // eslint-disable-next-line
  }, [prescriptionData.followUp]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && (event.key === "m" || event.key === "M")) {
        addMedicationField();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [addMedicationField]);

  return (
    <div className="relative">
      <div
        style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)" }}
        className="bg-white m-8 p-4 rounded-lg"
      >
        <div className="bg-[#FDF6B2] gap-2 w-fit rounded-lg px-2 py-1 text-[#723B13] flex items-center text-sm">
          <img src={ChiefComplaints} alt="ChiefComplaints" />
          {t("Chief Complaints")}
        </div>
        <div className="pt-4">
          <MultiSelectWithAPIsearch
            getData={getAllChiefComplaints}
            options={formatArray(chiefComplaints)}
            isLoading={isChiefComplaintsLoading}
            name="chiefComplaint"
            onChange={handleInputChange}
            multiple
            textColor="#5E6066"
            defaultOptions={formatArray(prescriptionData.chiefComplaint)}
            className="focus:outline-none rounded-lg ps-2 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2 w-full focus:border-[#2D2E33]"
          />
        </div>
      </div>
      <div
        style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)" }}
        className="bg-white m-8 p-4 rounded-lg"
      >
        <div className="bg-[#EDEBFE] gap-2 w-fit rounded-lg px-2 py-1 text-[#5521B5] flex items-center text-sm">
          <FontAwesomeIcon icon={faClock} />
          {t("Diagnosis")}
        </div>

        <div className="pt-4">
          <MultiSelectWithAPIsearch
            getData={getAllDiagnosis}
            options={formatArray(differentialDiagnosis)}
            isLoading={isdiagnosisLoading}
            name="diagnosis"
            onChange={handleInputChange}
            textColor="#99154B"
            buttonColor="#C81E1E"
            multiple
            defaultOptions={formatArray(prescriptionData.diagnosis)}
            className="focus:outline-none rounded-lg ps-2 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2 w-full focus:border-[#2D2E33]"
          />
        </div>
      </div>
      <div
        style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)" }}
        className="bg-white p-4 m-8 rounded-lg"
      >
        <div className="mb-1 flex justify-between items-center">
          <div className="flex text-sm items-center gap-2 w-fit py-1 px-2 rounded-lg text-[#03543F] bg-[#DEF7EC]">
            <img src={Pill} alt="pill" />
            <span> {t("Medications")}*</span>
          </div>

          <button onClick={addMedicationField}>
            <FontAwesomeIcon icon={faPlus} color="#6B7280" />
          </button>
        </div>

        <MedicationsData
          rxList={prescriptionData.rxList}
          removeMedicationField={removeMedicationField}
          handleInputChange={handleInputChange}
        />
      </div>
      <div
        style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)" }}
        className="bg-white m-8 p-4 rounded-lg"
      >
        <div className="bg-[#EDEBFE] gap-2 w-fit rounded-lg px-2 py-1 text-[#42389D] flex items-center text-sm">
          <img src={Lab} alt="lab" />
          {t("Lab Investigations")}
        </div>

        <div className="pt-4">
          <MultiSelectWithAPIsearch
            getData={getAllInvestigations}
            options={formatArray(labInvestigations)}
            isLoading={isLabInvestigationLoading}
            name="labInvestigations"
            onChange={handleInputChange}
            multiple
            textColor="#5E6066"
            defaultOptions={formatArray(prescriptionData.labInvestigations)}
            className="focus:outline-none rounded-lg ps-2 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2 w-full focus:border-[#2D2E33]"
          />
        </div>
      </div>

      <div
        style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)" }}
        className="bg-white m-8 p-4 rounded-lg"
      >
        <div className="bg-[#F3F4F6] gap-2 w-fit rounded-lg px-2 py-1 text-[#111928] flex items-center text-sm">
          <img src={Notes} alt="notes" />
          {t("Lifestyle Recommendations")}
        </div>
        <div className="pt-4">
          <MultiSelectWithAPIsearch
            getData={getLifeStyleData}
            options={formatArray(lifestyleData)}
            isLoading={isLifeStyleLoading}
            name="lifeStyleRecommendations"
            onChange={handleInputChange}
            multiple
            textColor="#5E6066"
            defaultOptions={formatArray(
              prescriptionData.lifeStyleRecommendations
            )}
            className="focus:outline-none rounded-lg ps-2 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2 w-full focus:border-[#2D2E33]"
          />
        </div>
      </div>
      <div
        style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)" }}
        className="bg-white m-8 p-4 rounded-lg"
      >
        <div className="bg-[#DEF7EC] gap-2 w-fit rounded-lg px-2 py-1 text-[#03543F] flex items-center text-sm">
          <img src={FileCheck} alt="FileCheck" />
          {/* {t("Admission Advice")} */}
          {t("Notes")}
        </div>
        <div className="mt-5">
          <textarea
            rows={5}
            placeholder={t(
              "Add any additional instructions or special notes here (e.g., take with food, avoid alcohol, etc.) ..."
            )}
            name="instructions"
            value={prescriptionData.instructions.join("\n")}
            onChange={handleInputChange}
            className="focus:outline-none rounded-lg px-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2 w-full focus:border-[#2D2E33]"
          />
        </div>
      </div>

      <div
        style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)" }}
        className="bg-white mx-8 mb-8 p-4 rounded-lg"
      >
        <div className="flex justify-between">
          <div className="bg-[#E1EFFE] gap-2 w-fit rounded-lg px-2 py-1 text-[#1E429F] flex items-center text-sm">
            <img src={Rotate} alt="Rotate" />
            {t("Follow Up")}
          </div>
          <input
            type="date"
            name="followUpDate"
            min={new Date().toISOString().split("T")[0]}
            value={
              prescriptionData.followUpDate === "1945-07-02"
                ? ""
                : prescriptionData.followUpDate
            }
            onChange={(e) => {
              handleInputChange(e);
            }}
            className="border-[#D1D5DB] border focus:border-[#2D2E33] placeholder:text-[#6B7280] focus:outline-none rounded-lg py-1 px-11 text-[#6B7280]"
          />
        </div>
        <div className="mt-5">
          <input
            name="followUp"
            type="text"
            placeholder="Please enter follow up days"
            onChange={handleInputChange}
            className="border w-full focus:border-[#2D2E33] border-[#D1D5DB] text-sm text-gray-800 py-1.5 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-2"
            value={prescriptionData.followUp}
          />
        </div>
        <div className="text-[#111928] mt-2 mx-1 flex items-center text-sm">
          {prescriptionData?.followUpDate === "1945-07-02"
            ? null
            : moment(prescriptionData?.followUpDate).format("DD-MM-yyyy")}
        </div>
      </div>

      <div className="flex w-full mb-20 justify-between">
        <div
          style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)" }}
          className="bg-white w-1/2 ms-8 p-4 rounded-lg"
        >
          <div className="flex justify-between">
            <div className="bg-[#E1EFFE] gap-2 w-fit rounded-lg px-2 py-1 text-[#1E429F] flex items-center text-sm">
              <img src={pdfViewIcon} height={20} width={20} alt="Rotate" />
              {t("Educational Handouts")}
            </div>
          </div>
          <div className="pt-4">
            <MultiSelectWithAPIsearch
              getData={getMedicalTags}
              options={formatArray(diagnosisTag)}
              isLoading={isDiagnosisTagLaoding}
              name="medicalTags"
              onChange={handleInputChange}
              multiple={false}
              textColor="#5E6066"
              defaultOptions={formatArray(prescriptionData.medicalTags)}
              className="focus:outline-none rounded-lg ps-2 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2 w-full focus:border-[#2D2E33]"
            />
          </div>
          <div className="mt-3">
            <div className="flex justify-between my-4 text-[#5E6066]">
              <div className=" ">{t("Relevant Handouts")}</div>
              <div>{t("Add to print with Prescription")}</div>
            </div>

            {isMedicalHandobts ? (
              <Skeleton height={20} width={100} />
            ) : (
              medicalHandoubts.map((handobts, index) => {
                return (
                  <div
                    key={index}
                    className="flex text-[#2D2E33] justify-between"
                  >
                    <button
                      onClick={() => getHandoutsById(handobts?.id)}
                      className={`border  ${
                        prescriptionData.medicalHandoubts.every(
                          (item) => item.id !== handobts.id
                        )
                          ? "border-[#D1D5DB] bg-[#F9FAFB] text-[#2D2E33]"
                          : "border-[#03543F] bg-[#DEF7EC] text-[#03543F]"
                      }   w-[40%] p-2.5 mb-4 flex   rounded-md`}
                    >
                      <span>
                        <img
                          src={pdfIcon}
                          height={20}
                          width={20}
                          alt="pdfIcon"
                        />
                      </span>
                      <span className="text-[#2D2E33] ms-2">
                        {startCase(handobts.title)}
                      </span>
                    </button>
                    <div className="w-1/2 flex justify-end">
                      {prescriptionData?.medicalHandoubts?.every(
                        (item) => item.id !== handobts.id
                      ) ? (
                        <SecondaryButton
                          onClick={() => addHandoubtsToPrint(handobts)}
                          buttonName={t("Add")}
                          width="w-1/2"
                        />
                      ) : (
                        <SecondaryButton
                          onClick={() => removeHandobutsToPrint(handobts)}
                          buttonName={t("Cancel")}
                          width="w-1/2"
                        />
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div
          style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)" }}
          className="bg-white w-1/2 me-8 ms-8 p-4 rounded-lg"
        >
          <div className="flex justify-between">
            <div className="bg-[#E1EFFE] gap-2 w-fit rounded-lg px-2 py-1 text-[#1E429F] flex items-center text-sm">
              <img
                src={signatureViewIcon}
                width={20}
                height={20}
                alt="Rotate"
              />
              {t("Signature")}
            </div>
          </div>
          <div className="flex justify-between my-4 text-[#5E6066]">
            <div className=" ">{t("Available Assets")}</div>
            <div>{t("Add to print with Prescription")}</div>
          </div>
          {signature === null || stamp === null ? (
            <div className="text-red-500 text-center">
              {t("No Signature & Stamp are available to add")} !
            </div>
          ) : (
            <>
              <div className="flex text-[#2D2E33] items-center justify-between">
                <div
                  className={`border  ${
                    prescriptionData.signature === false
                      ? "border-[#D1D5DB] bg-[#F9FAFB] text-[#2D2E33]"
                      : "border-[#03543F] bg-[#DEF7EC] text-[#03543F]"
                  }   w-[40%] p-2.5 mb-4 flex  items-center justify-between  rounded-md`}
                >
                  <span>
                    {isUserLoading ? (
                      <Skeleton width={100} height={10} />
                    ) : (
                      <img
                        src={`data:image/jpeg;base64,${signature}`}
                        alt="signature"
                        height={80}
                        width={80}
                      />
                    )}
                  </span>
                  <span className="text-[#2D2E33]">{t("Signature")}</span>
                </div>
                <div className="w-1/2 flex justify-end">
                  <SecondaryButton
                    buttonName={
                      prescriptionData.signature === true
                        ? `${t("Cancel")}`
                        : `${t("Add")}`
                    }
                    width="w-1/2"
                    onClick={() => onAddSignatureToPrint()}
                  />
                </div>
              </div>

              <div className="flex text-[#2D2E33] justify-between items-center">
                <div
                  className={`border  ${
                    prescriptionData.stamp === false
                      ? "border-[#D1D5DB] bg-[#F9FAFB] text-[#2D2E33]"
                      : "border-[#03543F] bg-[#DEF7EC] text-[#03543F]"
                  }   w-[40%] p-2.5 mb-4 flex  items-center justify-between  rounded-md`}
                >
                  <span>
                    {isUserLoading ? (
                      <Skeleton width={100} height={10} />
                    ) : (
                      <img
                        src={`data:image/jpeg;base64,${stamp}`}
                        alt="stamp"
                        height={50}
                        width={50}
                      />
                    )}
                  </span>
                  <span>{t("Stamp")}</span>
                </div>
                <div className="w-1/2 flex justify-end">
                  <SecondaryButton
                    buttonName={
                      prescriptionData.stamp === true
                        ? `${t("Cancel")}`
                        : `${t("Add")}`
                    }
                    width="w-1/2"
                    onClick={() => onAddStampToPrint()}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(PrescriptionDetails);
