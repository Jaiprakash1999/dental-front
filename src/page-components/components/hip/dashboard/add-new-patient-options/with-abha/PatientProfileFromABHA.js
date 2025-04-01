import React from "react";
import DownloadAbhaCard from "../../../../../../images/downloadABHAcard.svg";
import Printer from "../../../../../../images/printer.svg";
import Skeleton from "react-loading-skeleton";
import closeCross from "../../../../../../images/close_cross.svg";

const PatientProfileFromABHA = ({
  patientProfile,
  onAddPatientinHIPviaABHA,
  isAddPatientViaABHAinHIPLoading,
  onClose,
  inputNumber,
  isProfileLoading,
  getAbhaCard,
  isAbhaCardDataLoading,
}) => {
  const {
    abhaNumber,
    preferredAbhaAddress,
    mobile,
    name,
    yearOfBirth = "",
    dayOfBirth = "",
    monthOfBirth = "",
    gender,
    email,
    address,
    photo,
  } = patientProfile || {};

  let selctedMethod = "Mobile";
  if (inputNumber.length === 12) {
    selctedMethod = "Aadhaar";
  } else if (inputNumber.length === 14) {
    selctedMethod = "ABHA Number";
  } else if (inputNumber.length === 10) {
    selctedMethod = "Mobile";
  }
  const dateOfBirth = `${dayOfBirth}/${monthOfBirth}/${yearOfBirth}`;
  let fullGender = gender;
  if (gender === "M") {
    fullGender = "Male";
  } else if (gender === "F") {
    fullGender = "Female";
  } else if (gender === "O") {
    fullGender = "Other";
  }

  return (
    <div className="text-sm">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-[#6B7280] text-base uppercase font-medium">
          Login with {selctedMethod}
        </h1>
        <button onClick={() => onClose()} className="text-[#6B7280]">
          <img src={closeCross} alt="closeCross" />
        </button>
      </div>
      <div className="text-[#7F8185]">Patient’s Details</div>
      <div>
        <div className="flex w-full gap-3 items-center">
          {isProfileLoading ? (
            <Skeleton width={90} height={130} />
          ) : (
            <div className="w-full">
              <img
                src={`data:image/jpeg;base64,${photo}`}
                alt="userPhoto"
                className="border border-[#A2A3A7] h-32"
              />
            </div>
          )}
          <div className="w-full">
            <div>
              <div className="text-[#2D2E33] mb-1">Patient’s Name </div>
              {isProfileLoading ? (
                <Skeleton height={36} borderRadius={7} />
              ) : (
                <input
                  className="border w-full border-[#D1D5DB] bg-[#ECECED] text-[#2D2E33] px-3 rounded-lg py-2"
                  value={name || ""}
                  disabled
                />
              )}
            </div>
            <div className="mt-2">
              <div className="text-[#2D2E33] mb-1">ABHA Number</div>
              {isProfileLoading ? (
                <Skeleton height={36} borderRadius={7} />
              ) : (
                <input
                  className="border border-[#D1D5DB] bg-[#ECECED] text-[#2D2E33] px-3 rounded-lg py-2"
                  value={abhaNumber || ""}
                  disabled
                />
              )}
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="text-[#2D2E33] mb-1">ABHA Address</div>
          {isProfileLoading ? (
            <Skeleton height={36} borderRadius={7} />
          ) : (
            <input
              disabled
              className="border w-full border-[#D1D5DB] bg-[#ECECED] text-[#2D2E33] px-3 rounded-lg py-2"
              value={preferredAbhaAddress || ""}
            />
          )}
        </div>
        <div className="mt-2 gap-2 flex">
          <div className="w-1/3">
            <div className="text-[#2D2E33] mb-1">Gender</div>
            {isProfileLoading ? (
              <Skeleton height={36} borderRadius={7} />
            ) : (
              <input
                disabled
                className="border w-full border-[#D1D5DB] bg-[#ECECED] text-[#2D2E33] px-3 rounded-lg py-2"
                value={fullGender || ""}
              />
            )}
          </div>
          <div>
            <div className="text-[#2D2E33] mb-1">Date of Birth</div>
            {isProfileLoading ? (
              <Skeleton height={36} borderRadius={7} width={180} />
            ) : (
              <input
                disabled
                className="border w-full border-[#D1D5DB] bg-[#ECECED] text-[#2D2E33] px-3 rounded-lg py-2"
                value={dateOfBirth || ""}
              />
            )}
          </div>
        </div>
        <div className="mt-2">
          <div className="text-[#2D2E33] mb-1">Mobile Number</div>
          {isProfileLoading ? (
            <Skeleton height={36} borderRadius={7} />
          ) : (
            <input
              disabled
              className="border w-full border-[#D1D5DB] bg-[#ECECED] text-[#2D2E33] px-3 rounded-lg py-2"
              value={mobile || ""}
            />
          )}
        </div>
        <div className="mt-2">
          <div className="text-[#2D2E33] mb-1">Email ID</div>
          {isProfileLoading ? (
            <Skeleton height={36} borderRadius={7} />
          ) : (
            <input
              disabled
              className="border w-full border-[#D1D5DB] bg-[#ECECED] text-[#2D2E33] px-3 rounded-lg py-2"
              value={email || "N/A"}
            />
          )}
        </div>
        <div className="mt-2">
          <div className="text-[#2D2E33] mb-1">Address</div>
          {isProfileLoading ? (
            <Skeleton height={56} borderRadius={7} />
          ) : (
            <textarea
              disabled
              className="border w-full border-[#D1D5DB] bg-[#ECECED] text-[#2D2E33] px-3 rounded-lg py-2"
              value={address || ""}
            />
          )}
        </div>
      </div>

      <div className="text-[#2D2E33] mt-9 text-sm">ABHA Card</div>
      <div className="flex mt-2 gap-4 justify-between">
        <button
          onClick={getAbhaCard}
          disabled={isAbhaCardDataLoading}
          className="hover:border-2 active:animate-bounce h-10 bg-[#F9FAFB] w-full text-[#1F2A37] gap-2 px-2 text-sm flex justify-center items-center py-2 border border-[#9CA3AF] rounded-lg"
        >
          <img src={DownloadAbhaCard} alt="downloadABHAcard" />
          Download
        </button>
        <button
          onClick={getAbhaCard}
          disabled={isAbhaCardDataLoading}
          className="active:animate-bounce hover:border-2 h-10 bg-[#F9FAFB] w-full gap-2 px-4 text-[#1F2A37] text-sm flex justify-center items-center py-2 border border-[#9CA3AF] rounded-lg"
        >
          <img src={Printer} alt="printer" /> Print
        </button>
      </div>
      <div className="my-4">
        <button
          onClick={onAddPatientinHIPviaABHA}
          disabled={isAddPatientViaABHAinHIPLoading}
          className="bg-[#4C6AF7] w-full hover:border-[#D8E3FF] disabled:bg-[#F9FAFB] disabled:border-[#C6C7C9] disabled:text-[#A2A3A7] flex justify-center border border-[#1A56DB] item-center px-6 py-2 rounded-lg text-sm text-[#FFFFFF]"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default PatientProfileFromABHA;
