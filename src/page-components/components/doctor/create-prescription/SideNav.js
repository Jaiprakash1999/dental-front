import React from "react";
import MedicalNote from "../../../../images/Note.svg";
import Vital from "../../../../images/Vital.svg";
import Rx from "../../../../images/Rx.svg";

const SideNav = ({
  setIsPastPrescription = () => {},
  setActiveTab = () => {},
  actvieTab,
}) => {
  return (
    <div className="bg-white mt-4 h-full shadow">
      <div className="py-2 px-4">
        <img src={MedicalNote} alt="medical-note" />
      </div>
      <div className="py-2 px-4">
        <img src={Vital} alt="Vital" />
      </div>
      <div
        className={`py-2 px-4 flex justify-center ${
          actvieTab === "Rx" ? "bg-[#F3F4F6] border-[#5850EC] border-l-2" : ""
        }`}
      >
        <button
          onClick={() => {
            setIsPastPrescription((prev) => !prev);
            setActiveTab((prev) => (prev === "Rx" ? "" : "Rx"));
          }}
        >
          <img src={Rx} alt="Rx" />
        </button>
      </div>
    </div>
  );
};

export default SideNav;
