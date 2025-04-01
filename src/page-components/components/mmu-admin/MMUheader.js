import { useTranslation } from "react-i18next";
import ParchaaLogo from "../../../images/parchaa.svg";
import ParchaaHip from "../../../images/parchaaHip.svg";
import Bell from "../../../images/bell.svg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setActiveNavbarTab } from "../../../redux-store/slice/activeNavbarSlice";
import { clearNotifications } from "../../../redux-store/slice/notificationSlice";
import { setGlobalSearch } from "../../../redux-store/slice/globalSearchSlice";
import { fetchLocation } from "../hip/header/fetchLocation";
import { FaLocationDot } from "react-icons/fa6";
import { useState } from "react";
import UserProfile from "../user-profile/UserProfile";
import { setSelectedUser } from "../../../redux-store/slice/selectedUserSlice";

const MMUheader = () => {
  const { t } = useTranslation();
  const globalSearch = useSelector((state) => state.globalSearch);
  const unreadCount = useSelector((state) => state.allNotification.unreadCount);
  const dispatch = useDispatch();

  const handleActiveNavbar = (value) => {
    dispatch(setActiveNavbarTab(value));
    dispatch(clearNotifications());
    dispatch(setSelectedUser({}));
  };

  const getLocation = (value) => {
    dispatch(setGlobalSearch(value));
  };

  const [openProfile, setOpenProfile] = useState(false);

  return (
    <div className="fixed border-b w-full bg-white p-1">
      <div className="flex relative  justify-between mx-4 items-center">
        <div className="flex items-center">
          <img src={ParchaaLogo} alt="parcha-logo" />
          <div className="text-primary mx-5">{t("GeoHealth Insights")}</div>
        </div>

        <div className="flex w-[50%]">
          <div className="w-full">
            <div className="flex items-center relative">
              <div className="absolute left-4">
                <FaLocationDot color="#6B7280" />
              </div>
              <input
                autoFocus
                type="text"
                readOnly
                value={globalSearch.display_name}
                placeholder={t("Fetch Location to update")}
                className="focus:outline-none border-r-0 rounded-r-none text-[#2D2E33] rounded-lg ps-10 pe-2 border placeholder:text-[#A2A3A7] border-[#D1D5DB] text-sm py-2 w-full focus:border-[#2D2E33]"
              />
              <button
                onClick={() => fetchLocation(getLocation)}
                className="text-[#2D2E33] active:bg-black focus:border-[#2D2E33] py-2 px-5 text-sm rounded-lg rounded-l-none border-[#D1D5DB] border"
              >
                {t("Fetch")}
              </button>
            </div>
          </div>
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

export default MMUheader;
