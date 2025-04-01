import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env;

const useResetPassword = ({ formData, setIsLogin, setIsResetPassword }) => {
  const [isResetLoading, setIsResetLoading] = useState(false);

  const onReset = async (e) => {
    e.preventDefault();
    setIsResetLoading(true);
    try {
      const res = await axios.post(
        `${REACT_APP_API_KEY}/resetPassword`,
        formData
      );
      toast.success(res.data || "reset successfully", {
        position: "top-center",
      });
      setIsLogin(true);
      setIsResetPassword(false);
    } catch (error) {
      console.log(error, "error");
    }
    setIsResetLoading(false);
  };

  return { isResetLoading, onReset };
};

export default useResetPassword;
