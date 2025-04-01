import axios from "axios";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env;

const useGetAllDiagnosis = () => {
  const navigate = useNavigate();
  const [differentialDiagnosis, setDifferentialDiagnosis] = useState([]);
  const [isdiagnosisLoading, setIsDiagnoisLoading] = useState(true);
  const prescriptionData = useSelector((state) => state.prescriptionData);

  const { chiefComplaint } = prescriptionData || {};

  const getAllDiagnosis = useCallback(
    async (inputValue = "") => {
      const token = localStorage.getItem("authToken");

      const searchParams = new URLSearchParams();
      if (Array.isArray(chiefComplaint) && chiefComplaint.length) {
        chiefComplaint.forEach((tag) => searchParams.append("symptom", tag));
      }
      if (inputValue !== "") {
        searchParams.append("query", inputValue);
      }

      try {
        const res = await axios.get(
          `${REACT_APP_API_KEY}/api/v1/mmu/cortex/diagnosis/search`,
          {
            params: searchParams,
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "hgs",
            },
          }
        );
        setDifferentialDiagnosis(res.data?.diagnosis);
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
      setIsDiagnoisLoading(false);
    },
    [chiefComplaint, navigate]
  );

  return {
    differentialDiagnosis,
    isdiagnosisLoading,
    getAllDiagnosis,
  };
};

export default useGetAllDiagnosis;
