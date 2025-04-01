import React, { useCallback, useRef, useState } from "react";
import { FaCamera, FaCloudUploadAlt } from "react-icons/fa";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../../../../common-components/Select";
import SearchSelectFromAPI from "../../../../../common-components/SearchSelectFromAPI";
import {
  BLOOD_GROUP_OPTIONS,
  GENDER,
  TAGS,
} from "../../../../../constants/Constant";
import { formatArrayForHabitations } from "../../../../../utils/formateArray";
import PrimaryButton from "../../../../../common-components/Buttons/PrimaryButton";
import { setDashboardDrawer } from "../../../../../../redux-store/slice/checkInDrawerSlice";
import {
  faAngleDown,
  faAngleUp,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAddPatientWithoutAbha from "./hooks/useAddPatientWithoutAbha";
import useGetHabitations from "./hooks/useGetHabitations";
import closeCross from "../../../../../../images/close_cross.svg";
import Webcam from "react-webcam";
import { useTranslation } from "react-i18next";
import ExistingPatient from "./ExistingPatient";

const calculateDobFromAge = (age) => {
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - age;
  return new Date(birthYear, 0, 1); // Assume DOB is January 1st for simplicity
};

const calculateAgeFromDob = (dob) => {
  const birthDate = new Date(dob);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const AddNewPatientWithoutAbha = ({ setPatient = () => {} }) => {
  const [showExistingPatientModal, setExistingPatientModal] = useState(false);
  const [isOnClear, setIsOnClear] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const globalSearch = useSelector((state) => state.globalSearch);
  const currentCoordinate = useSelector((state) => state.currentCoordinate);

  const { latitude, longitude } = currentCoordinate || {};
  const { habitation, isHbaitaionLoading, getHabiations } = useGetHabitations();
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    fatherName: null,
    photo: null,
    phoneNumber: "",
    age: "",
    dob: "",
    bloodGroup: "",
    dateOfBirth: "",
    monthOfBirth: "",
    yearOfBirth: "",
    gender: "",
    habitat: "others (others, others)",
    habitatId: 139,
    address: "",
    district: globalSearch?.address?.state_district,
    state: globalSearch?.address?.state,
    pincode: globalSearch?.address?.postcode,
    tehsil: globalSearch?.address?.county,
    city: globalSearch?.address?.suburb || globalSearch?.address?.town,
    // latitude: globalSearch?.lat,
    // longitude: globalSearch?.lon,
    latitude: latitude,
    longitude: longitude,
    patientTag: "Others",
  });

  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPatientInfo((prev) => ({
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

  const handleChange = (e) => {
    const { name, value, id } = e.target || {};
    if (name === "pincode") {
      const numericValue = value.replace(/\D/g, "");
      // Limit to maximum 10 characters
      const maxLengthValue = numericValue.slice(0, 10);
      setPatientInfo((prev) => ({ ...prev, [name]: maxLengthValue }));
    } else if (name === "name") {
      const textValue = value.replace(/[^A-Za-z ]/g, "");
      setPatientInfo((prev) => ({ ...prev, [name]: textValue }));
    } else if (name === "phoneNumber") {
      const numericValue = value.replace(/\D/g, "");
      // Limit to maximum 10 characters
      if (numericValue.length > 0 && "012345".includes(numericValue[0])) {
        // If the first character is restricted, do not update the state
        return;
      }
      const maxLengthValue = numericValue.slice(0, 10);
      setPatientInfo((prev) => ({ ...prev, [name]: maxLengthValue }));
    } else if (name === "age") {
      const numericValue = value.replace(/\D/g, "");
      // Limit to maximum 3 characters
      const maxLengthValue = numericValue.slice(0, 3);
      const age = calculateDobFromAge(maxLengthValue);
      const foramatedAge = moment(age).format("yyyy-MM-DD");
      const [year, month, date] = foramatedAge.split("-");
      setPatientInfo((prev) => ({
        ...prev,
        dob: foramatedAge,
        yearOfBirth: year,
        monthOfBirth: month,
        dateOfBirth: date,
        [name]: maxLengthValue,
      }));
    } else if (name === "dob") {
      const dob = calculateAgeFromDob(value);
      setPatientInfo((prev) => ({
        ...prev,
        age: dob,
        yearOfBirth: value.substring(0, 4),
        dateOfBirth: value.substring(8),
        monthOfBirth: value.substring(5, 7),
        [name]: value,
      }));
    } else if (name === "habitat" && id !== undefined) {
      setPatientInfo((prev) => ({ ...prev, [name]: value, habitatId: id }));
    } else {
      setPatientInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isFormValid = () => {
    const requiredFields = [
      "name",
      "age",
      "dob",
      "gender",
      "habitat",
      "patientTag",
    ];
    if (patientInfo.phoneNumber.length > 0) {
      return (
        patientInfo.phoneNumber.length === 10 &&
        requiredFields.every((field) => patientInfo[field] !== "")
      );
    } else {
      return requiredFields.every((field) => patientInfo[field] !== "");
    }
  };
  const { onAddNew, isAddPatientLoading, existingPatientList } =
    useAddPatientWithoutAbha({
      patientInfo,
      setPatientInfo,
      setPatient,
      setExistingPatientModal,
    });

  const onClose = () => {
    dispatch(
      setDashboardDrawer({
        userDrawer: false,
        checkInDrawer: false,
        skipABHA: false,
      })
    );
  };

  const webcamRef = useRef(null);
  const [isWebcamOpen, setWebcamOpen] = useState(false);

  const toggleWebcam = () => {
    setWebcamOpen((prevState) => !prevState);
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot({
        width: 1450,
        height: 1080,
      });
      setPatientInfo((prev) => ({ ...prev, photo: imageSrc.split(",")[1] }));
      setWebcamOpen(false);
    }
  }, [webcamRef]);

  return (
    <div className="mx-3 py-2">
      <div className="flex justify-between">
        <h1 className="text-[#6B7280] text-base uppercase font-medium">
          {t("Add Patient")}
        </h1>

        <button onClick={() => onClose()} className="text-[#6B7280]">
          <img src={closeCross} alt="closeCross" />
        </button>
      </div>

      <div className="flex mb-5 relative flex-col items-center justify-center">
        <div className=" w-20 h-20 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden">
          {isWebcamOpen && (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className=" object-cover rounded-full w-20 h-20"
              screenshotQuality={1} // Maximum quality
            />
          )}
          {patientInfo.photo && !isWebcamOpen && (
            <img
              src={`data:image/jpeg;base64,${patientInfo.photo}`}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          )}
          {!isWebcamOpen && !patientInfo.photo && (
            <FontAwesomeIcon icon={faCircleUser} size="5x" color="#2323" />
          )}
        </div>
      </div>

      <div className="flex w-full my-3  justify-between items-center">
        <button
          onClick={isWebcamOpen ? capture : toggleWebcam}
          className="flex active:animate-bounce gap-2 hover:border-2 w-[45%] h-9 border disabled:bg-[#F9FAFB] items-center justify-center bg-white border-[#C6C7C9] item-center rounded-lg text-sm text-[#1F2A37]"
        >
          <FaCamera />{" "}
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
          className="flex  active:animate-bounce gap-2 w-[45%] hover:border-2 h-9 border disabled:bg-[#F9FAFB] items-center justify-center bg-white border-[#C6C7C9] item-center py-2 rounded-lg text-sm text-[#1F2A37]"
        >
          <FaCloudUploadAlt />
          {t("Upload Photo")}
        </button>
      </div>

      <div className="flex mt-2 text-sm text-[#2D2E33] flex-col">
        <label className="mb-1">{t("Patient Name")}*</label>
        <input
          type="text"
          name="name"
          pattern="[A-Za-z]+"
          placeholder={t("first name, middle name, last name")}
          value={patientInfo.name}
          onChange={handleChange}
          className="border  bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
        />
      </div>
      <div className="flex mt-2 text-sm text-[#2D2E33] flex-col">
        <label className="mb-1">{t("Patient's Father Name")}</label>
        <input
          type="text"
          name="fatherName"
          pattern="[A-Za-z]+"
          placeholder={t("Patient's Father Name")}
          value={patientInfo.fatherName}
          onChange={handleChange}
          className="border  bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
        />
      </div>
      <div className="flex items-center mt-1 gap-3">
        <div className="text-sm text-[#2D2E33] w-1/2 py-2 flex flex-col">
          <div className="mb-1">{t("Gender")}*</div>
          <Select
            options={GENDER}
            name="gender"
            placeholder="gender"
            value={patientInfo.gender}
            onChange={handleChange}
            required={false}
            readOnly
            upIcon={faAngleUp}
            openTopPosition="top-2"
            closeTopPosition="top-2"
            downIcon={faAngleDown}
            className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
          />
        </div>
        <div className="text-sm text-[#2D2E33] flex flex-col">
          <label className="mb-1">{t("Date of Birth")}*</label>
          <input
            type="date"
            name="dob"
            dateFormat="yyyy-MM-dd"
            value={patientInfo.dob}
            onChange={handleChange}
            style={{ padding: "7px" }}
            max={new Date().toISOString().split("T")[0]}
            className="border-[#D1D5DB] bg-[#F9FAFB] uppercase w-32  focus:border-[#2D2E33] text-sm text-gray-800 border placeholder:text-[#6B7280] focus:outline-none rounded-lg px-3"
          />
        </div>

        <div className="text-sm flex flex-col text-[#2D2E33]  py-2">
          <label className="mb-1">{t("Age")}*</label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Age"
            name="age"
            value={patientInfo.age}
            className="border w-12 bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] ps-3.5"
          />
        </div>
      </div>
      <div className="text-sm text-[#2D2E33] mb-2 flex-col">
        <label className="mb-1">{t("Blood Group")}</label>
        <Select
          options={BLOOD_GROUP_OPTIONS}
          readOnly
          name="bloodGroup"
          value={patientInfo.bloodGroup}
          onChange={handleChange}
          className="focus:outline-none text-[#2D2E33] bg-[#F9FAFB] font-normal rounded-lg ps-4 border placeholder:text-[#9CA3AF] placeholder:font-normal  border-[#D1D5DB] text-sm py-2 w-full focus:border-[#2D2E33]"
        />
      </div>
      <div className="flex text-sm text-[#2D2E33] mb-2 mt-1 flex-col">
        <label className="mb-1">{t("Mobile Number")}</label>
        <input
          type="text" // Use type="text" for desktop users
          id="phoneNumber"
          className="border bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
          name="phoneNumber"
          value={patientInfo.phoneNumber}
          onChange={handleChange}
          placeholder="Enter your mobile number"
          maxLength={10} // Set maximum length to 10 characters
        />
      </div>
      <div className="text-sm text-[#2D2E33] mb-2 flex-col">
        <label className="mb-1">{t("Habitation")}*</label>
        <SearchSelectFromAPI
          getData={getHabiations}
          options={formatArrayForHabitations(habitation)}
          isLoading={isHbaitaionLoading}
          name="habitat"
          onChange={handleChange}
          defaultOptions={{
            label: patientInfo.habitat,
            value: patientInfo.habitat,
            id: patientInfo.habitatId,
          }}
          allowPressEnter={false}
          isOnClear={isOnClear}
          setIsOnClear={setIsOnClear}
          placeholder={t("Type")}
          className="focus:outline-none text-[#2D2E33] font-normal bg-[#F9FAFB] placeholder:font-normal rounded-lg ps-4 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2 w-full focus:border-[#2D2E33]"
        />
      </div>
      <div className="text-sm text-[#2D2E33] flex mt-1 mb-2 flex-col">
        <label className="mb-1">{t("Address")}</label>
        <textarea
          type="text"
          name="address"
          value={patientInfo.address}
          placeholder={t("Address")}
          rows={3}
          onChange={(e) => handleChange(e, 0)}
          className="border bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm mb-0.5 text-[#111928]">{t("Tags")}*</label>
        <Select
          options={TAGS}
          readOnly
          name="patientTag"
          upIcon={faAngleUp}
          downIcon={faAngleDown}
          openTopPosition="top-2"
          closeTopPosition="top-2"
          onChange={handleChange}
          defaultOption={{
            label: patientInfo.patientTag,
            value: patientInfo.patientTag,
          }}
          className="focus:outline-none text-[#2D2E33] bg-[#F9FAFB] font-normal rounded-lg ps-4 border placeholder:text-[#9CA3AF] placeholder:font-normal  border-[#D1D5DB] text-sm py-2 w-full focus:border-[#2D2E33]"
        />
      </div>

      <div className="flex bg-white py-2  gap-3 justify-center">
        <PrimaryButton
          onClick={(e) => onAddNew(e)}
          disabled={!isFormValid() || isAddPatientLoading}
          type="submit"
          buttonName={t("Add Patient")}
          className="bg-[#4C6AF7] hover:border-[#D8E3FF] disabled:bg-[#F9FAFB] disabled:border-[#C6C7C9] disabled:text-[#A2A3A7] flex justify-center border border-[#1A56DB] item-center px-6 py-2 rounded-lg text-sm text-[#FFFFFF]"
        />
      </div>
      {showExistingPatientModal ? (
        <ExistingPatient
          showExistingPatientModal={showExistingPatientModal}
          setExistingPatientModal={setExistingPatientModal}
          existingPatientList={existingPatientList}
          setPatient={setPatient}
          onAddNew={onAddNew}
        />
      ) : null}
    </div>
  );
};

export default AddNewPatientWithoutAbha;
