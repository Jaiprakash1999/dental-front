import ParchaaLogo from "../../../../images/parchaa.svg";
import ParchaaHip from "../../../../images/parchaaHip.svg";
import Bell from "../../../../images/bell.svg";
import { useDispatch } from "react-redux";

// import SearchInput from "../../../common-components/SearchInput";
// import TertiaryButton from "../../../common-components/Buttons/TertiaryButton";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { setActiveNavbarTab } from "../../../../redux-store/slice/activeNavbarSlice";
import { clearNotifications } from "../../../../redux-store/slice/notificationSlice";
import { useState } from "react";
import UserProfile from "../../user-profile/UserProfile";
import { setSelectedUser } from "../../../../redux-store/slice/selectedUserSlice";
// import { setSearchRoster } from "../../../../redux-store/slice/searchRosterSlice";

const RosterHeader = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [openProfile, setOpenProfile] = useState(false);
  const unreadCount = useSelector((state) => state.allNotification.unreadCount);

  const handleActiveNavbar = (value) => {
    dispatch(setActiveNavbarTab(value));
    dispatch(clearNotifications());
    dispatch(setSelectedUser({}));
  };

  // const searchRoster = useSelector((state) => state.searchRoster);

  // const handleSearchChange = (event) => {
  //   dispatch(setSearchRoster(event.target.value));
  // };

  return (
    <div className="fixed border-b w-full bg-white p-1">
      <div className="flex relative  justify-between mx-4 items-center">
        <div className="w-[4%] flex items-center">
          <img src={ParchaaLogo} alt="parcha-logo" />
          <div className="text-primary mx-5">{t("Roster")}</div>
        </div>

        <div className="w-[40%]">
          {/* <SearchInput
            placeholder="Search users by Name and Role"
            onChange={handleSearchChange}
            inputValue={searchRoster}
          /> */}
        </div>
        <div className="flex items-center justify-end">
          {/* <TertiaryButton buttonName="Export User Data CSV" /> */}
          <button
            className="flex mx-6 justify-center"
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

export default RosterHeader;
