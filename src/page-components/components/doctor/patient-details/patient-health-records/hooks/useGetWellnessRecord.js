import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env;

const useGetWellnessRecord = () => {
  const navigate = useNavigate();
  const [wellnessData, setWellnessData] = useState([]);
  const [isWellDataLoading, setIsWellnessDataLoading] = useState(false);
  const patientData = useSelector((state) => state.patientDetails);

  const { id } = patientData || {};
  const getWellnessRecord = useCallback(async () => {
    setIsWellnessDataLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        `${REACT_APP_API_KEY}/api/v1/mmu/records/vital`,
        {
          params: {
            visitId: id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      const newData = await res.data?.reverse();
      setWellnessData(newData);
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
    setIsWellnessDataLoading(false);
  }, [id, navigate]);

  useEffect(() => {
    if (id !== undefined) {
      getWellnessRecord();
    }
  }, [id, getWellnessRecord]);

  return {
    wellnessData,
    isWellDataLoading,
    getWellnessRecord,
  };
};

export default useGetWellnessRecord;
