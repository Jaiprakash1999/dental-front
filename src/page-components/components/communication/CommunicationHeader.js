import { useTranslation } from "react-i18next";
import ParchaaLogo from "../../../images/parchaa.svg";
import ParchaaHip from "../../../images/parchaaHip.svg";
import Bell from "../../../images/bell.svg";
import { useSelector } from "react-redux";
import { clearNotifications } from "../../../redux-store/slice/notificationSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import UserProfile from "../user-profile/UserProfile";
// import SearchInput from "../../common-components/SearchInput";

const CommunicationHeader = () => {
  const { t } = useTranslation();
  const unreadCount = useSelector((state) => state.allNotification.unreadCount);
  const dispatch = useDispatch();
  const [openProfile, setOpenProfile] = useState(false);
  const onClear = () => {
    dispatch(clearNotifications());
  };

  return (
    <div className="fixed border-b w-full bg-white p-1">
      <div className="flex relative  justify-between mx-4 items-center">
        <div className="flex items-center">
          <img src={ParchaaLogo} alt="parcha-logo" />
          <div className="text-primary mx-5">
            {t("Messaging & Notifications")}
          </div>
        </div>

        {/* <div className="w-[40%]">
          <SearchInput />
        </div> */}
        <div className="flex items-center justify-end">
          <button className="flex me-6 justify-center" onClick={onClear}>
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

export default CommunicationHeader;
