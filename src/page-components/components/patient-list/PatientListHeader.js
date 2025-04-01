import { useSelector } from "react-redux";
import ParchaaLogo from "../../../images/parchaa.svg";
import ParchaaHip from "../../../images/parchaaHip.svg";
import Bell from "../../../images/bell.svg";

// import Profile from "./Profile";
import { useDispatch } from "react-redux";
import { setActiveNavbarTab } from "../../../redux-store/slice/activeNavbarSlice";
import { clearNotifications } from "../../../redux-store/slice/notificationSlice";
import { useTranslation } from "react-i18next";
// import SearchInput from "../../common-components/SearchInput";
import { useState } from "react";
import UserProfile from "../user-profile/UserProfile";
import { setSelectedUser } from "../../../redux-store/slice/selectedUserSlice";

// import { FaLocationDot } from "react-icons/fa6";

// import { useTranslation } from "react-i18next";
// import { setGlobalSearch } from "../../../redux-store/slice/globalSearchSlice";
// import { fetchLocation } from "../hip/header/fetchLocation";

const PatientListHeader = () => {
  const { t } = useTranslation();
  const unreadCount = useSelector((state) => state.allNotification.unreadCount);
  const dispatch = useDispatch();
  const [openProfile, setOpenProfile] = useState(false);

  const handleActiveNavbar = (value) => {
    dispatch(setActiveNavbarTab(value));
    dispatch(clearNotifications());
    dispatch(setSelectedUser({}));
  };

  // const globalSearch = useSelector((state) => state.globalSearch);
  // const getLocation = (value) => {
  //   dispatch(setGlobalSearch(value));
  // };

  return (
    <div className="fixed border-b w-full bg-white p-1">
      <div className="flex relative justify-between  mx-4 items-center">
        <div className="flex-shrink-0 flex items-center">
          <img src={ParchaaLogo} alt="parcha-logo" />
          <div className="text-primary mx-5">{t("Patient List")}</div>
        </div>

        <div className="flex items-center gap-5 w-[60%]">
          {/* <div className="w-1/2">
            <SearchInput />
          </div> */}
        </div>
        <div className="flex items-center justify-end">
          <button
            className="flex me-6 justify-center"
            onClick={() => handleActiveNavbar("message")}
          >
            <img src={Bell} alt="Bell" />
            {unreadCount > 0 ? (
              <span className="absolute top-3 right-12 bg-red-500 text-white rounded-full px-2 text-xs">
                {unreadCount}
              </span>
            ) : null}
          </button>
          <button
            className=" cursor-pointer"
            onClick={() => {
              setOpenProfile((prev) => !prev);
            }}
          >
            <img src={ParchaaHip} alt="ParchaaHip" />
          </button>
        </div>
        <UserProfile
          openProfile={openProfile}
          setOpenProfile={setOpenProfile}
        />
      </div>
    </div>
  );
};

export default PatientListHeader;
