import { configureStore } from "@reduxjs/toolkit";
import addPatientSlice from "../slice/addPatientSlice";
import addPatientByAbhaSlice from "../slice/addPatientByAbhaSlice";
import prescriptionDataSlice from "../slice/prescriptionDataSlice";
import doctorDrawer from "../slice/doctorDrawer";
import activeDoctorTab from "../slice/activeDoctorTab";
import saveTemplateModal from "../slice/saveTemplateModal";
import doctorNotes from "../slice/doctorNotes";
import createNewNote from "../slice/createNewNote";
import patientVisitDate from "../slice/patientVisitDate";
import patientVisitList from "../slice/patientVisitList";
import patientDetails from "../slice/patientDetails";
import doctorProfileSlice from "../slice/doctorProfileSlice";
import patientRecordSlice from "../slice/patientRecordSlice";
import checkInDrawerSlice from "../slice/checkInDrawerSlice";
import globalSearchSlice from "../slice/globalSearchSlice";
import profilePhotoUploadSlice from "../slice/profilePhotoUplaodSlice";
import activeNavbarSlice from "../slice/activeNavbarSlice";
import selectedUserSlice from "../slice/selectedUserSlice";
import notificationSlice from "../slice/notificationSlice";
import searchRosterSlice from "../slice/searchRosterSlice";
import coordinateSlice from "../slice/coordinateSlice";
import mmuUnitSlice from "../slice/mmuUnitSlice";

export const store = configureStore({
  reducer: {
    addNewPatient: addPatientSlice,
    addNewPatientByAbha: addPatientByAbhaSlice,
    prescriptionData: prescriptionDataSlice,
    doctorDrawer: doctorDrawer,
    activeDoctorTab: activeDoctorTab,
    isSaveTemplate: saveTemplateModal,
    doctorNotes: doctorNotes,
    createNewNote: createNewNote,
    patientVisitDate: patientVisitDate,
    patientVisitList: patientVisitList,
    patientDetails: patientDetails,
    doctorProfile: doctorProfileSlice,
    patientRecords: patientRecordSlice,
    dashboardDrawer: checkInDrawerSlice,
    globalSearch: globalSearchSlice,
    profilePhotoUploaded: profilePhotoUploadSlice,
    activeNavbar: activeNavbarSlice,
    selectedUser: selectedUserSlice,
    allNotification: notificationSlice,
    searchRoster: searchRosterSlice,
    currentCoordinate: coordinateSlice,
    mmuUnitName: mmuUnitSlice,
  },
});
