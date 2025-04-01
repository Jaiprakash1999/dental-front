import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const { REACT_APP_ABHA_ADDRESS_SUFFIX } = process.env;

const useAddPatientViaAbha = ({
  inputNumber = "",
  setActiveRegisterState = () => {},
  mobileOrAadhaar = "",
  abhaAddress = "",
}) => {
  const [isContinueWithNumberLoading, setIsContinueWithNumberLoading] =
    useState(false);
  const [continueWithAadhaarMobileData, setIsContinueWithAadhaarMobileData] =
    useState({});

  const onAadharMobileContinue = async () => {
    setIsContinueWithNumberLoading(true);
    let api = "/v2/danzo/abhaValidation/profile/login/requestOtp/byMobile";
    let requestData = { mobileNumber: inputNumber };

    if (inputNumber.length === 12) {
      api = "/v2/danzo/abhaValidation/profile/login/requestOtp/byAadhaar";
      requestData = { aadhaarNumber: inputNumber };
    } else if (inputNumber.length === 10) {
      requestData = { mobileNumber: inputNumber };
    } else if (inputNumber.length === 14) {
      api = "/v2/danzo/abhaValidation/profile/login/requestOtp/byAbhaNumber";
      requestData = {
        abhaNumber: inputNumber,
        byAadhaar: mobileOrAadhaar === "aadhaar" ? true : false,
      };
    } else if (inputNumber.length === 0 && abhaAddress.length !== 0) {
      api = "/v2/danzo/m1/abhaVerification/requestOtp";
      requestData = {
        abhaAddress: `${abhaAddress}${REACT_APP_ABHA_ADDRESS_SUFFIX}`,
        authMethod:
          mobileOrAadhaar === "aadhaar" ? "AADHAAR_OTP" : "MOBILE_OTP",
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
      setIsContinueWithAadhaarMobileData(res.data);
      setActiveRegisterState("otp_input_field");

      toast.success(res?.data?.message || "OTP sent to your registered mobile");

      setIsContinueWithNumberLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setIsContinueWithNumberLoading(false);
      console.error("Error:", error);
    }
    setIsContinueWithNumberLoading(false);
  };

  useEffect(() => {
    if (mobileOrAadhaar !== "") {
      onAadharMobileContinue();
    }
    // eslint-disable-next-line
  }, [mobileOrAadhaar]);

  return {
    onAadharMobileContinue,
    isContinueWithNumberLoading,
    continueWithAadhaarMobileData,
  };
};

export default useAddPatientViaAbha;
