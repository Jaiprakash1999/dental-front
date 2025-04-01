import moment from "moment";
import ListLoader from "../../../../../common-components/ListLoader";
import Pagination from "../../../../../common-components/Pagination";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { HealthRecordPagination } from "../../../Doctor";

const CareOfBaby = ({
  careOfBabyForms = {},
  isRecordLoading = false,
  handleSelectedData = () => {},
}) => {
  const { t } = useTranslation();
  const paginationRecord = useContext(HealthRecordPagination);
  const { careOfBabyPage = 1, setCareOfBabyPage = () => {} } =
    paginationRecord || {};

  const { forms = [], total } = careOfBabyForms || {};
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
            forms?.map((care, index) => {
              const { id, dateCreated, createdBy } = care || {};
              return (
                <div
                  className="grid grid-cols-5 border-b last:border-b-0 px-5 py-2"
                  key={id}
                  onClick={() => handleSelectedData(id, "baby_care")}
                >
                  <div>{index === 0 ? t("Care of Baby") : null} </div>
                  <div>{index + 1}</div>
                  <div>{`${t("baby_care")}.${moment(dateCreated).format(
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
              currentPage={careOfBabyPage}
              setCurrentPage={setCareOfBabyPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CareOfBaby;
