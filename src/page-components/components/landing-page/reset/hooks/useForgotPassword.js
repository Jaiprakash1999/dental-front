import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env;

const useForgotPassword = ({ formData, setIsLogin, setIsResetPassword }) => {
  const [isForgotPasswordLoading, setIsForgotPasswordLoading] = useState(false);
  const [forgotData, setForgotData] = useState({});
  const [forgotError, setForgotError] = useState({});

  const onForgotPassword = async () => {
    setIsForgotPasswordLoading(true);
    try {
      const res = await axios.post(
        `${REACT_APP_API_KEY}/forgotPassword`,
        formData
      );
      toast.success("Mail sent successfully !", { position: "top-center" });
      setForgotData(res.data);
      setIsLogin(false);
      setIsResetPassword(true);
    } catch (error) {
      setForgotError(error);
      toast.error("Opps somthing went wrong !", { position: "top-center" });
    }
    setIsForgotPasswordLoading(false);
  };

  return { isForgotPasswordLoading, forgotError, onForgotPassword, forgotData };
};

export default useForgotPassword;
