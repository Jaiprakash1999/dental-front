import React, { useState } from "react";
import Pagination from "../../common-components/Pagination";
import ListLoader from "../../common-components/ListLoader";
import { useTranslation } from "react-i18next";

const PatientUpcomingAppointment = ({
  pregnantLadies = {},
  isVisitKPIloading = false,
}) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  const { total, data = [] } = pregnantLadies || {};
  return (
    <div>
      <div className="border">
        <div className="grid grid-cols-7 items-center uppercase bg-[#F9FAFB] text-sm font-medium text-gray-800">
          <div className=" justify-center px-2 items-center py-3 border-[#B6B6B6] border-r">
            {t("Patient ID")}
          </div>
          <div className=" justify-center px-2 items-center py-3 border-[#B6B6B6] border-r">
            {t("Name")}
          </div>
          <div className="justify-center px-2 items-center py-3 border-[#B6B6B6] border-r">
            {t("Date of LMP")}
          </div>
          <div className="py-3 px-2  justify-center border-[#B6B6B6] border-r">
            {t("EDD")}
          </div>
          <div className=" justify-center px-2 py-3 border-[#B6B6B6] border-r">
            {t("Latest Tags")}
          </div>
          <div className="justify-center px-2 border-[#B6B6B6] border-r py-3">
            {t("Last Visit Date")}
          </div>
          <div className="justify-center px-2 py-3">
            {t("Upcoming Visit date")}
          </div>
        </div>
        {isVisitKPIloading ? (
          <ListLoader />
        ) : (
          data?.map((appointments) => {
            const {
              edd,
              id,
              latestTags,
              latestVisitDate,
              lmp,
              name,
              upcomingVisitDate,
            } = appointments || {};

            return (
              <div
                key={id}
                className="border-b last:border-b-0 border-[#E7F4FF]"
              >
                <div className="grid grid-cols-7 ">
                  <div className=" items-center justify-center px-2  flex-shrink-0 flex-wrap py-3">
                    {id}
                  </div>
                  <div className=" items-center justify-center px-2  flex-shrink-0 flex-wrap py-3">
                    {name}
                  </div>
                  <div className="px-2 items-center justify-center  flex-shrink-0 flex-wrap py-3">
                    {lmp || "--"}
                  </div>
                  <div className=" px-2 py-3 items-center flex flex-wrap flex-shrink-0">
                    {edd || "--"}
                  </div>
                  <div className="px-2 flex-shrink-0 justify-center items-center py-3">
                    {latestTags || "--"}
                  </div>
                  <div className="px-2 flex-shrink-0 justify-center items-center py-3">
                    {latestVisitDate || "--"}
                  </div>
                  <div className="px-2 flex-shrink-0 justify-center items-center py-3">
                    {upcomingVisitDate || "--"}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div
          className="my-5 p-3"
          style={{ boxShadow: "0px 0px 5px rgba(0,0,0,0.5)" }}
        >
          <Pagination
            countsPerPage={10}
            totalRecords={total}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientUpcomingAppointment;
