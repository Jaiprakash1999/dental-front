import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { setActiveDoctorTab } from "../../../../redux-store/slice/activeDoctorTab";

const Users = () => {
  const dispatch = useDispatch();
  return (
    <div
      style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)" }}
      className="bg-white h-screen overflow-y-scroll border border-t-0 border-r-0 mr-0.5"
    >
      <div className="flex border-b fixed w-[25%] py-2 ps-3 pe-5 justify-between items-center bg-white">
        <div className="text-[#6B7280] uppercase text-sm">My Info</div>
        <button
          onClick={() => {
            dispatch(setActiveDoctorTab(null));
          }}
        >
          <FontAwesomeIcon icon={faXmark} color="#1F2A37" />
        </button>
      </div>

      <div className="pt-10 px-3 pb-20"> Hi JP</div>
    </div>
  );
};

export default Users;
