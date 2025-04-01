import { useTranslation } from "react-i18next";
import ListLoader from "../../../../../common-components/ListLoader";
import moment from "moment";
import { useContext } from "react";
import { HealthRecordPagination } from "../../../Doctor";
import Pagination from "../../../../../common-components/Pagination";
const PrescriptionRecord = ({
  prescriptions = {},
  isRecordLoading = false,
  handleSelectedData = () => {},
}) => {
  const { t } = useTranslation();

  const paginationRecord = useContext(HealthRecordPagination);
  const { prescriptionPage = 1, setPrescriptionPage = () => {} } =
    paginationRecord || {};

  const { forms = [], total = 0 } = prescriptions || {};

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
            forms?.map((prescription, index) => {
              const { id, dateCreated, createdBy } = prescription || {};
              return (
                <div
                  className="grid grid-cols-5 border-b last:border-b-0 px-5 py-2"
                  key={id}
                  onClick={() => handleSelectedData(id, "prescription")}
                >
                  <div>{index === 0 ? t("Prescription Record") : null} </div>
                  <div>{index + 1}</div>
                  <div>{`${t("prescription")}.${moment(dateCreated).format(
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
              currentPage={prescriptionPage}
              setCurrentPage={setPrescriptionPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PrescriptionRecord;
