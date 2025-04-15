import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env || {};

const useGetDoctorTimeSlot = ({ doctorId }) => {
  const [timeSlot, setTimeSlot] = useState([]);
  const [isSlotLoading, setIsSlotLoading] = useState(false);

  const getTimeSlots = useCallback(
    async (visitDate) => {
      const token = localStorage.getItem("authToken");
      setIsSlotLoading(true);
      try {
        const res = await axios.get(
          `${REACT_APP_API_KEY}/api/v1/mmu/doctor/slots/${doctorId}/${visitDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "hgs",
            },
          }
        );
        setTimeSlot(res.data);
      } catch (error) {
        console.error("Error fetching doctor list:", error);
        toast.error("Error fetching doctor list");
      } finally {
        setIsSlotLoading(false);
      }
    },
    [doctorId]
  );

  return { isSlotLoading, getTimeSlots, timeSlot };
};

export default useGetDoctorTimeSlot;
