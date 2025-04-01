import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env;

const useGetMmuStaffList = ({ userType }) => {
  const navigate = useNavigate();
  const [mmuStaff, setMmuStaff] = useState([]);
  const [isMmuStaffLoading, setIsMmuStaffLoading] = useState(false);

  const getMMUstaffList = useCallback(async () => {
    setIsMmuStaffLoading(true);
    try {
      const token = localStorage.getItem("authToken");

      const params = new URLSearchParams();
      if (userType !== undefined) {
        params.append("userType", userType); // First key-value pair
        params.append("userType", "ADMIN"); // Second key-value pair
      }

      const res = await axios.get(
        `${REACT_APP_API_KEY}/api/v1/mmu/auth/user/getAll`,
        {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );

      setMmuStaff(res.data);
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
      setIsMmuStaffLoading(false);
    }
  }, [userType, navigate]);

  useEffect(() => {
    getMMUstaffList();
  }, [getMMUstaffList, userType]);

  return {
    mmuStaff,
    isMmuStaffLoading,
  };
};

export default useGetMmuStaffList;
