import moment from "moment";
import ListLoader from "../../../../../common-components/ListLoader";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { HealthRecordPagination } from "../../../Doctor";
import Pagination from "../../../../../common-components/Pagination";

const AntenatalCare = ({
  antenatalCares = {},
  isRecordLoading = false,
  handleSelectedData = () => {},
}) => {
  const { t } = useTranslation();
  const paginationRecord = useContext(HealthRecordPagination);
  const { antenatalCarePage = 1, setAntenatalCarePage = () => {} } =
    paginationRecord || {};

  const { forms = [], total = 0 } = antenatalCares || {};

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
                  onClick={() =>
                    handleSelectedData(id, "antenatal_periodic_care")
                  }
                >
                  <div>{index === 0 ? t("Antenatal Care") : null} </div>
                  <div>{index + 1}</div>
                  <div>{`${t("antenatal_care")}.${moment(dateCreated).format(
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
              currentPage={antenatalCarePage}
              setCurrentPage={setAntenatalCarePage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AntenatalCare;
