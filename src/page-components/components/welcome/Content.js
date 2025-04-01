import React, { useState } from "react";
import HIPdashboard from "../hip/dashboard/visit-list/HIPdashboard";
import CreateAppointment from "../hip/dashboard/create-appointment/CreateAppointment";
import { useSelector } from "react-redux";
import AddNewPatientWithoutAbha from "../hip/dashboard/add-new-patient-options/skip-abha/AddNewPatientWithoutAbha";

const Content = () => {
  const dashboardDrawer = useSelector((state) => state.dashboardDrawer);
  const [patient, setPatient] = useState({});

  return (
    <div className="flex w-full border border-t-0 justify-between">
      <div className="w-full border-r">
        <HIPdashboard />
      </div>
      <div
        className={
          dashboardDrawer.checkInDrawer || dashboardDrawer.userDrawer
            ? "w-[34%]"
            : "w-0"
        }
      >
        {dashboardDrawer.checkInDrawer && (
          <div className="w-full">
            <CreateAppointment patient={patient} />
          </div>
        )}
        {dashboardDrawer.userDrawer ? (
          <div className=" w-full">
            <AddNewPatientWithoutAbha setPatient={setPatient} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Content;
