import moment from "moment";
import ListLoader from "../../../../../common-components/ListLoader";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { HealthRecordPagination } from "../../../Doctor";
import Pagination from "../../../../../common-components/Pagination";

const WellnessRecords = ({
  vitalForms = {},
  isRecordLoading = false,
  handleSelectedData = () => {},
}) => {
  const { t } = useTranslation();
  const paginationRecord = useContext(HealthRecordPagination);
  const { vitalPage = 1, setVitalPage = () => {} } = paginationRecord || {};
  const { forms = [], total } = vitalForms || {};

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
            forms?.map((wellness, index) => {
              const { id, dateCreated, createdBy } = wellness || {};
              return (
                <div
                  className="grid grid-cols-5 border-b last:border-b-0 px-5 py-2"
                  key={id}
                  onClick={() => handleSelectedData(id, "vitals_record")}
                >
                  <div>{index === 0 ? t("Vitals Record") : null} </div>
                  <div>{index + 1}</div>
                  <div>{`${t("vitals")}.${moment(dateCreated).format(
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
              currentPage={vitalPage}
              setCurrentPage={setVitalPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default WellnessRecords;
