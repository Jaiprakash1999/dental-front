import React, { useState } from "react";
import defaultDoctorPhoto from "../../../../../../images/parchaaHip.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import AdminMyProfile from "./AdminMyProfile";

const AdminAccount = () => {
  const [activeAccountTab, setActiveAccountTab] = useState("my-profile");

  return (
    <div>
      <div
        className="m-8 px-4 pt-4 rounded-md"
        style={{ boxShadow: "0 0 4px rgb(44 62 80 / 20%)" }}
      >
        <div className="flex gap-5">
          <div className="ms-4">
            <img
              src={defaultDoctorPhoto}
              alt="defaultDoctorPhoto"
              height={100}
              width={100}
            />
          </div>
          <div>
            <div className="text-[#111928] flex gap-2 items-center font-medium">
              Admin sahab
            </div>
            <div className="text-[#6B7280] text-sm font-normal">
              Medical Staff
            </div>
            <div className="flex w-full gap-4 mt-3">
              <button className=" bg-[#1A56DB] disabled:bg-[#E5E7EB] disabled:border-[#E5E7EA] disabled:text-[#1F2A37] border border-[#1A56DB] px-3 py-1.5 rounded-lg text-sm text-[#FFFFFF]">
                <FontAwesomeIcon icon={faCloudArrowUp} className="me-2" />
                Change picture
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 ms-3">
          <button
            className={`${
              activeAccountTab === "my-profile"
                ? "text-[#1C64F2] border-b border-[#1C64F2]"
                : "text-[#6B7280]"
            } text-sm w-[15%] me-3 pb-3`}
            onClick={() => setActiveAccountTab("my-profile")}
          >
            My Profile
          </button>
        </div>
      </div>
      <AdminMyProfile />
    </div>
  );
};

export default AdminAccount;
