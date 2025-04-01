import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { findDate } from "../../../utils/findDate";
import { useNavigate } from "react-router-dom";
const { REACT_APP_API_KEY } = process.env;

const useBookFollowUp = () => {
  const navigate = useNavigate();
  const [isCheckInLoading, setIsCheckInLoading] = useState(false);

  const onCheckIn = async (appointments) => {
    setIsCheckInLoading(true);
    const daysToAdd = parseInt(appointments.followUpDate.split(" ")?.[0]);
    const futureDate = findDate(daysToAdd);
    const followUpDate = moment(futureDate).format("yyyy-MM-DD");

    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `${REACT_APP_API_KEY}/api/v1/mmu/visit`,
        {
          patientId: appointments?.patientId,
          doctorId: null,
          chiefComplaint: appointments?.chiefComplaint,
          visitType: "FOLLOWUP",
          visitDate: followUpDate,
          tags: appointments?.tags,
          mmuUnit: appointments?.mmuUnit,
          latitude: appointments?.latitude,
          longitude: appointments?.longitude,

          district: appointments?.district,
          pincode: appointments?.pincode,
          tehsil: appointments?.tehsil,
          state: appointments?.state,
          city: appointments?.city,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );

      toast.success("Patient Added for Follow UP", {
        position: "top-center",
      });
    } catch (error) {
      console.error(error, "error");
      const errorMessage = error.response?.data?.message;
      if (!error.response) {
        toast.error("Oops, something went wrong");
      } else {
        const messageContent = Array.isArray(errorMessage) ? (
          <ul className="ms-2 list-disc">
            {errorMessage.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        ) : (
          errorMessage || "An unknown error occurred"
        );
        toast.error(messageContent);
        if (error.response?.data?.statusCode === 401) {
          localStorage.removeItem("authToken");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      }
    }
    setIsCheckInLoading(false);
  };

  return {
    isCheckInLoading,
    onCheckIn,
  };
};

export default useBookFollowUp;
