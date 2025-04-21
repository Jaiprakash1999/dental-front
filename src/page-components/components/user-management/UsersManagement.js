import CreateUserModal from "./CreateUserModal";
import useGetAllUser from "../user-management/hooks/useGetAllUser";
import { useState } from "react";
import PrimaryButton from "../../common-components/Buttons/PrimaryButton";
import { useTranslation } from "react-i18next";
import ListLoader from "../../common-components/ListLoader";
import moment from "moment";
import AlertButton from "../../common-components/Buttons/AlertButton";
import useDeleteUser from "./hooks/useDeleteUser";
import { USER_TYPE } from "../../utils/userType";
import { ToastContainer } from "react-toastify";
import { FaPen } from "react-icons/fa6";
import AddDoctor from "../add-doctor/AddDoctor";

const UsersManagement = () => {
  const { t } = useTranslation();
  const [isCreateUserModal, setIsCreateUserModal] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const { allUsers, isUserLoading, getAllUsers } = useGetAllUser();
  const { onDelete, isUserDeleting } = useDeleteUser({ getAllUsers });
  const [currentItem, setCurrentItem] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);

  const onOpenModal = (value) => {
    setCurrentItem({});
    setIsCreateUserModal(value);
  };

  const onEdit = (item) => {
    const { userType } = item || {};
    setIsEditable(true);
    setCurrentItem(item);
    setIsCreateUserModal(userType);
  };

  return (
    <div className="m-5 text-sm text-primary">
      <ToastContainer />
      <div className="my-5">
        <div className="flex items-center justify-between">
          <div className="text-base font-medium">{t("Active Users")}</div>
          <div className="gap-5 flex items-center">
            <PrimaryButton
              buttonName={t("Add Doctor")}
              onClick={() => setIsDoctorModalOpen((prev) => !prev)}
            />
            <PrimaryButton
              buttonName={t("Add MMU Staff")}
              onClick={() => onOpenModal("MMUSTAFF")}
            />
            <PrimaryButton
              buttonName={t("Add MMU Head")}
              onClick={() => onOpenModal("MMUHEAD")}
            />
          </div>
        </div>
        <div className="mt-5 border">
          <div className="grid px-2 py-2 text-base border-b uppercase items-center grid-cols-6 bg-[#F9FAFB] text-[#6B7280]">
            <div>{t("Username")}</div>
            <div>{t("Name")}</div>
            <div>{t("Mobile Number")}</div>
            <div>{t("Role")}</div>
            <div>{t("Created At")}</div>
          </div>
          {isUserLoading ? (
            <ListLoader />
          ) : (
            <>
              {allUsers.length === 0 ? (
                <div className="p-2 flex justify-center text-red-500">
                  No Users found !
                </div>
              ) : (
                allUsers.map((user) => {
                  const {
                    id,
                    username,
                    name,
                    createdAt,
                    mobileNumber,
                    userType,
                    isDelete,
                  } = user || {};
                  if (isDelete) {
                    return null;
                  }
                  return (
                    <div
                      key={id}
                      className="grid grid-cols-6 border-b items-center last:border-b-0 p-2"
                    >
                      <div>{username}</div>
                      <div>{name}</div>
                      <div>{mobileNumber}</div>
                      <div>{USER_TYPE[userType] || "--"}</div>
                      <div>
                        {moment(createdAt).format("DD-MM-yyyy | hh:mm A")}
                      </div>
                      {userType === "ADMIN" ? null : (
                        <div className="flex items-center justify-between">
                          <button onClick={() => onEdit(user)}>
                            <FaPen color="#4C6AF7" />
                          </button>

                          <AlertButton
                            buttonName={
                              isUserDeleting && selectedId === id
                                ? "Deleting"
                                : t("Delete")
                            }
                            onClick={() => {
                              setSelectedId(id);
                              onDelete(id);
                            }}
                            disabled={isUserDeleting && selectedId === id}
                          />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </>
          )}
        </div>

        <hr className="my-5"></hr>

        <div className="text-base font-medium">{t("Inactive Users")}</div>

        <div className="mt-5 border">
          <div className="grid px-2 py-2 text-base border-b uppercase items-center grid-cols-5 bg-[#F9FAFB] text-[#6B7280]">
            <div>{t("Username")}</div>
            <div>{t("Name")}</div>
            <div>{t("Mobile Number")}</div>
            <div>{t("Role")}</div>
            <div>{t("Created At")}</div>
          </div>
          {isUserLoading ? (
            <ListLoader />
          ) : (
            <>
              {allUsers.length === 0 ? (
                <div className="p-2 flex justify-center text-red-500">
                  No Users found !
                </div>
              ) : (
                allUsers.map((user) => {
                  const {
                    id,
                    username,
                    name,
                    createdAt,
                    mobileNumber,
                    userType,
                    isDelete,
                  } = user || {};
                  if (!isDelete) {
                    return null;
                  }
                  return (
                    <div
                      key={id}
                      className="grid grid-cols-5 border-b items-center last:border-b-0 p-2"
                    >
                      <div>{username}</div>
                      <div>{name}</div>
                      <div>{mobileNumber}</div>
                      <div>{USER_TYPE[userType] || "--"}</div>
                      <div>
                        {moment(createdAt).format("DD-MM-yyyy | hh:mm A")}
                      </div>
                      {/* <div className="flex items-center justify-between">
                        <button onClick={() => onEdit(user)}>
                          <FaPen color="#4C6AF7" />
                        </button>

                        <AlertButton
                          buttonName={
                            isUserDeleting && selectedId === id
                              ? "Deleting"
                              : "Delete"
                          }
                          onClick={() => {
                            setSelectedId(id);
                            onDelete(id);
                          }}
                          disabled={isUserDeleting && selectedId === id}
                        />
                      </div> */}
                    </div>
                  );
                })
              )}
            </>
          )}
        </div>
      </div>
      <div></div>
      <CreateUserModal
        isCreateUserModal={isCreateUserModal}
        setIsCreateUserModal={setIsCreateUserModal}
        getAllUsers={getAllUsers}
        isEditable={isEditable}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        setIsEditable={setIsEditable}
      />
      <div>
        {isDoctorModalOpen && (
          <AddDoctor
            showModal={isDoctorModalOpen}
            setIsDoctorModalOpen={setIsDoctorModalOpen}
          />
        )}
      </div>
    </div>
  );
};

export default UsersManagement;
