import ParchaaLogo from "../../../../images/parchaa.svg";
import ParchaaHip from "../../../../images/parchaaHip.svg";
import DatePicker from "../../../common-components/DatePicker";
import Bell from "../../../../images/bell.svg";
import { useDispatch, useSelector } from "react-redux";
import { setPatientVisitDate } from "../../../../redux-store/slice/patientVisitDate";
import { setMmuUnit } from "../../../../redux-store/slice/mmuUnitSlice";
import moment from "moment";
import { setGlobalSearch } from "../../../../redux-store/slice/globalSearchSlice";
import { FaLocationDot } from "react-icons/fa6";
import { fetchLocation } from "./fetchLocation";
import { useTranslation } from "react-i18next";
import { setActiveNavbarTab } from "../../../../redux-store/slice/activeNavbarSlice";
import { clearNotifications } from "../../../../redux-store/slice/notificationSlice";
import { setCurrentCoordinate } from "../../../../redux-store/slice/coordinateSlice";
import { useState } from "react";
import UserProfile from "../../user-profile/UserProfile";
import Select from "../../../common-components/Select";
import { formatArray } from "../../../utils/formateArray";
import { MMU_UNIT } from "../../../constants/Constant";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { formatTime } from "../../../utils/formatDateTime";
import { setSelectedUser } from "../../../../redux-store/slice/selectedUserSlice";
const { REACT_APP_MMU_UNIT } = process.env || {};

const Header = () => {
  const dispatch = useDispatch();
  const [openProfile, setOpenProfile] = useState(false);
  const currentDate = useSelector((state) => state.patientVisitDate);
  const globalSearch = useSelector((state) => state.globalSearch);
  const currentCoordinate = useSelector((state) => state.currentCoordinate);
  const unreadCount = useSelector((state) => state.allNotification.unreadCount);
  const mmuUnitName = useSelector((state) => state.mmuUnitName);

  const handleActiveNavbar = (value) => {
    dispatch(setActiveNavbarTab(value));
    dispatch(clearNotifications());
    dispatch(setSelectedUser({}));
  };

  const { t } = useTranslation();
  const getLocation = (value) => {
    const { lat, lon } = value || {};
    dispatch(setGlobalSearch(value));
    dispatch(setCurrentCoordinate({ latitude: lat, longitude: lon }));
  };

  const handleDateChange = (e) => {
    const value = moment(e.target.value).format("yyyy-MM-DD");
    dispatch(setPatientVisitDate(value));
  };

  const onPreviousDate = () => {
    const newDate = moment(currentDate)
      .subtract(1, "days")
      .format("YYYY-MM-DD");
    dispatch(setPatientVisitDate(newDate));
  };

  const onNextDate = () => {
    const newDate = moment(currentDate).add(1, "days").format("YYYY-MM-DD");
    dispatch(setPatientVisitDate(newDate));
  };

  const handleMMUunitChange = (e) => {
    const { value } = e.target || {};
    dispatch(setMmuUnit(value));
  };

  const mixCordinates =
    currentCoordinate.latitude &&
    `latitude: ${currentCoordinate.latitude}, longitude: ${currentCoordinate.longitude}`;

  return (
    <div className="fixed border-b w-full bg-white p-1">
      <div className="flex relative  mx-4 items-center">
        <div className="w-[4%]">
          <img src={ParchaaLogo} alt="parcha-logo" />
        </div>
        <div className="flex justify-between w-[96%]">
          <div className="flex w-1/3 items-center">
            <div className="w-[51.5%]">
              <DatePicker
                onChange={handleDateChange}
                value={currentDate}
                onPreviousDate={onPreviousDate}
                onNextDate={onNextDate}
              />
            </div>
            <div className="mx-3">
              <Select
                options={formatArray(MMU_UNIT)}
                onChange={handleMMUunitChange}
                defaultOption={{ label: mmuUnitName, value: mmuUnitName }}
                readOnly
                disabled={REACT_APP_MMU_UNIT === undefined ? false : true}
                required={false}
                upIcon={faAngleUp}
                openTopPosition="top-2"
                showIcon={REACT_APP_MMU_UNIT === undefined ? true : false}
                closeTopPosition="top-2"
                downIcon={faAngleDown}
                className="border w-fit bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2.5 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
              />
            </div>
          </div>

          <div className="flex w-2/3 items-center justify-end text-sm">
            {currentCoordinate.timestamp && (
              <div className="mx-5 text-[#DC4747]">
                *This location was last fetched at{" "}
                {formatTime(currentCoordinate.timestamp)}
              </div>
            )}

            <div className="flex w-1/2 me-5  items-center relative">
              <div className="absolute left-4">
                <FaLocationDot color="#6B7280" />
              </div>
              <input
                autoFocus
                type="text"
                readOnly
                value={globalSearch.display_name || mixCordinates}
                placeholder={t("Fetch Location to update")}
                className="focus:outline-none border-r-0 rounded-r-none text-[#2D2E33] rounded-lg ps-10 pe-2 border placeholder:text-[#A2A3A7] border-[#D1D5DB] text-sm py-2.5 w-full focus:border-[#2D2E33]"
              />
              <button
                onClick={() => fetchLocation(getLocation)}
                className="text-[#2D2E33] active:bg-black focus:border-[#2D2E33] py-2.5 px-5 text-sm rounded-lg rounded-l-none border-[#D1D5DB] border"
              >
                {t("Fetch")}
              </button>
            </div>
            <div className="flex items-center gap-5">
              <button
                className="flex justify-center"
                onClick={() => handleActiveNavbar("message")}
              >
                <img src={Bell} alt="Bell" />
                {unreadCount > 0 ? (
                  <span className="absolute top-3 right-11 bg-red-500 text-white rounded-full px-2 text-xs">
                    {unreadCount}
                  </span>
                ) : null}
              </button>
              <button
                className=" cursor-pointer"
                onClick={() => setOpenProfile((prev) => !prev)}
              >
                <img src={ParchaaHip} alt="ParchaaHip" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserProfile openProfile={openProfile} setOpenProfile={setOpenProfile} />
    </div>
  );
};

export default Header;
