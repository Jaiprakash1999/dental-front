import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Expand from "../../../../images/arrow-up-right-down-left.svg";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveDoctorTab } from "../../../../redux-store/slice/activeDoctorTab";
import { setDoctorNotes } from "../../../../redux-store/slice/doctorNotes";
import CreateNewNote from "./CreateNewNote";
import ExistingDoc from "./ExistingDoc";

const DoctorNotes = () => {
  const dispatch = useDispatch();
  const isDoctorNotes = useSelector((state) => state.doctorNotes);
  const [activeNoteTab, setActiveNoteTab] = useState("create_new_note");

  return (
    <div
      style={
        !isDoctorNotes ? { boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)" } : {}
      }
      className={`bg-white ${
        isDoctorNotes ? "" : "h-screen border"
      } overflow-y-scroll border-t-0 border-r-0 mr-0.5`}
    >
      {!isDoctorNotes ? (
        <div className="flex border-b fixed w-[25%] py-2 ps-3 pe-5 justify-between items-center bg-white">
          <div className="text-[#6B7280] uppercase text-sm">MY NOTE</div>
          <div className="flex gap-4">
            <button onClick={() => dispatch(setDoctorNotes(true))}>
              <img src={Expand} alt="Expand" />
            </button>
            <button
              onClick={() => {
                dispatch(setActiveDoctorTab(null));
              }}
            >
              <FontAwesomeIcon icon={faXmark} color="#1F2A37" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-[#111928] px-3 py-2">
          My Note
          <hr className="-mx-3 my-2"></hr>
        </div>
      )}
      <div className={`${isDoctorNotes ? "" : "pt-10 pb-32"} px-3 `}>
        <div className={`flex ${isDoctorNotes ? "" : "mt-4"} w-full`}>
          <button
            onClick={() => setActiveNoteTab("create_new_note")}
            className={`${
              activeNoteTab === "create_new_note"
                ? "bg-[#1A56DB] text-[#FFFFFF]"
                : "bg-white text-[#1F2A37]"
            } w-full disabled:bg-[#E5E7EB]
          disabled:border-[#E5E7EA] disabled:text-[#1F2A37] flex justify-center
          border border-r-0 item-center px-4 py-2 rounded-lg rounded-r-none text-sm
          `}
          >
            Create New Note
          </button>
          <button
            onClick={() => setActiveNoteTab("notes&document")}
            className={`${
              activeNoteTab === "notes&document"
                ? "bg-[#1A56DB] text-[#FFFFFF]"
                : "bg-white text-[#1F2A37]"
            } flex border w-full items-center justify-center
           item-center border-l-0 px-4 py-2 rounded-lg  rounded-l-none text-sm
        `}
          >
            Notes & Documents
          </button>
        </div>
        {activeNoteTab === "create_new_note" ? <CreateNewNote /> : null}
        {activeNoteTab === "notes&document" ? <ExistingDoc /> : null}
      </div>
    </div>
  );
};

export default DoctorNotes;
