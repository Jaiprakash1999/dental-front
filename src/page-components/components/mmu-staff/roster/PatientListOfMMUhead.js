import React from "react";
import ListLoader from "../../../common-components/ListLoader";
import backArrow from "../../../../images/back_arrow.svg";
import Pagination from "../../../common-components/Pagination";
import { useTranslation } from "react-i18next";
import { firstLetterCapital } from "../../../utils/firstLetterCapital";
import moment from "moment";
import { USER_TYPE } from "../../../utils/userType";
import TertiaryButton from "../../../common-components/Buttons/TertiaryButton";

const STATUS_COLOR_MAPPING = {
  UPCOMING: "bg-[#E1EFFE] text-[#1F5084]",
  COMPLETED: "bg-[#DEF7EC] text-[#03543F]",
  CANCELLED: "bg-[#FDE8E8] text-[#9B1C1C]",
  "No Show": "bg-[#FDE8E8] text-[#9B1C1C]",
  MODIFIED: "bg-[#FDF6B2] text-[#723B13]",
};

const PatientListOfMMUhead = ({
  setActiveComponent = () => {},
  patientList = {},
  isPatientListLoading = false,
  selectedItem = {},
  setSelectedItem = () => {},
  currentPage,
  setCurrentPage = () => {},
  isCSVloading = false,
  onDownloadCSVfileOfPatient = () => {},
}) => {
  const { t } = useTranslation();
  const { userType, name } = selectedItem || {};
  const { visits = [], total } = patientList || {};
  const handleBack = () => {
    setSelectedItem({});
    setActiveComponent("staff");
  };

  return (
    <div>
      <div className="p-5 text-primary text-sm">
        <div className="flex w-full justify-between text-base mb-2">
          <div className="flex items-center">
            <button onClick={handleBack}>
              <img src={backArrow} alt="backArrow" />
            </button>
            <h1 className="ms-5">{t("Patient List")}</h1>
          </div>
          <TertiaryButton
            buttonName={t("Export User Data CSV")}
            onClick={onDownloadCSVfileOfPatient}
            disabled={visits.length === 0 || isCSVloading}
          />
        </div>
        <div className="flex text-base items-center mb-5">
          <div className="flex items-center">
            <div className="text-secondary">{t("MMU Name")} : </div>
            <div className="ms-2">
              {name} ({USER_TYPE[userType] || "--"})
            </div>
          </div>
        </div>
        <div className="border mb-16">
          <div className="grid text-base border-b uppercase items-center grid-cols-7 bg-[#F9FAFB] text-[#6B7280]">
            <div className="border-r p-2 border-[#D7D7D7]">
              {t("Patient Name")}
            </div>
            <div className="border-r p-2 border-[#D7D7D7]">{t("Address")}</div>
            <div className="border-r p-2 border-[#D7D7D7]">
              {t("Managed by")}
            </div>
            <div className="border-r p-2 border-[#D7D7D7]">
              {t("Booked at")}
            </div>
            <div className="border-r p-2 border-[#D7D7D7]">
              {t("Visit Status")}
            </div>
            <div className="border-r p-2 border-[#D7D7D7]">
              {t("Chief Complaint")}
            </div>
            <div className="p-2">{t("Follow up date")}</div>
          </div>
          <div>
            {isPatientListLoading ? (
              <ListLoader />
            ) : (
              visits.map((item, index) => {
                const {
                  name = "",
                  address = "",
                  chiefComplaint = [],
                  followUpDate = "",
                  createdBy = "",
                  createdAt,
                  visitStatus,
                } = item || {};
                return (
                  <div
                    key={index}
                    className="grid hover:bg-[#F9FAFF] grid-cols-7 border-b last:border-b-0 items-center"
                  >
                    <div className="p-2">{name}</div>
                    <div className="p-2">{address || "--"}</div>
                    <div className="p-2">{createdBy} </div>
                    <div className="p-2">
                      {moment(createdAt).format("DD-MM-YYYY")}{" "}
                    </div>
                    <div className="p-2">
                      <div
                        className={`${STATUS_COLOR_MAPPING[visitStatus]} w-fit my-2 rounded-lg px-2 py-1`}
                      >
                        {visitStatus}
                      </div>
                    </div>
                    <div className="items-center flex-wrap flex-shrink-0 flex p-2  ">
                      {chiefComplaint.map((item, index) => {
                        return (
                          <div key={index} className="me-1">
                            {firstLetterCapital(item)}
                            {index === chiefComplaint.length - 1 ? null : ","}
                          </div>
                        );
                      })}
                    </div>
                    <div className="p-2">{followUpDate || "--"}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <div
        className="bg-white w-[95.6%] fixed bottom-0 p-3"
        style={{ boxShadow: "0px 0px 1px rgba(0,0,0,0.2)" }}
      >
        <Pagination
          totalRecords={total}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PatientListOfMMUhead;
