import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBack from "../../../../images/back_arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { setPrescriptionData } from "../../../../redux-store/slice/prescriptionDataSlice";
import PrimaryButton from "../../../common-components/Buttons/PrimaryButton";
import Bell from "../../../../images/bell.svg";
import ParchaaHip from "../../../../images/parchaaHip.svg";
import EndVisit from "../create-prescription/EndVisit";
// import ReferUser from "../../../../images/refer-arrow1.svg";
import {
  faArrowRightFromBracket,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { setActiveNavbarTab } from "../../../../redux-store/slice/activeNavbarSlice";
import { clearNotifications } from "../../../../redux-store/slice/notificationSlice";
import UserProfile from "../../user-profile/UserProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DoctorHeader = ({ setReferalModal = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state = {} } = location || {};
  const { visit } = state || {};

  const { t } = useTranslation();
  const patientData = useSelector((state) => state.patientDetails);
  const unreadCount = useSelector((state) => state.allNotification.unreadCount);
  const [openProfile, setOpenProfile] = useState(false);
  const [isEndVisit, setIsEndVisit] = useState(false);

  const dispatch = useDispatch();

  const handleActiveNavbar = (value) => {
    navigate("/welcome");
    dispatch(setActiveNavbarTab(value));
    dispatch(clearNotifications());
  };

  const handleNavigate = () => {
    dispatch(
      setPrescriptionData({
        ...patientData,
        chiefComplaint: patientData.chiefComplaint,
      })
    );
    navigate("/doctor/createPrescription", {
      state: { id: patientData.id },
    });
  };

  const onVideoMeet = (e) => {
    e.preventDefault();
    window.open("https://meet.google.com/landing?hs=197&authuser=0", "_blank");
  };

  return (
    <div
      style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)" }}
      className="flex w-full items-center justify-between ps-5 gap-10 text-[#111928] bg-white py-3  text-sm"
    >
      <div className="w-1/3 flex items-center">
        <button onClick={() => navigate("/welcome")}>
          <img src={ArrowBack} alt="ArrowBack" />
        </button>
        <h1 className="text-base ms-10">{t("Patient Details & Records")}</h1>
      </div>
      {visit ? (
        <div className=" items-center gap-5 flex">
          <PrimaryButton
            icon={faVideo}
            buttonName={t("Video Consultation")}
            onClick={onVideoMeet}
            showIcon
          />
          <PrimaryButton
            onClick={handleNavigate}
            width="w-fit"
            showIcon
            buttonName={t("Create Prescription")}
          />
          <button
            onClick={() => setIsEndVisit(true)}
            className="bg-[#C81E1E] px-4 py-2 disabled:bg-[#E5E7EB] disabled:border-[#E5E7EA] disabled:text-[#1F2A37]  justify-center border border-[#C81E1E] item-center rounded-lg text-sm text-[#FFFFFF]"
          >
            <span className="me-2">{t("End Visit")}</span>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </button>
        </div>
      ) : null}
      <div className="items-center w-[8%] flex  gap-5">
        <button
          // onClick={() => setReferalModal(true)}
          className="flex justify-center"
        >
          {/* <img src={ReferUser} alt="ReferUser" /> */}
        </button>
        <button
          className="flex justify-center"
          onClick={() => handleActiveNavbar("message")}
        >
          <img src={Bell} alt="Bell" />
          {unreadCount > 0 ? (
            <span className="absolute top-3 right-15 bg-red-500 text-white rounded-full px-2 text-xs">
              {unreadCount}
            </span>
          ) : null}
        </button>
        <button
          className=" cursor-pointer"
          onClick={() => setOpenProfile((prev) => !prev)}
        >
          <img src={ParchaaHip} alt="ParchaaHip" height={28} width={28} />
        </button>
      </div>
      <UserProfile openProfile={openProfile} setOpenProfile={setOpenProfile} />
      {isEndVisit ? (
        <EndVisit showModal={isEndVisit} onClose={() => setIsEndVisit(false)} />
      ) : null}
    </div>
  );
};

export default DoctorHeader;
