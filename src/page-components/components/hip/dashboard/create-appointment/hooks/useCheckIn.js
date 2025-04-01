import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import useGetAllVisit from "../../visit-list/hooks/useGetAllVisit";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const { REACT_APP_API_KEY, REACT_APP_MMU_UNIT } = process.env;

const useCheckIn = ({
  appointmentData = {},
  setAppointmentData = () => {},
  setIsOnClear = () => {},
}) => {
  const navigate = useNavigate();
  const [isCheckInLoading, setIsCheckInLoading] = useState(false);
  const globalSearch = useSelector((state) => state.globalSearch);
  const currentCoordinate = useSelector((state) => state.currentCoordinate);
  const mmuUnitName = useSelector((state) => state.mmuUnitName);

  const { latitude, longitude } = currentCoordinate || {};

  const { address } = globalSearch || {};
  const { state, suburb, town, state_district, county, postcode } =
    address || {};

  const { getAllPatientVisit } = useGetAllVisit();

  const onCheckIn = async (e, selectedDate = new Date()) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCheckInLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `${REACT_APP_API_KEY}/api/v1/mmu/visit`,
        {
          patientId: appointmentData?.patientId,
          doctorId: null,
          chiefComplaint: appointmentData?.chiefComplaint,
          visitType: "INPERSON",
          visitDate: selectedDate,
          tags: appointmentData?.tags,
          mmuUnit: mmuUnitName || REACT_APP_MMU_UNIT,
          // latitude: +lat,
          latitude: +latitude,
          longitude: +longitude,
          // longitude: +lon,

          district: state_district,
          pincode: postcode,
          tehsil: county,
          state: state,
          city: suburb || town,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      getAllPatientVisit();
      setAppointmentData({
        patientId: "",
        tags: [],
        chiefComplaint: [],
        visitType: "INPERSON",
        mmuUnit: REACT_APP_MMU_UNIT,
        bloodGroup: "",
        currentDate: new Date().toISOString().split("T")[0],
      });
      setIsOnClear(true);
      toast.success("Patient checked in successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.error(error, "error");
      if (error.response === undefined) {
        toast.error("Oops somthing went wrong");
      } else {
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
    }
    setIsCheckInLoading(false);
  };

  return {
    isCheckInLoading,
    onCheckIn,
  };
};

export default useCheckIn;
