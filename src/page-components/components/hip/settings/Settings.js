import { faLongArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
// import Navbar from "../../../navbar/Navbar";
import AlertSettings from "./AlertSettings";
import EmailSettings from "./EmailSettings";
import Navbar from "../../navbar/Navbar";

const Settings = () => {
  const navigate = useNavigate();
  return (
    <div className=" relative">
      <div className="p-4 z-50 bg-white flex fixed w-full border-b shadow-sm">
        <button onClick={() => navigate("/welcome")}>
          <FontAwesomeIcon icon={faLongArrowLeft} color="#6B7280" />
        </button>
        <div className="ms-12 text-[#111928]">Settings and Preferences</div>
      </div>
      <div className="flex bg-white z-0 py-14">
        <div
          className="border-l border h-screen fixed"
          style={{ boxShadow: "0 0 1px rgb(44 62 80 / 20%)" }}
        >
          <Navbar />
        </div>
        <div className="ml-auto w-[95.7%]">
          <div className="flex">
            <div className="w-1/2">
              <AlertSettings />
            </div>
            <div className="w-1/2">
              <EmailSettings />
            </div>
          </div>
          <div
            style={{ boxShadow: "0 0 1px rgb(44 62 80 / 20%)" }}
            className="bg-white text-sm bottom-0 p-3 border-t fixed w-[95.7%] flex justify-between items-center"
          >
            <button className="border active:border-[#1C64F2] py-2 px-4 rounded-lg border-[#E7F4FF]">
              Cancel
            </button>
            <button className="bg-[#1C64F2] px-4 py-2 text-white rounded-lg">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
