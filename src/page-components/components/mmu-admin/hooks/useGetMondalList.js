import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env || {};

const useGetMondalList = () => {
  const navigate = useNavigate();
  const [mondalList, setMondalList] = useState([]);
  const [isMondalListLoading, setIsMondalListLoading] = useState(false);

  const getMondalList = useCallback(
    async (searchInput = "") => {
      const token = localStorage.getItem("authToken");
      setIsMondalListLoading(true);
      try {
        const res = await axios.get(
          `${REACT_APP_API_KEY}/api/v1/mmu/mandal/mandals`,
          {
            params: { search: searchInput },
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "hgs",
            },
          }
        );
        setMondalList(res.data);
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
        setIsMondalListLoading(false);
      }
    },
    [navigate]
  );

  return { mondalList, isMondalListLoading, getMondalList };
};

export default useGetMondalList;
