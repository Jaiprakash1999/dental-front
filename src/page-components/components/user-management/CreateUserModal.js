import React, { useCallback, useEffect, useRef, useState } from "react";
import Modal from "../../common-components/Modal";
import useCreateUser from "./hooks/useCreateUser";
import { useTranslation } from "react-i18next";
import TertiaryButton from "../../common-components/Buttons/TertiaryButton";
import PrimaryButton from "../../common-components/Buttons/PrimaryButton";
import Webcam from "react-webcam";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faCircleUser,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FaCamera } from "react-icons/fa6";
import { FaCloudUploadAlt } from "react-icons/fa";
import SecondaryButton from "../../common-components/Buttons/SecondaryButton";
import FileUpload from "../../../images/file_upload.svg";
import Select from "../../common-components/Select";
import { USER_TYPE_OPTIONS } from "../../constants/Constant";
import { USER_TYPE } from "../../utils/userType";
import SearchSelectFromAPI from "../../common-components/SearchSelectFromAPI";
import useGetAllMMUhead from "./hooks/useGetAllMMUhead";
import { formatArrayForMMUhead } from "../../utils/formateArray";

const CreateUserModal = ({
  isCreateUserModal = null,
  setIsCreateUserModal = () => {},
  getAllUsers = () => {},
  isEditable = false,
  currentItem = {},
  setCurrentItem = () => {},
  setIsEditable = () => {},
}) => {
  const { t } = useTranslation();
  const {
    username,
    userType,
    name,
    mobileNumber,
    email,
    age,
    signature,
    stamp,
    photo,
    id,
    headId,
    headName,
    registrationNo,
  } = currentItem || {};

  const [userInfo, setUserInfo] = useState({
    id: 0,
    username: "",
    password: "",
    confirmPassword: "",
    userType: isCreateUserModal || "",
    name: "",
    mobileNumber: "",
    email: "",
    age: 0,
    signature: "",
    stamp: "",
    photo: "",
    mmuHead: headName,
    headId: headId,
    registrationNumber: registrationNo,
  });

  const [password, setPassword] = useState({
    password: true,
    confirmPassword: true,
  });

  useEffect(() => {
    setUserInfo((prev) => ({
      ...prev,
      userType: userType || isCreateUserModal,
      name: name,
      id: id,
      username: username,
      email: email,
      age: age,
      signature: signature,
      photo: photo,
      stamp: stamp,
      mobileNumber: mobileNumber,
      headId: headId,
      mmuHead: headName,
      registrationNumber: registrationNo,
    }));
  }, [
    isCreateUserModal,
    age,
    email,
    mobileNumber,
    name,
    photo,
    signature,
    stamp,
    userType,
    username,
    id,
    headName,
    headId,
    isEditable,
    registrationNo,
  ]);

  useEffect(() => {
    if (!isEditable) {
      setCurrentItem({});
    }
  }, [isEditable, setCurrentItem]);

  const handleInputChange = (e) => {
    const { name, value, type, id } = e.target || {};
    if (name === "name") {
      const textValue = value.replace(/[^A-Za-z ]/g, "");
      setUserInfo((prev) => ({ ...prev, [name]: textValue }));
    } else if (name === "mobileNumber") {
      const numericValue = value.replace(/\D/g, "");
      const maxLengthValue = numericValue.slice(0, 10);
      setUserInfo((prev) => ({ ...prev, [name]: maxLengthValue }));
    } else if (name === "mmuHead" && id !== undefined) {
      setUserInfo((prev) => ({ ...prev, [name]: value, headId: id }));
    } else {
      setUserInfo((prev) => ({
        ...prev,
        [name]: type === "number" ? parseFloat(value) : value,
      }));
    }
  };

  const onReset = () => {
    if (isEditable) {
      setUserInfo(currentItem);
    } else {
      setUserInfo({
        username: "",
        password: "",
        userType: "",
        headId: null,
        name: "",
        mobileNumber: "",
        email: "",
        age: 0,
        signature: "",
        stamp: "",
        photo: "",
        confirmPassword: "",
      });
    }
  };
  const fileInputRef = useRef(null);
  const signatureRef = useRef(null);
  const stampRef = useRef(null);

  const handleSignautreUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo((prev) => ({
          ...prev,
          signature: reader.result.split(",")[1],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureClick = () => {
    if (signatureRef.current) {
      signatureRef.current.click();
    }
  };

  const handelStampClick = () => {
    if (stampRef.current) {
      stampRef.current.click();
    }
  };

  const handleStampRef = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo((prev) => ({
          ...prev,
          stamp: reader.result.split(",")[1],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo((prev) => ({
          ...prev,
          photo: reader.result.split(",")[1],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const webcamRef = useRef(null);
  const [isWebcamOpen, setWebcamOpen] = useState(false);

  const toggleWebcam = () => {
    setWebcamOpen((prevState) => !prevState);
  };

  const isFormValid = () => {
    let requiredFields = [
      "username",
      "password",
      "confirmPassword",
      "userType",
      "name",
      "mobileNumber",
      "age",
      "signature",
      "stamp",
    ];
    if (isEditable) {
      requiredFields = [
        "username",
        "userType",
        "name",
        "mobileNumber",
        "age",
        "signature",
        "stamp",
      ];
    }
    if (userInfo.mobileNumber?.length > 0) {
      return (
        userInfo.mobileNumber.length === 10 &&
        requiredFields.every((field) => userInfo[field] !== "")
      );
    } else {
      return requiredFields.every((field) => userInfo[field] !== "");
    }
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot({
        width: 1450,
        height: 1080,
      });
      setUserInfo((prev) => ({ ...prev, photo: imageSrc.split(",")[1] }));
      setWebcamOpen(false); // Close webcam after capturing the image
    }
  }, [webcamRef]);

  const onCloseModal = () => {
    setIsEditable(false);
    setIsCreateUserModal(null);
    setUserInfo({
      id: 0,
      username: "",
      password: "",
      confirmPassword: "",
      userType: isCreateUserModal || "",
      name: "",
      mobileNumber: "",
      email: "",
      age: 0,
      signature: "",
      stamp: "",
      photo: "",
      mmuHead: "",
      headId: "",
      registrationNumber: "",
    });
  };

  const { allMMUhead, isHeadLoading, getAllMMUhead } = useGetAllMMUhead();

  const { onAddUser, isUserCreating } = useCreateUser({
    userInfo,
    getAllUsers,
    setIsCreateUserModal,
    isCreateUserModal,
    onReset,
    onCloseModal,
  });

  return (
    <div>
      <Modal
        showModal={isCreateUserModal !== null}
        onClose={onCloseModal}
        modalHeight="h-[90%]"
        modalWidth="w-[80%]"
      >
        <div className="p-5 relative">
          <div className="flex mb-5 relative flex-col items-center justify-center">
            <div className=" w-20 h-20 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden">
              {isWebcamOpen && (
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className=" object-cover rounded-full w-20 h-20"
                />
              )}
              {userInfo.photo && !isWebcamOpen && (
                <img
                  src={`data:image/jpeg;base64,${userInfo.photo}`}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              )}
              {!isWebcamOpen && !userInfo.photo && (
                <FontAwesomeIcon icon={faCircleUser} size="5x" color="#2323" />
              )}
            </div>
          </div>

          <div className="flex w-full my-3  justify-between items-center">
            <button
              onClick={isWebcamOpen ? capture : toggleWebcam}
              className="flex active:animate-bounce gap-2 hover:border-2 w-[45%] h-9 border disabled:bg-[#F9FAFB] items-center justify-center bg-white border-[#C6C7C9] item-center rounded-lg text-sm text-[#1F2A37]"
            >
              <FaCamera />
              {isWebcamOpen ? `${t("Click Photo")}` : `${t("Open Camera")}`}
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={handleImageClick}
              className="flex ctive:animate-bounce gap-2 w-[45%] hover:border-2 h-9 border disabled:bg-[#F9FAFB] items-center justify-center bg-white border-[#C6C7C9] item-center py-2 rounded-lg text-sm text-[#1F2A37]"
            >
              <FaCloudUploadAlt />
              {t("Upload Photo")}
            </button>
          </div>
          <div className="grid gap-5 grid-cols-3">
            <div className="my-2">
              <div className="text-[#5E6066] mb-2.5">{t("Full Name")}*</div>
              <div className="flex">
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  placeholder={t("Name")}
                  className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
              </div>
            </div>
            <div className="my-2">
              <div className="text-[#5E6066] mb-2.5">{t("Age")}*</div>
              <div className="flex">
                <input
                  type="number"
                  name="age"
                  min={0}
                  value={userInfo.age}
                  onChange={handleInputChange}
                  placeholder={t("Age")}
                  className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
              </div>
            </div>
            <div className="my-2">
              <div className="text-[#5E6066] mb-2.5">{t("Mobile Number")}*</div>
              <div className="flex">
                <input
                  type="text"
                  name="mobileNumber"
                  value={userInfo.mobileNumber}
                  onChange={handleInputChange}
                  placeholder={t("Mobile Number")}
                  className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
              </div>
            </div>
            <div className="my-2">
              <div className="text-[#5E6066] mb-2.5">{t("User Name")}*</div>
              <div className="flex">
                <input
                  type="text"
                  name="username"
                  value={userInfo.username}
                  onChange={handleInputChange}
                  placeholder={t("Username")}
                  className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
              </div>
            </div>
            <div className="my-2">
              <div className="text-[#5E6066] mb-2.5">{t("Email")}</div>
              <div className="flex">
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  placeholder={t("Email")}
                  className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
              </div>
            </div>
            <div className="my-2">
              <div className="text-[#5E6066] mb-2.5">
                {t("Registration Number")}
              </div>
              <div className="flex">
                <input
                  type="text"
                  name="registrationNumber"
                  value={userInfo.registrationNumber}
                  onChange={handleInputChange}
                  placeholder={t("Registration Number")}
                  className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
              </div>
            </div>
            {isEditable && (
              <div className="my-2">
                <div className="text-[#5E6066] mb-2.5">{t("User Type")}*</div>
                <div className="flex">
                  <Select
                    options={USER_TYPE_OPTIONS}
                    readOnly
                    disabled
                    name="userType"
                    upIcon={faAngleUp}
                    downIcon={faAngleDown}
                    openTopPosition="top-2"
                    closeTopPosition="top-2"
                    onChange={handleInputChange}
                    defaultOption={{
                      label: USER_TYPE[userInfo?.userType],
                      value: userInfo?.userType,
                    }}
                    placeholder={t("User Type")}
                    className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                  />
                </div>
              </div>
            )}
            {userInfo?.userType === "MMUSTAFF" ? (
              <div className="my-2">
                <div className="text-[#5E6066] mb-2.5">
                  {t("Assign MMU Head")}*
                </div>
                <div className="flex">
                  <SearchSelectFromAPI
                    getData={getAllMMUhead}
                    options={formatArrayForMMUhead(allMMUhead)}
                    isLoading={isHeadLoading}
                    name="mmuHead"
                    onChange={handleInputChange}
                    defaultOptions={{
                      label: userInfo.mmuHead,
                      value: userInfo.mmuHead,
                      id: userInfo.headId,
                    }}
                    allowPressEnter={false}
                    placeholder={t("Type")}
                    className="focus:outline-none text-[#2D2E33] font-normal bg-[#F9FAFB] placeholder:font-normal rounded-lg ps-4 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2 w-full focus:border-[#2D2E33]"
                  />
                </div>
              </div>
            ) : null}
            <div className="my-2 relative">
              <div className="text-[#5E6066] mb-2.5">{t("Password")}*</div>
              <div className="flex">
                <input
                  type={password.password ? "password" : "text"}
                  name="password"
                  value={userInfo.password}
                  onChange={handleInputChange}
                  placeholder={t("password")}
                  className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setPassword((prev) => ({
                      ...prev,
                      password: !prev.password,
                    }));
                  }}
                  className={`px-2 absolute ${
                    password.password ? "top-10" : "top-10"
                  } right-0`}
                >
                  <FontAwesomeIcon
                    color="#6B7280"
                    icon={password.password ? faEyeSlash : faEye}
                  />
                </button>
              </div>
            </div>
            <div className="my-2 relative">
              <div className="text-[#5E6066] mb-2.5">
                {t("Confirm Password")}*
              </div>
              <div className="">
                <input
                  type={password.confirmPassword ? "password" : "text"}
                  name="confirmPassword"
                  value={userInfo.confirmPassword}
                  onChange={handleInputChange}
                  placeholder={t("Confirm Password")}
                  className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
                />
                {userInfo?.password !== userInfo.confirmPassword && (
                  <p className="text-[#E02424] font-normal text-xs m-1">
                    Password and Confirm Password do not match
                  </p>
                )}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setPassword((prev) => ({
                      ...prev,
                      confirmPassword: !prev.confirmPassword,
                    }));
                  }}
                  className={`px-2 absolute ${
                    password.confirmPassword ? "top-10" : "top-10"
                  } right-0`}
                >
                  <FontAwesomeIcon
                    color="#6B7280"
                    icon={password.confirmPassword ? faEyeSlash : faEye}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-between w-[60%]">
            <div className="">
              {userInfo.signature && (
                <div className="w-full">
                  <div className="flex w-full flex-shrink-0">
                    {t(" Uploaded Signature")}
                  </div>
                  <img
                    src={`data:image/jpeg;base64,${userInfo.signature}`}
                    alt="signature Preview"
                    className="w-1/2 h-1/2 object-cover"
                  />
                </div>
              )}
              <div className="text-[#5E6066] mb-2.5">
                {t("Upload Signature")}
              </div>
              <div className="border-dashed h-fit border gap-3 flex flex-col rounded-lg py-6 px-12 bg-[#F9FAFB] border-[#C6C7C9] justify-center items-center">
                <div className="flex gap-2 justify-center flex-col">
                  <img
                    src={FileUpload}
                    alt="FileUpload"
                    className="h-12 w-12 mx-auto"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={signatureRef}
                    onChange={handleSignautreUpload}
                    className="hidden"
                  />
                </div>
                <SecondaryButton
                  buttonName={t("Browse Files")}
                  onClick={handleSignatureClick}
                />
              </div>
            </div>
            <div className="">
              {userInfo.stamp && (
                <div className="w-full">
                  <div className="flex w-full flex-shrink-0">
                    {t("Uploaded Stamp")}
                  </div>
                  <img
                    src={`data:image/jpeg;base64,${userInfo.stamp}`}
                    alt="stamp Preview"
                    className="w-1/2 h-1/2 object-cover"
                  />
                </div>
              )}
              <div className="text-[#5E6066] mb-2.5">{t("Upload Stamp")}</div>
              <div className="border-dashed h-fit border gap-3 flex flex-col rounded-lg py-6 px-12 bg-[#F9FAFB] border-[#C6C7C9] justify-center items-center">
                <div className="flex gap-2 justify-center flex-col">
                  <img
                    src={FileUpload}
                    alt="FileUpload"
                    className="h-12 w-12 mx-auto"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={stampRef}
                    onChange={handleStampRef}
                    className="hidden"
                  />
                </div>
                <SecondaryButton
                  buttonName={t("Browse Files")}
                  onClick={handelStampClick}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-5 mt-5 justify-end">
            <TertiaryButton
              buttonName={t("Reset")}
              width="w-fit"
              onClick={onReset}
            />
            <PrimaryButton
              buttonName={t("Save")}
              width="w-fit"
              onClick={() => onAddUser(isEditable ? "put" : "post")}
              disabled={isUserCreating || !isFormValid()}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateUserModal;
