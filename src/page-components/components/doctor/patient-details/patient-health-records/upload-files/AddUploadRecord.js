import React, { useRef, useState } from "react";
import TertiaryButton from "../../../../../common-components/Buttons/TertiaryButton";
import PrimaryButton from "../../../../../common-components/Buttons/PrimaryButton";
import Modal from "../../../../../common-components/Modal";
import { useTranslation } from "react-i18next";
import FileUpload from "../../../../../../images/file_upload.svg";
import SecondaryButton from "../../../../../common-components/Buttons/SecondaryButton";
import useAddUploadRecord from "./hooks/useAddUploadRecord";

const AddUploadRecord = ({
  activeHealthTab = "",
  setActiveHealthTab = () => {},
  getAllPatientRecord = () => {},
  selectedRecord = {},
  setSelectedRecord = () => {},
  isEditable = true,
  setIsEditable = () => {},
}) => {
  const { t } = useTranslation();

  const inputFileRef = useRef(null);

  const handleClick = () => {
    inputFileRef.current.click();
  };

  const [documentInfo, setDocumentInfo] = useState(
    selectedRecord.id === undefined
      ? {
          documentName: "",
          document: "",
        }
      : selectedRecord
  );

  const handleChange = (e) => {
    const { name, value, type, files } = e.target || {};
    if (type === "file") {
      setDocumentInfo((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setDocumentInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleClose = () => {
    setActiveHealthTab("");
    setSelectedRecord({});
    setIsEditable(true);
  };

  const onReset = () => {
    setDocumentInfo(
      selectedRecord.document === undefined
        ? {
            documentName: "",
            document: "",
          }
        : selectedRecord
    );
  };

  const { isFormUploading, onSubmitDocuemnt } = useAddUploadRecord({
    documentInfo,
    getAllPatientRecord,
    setActiveHealthTab,
  });

  console.log(documentInfo, "dentalFormInfo");

  return (
    <div className="text-sm  text-[#2D2E33">
      <Modal
        showModal={activeHealthTab === "upload_document" ? true : false}
        onClose={handleClose}
        modalHeight="min-h-1/2 max-h-[80%]"
        modalWidth="w-[40%]"
      >
        <div className="py-4 px-6">
          <div>
            <div className="my-2 ">
              <div className="text-[#5E6066] mb-2.5">{t("Document Name")}*</div>
              <div className="flex">
                <input
                  type="text"
                  name="documentName"
                  onChange={handleChange}
                  value={documentInfo.documentName}
                  placeholder={t("Document Name")}
                  className="focus:outline-none disabled:text-secondary text-[#2D2E33] font-normal disabled:bg-[#F9FAFB] placeholder:font-normal rounded-lg ps-4 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2 w-full focus:border-[#2D2E33]"
                />
              </div>
            </div>
            {documentInfo.document ? (
              <>
                {selectedRecord.document === undefined ? (
                  <iframe
                    src={URL.createObjectURL(documentInfo.document)}
                    title="Document Preview"
                    height={470}
                    width={527}
                  />
                ) : (
                  <iframe
                    title="Uploaded Document"
                    src={`data:${selectedRecord?.documentType};base64,${documentInfo.document}`}
                    width="100%"
                    height="400"
                  />
                )}
              </>
            ) : (
              <div className="mt-5">
                <input
                  type="file"
                  name="document"
                  onChange={(e) => handleChange(e)}
                  ref={inputFileRef}
                  className=" hidden"
                />

                <div className="border-dashed h-fit  bottom-0 border gap-3 flex flex-col rounded-lg py-3 px-6 bg-[#F9FAFB] border-[#C6C7C9] justify-center items-center">
                  <div className="flex gap-2 justify-center flex-col">
                    <img
                      src={FileUpload}
                      alt="FileUpload"
                      className="h-12 w-12 mx-auto"
                    />
                  </div>
                  <SecondaryButton
                    onClick={handleClick}
                    buttonName={t("Browse Files")}
                  />
                </div>
              </div>
            )}
          </div>
          {isEditable ? (
            <div className="flex mt-5 gap-5 justify-end">
              <TertiaryButton
                buttonName={t("Reset")}
                width="w-fit"
                onClick={onReset}
              />
              <PrimaryButton
                buttonName={t("Save")}
                width="w-fit"
                onClick={onSubmitDocuemnt}
                disabled={isFormUploading}
              />
            </div>
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

export default AddUploadRecord;
