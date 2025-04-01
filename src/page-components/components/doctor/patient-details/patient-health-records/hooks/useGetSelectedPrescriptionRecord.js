import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env;

const useGetSelectedPrescriptionRecord = ({
  setIsSelectedRecord = () => {},
}) => {
  const navigate = useNavigate();
  const [isPrescriptionLoading, setIsPrescriptionLoading] = useState(false);
  const [selectedPrescriptionData, setSelectedPrescriptionData] = useState({});

  const getSelectedPrescription = async (id) => {
    setIsPrescriptionLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        `${REACT_APP_API_KEY}/api/v1/mmu/records/prescription/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      setSelectedPrescriptionData(res.data);
      setIsSelectedRecord(true);
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
    setIsPrescriptionLoading(false);
  };

  return {
    selectedPrescriptionData,
    getSelectedPrescription,
    isPrescriptionLoading,
  };
};

export default useGetSelectedPrescriptionRecord;
