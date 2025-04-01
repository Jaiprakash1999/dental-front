import React from "react";
import Tooltip from "../../common-components/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNavbarTab } from "../../../redux-store/slice/activeNavbarSlice";
import { useTranslation } from "react-i18next";
import grayHome from "../../../images/home_gray.svg";
import blueHome from "../../../images/home_blue.svg";
import grayUser from "../../../images/User_grey.svg";
import blueUser from "../../../images/user_blue.svg";
import grayRoster from "../../../images/RosterGrey.svg";
import blueRoster from "../../../images/RosterBlue.svg";
import grayHandouts from "../../../images/HandoutGrey.svg";
import blueHandouts from "../../../images/HandoutBlue.svg";
import grayGeoAnalytics from "../../../images/geoGrey.svg";
import blueGeoAnalytics from "../../../images/geoBlue.svg";
import grayMessage from "../../../images/MessageGrey.svg";
import blueMessage from "../../../images/MessageBlue.svg";
import grayMainDash from "../../../images/AnalyticsGrey.svg";
import blueMainDash from "../../../images/AnalyticsBlue.svg";
import patientListGray from "../../../images/patientlistGrey.svg";
import patientListBlue from "../../../images/patientListBlue.svg";
import graySetting from "../../../images/setGrey.svg";
import blueSetting from "../../../images/setBlue.svg";
const { REACT_APP_IS_ONLINE } = process.env || {};

const Navbar = () => {
  const activeNavbar = useSelector((state) => state.activeNavbar);
  // const activeDrawer = useSelector((state) => state.dashboardDrawer);
  const dispatch = useDispatch();
  const handleActiveNavbar = (value) => {
    dispatch(setActiveNavbarTab(value));
  };

  const { t } = useTranslation();
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  const { userType } = userDetails || {};

  return (
    <div>
      {/* {activeDrawer.userDrawer ||
      activeDrawer.checkInDrawer ||
      activeNavbar !== "home" ? ( */}
      <ul>
        <li
          onClick={() => handleActiveNavbar("home")}
          className={`m-3 p-2 flex items-center justify-center rounded-lg ${
            activeNavbar === "home" ? "bg-[#E1EFFE] text-[#4C6AF7]" : ""
          }`}
        >
          <Tooltip content={t("Home")} placement="left">
            <img
              alt="home"
              src={activeNavbar === "home" ? blueHome : grayHome}
            />
          </Tooltip>
        </li>

        <li
          onClick={() => handleActiveNavbar("patient_list")}
          className={`m-3 p-2 items-center flex justify-center rounded-lg ${
            activeNavbar === "patient_list" ? "bg-[#E1EFFE]" : ""
          }`}
        >
          <Tooltip content={t("Patient List")} placement="left" width="w-20">
            <img
              alt="patient-list"
              src={
                activeNavbar === "patient_list"
                  ? patientListBlue
                  : patientListGray
              }
            />
          </Tooltip>
        </li>
        <li
          onClick={() => handleActiveNavbar("message")}
          className={`m-3 p-2 items-center flex justify-center rounded-lg ${
            activeNavbar === "message" ? "bg-[#E1EFFE]" : ""
          }`}
        >
          <Tooltip content={t("Communication")} placement="left">
            <img
              alt="message"
              src={activeNavbar === "message" ? blueMessage : grayMessage}
            />
          </Tooltip>
        </li>
        <li
          onClick={() => handleActiveNavbar("medical_handouts")}
          className={`m-3 p-2 items-center flex justify-center rounded-lg ${
            activeNavbar === "medical_handouts" ? "bg-[#E1EFFE]" : ""
          }`}
        >
          <Tooltip
            content={t("Medical Handouts")}
            placement="left"
            width="w-28"
          >
            <img
              alt="handouts"
              src={
                activeNavbar === "medical_handouts"
                  ? blueHandouts
                  : grayHandouts
              }
            />
          </Tooltip>
        </li>

        <li
          onClick={() => handleActiveNavbar("location")}
          className={`m-3 p-2 flex items-center justify-center rounded-lg ${
            activeNavbar === "location" ? "bg-[#E1EFFE]" : ""
          }`}
        >
          <Tooltip
            content={t("Geo-Visit Analytics")}
            placement="left"
            width="w-40"
          >
            <img
              alt="geo"
              src={
                activeNavbar === "location"
                  ? blueGeoAnalytics
                  : grayGeoAnalytics
              }
            />
          </Tooltip>
        </li>
        <li
          onClick={() => handleActiveNavbar("mainDashboard")}
          className={`m-3 pe-2 ps-3 py-2 flex items-center rounded-lg ${
            activeNavbar === "mainDashboard"
              ? "bg-[#E1EFFE] text-[#4C6AF7]"
              : "text-[#6B7280]"
          }`}
        >
          <Tooltip
            content={t("Analytics Dashboard")}
            placement="left"
            width="w-40"
          >
            <img
              alt="main-dashboard"
              src={
                activeNavbar === "mainDashboard" ? blueMainDash : grayMainDash
              }
            />
          </Tooltip>
        </li>

        {userType === "ADMIN" && (
          <li
            onClick={() => handleActiveNavbar("roster")}
            className={`m-3 p-2 items-center flex justify-center rounded-lg ${
              activeNavbar === "roster" ? "bg-[#E1EFFE]" : ""
            }`}
          >
            <Tooltip content={t("Roster")} placement="left">
              <img
                alt="roster"
                src={activeNavbar === "roster" ? blueRoster : grayRoster}
              />
            </Tooltip>
          </li>
        )}

        {userType === "ADMIN" && REACT_APP_IS_ONLINE === "true" && (
          <li
            onClick={() => handleActiveNavbar("user_management")}
            className={`m-3 p-2 items-center flex justify-center rounded-lg ${
              activeNavbar === "user_management" ? "bg-[#E1EFFE]" : ""
            }`}
          >
            <Tooltip
              content={t("User Management")}
              placement="left"
              width="w-28"
            >
              <img
                alt="user-management"
                src={activeNavbar === "user_management" ? blueUser : grayUser}
              />
            </Tooltip>
          </li>
        )}
        <li
          onClick={() => handleActiveNavbar("setting")}
          className={`m-3 p-2 items-center flex justify-center rounded-lg ${
            activeNavbar === "setting" ? "bg-[#E1EFFE]" : ""
          }`}
        >
          <Tooltip content={t("Settings")} placement="left">
            <img
              alt="setting"
              src={activeNavbar === "setting" ? blueSetting : graySetting}
            />
          </Tooltip>
        </li>
      </ul>
      {/* ) : (
        <ul>
          <li
            onClick={() => handleActiveNavbar("home")}
            className={`m-3 py-2 pe-2 ps-3 items-center rounded-lg  ${
              activeNavbar === "home"
                ? "bg-[#E1EFFE] text-[#4C6AF7]"
                : "text-[#6B7280]"
            }`}
          >
            <FontAwesomeIcon
              className="h-5 w-5 me-2 mx-auto"
              icon={faHouse}
              color={activeNavbar === "home" ? "#1A56DB" : "#6B7280"}
            />
            {t("Home")}
          </li>
          {userType === "ADMIN" && (
            <li
              onClick={() => handleActiveNavbar("roster")}
              className={`m-3 pe-2 ps-3 py-2 items-center rounded-lg ${
                activeNavbar === "roster"
                  ? "bg-[#E1EFFE] text-[#4C6AF7]"
                  : "text-[#6B7280]"
              }`}
            >
              <FontAwesomeIcon
                className="h-5 w-5  me-2"
                icon={faUserGroup}
                color={activeNavbar === "roster" ? "#1A56DB" : "#6B7280"}
              />
              {t("Roster")}
            </li>
          )}
          <li
            onClick={() => handleActiveNavbar("mainDashboard")}
            className={`m-3 pe-2 ps-3 py-2 flex items-center rounded-lg ${
              activeNavbar === "mainDashboard"
                ? "bg-[#E1EFFE] text-[#4C6AF7]"
                : "text-[#6B7280]"
            }`}
          >
            <RxDashboard
              className="w-5 h-5 me-3"
              color={activeNavbar === "mainDashboard" ? "#1A56DB" : "#6B7280"}
            />
            {t("Main Dashboard")}
          </li>
          <li
            onClick={() => handleActiveNavbar("location")}
            className={`m-3 pe-2 ps-3 py-2 items-center rounded-lg ${
              activeNavbar === "location"
                ? "bg-[#E1EFFE] text-[#4C6AF7]"
                : "text-[#6B7280]"
            }`}
          >
            <FontAwesomeIcon
              className="h-5 w-5 me-2 mx-auto"
              icon={faLocationDot}
              color={activeNavbar === "location" ? "#1A56DB" : "#6B7280"}
            />
            {t("Geo-Visit Analytics")}
          </li>
          <li
            onClick={() => handleActiveNavbar("message")}
            className={`m-3 pe-2 ps-3 py-2 flex items-center rounded-lg ${
              activeNavbar === "message"
                ? "bg-[#E1EFFE] text-[#4C6AF7]"
                : "text-[#6B7280]"
            }`}
          >
            <BsChatDotsFill
              className="w-5 h-5 me-3"
              color={activeNavbar === "message" ? "#1A56DB" : "#6B7280"}
            />
            {t("Communication")}
          </li>

          <li
            onClick={() => handleActiveNavbar("medical_handouts")}
            className={`m-3 pe-2 ps-3 py-2 flex items-center rounded-lg ${
              activeNavbar === "medical_handouts"
                ? "bg-[#E1EFFE] text-[#4C6AF7]"
                : "text-[#6B7280]"
            }`}
          >
            <TiDocumentText
              className="w-5 h-5 me-3"
              color={
                activeNavbar === "medical_handouts" ? "#1A56DB" : "#6B7280"
              }
            />
            {t("Medical Handouts")}
          </li>

          <li
            onClick={() => handleActiveNavbar("patient_list")}
            className={`m-3 pe-2 ps-3 py-2 flex items-center rounded-lg ${
              activeNavbar === "patient_list"
                ? "bg-[#E1EFFE] text-[#4C6AF7]"
                : "text-[#6B7280]"
            }`}
          >
            <FaHospitalUser
              className="w-5 h-5 me-3"
              color={activeNavbar === "patient_list" ? "#1A56DB" : "#6B7280"}
            />
            {t("Patient List")}
          </li>
          {userType === "ADMIN" && (
            <li
              onClick={() => handleActiveNavbar("user_management")}
              className={`m-3 pe-2 ps-3 py-2 flex items-center rounded-lg ${
                activeNavbar === "user_management"
                  ? "bg-[#E1EFFE] text-[#4C6AF7]"
                  : "text-[#6B7280]"
              }`}
            >
              <FaUserSecret
                className="w-5 h-5 me-3"
                color={
                  activeNavbar === "user_management" ? "#1A56DB" : "#6B7280"
                }
              />
              {t("User Management")}
            </li>
          )}
          <li
            onClick={() => handleActiveNavbar("setting")}
            className={`m-3 pe-2 ps-3 py-2 flex items-center rounded-lg ${
              activeNavbar === "setting"
                ? "bg-[#E1EFFE] text-[#4C6AF7]"
                : "text-[#6B7280]"
            }`}
          >
            <FontAwesomeIcon
              icon={faGear}
              className="w-5 h-5 me-3"
              color={activeNavbar === "setting" ? "#1A56DB" : "#6B7280"}
            />
            {t("Settings")}
          </li>
        </ul>
      )} */}
    </div>
  );
};

export default Navbar;
