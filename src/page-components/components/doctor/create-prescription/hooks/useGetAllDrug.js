import axios from "axios";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env;

const useGetAllDrug = () => {
  const navigate = useNavigate();
  const [drugList, setDrugList] = useState([]);
  const [isDrugListLoading, setIsDrugListLoading] = useState(false);

  const prescriptionData = useSelector((state) => state.prescriptionData);
  const { diagnosis = [] } = prescriptionData || {};

  const getAllDrugList = useCallback(
    async (inputValue = "") => {
      setIsDrugListLoading(true);
      const token = localStorage.getItem("authToken");
      try {
        const resp = await axios.get(
          `${REACT_APP_API_KEY}/api/v1/mmu/cortex/medications/search`,
          {
            params: {
              query: inputValue,
              diagnosis: diagnosis[0],
            },
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "hgs",
            },
          }
        );
        setDrugList(resp.data?.medications);
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
      setIsDrugListLoading(false);
    },
    [diagnosis, navigate]
  );

  return {
    isDrugListLoading,
    drugList,
    getAllDrugList,
  };
};
export default useGetAllDrug;
