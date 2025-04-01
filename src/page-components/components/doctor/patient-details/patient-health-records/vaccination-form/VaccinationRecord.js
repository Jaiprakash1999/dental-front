import moment from "moment";
import ListLoader from "../../../../../common-components/ListLoader";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { HealthRecordPagination } from "../../../Doctor";
import Pagination from "../../../../../common-components/Pagination";

const VaccinationRecord = ({
  vaccinationForms = {},
  isRecordLoading = false,
  handleSelectedData = () => {},
}) => {
  const { t } = useTranslation();
  const paginationRecord = useContext(HealthRecordPagination);
  const { vaccinationPage = 1, setVaccinationPage = () => {} } =
    paginationRecord || {};

  const { forms = [], total = 0 } = vaccinationForms || {};
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
            forms?.map((screening, index) => {
              const { id, dateCreated, createdBy } = screening || {};
              return (
                <div
                  className="grid grid-cols-5 border-b last:border-b-0 px-5 py-2"
                  key={id}
                  onClick={() => handleSelectedData(id, "vaccination_form")}
                >
                  <div>{index === 0 ? t("Vaccination Form") : null} </div>
                  <div>{index + 1}</div>
                  <div>{`${t("vaccination")}.${moment(dateCreated).format(
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
              currentPage={vaccinationPage}
              setCurrentPage={setVaccinationPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default VaccinationRecord;
