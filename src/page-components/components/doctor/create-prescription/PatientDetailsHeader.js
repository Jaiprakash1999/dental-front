import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-loading-skeleton/dist/skeleton.css";

import {
  faAngleDown,
  faAngleUp,
  faArrowRightFromBracket,
  faCircleUser,
  faCopy,
  // faKeyboard,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetPatientDetails from "../hooks/useGetPatientDetails";
import Skeleton from "react-loading-skeleton";
import {
  initialState,
  setPrescriptionData,
} from "../../../../redux-store/slice/prescriptionDataSlice";
import { firstLetterCapital } from "../../../utils/firstLetterCapital";
// import ShortCutInfo from "./ShortCutInfo";
import backArrow from "../../../../images/back_arrow.svg";
import { useTranslation } from "react-i18next";

const PatientDetailsHeader = ({
  setPrescriptionTemplate = () => {},
  setIsEndVisit = () => {},
  prescriptionTemplate,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isPatientDetailsLoading } = useGetPatientDetails();
  const patientData = useSelector((state) => state.patientDetails);
  // const [isInfo, setIsInfo] = useState(false);
  const dispatch = useDispatch();

  const {
    age,
    gender,
    name,
    id,
    patientId,
    thumbnail,
    chiefComplaint = [],
    tokenNumber,
  } = patientData || {};

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && (event.key === "t" || event.key === "T")) {
        // Replace 'Enter' with your desired key
        setPrescriptionTemplate(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="flex relative justify-between py-2 px-4 items-center w-full bg-white"
      style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex items-center">
        <div className="flex justify-center items-center me-10">
          <button
            onClick={() => {
              navigate("/doctor", {
                state: { id: id, visit: id?.length > 10 ? true : false },
              });
              dispatch(setPrescriptionData(initialState));
            }}
          >
            <img src={backArrow} alt="backArrow" />
          </button>
        </div>
        <div className="ms-4">
          {thumbnail === undefined || thumbnail === null ? (
            <FontAwesomeIcon icon={faCircleUser} size="4x" color="#999999" />
          ) : (
            <img
              src={`data:image/jpeg;base64,${thumbnail}`}
              alt="thumbnail"
              className=" rounded-full w-16 h-16 object-cover"
            />
          )}
        </div>
        <div className="mx-4">
          {isPatientDetailsLoading ? (
            <Skeleton />
          ) : (
            <div className="text-[#1F2A37]">
              {firstLetterCapital(name)} | {firstLetterCapital(gender)} | {age}{" "}
              {t("Years")}
            </div>
          )}

          <div className="flex gap-2 text-sm font-light">
            <div className="text-sm text-[#6B7280]">{t("Patient ID")} : </div>
            <span className="text-sm text-[#4C6AF7]">{patientId || "---"}</span>
          </div>
        </div>

        <div className="mx-10 gap-8 flex items-center">
          <div className="text-sm text-[#6B7280]">
            {t("Chief Complaint")}
            <div className="items-center ms-1 font-medium text-primary flex-wrap flex-shrink-0 flex  border-[#B6B6B6] ">
              {chiefComplaint.map((item, index) => {
                return (
                  <div key={index} className="me-1">
                    {firstLetterCapital(item)}
                    {index === chiefComplaint.length - 1 ? null : ","}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="text-sm text-[#6B7280]">
            {t("Token No.")}
            <div className="font-medium text-[#1F2A37]">
              {tokenNumber || "--"}
            </div>
          </div>
          {/* <div className="text-sm text-[#6B7280]">
            Date
            <div className="font-medium text-[#1F2A37]">
              {visitDate || "--"}
            </div>
          </div>
          <div className="text-sm text-[#6B7280]">
            Time
            <div className="font-medium text-[#1F2A37]">--</div>
          </div> */}
        </div>
      </div>
      <div className="flex justify-end gap-6 me-10">
        {/* <button onClick={() => setIsInfo((prev) => !prev)}>
          <FontAwesomeIcon
            icon={faKeyboard}
            color="#4C6AF7"
            size="2x"
            fade={false}
          />
        </button> */}
        <button
          onClick={() => setPrescriptionTemplate((prev) => !prev)}
          className="bg-[#4C6AF7] hover:border-2 min-w-48 hover:border-[#D8E3FF] h-10 gap-2 disabled:bg-[#E5E7EB] disabled:border-[#E5E7EB] disabled:text-[#1F2A37] flex justify-center items-center border border-[#1A56DB] px-4 py-2 rounded-lg text-sm text-[#FFFFFF]"
        >
          <FontAwesomeIcon icon={faCopy} />
          {t("Use Rx Template")}
          <FontAwesomeIcon
            icon={prescriptionTemplate ? faAngleUp : faAngleDown}
          />
        </button>
        <button
          onClick={() => setIsEndVisit(true)}
          className="bg-[#C81E1E] px-4 disabled:bg-[#E5E7EB] disabled:border-[#E5E7EA] disabled:text-[#1F2A37]  justify-center border border-[#C81E1E] item-center rounded-lg text-sm text-[#FFFFFF]"
        >
          <span className="me-2">{t("End Visit")}</span>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </button>
      </div>
      {/* {isInfo && (
        <div className=" absolute top-16 right-96">
          <ShortCutInfo />
        </div>
      )} */}
    </div>
  );
};

export default PatientDetailsHeader;
