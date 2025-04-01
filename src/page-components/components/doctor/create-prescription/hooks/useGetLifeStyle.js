import axios from "axios";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env;

const useGetLifeStyle = () => {
  const navigate = useNavigate();
  const [lifestyleData, setLifeStyleData] = useState([]);
  const [isLifeStyleLoading, setIsLifeStyleLoading] = useState(false);
  const prescriptionData = useSelector((state) => state.prescriptionData);

  const { diagnosis = [] } = prescriptionData || {};

  const getLifeStyleData = useCallback(
    async (inputValue = "") => {
      setIsLifeStyleLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(
          `${REACT_APP_API_KEY}/api/v1/mmu/cortex/lifestyle/search`,
          {
            params: {
              diagnosis: diagnosis[0],
              query: inputValue,
            },
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "hgs",
            },
          }
        );
        setLifeStyleData(res.data?.lifestyles);
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
        setIsLifeStyleLoading(false);
      }
    },
    [diagnosis, navigate]
  );

  return {
    getLifeStyleData,
    isLifeStyleLoading,
    lifestyleData,
  };
};

export default useGetLifeStyle;
