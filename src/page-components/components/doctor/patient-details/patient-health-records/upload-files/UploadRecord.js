import moment from "moment";
import ListLoader from "../../../../../common-components/ListLoader";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { HealthRecordPagination } from "../../../Doctor";
import Pagination from "../../../../../common-components/Pagination";

const UploadRecord = ({
  uploadDocument = {},
  isDentaFormLoading = false,
  handleSelectedData = () => {},
}) => {
  const { t } = useTranslation();

  const paginationRecord = useContext(HealthRecordPagination);
  const { uploadDocumentPage = 1, setUploadDocumentPage = () => {} } =
    paginationRecord || {};

  const { forms = [], total = 0 } = uploadDocument || {};

  return (
    <div className="border-b border-[#4C6AF7]">
      {isDentaFormLoading ? (
        <ListLoader />
      ) : (
        <>
          {forms.length === 0 ? (
            <div className="text-red-500 text-center">
              {t("No records found !")}
            </div>
          ) : (
            forms?.map((dental, index) => {
              const { id, dateCreated, createdBy, documentName } = dental || {};
              return (
                <div
                  className="grid grid-cols-5 border-b last:border-b-0 px-5 py-2"
                  key={id}
                  onClick={() => handleSelectedData(id, "upload_document")}
                >
                  <div>{index === 0 ? t("Upload File") : null} </div>
                  <div>{index + 1}</div>
                  {/* <div>{`${t("dental")}.${moment(dateCreated).format(
                    "DD.MM.YYYY"
                  )}`}</div> */}
                  <div>{documentName}</div>
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
              currentPage={uploadDocumentPage}
              setCurrentPage={setUploadDocumentPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UploadRecord;
