import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initializeSocket } from "../../../../utils/socket";
const { REACT_APP_API_KEY } = process.env || {};

const useLogin = ({ formData }) => {
  const [loginData, setLoginData] = useState({});
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const navigate = useNavigate();

  const getUser = async (token) => {
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
      return res.data;
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
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoginLoading(true);
    try {
      const res = await axios.post(
        `${REACT_APP_API_KEY}/api/v1/mmu/auth/login`,
        formData
      );
      const token = res.data.token;
      localStorage.setItem("authToken", token);
      setLoginData(res.data);
      initializeSocket(token);
      toast.success("Login successfully !");
      const userData = await getUser(token);
      // Save user data in sessionStorage
      sessionStorage.setItem("userDetails", JSON.stringify(userData)); // Store user data as a string

      navigate("/welcome");
      // setTimeout(() => {
      //   navigate("/welcome");
      // }, 300);
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
      }
    }
    setIsLoginLoading(false);
  };

  return {
    handleSubmit,
    isLoginLoading,
    loginData,
  };
};

export default useLogin;
