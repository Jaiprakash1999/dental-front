import React, { useState } from "react";
import PrimaryButton from "../../common-components/Buttons/PrimaryButton";
import useGetNotifications from "./hooks/useGetNotifications";
import ListLoader from "../../common-components/ListLoader";
import SelectedNotifications from "./SelectedNotifications";
import GenerateNotifications from "./GenerateNotifications";
import { ToastContainer } from "react-toastify";
import { formatDateTime, formatTime } from "../../utils/formatDateTime";
import { useTranslation } from "react-i18next";
import useGetUserDetails from "../doctor/create-prescription/hooks/useGetUserDetails";
import Skeleton from "react-loading-skeleton";

const Notifications = () => {
  const { isNotificationsLoading, notifications, getNotifications } =
    useGetNotifications();
  const { isUserLoading, userDetails } = useGetUserDetails();
  const { userType } = userDetails || {};
  const { t } = useTranslation();
  const [selectedNotifications, setSelectedNotifications] = useState(null);
  const [selectedBroadCast, setSelectedBroadCast] = useState({});

  const selectedItem = (item) => {
    setSelectedBroadCast(item);
    setSelectedNotifications("selected_notifications");
  };

  return (
    <div className="text-primary text-sm">
      <ToastContainer />
      {selectedNotifications === null && (
        <div>
          {isUserLoading ? (
            <Skeleton height={20} className="mb-5 w-full" />
          ) : (
            <>
              {userType === "ADMIN" ? (
                <div className="flex mb-5 justify-end">
                  <PrimaryButton
                    buttonName={t("Generate Notifications")}
                    onClick={() =>
                      setSelectedNotifications("generate_notifications")
                    }
                  />
                </div>
              ) : null}
            </>
          )}
          <div
            className="rounded text-sm"
            style={{ boxShadow: "0px 0px 4px rgba(0,0,0,0.3)" }}
          >
            <div
              className={` ${
                userType === "ADMIN" ? "grid-cols-3" : "grid-cols-2"
              } bg-[#D8E3FF] rounded rounded-b-none  grid`}
            >
              {userType === "ADMIN" ? (
                <div className="border-r p-2 border-[#96B3FF]">
                  {t("Receivers")}
                </div>
              ) : null}
              <div className="border-r p-2 border-[#96B3FF]">
                {t("Subject")}
              </div>
              <div className=" p-2">{t("Date")}</div>
            </div>
            {isNotificationsLoading ? (
              <ListLoader />
            ) : (
              <div>
                {notifications.length > 0 ? (
                  notifications.map((item, index) => {
                    const { receivers, createdAt, subject } = item || {};
                    return (
                      <div
                        key={index}
                        onClick={() => selectedItem(item)}
                        className={`${
                          userType === "ADMIN" ? "grid-cols-3" : "grid-cols-2"
                        } grid border-b last:border-b-0`}
                      >
                        {userType === "ADMIN" ? (
                          <div className="p-2 ">
                            {receivers === "ALL" && "MMU STAFF, MMU HEAD"}
                            {receivers === "MMUHEAD" && "MMU HEAD"}
                            {receivers === "MMUSTAFF" && "MMU STAFF"}
                          </div>
                        ) : null}
                        <div className="p-2">{subject}</div>
                        <div className=" p-2">
                          {formatDateTime(createdAt)} | {formatTime(createdAt)}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>No Notification found !</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {selectedNotifications === "selected_notifications" ? (
        <SelectedNotifications
          selectedNotifications={selectedNotifications}
          selectedBroadCast={selectedBroadCast}
          setSelectedNotifications={setSelectedNotifications}
        />
      ) : null}

      {selectedNotifications === "generate_notifications" ? (
        <GenerateNotifications
          setSelectedNotifications={setSelectedNotifications}
          getNotifications={getNotifications}
        />
      ) : null}
    </div>
  );
};

export default Notifications;
