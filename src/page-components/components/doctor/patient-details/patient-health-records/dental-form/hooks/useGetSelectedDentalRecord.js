import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env;

const useGetSelectedDentalRecord = () => {
  const navigate = useNavigate();

  const [isSelectedDental, setIsWellnessDataLoading] = useState(false);

  const getSelectedDental = async (dentalFormId) => {
    setIsWellnessDataLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        `${REACT_APP_API_KEY}/api/v1/mmu/records/dental-form/${dentalFormId}`,
        {
          params: {},
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      return res.data;
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
  };

  return {
    isSelectedDental,
    getSelectedDental,
  };
};

export default useGetSelectedDentalRecord;
