import useGetMmuStaffList from "./hooks/useGetMmuStaffList";
import ListLoader from "../../../common-components/ListLoader";
import PrimaryButton from "../../../common-components/Buttons/PrimaryButton";
import { useDispatch } from "react-redux";
import { setActiveNavbarTab } from "../../../../redux-store/slice/activeNavbarSlice";
import { setSelectedUser } from "../../../../redux-store/slice/selectedUserSlice";
import { useTranslation } from "react-i18next";
import { USER_TYPE } from "../../../utils/userType";
import { clearMessages } from "../../../../redux-store/slice/notificationSlice";

const MMUstaffList = ({
  setActiveComponent = () => {},
  setSelectedHeadID = () => {},
  setSelectedItem = () => {},
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { mmuStaff, isMmuStaffLoading } = useGetMmuStaffList({
    userType: "MMUHEAD",
  });
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));

  const onPatientList = (item) => {
    const { id } = item || {};
    setSelectedHeadID(id);
    setSelectedItem(item);
    setActiveComponent("patient_list");
  };

  const onMessage = (user) => {
    dispatch(setSelectedUser(user));
    dispatch(clearMessages());
    dispatch(setActiveNavbarTab("message"));
  };

  return (
    <div className="p-5 text-sm">
      <div className="border">
        <div className="grid text-base border-b uppercase items-center grid-cols-5 bg-[#F9FAFB] text-[#6B7280]">
          <div className="border-r p-2 border-[#D7D7D7]">{t("MMU Type")}</div>
          <div className="border-r p-2 border-[#D7D7D7]">{t("Name")}</div>
          <div className="border-r p-2 border-[#D7D7D7]">
            {t("Mobile Number")}
          </div>
          <div className="border-r p-2 border-[#D7D7D7]">
            {t("Patients Managed")}
          </div>
          <div className="p-2">{t("Contact")}</div>
        </div>
        <div>
          {isMmuStaffLoading ? (
            <ListLoader />
          ) : (
            mmuStaff.map((item, index) => {
              const { name, userType, isDelete, mobileNumber, id } = item || {};
              return (
                <div
                  key={index}
                  className={`${
                    isDelete ? "text-secondary" : "hover:bg-[#F9FAFF]"
                  } grid  grid-cols-5 border-b last:border-b-0 items-center`}
                >
                  <div className="p-2">{USER_TYPE[userType] || "--"}</div>

                  <div className="p-2">{name}</div>
                  <div className="p-2">{mobileNumber} </div>
                  <div className="p-2">
                    <PrimaryButton
                      buttonName={t("Consults")}
                      onClick={() => onPatientList(item)}
                    />
                  </div>
                  <div className="p-2">
                    <PrimaryButton
                      buttonName={t("Message")}
                      onClick={() => onMessage(item)}
                      disabled={userDetails.id === id || isDelete}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default MMUstaffList;
