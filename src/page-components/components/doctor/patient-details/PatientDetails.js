import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import useGetPatientDetails from "../hooks/useGetPatientDetails";
import { startCase } from "../../../utils/startCase";
import Skeleton from "react-loading-skeleton";
import ActivePatientTab from "./ActivePatientTab";
import VitalIcon from "../../../../images/Vital.svg";
import { firstLetterCapital } from "../../../utils/firstLetterCapital";
import { useTranslation } from "react-i18next";
import useGetSelectedVital from "./patient-health-records/wellness-record/hooks/useGetSelectedVital";

const PatientDetails = ({
  activePatientDetailsTab = "",
  setActivePatientDetailsTab = () => {},
  vitalForms = {},
  isWellDataLoading = false,
}) => {
  const { t } = useTranslation();
  const { isPatientDetailsLoading } = useGetPatientDetails();
  const [latestVital, setLatestVital] = useState({});

  const patientData = useSelector((state) => state.patientDetails);
  const { getSelectedVital } = useGetSelectedVital();

  const {
    tokenNumber,
    age,
    bloodGroup,
    gender,
    name,
    patientId,
    id,
    chiefComplaint = [],
    thumbnail,
  } = patientData || {};

  const { forms = [] } = vitalForms || {};

  const lastVital = forms?.[0] || {};

  const { id: vitalId } = lastVital || {};

  useEffect(() => {
    const fetchVital = async () => {
      if (vitalId !== undefined) {
        try {
          const res = await getSelectedVital(vitalId);
          setLatestVital(res);
        } catch (error) {
          console.error("Error fetching vital:", error);
        }
      }
    };

    fetchVital();
    // eslint-disable-next-line
  }, [vitalId]); // Include getSelectedVital if it's not from a stable source

  const {
    bloodPressure,
    heart,
    heightInCm,
    lungs,
    pulseRateInBpm,
    respiratoryRateInBpm,
    spo2InPercent,
    tempInCelsius,
    weightInKg,
  } = latestVital;

  return (
    <div className="px-6 border-t border-[#D8E3FF] pt-4 w-full bg-white">
      <div className="grid grid-cols-2">
        <div className="flex">
          <div className="mx-4">
            {thumbnail === undefined || thumbnail === null ? (
              <FontAwesomeIcon icon={faCircleUser} size="7x" color="#999999" />
            ) : (
              <img
                src={`data:image/jpeg;base64,${thumbnail}`}
                alt="thumbnail"
                className=" rounded-full w-28 h-28 object-cover"
              />
            )}
          </div>
          <div className="ms-6">
            <div className="font-medium text-xl pb-2 text-[#2D2E33]">
              {isPatientDetailsLoading ? <Skeleton /> : name}
            </div>
            <div className="flex mb-1 gap-2">
              <span className="text-sm  flex flex-shrink-0 text-[#5E6066]">
                {t("Patient ID")} :
              </span>
              <span className="text-sm text-[#2D2E33]">
                {isPatientDetailsLoading ? (
                  <Skeleton width={30} />
                ) : (
                  patientId || id
                )}
              </span>
            </div>
            <div className="flex mb-1 gap-2">
              <span className="text-sm  flex flex-shrink-0 text-[#5E6066]">
                {t("Chief Complaint")} :
              </span>
              <span className="text-sm text-[#2D2E33]">
                {isPatientDetailsLoading ? (
                  <Skeleton width={30} />
                ) : (
                  <div className="items-center flex  flex-wrap  border-[#B6B6B6] ">
                    {chiefComplaint.length === 0
                      ? "--"
                      : chiefComplaint.map((item, index) => {
                          return (
                            <div key={index} className="me-1 flex-shrink-0">
                              {firstLetterCapital(item)}
                              {index === chiefComplaint.length - 1 ? null : ","}
                            </div>
                          );
                        })}
                  </div>
                )}
              </span>
            </div>
            <div className="flex mb-1 gap-2">
              <span className="text-sm flex  flex-shrink-0  text-[#5E6066]">
                {t("Token Number")} :
              </span>
              <span className="text-sm flex  flex-shrink-0 text-[#2D2E33]">
                {isPatientDetailsLoading ? (
                  <Skeleton width={50} />
                ) : (
                  tokenNumber || "-"
                )}
              </span>
            </div>
          </div>
          <div className="mx-5 mt-9">
            <div className="flex mb-1 gap-2">
              <span className="text-sm   text-[#5E6066]">{t("Age")}:</span>
              <span className="text-sm flex gap-1 text-[#2D2E33]">
                {isPatientDetailsLoading ? <Skeleton width={20} /> : age}
              </span>
            </div>
            <div className="flex mb-1 gap-2">
              <span className="text-sm   text-[#5E6066]">{t("Sex")}:</span>
              <span className="text-sm text-[#2D2E33]">
                {isPatientDetailsLoading ? (
                  <Skeleton width={50} />
                ) : (
                  startCase(gender)
                )}
              </span>
            </div>
            <div className="flex mb-1 gap-2">
              <span className="text-sm flex flex-shrink-0  text-[#5E6066]">
                {t("Blood Group")}:
              </span>
              <span className="text-sm text-[#2D2E33]">
                {isPatientDetailsLoading ? (
                  <Skeleton width={40} />
                ) : (
                  bloodGroup || "-"
                )}
              </span>
            </div>
          </div>
        </div>

        <div className=" ms-4">
          <div className="flex gap-1 pb-2 items-center">
            <h1 className="text-[#2D2E33] text-sm font-medium">
              {t("Current Vital")}
            </h1>
            <img src={VitalIcon} alt="vital" />
          </div>
          <div className="grid gap-x-3  grid-cols-3">
            <div className="flex items-center mb-1 gap-2">
              <span className="text-sm   text-[#5E6066]">{t("Height")}:</span>
              <span className="text-sm bg-[#EBFAFF] py-0.5 px-2 rounded-sm text-primary  text-center">
                {isWellDataLoading ? (
                  <Skeleton width={50} />
                ) : (
                  heightInCm || "--"
                )}
                <span> {t("cm")}</span>
              </span>
            </div>

            <div className="flex item-center mb-1 gap-2">
              <span className="text-sm   text-[#5E6066]">{t("Weight")}:</span>
              <span className="text-sm bg-[#EBFAFF] py-0.5 px-2 rounded-sm text-primary  text-center">
                {isWellDataLoading ? (
                  <Skeleton width={50} />
                ) : (
                  weightInKg || "--"
                )}
                <span> {t("Kg")}</span>
              </span>
            </div>

            <div className="flex item-center mb-1 items-center gap-2">
              <span className="text-sm   text-[#5E6066]">
                {t("Temperature")}:
              </span>
              <span className="text-sm bg-[#EBFAFF] py-0.5 px-2 rounded-sm text-primary  text-center">
                {isWellDataLoading ? (
                  <Skeleton width={50} />
                ) : (
                  tempInCelsius || "--"
                )}
                <span> {t("C")}</span>
              </span>
            </div>

            <div className="flex item-center mb-1 gap-2">
              <span className="text-sm   text-[#5E6066]">{t("Heart")}:</span>
              <span className="text-sm bg-[#EBFAFF] py-0.5 px-2 text-center rounded-sm text-primary">
                {isWellDataLoading ? <Skeleton width={50} /> : heart || "--"}
                {/* <span> {t("bpm")}</span> */}
              </span>
            </div>
            <div className="flex item-center mb-1 gap-2">
              <span className="text-sm   text-[#5E6066]">
                {t("Pulse Rate")}:
              </span>
              <span className="text-sm bg-[#EBFAFF] py-0.5 px-2 rounded-sm text-primary  text-center">
                {isWellDataLoading ? (
                  <Skeleton width={50} />
                ) : (
                  pulseRateInBpm || "--"
                )}
                <span> {t("bpm")}</span>
              </span>
            </div>

            <div className="flex item-center mb-1 gap-2">
              <span className="text-sm   text-[#5E6066]">
                {t("Respiratory Rate")}:
              </span>
              <span className="text-sm bg-[#EBFAFF] py-0.5 px-2 rounded-sm text-center text-primary">
                {isWellDataLoading ? (
                  <Skeleton width={50} />
                ) : (
                  respiratoryRateInBpm || "--"
                )}
                <span> {t("bpm")}</span>
              </span>
            </div>

            <div className="flex item-center mb-1 gap-2">
              <span className="text-sm   text-[#5E6066]">
                {t("Blood Pressure")}:
              </span>
              <span className="text-sm bg-[#EBFAFF] py-0.5 px-2 rounded-sm text-primary  text-center">
                {isWellDataLoading ? (
                  <Skeleton width={50} />
                ) : (
                  bloodPressure || "--"
                )}
                <span>{t("mmHg")}</span>
              </span>
            </div>

            <div className="flex item-center mb-1 gap-2">
              <span className="text-sm   text-[#5E6066]">{t("SPO2")}:</span>
              <span className="text-sm bg-[#EBFAFF] py-0.5 px-2 rounded-sm text-primary  text-center">
                {isWellDataLoading ? (
                  <Skeleton width={50} />
                ) : (
                  spo2InPercent || "--"
                )}
                <span> {t("%")}</span>
              </span>
            </div>

            <div className="flex item-center mb-1 gap-2">
              <span className="text-sm   text-[#5E6066]">{t("Lungs")}:</span>
              <div className="text-sm bg-[#EBFAFF] py-0.5 px-2 rounded-sm text-primary  text-center">
                {isWellDataLoading ? <Skeleton width={50} /> : lungs || "--"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ActivePatientTab
        setActivePatientDetailsTab={setActivePatientDetailsTab}
        activePatientDetailsTab={activePatientDetailsTab}
      />
    </div>
  );
};

export default PatientDetails;
