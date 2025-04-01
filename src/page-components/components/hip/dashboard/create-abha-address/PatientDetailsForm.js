import { useState } from "react";
import { useDispatch } from "react-redux";
import { setDashboardDrawer } from "../../../../../redux-store/slice/checkInDrawerSlice";
import Select from "../../../../common-components/Select";
import { BLOOD_GROUP_OPTIONS, GENDER } from "../../../../constants/Constant";
import {
  faAngleDown,
  faAngleUp,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "../../../../common-components/DatePicker";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrimaryButton from "../../../../common-components/Buttons/PrimaryButton";
import closeCross from "../../../../../images/close_cross.svg";

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

const PatientDetailsForm = ({ setActiveState = () => {} }) => {
  const dispatch = useDispatch();
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    phoneNumber: "",
    age: "",
    dob: "",
    // addressLine: "",
    // district: "",
    // city: "",
    // pincode: "",
    email: "",
    gender: "",
    // referBy: "",
    // referByPhone: "",
    bloodGroup: "",
    addressList: [
      {
        primaryAddress: true,
        address: "",
        district: "",
        state: "",
        pincode: "",
        city: "",
      },
    ],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target || {};
    if (index !== undefined) {
      const addressLine = [...patientInfo.addressList];
      addressLine[index] = {
        ...addressLine[index],
        [name]: value,
      };
      setPatientInfo({
        ...patientInfo,
        addressList: addressLine,
      });
    } else {
      if (name === "phoneNumber" || name === "pincode") {
        const numericValue = value.replace(/\D/g, "");
        // Limit to maximum 10 characters
        const maxLengthValue = numericValue.slice(0, 10);
        setPatientInfo((prev) => ({ ...prev, [name]: maxLengthValue }));
      } else if (name === "age") {
        const age = calculateDobFromAge(value);
        setPatientInfo((prev) => ({
          ...prev,
          dob: moment(age).format("yyyy-MM-DD"),
          [name]: value,
        }));
      } else if (name === "dob") {
        const dob = calculateAgeFromDob(value);
        setPatientInfo((prev) => ({ ...prev, age: dob, [name]: value }));
      } else {
        setPatientInfo((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  const isFormValid = () => {
    const requiredFields = [
      "name",
      "phoneNumber",
      "age",
      "dob",
      // "addressLine",
      // "city",
      // "pincode",
      "gender",
      "bloodGroup",
    ];
    return requiredFields.every((field) => patientInfo[field] !== "");
  };
  // const { onAddNew, isAddPatientLoading } = useAddNewPatient({
  //   patientInfo,
  //   setPatientInfo,
  //   setPatient,
  // });

  const onNext = (e) => {
    e.preventDefault();
    setActiveState("choose_abha_address");
  };

  const onClose = () => {
    dispatch(
      setDashboardDrawer({
        userDrawer: false,
        skipABHA: false,
        createABHAbyAadhaar: false,
        checkInDrawer: false,
        createABHAaddress: false,
      })
    );
  };

  return (
    <div className="mx-3 py-2">
      <div className="flex justify-between">
        <button
          onClick={(e) => {
            e.preventDefault();
            setActiveState("otp_field");
          }}
        >
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </button>
        <h1 className="text-[#6B7280] text-base uppercase font-medium">
          Create ABHA Address
        </h1>

        <button onClick={() => onClose()} className="text-[#6B7280]">
          <img src={closeCross} alt="closeCross" />
        </button>
      </div>

      <h1 className="text-sm mt-3 text-[#9CA3AF]">
        Enter the following details for creation of ABHA address registration
      </h1>

      <div className="flex mt-2 text-sm text-[#2D2E33] flex-col">
        <label className="mb-1">Patient Name*</label>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={patientInfo.name}
          onChange={handleChange}
          className="border focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
        />
      </div>
      <div className="flex items-center gap-3">
        <div className="text-sm text-[#2D2E33] w-1/2 py-2 flex flex-col">
          <div className="mb-1">Gender*</div>
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
            className="border w-full focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
          />
        </div>
        <div className="text-sm text-[#2D2E33] flex flex-col">
          <label className="mb-1">Date of birth*</label>
          <DatePicker
            name="dob"
            dateFormat="yyyy-MM-dd"
            value={patientInfo.dob}
            onChange={handleChange}
            className="border-[#D1D5DB] w-32  focus:border-[#2D2E33] text-sm text-gray-800 border placeholder:text-[#6B7280] focus:outline-none rounded-lg py-1 px-3"
          />
        </div>

        <div className="text-sm flex flex-col text-[#2D2E33]  py-2">
          <label className="mb-1">Age*</label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Age"
            name="age"
            value={patientInfo.age}
            className="border w-12 focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] ps-3"
          />
        </div>
      </div>

      <div className="flex text-sm text-[#2D2E33] my-2 flex-col">
        <label className="mb-1">Mobile Number*</label>
        <input
          type="text" // Use type="text" for desktop users
          id="phoneNumber"
          className="border focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
          name="phoneNumber"
          value={patientInfo.phoneNumber}
          onChange={handleChange}
          placeholder="Enter your mobile number"
          maxLength={10} // Set maximum length to 10 characters
        />
      </div>
      <div className="text-sm text-[#2D2E33] flex  my-2 flex-col">
        <label className="mb-1">Email ID</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="email"
          value={patientInfo.email}
          className="border focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
        />
      </div>

      <div className="text-sm text-[#2D2E33] flex my-2 flex-col">
        <label className="mb-1">Address*</label>
        <textarea
          type="text"
          name="address"
          value={patientInfo.addressList[0].address}
          placeholder="Address"
          onChange={(e) => handleChange(e, 0)}
          className="border focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
        />
      </div>
      <div className=" text-sm text-[#2D2E33] flex my-2 flex-col">
        <label className="mb-1">City*</label>
        <input
          type="text"
          name="city"
          placeholder="city"
          value={patientInfo.addressList[0].city}
          onChange={(e) => handleChange(e, 0)}
          className="border focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
        />
      </div>
      <div className=" text-sm text-[#2D2E33] my-2 flex flex-col">
        <label className="mb-1">Pin code*</label>
        <input
          type="text"
          name="pincode"
          value={patientInfo.addressList[0].pincode}
          onChange={(e) => handleChange(e, 0)}
          placeholder="pincode"
          className="border focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
        />
      </div>

      <div className="text-sm text-[#2D2E33]  my-2 flex-col">
        <label className="mb-1">Blood Group*</label>
        <Select
          options={BLOOD_GROUP_OPTIONS}
          readOnly
          name="bloodGroup"
          value={patientInfo.bloodGroup}
          onChange={handleChange}
        />
      </div>

      <div className="flex bg-white pt-8 pb-2  gap-3 justify-center">
        <PrimaryButton
          onClick={(e) => onNext(e)}
          disabled={!isFormValid()}
          type="submit"
          buttonName="Next"
          className="bg-[#4C6AF7] hover:border-[#D8E3FF] disabled:bg-[#F9FAFB] disabled:border-[#C6C7C9] disabled:text-[#A2A3A7] flex justify-center border border-[#1A56DB] item-center px-8 py-2 rounded-lg text-sm text-[#FFFFFF]"
        />
      </div>
    </div>
  );
};

export default PatientDetailsForm;
