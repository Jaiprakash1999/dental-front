import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env || {};

const useGetUserDetails = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [isUserLoading, setIsUserLoading] = useState(false);

  const getUser = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    setIsUserLoading(true);
    try {
      const res = await axios.get(
        `${REACT_APP_API_KEY}/api/v1/mmu/auth/user/getDetails`,
        {
          params: {},
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      setUserDetails(res.data);
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
      setIsUserLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return {
    isUserLoading,
    userDetails,
  };
};

export default useGetUserDetails;
