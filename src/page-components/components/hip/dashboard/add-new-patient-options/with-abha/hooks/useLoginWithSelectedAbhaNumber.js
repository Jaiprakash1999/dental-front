import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useLoginWithSelectedAbhaNumber = ({ setActiveRegisterState }) => {
  const [isLoginWithSelectedAbhaNumber, setIsLoginWithSelectedAbhaNumber] =
    useState(false);
  const onLoginViaSelectedAbhaNumber = async (id, slectedAbhaNumber) => {
    setIsLoginWithSelectedAbhaNumber(true);
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `/v2/danzo/abhaValidation/profile/login/user`,
        { id: id, abhaNumber: slectedAbhaNumber },
        {
          headers: {
            Authorization: token,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      setActiveRegisterState("abha_card");
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setIsLoginWithSelectedAbhaNumber(false);
  };
  return {
    isLoginWithSelectedAbhaNumber,
    onLoginViaSelectedAbhaNumber,
  };
};

export default useLoginWithSelectedAbhaNumber;
