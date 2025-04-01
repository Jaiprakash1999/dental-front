import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env;
const useGetAllMedicines = () => {
  const navigate = useNavigate();

  const [allMedicines, setAllMedicines] = useState([]);
  const [isMedicineLoading, setIsMedicineLoading] = useState(true);

  const getAllMedicines = useCallback(async () => {
    try {
      const res = await axios.get(`${REACT_APP_API_KEY}/api/getAllMedicines`);
      setAllMedicines(res.data);
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
    setIsMedicineLoading(false);
  }, [navigate]);

  useEffect(() => {
    getAllMedicines();
  }, [getAllMedicines]);

  return {
    allMedicines,
    isMedicineLoading,
  };
};

export default useGetAllMedicines;
