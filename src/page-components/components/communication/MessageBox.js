import { faCircleUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState, useEffect } from "react";
import { IoMdSend } from "react-icons/io";
import { FiPaperclip } from "react-icons/fi";
import useSendMessage from "./hooks/useSendMessage";
import { useSelector } from "react-redux";
import ListLoader from "../../common-components/ListLoader";
import { formatDateTime, formatTime } from "../../utils/formatDateTime";
import Document from "../../../images/pdfShowIcon.svg";
import { useTranslation } from "react-i18next";

const MessageBox = () => {
  const { t } = useTranslation();
  const [inputMessage, setInputMessage] = useState({
    message: "",
    document: [],
  });

  const selectedUser = useSelector((state) => state.selectedUser);
  const allNotification = useSelector((state) => state.allNotification);
  const { messages = [] } = allNotification || {};

  const fileInputRef = useRef(null);
  const { onAddMessage, isMessageLoading, isMessageSending, messageList } =
    useSendMessage({ setInputMessage });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target || {};
    if (type === "file" && name === "document") {
      setInputMessage((prev) => ({
        ...prev,
        document: [...prev.document, ...Array.from(files)],
      }));
    } else {
      setInputMessage((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePaperClip = () => {
    fileInputRef.current.click();
  };

  const onSend = (e) => {
    e.preventDefault();
    onAddMessage(inputMessage);
    setInputMessage({ message: "", document: [] }); // Clear input after sending
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      onSend(e);
    }
  };

  const removeFile = (fileToRemove) => {
    setInputMessage((prev) => ({
      ...prev,
      document: prev.document.filter((file) => file !== fileToRemove),
    }));
  };

  // Scroll to the bottom of the message list when new messages arrive
  useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messageList]);

  return (
    <div
      style={{ boxShadow: "0px 0px 4px rgba(0,0,0,0.2)" }}
      className=" h-[90vh] w-[67%] overflow-y-scroll fixed flex flex-col"
    >
      <div className="flex items-center bg-[#E7EBFF] p-2">
        <FontAwesomeIcon icon={faCircleUser} color="#2323" size="3x" />
        <h4 className="ms-2 text-[#4C6AF7]">
          {selectedUser?.name || messages[messages?.length - 1]?.name || "--"}
        </h4>
      </div>

      <div
        id="message-container"
        className="flex-grow text-sm overflow-y-auto p-4"
      >
        {isMessageLoading ? (
          <ListLoader />
        ) : (
          messageList.map((item, index) => {
            const { sent, message, createdAt } = item || {};
            return (
              <div
                key={index}
                className={`flex ${
                  sent ? "justify-end" : "justify-start"
                } my-2`}
              >
                <div
                  className={`${
                    sent === true
                      ? "bg-[#F9FAFB] text-primary"
                      : "bg-[#4C6AF7] text-[#ffffff]"
                  } rounded-md px-2 py-1  w-fit`}
                >
                  <div>{message}</div>
                  <div
                    className={` ${
                      sent === true ? "text-[#BCC8FF]" : "text-[#E6E6E6]"
                    } flex text-xs  justify-end`}
                  >
                    {formatDateTime(createdAt)} {formatTime(createdAt)}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="flex items-center p-2 border-t border-gray-300">
        <div className="w-full flex flex-col relative">
          <textarea
            name="message"
            value={inputMessage.message}
            className="border text-sm p-2 bg-[#E7EBFF] text-primary outline-none w-full rounded-lg"
            placeholder={t("Type Text here")}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <div className="absolute right-2 bottom-3">
            <button onClick={handlePaperClip}>
              <FiPaperclip />
            </button>
          </div>
          <input
            type="file"
            name="document"
            ref={fileInputRef}
            className="hidden"
            onChange={handleChange}
          />
          <div className=" flex flex-wrap  bottom-1 left-3">
            {inputMessage.document.map((item, index) => {
              const { name } = item || {};

              return (
                <div
                  key={index}
                  className="text-[#4C6AF7] gap-2 flex items-center m-1 bg-white text-sm px-2 py-1 rounded"
                >
                  <img src={Document} alt="Document" height={20} width={20} />
                  {name}
                  <button
                    className="bg-[#F1C7C8] px-2 py-1 rounded-full"
                    onClick={() => removeFile(item)}
                  >
                    <FontAwesomeIcon icon={faXmark} color="#3F3F3F" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="ms-2">
          <button
            onClick={onSend}
            disabled={isMessageSending}
            className="bg-[#4C6AF7] p-3 flex-shrink-0 flex-nowrap hover:border-[#E7EBFF] disabled:bg-[#F9FAFB] disabled:border-[#C6C7C9] disabled:text-[#A2A3A7] flex justify-center border border-[#4C6AF7] item-center rounded-lg text-sm text-[#FFFFFF]"
          >
            <IoMdSend color="white" className="h-7 w-7" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
