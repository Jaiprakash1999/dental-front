import React from "react";
import Content from "./Content";
import Navbar from "../navbar/Navbar";
import Header from "../hip/header/Header";
import { useSelector } from "react-redux";
import MmuAdmin from "../mmu-admin/MmuAdmin";
import Roster from "../mmu-staff/roster/Roster";
// import Communication from "../mmu-staff/communication/Communication";
import RosterHeader from "../mmu-staff/roster/RosterHeader";
import MMUheader from "../mmu-admin/MMUheader";
import CommunicationHeader from "../communication/CommunicationHeader";
import Communication from "../communication/Communication";
import Settings from "../settings/Settings";
import SettingsHeader from "../settings/SettingsHeader";
import MedicalHandout from "../medical-handouts/MedicalHandout";
import MedicalHandHeader from "../medical-handouts/MedicalHandHeader";
import UsersManagementHeader from "../user-management/UsersManagementHeader";
import UsersManagement from "../user-management/UsersManagement";
import PatientListHeader from "../patient-list/PatientListHeader";
import PatientList from "../patient-list/PatientList";
import MainDashboard from "../main-dashboard/MainDashboard";
import MainDashboardHeader from "../main-dashboard/MainDashboardHeader";

const Welcome = () => {
  const activeNavbar = useSelector((state) => state.activeNavbar);
  // const activeDrawer = useSelector((state) => state.dashboardDrawer);
  return (
    <div className="w-full h-screen relative">
      <div className=" z-40 relative">
        {activeNavbar === "roster" && <RosterHeader />}
        {activeNavbar === "home" && <Header />}
        {activeNavbar === "location" && <MMUheader />}
        {activeNavbar === "message" && <CommunicationHeader />}
        {activeNavbar === "setting" && <SettingsHeader />}
        {activeNavbar === "medical_handouts" && <MedicalHandHeader />}
        {activeNavbar === "user_management" && <UsersManagementHeader />}
        {activeNavbar === "patient_list" && <PatientListHeader />}
        {activeNavbar === "mainDashboard" && <MainDashboardHeader />}
      </div>
      <div className="flex w-full relative pt-14">
        <div
          // className={`${
          //   activeDrawer.checkInDrawer ||
          //   activeDrawer.userDrawer ||
          //   activeNavbar !== "home"
          //     ? "w-fit"
          //     : "w-[15%]"
          // } fixed z-50 h-screen shadow`}
          className="w-fit fixed z-50 h-screen shadow"
        >
          <Navbar />
        </div>

        <div
          // className={`${
          //   activeDrawer.userDrawer ||
          //   activeDrawer.checkInDrawer ||
          //   activeNavbar !== "home"
          //     ? "w-[94.8%]"
          //     : "w-[85%]"
          // } ml-auto`}
          className="w-[94.8%] ml-auto"
        >
          {activeNavbar === "home" && <Content />}
          {activeNavbar === "location" && <MmuAdmin />}
          {activeNavbar === "roster" && <Roster />}
          {activeNavbar === "message" && <Communication />}
          {activeNavbar === "setting" && <Settings />}
          {activeNavbar === "medical_handouts" && <MedicalHandout />}
          {activeNavbar === "user_management" && <UsersManagement />}
          {activeNavbar === "patient_list" && <PatientList />}
          {activeNavbar === "mainDashboard" && <MainDashboard />}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
