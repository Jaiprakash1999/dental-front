import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env;

const useGetLabTest = ({ diagnosis = "" }) => {
  const navigate = useNavigate();
  const [labInvestigations, setLabInvestigations] = useState([]);
  const [isLabInvestigationLoading, setIsLabInvestigationLoading] =
    useState(true);

  const getAllInvestigations = useCallback(
    async (inputValue = "") => {
      const token = localStorage.getItem("authToken");
      try {
        const res = await axios.get(
          `${REACT_APP_API_KEY}/api/v1/mmu/cortex/investigations/search`,
          {
            params: { query: inputValue, diagnosis: diagnosis },
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "hgs",
            },
          }
        );
        setLabInvestigations(res.data?.investigations);
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
      setIsLabInvestigationLoading(false);
    },
    [diagnosis, navigate]
  );

  return {
    labInvestigations,
    isLabInvestigationLoading,
    getAllInvestigations,
  };
};

export default useGetLabTest;
