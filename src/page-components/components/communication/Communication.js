import React, { useState } from "react";
import CommunicationSidebar from "./CommunicationSidebar";
import MessageBox from "./MessageBox";
import useGetMmuStaffList from "../mmu-staff/roster/hooks/useGetMmuStaffList";
import GenerateNotifications from "./GenerateNotifications";
import Notifications from "./Notifications";
import { useSelector } from "react-redux";

const Communication = () => {
  const { mmuStaff, isMmuStaffLoading } = useGetMmuStaffList({
    userType: undefined,
  });
  const selectedUser = useSelector((state) => state.selectedUser);
  const allNotification = useSelector((state) => state.allNotification);
  const { messages = [] } = allNotification || {};

  const [activeSideBar, setActiveSideBar] = useState(
    selectedUser.id === undefined &&
      messages[messages?.length - 1]?.id === undefined
      ? "notifications"
      : "user_list"
  );

  return (
    <div className="p-5">
      <div className="flex w-full relative">
        <div className="fixed w-[23%]">
          <CommunicationSidebar
            mmuStaff={mmuStaff}
            isMmuStaffLoading={isMmuStaffLoading}
            setActiveSideBar={setActiveSideBar}
            activeSideBar={activeSideBar}
          />
        </div>
        <div className="ml-auto w-[73%]">
          {activeSideBar === "user_list" && <MessageBox />}
          {activeSideBar === "generate_notifications" && (
            <GenerateNotifications setActiveSideBar={setActiveSideBar} />
          )}
          {activeSideBar === "notifications" && <Notifications />}
        </div>
      </div>
    </div>
  );
};

export default Communication;
