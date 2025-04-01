import moment from "moment";
import ListLoader from "../../../../../common-components/ListLoader";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { HealthRecordPagination } from "../../../Doctor";
import Pagination from "../../../../../common-components/Pagination";

const ScreeningRecord = ({
  screeningForms = {},
  isScreeningDataLoading = false,
  handleSelectedData = () => {},
}) => {
  const { t } = useTranslation();

  const paginationRecord = useContext(HealthRecordPagination);
  const { screeningPage = 1, setScreeningPage = () => {} } =
    paginationRecord || {};

  const { forms = [], total = 0 } = screeningForms || {};
  return (
    <div className="border-b border-[#4C6AF7]">
      {isScreeningDataLoading ? (
        <ListLoader />
      ) : (
        <>
          {forms.length === 0 ? (
            <div className="text-red-500 text-center">
              {t("No records found !")}
            </div>
          ) : (
            forms?.map((screening, index) => {
              const { id, dateCreated, createdBy } = screening || {};
              return (
                <div
                  className="grid grid-cols-5 border-b last:border-b-0 px-5 py-2"
                  key={id}
                  onClick={() => handleSelectedData(id, "screening_form")}
                >
                  <div>{index === 0 ? t("Screening Form") : null} </div>
                  <div>{index + 1}</div>
                  <div>{`${t("screening")}.${moment(dateCreated).format(
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
              currentPage={screeningPage}
              setCurrentPage={setScreeningPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ScreeningRecord;
