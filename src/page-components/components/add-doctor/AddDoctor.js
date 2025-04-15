import React from "react";
import useAddDoctor from "./hooks/useAddDoctor";
import Modal from "../../common-components/Modal";

const AddDoctor = ({ showModal, setIsDoctorModalOpen }) => {
  const [doctorInfo, setDoctorInfo] = React.useState({
    doctorName: "",
    doctorId: "",
    selectedDate: new Date().toISOString().split("T")[0],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorInfo({
      ...doctorInfo,
      [name]: value,
    });
  };

  const { isAddDoctorLoading, onAddNewDoctor, onAddTimeSlot } = useAddDoctor({
    doctorInfo,
  });

  console.log(doctorInfo, "doctorInfo");

  return (
    <Modal
      showModal={showModal}
      modalWidth="w-[40%]"
      modalHeight="min-h-[50%]"
      onClose={() => setIsDoctorModalOpen(false)}
    >
      <div className="flex  p-5 flex-col gap-4">
        <h1 className="text-[20px] font-semibold">Add Doctor</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="doctorName" className="text-[14px] font-medium">
            Doctor Name
          </label>
          <input
            type="text"
            name="doctorName"
            value={doctorInfo.doctorName}
            onChange={handleChange}
            placeholder="Enter doctor name"
            className="border border-[#D0D5DD] rounded-md p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="doctorId" className="text-[14px] font-medium">
            Doctor ID
          </label>
          <input
            type="text"
            name="doctorId"
            value={doctorInfo.doctorId}
            onChange={handleChange}
            placeholder="Enter doctor ID"
            className="border border-[#D0D5DD] rounded-md p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="doctorId" className="text-[14px] font-medium">
            Doctor ID
          </label>
          <input
            type="text"
            name="doctorId"
            value={doctorInfo.doctorId}
            onChange={handleChange}
            placeholder="Enter doctor ID"
            className="border border-[#D0D5DD] rounded-md p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="doctorId" className="text-[14px] font-medium">
            Select Date
          </label>
          <input
            type="date"
            name="selectedDate"
            value={doctorInfo.selectedDate}
            onChange={handleChange}
            placeholder="Enter doctor ID"
            className="border border-[#D0D5DD] rounded-md p-2"
          />
        </div>
        <div className="flex justify-between items-center gap-5">
          <button
            onClick={(e) => onAddNewDoctor(e)}
            disabled={isAddDoctorLoading}
            className={`bg-blue-500 text-white py-2 px-4 rounded-md ${
              isAddDoctorLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isAddDoctorLoading ? "Adding..." : "Add Doctor"}
          </button>

          <button
            onClick={(e) => onAddTimeSlot(e)}
            disabled={isAddDoctorLoading}
            className={`bg-blue-500 text-white py-2 px-4 rounded-md ${
              isAddDoctorLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isAddDoctorLoading ? "Adding..." : "Add Time Slot"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddDoctor;
