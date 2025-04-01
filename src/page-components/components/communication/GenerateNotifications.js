import React, { useState } from "react";
import backArrow from "../../../images/back_arrow.svg";
import PrimaryButton from "../../common-components/Buttons/PrimaryButton";
import TertiaryButton from "../../common-components/Buttons/TertiaryButton";
// import SecondaryButton from "../../common-components/Buttons/SecondaryButton";
// import FileUpload from "../../../images/file_upload.svg";
// import { BsFiletypeXls } from "react-icons/bs";
import useSendBroadCast from "./hooks/useSendBroadCast";
import { useTranslation } from "react-i18next";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";

const GenerateNotifications = ({
  setSelectedNotifications = () => {},
  getNotifications = () => {},
}) => {
  const { t } = useTranslation();
  const [notificationInfo, setNotificationInfo] = useState({
    subject: "",
    message: "",
    document: [],
  });

  // const inputFileRef = useRef(null);

  // const handleClick = () => {
  //   inputFileRef.current.click();
  // };

  const [selectUser, setSelectUser] = useState({
    mmuHead: true,
    mmuStaff: true,
  });

  const handleCheckbox = (e) => {
    const { name, checked } = e.target || {};
    setSelectUser((prev) => ({ ...prev, [name]: checked }));
  };

  const onClear = () => {
    setNotificationInfo({ subject: "", message: "", document: [] });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target || {};

    if (type === "file" && name === "document") {
      setNotificationInfo((prev) => ({
        ...prev,
        document: [...prev.document, ...Array.from(files)],
      }));
    } else {
      setNotificationInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  // const handleRemoveFile = (selectedIndex) => {
  //   const newDocument = [...notificationInfo.document];
  //   const updatedList = newDocument.filter(
  //     (_, index) => index !== selectedIndex
  //   );
  //   setNotificationInfo((prev) => ({ ...prev, document: updatedList }));
  // };

  const { onSendBroadCast, isBroadCastLoading } = useSendBroadCast({
    selectUser,
    notificationInfo,
    getNotifications,
    setSelectedNotifications,
  });

  return (
    <div
      className="p-5 text-sm text-primary"
      style={{ boxShadow: "0px 0px 3px rgba(0,0,0,0.4)" }}
    >
      <div className="flex w-full gap-5">
        <div className="w-[65%]">
          <div className="grid grid-cols-2">
            <button onClick={() => setSelectedNotifications(null)}>
              <img src={backArrow} alt="backArrow" />
            </button>
            <div>{t("Generate a Notifications")}</div>
          </div>
          <div className="mt-4">
            <div className="mb-2 font-medium">{t("Subject")}*</div>
            <input
              type="text"
              value={notificationInfo.subject}
              onChange={handleChange}
              name="subject"
              className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
            />
          </div>
          <div className="mt-4">
            <div className="mb-2 font-medium">{t("Body")}*</div>
            <textarea
              type="text"
              name="message"
              onChange={handleChange}
              value={notificationInfo.message}
              className="border h-96 w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
            />
          </div>
          <div className="flex mt-5 gap-5 justify-end">
            <PrimaryButton
              buttonName={t("Send")}
              width="w-1/6"
              onClick={onSendBroadCast}
              disabled={
                isBroadCastLoading ||
                notificationInfo.message === "" ||
                notificationInfo.subject === "" ||
                (!selectUser.mmuHead && !selectUser.mmuStaff)
              }
            />
            <TertiaryButton
              buttonName={t("Clear")}
              onClick={onClear}
              width="w-1/6"
            />
          </div>
        </div>
        <div className="h-[60vh] border-r bg-black"></div>
        <div className="w-[35%]">
          <div className="bg-[#ECECED] w-full px-3 rounded py-1">
            {t("Select receivers")}*
          </div>
          <div className="m-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="mmuHead"
                checked={selectUser.mmuHead}
                onChange={(e) => handleCheckbox(e)}
              />
              <div>{t("MMU Heads")}</div>
            </div>
            <div className="flex mt-1 items-center gap-2">
              <input
                type="checkbox"
                name="mmuStaff"
                checked={selectUser.mmuStaff}
                onChange={(e) => handleCheckbox(e)}
              />
              <div>{t("MMU Staff")}</div>
            </div>
          </div>
          {/* <div className="flex justify-center">
            <input
              type="file"
              name="document"
              onChange={handleChange}
              ref={inputFileRef}
              className=" hidden"
            />
            <div className="h-80 py-4 overflow-y-scroll">
              <div className="flex flex-wrap gap-4 overflow-y-scroll">
                {notificationInfo.document.map((item, selectedIndex) => {
                  return (
                    <div
                      key={selectedIndex}
                      className="bg-[#F3F4F6] gap-5 flex items-center px-5 py-3 text-[#6B7280]"
                    >
                      <BsFiletypeXls /> {item.name}
                      <button onClick={() => handleRemoveFile(selectedIndex)}>
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="border-dashed h-fit absolute bottom-5 border gap-3 flex flex-col rounded-lg py-6 px-12 bg-[#F9FAFB] border-[#C6C7C9] justify-center items-center">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default GenerateNotifications;
