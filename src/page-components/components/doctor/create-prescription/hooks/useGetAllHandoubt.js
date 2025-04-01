import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env;

const useGetAllHandoubt = () => {
  const navigate = useNavigate();
  const [allHandoubts, setAllHandubts] = useState([]);
  const [isAllHandoubtsLoading, setIsAllHandoubtsLoading] = useState(false);

  const prescriptionData = useSelector((state) => state.prescriptionData);
  const { medicalHandoubts = [] } = prescriptionData || {};

  const getAllHandoubts = useCallback(
    async (id) => {
      try {
        setIsAllHandoubtsLoading(true);
        const token = localStorage.getItem("authToken");
        const res = await axios.get(
          `${REACT_APP_API_KEY}/api/v1/mmu/cortex/handout`,

          {
            params: { id: id },
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "hgs",
            },
            responseType: "blob",
          }
        );
        const pdfUrl = URL.createObjectURL(res.data);
        setAllHandubts((prev) => [...prev, pdfUrl]);
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
        setIsAllHandoubtsLoading(false); // Set loading to false after the API call
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (medicalHandoubts[0] !== undefined) {
      medicalHandoubts.forEach(async (element) => {
        await getAllHandoubts(element.id);
      });
    }
  }, [medicalHandoubts, getAllHandoubts]);

  return {
    allHandoubts,
    isAllHandoubtsLoading,
  };
};

export default useGetAllHandoubt;
