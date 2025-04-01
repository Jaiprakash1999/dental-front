import React from "react";
import Rx from "../../../../images/pdfShowIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { setActiveDoctorTab } from "../../../../redux-store/slice/activeDoctorTab";
import IDOtraining from "../../../../pdf/IDOtraining.pdf";
const DoctorSideBar = () => {
  const dispatch = useDispatch();

  const activeTab = useSelector((state) => state.activeDoctorTab.activeTab);

  const handleActiveTab = (tab) => {
    window.open(IDOtraining, "_blank");
    dispatch(setActiveDoctorTab(tab));
  };

  return (
    <div
      style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)" }}
      className="bg-white border-l-[#E7F4FF] border mt-4 border-t-0 border-r-0 ml-5 h-full"
    >
      <div
        className={`p-4  items-center flex justify-center ${
          activeTab === "Rx" ? "bg-[#F3F4F6] border-[#5850EC] border-l-2" : ""
        }`}
      >
        <button
          onClick={() => handleActiveTab(activeTab === "Rx" ? null : "Rx")}
        >
          <img src={Rx} alt="Rx" height={24} width={24} />
        </button>
      </div>
      <hr className="px-4 mt-1"></hr>
    </div>
  );
};

export default DoctorSideBar;
