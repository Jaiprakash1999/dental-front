import React from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

const PatientStats = ({ visitKPIdata = {}, isVisitKPIloading = false }) => {
  const {
    noOfPregnantWomans = 0,
    noOfHighRiskPregnancy = 0,
    anc = {},
    noOfEdd = 0,
    pnc = {},
    highRiskInfant = 0,
    childFlaggedForVaccination = 0,
  } = visitKPIdata || {};

  const {
    noOfThirdMonthVisits = 0,
    noOfSixthMonthVisits = 0,
    noOfEightMonthVisits = 0,
    noOfNinthMonthVisits = 0,
  } = anc || {};

  const {
    noOfThirdVisit = 0,
    noOfSeventhVisit = 0,
    noOfFourteenVisit = 0,
    noOfTwentyOneVisit = 0,
    noOfTwentyEightVisit = 0,
    noOfFortyTwoVisit = 0,
  } = pnc || {};

  const { t } = useTranslation();
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <div
          className="flex p-5 flex-shrink-0 flex-col text-center justify-center items-center"
          style={{ boxShadow: "0px 0px 5px rgba(0,0,0,0.2)" }}
        >
          <div className="">{t("Pregnant Women for Follow-Up")}</div>
          <div className="text-[#6C8BFC] font-semibold text-lg mt-3">
            {isVisitKPIloading ? <Skeleton width={100} /> : noOfPregnantWomans}
          </div>
        </div>
        <div
          className="flex p-5 flex-shrink-0 flex-col text-center  justify-center items-center"
          style={{ boxShadow: "0px 0px 5px rgba(0,0,0,0.2)" }}
        >
          <div>{t("High Risk Pregnancy cases for Follow-Up")}</div>
          <div className="text-[#6C8BFC] font-semibold text-lg mt-3">
            {isVisitKPIloading ? (
              <Skeleton width={100} />
            ) : (
              noOfHighRiskPregnancy
            )}
          </div>
        </div>
        <div
          className="flex p-5 flex-shrink-0 flex-col text-center justify-center items-center"
          style={{ boxShadow: "0px 0px 5px rgba(0,0,0,0.2)" }}
        >
          <div>{t("Estimated Date of Deliveries")}</div>
          <div className="text-[#6C8BFC] font-semibold text-lg mt-3">
            {isVisitKPIloading ? <Skeleton width={100} /> : noOfEdd}
          </div>
        </div>
      </div>

      <div
        style={{ boxShadow: "0px 0px 5px rgba(0,0,0,0.2)" }}
        className="mt-5 text-center p-5"
      >
        <div className="flex justify-center border-b pb-2 items-center">
          {t("Upcoming ANC Checkups")}
        </div>
        <div className="grid grid-cols-4 mt-4 text-sm font-light">
          <div className="">
            <div>{t("0-3 month Checkup")}</div>
            <div className="text-[#6C8BFC] text-center font-semibold  text-lg">
              {isVisitKPIloading ? (
                <Skeleton width={100} />
              ) : (
                noOfThirdMonthVisits
              )}
            </div>
          </div>
          <div>
            <div>{t("3-6 month Checkup")}</div>
            <div className="text-[#6C8BFC] text-center font-semibold   text-lg">
              {isVisitKPIloading ? (
                <Skeleton width={100} />
              ) : (
                noOfSixthMonthVisits
              )}
            </div>
          </div>
          <div>
            <div>{t("6-8 month Checkup")}</div>
            <div className="text-[#6C8BFC] text-center font-semibold   text-lg">
              {isVisitKPIloading ? (
                <Skeleton width={100} />
              ) : (
                noOfEightMonthVisits
              )}
            </div>
          </div>
          <div>
            <div>{t("8-9 month Checkup")}</div>
            <div className="text-[#6C8BFC] text-center font-semibold  text-lg">
              {isVisitKPIloading ? (
                <Skeleton width={100} />
              ) : (
                noOfNinthMonthVisits
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-5 w-full gap-4">
        <div
          className="flex p-5 flex-shrink-0 flex-col text-center justify-center items-center"
          style={{ boxShadow: "0px 0px 5px rgba(0,0,0,0.2)" }}
        >
          <div>{t("High Risk Infants for Follow-Up")}</div>
          <div className="text-[#6C8BFC] font-semibold text-lg mt-3">
            {isVisitKPIloading ? <Skeleton width={100} /> : highRiskInfant}
          </div>
        </div>
        <div
          className="flex p-5 flex-shrink-0 flex-col text-center justify-center items-center"
          style={{ boxShadow: "0px 0px 5px rgba(0,0,0,0.2)" }}
        >
          <div>{t("Children Flagged for Vaccination")}</div>
          <div className="text-[#6C8BFC] font-semibold text-lg mt-3">
            {isVisitKPIloading ? (
              <Skeleton width={100} />
            ) : (
              childFlaggedForVaccination
            )}
          </div>
        </div>
      </div>
      <div
        style={{ boxShadow: "0px 0px 5px rgba(0,0,0,0.2)" }}
        className="mt-5 text-center p-5"
      >
        <div className="flex justify-center border-b pb-2 items-center">
          {t("PNC & HBNC Visits")}
        </div>
        <div className="grid grid-cols-6 mt-4 text-sm font-light">
          {/* <div className="">
            <div>{t("0 Day Visit")}</div>
            <div className="text-[#6C8BFC] text-center font-semibold  text-lg">
              {isVisitKPIloading ? <Skeleton width={50} /> : "--"}
            </div>
          </div> */}
          <div>
            <div>{t("3rd Day Visit")}</div>
            <div className="text-[#6C8BFC] text-center font-semibold   text-lg">
              {isVisitKPIloading ? <Skeleton width={50} /> : noOfThirdVisit}
            </div>
          </div>
          <div>
            <div>{t("7th Day Visit")}</div>
            <div className="text-[#6C8BFC] text-center font-semibold   text-lg">
              {isVisitKPIloading ? <Skeleton width={50} /> : noOfSeventhVisit}
            </div>
          </div>
          <div>
            <div>{t("14th Day Visit")}</div>
            <div className="text-[#6C8BFC] text-center font-semibold  text-lg">
              {isVisitKPIloading ? <Skeleton width={50} /> : noOfFourteenVisit}
            </div>
          </div>
          <div>
            <div>{t("21st Day Visit")}</div>
            <div className="text-[#6C8BFC] text-center font-semibold  text-lg">
              {isVisitKPIloading ? <Skeleton width={50} /> : noOfTwentyOneVisit}
            </div>
          </div>
          <div>
            <div>{t("28th Day Visit")}</div>
            <div className="text-[#6C8BFC] text-center font-semibold  text-lg">
              {isVisitKPIloading ? (
                <Skeleton width={50} />
              ) : (
                noOfTwentyEightVisit
              )}
            </div>
          </div>
          <div>
            <div>{t("42nd Day Visit")}</div>
            <div className="text-[#6C8BFC] text-center font-semibold  text-lg">
              {isVisitKPIloading ? <Skeleton width={50} /> : noOfFortyTwoVisit}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientStats;
