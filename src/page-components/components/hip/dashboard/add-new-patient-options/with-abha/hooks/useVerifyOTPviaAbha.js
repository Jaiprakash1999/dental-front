import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useVerifyOTPviaAbha = ({
  inputNumber,
  id,
  setActiveRegisterState,
  mobileOrAadhaar,
  abhaAddress,
}) => {
  const [isOTPverifyViaAbhaLoading, setIsOTPverifyViaAbhaLoading] =
    useState(false);
  const [verifyOTPviaAbhaData, setIsVerifyOTPviaAbhaData] = useState({});

  const onOTPverifyViaAbha = async (OTP = []) => {
    setIsOTPverifyViaAbhaLoading(true);
    let api = "/v2/danzo/abhaValidation/profile/login/verify/byMobile";
    let requestData = {
      id: id,
      otpValue: OTP.join(""),
    };

    if (inputNumber.length === 12) {
      api = "/v2/danzo/abhaValidation/profile/login/verify/byAadhaar";
      requestData = {
        id: id,
        otpValue: OTP.join(""),
      };
    } else if (inputNumber.length === 10) {
      api = "/v2/danzo/abhaValidation/profile/login/verify/byMobile";
      requestData = {
        id: id,
        otpValue: OTP.join(""),
      };
    } else if (inputNumber.length === 14 && mobileOrAadhaar === "mobile") {
      api = "/v2/danzo/abhaValidation/profile/login/verify/byMobile";
      requestData = {
        id: id,
        otpValue: OTP.join(""),
      };
    } else if (inputNumber.length === 14 && mobileOrAadhaar === "aadhaar") {
      api = "/v2/danzo/abhaValidation/profile/login/verify/byAadhaar";
      requestData = {
        id: id,
        otpValue: OTP.join(""),
      };
    } else if (inputNumber.length === 0 && abhaAddress.length !== 0) {
      api = "/v2/danzo/m1/abhaVerification/verifyOtp";
      requestData = {
        id: id,
        otp: OTP.join(""),
      };
    }

    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(`${api}`, requestData, {
        headers: {
          Authorization: token,
          "ngrok-skip-browser-warning": "hgs",
        },
      });
      setIsVerifyOTPviaAbhaData(res.data);

      if (inputNumber.length === 12 || inputNumber.length === 14) {
        setActiveRegisterState("abha_card");
        toast.success("OTP Verified Successfully");
      } else if (inputNumber.length === 10) {
        setActiveRegisterState("choose_abha_number");
        toast.success("OTP Verified Successfully !");
      } else if (abhaAddress.length !== 0) {
        toast.success("OTP Verified Successfully");
        setActiveRegisterState("abha_card");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setIsOTPverifyViaAbhaLoading(false);
  };

  return {
    onOTPverifyViaAbha,
    isOTPverifyViaAbhaLoading,
    verifyOTPviaAbhaData,
  };
};

export default useVerifyOTPviaAbha;
