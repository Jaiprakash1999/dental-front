import React from "react";
import UserList from "./UserList";
import bell from "../../../images/bell_grey.svg";
import activeBell from "../../../images/blue_bell.svg";
import { useTranslation } from "react-i18next";

const CommunicationSidebar = ({
  setActiveSideBar = () => {},
  mmuStaff = [],
  isMmuStaffLoading = false,
  activeSideBar,
}) => {
  const { t } = useTranslation();
  return (
    <div
      style={{ boxShadow: "0px 0px 2px rgba(0,0,0,0.4)" }}
      className="h-[90vh] overflow-y-scroll"
    >
      <div className="p-5">
        <div className="text-sm">
          <div
            className={`${
              activeSideBar === "notifications"
                ? "bg-[#E7EBFF] text-[#4C6AF7]"
                : "text-secondary"
            } p-3 mb-2 rounded-md`}
          >
            <button
              className="flex items-center gap-2"
              onClick={() => setActiveSideBar("notifications")}
            >
              <img
                src={activeSideBar === "notifications" ? activeBell : bell}
                alt="bell"
              />{" "}
              {t("Notifications")}
            </button>
          </div>
          <hr className=" border-[#D8E3FF] my-3"></hr>
          <button
            className="w-full text-start"
            onClick={() => setActiveSideBar("user_list")}
          >
            <UserList
              mmuStaff={mmuStaff}
              activeSideBar={activeSideBar}
              isMmuStaffLoading={isMmuStaffLoading}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunicationSidebar;
