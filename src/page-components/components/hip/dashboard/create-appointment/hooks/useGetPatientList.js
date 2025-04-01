import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env;

const useGetPatientList = () => {
  const navigate = useNavigate();
  const [patientList, setPatientList] = useState([]);
  const [isPatientListLoading, setIsPatientListLoading] = useState(false);

  const getPatientList = useCallback(
    async (inputValue = "") => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(
          `${REACT_APP_API_KEY}/api/v1/mmu/patient/search`,
          {
            params: {
              query: inputValue,
            },
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "hgs",
            },
          }
        );
        setPatientList(res.data);
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
      } finally {
        setIsPatientListLoading(false);
      }
    },
    [navigate]
  );

  return {
    patientList,
    getPatientList,
    isPatientListLoading,
  };
};

export default useGetPatientList;
