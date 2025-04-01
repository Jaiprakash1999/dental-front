import React from "react";
import ListLoader from "../../common-components/ListLoader";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../../redux-store/slice/selectedUserSlice";
import gray_user from "../../../images/gray_user.svg";
import blue_user from "../../../images/blue_user.svg";
import { useTranslation } from "react-i18next";
import { USER_TYPE } from "../../utils/userType";
import { clearMessages } from "../../../redux-store/slice/notificationSlice";

const UserList = ({ mmuStaff, isMmuStaffLoading, activeSideBar }) => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.selectedUser);
  const allNotification = useSelector((state) => state.allNotification);
  const { messages = [] } = allNotification || {};

  const { t } = useTranslation();

  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));

  return (
    <div className="mb-2">
      <div className="mb-2  rounded-t-none ">{t("Messages")}</div>
      {isMmuStaffLoading ? (
        <ListLoader />
      ) : (
        <div>
          {mmuStaff.map((staff) => {
            const { name, id, userType, photo, isDelete } = staff || {};

            if (id === userDetails?.id || isDelete) {
              return null;
            }
            return (
              <div
                key={id}
                onClick={() => {
                  dispatch(setSelectedUser(staff));
                  dispatch(clearMessages());
                }}
                className={`px-2 py-2 my-1 flex items-center gap-3 rounded-md ${
                  (id === selectedUser?.id ||
                    id === messages[messages?.length - 1]?.id) &&
                  activeSideBar === "user_list"
                    ? "bg-[#E7EBFF] text-[#4C6AF7]"
                    : "text-secondary"
                }`}
              >
                {photo === null ? (
                  <img
                    src={
                      (id === selectedUser?.id ||
                        id === messages[messages?.length - 1]?.id) &&
                      activeSideBar === "user_list"
                        ? blue_user
                        : gray_user
                    }
                    alt="user"
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <img
                    src={`data:image/jpeg;base64,${photo}`}
                    alt="user"
                    className="h-10 w-10 rounded-full"
                  />
                )}
                <div>
                  {name}
                  <div>{USER_TYPE[userType]}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserList;
