import moment from "moment";
import ListLoader from "../../../../../common-components/ListLoader";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { HealthRecordPagination } from "../../../Doctor";
import Pagination from "../../../../../common-components/Pagination";

const BaseLinePergnancy = ({
  pregnancyOverviews = {},
  isRecordLoading = false,
  handleSelectedData = () => {},
}) => {
  const { t } = useTranslation();

  const paginationRecord = useContext(HealthRecordPagination);
  const { pregnancyOverviewPage = 1, setPregnancyOverviewPage = () => {} } =
    paginationRecord || {};
  const { forms = [], total = 0 } = pregnancyOverviews || {};

  return (
    <div className="border-b border-[#4C6AF7]">
      {isRecordLoading ? (
        <ListLoader />
      ) : (
        <>
          {forms.length === 0 ? (
            <div className="text-red-500 text-center">
              {t("No records found !")}
            </div>
          ) : (
            forms?.map((pregnancy, index) => {
              const { id, dateCreated, createdBy } = pregnancy || {};
              return (
                <div
                  className="grid grid-cols-5 border-b last:border-b-0 px-5 py-2"
                  key={id}
                  onClick={() => handleSelectedData(id, "pergnancy_overview")}
                >
                  <div>{index === 0 ? t("Pregnancy Record") : null} </div>
                  <div>{index + 1}</div>
                  <div>{`${t("pregnancy")}.${moment(dateCreated).format(
                    "DD.MM.YYYY"
                  )}`}</div>
                  <div>{createdBy}</div>
                  <div>
                    {moment(dateCreated).format("DD/MM/YYYY | hh:mm A")}{" "}
                  </div>
                </div>
              );
            })
          )}
          <div className="my-2">
            <Pagination
              totalRecords={total}
              currentPage={pregnancyOverviewPage}
              setCurrentPage={setPregnancyOverviewPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BaseLinePergnancy;
