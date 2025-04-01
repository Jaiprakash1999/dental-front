import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useCreateABHAbyAadhaar = ({
  setActiveState = () => {},
  inputNumber = "",
}) => {
  const [aadhaarData, setAadhaarData] = useState({});
  const [isCreateABHAbyAadharloading, setIsCreateABHAbyAadhaarloading] =
    useState(false);

  const onCreateABHAbyAadhaar = async () => {
    setIsCreateABHAbyAadhaarloading(true);
    const token = localStorage.getItem("authToken");
    try {
      const res = await axios.post(
        `/v2/danzo/abhaCreation/byAadhaar`,
        { aadhaar: inputNumber },
        {
          headers: {
            Authorization: token,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );

      setAadhaarData(res?.data);
      setActiveState("aadhar_otp_field");
      toast.success(res?.data?.message || "OTP Sent to Aadhaar Mobile Number");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setIsCreateABHAbyAadhaarloading(false);
  };

  return {
    aadhaarData,
    onCreateABHAbyAadhaar,
    isCreateABHAbyAadharloading,
  };
};

export default useCreateABHAbyAadhaar;
