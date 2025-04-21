import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env;

const useAddDoctor = ({ doctorInfo = {} }) => {
  const [isAddDoctorLoading, setIsAddDoctorLoading] = useState(false);

  const onAddNewDoctor = async (e) => {
    e.preventDefault();
    setIsAddDoctorLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `${REACT_APP_API_KEY}/api/v1/mmu/doctor`,
        {
          doctorName: doctorInfo?.doctorName,
          doctorId: doctorInfo?.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      toast.success("Doctor added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error adding doctor");
    } finally {
      setIsAddDoctorLoading(false);
    }
  };

  const onAddTimeSlot = async (e) => {
    e.preventDefault();
    setIsAddDoctorLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `${REACT_APP_API_KEY}/api/v1/mmu/doctor/slots/akshat123/${doctorInfo.selectedDate}`,
        {
          // slots: [{ time: "08:45 AM", isAvailable: true }],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      toast.success("Time slot added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error adding doctor");
    } finally {
      setIsAddDoctorLoading(false);
    }
  };

  return {
    isAddDoctorLoading,
    onAddNewDoctor,
    onAddTimeSlot,
  };
};

export default useAddDoctor;
